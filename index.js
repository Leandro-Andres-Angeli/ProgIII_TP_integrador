import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';

import fs, { readFile } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/',(req,res) =>{
    res.status(200).send({'estado': true})
});

app.post('/notificacion',(req,res) =>{
    const correoEnviado = req.body.correoElectronico
    console.log(req.body);
   
    const filename = fileURLToPath(import.meta.url)
    const dir = path.dirname(`${filename}`)

    
    const mensaje = fs.readFileSync(path.join(dir, 'utils', 'notificacion.hbs'), 'utf-8');

    const templete = handlebars.compile(mensaje);

    const datos = {
        nombre : "Mariano",
        reclamo : "1236"
    };    
    
    const correo = templete(datos)  

    const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : process.env.CORREO,
            pass : process.env.CLAVE
        }

    });

    const mail = {
        to : correoEnviado,
        subject : 'NOTIFICACION',
        text : 'mail enviado con nodemailer',
        html : correo
    };
    console.log('Mail a enviar:', mail);
    transporter.sendMail(mail, (error, info) => {
        if(error){
            console.log('Error al enviar mail', error);
        }else{
            console.log('El mail ha sido enviado', info.response);
            res.json({'estado': true, 'mensaje': 'Notificación enviada'});
        }
    });
    
});   

const puerto = process.env.PUERTO;

app.listen(puerto, () => {
    console.log(`Estoy escuchando el puerto ${puerto}`);
});