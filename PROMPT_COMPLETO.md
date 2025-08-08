# 🎯 PROMPT COMPLETO - Sistema de Gestión Zapatería "Reparadora Fercho"

## 📋 DESCRIPCIÓN DEL PROYECTO

Desarrollar un sistema web completo para la gestión de una zapatería llamada "Reparadora Fercho" que incluya:

### 🎯 OBJETIVOS PRINCIPALES
1. **Sistema de Gestión Integral** para zapatería
2. **API REST completa** con documentación Swagger
3. **Interfaz web moderna** y responsive
4. **Base de datos SQLite** con datos de ejemplo
5. **Validaciones robustas** y manejo de errores

## 🏗️ ARQUITECTURA DEL SISTEMA

### Backend (Node.js + Express)
```
backend/
├── server.js              # Servidor principal Express
├── db.js                  # Configuración SQLite
├── routes/                # Rutas API
│   ├── clienteRoutes.js   # Gestión de clientes
│   ├── pedidoRoutes.js    # Gestión de pedidos
│   ├── cobroRoutes.js     # Gestión de cobros
│   ├── sucursalRoutes.js  # Gestión de sucursales
│   └── materialRoutes.js  # Gestión de materiales
└── docs/
    └── swagger.json       # Documentación API
```

### Frontend (HTML + CSS + JavaScript)
```
frontend/
├── index.html             # Página principal
├── cliente.html           # Gestión de clientes
├── pedido.html            # Gestión de pedidos
├── cobro.html             # Gestión de cobros
├── sucursal.html          # Gestión de sucursales
├── material.html          # Gestión de materiales
└── css/                   # Estilos CSS
```

## 📊 MÓDULOS DEL SISTEMA

### 1. 👥 GESTIÓN DE CLIENTES
**Funcionalidades:**
- Crear nuevos clientes
- Listar todos los clientes
- Eliminar clientes (con validación de dependencias)
- Buscar clientes por nombre

**Campos requeridos:**
- `nombre` (obligatorio)
- `telefono` (obligatorio)

**APIs:**
- `GET /api/clientes` - Listar clientes
- `POST /api/clientes` - Crear cliente
- `DELETE /api/clientes/:id` - Eliminar cliente

### 2. 📋 GESTIÓN DE PEDIDOS
**Funcionalidades:**
- Crear pedidos de reparación
- Listar todos los pedidos
- Actualizar estado de pedidos
- Asociar pedidos a clientes y sucursales

**Campos requeridos:**
- `cliente_id` (obligatorio)
- `sucursal_id` (obligatorio)
- `descripcion_trabajo` (obligatorio)
- `precio_total` (obligatorio)
- `fecha_entrega_estimada` (opcional)
- `estado` (por defecto: "Pendiente")
- `observaciones` (opcional)

**Estados disponibles:**
- "Pendiente"
- "En Proceso"
- "Completado"
- "Entregado"

**APIs:**
- `GET /api/pedidos` - Listar pedidos
- `POST /api/pedidos` - Crear pedido
- `PUT /api/pedidos/:id` - Actualizar pedido

### 3. 💰 GESTIÓN DE COBROS
**Funcionalidades:**
- Registrar cobros por pedidos
- Listar todos los cobros
- Validar que no haya cobros duplicados

**Campos requeridos:**
- `pedido_id` (obligatorio)
- `monto` (obligatorio)
- `metodo_pago` (obligatorio)
- `fecha_cobro` (automático)

**Métodos de pago:**
- "Efectivo"
- "Tarjeta"
- "Transferencia"

**APIs:**
- `GET /api/cobros` - Listar cobros
- `POST /api/cobros` - Crear cobro

### 4. 🏪 GESTIÓN DE SUCURSALES
**Funcionalidades:**
- Crear nuevas sucursales
- Listar todas las sucursales
- Actualizar información de sucursales
- Eliminar sucursales

**Campos requeridos:**
- `nombre` (obligatorio)
- `direccion` (obligatorio)
- `telefono` (obligatorio)
- `estado` (por defecto: "Activa")

**APIs:**
- `GET /api/sucursales` - Listar sucursales
- `POST /api/sucursales` - Crear sucursal
- `PUT /api/sucursales/:id` - Actualizar sucursal
- `DELETE /api/sucursales/:id` - Eliminar sucursal

### 5. 🛠️ GESTIÓN DE MATERIALES
**Funcionalidades:**
- Gestionar inventario de materiales
- Crear nuevos materiales
- Actualizar stock
- Listar materiales disponibles

**Campos requeridos:**
- `nombre` (obligatorio)
- `descripcion` (opcional)
- `cantidad_disponible` (obligatorio)
- `precio_unitario` (obligatorio)
- `categoria` (opcional)

**APIs:**
- `GET /api/materiales` - Listar materiales
- `POST /api/materiales` - Crear material
- `PUT /api/materiales/:id` - Actualizar material
- `DELETE /api/materiales/:id` - Eliminar material

