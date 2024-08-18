import { pool } from "../db.js";

export const getAllPosts = async(req,res) => {

    try {
         const [rows] = await pool.query( "SELECT * FROM post")

         res.json(rows);
         if(rows.length <= 0){
             return res.status(404).json({message:"Datos no encontrados"});
         }
    } catch (error) {
        
    }
}