const express = require('express');
const db = require('../models/db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.use(requireAuth);

const sqlSelectByUser = `
  SELECT *
  FROM personal_expenses
  WHERE user_id = $1
  ORDER BY due_day ASC, date ASC, id DESC
`;

const normalizeItem = (item = {}) => {
  const date = String(item.date || '').slice(0, 10) || new Date().toISOString().slice(0, 10);
  const dueRaw = Number(item.due_day);
  const fallbackDay = Number(date.slice(8, 10)) || 1;
  const dueDay = Number.isFinite(dueRaw) && dueRaw >= 1 && dueRaw <= 31 ? dueRaw : fallbackDay;

  let isFixed = item.is_fixed;
  if (isFixed === null || isFixed === undefined || isFixed === '') isFixed = null;
  else isFixed = Boolean(isFixed);

  return {
    description: String(item.description || '').trim(),
    amount: Number(item.amount) || 0,
    type: item.type === 'entrada' ? 'entrada' : 'saida',
    category: String(item.category || 'outros'),
    account: String(item.account || 'outros'),
    status: item.status === 'pago' ? 'pago' : 'pendente',
    date,
    due_day: dueDay,
    installments: String(item.installments || '').trim(),
    is_fixed: isFixed,
    installments_start_month: String(item.installments_start_month || date.slice(0, 7))
  };
};

router.get('/', async (req, res) => {
  try {
    const rows = await db.all(sqlSelectByUser, [req.session.userId]);
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: 'Falha ao carregar despesas pessoais.' });
  }
});

router.post('/replace', async (req, res) => {
  const userId = req.session.userId;
  const rawItems = Array.isArray(req.body?.items) ? req.body.items : [];
  const items = rawItems.map(normalizeItem).filter((item) => item.amount > 0);

  try {
    const rows = await db.withTransaction(async (client) => {
      await client.query('DELETE FROM personal_expenses WHERE user_id = $1', [userId]);

      for (const item of items) {
        await client.query(
          `INSERT INTO personal_expenses (
            user_id, description, amount, type, category, account, status,
            date, due_day, installments, is_fixed, installments_start_month
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
          [
            userId,
            item.description,
            item.amount,
            item.type,
            item.category,
            item.account,
            item.status,
            item.date,
            item.due_day,
            item.installments,
            item.is_fixed,
            item.installments_start_month
          ]
        );
      }

      const result = await client.query(sqlSelectByUser, [userId]);
      return result.rows || [];
    });

    return res.json({ ok: true, items: rows });
  } catch (error) {
    return res.status(500).json({ error: 'Falha ao salvar despesas pessoais.' });
  }
});

module.exports = router;
