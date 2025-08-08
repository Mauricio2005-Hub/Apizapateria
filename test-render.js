const axios = require('axios');

const BASE_URL = process.env.TEST_URL || 'http://localhost:8080';

async function testRenderConfig() {
  console.log('🧪 Probando configuración para Render...\n');
  
  try {
    // 1. Verificar que el servidor responde
    console.log('1️⃣ Probando health check...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check:', healthResponse.data);
    
    // 2. Verificar que las APIs funcionan
    console.log('\n2️⃣ Probando APIs...');
    const clientesResponse = await axios.get(`${BASE_URL}/api/clientes`);
    console.log('✅ API Clientes:', clientesResponse.status);
    
    const pedidosResponse = await axios.get(`${BASE_URL}/api/pedidos`);
    console.log('✅ API Pedidos:', pedidosResponse.status);
    
    // 3. Verificar Swagger UI
    console.log('\n3️⃣ Probando Swagger UI...');
    const swaggerResponse = await axios.get(`${BASE_URL}/api-docs`);
    console.log('✅ Swagger UI:', swaggerResponse.status);
    
    // 4. Verificar página principal
    console.log('\n4️⃣ Probando página principal...');
    const indexResponse = await axios.get(`${BASE_URL}/`);
    console.log('✅ Página principal:', indexResponse.status);
    
    console.log('\n🎉 ¡Configuración correcta para Render!');
    console.log('\n📊 URLs de prueba:');
    console.log(`   - Health: ${BASE_URL}/health`);
    console.log(`   - API: ${BASE_URL}/api/clientes`);
    console.log(`   - Swagger: ${BASE_URL}/api-docs`);
    console.log(`   - Principal: ${BASE_URL}/`);
    
  } catch (error) {
    console.error('\n❌ Error en las pruebas:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    process.exit(1);
  }
}

testRenderConfig(); 