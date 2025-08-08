# 📚 Swagger UI - Documentación de API

## 🎯 **Descripción**

Este proyecto incluye una interfaz visual de Swagger UI para documentar y probar todas las APIs del sistema de gestión de zapatería "Reparadora Fercho".

## 🚀 **Acceso a Swagger UI**

### **URL Principal:**
```
http://localhost:8080/api-docs
```

### **URLs del Sistema:**
- 🏠 **Dashboard:** `http://localhost:8080/`
- 📚 **Swagger UI:** `http://localhost:8080/api-docs`
- 🔧 **API JSON:** `http://localhost:8080/swagger.json`

## 📋 **APIs Documentadas**

### 👥 **Clientes**
- `GET /api/clientes` - Obtener todos los clientes
- `POST /api/clientes` - Crear nuevo cliente
- `GET /api/clientes/{id}` - Obtener cliente por ID
- `PUT /api/clientes/{id}` - Actualizar cliente
- `DELETE /api/clientes/{id}` - Eliminar cliente

### 📋 **Pedidos**
- `GET /api/pedidos` - Obtener todos los pedidos
- `POST /api/pedidos` - Crear nuevo pedido
- `GET /api/pedidos/{id}` - Obtener pedido por ID
- `PUT /api/pedidos/{id}` - Actualizar pedido
- `DELETE /api/pedidos/{id}` - Eliminar pedido

### 🛠 **Materiales**
- `GET /api/materiales` - Obtener todos los materiales
- `POST /api/materiales` - Crear nuevo material
- `GET /api/materiales/{id}` - Obtener material por ID
- `PUT /api/materiales/{id}` - Actualizar material
- `DELETE /api/materiales/{id}` - Eliminar material

### 💳 **Métodos de Pago**
- `GET /api/metodos-pago` - Obtener todos los métodos de pago
- `POST /api/metodos-pago` - Crear nuevo método de pago
- `GET /api/metodos-pago/{id}` - Obtener método de pago por ID
- `PUT /api/metodos-pago/{id}` - Actualizar método de pago
- `DELETE /api/metodos-pago/{id}` - Eliminar método de pago

### 🏢 **Sucursales**
- `GET /api/sucursales` - Obtener todas las sucursales
- `POST /api/sucursales` - Crear nueva sucursal
- `GET /api/sucursales/{id}` - Obtener sucursal por ID
- `PUT /api/sucursales/{id}` - Actualizar sucursal
- `DELETE /api/sucursales/{id}` - Eliminar sucursal

### ⏰ **Horarios**
- `GET /api/horarios` - Obtener todos los horarios
- `POST /api/horarios` - Crear nuevo horario
- `GET /api/horarios/{id}` - Obtener horario por ID
- `PUT /api/horarios/{id}` - Actualizar horario
- `DELETE /api/horarios/{id}` - Eliminar horario

### 💰 **Cobros**
- `GET /api/cobros` - Obtener todos los cobros
- `POST /api/cobros` - Crear nuevo cobro
- `GET /api/cobros/{id}` - Obtener cobro por ID
- `PUT /api/cobros/{id}` - Actualizar cobro
- `DELETE /api/cobros/{id}` - Eliminar cobro

### 📊 **Dashboard**
- `GET /api/dashboard/stats` - Obtener estadísticas del dashboard

## 🛠 **Características de Swagger UI**

### ✅ **Funcionalidades Incluidas:**
- 🔍 **Búsqueda y filtrado** de endpoints
- 🧪 **Try it out** - Probar APIs directamente
- 📝 **Documentación completa** de parámetros y respuestas
- 🎨 **Interfaz visual** moderna y responsive
- 📱 **Compatible con móviles**
- 🔗 **Deep linking** para compartir URLs específicas

### ⚙️ **Configuración Personalizada:**
- Título personalizado: "API Documentation - Reparadora Fercho"
- Expansión automática de endpoints
- Filtros habilitados
- Try it out habilitado por defecto
- Extensiones mostradas

## 📁 **Estructura del Proyecto**

```
zapateria-app/
├── backend/
│   ├── docs/
│   │   └── swagger.json          # Especificación OpenAPI
│   ├── server.js                 # Servidor con Swagger UI
│   └── routes/                   # Rutas de la API
├── frontend/                     # Interfaz web
└── package.json
```

## 🚀 **Instalación y Uso**

### **1. Instalar dependencias:**
```bash
npm install
```

### **2. Iniciar el servidor:**
```bash
npm start
```

### **3. Acceder a Swagger UI:**
Abrir en el navegador: `http://localhost:8080/api-docs`

## 🔧 **Tecnologías Utilizadas**

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **Swagger UI Express** - Interfaz visual para APIs
- **OpenAPI 3.0.0** - Especificación de API
- **SQLite** - Base de datos

## 📖 **Cómo Usar Swagger UI**

1. **Navegar por las APIs:** Usa los tags para filtrar por categoría
2. **Ver documentación:** Cada endpoint tiene descripción completa
3. **Probar APIs:** Haz clic en "Try it out" para ejecutar requests
4. **Ver respuestas:** Las respuestas se muestran en tiempo real
5. **Copiar código:** Puedes generar código en varios lenguajes

## 🎯 **Beneficios**

- ✅ **Documentación interactiva** y siempre actualizada
- ✅ **Testing en tiempo real** de todas las APIs
- ✅ **Generación automática** de código cliente
- ✅ **Validación automática** de requests y responses
- ✅ **Interfaz profesional** para desarrolladores

---

**🎉 ¡Swagger UI está listo para usar!** 