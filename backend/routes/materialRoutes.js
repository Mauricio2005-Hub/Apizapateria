const express = require('express');
const router = express.Router();
const { query, queryOne, run } = require('../db');

/**
 * @swagger
 * /materiales:
 *   get:
 *     summary: Obtener todos los materiales
 *     description: Retorna una lista de todos los materiales ordenados por nombre
 *     tags: [Materiales]
 *     responses:
 *       200:
 *         description: Lista de materiales obtenida exitosamente
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
 *                     $ref: '#/components/schemas/Material'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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

/**
 * @swagger
 * /materiales:
 *   post:
 *     summary: Crear un nuevo material
 *     description: Crea un nuevo material en el inventario
 *     tags: [Materiales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - precio_unitario
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del material
 *                 example: "Suela de cuero"
 *               descripcion:
 *                 type: string
 *                 description: Descripción del material
 *                 example: "Suela de cuero natural para zapatos"
 *               precio_unitario:
 *                 type: number
 *                 description: Precio unitario del material
 *                 example: 25.50
 *               stock:
 *                 type: integer
 *                 description: Cantidad disponible en inventario
 *                 example: 100
 *               unidad:
 *                 type: string
 *                 description: Unidad de medida
 *                 example: "Unidad"
 *     responses:
 *       201:
 *         description: Material creado exitosamente
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
 *                   example: "Material creado exitosamente"
 *                 data:
 *                   $ref: '#/components/schemas/Material'
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