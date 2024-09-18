const { pool } = require('../config/dbConfig');

exports.getAllClaims = async (req, res) => {
  try {
    const conn = await pool.getConnection();
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false });
  }
};
