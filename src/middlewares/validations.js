const pool = require('../config/dbConfig');
const { userRoles } = require('../utils/userRoles');

const checkAvailableEmail = async (val) => {
  const connection = await pool.getConnection();
  const [getUserIfExists] = await connection.query(
    `SELECT * FROM usuarios WHERE  correoElectronico ='${val}'`
  );

  if (getUserIfExists.length > 0) {
    throw new Error('ya hay una cuenta asociada a ese email');
  }
  connection.release();
  return true;
};
const checkValidRole = (role) => {
  if (!userRoles.hasOwnProperty(role)) {
    throw Error(
      "Elegir un rol existente , roles existentes : 'cliente','empleado' , 'adim' "
    );
  }
  return true;
};
/* const checkAvailableEmail = async (req, res, next) => {
  const { email } = req.body;
  const connection = await pool.getConnection();
  const [getUserIfExists] = await connection.query(
    `SELECT * FROM usuarios WHERE  correoElectronico ='${email}'`
  );
  console.log(getUserIfExists.length);

  if (getUserIfExists.length > 0) {
    console.log('error');

    throw new Error('ya hay una cuenta asociada a ese email');

    // return res
    //   .status(400)
    //   .json({ message: 'ya hay una cuenta asociada a ese email' });
  }

  next();
}; */

module.exports = { checkAvailableEmail, checkValidRole };
