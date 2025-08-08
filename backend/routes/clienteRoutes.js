const express = require('express');
const router = express.Router();
const { query, queryOne, run } = require('../db');

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Obtener todos los clientes
 *     description: Retorna una lista de todos los clientes registrados en el sistema
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida exitosamente
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
 *                     $ref: '#/components/schemas/Cliente'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Crear un nuevo cliente
 *     description: Crea un nuevo cliente en el sistema
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - telefono
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre completo del cliente
 *                 example: "Juan Pérez"
 *               telefono:
 *                 type: string
 *                 description: Número de teléfono del cliente
 *                 example: "555-1234"
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
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
 *                   example: "Cliente creado exitosamente"
 *                 data:
 *                   $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Datos inválidos
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

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Eliminar un cliente
 *     description: Elimina un cliente del sistema. No se puede eliminar si tiene pedidos asociados
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente a eliminar
 *     responses:
 *       200:
 *         description: Cliente eliminado exitosamente
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
 *                   example: "Cliente eliminado exitosamente"
 *       400:
 *         description: No se puede eliminar el cliente porque tiene pedidos asociados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Cliente no encontrado
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