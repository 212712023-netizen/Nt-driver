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

  await query('ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_type TEXT');
  await query(`
    UPDATE users
    SET profile_type = 'driver'
    WHERE profile_type IS NULL OR profile_type = ''
  `);
  await query("ALTER TABLE users ALTER COLUMN profile_type SET DEFAULT 'driver'");
  await query('ALTER TABLE users ALTER COLUMN profile_type SET NOT NULL');
  await query(`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'users_profile_type_check'
      ) THEN
        ALTER TABLE users
        ADD CONSTRAINT users_profile_type_check
        CHECK (profile_type IN ('driver', 'personal'));
      END IF;
    END $$;
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
      entry_key TEXT,
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

  await query('ALTER TABLE personal_expenses ADD COLUMN IF NOT EXISTS entry_key TEXT');
  await query(`
    WITH ranked AS (
      SELECT
        id,
        ROW_NUMBER() OVER (
          PARTITION BY
            user_id,
            COALESCE(description, ''),
            amount,
            COALESCE(type, 'saida'),
            COALESCE(category, 'outros'),
            COALESCE(account, 'outros'),
            COALESCE(status, 'pendente'),
            date,
            COALESCE(due_day, -1),
            COALESCE(installments, ''),
            COALESCE(is_fixed::text, 'null'),
            COALESCE(installments_start_month, '')
          ORDER BY id DESC
        ) AS duplicate_rank
      FROM personal_expenses
    )
    DELETE FROM personal_expenses AS expenses
    USING ranked
    WHERE expenses.id = ranked.id
      AND ranked.duplicate_rank > 1
  `);
  await query(`
    UPDATE personal_expenses
    SET entry_key = CONCAT('expense-', id)
    WHERE entry_key IS NULL OR BTRIM(entry_key) = ''
  `);
  await query('CREATE INDEX IF NOT EXISTS idx_personal_expenses_user_id ON personal_expenses(user_id)');
  await query('CREATE INDEX IF NOT EXISTS idx_personal_expenses_user_date ON personal_expenses(user_id, date)');
  await query('CREATE UNIQUE INDEX IF NOT EXISTS idx_personal_expenses_user_entry_key ON personal_expenses(user_id, entry_key)');

  await query(`
    CREATE TABLE IF NOT EXISTS admin_notes (
      id BIGSERIAL PRIMARY KEY,
      user_id BIGINT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
      content_html TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query('CREATE INDEX IF NOT EXISTS idx_admin_notes_user_id ON admin_notes(user_id)');

  await query(`
    CREATE OR REPLACE FUNCTION set_admin_notes_updated_at()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

  await query('DROP TRIGGER IF EXISTS trg_admin_notes_updated_at ON admin_notes');
  await query(`
    CREATE TRIGGER trg_admin_notes_updated_at
    BEFORE UPDATE ON admin_notes
    FOR EACH ROW
    EXECUTE FUNCTION set_admin_notes_updated_at()
  `);

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

  await query(`
    CREATE TABLE IF NOT EXISTS personal_sheet_rows (
      id BIGSERIAL PRIMARY KEY,
      user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      kind TEXT NOT NULL CHECK (kind IN ('income', 'expense')),
      name TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS personal_sheet_values (
      id BIGSERIAL PRIMARY KEY,
      user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      row_id BIGINT NOT NULL REFERENCES personal_sheet_rows(id) ON DELETE CASCADE,
      year INTEGER NOT NULL CHECK (year BETWEEN 2000 AND 2100),
      month INTEGER NOT NULL CHECK (month BETWEEN 1 AND 12),
      day_of_month INTEGER CHECK (day_of_month BETWEEN 1 AND 31),
      amount DOUBLE PRECISION NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (user_id, row_id, year, month)
    )
  `);

  await query('ALTER TABLE personal_sheet_values ADD COLUMN IF NOT EXISTS day_of_month INTEGER CHECK (day_of_month BETWEEN 1 AND 31)');

  await query('CREATE INDEX IF NOT EXISTS idx_personal_sheet_rows_user ON personal_sheet_rows(user_id, kind, sort_order, id)');
  await query('CREATE INDEX IF NOT EXISTS idx_personal_sheet_values_user_year_month ON personal_sheet_values(user_id, year, month)');

  await query(`
    CREATE OR REPLACE FUNCTION set_personal_sheet_values_updated_at()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

  await query('DROP TRIGGER IF EXISTS trg_personal_sheet_values_updated_at ON personal_sheet_values');
  await query(`
    CREATE TRIGGER trg_personal_sheet_values_updated_at
    BEFORE UPDATE ON personal_sheet_values
    FOR EACH ROW
    EXECUTE FUNCTION set_personal_sheet_values_updated_at()
  `);

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
