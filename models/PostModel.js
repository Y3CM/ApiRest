import { pool } from "../db.js";

export const getAllPosts = async(req,res) => {

    try {
         const [rows] = await pool.query( "SELECT * FROM posts")

         res.json(rows);
         if(rows.length <= 0){
             return res.status(404).json({message:"Datos no encontrados"});
         }
    } catch (error) {
        return res.status(500).json({ message: "Error en la consulta" });
    }
}

export const getPost = async(req,res)=>{

    try{

        const { id } = req.params;
        const [rows] = await pool.query("SELECT * FROM posts WHERE id = ?", [id,]);

        res.json(rows);
        if(rows.length <= 0){
            return res.status(404).json({message:"post no encontrados"});
        }
    }catch (error){
            return res.status(500).json({ message: "Error en la consulta" });
    }
}


export const createPost = async (req, res) => {
    try {
        const { titulo, resumen, contenido, image, categoria, estado, autor } = req.body;

        if (!titulo || !contenido || !autor) {
            return res.status(400).json({ message: "Título, contenido y autor son requeridos" });
        }

        const [result] = await pool.query(
            "INSERT INTO posts (titulo, resumen, contenido, image, categoria, estado, autor) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [titulo, resumen, contenido, image, categoria, estado, autor]
        );

        res.status(201).json({ id: result.insertId, titulo, resumen, contenido, image, categoria, estado, autor });
    } catch (error) {
        return res.status(500).json({ message: "Error al crear el post" });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, resumen, contenido, image, categoria, estado, autor } = req.body;
        if (!titulo || !contenido ) {
            return res.status(400).json({ message: "Título, contenido y autor son requeridos" });
        }
        const [result] = await pool.query(
            "UPDATE posts SET titulo = ?, resumen = ?, contenido = ?, image = ?, categoria = ?, estado = ?, updated_at = NOW() WHERE id = ?",
            [titulo, resumen, contenido, image, categoria, estado, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Post no encontrado" });
        }
        res.json({ id, titulo, resumen, contenido, image, categoria, estado, autor });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el post" });
    }
};


export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query("DELETE FROM posts WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Post no encontrado" });
        }

        res.status(204).send(); 
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar el post" });
    }
};
