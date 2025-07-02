# Sistema de Monitoreo IoT para Almacenamiento de Frutos Secos

## 📋 Descripción del Sistema

Sistema completo de monitoreo de temperatura y humedad diseñado específicamente para el almacenamiento óptimo de frutos secos, con interfaz web profesional que incluye registro, login y panel de control.

## 🌡️ Parámetros Óptimos para Frutos Secos

### Condiciones Ideales de Almacenamiento:
- **Temperatura**: 10°C - 15°C (máximo 20°C)
- **Humedad Relativa**: 50% - 60% (nunca superior a 65%)

### Rangos de Alerta:
- **🟢 Óptimo**: Temp 10-15°C, Humedad 50-60%
- **🟡 Precaución**: Temp 15-20°C, Humedad 60-65%
- **🔴 Crítico**: Temp >20°C o <10°C, Humedad >65% o <50%

### Justificación:
- **Baja humedad (<50%)**: Los frutos se resecan y pierden calidad
- **Alta humedad (>65%)**: Riesgo de moho, hongos y deterioro
- **Alta temperatura (>20°C)**: Acelera la rancidez de aceites naturales
- **Baja temperatura (<10°C)**: Puede causar condensación

## 🏗️ Arquitectura del Sistema

```
┌─────────────┐     ┌─────────────┐     ┌──────────────┐
│   DHT11     │────▶│    ESP32    │────▶│   Firebase   │
│  Sensor     │     │             │     │   Database   │
└─────────────┘     └─────────────┘     └──────────────┘
                                               │
                                               ▼
                    ┌─────────────────────────────────┐
                    │        Aplicación Web           │
                    │  ┌─────────┐  ┌─────────────┐  │
                    │  │  Login  │─▶│   Dashboard │  │
                    │  └─────────┘  └─────────────┘  │
                    │                      │          │
                    │                      ▼          │
                    │              ┌─────────────┐   │
                    │              │  Monitoreo  │   │
                    │              └─────────────┘   │
                    └─────────────────────────────────┘
```

## 💻 Implementación del Frontend Completo

### 1. Página de Login con Registro (login.html)

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema IoT - Monitoreo de Frutos Secos</title>
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
            animation: drift 20s linear infinite;
        }
        
        @keyframes drift {
            from { transform: translate(0, 0); }
            to { transform: translate(50px, 50px); }
        }
        
        /* Logo IoT grande izquierda */
        .logo-background {
            position: absolute;
            left: 10%;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            align-items: center;
            gap: 2rem;
            opacity: 0.1;
        }
        
        .logo-icon {
            width: 200px;
            height: 200px;
            position: relative;
        }
        
        /* Círculos del logo */
        .circle-1, .circle-2 {
            position: absolute;
            background: white;
            border-radius: 50%;
        }
        
        .circle-1 {
            width: 60px;
            height: 60px;
            top: 20px;
            left: 20px;
        }
        
        .circle-2 {
            width: 40px;
            height: 40px;
            bottom: 40px;
            right: 40px;
        }
        
        /* Línea conectora */
        .connector {
            position: absolute;
            width: 120px;
            height: 4px;
            background: white;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
        }
        
        /* Caja del chip */
        .chip-box {
            position: absolute;
            width: 80px;
            height: 60px;
            background: white;
            border-radius: 10px;
            bottom: 20px;
            right: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .chip-box::after {
            content: '⬚ ⬚';
            color: #0f172a;
            font-size: 20px;
        }
        
        .logo-text {
            font-size: 10rem;
            font-weight: bold;
            color: white;
        }
        
        /* Contenedor del formulario */
        .auth-container {
            background: rgba(255, 255, 255, 0.95);
            padding: 3rem;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            width: 400px;
            max-width: 90%;
            z-index: 10;
            backdrop-filter: blur(10px);
        }
        
        .auth-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .auth-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem;
            font-size: 36px;
            color: white;
            box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
        }
        
        h1 {
            color: #1e293b;
            font-size: 1.8rem;
            margin-bottom: 0.5rem;
        }
        
        .subtitle {
            color: #64748b;
            font-size: 0.9rem;
        }
        
        .tabs {
            display: flex;
            margin-bottom: 2rem;
            border-bottom: 2px solid #e2e8f0;
        }
        
        .tab {
            flex: 1;
            padding: 1rem;
            background: none;
            border: none;
            font-size: 1rem;
            color: #64748b;
            cursor: pointer;
            position: relative;
            transition: color 0.3s;
        }
        
        .tab.active {
            color: #3b82f6;
        }
        
        .tab.active::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            right: 0;
            height: 2px;
            background: #3b82f6;
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        label {
            display: block;
            color: #475569;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
            font-weight: 500;
        }
        
        input {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 2px solid #e2e8f0;
            border-radius: 10px;
            font-size: 1rem;
            transition: all 0.3s;
        }
        
        input:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
        }
        
        .btn-submit {
            width: 100%;
            padding: 0.875rem;
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        }
        
        .btn-submit:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }
        
        .message {
            padding: 0.75rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            font-size: 0.9rem;
            text-align: center;
        }
        
        .error {
            background: #fee2e2;
            color: #dc2626;
            border: 1px solid #fecaca;
        }
        
        .success {
            background: #dcfce7;
            color: #16a34a;
            border: 1px solid #bbf7d0;
        }
        
        .form-content {
            display: none;
        }
        
        .form-content.active {
            display: block;
        }
        
        .info-text {
            text-align: center;
            color: #64748b;
            font-size: 0.85rem;
            margin-top: 1rem;
        }
    </style>
