const express = require('express');
const router = express.Router();
const { query, queryOne, run } = require('../db');

// GET - Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await query('SELECT * FROM clientes ORDER BY nombre');
    res.json({
      success: true,
      data: clientes
    });
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener clientes'
    });
  }
});

// POST - Crear nuevo cliente
router.post('/', async (req, res) => {
  try {
    const { nombre, telefono } = req.body;

    // Validación básica
    if (!nombre || !telefono) {
      return res.status(400).json({
        success: false,
        message: 'Nombre y teléfono son obligatorios'
      });
    }

    const result = await run(
      'INSERT INTO clientes (nombre, telefono) VALUES (?, ?)',
      [nombre, telefono]
    );

    const nuevoCliente = await queryOne(
      'SELECT * FROM clientes WHERE id = ?',
      [result.id]
    );

    res.status(201).json({
      success: true,
      message: 'Cliente creado exitosamente',
      data: nuevoCliente
    });
  } catch (error) {
    console.error('Error al crear cliente:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear cliente'
    });
  }
});

// DELETE - Eliminar cliente
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el cliente existe
    const cliente = await queryOne('SELECT * FROM clientes WHERE id = ?', [id]);
    if (!cliente) {
      return res.status(404).json({
        success: false,
        message: 'Cliente no encontrado'
      });
    }

    // Verificar si tiene pedidos asociados
    const pedidos = await query('SELECT * FROM pedidos WHERE idCliente = ?', [id]);
    if (pedidos.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'No se puede eliminar el cliente porque tiene pedidos asociados'
      });
    }

    await run('DELETE FROM clientes WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Cliente eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar cliente:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar cliente'
    });
  }
});

module.exports = router; 