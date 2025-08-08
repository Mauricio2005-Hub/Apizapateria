const swaggerJSDoc = require('swagger-jsdoc');
const fs = require('fs');
const path = require('path');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Zapatería - Reparadora Fercho',
    version: '1.0.0',
    description: 'Documentación completa de la API para el sistema de gestión de zapatería. Incluye todas las operaciones CRUD para clientes, pedidos, cobros, sucursales y materiales.',
    contact: {
      name: 'Reparadora Fercho',
      email: 'info@reparadorafercho.com'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  servers: [
    {
      url: 'http://localhost:8080/api',
      description: 'Servidor de desarrollo local'
    },
    {
      url: 'https://tu-app.onrender.com/api',
      description: 'Servidor de producción (Render)'
    }
  ],
  components: {
    schemas: {
      Cliente: {
        type: 'object',
        required: ['nombre', 'telefono'],
        properties: {
          id: {
            type: 'integer',
            description: 'ID único del cliente'
          },
          nombre: {
            type: 'string',
            description: 'Nombre completo del cliente'
          },
          telefono: {
            type: 'string',
            description: 'Número de teléfono del cliente'
          },
          fecha_registro: {
            type: 'string',
            format: 'date-time',
            description: 'Fecha de registro del cliente'
          }
        }
      },
      Pedido: {
        type: 'object',
        required: ['cliente_id', 'sucursal_id', 'descripcion_trabajo', 'precio_total'],
        properties: {
          id: {
            type: 'integer',
            description: 'ID único del pedido'
          },
          cliente_id: {
            type: 'integer',
            description: 'ID del cliente asociado'
          },
          sucursal_id: {
            type: 'integer',
            description: 'ID de la sucursal donde se realiza el trabajo'
          },
          descripcion_trabajo: {
            type: 'string',
            description: 'Descripción detallada del trabajo a realizar'
          },
          precio_total: {
            type: 'number',
            description: 'Precio total del trabajo'
          },
          fecha_entrega_estimada: {
            type: 'string',
            format: 'date',
            description: 'Fecha estimada de entrega'
          },
          estado: {
            type: 'string',
            enum: ['Pendiente', 'En Proceso', 'Completado', 'Entregado'],
            description: 'Estado actual del pedido'
          },
          observaciones: {
            type: 'string',
            description: 'Observaciones adicionales'
          },
          fecha_creacion: {
            type: 'string',
            format: 'date-time',
            description: 'Fecha de creación del pedido'
          }
        }
      },
      Cobro: {
        type: 'object',
        required: ['pedido_id', 'monto', 'metodo_pago'],
        properties: {
          id: {
            type: 'integer',
            description: 'ID único del cobro'
          },
          pedido_id: {
            type: 'integer',
            description: 'ID del pedido asociado'
          },
          monto: {
            type: 'number',
            description: 'Monto del cobro'
          },
          metodo_pago: {
            type: 'string',
            enum: ['Efectivo', 'Tarjeta', 'Transferencia'],
            description: 'Método de pago utilizado'
          },
          fecha_cobro: {
            type: 'string',
            format: 'date-time',
            description: 'Fecha del cobro'
          }
        }
      },
      Sucursal: {
        type: 'object',
        required: ['nombre', 'direccion', 'telefono'],
        properties: {
          id: {
            type: 'integer',
            description: 'ID único de la sucursal'
          },
          nombre: {
            type: 'string',
            description: 'Nombre de la sucursal'
          },
          direccion: {
            type: 'string',
            description: 'Dirección de la sucursal'
          },
          telefono: {
            type: 'string',
            description: 'Teléfono de la sucursal'
          },
          estado: {
            type: 'string',
            enum: ['Activa', 'Inactiva'],
            description: 'Estado de la sucursal'
          },
          fecha_creacion: {
            type: 'string',
            format: 'date-time',
            description: 'Fecha de creación de la sucursal'
          }
        }
      },
      Material: {
        type: 'object',
        required: ['nombre', 'cantidad_disponible', 'precio_unitario'],
        properties: {
          id: {
            type: 'integer',
            description: 'ID único del material'
          },
          nombre: {
            type: 'string',
            description: 'Nombre del material'
          },
          descripcion: {
            type: 'string',
            description: 'Descripción del material'
          },
          cantidad_disponible: {
            type: 'integer',
            description: 'Cantidad disponible en inventario'
          },
          precio_unitario: {
            type: 'number',
            description: 'Precio unitario del material'
          },
          categoria: {
            type: 'string',
            description: 'Categoría del material'
          },
          fecha_creacion: {
            type: 'string',
            format: 'date-time',
            description: 'Fecha de creación del material'
          }
        }
      },
      Error: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false
          },
          message: {
            type: 'string',
            description: 'Mensaje de error'
          }
        }
      },
      Success: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true
          },
          data: {
            type: 'object',
            description: 'Datos de la respuesta'
          },
          message: {
            type: 'string',
            description: 'Mensaje de éxito'
          }
        }
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['./backend/routes/*.js'], // Rutas de la API
};

const swaggerSpec = swaggerJSDoc(options);

// Guardar archivo JSON en disco
const outputPath = path.join(__dirname, 'swagger.json');
fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2));
console.log('✅ Archivo swagger.json generado en:', outputPath);

module.exports = swaggerSpec; 