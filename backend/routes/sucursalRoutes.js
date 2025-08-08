const express = require('express');
const router = express.Router();
const { query, queryOne, run } = require('../db');

// GET - Obtener todas las sucursales
router.get('/', async (req, res) => {
  try {
    const sucursales = await query('SELECT * FROM sucursales ORDER BY nombre');
    
    res.json({
      success: true,
      data: sucursales
    });
  } catch (error) {
    console.error('Error al obtener sucursales:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener sucursales'
    });
  }
});

// POST - Crear nueva sucursal
router.post('/', async (req, res) => {
  try {
    const { nombre, direccion, telefono, estado = 'Activa' } = req.body;

    // Validación básica
    if (!nombre || !direccion || !telefono) {
      return res.status(400).json({
        success: false,
        message: 'Nombre, dirección y teléfono son obligatorios'
      });
    }

    // Validar que el estado sea válido
    const estadosValidos = ['Activa', 'Inactiva'];
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({
        success: false,
        message: 'Estado debe ser "Activa" o "Inactiva"'
      });
    }

    const result = await run(
      'INSERT INTO sucursales (nombre, direccion, telefono, estado) VALUES (?, ?, ?, ?)',
      [nombre, direccion, telefono, estado]
    );

    const nuevaSucursal = await queryOne('SELECT * FROM sucursales WHERE id = ?', [result.id]);

    res.status(201).json({
      success: true,
      message: 'Sucursal creada exitosamente',
      data: nuevaSucursal
    });
  } catch (error) {
    console.error('Error al crear sucursal:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear sucursal'
    });
  }
});

// PUT - Actualizar sucursal
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, direccion, telefono, estado } = req.body;

    // Verificar que la sucursal existe
    const sucursal = await queryOne('SELECT * FROM sucursales WHERE id = ?', [id]);
    if (!sucursal) {
      return res.status(404).json({
        success: false,
        message: 'Sucursal no encontrada'
      });
    }

    // Validación básica
    if (!nombre || !direccion || !telefono) {
      return res.status(400).json({
        success: false,
        message: 'Nombre, dirección y teléfono son obligatorios'
      });
    }

    // Validar que el estado sea válido
    const estadosValidos = ['Activa', 'Inactiva'];
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({
        success: false,
        message: 'Estado debe ser "Activa" o "Inactiva"'
      });
    }

    await run(
      'UPDATE sucursales SET nombre = ?, direccion = ?, telefono = ?, estado = ? WHERE id = ?',
      [nombre, direccion, telefono, estado, id]
    );

    const sucursalActualizada = await queryOne('SELECT * FROM sucursales WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Sucursal actualizada exitosamente',
      data: sucursalActualizada
    });
  } catch (error) {
    console.error('Error al actualizar sucursal:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar sucursal'
    });
  }
});

// DELETE - Eliminar sucursal
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar que la sucursal existe
    const sucursal = await queryOne('SELECT * FROM sucursales WHERE id = ?', [id]);
    if (!sucursal) {
      return res.status(404).json({
        success: false,
        message: 'Sucursal no encontrada'
      });
    }

    // Verificar si tiene pedidos asociados
    const pedidos = await query('SELECT * FROM pedidos WHERE idSucursal = ?', [id]);
    if (pedidos.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'No se puede eliminar la sucursal porque tiene pedidos asociados'
      });
    }

    await run('DELETE FROM sucursales WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Sucursal eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar sucursal:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar sucursal'
    });
  }
});

module.exports = router; 