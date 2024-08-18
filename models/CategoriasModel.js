import { pool } from "../db.js";

export const getAllCategorias = async(req,res)=>{
try {
    const [rows] = await pool.query("SELECT * FROM categorias");

    res.json(rows);
    if(rows.length <= 0){
        return res.status(404).json({message:"Datos no encontrados"});
    }
} catch (error) {
    return res.status(500).json({ message: "Error en la consulta" });
}
}

export const createCategoria = async (req, res) => {
    try {
        const { categoria, descripcion } = req.body;

        if (!categoria) {
            return res.status(400).json({ message: "Categoria es requerida" });
        }

        const [result] = await pool.query(
            "INSERT INTO categorias (categoria, descripcion ) VALUES (?, ?)",
            [categoria, descripcion ]
        );

        res.status(201).json({ id: result.insertId, categoria, descripcion });
    } catch (error) {
        return res.status(500).json({ message: "Error al crear el post" });
    }
};
