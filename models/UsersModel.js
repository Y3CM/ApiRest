import { pool } from "../db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10; // Para encriptar contraseñas

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM usuarios");
        if (rows.length <= 0) {
            return res.status(404).json({ message: "Datos no encontrados" });
        }
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Error en la consulta", error: error.message });
    }
};

// Obtener un usuario por ID
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT * FROM usuarios WHERE num_doc = ?", [id]);
        if (rows.length <= 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error en la consulta", error: error.message });
    }
};

// Crear un nuevo usuario
export const createUser = async (req, res) => {
    try {
        const { num_doc, tipo_doc, name, last_name, email, password, movil, ciudad, direccion, rol } = req.body;

        if (!num_doc || !tipo_doc || !name || !last_name || !email || !password || !movil || !ciudad || !direccion || !rol) {
            return res.status(400).json({ message: "Todos los campos son requeridos" });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const [result] = await pool.query(
            "INSERT INTO usuarios (num_doc, tipo_doc, name, last_name, email, password, movil, ciudad, direccion, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [num_doc, tipo_doc, name, last_name, email, hashedPassword, movil, ciudad, direccion, rol]
        );

        res.status(201).json({ num_doc, tipo_doc, name, last_name, email, movil, ciudad, direccion, rol });
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        return res.status(500).json({ message: "Error al crear el usuario", error: error.message });
    }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { tipo_doc, name, last_name, email, password, movil, ciudad, direccion, rol } = req.body;

        if (!tipo_doc || !name || !last_name || !email || !password || !movil || !ciudad || !direccion || !rol) {
            return res.status(400).json({ message: "Todos los campos son requeridos" });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const [result] = await pool.query(
            "UPDATE usuarios SET tipo_doc = ?, name = ?, last_name = ?, email = ?, password = ?, movil = ?, ciudad = ?, direccion = ?, rol = ? WHERE num_doc = ?",
            [tipo_doc, name, last_name, email, hashedPassword, movil, ciudad, direccion, rol, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json({ message: "Usuario actualizado con éxito" });
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        return res.status(500).json({ message: "Error al actualizar el usuario", error: error.message });
    }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query("DELETE FROM usuarios WHERE num_doc = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json({ message: "Usuario eliminado con éxito" });
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        return res.status(500).json({ message: "Error al eliminar el usuario", error: error.message });
    }
};

// Iniciar sesión
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email y contraseña son requeridos" });
        }

        const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        // Generar un token JWT
        const token = jwt.sign({ userId: user.num_doc, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        return res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
    }
};
