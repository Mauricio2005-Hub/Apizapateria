const axios = require('axios');

// URL de Render (cambiar por tu URL real)
const RENDER_URL = process.env.RENDER_URL || 'https://zapateria-fercho-api.onrender.com';

async function verificarRender() {
  console.log('🔍 Verificando conexión con Render...\n');
  console.log(`🌐 URL: ${RENDER_URL}\n`);
  
  try {
    // 1. Health Check
    console.log('1️⃣ Probando Health Check...');
    const healthResponse = await axios.get(`${RENDER_URL}/health`, {
      timeout: 10000
    });
    console.log('✅ Health Check:', healthResponse.status);
    console.log('📊 Data:', healthResponse.data);
    
    // 2. APIs
    console.log('\n2️⃣ Probando APIs...');
    
    const apis = [
      { name: 'Clientes', url: '/api/clientes' },
      { name: 'Pedidos', url: '/api/pedidos' },
      { name: 'Sucursales', url: '/api/sucursales' },
      { name: 'Cobros', url: '/api/cobros' },
      { name: 'Materiales', url: '/api/materiales' }
    ];
    
    for (const api of apis) {
      try {
        const response = await axios.get(`${RENDER_URL}${api.url}`, {
          timeout: 10000
        });
        console.log(`✅ ${api.name}: ${response.status} (${response.data.data?.length || 0} registros)`);
      } catch (error) {
        console.log(`❌ ${api.name}: ${error.response?.status || 'Error'}`);
      }
    }
    
    // 3. Swagger UI
    console.log('\n3️⃣ Probando Swagger UI...');
    try {
      const swaggerResponse = await axios.get(`${RENDER_URL}/api-docs`, {
        timeout: 10000
      });
      console.log('✅ Swagger UI:', swaggerResponse.status);
    } catch (error) {
      console.log('❌ Swagger UI:', error.response?.status || 'Error');
    }
    
    // 4. Página principal
    console.log('\n4️⃣ Probando página principal...');
    try {
      const indexResponse = await axios.get(`${RENDER_URL}/`, {
        timeout: 10000
      });
      console.log('✅ Página principal:', indexResponse.status);
    } catch (error) {
      console.log('❌ Página principal:', error.response?.status || 'Error');
    }
    
    console.log('\n🎉 ¡Conexión con Render exitosa!');
    console.log('\n📊 URLs disponibles:');
    console.log(`   - Health: ${RENDER_URL}/health`);
    console.log(`   - API: ${RENDER_URL}/api/clientes`);
    console.log(`   - Swagger: ${RENDER_URL}/api-docs`);
    console.log(`   - Principal: ${RENDER_URL}/`);
    
  } catch (error) {
    console.error('\n❌ Error conectando con Render:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    
    console.log('\n🔧 Soluciones posibles:');
    console.log('1. Verificar que el servicio esté desplegado en Render');
    console.log('2. Verificar la URL en RENDER_URL');
    console.log('3. Revisar logs en el dashboard de Render');
    console.log('4. Esperar unos minutos si el servicio está iniciando');
    
    process.exit(1);
  }
}

// Ejecutar verificación
verificarRender(); 