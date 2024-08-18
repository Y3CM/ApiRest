import { pool } from "../db.js";

export const getAllUsers = async(req,res)=>{

    try{
        const [rows] = await pool.query(
            "SELECT * FROM usuarios"
        );

        res.json(rows);
        if(rows.length <= 0){
            return res.status(404).json({message:"Datos no encontrados"});
        }
    }catch (error){
            return res.status(500).json({ message: "Error en la consulta" });
    }
}


export const getUser = async(req,res)=>{

    try{

        const { id } = req.params;
        const [rows] = await pool.query("SELECT * FROM usuarios WHERE num_doc = ?", [id,]);

        res.json(rows);
        if(rows.length <= 0){
            return res.status(404).json({message:"usuario no encontrados"});
        }
    }catch (error){
            return res.status(500).json({ message: "Error en la consulta" });
    }
}

export const createUser = async (req, res) => {
    try {
        // Desestructuración de los campos del cuerpo de la solicitud
        const { num_doc, tipo_doc, name, last_name, email, password, movil, ciudad, direccion, rol } = req.body;

        // Validación de campos requeridos
        if (!num_doc || !tipo_doc || !name || !last_name || !email || !password || !movil || !ciudad || !direccion || !rol) {
            return res.status(400).json({ message: "Todos los campos son requeridos" });
        }

        // Consulta para insertar un nuevo usuario
        const [result] = await pool.query(
            "INSERT INTO usuarios (num_doc, tipo_doc, name, last_name, email, password, movil, ciudad, direccion, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [num_doc, tipo_doc, name, last_name, email, password, movil, ciudad, direccion, rol]
        );

        // Respuesta con el num_doc como ID del nuevo usuario
        res.status(201).json({ num_doc, tipo_doc, name, last_name, email, movil, ciudad, direccion, rol });
    } catch (error) {
        // Registrar el error para depuración
        console.error("Error al crear el usuario:", error);

        // Respuesta con mensaje de error
        return res.status(500).json({ message: "Error al crear el usuario", error: error.message });
    }
};