</head>
<body>
    <!-- Logo de fondo -->
    <div class="logo-background">
        <div class="logo-icon">
            <div class="circle-1"></div>
            <div class="circle-2"></div>
            <div class="connector"></div>
            <div class="chip-box"></div>
        </div>
        <span class="logo-text">IoT</span>
    </div>
    
    <!-- Contenedor de autenticación -->
    <div class="auth-container">
        <div class="auth-header">
            <div class="auth-icon">🌰</div>
            <h1>Acceso IoT</h1>
            <p class="subtitle">Sistema de Monitoreo para Frutos Secos</p>
        </div>
        
        <!-- Tabs -->
        <div class="tabs">
            <button class="tab active" onclick="showTab('login')">Iniciar Sesión</button>
            <button class="tab" onclick="showTab('register')">Registrarse</button>
        </div>
        
        <!-- Mensaje de estado -->
        <div id="message" class="message" style="display: none;"></div>
        
        <!-- Formulario de Login -->
        <div id="loginForm" class="form-content active">
            <form onsubmit="handleLogin(event)">
                <div class="form-group">
                    <label for="loginEmail">Correo electrónico</label>
                    <input type="email" id="loginEmail" required placeholder="usuario@ejemplo.com">
                </div>
                
                <div class="form-group">
                    <label for="loginPassword">Contraseña</label>
                    <input type="password" id="loginPassword" required placeholder="••••••••">
                </div>
                
                <button type="submit" class="btn-submit">Iniciar Sesión</button>
            </form>
            
            <p class="info-text">
                Credenciales de demo: admin@frutas.com / admin123
            </p>
        </div>
        
        <!-- Formulario de Registro -->
        <div id="registerForm" class="form-content">
            <form onsubmit="handleRegister(event)">
                <div class="form-group">
                    <label for="registerName">Nombre completo</label>
                    <input type="text" id="registerName" required placeholder="Juan Pérez">
                </div>
                
                <div class="form-group">
                    <label for="registerEmail">Correo electrónico</label>
                    <input type="email" id="registerEmail" required placeholder="usuario@ejemplo.com">
                </div>
                
                <div class="form-group">
                    <label for="registerPassword">Contraseña</label>
                    <input type="password" id="registerPassword" required placeholder="Mínimo 6 caracteres">
                </div>
                
                <div class="form-group">
                    <label for="registerCompany">Empresa/Almacén</label>
                    <input type="text" id="registerCompany" required placeholder="Almacén de Frutos Secos SA">
                </div>
                
                <button type="submit" class="btn-submit">Crear Cuenta</button>
            </form>
            
            <p class="info-text">
                Al registrarte aceptas monitorear tus productos de forma responsable
            </p>
        </div>
    </div>
    
    <script>
        // Cambiar entre tabs
        function showTab(tab) {
            const tabs = document.querySelectorAll('.tab');
            const forms = document.querySelectorAll('.form-content');
            const message = document.getElementById('message');
            
            // Ocultar mensaje
            message.style.display = 'none';
            
            // Actualizar tabs
            tabs.forEach(t => t.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));
            
            if (tab === 'login') {
                tabs[0].classList.add('active');
                document.getElementById('loginForm').classList.add('active');
            } else {
                tabs[1].classList.add('active');
                document.getElementById('registerForm').classList.add('active');
            }
        }
        
        // Mostrar mensaje
        function showMessage(text, type) {
            const message = document.getElementById('message');
            message.textContent = text;
            message.className = `message ${type}`;
            message.style.display = 'block';
        }
        
        // Manejar login
        function handleLogin(event) {
            event.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Simulación de autenticación
            if (email === 'admin@frutas.com' && password === 'admin123') {
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userName', 'Administrador');
                showMessage('¡Acceso exitoso! Redirigiendo...', 'success');
                
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            } else {
                showMessage('Credenciales incorrectas', 'error');
            }
        }
        
        // Manejar registro
        function handleRegister(event) {
            event.preventDefault();
            
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const company = document.getElementById('registerCompany').value;
            
            if (password.length < 6) {
                showMessage('La contraseña debe tener al menos 6 caracteres', 'error');
                return;
            }
            
            // Simulación de registro
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userName', name);
            localStorage.setItem('userCompany', company);
            
            showMessage('¡Registro exitoso! Redirigiendo...', 'success');
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        }
    </script>
