import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import conexion from './conexion.js';
 import cors from 'cors';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors('http://localhost:5173'));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.post('/api/usuarios', async (req, res) => {
  
  const {usuario} = req.body
   

  console.log(req.body)
    const sql = 'SELECT cedula, nombre,id_Usuario, apellido, ciclo1,ciclo2 FROM persona_coil u where cedula=?';
 ;

const db= await conexion();
  const [data,listaCampos]= await db.execute(sql,[usuario]) 
  
   return res.status(200).json({"datos":data})

});

app.post('/login', async (req, res) => {
  const { cedula } = req.body;

 

  if (!cedula) {
    return res.status(400).json({
      success: false,
      message: 'Usuario y contraseña son requeridos.'
    });
  }

const sql = 'SELECT cedula, nombre,id_Usuario, apellido, ciclo1,ciclo2 FROM persona_coil WHERE cedula = ?';


const db= await conexion();

  const [data]= await db.execute(sql,[cedula]) 
 


   return res.status(200).json({
      success: true,
      message: '¡Inicio de sesión exitoso!',
      user: data
    });

    

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor de Express escuchando en http://localhost:${PORT}`);
  console.log(`Accede al formulario en: http://localhost:${PORT}/form`);
  console.log(`Endpoint de usuarios: http://localhost:${PORT}/api/usuarios`);
  console.log(`Endpoint de login (POST): http://localhost:${PORT}/login`);
});