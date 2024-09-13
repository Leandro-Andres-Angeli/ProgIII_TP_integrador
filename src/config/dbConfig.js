require('dotenv').config();
const PORT = process.env.DB_PORT || 3306;

// Create the dbConnection dbConnection. The dbConnection-specific settings are the defaults

var mysql = require('mysql2/promise');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'reclamos',
  port: PORT,
  waitFordbConnections: true,
  dbConnectionLimit: 10,
  maxIdle: 10, // max idle dbConnections, the default value is the same as `dbConnectionLimit`
  idleTimeout: 60000, // idle dbConnections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

/* const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',

  database: 'reclamos',
  port: PORT,
  waitFordbConnections: true,
  dbConnectionLimit: 10,
  maxIdle: 10, // max idle dbConnections, the default value is the same as `dbConnectionLimit`
  idleTimeout: 60000, // idle dbConnections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
}); */
module.exports = con;
