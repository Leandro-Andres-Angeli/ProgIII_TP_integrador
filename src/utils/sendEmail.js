const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const nodemailer = require('nodemailer');
exports.sendEmail = (userData) => {
  const correoEnviado = userData.correoElectronico;

  const mensaje = fs.readFileSync(
    path.join(__dirname, '/', 'notificacion.hbs'),
    'utf-8'
  );
  console.log(mensaje);

  const template = handlebars.compile(mensaje);

  const correo = template(userData);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'Deborainfinit69@gmail.com',
      pass: 'mcdgcbmzgkvzievw',
    },
  });

  const mail = {
    to: correoEnviado,
    subject: 'NOTIFICACION',
    text: 'mail enviado con nodemailer',
    html: correo,
  };
  console.log('Mail a enviar:', mail);
  transporter.sendMail(mail, (error, info) => {
    if (error) {
      console.log('error', error.message);

      return 'Error al enviar mail';
    } else {
      console.log('mail enviado', info.response);
      return 'El mail ha sido enviado', info.response;
    }
  });
};