## 🗄️ BASE DE DATOS (SQLite)

### Estructura de Tablas:

```sql
-- Tabla Clientes
CREATE TABLE clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    telefono TEXT NOT NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Sucursales
CREATE TABLE sucursales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    direccion TEXT NOT NULL,
    telefono TEXT NOT NULL,
    estado TEXT DEFAULT 'Activa',
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Pedidos
CREATE TABLE pedidos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER NOT NULL,
    sucursal_id INTEGER NOT NULL,
    descripcion_trabajo TEXT NOT NULL,
    precio_total REAL NOT NULL,
    fecha_entrega_estimada DATE,
    estado TEXT DEFAULT 'Pendiente',
    observaciones TEXT,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (sucursal_id) REFERENCES sucursales(id)
);

-- Tabla Cobros
CREATE TABLE cobros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pedido_id INTEGER NOT NULL UNIQUE,
    monto REAL NOT NULL,
    metodo_pago TEXT NOT NULL,
    fecha_cobro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
);

-- Tabla Materiales
CREATE TABLE materiales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    cantidad_disponible INTEGER NOT NULL,
    precio_unitario REAL NOT NULL,
    categoria TEXT,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🎨 INTERFAZ WEB

### Características del Frontend:
- **Diseño responsive** que se adapta a diferentes dispositivos
- **Navegación intuitiva** con menú principal
- **Formularios validados** en tiempo real
- **Tablas dinámicas** con datos actualizados
- **Mensajes de confirmación** para operaciones
- **Diseño moderno** con CSS personalizado

### Páginas disponibles:
1. **index.html** - Menú principal con navegación
2. **cliente.html** - Gestión completa de clientes
3. **pedido.html** - Gestión completa de pedidos
4. **cobro.html** - Gestión completa de cobros
5. **sucursal.html** - Gestión completa de sucursales
6. **material.html** - Gestión completa de materiales

## 📚 DOCUMENTACIÓN API (Swagger)

### Características de la documentación:
- **Interfaz interactiva** para probar APIs
- **Ejemplos de uso** para cada endpoint
- **Validaciones documentadas** con esquemas
- **Códigos de respuesta** detallados
- **Descripciones completas** de cada operación
- **Diseño personalizado** con CSS mejorado

### Acceso a la documentación:
- **URL**: http://localhost:8080/api-docs
- **Formato**: OpenAPI 3.0.0
- **Interfaz**: Swagger UI mejorado

## 🔧 CONFIGURACIÓN TÉCNICA

### Dependencias del proyecto:
```json
{
  "express": "^4.18.2",
  "sqlite3": "^5.1.6",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "swagger-ui-express": "^5.0.0",
  "body-parser": "^1.20.2"
}
```

### Variables de entorno:
```env
PORT=8080
NODE_ENV=development
```

### Scripts disponibles:
```json
{
  "start": "node backend/server.js",
  "dev": "nodemon backend/server.js"
}
```

## 🚀 INSTALACIÓN Y EJECUCIÓN

### Pasos para ejecutar el sistema:

1. **Instalar dependencias:**
```bash
npm install
```

2. **Ejecutar el servidor:**
```bash
npm start
```

3. **Acceder al sistema:**
- **Página principal**: http://localhost:8080
- **Documentación API**: http://localhost:8080/api-docs

## ✅ VALIDACIONES Y RESTRICCIONES

### Validaciones implementadas:
- **Campos obligatorios** en todos los formularios
- **Tipos de datos** correctos (números, texto, fechas)
- **Relaciones entre tablas** (claves foráneas)
- **Restricciones de negocio** (no eliminar clientes con pedidos)
- **Validación de duplicados** (un cobro por pedido)

### Manejo de errores:
- **Respuestas estructuradas** en formato JSON
- **Códigos de estado HTTP** apropiados
- **Mensajes descriptivos** para el usuario
- **Logging de errores** en consola

## 📊 FUNCIONALIDADES ADICIONALES

### Dashboard y estadísticas:
- **Contador de registros** por módulo
- **Estadísticas en tiempo real**
- **Navegación entre módulos**

### Características técnicas:
- **CORS habilitado** para desarrollo
- **Middleware de logging** para debugging
- **Archivos estáticos** servidos automáticamente
- **Rutas dinámicas** para páginas del frontend

## 🎯 RESULTADO ESPERADO

El sistema debe proporcionar:
1. **Gestión completa** de todos los aspectos de la zapatería
2. **API REST funcional** con documentación completa
3. **Interfaz web moderna** y fácil de usar
4. **Base de datos robusta** con datos de ejemplo
5. **Validaciones completas** y manejo de errores
6. **Documentación técnica** detallada

---

**Este prompt describe completamente el sistema de gestión para "Reparadora Fercho" con todas sus funcionalidades, arquitectura y especificaciones técnicas.** 