const requireAuth = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Nao autenticado.' });
  }
  return next();
};

const requireAdmin = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Nao autenticado.' });
  }
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: 'Acesso restrito ao administrador.' });
  }
  return next();
};

module.exports = {
  requireAuth,
  requireAdmin
};