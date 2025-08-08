const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'zapateria.db');
const db = new sqlite3.Database(dbPath);

// Crear tablas si no existen
db.serialize(() => {
  // Tabla de clientes
  db.run(`CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    telefono TEXT NOT NULL
  )`);

  // Tabla de sucursales
  db.run(`CREATE TABLE IF NOT EXISTS sucursales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    direccion TEXT NOT NULL,
    telefono TEXT NOT NULL,
    estado TEXT DEFAULT 'Activa'
  )`);

  // Tabla de materiales
  db.run(`CREATE TABLE IF NOT EXISTS materiales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    precio_unitario REAL NOT NULL,
    stock INTEGER DEFAULT 0,
    unidad TEXT DEFAULT 'Unidad'
  )`);

  // Tabla de pedidos
  db.run(`CREATE TABLE IF NOT EXISTS pedidos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    idCliente INTEGER NOT NULL,
    idSucursal INTEGER NOT NULL,
    descripcion TEXT NOT NULL,
    estado TEXT DEFAULT 'Pendiente',
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idCliente) REFERENCES clientes(id),
    FOREIGN KEY (idSucursal) REFERENCES sucursales(id)
  )`);

  // Tabla de cobros
  db.run(`CREATE TABLE IF NOT EXISTS cobros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    idPedido INTEGER NOT NULL,
    monto REAL NOT NULL,
    metodoPago TEXT NOT NULL,
    fecha_cobro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idPedido) REFERENCES pedidos(id)
  )`);

  // Insertar datos de ejemplo
  db.run(`INSERT OR IGNORE INTO clientes (nombre, telefono) VALUES
    ('Juan Pérez', '555-0101'),
    ('María García', '555-0202'),
    ('Carlos López', '555-0303')`);

  db.run(`INSERT OR IGNORE INTO sucursales (nombre, direccion, telefono, estado) VALUES
    ('Sucursal Centro', 'Av. Principal 123, Centro', '555-1001', 'Activa'),
    ('Sucursal Norte', 'Calle Norte 456, Norte', '555-1002', 'Activa'),
    ('Sucursal Sur', 'Blvd. Sur 789, Sur', '555-1003', 'Activa')`);

  db.run(`INSERT OR IGNORE INTO materiales (nombre, descripcion, precio_unitario, stock, unidad) VALUES
    ('Suela de Goma', 'Suela de goma para zapatos deportivos', 25.00, 50, 'Par'),
    ('Tacón de Cuero', 'Tacón de cuero natural', 15.00, 30, 'Unidad'),
    ('Hilo de Reparación', 'Hilo resistente para costuras', 5.00, 100, 'Metro'),
    ('Pegamento de Zapatero', 'Pegamento especial para calzado', 12.00, 25, 'Tubo'),
    ('Cepillo de Limpieza', 'Cepillo para limpiar calzado', 8.00, 40, 'Unidad')`);

  db.run(`INSERT OR IGNORE INTO pedidos (idCliente, idSucursal, descripcion, estado) VALUES
    (1, 1, 'Reparación de suela', 'Pendiente'),
    (2, 2, 'Cambio de tacón', 'Entregado'),
    (3, 1, 'Ajuste de horma', 'Pendiente')`);

  db.run(`INSERT OR IGNORE INTO cobros (idPedido, monto, metodoPago) VALUES
    (1, 45.00, 'Efectivo'),
    (2, 60.00, 'Transferencia'),
    (3, 30.00, 'Efectivo')`);
});

// Funciones de base de datos
function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function queryOne(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, changes: this.changes });
      }
    });
  });
}

async function testConnection() {
  try {
    await query('SELECT 1');
    console.log('✅ Conexión a la base de datos SQLite establecida correctamente');
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
  }
}

module.exports = { db, query, queryOne, run, testConnection }; 