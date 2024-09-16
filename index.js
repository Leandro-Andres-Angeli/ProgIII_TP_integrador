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
   
    const filename = fileURLToPath(import.meta.url)
    const dir = path.dirname(`${filename}`)
//aca me tira error
    const mensaje = fs.readFileSync(path.join(dir + '/utils/notificacion.hbs'),'utf-8')
    console.log(mensaje)
});
//hasta aca
const puerto = process.env.PUERTO;

app.listen(3001, () => {
    console.log('Estoy escuchando el puerto 3001');
});