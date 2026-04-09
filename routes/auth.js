const crypto = require('crypto');
const express = require('express');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const db = require('../models/db');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

const RESET_TOKEN_MINUTES = 30;
const APP_BASE_URL = process.env.APP_BASE_URL || 'http://localhost:3000';
const PUBLIC_REGISTER_ENABLED = String(process.env.PUBLIC_REGISTER_ENABLED || 'false') === 'true';
const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_SECURE = String(process.env.SMTP_SECURE || 'false') === 'true';
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER || 'no-reply@ntdriver.local';

const hasSmtpConfig = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS);
const mailTransport = hasSmtpConfig
  ? nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  })
  : null;

const normalizeEmail = (email) => String(email || '').trim().toLowerCase();

const hashResetToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

const getUsersCount = async () => {
  const row = await db.get('SELECT COUNT(*)::int AS count FROM users');
  return Number(row?.count || 0);
};

const getUserById = async (id) => db.get(
  'SELECT id, name, email, is_admin FROM users WHERE id = $1',
  [id]
);

const assignSessionUser = (req, user) => {
  req.session.userId = user.id;
  req.session.userName = user.name;
  req.session.userEmail = user.email;
  req.session.isAdmin = Boolean(user.is_admin);
};

const sendResetEmail = async (email, link) => {
  if (!mailTransport) {
    console.log(`[auth] Link de reset para ${email}: ${link}`);
    return;
  }

  await mailTransport.sendMail({
    from: SMTP_FROM,
    to: email,
    subject: 'Recuperacao de senha - NT Driver',
    text: `Voce solicitou recuperacao de senha. Use este link: ${link}`,
    html: `<p>Voce solicitou recuperacao de senha.</p><p><a href=\"${link}\">Clique para redefinir sua senha</a></p><p>Se nao foi voce, ignore este email.</p>`
  });
};

router.get('/register-status', async (req, res) => {
  try {
    const count = await getUsersCount();
    return res.json({
      publicRegisterEnabled: PUBLIC_REGISTER_ENABLED || count === 0
    });
  } catch (error) {
    return res.status(500).json({ error: 'Falha ao verificar cadastro.' });
  }
});

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body || {};
  const normalizedName = String(name || '').trim();
  const normalizedEmail = normalizeEmail(email);
  const rawPassword = String(password || '');

  if (!normalizedName || !normalizedEmail || rawPassword.length < 6) {
    return res.status(400).json({ error: 'Informe nome, email e senha com ao menos 6 caracteres.' });
  }

  try {
    const count = await getUsersCount();
    if (!PUBLIC_REGISTER_ENABLED && count > 0) {
      return res.status(403).json({ error: 'Cadastro publico desativado. Solicite acesso ao administrador.' });
    }

    const passwordHash = await bcrypt.hash(rawPassword, 10);
    const result = await db.query(
      'INSERT INTO users (name, email, password_hash, is_admin) VALUES ($1, $2, $3, TRUE) RETURNING id',
      [normalizedName, normalizedEmail, passwordHash]
    );

    const user = {
      id: result.rows[0]?.id || null,
      name: normalizedName,
      email: normalizedEmail,
      is_admin: true
    };
    assignSessionUser(req, user);

    return res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: true
      }
    });
  } catch (error) {
    if (error?.code === '23505') {
      return res.status(409).json({ error: 'Este email ja esta cadastrado.' });
    }
    return res.status(500).json({ error: 'Falha ao criar usuario.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  const normalizedEmail = normalizeEmail(email);
  const rawPassword = String(password || '');

  if (!normalizedEmail || !rawPassword) {
    return res.status(400).json({ error: 'Informe email e senha.' });
  }

  try {
    const user = await db.get(
      'SELECT id, name, email, password_hash, is_admin FROM users WHERE email = $1',
      [normalizedEmail]
    );

    if (!user) {
      return res.status(401).json({ error: 'Email ou senha invalidos.' });
    }

    const isValid = await bcrypt.compare(rawPassword, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Email ou senha invalidos.' });
    }

    assignSessionUser(req, user);

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: Boolean(user.is_admin)
      }
    });
  } catch (error) {
    return res.status(500).json({ error: 'Falha ao autenticar.' });
  }
});

router.post('/logout', (req, res) => {
  if (!req.session) return res.json({ ok: true });

  req.session.destroy(() => {
    res.clearCookie('ntdriver.sid');
    res.json({ ok: true });
  });
});

router.post('/change-password', requireAuth, async (req, res) => {
  const currentPassword = String(req.body?.currentPassword || '');
  const newPassword = String(req.body?.newPassword || '');

  if (!currentPassword || newPassword.length < 6) {
    return res.status(400).json({ error: 'Informe a senha atual e uma nova senha com ao menos 6 caracteres.' });
  }

  try {
    const user = await db.get('SELECT id, password_hash FROM users WHERE id = $1', [req.session.userId]);
    if (!user) {
      return res.status(500).json({ error: 'Falha ao alterar senha.' });
    }

    const isValid = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'A senha atual esta incorreta.' });
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await db.query('UPDATE users SET password_hash = $1 WHERE id = $2', [passwordHash, req.session.userId]);
    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: 'Falha ao alterar senha.' });
  }
});