</body>
</html>
```

### 2. Panel de Control Simplificado (dashboard.html)

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Control - Monitoreo de Frutos Secos</title>
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
            box-shadow: 4px 0 10px rgba(0,0,0,0.1);
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
        
        .sidebar-subtitle {
            font-size: 0.85rem;
            opacity: 0.8;
            margin-top: 0.5rem;
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
            transition: all 0.3s;
            position: relative;
        }
        
        .menu-item:hover {
            background: rgba(255,255,255,0.1);
        }
        
        .menu-item.active {
            background: rgba(255,255,255,0.2);
            border-left: 4px solid white;
            padding-left: calc(2rem - 4px);
        }
        
        .menu-icon {
            font-size: 1.2rem;
        }
        
        .logout-section {
            position: absolute;
            bottom: 2rem;
            left: 0;
            right: 0;
            padding: 0 2rem;
        }
        
        .btn-logout {
            width: 100%;
            padding: 0.75rem;
            background: rgba(255,255,255,0.2);
            color: white;
            border: 1px solid rgba(255,255,255,0.3);
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 0.9rem;
        }
        
        .btn-logout:hover {
            background: rgba(255,255,255,0.3);
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
            background: #f1f5f9;
            padding: 0.5rem 1rem;
            border-radius: 8px;
        }
        
        .user-avatar {
            width: 40px;
            height: 40px;
            background: #3b82f6;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
        }
        
        /* Dashboard Content */
        .welcome-card {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            padding: 3rem;
            border-radius: 16px;
            margin-bottom: 2rem;
            box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
        }
        
        .welcome-title {
            font-size: 2rem;
            margin-bottom: 1rem;
        }
        
        .welcome-text {
            font-size: 1.1rem;
            opacity: 0.9;
            margin-bottom: 2rem;
        }
        
        .monitor-card {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            text-align: center;
            transition: all 0.3s;
            cursor: pointer;
            text-decoration: none;
            color: inherit;
            display: block;
            max-width: 400px;
            margin: 0 auto;
        }
        
        .monitor-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        }
        
        .monitor-icon {
            width: 80px;
            height: 80px;
            background: #fff3e0;
            color: #f57c00;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
            margin: 0 auto 1.5rem;
        }
        
        .monitor-title {
            font-size: 1.5rem;
            color: #1e293b;
            margin-bottom: 0.5rem;
        }
        
        .monitor-description {
            color: #64748b;
            font-size: 1rem;
            margin-bottom: 1rem;
        }
        
        .monitor-status {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            background: #dcfce7;
            color: #16a34a;
            border-radius: 20px;
            font-size: 0.9rem;
        }
        
        .status-dot {
            width: 8px;
            height: 8px;
            background: #16a34a;
            border-radius: 50%;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
        }
        
        /* Info Cards */
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
        }
        
        .info-card {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        
        .info-card h3 {
            color: #1e293b;
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .info-card p {
            color: #64748b;
            font-size: 0.9rem;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <!-- Sidebar -->
    <aside class="sidebar">
        <div class="sidebar-header">
            <div class="sidebar-logo">
                <span>🌰</span>
                <span>FrutosIoT</span>
            </div>
            <p class="sidebar-subtitle">Sistema de Monitoreo</p>
        </div>
        
        <nav class="sidebar-menu">
            <a href="dashboard.html" class="menu-item active">
                <span class="menu-icon">🏠</span>
                <span>Inicio</span>
            </a>
            <a href="monitor.html" class="menu-item">
                <span class="menu-icon">📊</span>
                <span>Monitoreo</span>
            </a>
        </nav>
        
        <div class="logout-section">
            <button class="btn-logout" onclick="logout()">
                🚪 Cerrar Sesión
            </button>
        </div>
    </aside>
    
    <!-- Main Content -->
    <main class="main-content">
        <header class="header">
            <div>
                <h1 class="header-title">Panel de Control</h1>
                <p class="header-subtitle">Sistema de Monitoreo de Humedad para Almacenamiento de Frutos Secos</p>
            </div>
            <div class="user-info">
                <span id="userName">Usuario</span>
                <div class="user-avatar">👤</div>
            </div>
        </header>
        
        <!-- Welcome Card -->
        <div class="welcome-card">
            <h2 class="welcome-title">¡Bienvenido al Sistema de Monitoreo!</h2>
            <p class="welcome-text">
                Mantén tus frutos secos en condiciones óptimas monitoreando temperatura y humedad en tiempo real.
                Nuestro sistema te alertará cuando los valores salgan de los rangos ideales.
            </p>
            <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
                <div>
                    <strong>🌡️ Temperatura ideal:</strong> 10-15°C
                </div>
                <div>
                    <strong>💧 Humedad ideal:</strong> 50-60%
                </div>
            </div>
        </div>
        
        <!-- Monitor Card -->
        <a href="monitor.html" class="monitor-card">
            <div class="monitor-icon">📊</div>
            <h3 class="monitor-title">Monitoreo en Tiempo Real</h3>
            <p class="monitor-description">
                Visualiza temperatura y humedad actual de tu almacén
            </p>
            <span class="monitor-status">
                <span class="status-dot"></span>
                1 dispositivo activo
            </span>
        </a>
        
        <!-- Info Cards -->
        <div class="info-grid">
            <div class="info-card">
                <h3>🌡️ Control de Temperatura</h3>
                <p>
                    La temperatura debe mantenerse entre 10-15°C para evitar la oxidación
                    de los aceites naturales y mantener la frescura de los frutos secos.
                </p>
            </div>
            
            <div class="info-card">
                <h3>💧 Control de Humedad</h3>
                <p>
                    La humedad relativa entre 50-60% previene el crecimiento de moho
                    sin resecar los productos. Valores superiores a 65% son críticos.
                </p>
            </div>
            
            <div class="info-card">
                <h3>⚠️ Sistema de Alertas</h3>
                <p>
                    Recibirás notificaciones visuales cuando los valores excedan los
                    límites seguros para una acción inmediata.
                </p>
            </div>
        </div>
    </main>
    
    <script>
        // Verificar autenticación
        if (!localStorage.getItem('isAuthenticated')) {
            window.location.href = 'login.html';
        }
        
        // Mostrar nombre de usuario
        const userName = localStorage.getItem('userName') || 'Usuario';
        document.getElementById('userName').textContent = userName;
        
        // Logout
        function logout() {
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('userName');
            localStorage.removeItem('userEmail');
            window.location.href = 'login.html';
        }
    </script>
</body>
</html>
```

