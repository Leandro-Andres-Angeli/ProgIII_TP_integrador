const mysql = require('mysql2/promise');
require('dotenv').config();
const PORT = process.env.DB_PORT || 3307;

// Create the connection pool. The pool-specific settings are the defaults

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: PORT, // ESTO SE DEBE CAMBIAR DESDE .ENV, NO MANUALMENTE

  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

module.exports = pool;
