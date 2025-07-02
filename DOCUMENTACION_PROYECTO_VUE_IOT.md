# 📋 Documentación del Proyecto: Sistema IoT Vue.js

## 📖 Información General

**Nombre del Proyecto**: Sistema de Monitoreo IoT con Vue.js  
**Versión**: 1.0.0  
**Fecha**: 2025-01-02  
**Autor**: Equipo de Desarrollo IoT  

## 🎯 Descripción del Proyecto

Sistema web desarrollado en Vue.js para monitorear en tiempo real datos de temperatura y humedad enviados por un ESP32 con sensor DHT11. La aplicación incluye un sistema de autenticación colaborativo donde todos los usuarios tienen permisos completos para gestionar credenciales y acceder al dashboard de monitoreo.

## 🏗️ Arquitectura del Sistema

### Componentes Principales
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     ESP32       │───▶│    Firebase     │───▶│   Vue.js App    │
│   + DHT11       │    │  Realtime DB    │    │   Dashboard     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
      Hardware              Backend              Frontend
```

### Stack Tecnológico

#### Frontend
- **Framework**: Vue.js 3 (Composition API)
- **Build Tool**: Vite
- **Router**: Vue Router 4
- **State Management**: Pinia
- **Styling**: CSS3 + Diseño moderno
- **Charts**: Chart.js / Vue-Chart.js
- **Icons**: Heroicons o Font Awesome

#### Backend/Datos
- **Base de Datos IoT**: Firebase Realtime Database
- **Autenticación**: localStorage (datos estáticos)
- **Persistencia**: Navegador local

#### Hardware (Existente)
- **Microcontrolador**: ESP32
- **Sensor**: DHT11 (temperatura y humedad)
- **Conectividad**: WiFi
- **Protocolo**: HTTPS/Firebase REST API

## 📁 Estructura del Proyecto

```
vue-iot-dashboard/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── SensorCard.vue          # Tarjeta individual sensor
│   │   ├── ChartComponent.vue      # Gráficos históricos
│   │   ├── StatusIndicator.vue     # Indicador visual estados
│   │   ├── UserManagement.vue      # Gestión usuarios
│   │   └── Navigation.vue          # Navegación principal
│   ├── views/
│   │   ├── LoginView.vue           # Página de autenticación
│   │   ├── DashboardView.vue       # Dashboard principal
│   │   └── UsersView.vue           # Gestión de usuarios
│   ├── services/
│   │   ├── firebase.js             # Configuración Firebase
│   │   ├── auth.js                 # Servicio autenticación
│   │   └── sensors.js              # Servicio datos sensores
│   ├── stores/
│   │   ├── auth.js                 # Store autenticación
│   │   ├── sensors.js              # Store datos sensores
│   │   └── users.js                # Store gestión usuarios
│   ├── router/
│   │   └── index.js                # Configuración rutas
│   ├── assets/
│   │   ├── styles/
│   │   │   ├── main.css
│   │   │   └── components.css
│   │   └── images/
│   ├── utils/
│   │   ├── constants.js            # Constantes de la app
│   │   └── helpers.js              # Funciones auxiliares
│   ├── App.vue                     # Componente raíz
│   └── main.js                     # Punto de entrada
├── package.json
├── vite.config.js
└── README.md
```

## 🔄 Flujo de Usuario

### 1. Proceso de Autenticación
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Usuario   │───▶│    Login    │───▶│  Dashboard  │
│   accede    │    │  validación │    │   principal │
└─────────────┘    └─────────────┘    └─────────────┘
                          │
                          ▼
                   ┌─────────────┐
                   │ localStorage│
                   │ verificación│
                   └─────────────┘
```

### 2. Dashboard Principal (Funcionalidad Core)
```
Dashboard IoT
├── 🌡️ Temperatura actual (tiempo real)
├── 💧 Humedad actual (tiempo real)
├── 📊 Gráficos históricos
├── 🟢🟡🔴 Estados visuales
├── ⏰ Última actualización
├── 📶 Estado conexión ESP32
└── ⚙️ Acceso gestión usuarios
```

### 3. Gestión de Usuarios (Funcionalidad Secundaria)
```
CRUD Completo:
├── ➕ Crear nuevo usuario
├── 👀 Listar todos los usuarios
├── ✏️ Editar usuario existente
├── 🗑️ Eliminar usuario
└── 🔄 Volver al dashboard
```

