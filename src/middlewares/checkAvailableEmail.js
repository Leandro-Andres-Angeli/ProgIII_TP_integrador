const pool = require('../config/dbConfig');

const checkAvailableEmail = async (req, res, next) => {
  const { email } = req.body;
  const connection = await pool.getConnection();
  const [getUserIfExists] = await connection.query(
    `SELECT * FROM usuarios WHERE  correoElectronico ='${email}'`
  );
  console.log(getUserIfExists.length);

  if (getUserIfExists.length > 0) {
    console.log('in');

    return res
      .status(400)
      .json({ message: 'ya hay una cuenta asociada a ese email' });
  }

  next();
};

module.exports = checkAvailableEmail;
