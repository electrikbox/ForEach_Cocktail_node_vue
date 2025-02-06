import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Création du pool de connexions
export const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
