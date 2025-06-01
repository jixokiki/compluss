// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Bekasibarat12',
  database: 'toko_online',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('✅ Terhubung ke MySQL');
});

module.exports = connection;
