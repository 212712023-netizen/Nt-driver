const { Pool } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL || '';

if (!DATABASE_URL) {
  console.error('DATABASE_URL nao foi definida no .env.');
  process.exit(1);
}

const normalizedDatabaseUrl = DATABASE_URL
  .replace(/[?&]sslmode=[^&]*/i, '')
  .replace(/\?$/, '');

const pool = new Pool({
  connectionString: normalizedDatabaseUrl,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on('error', (error) => {
  console.error('Erro inesperado no pool PostgreSQL:', error.message);
});

const query = (text, params = []) => pool.query(text, params);

const get = async (text, params = []) => {
  const result = await query(text, params);
  return result.rows[0] || null;
};

const all = async (text, params = []) => {
  const result = await query(text, params);
  return result.rows || [];
};

const withTransaction = async (handler) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await handler(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

const initDb = async () => {
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      is_admin BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS records (
      id BIGSERIAL PRIMARY KEY,
      user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
      date TEXT NOT NULL,
      income_value DOUBLE PRECISION DEFAULT 0,
      income_source TEXT,
      expense_value DOUBLE PRECISION DEFAULT 0,
      expense_type TEXT,
      km DOUBLE PRECISION DEFAULT 0,
      hours_worked DOUBLE PRECISION DEFAULT 0,
      operation_notes TEXT
    )
  `);

  await query('CREATE INDEX IF NOT EXISTS idx_records_user_id ON records(user_id)');
  await query('CREATE INDEX IF NOT EXISTS idx_records_user_date ON records(user_id, date)');

  await query(`
    CREATE TABLE IF NOT EXISTS personal_expenses (
      id BIGSERIAL PRIMARY KEY,
      user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      description TEXT,
      amount DOUBLE PRECISION NOT NULL DEFAULT 0,
      type TEXT DEFAULT 'saida',
      category TEXT DEFAULT 'outros',
      account TEXT DEFAULT 'outros',
      status TEXT DEFAULT 'pendente',
      date TEXT NOT NULL,
      due_day INTEGER,
      installments TEXT,
      is_fixed BOOLEAN,
      installments_start_month TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query('CREATE INDEX IF NOT EXISTS idx_personal_expenses_user_id ON personal_expenses(user_id)');
  await query('CREATE INDEX IF NOT EXISTS idx_personal_expenses_user_date ON personal_expenses(user_id, date)');

  await query(`
    CREATE TABLE IF NOT EXISTS password_reset_tokens (
      id BIGSERIAL PRIMARY KEY,
      user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token_hash TEXT NOT NULL,
      expires_at TIMESTAMPTZ NOT NULL,
      used_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query('CREATE INDEX IF NOT EXISTS idx_password_reset_user_id ON password_reset_tokens(user_id)');
  await query('CREATE INDEX IF NOT EXISTS idx_password_reset_hash ON password_reset_tokens(token_hash)');

  const adminCountRow = await get('SELECT COUNT(*)::int AS count FROM users WHERE is_admin = TRUE');
  if (Number(adminCountRow?.count || 0) <= 0) {
    await query(`
      UPDATE users
      SET is_admin = TRUE
      WHERE id = (
        SELECT id FROM users ORDER BY id DESC LIMIT 1
      )
    `);
  }
};

module.exports = {
  pool,
  query,
  get,
  all,
  withTransaction,
  initDb
};
