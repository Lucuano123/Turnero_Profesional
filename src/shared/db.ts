import { Pool } from 'pg';

export const pool = new Pool({
  user: 'usuario',
  host: 'localhost',
  database: 'nombre_base',
  password: 'contraseña',
  port: 5432,
});
