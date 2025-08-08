const axios = require('axios');

const BASE_URL = process.env.TEST_URL || 'http://localhost:8080';

async function testAPIFix() {
  console.log('🧪 Probando corrección de rutas API...\n');
  console.log(`🌐 URL: ${BASE_URL}\n`);
  
  try {
    // 1. Health Check
    console.log('1️⃣ Probando Health Check...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health Check:', healthResponse.status);
    console.log('📊 Content-Type:', healthResponse.headers['content-type']);
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
        const response = await axios.get(`${BASE_URL}${api.url}`);
        const contentType = response.headers['content-type'];
        const isJSON = contentType && contentType.includes('application/json');
        
        console.log(`✅ ${api.name}: ${response.status} (${response.data.data?.length || 0} registros)`);
        console.log(`   Content-Type: ${contentType} ${isJSON ? '✅' : '❌'}`);
        
        if (!isJSON) {
          console.log(`   ❌ ERROR: ${api.name} no devuelve JSON`);
          return false;
        }
      } catch (error) {
        console.log(`❌ ${api.name}: ${error.response?.status || 'Error'}`);
        return false;
      }
    }
    
    // 3. Verificar que el frontend también funcione
    console.log('\n3️⃣ Probando frontend...');
    try {
      const indexResponse = await axios.get(`${BASE_URL}/`);
      const contentType = indexResponse.headers['content-type'];
      const isHTML = contentType && contentType.includes('text/html');
      
      console.log('✅ Página principal:', indexResponse.status);
      console.log(`   Content-Type: ${contentType} ${isHTML ? '✅' : '❌'}`);
      
      if (!isHTML) {
        console.log(`   ❌ ERROR: Página principal no devuelve HTML`);
        return false;
      }
    } catch (error) {
      console.log('❌ Página principal:', error.response?.status || 'Error');
      return false;
    }
    
    console.log('\n🎉 ¡Corrección exitosa!');
    console.log('\n📊 Resumen:');
    console.log('   ✅ APIs devuelven JSON correctamente');
    console.log('   ✅ Frontend devuelve HTML correctamente');
    console.log('   ✅ No hay conflictos entre rutas');
    
    return true;
    
  } catch (error) {
    console.error('\n❌ Error en las pruebas:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    return false;
  }
}

// Ejecutar pruebas
testAPIFix().then(success => {
  if (success) {
    console.log('\n🚀 ¡Todas las pruebas pasaron!');
    process.exit(0);
  } else {
    console.log('\n❌ Algunas pruebas fallaron');
    process.exit(1);
  }
}); 