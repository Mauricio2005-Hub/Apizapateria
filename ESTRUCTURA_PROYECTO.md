# 📁 ESTRUCTURA COMPLETA DEL PROYECTO - ZAPATERÍA "REPARADORA FERCHO"

## 🎯 **DESCRIPCIÓN GENERAL**
Sistema web completo para gestión de zapatería con API REST, documentación Swagger, interfaz web moderna y base de datos SQLite.

---

## 📂 **ESTRUCTURA DE DIRECTORIOS**

```
Zapateriaprogra/
├── 📁 .git/                          # Control de versiones Git
├── 📁 node_modules/                  # Dependencias de Node.js
├── 📁 backend/                       # 🚀 SERVIDOR BACKEND
│   ├── 📄 server.js                  # Servidor principal Express
│   ├── 📄 db.js                      # Configuración SQLite
│   ├── 📄 zapateria.db              # Base de datos SQLite
│   ├── 📄 create_tables.sql         # Script de creación de tablas
│   ├── 📁 routes/                    # 🛣️ RUTAS DE LA API
│   │   ├── 📄 clienteRoutes.js      # API Gestión de Clientes
│   │   ├── 📄 pedidoRoutes.js       # API Gestión de Pedidos
│   │   ├── 📄 cobroRoutes.js        # API Gestión de Cobros
│   │   ├── 📄 sucursalRoutes.js     # API Gestión de Sucursales
│   │   └── 📄 materialRoutes.js     # API Gestión de Materiales
│   └── 📁 docs/                      # 📚 DOCUMENTACIÓN
│       └── 📄 swagger.json          # Documentación Swagger
├── 📁 frontend/                      # 🎨 INTERFAZ WEB
│   ├── 📄 index.html                # Página principal
│   ├── 📄 cliente.html              # Gestión de Clientes
│   ├── 📄 pedido.html               # Gestión de Pedidos
│   ├── 📄 cobro.html                # Gestión de Cobros
│   ├── 📄 sucursal.html             # Gestión de Sucursales
│   ├── 📄 material.html             # Gestión de Materiales
│   └── 📁 css/                      # Estilos CSS
├── 📁 zapateria-app/                 # Directorio adicional
├── 📄 package.json                   # Configuración del proyecto
├── 📄 package-lock.json             # Lock de dependencias
├── 📄 swaggerOptions.js             # Configuración Swagger
├── 📄 swagger.json                  # Documentación API generada
├── 📄 render.yaml                   # Configuración para Render
├── 📄 Procfile                      # Configuración para despliegue
├── 📄 .gitignore                    # Archivos ignorados por Git
├── 📄 README.md                     # Documentación principal
├── 📄 PROMPT_COMPLETO.md           # Prompt completo del sistema
├── 📄 RENDER_README.md             # Guía de despliegue en Render
├── 📄 SWAGGER_README.md            # Documentación Swagger
└── 📄 INSTALACION.md               # Guía de instalación
```

---

## 🔧 **ARCHIVOS DE CONFIGURACIÓN**

### **📄 package.json**
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

### **📄 render.yaml**
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

---

## 🚀 **SERVIDOR BACKEND**

### **📄 backend/server.js**
- **Puerto:** 8080 (desarrollo) / 10000 (producción)
- **Middleware:** CORS, JSON, URL-encoded
- **Rutas API:** `/api/*`
- **Swagger UI:** `/api-docs`
- **Archivos estáticos:** Frontend

### **📄 backend/db.js**
- **Base de datos:** SQLite
- **Archivo:** `zapateria.db`
- **Funciones:** `query()`, `queryOne()`, `run()`
- **Conexión:** Automática al iniciar

### **📄 backend/create_tables.sql**
- **Tablas:** clientes, pedidos, cobros, sucursales, materiales
- **Relaciones:** Claves foráneas
- **Datos de ejemplo:** Incluidos

---

## 🛣️ **RUTAS DE LA API**

