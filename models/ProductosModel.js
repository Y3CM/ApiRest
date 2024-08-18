import { pool } from "../db.js";

export const getAllProductos = async(req,res)=> {
    try{
        const [rows] = await pool.query(
            "SELECT * FROM productos"
        );

        res.json(rows);
        if(rows.length <= 0){
            return res.status(404).json({message:"Datos no encontrados"});
        }
    }catch (error){
            return res.status(500).json({ message: "Error en la consulta" });
    }
}

export const getProductoById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID recibido:", id); // Depura el ID recibido
    const [rows] = await pool.query("SELECT * FROM productos WHERE id = ?", [id,]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error); // Mostrar el error en la consola
    return res.status(500).json({ message: "Error en la consulta" });
  }
};
