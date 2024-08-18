import { pool } from "../db.js";

export const getAllDetalles = async(req,res)=>{
try {
    const [rows] = await pool.query("SELECT * FROM detalles");

    res.json(rows);
    if(rows.length <= 0){
        return res.status(404).json({message:"Datos no encontrados"});
    }
} catch (error) {
    return res.status(500).json({ message: "Error en la consulta" });
}
}