### **📄 backend/routes/clienteRoutes.js**
```javascript
GET    /api/clientes          # Listar clientes
POST   /api/clientes          # Crear cliente
DELETE /api/clientes/:id      # Eliminar cliente
```

### **📄 backend/routes/pedidoRoutes.js**
```javascript
GET    /api/pedidos           # Listar pedidos
POST   /api/pedidos           # Crear pedido
```

### **📄 backend/routes/cobroRoutes.js**
```javascript
GET    /api/cobros            # Listar cobros
POST   /api/cobros            # Crear cobro
```

### **📄 backend/routes/sucursalRoutes.js**
```javascript
GET    /api/sucursales        # Listar sucursales
POST   /api/sucursales        # Crear sucursal
PUT    /api/sucursales/:id    # Actualizar sucursal
DELETE /api/sucursales/:id    # Eliminar sucursal
```

### **📄 backend/routes/materialRoutes.js**
```javascript
GET    /api/materiales        # Listar materiales
POST   /api/materiales        # Crear material
PUT    /api/materiales/:id    # Actualizar material
DELETE /api/materiales/:id    # Eliminar material
```

---

## 🎨 **INTERFAZ WEB (FRONTEND)**

### **📄 frontend/index.html**
- **Página principal** con menú de navegación
- **Dashboard** con estadísticas
- **Diseño responsive** y moderno

### **📄 frontend/cliente.html**
- **Gestión completa** de clientes
- **Formularios** de creación y edición
- **Tabla** con listado de clientes

### **📄 frontend/pedido.html**
- **Gestión de pedidos** con estados
- **Relación** con clientes y sucursales
- **Formularios** dinámicos

### **📄 frontend/cobro.html**
- **Gestión de cobros** y pagos
- **Métodos de pago:** Efectivo, Transferencia
- **Relación** con pedidos

### **📄 frontend/sucursal.html**
- **Gestión de sucursales** y ubicaciones
- **Estados:** Activa, Inactiva
- **Información** de contacto

### **📄 frontend/material.html**
- **Inventario** de materiales
- **Gestión de stock** y precios
- **Categorización** de productos

---

## 📚 **DOCUMENTACIÓN SWAGGER**

### **📄 swaggerOptions.js**
- **Configuración** OpenAPI 3.0.0
- **Esquemas** completos para todas las entidades
- **Generación automática** de `swagger.json`

### **📄 swagger.json**
- **Documentación completa** de la API
- **Esquemas** de request/response
- **Ejemplos** de uso
- **Compatible** con Postman

---

## 🗄️ **BASE DE DATOS**

### **📄 backend/zapateria.db**
```sql
-- Tablas principales
clientes (id, nombre, telefono, fecha_registro)
pedidos (id, idCliente, idSucursal, descripcion, estado, fecha_creacion)
cobros (id, idPedido, monto, metodoPago, fecha_cobro)
sucursales (id, nombre, direccion, telefono, estado)
materiales (id, nombre, descripcion, precio_unitario, stock, unidad)
```

---

## 🌐 **URLS DEL SISTEMA**

### **🏠 Desarrollo Local:**
- **Servidor:** `http://localhost:8080`
- **API Base:** `http://localhost:8080/api`
- **Swagger UI:** `http://localhost:8080/api-docs`
- **Documentación JSON:** `http://localhost:8080/swagger.json`

### **🚀 Producción (Render):**
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

### **Backend:**
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **SQLite** - Base de datos
- **Swagger** - Documentación API
- **CORS** - Cross-origin requests

### **Frontend:**
- **HTML5** - Estructura
- **CSS3** - Estilos
- **JavaScript** - Interactividad
- **Bootstrap** - Framework CSS

### **Despliegue:**
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

## 🚀 **COMANDOS PRINCIPALES**

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

*🎯 **Sistema de Gestión Zapatería "Reparadora Fercho" - Versión 1.0.0** * 