### 3. Página de Monitoreo Actualizada (monitor.html)

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Monitoreo en Tiempo Real - Frutos Secos</title>
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
        
        /* Sidebar (reutilizar del dashboard) */
        .sidebar {
            width: 250px;
            background: #3b82f6;
            color: white;
            padding: 2rem 0;
            position: fixed;
            height: 100vh;
            overflow-y: auto;
            box-shadow: 4px 0 10px rgba(0,0,0,0.1);
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
        
        .sidebar-subtitle {
            font-size: 0.85rem;
            opacity: 0.8;
            margin-top: 0.5rem;
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
            transition: all 0.3s;
            position: relative;
        }
        
        .menu-item:hover {
            background: rgba(255,255,255,0.1);
        }
        
        .menu-item.active {
            background: rgba(255,255,255,0.2);
            border-left: 4px solid white;
            padding-left: calc(2rem - 4px);
        }
        
        .logout-section {
            position: absolute;
            bottom: 2rem;
            left: 0;
            right: 0;
            padding: 0 2rem;
        }
        
        .btn-logout {
            width: 100%;
            padding: 0.75rem;
            background: rgba(255,255,255,0.2);
            color: white;
            border: 1px solid rgba(255,255,255,0.3);
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 0.9rem;
        }
        
        /* Main Content */
        .main-content {
            margin-left: 250px;
            flex: 1;
            padding: 2rem;
        }
        
        .monitor-header {
            background: white;
            padding: 1.5rem 2rem;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            margin-bottom: 2rem;
        }
        
        .monitor-title {
            font-size: 1.5rem;
            color: #1e293b;
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .back-link {
            color: #3b82f6;
            text-decoration: none;
            font-size: 0.9rem;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
            transition: color 0.3s;
        }
        
        .back-link:hover {
            color: #2563eb;
        }
        
        /* Monitor Container */
        .monitor-container {
            background: white;
            padding: 2rem;
            border-radius: 20px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        
        /* Sensor Grid */
        .sensor-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }
        
        .sensor-card {
            padding: 2rem;
            border-radius: 16px;
            text-align: center;
            color: white;
            position: relative;
            overflow: hidden;
            transition: transform 0.3s ease;
        }
        
        .sensor-card:hover {
            transform: translateY(-5px);
        }
        
        /* Estados de temperatura */
        .temp-optimal {
            background: linear-gradient(135deg, #10b981, #059669);
        }
        
        .temp-warning {
            background: linear-gradient(135deg, #f59e0b, #d97706);
        }
        
        .temp-critical {
            background: linear-gradient(135deg, #ef4444, #dc2626);
        }
        
        /* Estados de humedad */
        .hum-optimal {
            background: linear-gradient(135deg, #3b82f6, #2563eb);
        }
        
        .hum-warning {
            background: linear-gradient(135deg, #f59e0b, #d97706);
        }
        
        .hum-critical {
            background: linear-gradient(135deg, #ef4444, #dc2626);
        }
        
        .sensor-icon {
            font-size: 3.5rem;
            margin-bottom: 1rem;
            filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
        }
        
        .sensor-value {
            font-size: 3rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .sensor-label {
            font-size: 1.2rem;
            opacity: 0.95;
            margin-bottom: 1rem;
        }
        
        .sensor-status {
            font-size: 0.9rem;
            padding: 0.5rem 1rem;
            background: rgba(255,255,255,0.2);
            border-radius: 20px;
            display: inline-block;
        }
        
        /* Estado y alertas */
        .status-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
        }
        
        .status-card {
            padding: 1.5rem;
            border-radius: 12px;
            text-align: center;
        }
        
        .status-card.online {
            background: #dcfce7;
            color: #15803d;
        }
        
        .status-card.offline {
            background: #fee2e2;
            color: #991b1b;
        }
        
        .status-card.alert {
            background: #fef3c7;
            color: #92400e;
            animation: alertPulse 2s infinite;
        }
        
        @keyframes alertPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
        }
        
        .last-update {
            text-align: center;
            color: #64748b;
            margin-top: 1rem;
            font-size: 0.9rem;
        }
        
        /* Ranges Info */
        .ranges-info {
            background: #f1f5f9;
            padding: 1.5rem;
            border-radius: 12px;
            margin-top: 2rem;
        }
        
        .ranges-title {
            font-size: 1.1rem;
            color: #1e293b;
            margin-bottom: 1rem;
            text-align: center;
        }
        
        .ranges-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            text-align: center;
            font-size: 0.9rem;
        }
        
        .range-item {
            padding: 0.75rem;
            border-radius: 8px;
            background: white;
        }
        
        .range-optimal {
            border: 2px solid #10b981;
            color: #059669;
        }
        
        .range-warning {
            border: 2px solid #f59e0b;
            color: #d97706;
        }
        
        .range-critical {
            border: 2px solid #ef4444;
            color: #dc2626;
        }
        
        /* Loading state */
        .loading {
            text-align: center;
            color: #3b82f6;
            font-size: 1.2rem;
            padding: 4rem;
        }
        
        .loading::after {
            content: '...';
            animation: dots 1.5s steps(4, end) infinite;
        }
        
        @keyframes dots {
            0%, 20% { content: ''; }
            40% { content: '.'; }
            60% { content: '..'; }
            80%, 100% { content: '...'; }
        }
    </style>
</head>
<body>
    <!-- Sidebar -->
    <aside class="sidebar">
        <div class="sidebar-header">
            <div class="sidebar-logo">
                <span>🌰</span>
                <span>FrutosIoT</span>
            </div>
            <p class="sidebar-subtitle">Sistema de Monitoreo</p>
        </div>
        
        <nav class="sidebar-menu">
            <a href="dashboard.html" class="menu-item">
                <span class="menu-icon">🏠</span>
                <span>Inicio</span>
            </a>
            <a href="monitor.html" class="menu-item active">
                <span class="menu-icon">📊</span>
                <span>Monitoreo</span>
            </a>
        </nav>
        
        <div class="logout-section">
            <button class="btn-logout" onclick="logout()">
                🚪 Cerrar Sesión
            </button>
        </div>
    </aside>
    
    <!-- Main Content -->
    <main class="main-content">
        <div class="monitor-header">
            <a href="dashboard.html" class="back-link">
                <span>←</span>
                <span>Volver al panel</span>
            </a>
            <h1 class="monitor-title">
                <span>📊</span>
                <span>Monitoreo en Tiempo Real - Almacén de Frutos Secos</span>
            </h1>
        </div>
        
        <div class="monitor-container">
            <div id="loading" class="loading">Conectando con el sensor</div>
            
            <div id="content" style="display: none;">
                <div class="sensor-grid">
                    <!-- Tarjeta de Temperatura -->
                    <div class="sensor-card" id="tempCard">
                        <div class="sensor-icon">🌡️</div>
                        <div class="sensor-value" id="temperature">--</div>
                        <div class="sensor-label">Temperatura °C</div>
                        <div class="sensor-status" id="tempStatus">--</div>
                    </div>
                    
                    <!-- Tarjeta de Humedad -->
                    <div class="sensor-card" id="humCard">
                        <div class="sensor-icon">💧</div>
                        <div class="sensor-value" id="humidity">--</div>
                        <div class="sensor-label">Humedad %</div>
                        <div class="sensor-status" id="humStatus">--</div>
                    </div>
                </div>
                
                <!-- Estados y Alertas -->
                <div class="status-container">
                    <div id="connectionStatus" class="status-card">
                        Verificando conexión...
                    </div>
                    <div id="alertStatus" class="status-card" style="display: none;">
                        <!-- Se mostrará si hay alertas -->
                    </div>
                </div>
                
                <!-- Información de rangos -->
                <div class="ranges-info">
                    <h3 class="ranges-title">📏 Rangos de Operación para Frutos Secos</h3>
                    <div class="ranges-grid">
                        <div class="range-item range-optimal">
                            <strong>🟢 Óptimo</strong><br>
                            Temp: 10-15°C<br>
                            Humedad: 50-60%
                        </div>
                        <div class="range-item range-warning">
                            <strong>🟡 Precaución</strong><br>
                            Temp: 15-20°C<br>
                            Humedad: 60-65%
                        </div>
                        <div class="range-item range-critical">
                            <strong>🔴 Crítico</strong><br>
                            Temp: >20°C o <10°C<br>
                            Humedad: >65% o <50%
                        </div>
                    </div>
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
            window.location.href = 'login.html';
        }
        
        // Configuración de Firebase
        const firebaseConfig = {
            apiKey: "AIzaSyAmIVNKvQWuiAih8F_HJZ9GivYQtk3UmEc",
            authDomain: "monitor-iot-esp32.firebaseapp.com",
            databaseURL: "https://monitor-iot-esp32-default-rtdb.firebaseio.com",
            projectId: "monitor-iot-esp32",
            storageBucket: "monitor-iot-esp32.firebasestorage.app",
            messagingSenderId: "1068157465434",
            appId: "1:1068157465434:web:1d7375144d8849d22e3963"
        };
        
        // Inicializar Firebase
        firebase.initializeApp(firebaseConfig);
        const database = firebase.database();
        
        // Referencias a los datos
        const tempRef = database.ref('sensor/temperature');
        const humRef = database.ref('sensor/humidity');
        const timestampRef = database.ref('sensor/timestamp');
        
        let lastTimestamp = 0;
        let alertsActive = false;
        
        // Funciones de evaluación de estado
        function evaluateTemperature(temp) {
            const tempCard = document.getElementById('tempCard');
            const tempStatus = document.getElementById('tempStatus');
            
            if (temp >= 10 && temp <= 15) {
                tempCard.className = 'sensor-card temp-optimal';
                tempStatus.textContent = '🟢 Óptimo';
                return 'optimal';
            } else if (temp > 15 && temp <= 20) {
                tempCard.className = 'sensor-card temp-warning';
                tempStatus.textContent = '🟡 Precaución';
                return 'warning';
            } else {
                tempCard.className = 'sensor-card temp-critical';
                tempStatus.textContent = '🔴 Crítico';
                return 'critical';
            }
        }
        
        function evaluateHumidity(hum) {
            const humCard = document.getElementById('humCard');
            const humStatus = document.getElementById('humStatus');
            
            if (hum >= 50 && hum <= 60) {
                humCard.className = 'sensor-card hum-optimal';
                humStatus.textContent = '🟢 Óptimo';
                return 'optimal';
            } else if (hum > 60 && hum <= 65) {
                humCard.className = 'sensor-card hum-warning';
                humStatus.textContent = '🟡 Precaución';
                return 'warning';
            } else {
                humCard.className = 'sensor-card hum-critical';
                humStatus.textContent = '🔴 Crítico';
                return 'critical';
            }
        }
        
        function updateAlerts(tempState, humState) {
            const alertStatus = document.getElementById('alertStatus');
            const alerts = [];
            
            if (tempState === 'critical') {
                alerts.push('⚠️ Temperatura fuera de rango seguro');
            }
            if (humState === 'critical') {
                alerts.push('⚠️ Humedad fuera de rango seguro');
            }
            
            if (alerts.length > 0) {
                alertStatus.style.display = 'block';
                alertStatus.className = 'status-card alert';
                alertStatus.innerHTML = '<strong>Alertas Activas:</strong><br>' + alerts.join('<br>');
                alertsActive = true;
            } else {
                alertStatus.style.display = 'none';
                alertsActive = false;
            }
        }
        
        // Escuchar cambios en temperatura
        tempRef.on('value', (snapshot) => {
            const temp = snapshot.val();
            if (temp !== null) {
                document.getElementById('temperature').textContent = temp.toFixed(1);
                document.getElementById('loading').style.display = 'none';
                document.getElementById('content').style.display = 'block';
                
                const tempState = evaluateTemperature(temp);
                const humValue = parseFloat(document.getElementById('humidity').textContent);
                if (!isNaN(humValue)) {
                    updateAlerts(tempState, evaluateHumidity(humValue));
                }
            }
        });
        
        // Escuchar cambios en humedad
        humRef.on('value', (snapshot) => {
            const hum = snapshot.val();
            if (hum !== null) {
                document.getElementById('humidity').textContent = Math.round(hum);
                
                const humState = evaluateHumidity(hum);
                const tempValue = parseFloat(document.getElementById('temperature').textContent);
                if (!isNaN(tempValue)) {
                    updateAlerts(evaluateTemperature(tempValue), humState);
                }
            }
        });
        
        // Escuchar timestamp para verificar conexión
        timestampRef.on('value', (snapshot) => {
            const timestamp = snapshot.val();
            if (timestamp !== null) {
                lastTimestamp = Date.now();
                updateConnectionStatus();
                updateLastTime();
            }
        });
        
        // Verificar estado de conexión cada 5 segundos
        setInterval(() => {
            updateConnectionStatus();
        }, 5000);
        
        function updateConnectionStatus() {
            const now = Date.now();
            const diff = now - lastTimestamp;
            const statusEl = document.getElementById('connectionStatus');
            
            if (diff < 30000) {
                statusEl.textContent = '🟢 Sensor en línea y transmitiendo';
                statusEl.className = 'status-card online';
            } else {
                statusEl.textContent = '🔴 Sensor desconectado - Verificar conexión';
                statusEl.className = 'status-card offline';
            }
        }
        
        function updateLastTime() {
            const now = new Date();
            const timeString = now.toLocaleTimeString('es-ES');
            const dateString = now.toLocaleDateString('es-ES');
            document.getElementById('lastUpdate').textContent = 
                `Última actualización: ${timeString} - ${dateString}`;
        }
        
        // Logout
        function logout() {
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('userName');
            localStorage.removeItem('userEmail');
            window.location.href = 'login.html';
        }
    </script>
</body>
</html>
```

## 🔧 Código Arduino Optimizado para Frutos Secos

```cpp
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <DHT.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"

#define WIFI_SSID "HUAWEI123"
#define WIFI_PASSWORD "Casa12345"

#define API_KEY "AIzaSyAmIVNKvQWuiAih8F_HJZ9GivYQtk3UmEc"
#define DATABASE_URL "https://monitor-iot-esp32-default-rtdb.firebaseio.com"

#define DHTPIN 13
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// Rangos para frutos secos
#define TEMP_MIN 10.0
#define TEMP_MAX 20.0
#define HUM_MIN 50.0
#define HUM_MAX 65.0

// LED para alertas (opcional)
#define LED_RED 25
#define LED_GREEN 26

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
bool signupOK = false;

void setupLEDs() {
  pinMode(LED_RED, OUTPUT);
  pinMode(LED_GREEN, OUTPUT);
  digitalWrite(LED_RED, LOW);
  digitalWrite(LED_GREEN, LOW);
}

void updateAlertLEDs(float temp, float hum) {
  // Verificar si los valores están en rango crítico
  bool critical = (temp > TEMP_MAX || temp < TEMP_MIN || 
                  hum > HUM_MAX || hum < HUM_MIN);
  
  if (critical) {
    digitalWrite(LED_RED, HIGH);
    digitalWrite(LED_GREEN, LOW);
    Serial.println("⚠️ ALERTA: Condiciones críticas para frutos secos!");
  } else {
    digitalWrite(LED_RED, LOW);
    digitalWrite(LED_GREEN, HIGH);
  }
}

void conectarWiFi() {
  WiFi.disconnect(true);
  delay(1000);
  WiFi.mode(WIFI_STA);
  delay(100);
  
  Serial.print("Conectando a WiFi");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  
  int intentos = 0;
  while (WiFi.status() != WL_CONNECTED && intentos < 60) {
    delay(500);
    Serial.print(".");
    intentos++;
  }
  
  if(WiFi.status() == WL_CONNECTED) {
    Serial.println(" Conectado!");
    Serial.print("IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println(" Fallo!");
    ESP.restart();
  }
}

void setup() {
  Serial.begin(115200);
  delay(3000);
  
  Serial.println("\n\nSistema de Monitoreo para Frutos Secos");
  Serial.println("=====================================");
  
  // Inicializar LEDs
  setupLEDs();
  
  // Inicializar DHT
  Serial.println("Iniciando sensor DHT11...");
  dht.begin();
  
  // Conectar WiFi
  conectarWiFi();
  
  // Configurar Firebase
  delay(2000);
  Serial.println("Configurando Firebase...");
  
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  
  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("Firebase OK!");
    signupOK = true;
  }
  
  config.token_status_callback = tokenStatusCallback;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
  
  Serial.println("Sistema listo!");
  Serial.println("\nRangos óptimos para frutos secos:");
  Serial.println("Temperatura: 10-15°C (máx 20°C)");
  Serial.println("Humedad: 50-60% (máx 65%)");
}

void loop() {
  // Verificar WiFi
  if(WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi perdido, reconectando...");
    conectarWiFi();
  }
  
  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 15000 || sendDataPrevMillis == 0)) {
    sendDataPrevMillis = millis();
    
    float t = dht.readTemperature();
    float h = dht.readHumidity();
    
    // Validar lecturas
    if(isnan(t)) {
      Serial.println("Error leyendo temperatura!");
      t = 25.0; // Valor por defecto fuera de rango para alertar
    }
    if(isnan(h)) {
      Serial.println("Error leyendo humedad!");
      h = 70.0; // Valor por defecto fuera de rango para alertar
    }
    
    // Actualizar LEDs de alerta
    updateAlertLEDs(t, h);
    
    // Enviar a Firebase
    if(Firebase.RTDB.setFloat(&fbdo, "sensor/temperature", t)) {
      Serial.print("Temp: ");
      Serial.print(t);
      Serial.print("°C");
      
      // Indicar estado
      if(t >= 10 && t <= 15) {
        Serial.println(" [ÓPTIMO]");
      } else if(t > 15 && t <= 20) {
        Serial.println(" [PRECAUCIÓN]");
      } else {
        Serial.println(" [CRÍTICO!]");
      }
    }
    
    if(Firebase.RTDB.setFloat(&fbdo, "sensor/humidity", h)) {
      Serial.print("Humedad: ");
      Serial.print(h);
      Serial.print("%");
      
      // Indicar estado
      if(h >= 50 && h <= 60) {
        Serial.println(" [ÓPTIMO]");
      } else if(h > 60 && h <= 65) {
        Serial.println(" [PRECAUCIÓN]");
      } else {
        Serial.println(" [CRÍTICO!]");
      }
    }
    
    // Timestamp
    Firebase.RTDB.setInt(&fbdo, "sensor/timestamp", millis());
    
    // Línea separadora
    Serial.println("------------------------------");
  }
}
```

## 📱 Instrucciones de Implementación

### 1. **Crear los archivos HTML**:
   - `login.html` - Sistema de autenticación
   - `dashboard.html` - Panel principal
   - `monitor.html` - Monitoreo en tiempo real

### 2. **Configurar el ESP32**:
   - Usar el código Arduino optimizado
   - Conectar DHT11 al pin 13
   - Opcionalmente conectar LEDs a pines 25 y 26

### 3. **Desplegar la aplicación web**:
   - Subir los archivos HTML a un servidor web
   - O abrir localmente en el navegador
   - Configurar las credenciales de Firebase

### 4. **Personalización**:
   - Ajustar los rangos según el tipo específico de frutos secos
   - Modificar los colores y estilos según preferencias
   - Añadir más sensores si es necesario

## 🚀 Características del Sistema

1. **Autenticación completa** con registro y login
2. **Panel simplificado** con solo la opción de monitoreo
3. **Alertas visuales** según rangos específicos para frutos secos
4. **Indicadores de estado** en tiempo real
5. **Diseño profesional** y responsive
6. **Código Arduino optimizado** con alertas LED

## 📊 Beneficios para el Almacenamiento de Frutos Secos

- **Prevención de moho**: Control estricto de humedad
- **Conservación de aceites**: Temperatura controlada
- **Alertas tempranas**: Acción rápida ante cambios
- **Registro histórico**: Para análisis de tendencias
- **Acceso remoto**: Monitoreo desde cualquier lugar

Este sistema garantiza las condiciones óptimas para mantener la calidad y frescura de los frutos secos durante su almacenamiento.