## 🔐 Sistema de Autenticación

### Características Principales
- **Tipo**: Estático/Local (sin backend)
- **Almacenamiento**: localStorage del navegador
- **Filosofía**: Todos los usuarios = permisos completos
- **Seguridad**: Basada en localStorage del cliente

### Estructura de Datos de Usuario
```javascript
// Modelo de Usuario
{
  id: 'uuid-v4',                    // ID único
  username: 'string',               // Nombre de usuario único
  password: 'string',               // Contraseña (puede hashearse)
  name: 'string',                   // Nombre completo
  email: 'string',                  // Email (opcional)
  createdAt: 'ISO-timestamp',       // Fecha de creación
  lastLogin: 'ISO-timestamp'        // Último acceso
}
```

### Usuarios por Defecto
```javascript
// Datos iniciales hardcodeados
const defaultUsers = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    name: 'Administrador',
    email: 'admin@iot.com',
    createdAt: '2025-01-02T00:00:00Z'
  },
  {
    id: '2', 
    username: 'operador',
    password: 'operador123',
    name: 'Operador Sistema',
    email: 'operador@iot.com',
    createdAt: '2025-01-02T00:00:00Z'
  }
]
```

### Funciones de Autenticación
- `login(username, password)` - Validar credenciales
- `logout()` - Cerrar sesión
- `getCurrentUser()` - Usuario actual
- `createUser(userData)` - Crear nuevo usuario
- `updateUser(id, userData)` - Actualizar usuario
- `deleteUser(id)` - Eliminar usuario
- `getAllUsers()` - Listar todos los usuarios

## 📊 Dashboard de Datos IoT

### Métricas en Tiempo Real
1. **Temperatura**
   - Valor actual en °C
   - Gráfico histórico (últimas 24h)
   - Estado visual según rangos

2. **Humedad**
   - Valor actual en %
   - Gráfico histórico (últimas 24h)
   - Estado visual según rangos

3. **Estado del Sistema**
   - Conexión ESP32 (Online/Offline)
   - Última actualización (timestamp)
   - Frecuencia de datos

### Estados Visuales (Sin Alertas Sonoras)

#### Temperatura
- 🟢 **Óptimo**: 10-15°C
- 🟡 **Precaución**: 15-20°C  
- 🔴 **Crítico**: >20°C o <10°C

#### Humedad
- 🟢 **Óptimo**: 50-60%
- 🟡 **Precaución**: 60-65%
- 🔴 **Crítico**: >65% o <50%

### Componentes del Dashboard
```vue
<!-- Ejemplo estructura Dashboard -->
<template>
  <div class="dashboard">
    <!-- Header con info usuario -->
    <DashboardHeader :user="currentUser" />
    
    <!-- Métricas principales -->
    <div class="metrics-grid">
      <SensorCard 
        type="temperature" 
        :value="temperature" 
        :status="tempStatus" 
      />
      <SensorCard 
        type="humidity" 
        :value="humidity" 
        :status="humStatus" 
      />
    </div>
    
    <!-- Gráficos históricos -->
    <ChartComponent 
      :temperatureData="tempHistory" 
      :humidityData="humHistory" 
    />
    
    <!-- Estado del sistema -->
    <StatusIndicator 
      :isOnline="esp32Online" 
      :lastUpdate="lastUpdateTime" 
    />
  </div>
</template>
```

## 🔧 Configuración Firebase

### Configuración Existente
```javascript
// firebase.js
const firebaseConfig = {
  apiKey: "AIzaSyAmIVNKvQWuiAih8F_HJZ9GivYQtk3UmEc",
  authDomain: "monitor-iot-esp32.firebaseapp.com",
  databaseURL: "https://monitor-iot-esp32-default-rtdb.firebaseio.com",
  projectId: "monitor-iot-esp32",
  storageBucket: "monitor-iot-esp32.firebasestorage.app",
  messagingSenderId: "1068157465434",
  appId: "1:1068157465434:web:1d7375144d8849d22e3963"
}
```

### Endpoints de Datos
- `sensor/temperature` - Temperatura actual
- `sensor/humidity` - Humedad actual  
- `sensor/timestamp` - Timestamp última actualización

