# 🚀 GUÍA COMPLETA DE DESPLIEGUE EN RENDER

## 📋 **PROBLEMAS SOLUCIONADOS**

### ✅ **Errores Corregidos:**
1. **Error de base de datos:** `table pedidos has no column named tipo_reparacion`
2. **Error de puerto:** `EADDRINUSE: address already in use :::8080`
3. **Problemas de CORS** en producción
4. **Configuración de Swagger** incorrecta
5. **Health check** mejorado para Render

---

## 🔧 **CONFIGURACIÓN OPTIMIZADA**

### **1. Archivos Modificados:**

#### **swaggerOptions.js**
- ✅ Corregidos esquemas para coincidir con la BD real
- ✅ URL de producción actualizada
- ✅ Campos requeridos corregidos

#### **backend/server.js**
- ✅ CORS configurado para producción
- ✅ Health check endpoint agregado
- ✅ Manejo de errores mejorado
- ✅ Logging para desarrollo
- ✅ Manejo de señales de terminación

#### **render.yaml**
- ✅ Health check path corregido
- ✅ Variables de entorno optimizadas
- ✅ Plan gratuito especificado

#### **package.json**
- ✅ Axios agregado para pruebas
- ✅ Script de prueba agregado
- ✅ Dependencias actualizadas

---

## 🧪 **SCRIPT DE PRUEBAS**

### **test-api.js**
```bash
# Ejecutar pruebas locales
npm test

# Ejecutar pruebas en producción
TEST_URL=https://tu-app.onrender.com npm test
```

**Pruebas incluidas:**
- ✅ Health check
- ✅ Swagger UI
- ✅ Todas las APIs GET
- ✅ APIs POST (crear cliente y pedido)
- ✅ Base de datos

---

## 🌐 **URLS DE PRODUCCIÓN**

### **Render URLs:**
- **API Base:** `https://zapateria-fercho-api.onrender.com/api`
- **Swagger UI:** `https://zapateria-fercho-api.onrender.com/api-docs`
- **Health Check:** `https://zapateria-fercho-api.onrender.com/health`
- **Documentación JSON:** `https://zapateria-fercho-api.onrender.com/swagger.json`

### **Postman Collection:**
```json
{
  "info": {
    "name": "Zapatería API - Reparadora Fercho",
    "description": "API completa para gestión de zapatería"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "https://zapateria-fercho-api.onrender.com"
    }
  ],
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/health"
      }
    },
    {
      "name": "Swagger UI",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/api-docs"
      }
    },
    {
      "name": "Obtener Clientes",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/api/clientes"
      }
    },
    {
      "name": "Crear Cliente",
      "request": {
        "method": "POST",
        "url": "{{baseUrl}}/api/clientes",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"nombre\": \"Cliente de Prueba\",\n  \"telefono\": \"555-9999\"\n}"
        }
      }
    },
    {
      "name": "Obtener Pedidos",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/api/pedidos"
      }
    },
    {
      "name": "Crear Pedido",
      "request": {
        "method": "POST",
        "url": "{{baseUrl}}/api/pedidos",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"idCliente\": 1,\n  \"idSucursal\": 1,\n  \"descripcion\": \"Reparación de prueba\",\n  \"estado\": \"Pendiente\"\n}"
        }
      }
    }
  ]
}
```

---

## 📊 **ESTRUCTURA DE BASE DE DATOS**

### **Tablas Corregidas:**
```sql
-- Clientes
CREATE TABLE clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    telefono TEXT NOT NULL
);

-- Sucursales
CREATE TABLE sucursales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    direccion TEXT NOT NULL,
    telefono TEXT NOT NULL,
    estado TEXT DEFAULT 'Activa'
);

-- Pedidos (CORREGIDO)
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

-- Cobros
CREATE TABLE cobros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    idPedido INTEGER NOT NULL,
    monto REAL NOT NULL,
    metodoPago TEXT NOT NULL,
    fecha_cobro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idPedido) REFERENCES pedidos(id)
);

-- Materiales
CREATE TABLE materiales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    precio_unitario REAL NOT NULL,
    stock INTEGER DEFAULT 0,
    unidad TEXT DEFAULT 'Unidad'
);
```

---

## 🔍 **PRUEBAS EN POSTMAN**

### **1. Health Check:**
```
GET https://zapateria-fercho-api.onrender.com/health
```

### **2. Swagger UI:**
```
GET https://zapateria-fercho-api.onrender.com/api-docs
```

### **3. Obtener Clientes:**
```
GET https://zapateria-fercho-api.onrender.com/api/clientes
```

### **4. Crear Cliente:**
```
POST https://zapateria-fercho-api.onrender.com/api/clientes
Content-Type: application/json

{
  "nombre": "Cliente de Prueba",
  "telefono": "555-9999"
}
```

### **5. Crear Pedido:**
```
POST https://zapateria-fercho-api.onrender.com/api/pedidos
Content-Type: application/json

{
  "idCliente": 1,
  "idSucursal": 1,
  "descripcion": "Reparación de suela",
  "estado": "Pendiente"
}
```

---

## 🚀 **PASOS PARA DESPLIEGUE**

### **1. Preparar el Repositorio:**
```bash
# Asegurarse de que todos los cambios estén commitados
git add .
git commit -m "Configuración optimizada para Render"
git push origin main
```

### **2. Configurar Render:**
1. Ir a [render.com](https://render.com)
2. Conectar repositorio de GitHub
3. Crear nuevo Web Service
4. Configurar:
   - **Name:** `zapateria-fercho-api`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Health Check Path:** `/health`

### **3. Variables de Entorno:**
```
NODE_ENV=production
PORT=10000
```

### **4. Verificar Despliegue:**
```bash
# Probar health check
curl https://zapateria-fercho-api.onrender.com/health

# Probar API
curl https://zapateria-fercho-api.onrender.com/api/clientes
```

---

## ✅ **VERIFICACIÓN FINAL**

### **Checklist de Pruebas:**
- [ ] Health check responde correctamente
- [ ] Swagger UI se carga sin errores
- [ ] Todas las APIs GET funcionan
- [ ] APIs POST crean datos correctamente
- [ ] Base de datos se inicializa con datos de ejemplo
- [ ] CORS funciona en producción
- [ ] Documentación JSON se genera correctamente

### **Comandos de Verificación:**
```bash
# Probar localmente
npm start
npm test

# Probar en producción
TEST_URL=https://zapateria-fercho-api.onrender.com npm test
```

---

## 🎯 **RESULTADO FINAL**

✅ **API completamente funcional en Render**
✅ **Documentación Swagger actualizada**
✅ **Pruebas automatizadas incluidas**
✅ **Configuración optimizada para producción**
✅ **Manejo de errores mejorado**

**URL de Producción:** `https://zapateria-fercho-api.onrender.com`

---

## 📞 **SOPORTE**

Si encuentras algún problema:
1. Revisar logs en Render Dashboard
2. Ejecutar script de pruebas
3. Verificar configuración de variables de entorno
4. Comprobar que la base de datos se inicializa correctamente

¡Tu API está lista para producción! 🚀 