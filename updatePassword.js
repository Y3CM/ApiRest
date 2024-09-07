import bcrypt from 'bcrypt';
import { pool } from "./db.js"; // Ajusta la ruta según la ubicación real de tu archivo db.js

const saltRounds = 10; // Para encriptar contraseñas

async function encryptPasswords() {
    try {
        // Obtener todos los usuarios
        const [users] = await pool.query("SELECT num_doc, password FROM usuarios");

        for (const user of users) {
            // Encriptar la contraseña
            const hashedPassword = await bcrypt.hash(user.password, saltRounds);

            // Actualizar la contraseña en la base de datos
            await pool.query(
                "UPDATE usuarios SET password = ? WHERE num_doc = ?",
                [hashedPassword, user.num_doc]
            );
        }

        console.log("Contraseñas actualizadas con éxito.");
    } catch (error) {
        console.error("Error al actualizar las contraseñas:", error);
    }
}

encryptPasswords();
