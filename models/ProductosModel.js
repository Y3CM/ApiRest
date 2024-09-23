import { pool } from "../db.js";

// Obtener todos los productos
export const getAllProductos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM productos");

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Datos no encontrados" });
    }

    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Error en la consulta" });
  }
};

// Obtener producto por ID
export const getProductoById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM productos WHERE id = ?", [id]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Error en la consulta" });
  }
};

// Crear un nuevo producto
export const createProducto = async (req, res) => {
  try {
    const { nombre, precio, descripcion } = req.body;
    const [result] = await pool.query(
      "INSERT INTO productos (nombre, precio, descripcion) VALUES (?, ?, ?)",
      [nombre, precio, descripcion]
    );

    res.json({
      id: result.insertId,
      nombre,
      precio,
      descripcion,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear producto" });
  }
};

// Actualizar producto por ID
export const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, descripcion } = req.body;

    const [result] = await pool.query(
      "UPDATE productos SET nombre = ?, precio = ?, descripcion = ? WHERE id = ?",
      [nombre, precio, descripcion, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto actualizado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar producto" });
  }
};

// Eliminar producto por ID
export const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query("DELETE FROM productos WHERE id = ?", [id]);

    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar producto" });
  }
};