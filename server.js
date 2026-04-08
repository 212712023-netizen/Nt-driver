require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { initDb, pool } = require('./models/db');
const recordsRouter = require('./routes/records');
const authRouter = require('./routes/auth');
const personalExpensesRouter = require('./routes/personal-expenses');
const app = express();
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'nt-driver-dev-secret';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const APP_BASE_URL = process.env.APP_BASE_URL || `http://localhost:${PORT}`;
const USE_SECURE_COOKIES = IS_PRODUCTION && APP_BASE_URL.startsWith('https://');
const SESSION_TABLE_NAME = process.env.SESSION_TABLE_NAME || 'user_sessions';

if (!SESSION_SECRET || SESSION_SECRET === 'nt-driver-dev-secret') {
  console.warn('[security] SESSION_SECRET padrao em uso. Defina SESSION_SECRET forte em producao.');
}

app.set('trust proxy', 1);
app.use(helmet({
  contentSecurityPolicy: false
}));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Muitas tentativas. Tente novamente em alguns minutos.' }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const sessionConfig = {
  name: 'ntdriver.sid',
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: USE_SECURE_COOKIES,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
};

if (IS_PRODUCTION) {
  sessionConfig.store = new PgSession({
    pool,
    tableName: SESSION_TABLE_NAME,
    createTableIfMissing: true
  });
}

app.use(session({
  ...sessionConfig
}));

app.use('/api/auth', authLimiter);
app.use('/api/auth', authRouter);
app.use('/api/records', recordsRouter);
app.use('/api/personal-expenses', personalExpensesRouter);

app.get('/healthz', (req, res) => {
  res.status(200).json({ ok: true, service: 'nt-driver' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const startServer = async () => {
  try {
    await initDb();
    app.listen(PORT, () => {
      console.log(`Nt driver rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Falha ao iniciar a aplicacao:', error.message);
    process.exit(1);
  }
};

startServer();
