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
app.use(cors({ origin: 'http://localhost:5173' })); // Permite conexión con el frontend
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Endpoint para buscar certificados por cédula
app.post('/api/login', async (req, res) => {
  const { cedula } = req.body;

  if (!cedula) {
    return res.status(400).json({
      success: false,
      message: 'La cédula es requerida.',
    });
  }

  try {
    const db = await conexion();

    const sql = `
      SELECT 
        c.cedula, 
        c.nombre, 
        c.apellido, 
        c.id_Usuario,
        LEFT(c.ciclo1, 4) AS Ciclo_1,
        LEFT(c.ciclo2, 4) AS Ciclo_2,
        t.Años,
        t.Tipo_Congreso,
        t.Temas
      FROM persona_coil c
      LEFT JOIN temas_coil t 
        ON LEFT(c.ciclo1, 4) = t.Años 
        OR LEFT(c.ciclo2, 4) = t.Años
      WHERE c.cedula = ?;
    `;

    const [data] = await db.execute(sql, [cedula]);

    if (!data.length) {
      return res.status(404).json({
        success: false,
        message: 'No se encontraron certificados para esta cédula.',
      });
    }

    const usuario = {
      cedula: data[0].cedula,
      nombre: data[0].nombre,
      apellido: data[0].apellido,
      id_Usuario: data[0].id_Usuario,
      certificados: data.map((item) => ({
        año: item.Años,
        tipo_congreso: item.Tipo_Congreso,
        tema: item.Temas,
      })),
    };

    return res.status(200).json({
      success: true,
      message: 'Certificados obtenidos correctamente.',
      user: usuario,
    });
  } catch (error) {
    console.error('Error en el servidor:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor.',
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
