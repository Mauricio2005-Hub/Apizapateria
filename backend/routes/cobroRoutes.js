const express = require('express');
const router = express.Router();
const { query, queryOne, run } = require('../db');

// GET - Obtener todos los cobros
router.get('/', async (req, res) => {
  try {
    const cobros = await query(`
      SELECT c.*, p.descripcion as descripcionPedido, cl.nombre as nombreCliente
      FROM cobros c 
      JOIN pedidos p ON c.idPedido = p.id 
      JOIN clientes cl ON p.idCliente = cl.id
      ORDER BY c.fecha_cobro DESC
    `);
    
    res.json({
      success: true,
      data: cobros
    });
  } catch (error) {
    console.error('Error al obtener cobros:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener cobros'
    });
  }
});

// POST - Crear nuevo cobro
router.post('/', async (req, res) => {
  try {
    const { idPedido, monto, metodoPago } = req.body;

    // Validación básica
    if (!idPedido || !monto || !metodoPago) {
      return res.status(400).json({
        success: false,
        message: 'ID del pedido, monto y método de pago son obligatorios'
      });
    }

    // Validar que el método de pago sea válido
    const metodosValidos = ['Efectivo', 'Transferencia'];
    if (!metodosValidos.includes(metodoPago)) {
      return res.status(400).json({
        success: false,
        message: 'Método de pago debe ser "Efectivo" o "Transferencia"'
      });
    }

    // Verificar que el pedido existe
    const pedido = await queryOne('SELECT * FROM pedidos WHERE id = ?', [idPedido]);
    if (!pedido) {
      return res.status(400).json({
        success: false,
        message: 'Pedido no encontrado'
      });
    }

    // Verificar que no existe ya un cobro para este pedido
    const cobroExistente = await queryOne('SELECT * FROM cobros WHERE idPedido = ?', [idPedido]);
    if (cobroExistente) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe un cobro para este pedido'
      });
    }

    const result = await run(
      'INSERT INTO cobros (idPedido, monto, metodoPago) VALUES (?, ?, ?)',
      [idPedido, monto, metodoPago]
    );

    const nuevoCobro = await queryOne(`
      SELECT c.*, p.descripcion as descripcionPedido, cl.nombre as nombreCliente
      FROM cobros c 
      JOIN pedidos p ON c.idPedido = p.id 
      JOIN clientes cl ON p.idCliente = cl.id
      WHERE c.id = ?
    `, [result.id]);

    res.status(201).json({
      success: true,
      message: 'Cobro creado exitosamente',
      data: nuevoCobro
    });
  } catch (error) {
    console.error('Error al crear cobro:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear cobro'
    });
  }
});

module.exports = router; 