const db = require('../models/db');

const clearSessionAndReject = (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.clearCookie('ntdriver.sid');
      res.status(401).json({ error: 'Nao autenticado.' });
    });
    return;
  }

  res.status(401).json({ error: 'Nao autenticado.' });
};

const requireAuth = async (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Nao autenticado.' });
  }

  try {
    const user = await db.get('SELECT id, is_admin FROM users WHERE id = $1', [req.session.userId]);
    if (!user) {
      return clearSessionAndReject(req, res);
    }

    req.session.isAdmin = Boolean(user.is_admin);
    return next();
  } catch (error) {
    return res.status(500).json({ error: 'Falha ao validar sessao.' });
  }
};

const requireAdmin = async (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Nao autenticado.' });
  }

  try {
    const user = await db.get('SELECT id, is_admin FROM users WHERE id = $1', [req.session.userId]);
    if (!user) {
      return clearSessionAndReject(req, res);
    }
    if (!user.is_admin) {
      return res.status(403).json({ error: 'Acesso restrito ao administrador.' });
    }

    req.session.isAdmin = true;
    return next();
  } catch (error) {
    return res.status(500).json({ error: 'Falha ao validar sessao.' });
  }
};

module.exports = {
  requireAuth,
  requireAdmin
};
