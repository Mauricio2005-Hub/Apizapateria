# 🚀 Instalación Rápida - Reparadora Fercho

## 📋 Pasos para ejecutar el sistema

### 1. Configurar Base de Datos MySQL

```sql
-- Crear base de datos
CREATE DATABASE zapateria;

-- Ejecutar el script de creación de tablas
-- Copiar y pegar el contenido de: backend/create_tables.sql
```

### 2. Configurar Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=zapateria
PORT=8080
NODE_ENV=development
```

### 3. Instalar Dependencias

```bash
npm install
```

### 4. Ejecutar el Sistema

```bash
npm start
```

### 5. Acceder a la Aplicación

Abrir navegador en: `http://localhost:8080`

## 🎯 Datos de Prueba

El sistema incluye datos de ejemplo:

- **Métodos de Pago**: Efectivo, Tarjeta, Transferencia, etc.
- **Sucursal**: Reparadora Fercho - Sucursal Principal
- **Horarios**: Configurados para la sucursal principal
- **Materiales**: Suelas, tacones, hilos, pegamento, cordones

## 🔧 Comandos Útiles

```bash
# Modo desarrollo (con nodemon)
npm run dev

# Ver logs
npm run logs

# Instalar dependencias
npm install
```

## 📊 Funcionalidades Disponibles

- ✅ Dashboard con estadísticas
- ✅ Gestión de Clientes
- ✅ Gestión de Pedidos
- ✅ Control de Materiales
- ✅ Métodos de Pago
- ✅ Gestión de Sucursales
- ✅ Configuración de Horarios
- ✅ Registro de Cobros

## 🌐 Despliegue en Render

1. Subir código a GitHub
2. Crear cuenta en Render.com
3. Conectar repositorio
4. Configurar variables de entorno
5. Desplegar

¡Listo! El sistema está funcionando. 🎉 