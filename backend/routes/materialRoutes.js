const express = require('express');
const router = express.Router();
const { query, queryOne, run } = require('../db');

// GET - Obtener todos los materiales
router.get('/', async (req, res) => {
  try {
    const materiales = await query('SELECT * FROM materiales ORDER BY nombre');
    
    res.json({
      success: true,
      data: materiales
    });
  } catch (error) {
    console.error('Error al obtener materiales:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener materiales'
    });
  }
});

// POST - Crear nuevo material
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion, precio_unitario, stock = 0, unidad = 'Unidad' } = req.body;

    // Validación básica
    if (!nombre || !precio_unitario) {
      return res.status(400).json({
        success: false,
        message: 'Nombre y precio unitario son obligatorios'
      });
    }

    // Validar que el precio sea positivo
    if (precio_unitario <= 0) {
      return res.status(400).json({
        success: false,
        message: 'El precio unitario debe ser mayor a 0'
      });
    }

    // Validar que el stock sea no negativo
    if (stock < 0) {
      return res.status(400).json({
        success: false,
        message: 'El stock no puede ser negativo'
      });
    }

    const result = await run(
      'INSERT INTO materiales (nombre, descripcion, precio_unitario, stock, unidad) VALUES (?, ?, ?, ?, ?)',
      [nombre, descripcion, precio_unitario, stock, unidad]
    );

    const nuevoMaterial = await queryOne('SELECT * FROM materiales WHERE id = ?', [result.id]);

    res.status(201).json({
      success: true,
      message: 'Material creado exitosamente',
      data: nuevoMaterial
    });
  } catch (error) {
    console.error('Error al crear material:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear material'
    });
  }
});

// PUT - Actualizar material
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio_unitario, stock, unidad } = req.body;

    // Verificar que el material existe
    const material = await queryOne('SELECT * FROM materiales WHERE id = ?', [id]);
    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Material no encontrado'
      });
    }

    // Validación básica
    if (!nombre || !precio_unitario) {
      return res.status(400).json({
        success: false,
        message: 'Nombre y precio unitario son obligatorios'
      });
    }

    // Validar que el precio sea positivo
    if (precio_unitario <= 0) {
      return res.status(400).json({
        success: false,
        message: 'El precio unitario debe ser mayor a 0'
      });
    }

    // Validar que el stock sea no negativo
    if (stock < 0) {
      return res.status(400).json({
        success: false,
        message: 'El stock no puede ser negativo'
      });
    }

    await run(
      'UPDATE materiales SET nombre = ?, descripcion = ?, precio_unitario = ?, stock = ?, unidad = ? WHERE id = ?',
      [nombre, descripcion, precio_unitario, stock, unidad, id]
    );

    const materialActualizado = await queryOne('SELECT * FROM materiales WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Material actualizado exitosamente',
      data: materialActualizado
    });
  } catch (error) {
    console.error('Error al actualizar material:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar material'
    });
  }
});

// DELETE - Eliminar material
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar que el material existe
    const material = await queryOne('SELECT * FROM materiales WHERE id = ?', [id]);
    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Material no encontrado'
      });
    }

    await run('DELETE FROM materiales WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Material eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar material:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar material'
    });
  }
});

module.exports = router; 