const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API de Zapatería - Reparadora Fercho",
    version: "1.0.0",
    description: "Documentación completa de la API para el sistema de gestión de zapatería. Incluye todas las operaciones CRUD para clientes, pedidos, cobros, sucursales y materiales.",
    contact: {
      name: "Reparadora Fercho",
      email: "info@reparadorafercho.com",
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT"
    }
  },
  servers: [
    {
      url: "http://localhost:8080/api",
      description: "Servidor de desarrollo local",
    },
    {
      url: "https://zapateria-fercho-api.onrender.com/api",
      description: "Servidor de producción (Render)"
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
          }
        }
      },
      Pedido: {
        type: 'object',
        required: ['idCliente', 'idSucursal', 'descripcion'],
        properties: {
          id: {
            type: 'integer',
            description: 'ID único del pedido'
          },
          idCliente: {
            type: 'integer',
            description: 'ID del cliente asociado'
          },
          idSucursal: {
            type: 'integer',
            description: 'ID de la sucursal donde se realiza el trabajo'
          },
          descripcion: {
            type: 'string',
            description: 'Descripción detallada del trabajo a realizar'
          },
          estado: {
            type: 'string',
            enum: ['Pendiente', 'Entregado'],
            description: 'Estado actual del pedido'
          },
          fecha_creacion: {
            type: 'string',
            format: 'date-time',
            description: 'Fecha de creación del pedido'
          },
          nombreCliente: {
            type: 'string',
            description: 'Nombre del cliente'
          },
          nombreSucursal: {
            type: 'string',
            description: 'Nombre de la sucursal'
          }
        }
      },
      Cobro: {
        type: 'object',
        required: ['idPedido', 'monto', 'metodoPago'],
        properties: {
          id: {
            type: 'integer',
            description: 'ID único del cobro'
          },
          idPedido: {
            type: 'integer',
            description: 'ID del pedido asociado'
          },
          monto: {
            type: 'number',
            description: 'Monto del cobro'
          },
          metodoPago: {
            type: 'string',
            enum: ['Efectivo', 'Transferencia'],
            description: 'Método de pago utilizado'
          },
          fecha_cobro: {
            type: 'string',
            format: 'date-time',
            description: 'Fecha del cobro'
          },
          descripcionPedido: {
            type: 'string',
            description: 'Descripción del pedido asociado'
          },
          nombreCliente: {
            type: 'string',
            description: 'Nombre del cliente'
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
          }
        }
      },
      Material: {
        type: 'object',
        required: ['nombre', 'precio_unitario'],
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
          precio_unitario: {
            type: 'number',
            description: 'Precio unitario del material'
          },
          stock: {
            type: 'integer',
            description: 'Cantidad disponible en inventario'
          },
          unidad: {
            type: 'string',
            description: 'Unidad de medida del material'
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
  apis: ["./backend/routes/*.js"], // Rutas de la API
};

const swaggerSpec = swaggerJsdoc(options);

// ✅ Exportar el JSON al iniciar
fs.writeFileSync(path.join(__dirname, "swagger.json"), JSON.stringify(swaggerSpec, null, 2));
console.log("✅ Archivo swagger.json generado en:", path.join(__dirname, "swagger.json"));

module.exports = swaggerSpec; 