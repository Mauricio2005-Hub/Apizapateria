# 🚀 GUÍA COMPLETA PARA CONFIGURAR RENDER

## 📋 **PASOS PARA CONECTAR A RENDER**

### **1. 🌐 Ir a Render.com**
1. Abrir [render.com](https://render.com)
2. Iniciar sesión o crear cuenta
3. Ir al Dashboard

### **2. 🔗 Conectar Repositorio**
1. Click en **"New +"**
2. Seleccionar **"Web Service"**
3. Conectar con GitHub
4. Buscar y seleccionar: `Mauricio2005-Hub/Apizapateria`

### **3. ⚙️ Configurar el Servicio**

#### **Configuración Básica:**
```
Name: zapateria-fercho-api
Environment: Node
Region: Oregon (US West)
Branch: main
```

#### **Configuración de Build:**
```
Build Command: npm install
Start Command: npm start
```

#### **Variables de Entorno:**
```
NODE_ENV = production
```

### **4. 🔧 Configuración Avanzada**

#### **Health Check Path:**
```
/health
```

#### **Auto-Deploy:**
```
✅ Enabled
```

#### **Plan:**
```
Free
```

### **5. 📊 Configuración de Logs**

#### **Logs Esperados:**
```bash
🚀 Servidor iniciado en puerto 10000
🌍 Entorno: production
📊 Menú principal: http://localhost:10000
🔧 API Base: http://localhost:10000/api
📚 Swagger UI disponible en http://localhost:10000/api-docs
🏥 Health check: http://localhost:10000/health
✅ Conexión a la base de datos SQLite establecida correctamente
```

## 🧪 **PRUEBAS DESPUÉS DEL DESPLIEGUE**

### **1. Verificar Health Check:**
```bash
curl https://tu-app.onrender.com/health
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Servidor funcionando correctamente",
  "timestamp": "2025-08-08T19:47:58.590Z",
  "environment": "production"
}
```

### **2. Probar APIs:**
```bash
# Clientes
curl https://tu-app.onrender.com/api/clientes

# Pedidos
curl https://tu-app.onrender.com/api/pedidos

# Sucursales
curl https://tu-app.onrender.com/api/sucursales

# Cobros
curl https://tu-app.onrender.com/api/cobros

# Materiales
curl https://tu-app.onrender.com/api/materiales
```

### **3. Probar Swagger UI:**
```bash
curl https://tu-app.onrender.com/api-docs
```

### **4. Probar Página Principal:**
```bash
curl https://tu-app.onrender.com/
```

## 📱 **PRUEBAS DESDE POSTMAN**

### **Collection para Postman:**
```json
{
  "info": {
    "name": "Zapatería API - Render",
    "description": "API completa en producción"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "https://tu-app.onrender.com"
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

## 🔍 **VERIFICACIÓN DE LOGS**

### **Logs de Éxito:**
```bash
✅ Build completed successfully
✅ Deploy completed successfully
🚀 Servidor iniciado en puerto 10000
🌍 Entorno: production
✅ Conexión a la base de datos SQLite establecida correctamente
```

### **Logs de Error (si hay problemas):**
```bash
❌ Build failed
❌ Port already in use
❌ Database connection failed
```

## 🛠️ **TROUBLESHOOTING**

### **Problema 1: Build Failed**
**Solución:**
1. Verificar que `package.json` tenga todas las dependencias
2. Verificar que `render.yaml` esté correcto
3. Revisar logs de build

### **Problema 2: Puerto en Uso**
**Solución:**
1. Verificar que no haya `PORT` fijo en variables de entorno
2. Render debe asignar el puerto automáticamente

### **Problema 3: Base de Datos**
**Solución:**
1. Verificar que `backend/db.js` se ejecute correctamente
2. Verificar que las tablas se creen automáticamente

### **Problema 4: CORS**
**Solución:**
1. Verificar configuración de CORS en `server.js`
2. Asegurar que las URLs de Render estén permitidas

## 📊 **URLS FINALES**

Una vez desplegado, tendrás estas URLs:

```
🌐 URL Principal: https://tu-app.onrender.com
🔧 API Base: https://tu-app.onrender.com/api
📚 Swagger UI: https://tu-app.onrender.com/api-docs
🏥 Health Check: https://tu-app.onrender.com/health
```

## ✅ **CHECKLIST FINAL**

- [ ] Repositorio conectado a Render
- [ ] Build exitoso
- [ ] Servidor inicia correctamente
- [ ] Health check responde (200)
- [ ] APIs funcionan correctamente
- [ ] Swagger UI accesible
- [ ] Página principal carga
- [ ] Base de datos inicializada
- [ ] Logs sin errores

## 🎯 **RESULTADO FINAL**

✅ **Tu API estará completamente funcional en:**
- **URL:** `https://tu-app.onrender.com`
- **APIs:** Todas funcionando
- **Documentación:** Swagger UI disponible
- **Base de datos:** SQLite con datos de ejemplo
- **Frontend:** Páginas web accesibles

**¡Tu sistema de zapatería estará listo para producción!** 🚀 