### Servicios Firebase
```javascript
// sensors.js
class SensorService {
  // Leer datos en tiempo real
  subscribeToSensorData(callback)
  
  // Obtener histórico
  getHistoricalData(hours = 24)
  
  // Verificar conexión
  checkConnectionStatus()
}
```

## 🎨 Diseño y Experiencia de Usuario

### Principios de Diseño
1. **Minimalismo**: Interfaz limpia, elementos esenciales
2. **Elegancia**: Uso sutil de sombras y efectos
3. **Claridad**: Información fácil de leer y entender
4. **Responsividad**: Adaptable a todos los dispositivos

### Paleta de Colores
```css
:root {
  /* Colores primarios */
  --primary-blue: #3b82f6;
  --primary-dark: #1e40af;
  
  /* Estados */
  --success-green: #10b981;
  --warning-yellow: #f59e0b;
  --danger-red: #ef4444;
  
  /* Neutrales */
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-500: #6b7280;
  --gray-900: #111827;
  
  /* Fondos */
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-card: rgba(255, 255, 255, 0.95);
}
```

### Componentes de UI
1. **Cards**: Efecto glassmorphism con sombras suaves
2. **Botones**: Diseño moderno con estados hover
3. **Inputs**: Bordes suaves con focus states
4. **Charts**: Colores coherentes con la paleta
5. **Iconografía**: Consistente y minimalista

## 📋 Requerimientos Funcionales

### Funcionalidades Core (MVP)
- [ ] Sistema de login con validación
- [ ] Dashboard principal con datos IoT
- [ ] Visualización en tiempo real
- [ ] Estados visuales de alertas
- [ ] Gráficos históricos básicos
- [ ] Gestión CRUD de usuarios
- [ ] Diseño responsive

### Funcionalidades Avanzadas (Futuro)
- [ ] Exportación de datos (CSV/PDF)
- [ ] Configuración de rangos personalizable
- [ ] Notificaciones web (opcional)
- [ ] Modo oscuro/claro
- [ ] Múltiples sensores
- [ ] Histórico extendido

## 🚀 Instrucciones de Desarrollo

### Instalación y Configuración
```bash
# 1. Crear proyecto Vue
npm create vue@latest vue-iot-dashboard
cd vue-iot-dashboard

# 2. Instalar dependencias
npm install
npm install firebase chart.js vue-chartjs pinia

# 3. Configurar estructura de carpetas
# (seguir estructura documentada arriba)

# 4. Configurar Firebase
# (usar configuración existente)

# 5. Implementar componentes
# (seguir orden de prioridad)
```

### Orden de Desarrollo Sugerido
1. **Setup inicial**: Configuración base Vue + Firebase
2. **Autenticación**: Login y localStorage
3. **Dashboard básico**: Layout y navegación
4. **Conexión IoT**: Lectura datos Firebase
5. **Visualización**: Cards y estados visuales
6. **Gráficos**: Chart.js históricos
7. **Gestión usuarios**: CRUD completo
8. **Refinamiento**: Estilos y UX

### Scripts de Desarrollo
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs --fix"
  }
}
```

## 🔍 Testing y Validación

### Criterios de Aceptación
- [ ] Login funcional con usuarios hardcodeados
- [ ] Dashboard muestra datos del ESP32 en tiempo real
- [ ] Estados visuales cambian según rangos definidos
- [ ] Gráficos muestran histórico de datos
- [ ] CRUD de usuarios funciona correctamente
- [ ] Aplicación es responsive
- [ ] No hay alertas sonoras
- [ ] Interfaz es minimalista y elegante

### Casos de Prueba
1. **Login exitoso/fallido**
2. **Visualización datos tiempo real**
3. **Cambios de estado visual**
4. **Creación/edición/eliminación usuarios**
5. **Navegación entre vistas**
6. **Responsividad en móviles**

## 📞 Contacto y Soporte

**Desarrollador**: Equipo IoT  
**Email**: desarrollo@iot-project.com  
**Repositorio**: [URL del repositorio]  
**Documentación**: Este archivo  

## 📝 Changelog

### Versión 1.0.0 (2025-01-02)
- Documentación inicial del proyecto
- Definición de arquitectura y tecnologías
- Especificación de requerimientos
- Diseño de flujos de usuario

---

**Nota**: Esta documentación será actualizada conforme avance el desarrollo del proyecto.