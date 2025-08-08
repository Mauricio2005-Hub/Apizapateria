# 🚀 PROMPT COMPLETO - DESPLIEGUE EN RENDER - SISTEMA ZAPATERÍA

## 📋 **DESCRIPCIÓN DEL PROYECTO**

Sistema web completo para gestión de zapatería "Reparadora Fercho" con API REST, documentación Swagger, interfaz web moderna y base de datos SQLite.

---

## 🏗️ **ARQUITECTURA DEL SISTEMA**

### **Backend (Node.js + Express)**
```
backend/
├── server.js              # Servidor principal Express
├── db.js                  # Configuración SQLite
├── zapateria.db          # Base de datos SQLite
├── create_tables.sql     # Script de creación de tablas
└── routes/               # Rutas API
    ├── clienteRoutes.js   # Gestión de clientes
    ├── pedidoRoutes.js    # Gestión de pedidos
    ├── cobroRoutes.js     # Gestión de cobros
    ├── sucursalRoutes.js  # Gestión de sucursales
    └── materialRoutes.js  # Gestión de materiales
```

### **Frontend (HTML/CSS/JavaScript)**
```
frontend/
├── index.html            # Página principal
├── cliente.html          # Gestión de clientes
├── pedido.html           # Gestión de pedidos
├── cobro.html            # Gestión de cobros
├── sucursal.html         # Gestión de sucursales
├── material.html         # Gestión de materiales
└── css/                  # Estilos CSS
```

---

## 📦 **DEPENDENCIAS Y CONFIGURACIÓN**

### **package.json**
```json
{
  "name": "zapateria-app",
  "version": "1.0.0",
  "description": "Sistema de gestión para zapatería Reparadora Fercho",
  "main": "backend/server.js",
  "scripts": {
    "start": "node backend/server.js",
    "dev": "nodemon backend/server.js",
    "build": "npm install"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "sqlite3": "^5.1.6",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^5.0.1"
  }
}
```

### **render.yaml**
```yaml
services:
  - type: web
    name: zapateria-fercho-api
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
    healthCheckPath: /api/clientes
    autoDeploy: true
```

### **Procfile**
```
web: npm start
```

---

## 🗄️ **BASE DE DATOS**

