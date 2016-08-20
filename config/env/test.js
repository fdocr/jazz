module.exports = {
  db: process.env.DB_CONN_STRING || 'postgres://test@localhost:5432/test',
  secretHash: 'thecakeisalie',
  env: 'test'
};
