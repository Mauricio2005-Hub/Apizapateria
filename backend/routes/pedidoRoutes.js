const express = require('express');
const router = express.Router();
const { query, queryOne, run } = require('../db');

/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Obtener todos los pedidos
 *     description: Retorna una lista de todos los pedidos con información del cliente y sucursal
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos obtenida exitosamente
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
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       idCliente:
 *                         type: integer
 *                       idSucursal:
 *                         type: integer
 *                       descripcion:
 *                         type: string
 *                       estado:
 *                         type: string
 *                       fecha_creacion:
 *                         type: string
 *                       nombreCliente:
 *                         type: string
 *                       nombreSucursal:
 *                         type: string
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Crear un nuevo pedido
 *     description: Crea un nuevo pedido en el sistema
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idCliente
 *               - idSucursal
 *               - descripcion
 *             properties:
 *               idCliente:
 *                 type: integer
 *                 description: ID del cliente
 *                 example: 1
 *               idSucursal:
 *                 type: integer
 *                 description: ID de la sucursal
 *                 example: 1
 *               descripcion:
 *                 type: string
 *                 description: Descripción del trabajo a realizar
 *                 example: "Reparación de suela de zapato deportivo"
 *               estado:
 *                 type: string
 *                 enum: [Pendiente, Entregado]
 *                 description: Estado del pedido
 *                 example: "Pendiente"
 *     responses:
 *       201:
 *         description: Pedido creado exitosamente
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
 *                   example: "Pedido creado exitosamente"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     idCliente:
 *                       type: integer
 *                     idSucursal:
 *                       type: integer
 *                     descripcion:
 *                       type: string
 *                     estado:
 *                       type: string
 *                     fecha_creacion:
 *                       type: string
 *                     nombreCliente:
 *                       type: string
 *                     nombreSucursal:
 *                       type: string
 *       400:
 *         description: Datos inválidos o cliente/sucursal no encontrado
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