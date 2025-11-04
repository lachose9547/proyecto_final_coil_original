import mysql from 'mysql2/promise'
import dotenv from 'dotenv';

dotenv.config();

async function conexion(){
  try {
  const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,             
  password: process.env.DB_PASSWORD,        
  database: process.env.DB_NAME          
});
 console.log('conectado')
 return connection;
} catch (error) {
  console.error('Hay un error de mysql2',error);
  throw error;
}
}
export default conexion;