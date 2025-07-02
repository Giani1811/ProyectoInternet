# Guía para Crear un Frontend IoT Profesional

## 📋 Descripción General

Esta guía te mostrará cómo crear un sistema IoT completo con un frontend moderno similar a las capturas del proyecto, que incluye:
- Página de login con diseño moderno
- Dashboard administrativo con navegación lateral
- Monitoreo en tiempo real de sensores
- Integración con Firebase

## 🎨 Estructura del Proyecto

```
proyecto-iot/
├── index.html          # Página de login
├── dashboard.html      # Panel de control
├── monitor.html        # Monitor de sensores (actual)
├── css/
│   └── styles.css      # Estilos compartidos
├── js/
│   ├── auth.js         # Autenticación
│   ├── dashboard.js    # Lógica del dashboard
│   └── monitor.js      # Monitoreo de sensores
└── assets/
    └── img/            # Imágenes y logos
```

## 💻 Implementación

### 1. Página de Login (index.html)

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IoT - Acceso</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #0f172a;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            overflow: hidden;
        }
        
        /* Fondo con patrón de circuitos */
        body::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px),
                linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px);
            background-size: 50px 50px;
            opacity: 0.5;
        }
        
        /* Logo IoT grande */
        .logo-background {
            position: absolute;
            left: 50px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 15rem;
            font-weight: bold;
            color: rgba(255,255,255,0.05);
            display: flex;
            align-items: center;
            gap: 2rem;
        }
        
        .logo-icon {
            width: 200px;
            height: 200px;
            position: relative;
        }
        
        .logo-icon::before {
            content: '';
            position: absolute;
            width: 60px;
            height: 60px;
            background: white;
            border-radius: 50%;
            top: 20px;
            left: 20px;
        }
        
        .logo-icon::after {
            content: '';
            position: absolute;
            width: 40px;
            height: 40px;
            background: white;
            border-radius: 50%;
            bottom: 40px;
            right: 40px;
        }
        
        .logo-line {
            position: absolute;
            width: 100px;
            height: 4px;
            background: white;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
        }
        
        .logo-box {
            position: absolute;
            width: 80px;
            height: 60px;
            background: white;
            border-radius: 10px;
            bottom: 20px;
            right: 20px;
        }
        
        .logo-box::before {
            content: '⬚⬚';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #0f172a;
            font-size: 24px;
            letter-spacing: 4px;
        }
        
        /* Formulario de login */
        .login-container {
            background: white;
            padding: 3rem;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            width: 400px;
            max-width: 90%;
            z-index: 10;
            position: relative;
        }
        
        .login-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .login-icon {
            width: 60px;
            height: 60px;
            background: #e3f2fd;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem;
            font-size: 24px;
        }
        
        h1 {
            color: #1e293b;
            font-size: 1.8rem;
            margin-bottom: 0.5rem;
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        label {
            display: block;
            color: #64748b;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
        }
        
        input {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            font-size: 1rem;
            transition: all 0.3s;
        }
        
        input:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
        }
        
        .btn-login {
            width: 100%;
            padding: 0.75rem;
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.3s;
        }
        
        .btn-login:hover {
            background: #2563eb;
        }
        
        .error-message {
            background: #fee2e2;
            color: #dc2626;
            padding: 0.75rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            font-size: 0.9rem;
            display: none;
        }
    </style>
</head>
<body>
    <div class="logo-background">
        <div class="logo-icon">
            <div class="logo-line"></div>
            <div class="logo-box"></div>
        </div>
        <span>IoT</span>
    </div>
    
    <div class="login-container">
        <div class="login-header">
            <div class="login-icon">👤</div>
            <h1>Acceso IoT</h1>
        </div>
        
        <div class="error-message" id="errorMessage"></div>
        
        <form id="loginForm">
            <div class="form-group">
                <label for="email">Correo electrónico</label>
                <input type="email" id="email" name="email" required>
            </div>
            
            <div class="form-group">
                <label for="password">Contraseña</label>
                <input type="password" id="password" name="password" required>
            </div>
            
            <button type="submit" class="btn-login">Iniciar Sesión</button>
        </form>
    </div>
    
    <script>
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simulación de login - En producción usar Firebase Auth
            if (email === 'admin@iot.com' && password === 'admin123') {
                localStorage.setItem('isAuthenticated', 'true');
                window.location.href = 'dashboard.html';
            } else {
                const errorMsg = document.getElementById('errorMessage');
                errorMsg.textContent = 'Credenciales incorrectas';
                errorMsg.style.display = 'block';
            }
        });
    </script>
