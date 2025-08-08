const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Swagger UI
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

// Importar rutas
const clienteRoutes = require('./routes/clienteRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const cobroRoutes = require('./routes/cobroRoutes');
const sucursalRoutes = require('./routes/sucursalRoutes');
const materialRoutes = require('./routes/materialRoutes');

// Importar configuración de base de datos
const { testConnection } = require('./db');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Swagger UI visual mejorado
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info .title { color: #667eea; font-size: 2.5rem; }
    .swagger-ui .info .description { font-size: 1.1rem; }
    .swagger-ui .scheme-container { background: #f8f9fa; padding: 20px; border-radius: 10px; }
    .swagger-ui .opblock.opblock-get .opblock-summary-method { background: #61affe; }
    .swagger-ui .opblock.opblock-post .opblock-summary-method { background: #49cc90; }
    .swagger-ui .opblock.opblock-put .opblock-summary-method { background: #fca130; }
    .swagger-ui .opblock.opblock-delete .opblock-summary-method { background: #f93e3e; }
    .swagger-ui .btn.execute { background: #667eea; border-color: #667eea; }
    .swagger-ui .btn.execute:hover { background: #764ba2; border-color: #764ba2; }
  `,
  customSiteTitle: 'API Documentation - Reparadora Fercho',
  customfavIcon: '/favicon.ico',
  swaggerOptions: {
    docExpansion: 'list',
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
    tryItOutEnabled: true,
    displayRequestDuration: true,
    defaultModelsExpandDepth: 2,
    defaultModelExpandDepth: 2,
    displayOperationId: false,
    supportedSubmitMethods: ['get', 'post', 'put', 'delete'],
    validatorUrl: null
  },
  explorer: true
}));

// Rutas API
app.use('/api/clientes', clienteRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/cobros', cobroRoutes);
app.use('/api/sucursales', sucursalRoutes);
app.use('/api/materiales', materialRoutes);

// Ruta principal - Menú de navegación
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Ruta para el archivo Swagger JSON (mantener para compatibilidad)
app.get('/swagger.json', (req, res) => {
  res.sendFile(path.join(__dirname, './docs/swagger.json'));
});

// Ruta para manejar todas las páginas del frontend
app.get('/:page', (req, res) => {
  const page = req.params.page;
  const validPages = ['cliente', 'pedido', 'cobro', 'sucursal', 'material'];
  
  if (validPages.includes(page)) {
    res.sendFile(path.join(__dirname, `../frontend/${page}.html`));
  } else {
    res.status(404).send('Página no encontrada');
  }
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Ruta para manejar rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Iniciar servidor
app.listen(PORT, async () => {
  console.log(`🚀 Servidor iniciado en puerto ${PORT}`);
  console.log(`📊 Menú principal: http://localhost:${PORT}`);
  console.log(`🔧 API Base: http://localhost:${PORT}/api`);
  console.log(`📚 Swagger UI disponible en http://localhost:${PORT}/api-docs`);
  
  // Probar conexión a la base de datos
  await testConnection();
});

module.exports = app; 