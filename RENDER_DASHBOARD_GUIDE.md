# 🎯 GUÍA PARA TU DASHBOARD DE RENDER

## 📊 **INFORMACIÓN DEL PROYECTO**

- **Dashboard URL:** [https://dashboard.render.com/blueprint/exs-d2b5f9ruibrs73f9r8c0/sync](https://dashboard.render.com/blueprint/exs-d2b5f9ruibrs73f9r8c0/sync)
- **Repositorio:** `https://github.com/Mauricio2005-Hub/Apizapateria`
- **Servicio:** `zapateria-fercho-api`
- **Estado:** Configurado y listo para deploy

## 🚀 **PASOS PARA COMPLETAR LA CONEXIÓN**

### **1. 🌐 Acceder al Dashboard**

1. Abrir [https://dashboard.render.com/blueprint/exs-d2b5f9ruibrs73f9r8c0/sync](https://dashboard.render.com/blueprint/exs-d2b5f9ruibrs73f9r8c0/sync)
2. Iniciar sesión con tu cuenta de GitHub
3. Verificar que el proyecto esté conectado

### **2. ⚙️ Verificar Configuración**

#### **Configuración Actual:**
```
Name: zapateria-fercho-api
Environment: Node
Build Command: npm install
Start Command: npm start
Health Check Path: /health
```

#### **Variables de Entorno:**
```
NODE_ENV = production
```

### **3. 🔄 Sincronizar Repositorio**

1. En el dashboard, click en **"Manual Deploy"**
2. Seleccionar **"Deploy latest commit"**
3. Esperar a que el build se complete

### **4. 📊 Verificar Logs**

#### **Logs Esperados:**
```bash
✅ Build completed successfully
✅ Deploy completed successfully
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
curl https://zapateria-fercho-api.onrender.com/health
```

### **2. Probar APIs:**
```bash
# Clientes
curl https://zapateria-fercho-api.onrender.com/api/clientes

# Pedidos
curl https://zapateria-fercho-api.onrender.com/api/pedidos

# Sucursales
curl https://zapateria-fercho-api.onrender.com/api/sucursales

# Cobros
curl https://zapateria-fercho-api.onrender.com/api/cobros

# Materiales
curl https://zapateria-fercho-api.onrender.com/api/materiales
```

### **3. Probar Swagger UI:**
```bash
curl https://zapateria-fercho-api.onrender.com/api-docs
```

### **4. Probar Página Principal:**
```bash
curl https://zapateria-fercho-api.onrender.com/
```

## 🔍 **VERIFICACIÓN AUTOMÁTICA**

### **Script de Verificación:**
```bash
# Verificar conexión con Render
npm run verify:render

# O especificar URL personalizada
RENDER_URL=https://tu-app.onrender.com npm run verify:render
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

## 🛠️ **TROUBLESHOOTING**

### **Problema 1: Build Failed**
**Solución:**
1. Verificar que `package.json` tenga todas las dependencias
2. Verificar que `render.yaml` esté correcto
3. Revisar logs de build en el dashboard

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
🌐 URL Principal: https://zapateria-fercho-api.onrender.com
🔧 API Base: https://zapateria-fercho-api.onrender.com/api
📚 Swagger UI: https://zapateria-fercho-api.onrender.com/api-docs
🏥 Health Check: https://zapateria-fercho-api.onrender.com/health
```

## ✅ **CHECKLIST FINAL**

- [ ] Dashboard de Render accesible
- [ ] Repositorio conectado correctamente
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
- **URL:** `https://zapateria-fercho-api.onrender.com`
- **APIs:** Todas funcionando
- **Documentación:** Swagger UI disponible
- **Base de datos:** SQLite con datos de ejemplo
- **Frontend:** Páginas web accesibles

## 📞 **SOPORTE**

Si tienes problemas:

1. **Revisar Logs:** Ir al dashboard de Render y revisar logs
2. **Verificar Configuración:** Asegurar que `render.yaml` esté correcto
3. **Probar Localmente:** Ejecutar `npm start` localmente
4. **Contactar Soporte:** Usar la documentación de Render

**¡Tu sistema de zapatería estará listo para producción!** 🚀 