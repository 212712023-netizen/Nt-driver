const express = require('express');
const db = require('../models/db');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();
const MAX_CONTENT_SIZE = 500000;

const sanitizeHtml = (value) => {
  let html = String(value || '');

  // Remove blocos de script e elementos de incorporacao para manter o editor seguro.
  html = html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<\/?(iframe|object|embed|link|meta|style)([^>]*)>/gi, '');

  // Remove atributos inline de evento e protocolos perigosos.
  html = html.replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*')/gi, '');
  html = html.replace(/\son[a-z]+\s*=\s*[^\s>]+/gi, '');
  html = html.replace(/javascript\s*:/gi, '');

  return html;
};

router.get('/', requireAdmin, async (req, res) => {
  try {
    const row = await db.get(
      'SELECT content_html, updated_at FROM admin_notes WHERE user_id = $1 LIMIT 1',
      [req.session.userId]
    );

    return res.json({
      contentHtml: row?.content_html || '',
      updatedAt: row?.updated_at || null
    });
  } catch (error) {
    return res.status(500).json({ error: 'Falha ao carregar bloco de notas.' });
  }
});

router.put('/', requireAdmin, async (req, res) => {
  const rawContent = String(req.body?.contentHtml || '');

  if (rawContent.length > MAX_CONTENT_SIZE) {
    return res.status(400).json({ error: 'Conteudo muito grande para salvar.' });
  }

  const sanitizedContent = sanitizeHtml(rawContent);

  try {
    const result = await db.get(
      `
        INSERT INTO admin_notes (user_id, content_html)
        VALUES ($1, $2)
        ON CONFLICT (user_id)
        DO UPDATE SET content_html = EXCLUDED.content_html, updated_at = NOW()
        RETURNING updated_at
      `,
      [req.session.userId, sanitizedContent]
    );

    return res.json({ ok: true, updatedAt: result?.updated_at || null });
  } catch (error) {
    return res.status(500).json({ error: 'Falha ao salvar bloco de notas.' });
  }
});

module.exports = router;