### **Estructura de Tablas**
```sql
-- Tabla de clientes
CREATE TABLE clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    telefono TEXT NOT NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de sucursales
CREATE TABLE sucursales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    direccion TEXT NOT NULL,
    telefono TEXT NOT NULL,
    estado TEXT DEFAULT 'Activa',
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de pedidos
CREATE TABLE pedidos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    idCliente INTEGER NOT NULL,
    idSucursal INTEGER NOT NULL,
    descripcion TEXT NOT NULL,
    estado TEXT DEFAULT 'Pendiente',
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idCliente) REFERENCES clientes(id),
    FOREIGN KEY (idSucursal) REFERENCES sucursales(id)
);

-- Tabla de cobros
CREATE TABLE cobros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    idPedido INTEGER NOT NULL,
    monto REAL NOT NULL,
    metodoPago TEXT NOT NULL,
    fecha_cobro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idPedido) REFERENCES pedidos(id)
);

-- Tabla de materiales
CREATE TABLE materiales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    precio_unitario REAL NOT NULL,
    stock INTEGER DEFAULT 0,
    unidad TEXT DEFAULT 'Unidad',
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔧 **APIS DISPONIBLES**

### **Gestión de Clientes**
```javascript
GET    /api/clientes          # Listar clientes
POST   /api/clientes          # Crear cliente
DELETE /api/clientes/:id      # Eliminar cliente
```

### **Gestión de Pedidos**
```javascript
GET    /api/pedidos           # Listar pedidos
POST   /api/pedidos           # Crear pedido
```

### **Gestión de Cobros**
```javascript
GET    /api/cobros            # Listar cobros
POST   /api/cobros            # Crear cobro
```

### **Gestión de Sucursales**
```javascript
GET    /api/sucursales        # Listar sucursales
POST   /api/sucursales        # Crear sucursal
PUT    /api/sucursales/:id    # Actualizar sucursal
DELETE /api/sucursales/:id    # Eliminar sucursal
```

### **Gestión de Materiales**
```javascript
GET    /api/materiales        # Listar materiales
POST   /api/materiales        # Crear material
PUT    /api/materiales/:id    # Actualizar material
DELETE /api/materiales/:id    # Eliminar material
```

---

## 📚 **DOCUMENTACIÓN SWAGGER**

### **Configuración (swaggerOptions.js)**
```javascript
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API de Zapatería - Reparadora Fercho",
    version: "1.0.0",
    description: "Documentación completa de la API para el sistema de gestión de zapatería",
    contact: {
      name: "Reparadora Fercho",
      email: "info@reparadorafercho.com",
    }
  },
  servers: [
    {
      url: "http://localhost:8080/api",
      description: "Servidor de desarrollo local",
    },
    {
      url: "https://tu-app.onrender.com/api",
      description: "Servidor de producción (Render)"
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: ["./backend/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

// Generar archivo JSON automáticamente
fs.writeFileSync(path.join(__dirname, "swagger.json"), JSON.stringify(swaggerSpec, null, 2));

module.exports = swaggerSpec;
```

### **URLs de Documentación**
- **Swagger UI:** `/api-docs`
- **JSON:** `/swagger.json`

---

## 🌐 **URLS DEL SISTEMA**

### **Desarrollo Local**
- **Servidor:** `http://localhost:8080`
- **API Base:** `http://localhost:8080/api`
- **Swagger UI:** `http://localhost:8080/api-docs`
- **Documentación JSON:** `http://localhost:8080/swagger.json`

### **Producción (Render)**
- **Servidor:** `https://tu-app.onrender.com`
- **API Base:** `https://tu-app.onrender.com/api`
- **Swagger UI:** `https://tu-app.onrender.com/api-docs`

---

## 📋 **FUNCIONALIDADES PRINCIPALES**

### **👥 Gestión de Clientes**
- ✅ Crear, listar, eliminar clientes
- ✅ Validación de datos
- ✅ Relación con pedidos

### **📋 Gestión de Pedidos**
- ✅ Crear y listar pedidos
- ✅ Estados: Pendiente, En Proceso, Completado, Entregado
- ✅ Relación con clientes y sucursales

### **💰 Gestión de Cobros**
- ✅ Registrar cobros por pedido
- ✅ Métodos de pago: Efectivo, Transferencia
- ✅ Validación de pedidos existentes

### **🏪 Gestión de Sucursales**
- ✅ CRUD completo de sucursales
- ✅ Estados: Activa, Inactiva
- ✅ Validación de relaciones

### **📦 Gestión de Materiales**
- ✅ Inventario completo
- ✅ Control de stock
- ✅ Precios unitarios
- ✅ Categorización

---

## 🔧 **TECNOLOGÍAS UTILIZADAS**

### **Backend**
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **SQLite** - Base de datos
- **Swagger** - Documentación API
- **CORS** - Cross-origin requests

### **Frontend**
- **HTML5** - Estructura
- **CSS3** - Estilos
- **JavaScript** - Interactividad
- **Bootstrap** - Framework CSS

### **Despliegue**
- **Render** - Plataforma de hosting
- **Git** - Control de versiones
- **npm** - Gestión de dependencias

---

## 📊 **ESTADÍSTICAS DEL PROYECTO**

- **📁 Archivos:** 25+ archivos
- **📄 Líneas de código:** 2000+ líneas
- **🔧 APIs:** 15+ endpoints
- **📚 Documentación:** Swagger completa
- **🎨 Páginas web:** 6 páginas
- **🗄️ Tablas BD:** 5 tablas principales

---

## 🚀 **COMANDOS DE DESPLIEGUE**

### **Preparación Local**
```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Ejecutar en producción
npm start

# Generar documentación Swagger
# (Se genera automáticamente al iniciar)
```

### **Configuración Git**
```bash
# Inicializar repositorio
git init

# Agregar archivos
git add .

# Commit inicial
git commit -m "Proyecto zapatería listo"

# Configurar rama principal
git branch -M main

# Conectar con GitHub
git remote add origin https://github.com/TU_USUARIO/NOMBRE_REPO.git

# Subir a GitHub
git push -u origin main
```

---

## ✅ **ESTADO DEL PROYECTO**

- **✅ Backend:** Completamente funcional
- **✅ Frontend:** Interfaz moderna y responsive
- **✅ Base de datos:** SQLite con datos de ejemplo
- **✅ Documentación:** Swagger completa
- **✅ Despliegue:** Configurado para Render
- **✅ Validaciones:** Implementadas en todas las rutas
- **✅ Manejo de errores:** Completo
- **✅ CORS:** Configurado para desarrollo y producción

---

## 🎯 **SISTEMA DE GESTIÓN ZAPATERÍA "REPARADORA FERCHO" - VERSIÓN 1.0.0** 