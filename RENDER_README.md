# 🚀 Guía de Despliegue en Render - Sistema Zapatería

## 📋 Pasos para desplegar en Render

### 1. **Preparar el repositorio**
- ✅ Todos los archivos están listos
- ✅ `package.json` configurado
- ✅ `render.yaml` creado
- ✅ `Procfile` configurado

### 2. **Crear cuenta en Render**
1. Ve a [render.com](https://render.com)
2. Crea una cuenta gratuita
3. Conecta tu repositorio de GitHub

### 3. **Configurar el servicio en Render**

#### **Configuración básica:**
- **Name**: `zapateria-fercho-api`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

#### **Variables de entorno:**
```
NODE_ENV=production
PORT=10000
```

### 4. **Configuraciones específicas**

#### **Health Check Path:**
```
/api/clientes
```

#### **Auto Deploy:**
- ✅ Habilitado para cambios en main/master

### 5. **URLs del sistema desplegado**

Una vez desplegado, tendrás acceso a:
- **Página principal**: `https://tu-app.onrender.com`
- **API Base**: `https://tu-app.onrender.com/api`
- **Documentación Swagger**: `https://tu-app.onrender.com/api-docs`

### 6. **APIs disponibles**

#### **Clientes:**
- `GET https://tu-app.onrender.com/api/clientes`
- `POST https://tu-app.onrender.com/api/clientes`
- `DELETE https://tu-app.onrender.com/api/clientes/:id`

#### **Pedidos:**
- `GET https://tu-app.onrender.com/api/pedidos`
- `POST https://tu-app.onrender.com/api/pedidos`
- `PUT https://tu-app.onrender.com/api/pedidos/:id`

#### **Cobros:**
- `GET https://tu-app.onrender.com/api/cobros`
- `POST https://tu-app.onrender.com/api/cobros`

#### **Sucursales:**
- `GET https://tu-app.onrender.com/api/sucursales`
- `POST https://tu-app.onrender.com/api/sucursales`
- `PUT https://tu-app.onrender.com/api/sucursales/:id`
- `DELETE https://tu-app.onrender.com/api/sucursales/:id`

#### **Materiales:**
- `GET https://tu-app.onrender.com/api/materiales`
- `POST https://tu-app.onrender.com/api/materiales`
- `PUT https://tu-app.onrender.com/api/materiales/:id`
- `DELETE https://tu-app.onrender.com/api/materiales/:id`

### 7. **Solución de problemas comunes**

#### **Error de puerto:**
- Render usa el puerto definido en `PORT`
- El servidor debe escuchar en `process.env.PORT`

#### **Error de base de datos:**
- SQLite funciona en Render
- La base de datos se crea automáticamente

#### **Error de CORS:**
- CORS está configurado para permitir todas las origenes
- Funciona correctamente en producción

### 8. **Monitoreo y logs**

#### **Ver logs en Render:**
1. Ve al dashboard de tu servicio
2. Click en "Logs"
3. Revisa logs en tiempo real

#### **Health Check:**
- Render verifica `/api/clientes` cada 30 segundos
- Si falla, reinicia automáticamente

### 9. **Actualizaciones**

#### **Despliegue automático:**
- Cada push a main/master despliega automáticamente
- Los cambios se reflejan en 2-5 minutos

#### **Despliegue manual:**
1. Ve al dashboard de Render
2. Click en "Manual Deploy"
3. Selecciona la rama

### 10. **Backup y datos**

#### **Base de datos:**
- SQLite se reinicia en cada deploy
- Para persistencia, considera migrar a PostgreSQL
- Los datos de ejemplo se recrean automáticamente

---

**¡Tu sistema estará disponible 24/7 en la nube!** 🌐 