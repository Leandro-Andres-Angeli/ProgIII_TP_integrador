const mysql = require('mysql2/promise');
require('dotenv').config();

const PORT = process.env.DB_PORT || 3306;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: PORT,
});

module.exports = pool;
