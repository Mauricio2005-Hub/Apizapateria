-- Script para crear la base de datos y tablas del sistema "Reparadora Fercho"
-- Ejecutar este script en MySQL para configurar la base de datos

-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS zapateria;
USE zapateria;

-- Tabla de Sucursales
CREATE TABLE IF NOT EXISTS sucursales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion TEXT NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(100),
    horario_apertura TIME,
    horario_cierre TIME,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de Horarios
CREATE TABLE IF NOT EXISTS horarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sucursal_id INT NOT NULL,
    dia_semana ENUM('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo') NOT NULL,
    hora_apertura TIME NOT NULL,
    hora_cierre TIME NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (sucursal_id) REFERENCES sucursales(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Métodos de Pago
CREATE TABLE IF NOT EXISTS metodos_pago (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Materiales
CREATE TABLE IF NOT EXISTS materiales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio_unitario DECIMAL(10,2) NOT NULL,
    stock_disponible INT DEFAULT 0,
    unidad_medida VARCHAR(20) DEFAULT 'unidad',
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de Clientes
CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    telefono VARCHAR(20),
    direccion TEXT,
    fecha_registro DATE DEFAULT (CURRENT_DATE),
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de Pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    sucursal_id INT NOT NULL,
    descripcion_trabajo TEXT NOT NULL,
    tipo_reparacion VARCHAR(100),
    fecha_pedido DATE DEFAULT (CURRENT_DATE),
    fecha_entrega_estimada DATE,
    fecha_entrega_real DATE,
    estado ENUM('Pendiente', 'En Proceso', 'Completado', 'Entregado', 'Cancelado') DEFAULT 'Pendiente',
    precio_total DECIMAL(10,2) DEFAULT 0.00,
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
    FOREIGN KEY (sucursal_id) REFERENCES sucursales(id) ON DELETE CASCADE
);

-- Tabla de Cobros
CREATE TABLE IF NOT EXISTS cobros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    metodo_pago_id INT NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    fecha_cobro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    referencia_pago VARCHAR(100),
    estado ENUM('Pendiente', 'Completado', 'Cancelado') DEFAULT 'Pendiente',
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (metodo_pago_id) REFERENCES metodos_pago(id) ON DELETE CASCADE
);

-- Tabla de Materiales por Pedido
CREATE TABLE IF NOT EXISTS materiales_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    material_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (material_id) REFERENCES materiales(id) ON DELETE CASCADE
);

-- Insertar datos de ejemplo para métodos de pago
INSERT INTO metodos_pago (nombre, descripcion) VALUES
('Efectivo', 'Pago en efectivo'),
('Tarjeta de Débito', 'Pago con tarjeta de débito'),
('Tarjeta de Crédito', 'Pago con tarjeta de crédito'),
('Transferencia', 'Transferencia bancaria'),
('Depósito', 'Depósito bancario');

-- Insertar sucursal de ejemplo
INSERT INTO sucursales (nombre, direccion, telefono, email, horario_apertura, horario_cierre) VALUES
('Reparadora Fercho - Sucursal Principal', 'Av. Principal 123, Ciudad', '555-0123', 'info@reparadorafercho.com', '08:00:00', '18:00:00');

-- Insertar horarios de ejemplo para la sucursal
INSERT INTO horarios (sucursal_id, dia_semana, hora_apertura, hora_cierre) VALUES
(1, 'Lunes', '08:00:00', '18:00:00'),
(1, 'Martes', '08:00:00', '18:00:00'),
(1, 'Miércoles', '08:00:00', '18:00:00'),
(1, 'Jueves', '08:00:00', '18:00:00'),
(1, 'Viernes', '08:00:00', '18:00:00'),
(1, 'Sábado', '08:00:00', '14:00:00');

-- Insertar materiales de ejemplo
INSERT INTO materiales (nombre, descripcion, precio_unitario, stock_disponible, unidad_medida) VALUES
('Suela de Goma', 'Suela de goma para zapatos deportivos', 25.00, 50, 'par'),
('Tacón de Cuero', 'Tacón de cuero natural', 15.00, 30, 'unidad'),
('Hilo de Coser', 'Hilo resistente para calzado', 5.00, 100, 'rollo'),
('Pegamento para Calzado', 'Pegamento especializado', 12.00, 25, 'frasco'),
('Cordones', 'Cordones de algodón', 8.00, 80, 'par'); 