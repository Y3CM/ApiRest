import { pool } from "../db.js";

export const getAllReview = async(req,res)=>{
try {
    const [rows] = await pool.query("SELECT * FROM reseñas");

    res.json(rows);
    if(rows.length <= 0){
        return res.status(404).json({message:"Datos no encontrados"});
    }
} catch (error) {
    return res.status(500).json({ message: "Error en la consulta" });
}
}

export const getReviewById = async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await pool.query("SELECT * FROM reseñas WHERE id = ?", [id]);
  
      if (rows.length <= 0) {
        return res.status(404).json({ message: "Reseña no encontrada" });
      }
  
      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: "Error en la consulta" });
    }
  };

  export const createReview = async (req, res) => {
    const { title, content, rating } = req.body;
    try {
      const [result] = await pool.query("INSERT INTO reseñas (title, content, rating) VALUES (?, ?, ?)", [title, content, rating]);
  
      res.status(201).json({ id: result.insertId, title, content, rating });
    } catch (error) {
      return res.status(500).json({ message: "Error al crear la reseña" });
    }
  };

  export const updateReview = async (req, res) => {
    const { id } = req.params;
    const { title, content, rating } = req.body;
  
    try {
      const [result] = await pool.query("UPDATE reseñas SET title = ?, content = ?, rating = ? WHERE id = ?", [title, content, rating, id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Reseña no encontrada" });
      }
  
      res.json({ id, title, content, rating });
    } catch (error) {
      return res.status(500).json({ message: "Error al actualizar la reseña" });
    }
  };

  
  export const deleteReview = async (req, res) => {
    const { id } = req.params;
  
    try {
      const [result] = await pool.query("DELETE FROM reseñas WHERE id = ?", [id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Reseña no encontrada" });
      }
  
      res.status(204).send(); // No content
    } catch (error) {
      return res.status(500).json({ message: "Error al eliminar la reseña" });
    }
  };
  