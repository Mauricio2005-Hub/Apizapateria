const axios = require('axios');

// URL de producción (cambiar por tu URL real de Render)
const PRODUCTION_URL = process.env.RENDER_URL || 'https://tu-app.onrender.com';

async function testProductionAPI() {
  console.log('🧪 Probando API en producción (Render)...\n');
  console.log(`🌐 URL: ${PRODUCTION_URL}\n`);
  
  try {
    // 1. Health Check
    console.log('1️⃣ Probando Health Check...');
    const healthResponse = await axios.get(`${PRODUCTION_URL}/health`);
    console.log('✅ Health Check:', healthResponse.status);
    console.log('📊 Data:', healthResponse.data);
    
    // 2. APIs GET
    console.log('\n2️⃣ Probando APIs GET...');
    
    const apis = [
      { name: 'Clientes', url: '/api/clientes' },
      { name: 'Pedidos', url: '/api/pedidos' },
      { name: 'Sucursales', url: '/api/sucursales' },
      { name: 'Cobros', url: '/api/cobros' },
      { name: 'Materiales', url: '/api/materiales' }
    ];
    
    for (const api of apis) {
      try {
        const response = await axios.get(`${PRODUCTION_URL}${api.url}`);
        console.log(`✅ ${api.name}: ${response.status} (${response.data.data?.length || 0} registros)`);
      } catch (error) {
        console.log(`❌ ${api.name}: ${error.response?.status || 'Error'}`);
      }
    }
    
    // 3. Swagger UI
    console.log('\n3️⃣ Probando Swagger UI...');
    try {
      const swaggerResponse = await axios.get(`${PRODUCTION_URL}/api-docs`);
      console.log('✅ Swagger UI:', swaggerResponse.status);
    } catch (error) {
      console.log('❌ Swagger UI:', error.response?.status || 'Error');
    }
    
    // 4. Página principal
    console.log('\n4️⃣ Probando página principal...');
    try {
      const indexResponse = await axios.get(`${PRODUCTION_URL}/`);
      console.log('✅ Página principal:', indexResponse.status);
    } catch (error) {
      console.log('❌ Página principal:', error.response?.status || 'Error');
    }
    
    // 5. Crear datos de prueba
    console.log('\n5️⃣ Probando creación de datos...');
    
    // Crear cliente
    try {
      const clienteData = {
        nombre: 'Cliente de Prueba Render',
        telefono: '555-RENDER'
      };
      const clienteResponse = await axios.post(`${PRODUCTION_URL}/api/clientes`, clienteData);
      console.log('✅ Cliente creado:', clienteResponse.status);
    } catch (error) {
      console.log('❌ Error creando cliente:', error.response?.status || 'Error');
    }
    
    // Crear pedido
    try {
      const pedidoData = {
        idCliente: 1,
        idSucursal: 1,
        descripcion: 'Prueba desde Render',
        estado: 'Pendiente'
      };
      const pedidoResponse = await axios.post(`${PRODUCTION_URL}/api/pedidos`, pedidoData);
      console.log('✅ Pedido creado:', pedidoResponse.status);
    } catch (error) {
      console.log('❌ Error creando pedido:', error.response?.status || 'Error');
    }
    
    console.log('\n🎉 ¡Pruebas completadas!');
    console.log('\n📊 Resumen de URLs:');
    console.log(`   - Health: ${PRODUCTION_URL}/health`);
    console.log(`   - API: ${PRODUCTION_URL}/api/clientes`);
    console.log(`   - Swagger: ${PRODUCTION_URL}/api-docs`);
    console.log(`   - Principal: ${PRODUCTION_URL}/`);
    
  } catch (error) {
    console.error('\n❌ Error en las pruebas:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    process.exit(1);
  }
}

// Ejecutar pruebas
testProductionAPI(); 