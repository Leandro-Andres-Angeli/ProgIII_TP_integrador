const fs = require('fs');
const path = require('path');

const fileUtils = {
  deleteImagenDelServidor: async (imagen) => {
    if (imagen) {
      const rutaImagen = path.join(
        process.cwd(),
        'src/public/imagenes',
        imagen
      );

      fs.unlink(rutaImagen, (err) => {
        if (err) {
          console.error(err);
        }
      });
    } else console.error('No existe la imagen');
  },
};
module.exports = fileUtils;