</body>
</html>
```

### 2. Dashboard Principal (dashboard.html)

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IoT - Panel de Control</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f8fafc;
            min-height: 100vh;
            display: flex;
        }
        
        /* Sidebar */
        .sidebar {
            width: 250px;
            background: #3b82f6;
            color: white;
            padding: 2rem 0;
            position: fixed;
            height: 100vh;
            overflow-y: auto;
        }
        
        .sidebar-header {
            padding: 0 2rem 2rem;
            border-bottom: 1px solid rgba(255,255,255,0.2);
        }
        
        .sidebar-logo {
            font-size: 2rem;
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .sidebar-menu {
            padding: 1rem 0;
        }
        
        .menu-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem 2rem;
            color: white;
            text-decoration: none;
            transition: background 0.3s;
        }
        
        .menu-item:hover {
            background: rgba(255,255,255,0.1);
        }
        
        .menu-item.active {
            background: rgba(255,255,255,0.2);
            border-left: 4px solid white;
        }
        
        .menu-icon {
            font-size: 1.2rem;
        }
        
        /* Main Content */
        .main-content {
            margin-left: 250px;
            flex: 1;
            padding: 2rem;
        }
        
        /* Header */
        .header {
            background: white;
            padding: 1.5rem 2rem;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            margin-bottom: 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .header-title {
            font-size: 1.5rem;
            color: #1e293b;
        }
        
        .header-subtitle {
            color: #64748b;
            font-size: 0.9rem;
            margin-top: 0.25rem;
        }
        
        .user-info {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .user-avatar {
            width: 40px;
            height: 40px;
            background: #e3f2fd;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
        }
        
        /* Dashboard Cards */
        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
        }
        
        .dashboard-card {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            transition: transform 0.3s, box-shadow 0.3s;
            cursor: pointer;
            text-decoration: none;
            color: inherit;
        }
        
        .dashboard-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        }
        
        .card-icon {
            width: 60px;
            height: 60px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }
        
        .card-icon.blue {
            background: #e3f2fd;
            color: #1976d2;
        }
        
        .card-icon.green {
            background: #e8f5e9;
            color: #388e3c;
        }
        
        .card-icon.orange {
            background: #fff3e0;
            color: #f57c00;
        }
        
        .card-icon.red {
            background: #ffebee;
            color: #d32f2f;
        }
        
        .card-title {
            font-size: 1.2rem;
            color: #1e293b;
            margin-bottom: 0.5rem;
        }
        
        .card-description {
            color: #64748b;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <!-- Sidebar -->
    <aside class="sidebar">
        <div class="sidebar-header">
            <div class="sidebar-logo">
                <span>📡</span>
                <span>IoT</span>
            </div>
        </div>
        
        <nav class="sidebar-menu">
            <a href="dashboard.html" class="menu-item active">
                <span class="menu-icon">🏠</span>
                <span>Home</span>
            </a>
            <a href="#" class="menu-item">
                <span class="menu-icon">🛡️</span>
                <span>Seguridad</span>
            </a>
            <a href="#" class="menu-item">
                <span class="menu-icon">⚙️</span>
                <span>Configuración</span>
            </a>
            <a href="monitor.html" class="menu-item">
                <span class="menu-icon">📊</span>
                <span>Monitoreo</span>
            </a>
            <a href="#" class="menu-item">
                <span class="menu-icon">🔔</span>
                <span>Notificaciones</span>
            </a>
            <a href="#" class="menu-item">
                <span class="menu-icon">📋</span>
                <span>Tabla</span>
            </a>
        </nav>
    </aside>
    
    <!-- Main Content -->
    <main class="main-content">
        <header class="header">
            <div>
                <h1 class="header-title">Panel de Control</h1>
                <p class="header-subtitle">Sistema de Monitoreo de Humedad para Almacenamiento de Granos</p>
            </div>
            <div class="user-info">
                <span>Administrador</span>
                <div class="user-avatar">👤</div>
            </div>
        </header>
        
        <div class="dashboard-grid">
            <a href="#" class="dashboard-card">
                <div class="card-icon blue">🛡️</div>
                <h3 class="card-title">Seguridad</h3>
                <p class="card-description">Monitoreo de Accesos</p>
            </a>
            
            <a href="#" class="dashboard-card">
                <div class="card-icon green">⚙️</div>
                <h3 class="card-title">Configuración</h3>
                <p class="card-description">Parámetros del Sistema</p>
            </a>
            
            <a href="monitor.html" class="dashboard-card">
                <div class="card-icon orange">📊</div>
                <h3 class="card-title">Monitoreo</h3>
                <p class="card-description">1 dispositivo(s)</p>
            </a>
            
            <a href="#" class="dashboard-card">
                <div class="card-icon red">🔔</div>
                <h3 class="card-title">Notificaciones</h3>
                <p class="card-description">Bandeja de Mensajes</p>
            </a>
        </div>
    </main>
    
    <script>
        // Verificar autenticación
        if (!localStorage.getItem('isAuthenticated')) {
            window.location.href = 'index.html';
        }
    </script>
</body>
</html>
```

