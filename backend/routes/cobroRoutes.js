const express = require('express');
const router = express.Router();
const { query, queryOne, run } = require('../db');

/**
 * @swagger
 * /cobros:
 *   get:
 *     summary: Obtener todos los cobros
 *     description: Retorna una lista de todos los cobros con información del pedido y cliente asociado
 *     tags: [Cobros]
 *     responses:
 *       200:
 *         description: Lista de cobros obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Cobro'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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

/**
 * @swagger
 * /cobros:
 *   post:
 *     summary: Crear un nuevo cobro
 *     description: Crea un nuevo cobro para un pedido específico
 *     tags: [Cobros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idPedido
 *               - monto
 *               - metodoPago
 *             properties:
 *               idPedido:
 *                 type: integer
 *                 description: ID del pedido asociado
 *                 example: 1
 *               monto:
 *                 type: number
 *                 description: Monto del cobro
 *                 example: 45.00
 *               metodoPago:
 *                 type: string
 *                 enum: [Efectivo, Transferencia]
 *                 description: Método de pago utilizado
 *                 example: "Efectivo"
 *     responses:
 *       201:
 *         description: Cobro creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Cobro creado exitosamente"
 *                 data:
 *                   $ref: '#/components/schemas/Cobro'
 *       400:
 *         description: Datos inválidos o pedido no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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