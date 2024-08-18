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