router.post('/forgot-password', async (req, res) => {
  const normalizedEmail = normalizeEmail(req.body?.email);
  if (!normalizedEmail) {
    return res.json({ ok: true, message: 'Se o email existir, enviaremos instrucoes de recuperacao.' });
  }

  try {
    const user = await db.get('SELECT id, email FROM users WHERE email = $1', [normalizedEmail]);
    if (!user) {
      return res.json({ ok: true, message: 'Se o email existir, enviaremos instrucoes de recuperacao.' });
    }

    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = hashResetToken(rawToken);
    const expiresAt = new Date(Date.now() + (RESET_TOKEN_MINUTES * 60 * 1000));

    await db.withTransaction(async (client) => {
      await client.query(
        'DELETE FROM password_reset_tokens WHERE user_id = $1 AND used_at IS NULL',
        [user.id]
      );

      await client.query(
        'INSERT INTO password_reset_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3)',
        [user.id, tokenHash, expiresAt]
      );
    });

    const link = `${APP_BASE_URL}/?email=${encodeURIComponent(user.email)}&resetToken=${encodeURIComponent(rawToken)}`;
    try {
      await sendResetEmail(user.email, link);
    } catch (mailError) {
      console.error('Falha ao enviar email de recuperacao:', mailError.message);
    }

    return res.json({ ok: true, message: 'Se o email existir, enviaremos instrucoes de recuperacao.' });
  } catch (error) {
    return res.json({ ok: true, message: 'Se o email existir, enviaremos instrucoes de recuperacao.' });
  }
});

router.post('/reset-password', async (req, res) => {
  const normalizedEmail = normalizeEmail(req.body?.email);
  const token = String(req.body?.token || '').trim();
  const newPassword = String(req.body?.newPassword || '');

  if (!normalizedEmail || !token || newPassword.length < 6) {
    return res.status(400).json({ error: 'Dados invalidos para redefinir senha.' });
  }

  try {
    const tokenHash = hashResetToken(token);
    const row = await db.get(
      `
        SELECT prt.id, prt.user_id, prt.expires_at
        FROM password_reset_tokens prt
        INNER JOIN users u ON u.id = prt.user_id
        WHERE u.email = $1
          AND prt.token_hash = $2
          AND prt.used_at IS NULL
        ORDER BY prt.id DESC
        LIMIT 1
      `,
      [normalizedEmail, tokenHash]
    );

    if (!row || new Date(row.expires_at).getTime() <= Date.now()) {
      return res.status(400).json({ error: 'Token invalido ou expirado.' });
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await db.withTransaction(async (client) => {
      await client.query('UPDATE users SET password_hash = $1 WHERE id = $2', [passwordHash, row.user_id]);
      await client.query('UPDATE password_reset_tokens SET used_at = NOW() WHERE id = $1', [row.id]);
    });

    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: 'Falha ao redefinir senha.' });
  }
});

router.get('/users', requireAdmin, async (req, res) => {
  try {
    const rows = await db.all(
      'SELECT id, name, email, is_admin, created_at FROM users ORDER BY id ASC'
    );
    return res.json(rows || []);
  } catch (error) {
    return res.status(500).json({ error: 'Falha ao carregar usuarios.' });
  }
});

router.post('/users', requireAdmin, async (req, res) => {
  const name = String(req.body?.name || '').trim();
  const email = normalizeEmail(req.body?.email);
  const password = String(req.body?.password || '');
  const isAdmin = Boolean(req.body?.isAdmin);

  if (!name || !email || password.length < 6) {
    return res.status(400).json({ error: 'Informe nome, email e senha com ao menos 6 caracteres.' });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await db.query(
      'INSERT INTO users (name, email, password_hash, is_admin) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, email, passwordHash, isAdmin]
    );
    return res.status(201).json({ id: result.rows[0]?.id || null });
  } catch (error) {
    if (error?.code === '23505') {
      return res.status(409).json({ error: 'Este email ja esta cadastrado.' });
    }
    return res.status(500).json({ error: 'Falha ao criar usuario.' });
  }
});

router.post('/users/:id/reset-password', requireAdmin, async (req, res) => {
  const userId = Number(req.params.id);
  const newPassword = String(req.body?.newPassword || '');

  if (!Number.isFinite(userId) || userId <= 0 || newPassword.length < 6) {
    return res.status(400).json({ error: 'Dados invalidos para resetar senha.' });
  }

  try {
    const passwordHash = await bcrypt.hash(newPassword, 10);
    const result = await db.query('UPDATE users SET password_hash = $1 WHERE id = $2', [passwordHash, userId]);

    if ((result.rowCount || 0) <= 0) {
      return res.status(404).json({ error: 'Usuario nao encontrado.' });
    }

    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: 'Falha ao resetar senha.' });
  }
});

router.get('/me', requireAuth, async (req, res) => {
  try {
    const user = await getUserById(req.session.userId);
    if (!user) {
      return res.status(401).json({ error: 'Nao autenticado.' });
    }

    assignSessionUser(req, user);
    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: Boolean(user.is_admin)
      }
    });
  } catch (error) {
    return res.status(401).json({ error: 'Nao autenticado.' });
  }
});

module.exports = router;
