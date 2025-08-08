const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Swagger UI
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../swaggerOptions");

// Importar rutas
const clienteRoutes = require('./routes/clienteRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const cobroRoutes = require('./routes/cobroRoutes');
const sucursalRoutes = require('./routes/sucursalRoutes');
const materialRoutes = require('./routes/materialRoutes');

// Importar configuración de base de datos
const { testConnection } = require('./db');

const app = express();

// Configuración de puerto para Render
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://zapateria-fercho-api.onrender.com', 'https://zapateria-fercho.onrender.com']
    : true,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware de logging para desarrollo
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    if (req.body && Object.keys(req.body).length > 0) {
      console.log('Request Body:', JSON.stringify(req.body, null, 2));
    }
    next();
  });
}

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// ✅ Ruta Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
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

// Ruta de health check para Render
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Servidor funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Ruta principal - Menú de navegación
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Ruta para el archivo Swagger JSON
app.get('/swagger.json', (req, res) => {
  res.json(swaggerSpec);
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
const server = app.listen(PORT, async () => {
  console.log(`🚀 Servidor iniciado en puerto ${PORT}`);
  console.log(`📊 Menú principal: http://localhost:${PORT}`);
  console.log(`🔧 API Base: http://localhost:${PORT}/api`);
  console.log(`📚 Swagger UI disponible en http://localhost:${PORT}/api-docs`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  
  // Probar conexión a la base de datos
  await testConnection();
});

// Manejo de errores del servidor
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Puerto ${PORT} ya está en uso`);
    process.exit(1);
  } else {
    console.error('❌ Error del servidor:', error);
  }
});

// Manejo de señales de terminación
process.on('SIGTERM', () => {
  console.log('🛑 Recibida señal SIGTERM, cerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor cerrado correctamente');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 Recibida señal SIGINT, cerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor cerrado correctamente');
    process.exit(0);
  });
});

module.exports = app; 