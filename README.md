# 👞 Sistema de Gestión - Reparadora Fercho

Sistema web completo para la gestión de una zapatería llamada "Reparadora Fercho" con API documentada y interfaz web moderna.

## 🚀 Características

- **Gestión de Clientes**: Crear, listar y eliminar clientes
- **Gestión de Pedidos**: Crear y listar pedidos de reparación
- **Gestión de Cobros**: Registrar cobros por pedidos
- **API Documentada**: Swagger UI completo con ejemplos y validaciones
- **Interfaz Web**: Páginas HTML funcionales para cada módulo
- **Validaciones**: Campos obligatorios y validaciones de datos
- **Base de Datos**: SQLite automática con datos de ejemplo

## 🛠️ Tecnologías

- **Backend**: Node.js + Express.js
- **Base de Datos**: SQLite
- **Frontend**: HTML, CSS, JavaScript (vanilla)
- **Documentación**: Swagger UI con OpenAPI 3.0.0
- **Validaciones**: Campos requeridos y tipos de datos

## 📁 Estructura del Proyecto

```
zapateria-app/
├── backend/
│   ├── db.js                 # Configuración de base de datos
│   ├── server.js             # Servidor Express
│   ├── routes/
│   │   ├── clienteRoutes.js  # Rutas de clientes
│   │   ├── pedidoRoutes.js   # Rutas de pedidos
│   │   └── cobroRoutes.js    # Rutas de cobros
│   └── docs/
│       └── swagger.json      # Documentación API completa
├── frontend/
│   ├── index.html            # Página principal
│   ├── cliente.html          # Gestión de clientes
│   ├── pedido.html           # Gestión de pedidos
│   └── cobro.html            # Gestión de cobros
├── package.json
└── README.md
```

## 🚀 Instalación y Ejecución

### 1. Instalar dependencias
```bash
npm install
```

### 2. Crear archivo .env (opcional)
```bash
PORT=8080
NODE_ENV=development
```

### 3. Ejecutar el servidor
```bash
npm start
```

### 4. Acceder al sistema
- **Página principal**: http://localhost:8080
- **Documentación API**: http://localhost:8080/api-docs

## 📋 Funcionalidades

### 👥 Clientes
- **Campos**: nombre, teléfono
- **Operaciones**: GET, POST, DELETE
- **Validación**: nombre y teléfono obligatorios
- **Restricciones**: No se puede eliminar si tiene pedidos asociados

### 📋 Pedidos
- **Campos**: idCliente, descripción, estado
- **Estados**: "Pendiente", "Entregado"
- **Operaciones**: GET, POST
- **Validación**: Cliente debe existir, descripción obligatoria

### 💰 Cobros
- **Campos**: idPedido, monto, metodoPago
- **Métodos de pago**: "Efectivo", "Transferencia"
- **Operaciones**: GET, POST
- **Restricciones**: Solo un cobro por pedido

## 🔗 APIs Disponibles

### Clientes
- `GET /api/clientes` - Listar clientes
- `POST /api/clientes` - Crear cliente
- `DELETE /api/clientes/:id` - Eliminar cliente

### Pedidos
- `GET /api/pedidos` - Listar pedidos
- `POST /api/pedidos` - Crear pedido

### Cobros
- `GET /api/cobros` - Listar cobros
- `POST /api/cobros` - Crear cobro

## 📚 Documentación API

### Swagger UI
La documentación completa de la API está disponible en: **http://localhost:8080/api-docs**

**Características de la documentación:**
- ✅ Ejemplos de uso para cada endpoint
- ✅ Validaciones y restricciones documentadas
- ✅ Códigos de respuesta detallados
- ✅ Esquemas de datos completos
- ✅ Interfaz interactiva para probar APIs
- ✅ Descripciones detalladas de cada operación

### Ejemplos de Uso

#### Crear un cliente
```bash
curl -X POST http://localhost:8080/api/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Ana Martínez",
    "telefono": "555-0404"
  }'
```

#### Crear un pedido
```bash
curl -X POST http://localhost:8080/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "idCliente": 1,
    "descripcion": "Reparación de suela de zapato deportivo",
    "estado": "Pendiente"
  }'
```

#### Crear un cobro
```bash
curl -X POST http://localhost:8080/api/cobros \
  -H "Content-Type: application/json" \
  -d '{
    "idPedido": 1,
    "monto": 45.00,
    "metodoPago": "Efectivo"
  }'
```

## 🎯 Uso del Sistema

### 1. Interfaz Web
1. **Acceder a la página principal**: http://localhost:8080
2. **Navegar a los módulos**:
   - Gestión de Clientes
   - Gestión de Pedidos
   - Gestión de Cobros

### 2. API REST
1. **Ver documentación**: http://localhost:8080/api-docs
2. **Probar endpoints**: Usar Swagger UI interactivo
3. **Integrar con aplicaciones**: Usar las APIs REST

## 📝 Características Técnicas

### Base de Datos
- **SQLite**: Base de datos ligera y automática
- **Tablas**: clientes, pedidos, cobros
- **Relaciones**: Claves foráneas entre tablas
- **Datos de ejemplo**: Incluidos al iniciar

### Validaciones
- **Campos obligatorios**: Validación en backend
- **Tipos de datos**: Verificación de tipos
- **Restricciones**: Reglas de negocio implementadas
- **Mensajes de error**: Respuestas descriptivas

### Seguridad
- **CORS**: Habilitado para desarrollo
- **Validación de entrada**: Sanitización de datos
- **Manejo de errores**: Respuestas estructuradas

## 🔧 Desarrollo

Para desarrollo con recarga automática:
```bash
npm run dev
```

### Estructura de Respuestas

#### Respuesta exitosa
```json
{
  "success": true,
  "data": [...],
  "message": "Operación exitosa"
}
```

#### Respuesta de error
```json
{
  "success": false,
  "message": "Descripción del error"
}
```

## 📊 Estado del Sistema

- ✅ **Servidor**: Funcionando en puerto 8080
- ✅ **Base de datos**: SQLite con datos de ejemplo
- ✅ **APIs**: Todas las rutas funcionando
- ✅ **Swagger UI**: Documentación completa
- ✅ **Frontend**: Páginas HTML funcionales
- ✅ **Validaciones**: Implementadas en backend

---

**Reparadora Fercho** - Sistema de Gestión Completo con API Documentada 