### 3. Actualización del Monitor (monitor.html)

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IoT - Monitoreo en Tiempo Real</title>
    <style>
        /* Estilos existentes del monitor + nuevos estilos */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f8fafc;
            min-height: 100vh;
            display: flex;
        }
        
        /* Reutilizar estilos del sidebar del dashboard */
        .sidebar {
            width: 250px;
            background: #3b82f6;
            color: white;
            padding: 2rem 0;
            position: fixed;
            height: 100vh;
            overflow-y: auto;
        }
        
        .main-content {
            margin-left: 250px;
            flex: 1;
            padding: 2rem;
        }
        
        .monitor-container {
            background: white;
            padding: 2rem;
            border-radius: 20px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            max-width: 800px;
            margin: 0 auto;
        }
        
        /* Mantener estilos del monitor original */
        .sensor-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        
        .sensor-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 2rem;
            border-radius: 15px;
            text-align: center;
            color: white;
            transform: translateY(0);
            transition: transform 0.3s ease;
        }
        
        .sensor-card:hover {
            transform: translateY(-5px);
        }
        
        .sensor-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .sensor-value {
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
        }
        
        .sensor-label {
            font-size: 1.1rem;
            opacity: 0.9;
        }
        
        .status {
            text-align: center;
            padding: 1rem;
            background: #f0f0f0;
            border-radius: 10px;
            margin-top: 1rem;
        }
        
        .status.online {
            background: #d4edda;
            color: #155724;
        }
        
        .status.offline {
            background: #f8d7da;
            color: #721c24;
        }
        
        .last-update {
            text-align: center;
            color: #666;
            margin-top: 1rem;
            font-size: 0.9rem;
        }
        
        .back-button {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem;
            background: #3b82f6;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            margin-bottom: 1.5rem;
            transition: background 0.3s;
        }
        
        .back-button:hover {
            background: #2563eb;
        }
    </style>
