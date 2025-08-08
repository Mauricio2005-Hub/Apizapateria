const axios = require('axios');

const BASE_URL = process.env.TEST_URL || 'http://localhost:8080';

async function testAPI() {
  console.log('🧪 Iniciando pruebas de API...\n');

  try {
    // 1. Probar health check
    console.log('1️⃣ Probando health check...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check:', healthResponse.data);

    // 2. Probar Swagger UI
    console.log('\n2️⃣ Probando Swagger UI...');
    const swaggerResponse = await axios.get(`${BASE_URL}/api-docs`);
    console.log('✅ Swagger UI disponible');

    // 3. Probar obtener clientes
    console.log('\n3️⃣ Probando obtener clientes...');
    const clientesResponse = await axios.get(`${BASE_URL}/api/clientes`);
    console.log('✅ Clientes obtenidos:', clientesResponse.data.data.length, 'clientes');

    // 4. Probar obtener sucursales
    console.log('\n4️⃣ Probando obtener sucursales...');
    const sucursalesResponse = await axios.get(`${BASE_URL}/api/sucursales`);
    console.log('✅ Sucursales obtenidas:', sucursalesResponse.data.data.length, 'sucursales');

    // 5. Probar obtener pedidos
    console.log('\n5️⃣ Probando obtener pedidos...');
    const pedidosResponse = await axios.get(`${BASE_URL}/api/pedidos`);
    console.log('✅ Pedidos obtenidos:', pedidosResponse.data.data.length, 'pedidos');

    // 6. Probar obtener cobros
    console.log('\n6️⃣ Probando obtener cobros...');
    const cobrosResponse = await axios.get(`${BASE_URL}/api/cobros`);
    console.log('✅ Cobros obtenidos:', cobrosResponse.data.data.length, 'cobros');

    // 7. Probar obtener materiales
    console.log('\n7️⃣ Probando obtener materiales...');
    const materialesResponse = await axios.get(`${BASE_URL}/api/materiales`);
    console.log('✅ Materiales obtenidos:', materialesResponse.data.data.length, 'materiales');

    // 8. Probar crear un cliente
    console.log('\n8️⃣ Probando crear cliente...');
    const nuevoCliente = {
      nombre: 'Cliente de Prueba',
      telefono: '555-9999'
    };
    const clienteCreado = await axios.post(`${BASE_URL}/api/clientes`, nuevoCliente);
    console.log('✅ Cliente creado:', clienteCreado.data.data);

    // 9. Probar crear un pedido
    console.log('\n9️⃣ Probando crear pedido...');
    const nuevoPedido = {
      idCliente: 1,
      idSucursal: 1,
      descripcion: 'Reparación de prueba',
      estado: 'Pendiente'
    };
    const pedidoCreado = await axios.post(`${BASE_URL}/api/pedidos`, nuevoPedido);
    console.log('✅ Pedido creado:', pedidoCreado.data.data);

    console.log('\n🎉 ¡Todas las pruebas pasaron exitosamente!');
    console.log('\n📊 Resumen:');
    console.log('   - Health check: ✅');
    console.log('   - Swagger UI: ✅');
    console.log('   - APIs GET: ✅');
    console.log('   - APIs POST: ✅');
    console.log('   - Base de datos: ✅');

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
testAPI(); 