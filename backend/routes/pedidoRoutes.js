const express = require('express');
const router = express.Router();
const { query, queryOne, run } = require('../db');

// GET - Obtener todos los pedidos
router.get('/', async (req, res) => {
  try {
    const pedidos = await query(`
      SELECT p.*, c.nombre as nombreCliente, s.nombre as nombreSucursal
      FROM pedidos p 
      JOIN clientes c ON p.idCliente = c.id 
      JOIN sucursales s ON p.idSucursal = s.id
      ORDER BY p.fecha_creacion DESC
    `);
    
    res.json({
      success: true,
      data: pedidos
    });
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener pedidos'
    });
  }
});

// POST - Crear nuevo pedido
router.post('/', async (req, res) => {
  try {
    const { idCliente, idSucursal, descripcion, estado = 'Pendiente' } = req.body;

    // Validación básica
    if (!idCliente || !idSucursal || !descripcion) {
      return res.status(400).json({
        success: false,
        message: 'ID del cliente, ID de sucursal y descripción son obligatorios'
      });
    }

    // Validar que el estado sea válido
    const estadosValidos = ['Pendiente', 'Entregado'];
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({
        success: false,
        message: 'Estado debe ser "Pendiente" o "Entregado"'
      });
    }

    // Verificar que el cliente existe
    const cliente = await queryOne('SELECT * FROM clientes WHERE id = ?', [idCliente]);
    if (!cliente) {
      return res.status(400).json({
        success: false,
        message: 'Cliente no encontrado'
      });
    }

    // Verificar que la sucursal existe
    const sucursal = await queryOne('SELECT * FROM sucursales WHERE id = ?', [idSucursal]);
    if (!sucursal) {
      return res.status(400).json({
        success: false,
        message: 'Sucursal no encontrada'
      });
    }

    const result = await run(
      'INSERT INTO pedidos (idCliente, idSucursal, descripcion, estado) VALUES (?, ?, ?, ?)',
      [idCliente, idSucursal, descripcion, estado]
    );

    const nuevoPedido = await queryOne(`
      SELECT p.*, c.nombre as nombreCliente, s.nombre as nombreSucursal
      FROM pedidos p 
      JOIN clientes c ON p.idCliente = c.id 
      JOIN sucursales s ON p.idSucursal = s.id
      WHERE p.id = ?
    `, [result.id]);

    res.status(201).json({
      success: true,
      message: 'Pedido creado exitosamente',
      data: nuevoPedido
    });
  } catch (error) {
    console.error('Error al crear pedido:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear pedido'
    });
  }
});

module.exports = router; 