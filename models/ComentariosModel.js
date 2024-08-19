import { pool } from "../db.js";

export const getAllComentarios = async(req,res)=>{
try {
    const [rows] = await pool.query("SELECT * FROM comentarios");

    res.json(rows);
    if(rows.length <= 0){
        return res.status(404).json({message:"Datos no encontrados"});
    }
} catch (error) {
    return res.status(500).json({ message: "Error en la consulta" });
}
}

export const createComentarios = async (req, res) => {
    try {
        const { contenido, autor, posts_id, posts_autor } = req.body;

        if (!contenido || !autor) {
            return res.status(400).json({ message: "Contenido y o autor es requerido" });
        }

        const [result] = await pool.query(
            "INSERT INTO comentarios (contenido, autor, posts_id, posts_autor ) VALUES (?, ?, ?, ?)",
            [contenido, autor, posts_id, posts_autor ]
        );

        res.status(201).json({ id: result.insertId, contenido, autor, posts_id, posts_autor });
    } catch (error) {

        console.error("error al crear los comentarios", error);
        return res.status(500).json({ message: "Error al crear el comentario" });
    }
};