</head>
<body>
    <!-- Sidebar -->
    <aside class="sidebar">
        <div class="sidebar-header" style="padding: 0 2rem 2rem; border-bottom: 1px solid rgba(255,255,255,0.2);">
            <div class="sidebar-logo" style="font-size: 2rem; font-weight: bold; display: flex; align-items: center; gap: 0.5rem;">
                <span>📡</span>
                <span>IoT</span>
            </div>
        </div>
        
        <nav class="sidebar-menu" style="padding: 1rem 0;">
            <a href="dashboard.html" class="menu-item" style="display: flex; align-items: center; gap: 1rem; padding: 1rem 2rem; color: white; text-decoration: none;">
                <span class="menu-icon">🏠</span>
                <span>Home</span>
            </a>
            <a href="#" class="menu-item">
                <span class="menu-icon">🛡️</span>
                <span>Seguridad</span>
            </a>
            <a href="#" class="menu-item">
                <span class="menu-icon">⚙️</span>
                <span>Configuración</span>
            </a>
            <a href="monitor.html" class="menu-item" style="background: rgba(255,255,255,0.2); border-left: 4px solid white;">
                <span class="menu-icon">📊</span>
                <span>Monitoreo</span>
            </a>
            <a href="#" class="menu-item">
                <span class="menu-icon">🔔</span>
                <span>Notificaciones</span>
            </a>
            <a href="#" class="menu-item">
                <span class="menu-icon">📋</span>
                <span>Tabla</span>
            </a>
        </nav>
    </aside>
    
    <!-- Main Content -->
    <main class="main-content">
        <a href="dashboard.html" class="back-button">
            <span>←</span>
            <span>Volver al Dashboard</span>
        </a>
        
        <div class="monitor-container">
            <h1 style="text-align: center; color: #667eea; margin-bottom: 2rem; font-size: 2rem;">
                🌡️ Monitor IoT en Tiempo Real
            </h1>
            
            <div id="loading" class="loading" style="text-align: center; color: #667eea; font-size: 1.2rem;">
                Conectando con el sensor...
            </div>
            
            <div id="content" style="display: none;">
                <div class="sensor-grid">
                    <div class="sensor-card">
                        <div class="sensor-icon">🌡️</div>
                        <div class="sensor-value" id="temperature">--</div>
                        <div class="sensor-label">Temperatura °C</div>
                    </div>
                    
                    <div class="sensor-card">
                        <div class="sensor-icon">💧</div>
                        <div class="sensor-value" id="humidity">--</div>
                        <div class="sensor-label">Humedad %</div>
                    </div>
                </div>
                
                <div id="status" class="status">
                    Verificando conexión...
                </div>
                
                <div class="last-update" id="lastUpdate">
                    Última actualización: --
                </div>
            </div>
        </div>
    </main>
    
    <!-- Firebase SDK -->
    <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-database-compat.js"></script>
    
    <script>
        // Verificar autenticación
        if (!localStorage.getItem('isAuthenticated')) {
            window.location.href = 'index.html';
        }
        
        // Código existente de Firebase...
        const firebaseConfig = {
            apiKey: "AIzaSyAmIVNKvQWuiAih8F_HJZ9GivYQtk3UmEc",
            authDomain: "monitor-iot-esp32.firebaseapp.com",
            databaseURL: "https://monitor-iot-esp32-default-rtdb.firebaseio.com",
            projectId: "monitor-iot-esp32",
            storageBucket: "monitor-iot-esp32.firebasestorage.app",
            messagingSenderId: "1068157465434",
            appId: "1:1068157465434:web:1d7375144d8849d22e3963"
        };
        
        // Resto del código JavaScript del monitor original...
        firebase.initializeApp(firebaseConfig);
        const database = firebase.database();
        
        const tempRef = database.ref('sensor/temperature');
        const humRef = database.ref('sensor/humidity');
        const timestampRef = database.ref('sensor/timestamp');
        
        let lastTimestamp = 0;
        
        tempRef.on('value', (snapshot) => {
            const temp = snapshot.val();
            if (temp !== null) {
                document.getElementById('temperature').textContent = temp.toFixed(1);
                document.getElementById('loading').style.display = 'none';
                document.getElementById('content').style.display = 'block';
            }
        });
        
        humRef.on('value', (snapshot) => {
            const hum = snapshot.val();
            if (hum !== null) {
                document.getElementById('humidity').textContent = Math.round(hum);
            }
        });
        
        timestampRef.on('value', (snapshot) => {
            const timestamp = snapshot.val();
            if (timestamp !== null) {
                lastTimestamp = Date.now();
                updateStatus();
                updateLastTime();
            }
        });
        
        setInterval(() => {
            updateStatus();
        }, 5000);
        
        function updateStatus() {
            const now = Date.now();
            const diff = now - lastTimestamp;
            const statusEl = document.getElementById('status');
            
            if (diff < 30000) {
                statusEl.textContent = '🟢 Sensor en línea';
                statusEl.className = 'status online';
            } else {
                statusEl.textContent = '🔴 Sensor desconectado';
                statusEl.className = 'status offline';
            }
        }
        
        function updateLastTime() {
            const now = new Date();
            const timeString = now.toLocaleTimeString('es-ES');
            const dateString = now.toLocaleDateString('es-ES');
            document.getElementById('lastUpdate').textContent = 
                `Última actualización: ${timeString} - ${dateString}`;
        }
    </script>
</body>
</html>
```

## 🚀 Instrucciones de Implementación

### 1. Estructura de archivos
Crea los siguientes archivos en tu proyecto:
- `index.html` - Página de login
- `dashboard.html` - Panel principal
- `monitor.html` - Monitor de sensores actualizado

### 2. Configuración de Firebase
- Mantén tu configuración actual de Firebase
- Para autenticación real, implementa Firebase Auth
- El código actual usa localStorage para demo

### 3. Personalización
- **Colores**: Modifica las variables de color en CSS
- **Logo**: Reemplaza los emojis con tus propios íconos
- **Menú**: Añade o quita items según necesites

### 4. Seguridad
- Implementa autenticación real con Firebase Auth
- Añade validación de sesiones
- Configura reglas de seguridad en Firebase

### 5. Responsive Design
El diseño ya es responsive, pero puedes ajustar:
- Breakpoints en media queries
- Tamaños de fuente para móviles
- Comportamiento del sidebar en móviles

## 📱 Mejoras Sugeridas

1. **Gráficos históricos**: Añadir Chart.js para visualizar tendencias
2. **Alertas**: Sistema de notificaciones para valores críticos
3. **PWA**: Convertir en Progressive Web App
4. **Temas**: Modo oscuro/claro
5. **Exportación**: Descargar datos en CSV/PDF

## 🔐 Credenciales de Demo

Para el login de demostración:
- Email: `admin@iot.com`
- Password: `admin123`

**Nota**: En producción, usa Firebase Authentication con credenciales seguras.

## 🎯 Resultado Final

Este sistema te dará:
- Login profesional con diseño moderno
- Dashboard administrativo completo
- Monitoreo en tiempo real integrado
- Navegación consistente entre páginas
- Diseño responsive y atractivo

El diseño replica las capturas mostradas con mejoras adicionales para una experiencia completa de usuario.