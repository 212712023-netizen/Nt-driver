const express = require('express');
const db = require('../models/db');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();
const MAX_CONTENT_SIZE = 500000;
const MAX_TITLE_SIZE = 120;
const DEFAULT_CONTENT_HTML = '<p></p>';
const DEFAULT_TITLE = 'Arquivo sem título';

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

const normalizeTitle = (value, fallback = DEFAULT_TITLE) => {
  const normalized = String(value || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_TITLE_SIZE);
  return normalized || fallback;
};

const serializeDocumentMeta = (row) => ({
  id: Number(row?.id || 0),
  title: normalizeTitle(row?.title),
  createdAt: row?.created_at || null,
  updatedAt: row?.updated_at || null
});

const serializeDocument = (row) => ({
  ...serializeDocumentMeta(row),
  contentHtml: row?.content_html || DEFAULT_CONTENT_HTML
});

const listDocuments = async (userId) => db.all(
  `
    SELECT id, title, created_at, updated_at
    FROM admin_note_documents
    WHERE user_id = $1
    ORDER BY updated_at DESC, id DESC
  `,
  [userId]
);

const getDocumentById = async (userId, documentId) => db.get(
  `
    SELECT id, title, content_html, created_at, updated_at
    FROM admin_note_documents
    WHERE user_id = $1 AND id = $2
    LIMIT 1
  `,
  [userId, documentId]
);

const createDocumentForUser = async (userId, title = 'Arquivo 1') => {
  const normalizedTitle = normalizeTitle(title, 'Arquivo 1');
  await db.query(
    `
      INSERT INTO admin_note_documents (user_id, title, content_html)
      VALUES ($1, $2, $3)
    `,
    [userId, normalizedTitle, DEFAULT_CONTENT_HTML]
  );

  return db.get(
    `
      SELECT id, title, content_html, created_at, updated_at
      FROM admin_note_documents
      WHERE user_id = $1
      ORDER BY id DESC
      LIMIT 1
    `,
    [userId]
  );
};

const ensureAtLeastOneDocument = async (userId) => {
  const documents = await listDocuments(userId);
  if (documents.length) return documents;
  await createDocumentForUser(userId, 'Arquivo 1');
  return listDocuments(userId);
};

router.get('/', requireAdmin, async (req, res) => {
  try {
    const userId = req.session.userId;
    const documents = await ensureAtLeastOneDocument(userId);
    const requestedDocumentId = Number(req.query?.documentId || 0);
    const selectedDocument = documents.find((document) => document.id === requestedDocumentId) || documents[0];
    const activeDocument = await getDocumentById(userId, selectedDocument.id);

    return res.json({
      documents: documents.map(serializeDocumentMeta),
      activeDocument: serializeDocument(activeDocument)
    });
  } catch (error) {
    return res.status(500).json({ error: 'Falha ao carregar bloco de notas.' });
  }
});

router.post('/', requireAdmin, async (req, res) => {
  try {
    const userId = req.session.userId;
    const existingDocuments = await listDocuments(userId);
    const nextTitle = normalizeTitle(req.body?.title, `Arquivo ${existingDocuments.length + 1}`);
    const createdDocument = await createDocumentForUser(userId, nextTitle);
    const documents = await listDocuments(userId);

    return res.status(201).json({
      ok: true,
      documents: documents.map(serializeDocumentMeta),
      activeDocument: serializeDocument(createdDocument)
    });
  } catch (error) {
    return res.status(500).json({ error: 'Falha ao criar arquivo do bloco de notas.' });
  }
});

router.put('/:documentId', requireAdmin, async (req, res) => {
  const documentId = Number(req.params.documentId);
  const rawContent = String(req.body?.contentHtml || '');
  const normalizedTitle = normalizeTitle(req.body?.title, DEFAULT_TITLE);

  if (!Number.isInteger(documentId) || documentId <= 0) {
    return res.status(400).json({ error: 'Arquivo do bloco de notas inválido.' });
  }
  if (rawContent.length > MAX_CONTENT_SIZE) {
    return res.status(400).json({ error: 'Conteúdo muito grande para salvar.' });
  }

  const sanitizedContent = sanitizeHtml(rawContent).trim() || DEFAULT_CONTENT_HTML;

  try {
    const existingDocument = await getDocumentById(req.session.userId, documentId);
    if (!existingDocument) {
        return res.status(404).json({ error: 'Arquivo do bloco de notas não encontrado.' });
    }

    await db.query(
      `
        UPDATE admin_note_documents
        SET title = $3,
            content_html = $4,
            updated_at = CURRENT_TIMESTAMP
        WHERE user_id = $1 AND id = $2
      `,
      [req.session.userId, documentId, normalizedTitle, sanitizedContent]
    );

    const savedDocument = await getDocumentById(req.session.userId, documentId);
    const documents = await listDocuments(req.session.userId);

    return res.json({
      ok: true,
      documents: documents.map(serializeDocumentMeta),
      activeDocument: serializeDocument(savedDocument)
    });
  } catch (error) {
    return res.status(500).json({ error: 'Falha ao salvar bloco de notas.' });
  }
});

router.delete('/:documentId', requireAdmin, async (req, res) => {
  const documentId = Number(req.params.documentId);

  if (!Number.isInteger(documentId) || documentId <= 0) {
    return res.status(400).json({ error: 'Arquivo do bloco de notas inválido.' });
  }

  try {
    const userId = req.session.userId;
    const existingDocument = await getDocumentById(userId, documentId);
    if (!existingDocument) {
        return res.status(404).json({ error: 'Arquivo do bloco de notas não encontrado.' });
    }

    await db.query(
      `
        DELETE FROM admin_note_documents
        WHERE user_id = $1 AND id = $2
      `,
      [userId, documentId]
    );

    let documents = await listDocuments(userId);
    let activeDocument = null;

    if (!documents.length) {
      activeDocument = await createDocumentForUser(userId, 'Arquivo 1');
      documents = await listDocuments(userId);
    } else {
      activeDocument = await getDocumentById(userId, documents[0].id);
    }

    return res.json({
      ok: true,
      documents: documents.map(serializeDocumentMeta),
      activeDocument: serializeDocument(activeDocument)
    });
  } catch (error) {
    return res.status(500).json({ error: 'Falha ao apagar arquivo do bloco de notas.' });
  }
});

module.exports = router;
