# Sistema de Monitoreo IoT con Alertas Mejoradas para Frutos Secos

## 📋 Descripción del Sistema Actualizado

Sistema completo de monitoreo de temperatura y humedad con **alertas visuales detalladas** que informan al usuario sobre las condiciones actuales y los rangos correctos para el almacenamiento óptimo de frutos secos.

## 🚨 Sistema de Alertas Mejorado

### Tipos de Alertas:
1. **Alertas de Temperatura**
   - Alta temperatura (>20°C): Riesgo de oxidación y rancidez
   - Baja temperatura (<10°C): Riesgo de condensación
   - Mensajes específicos con recomendaciones

2. **Alertas de Humedad**
   - Alta humedad (>65%): Riesgo de moho y hongos
   - Baja humedad (<50%): Resecamiento del producto
   - Indicaciones del rango correcto

## 💻 Implementación del Sistema Completo

### 1. Página de Login Actualizada (login.html)

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

### 2. Dashboard con Indicador de Alertas (dashboard.html)

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
        
        /* Indicador de alertas en el menú */
        .alert-badge {
            position: absolute;
            right: 2rem;
            background: #ef4444;
            color: white;
            font-size: 0.75rem;
            padding: 0.2rem 0.5rem;
            border-radius: 10px;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
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
        
        /* Alert Summary */
        .alert-summary {
            background: #fee2e2;
            border: 2px solid #fecaca;
            color: #991b1b;
            padding: 1.5rem;
            border-radius: 12px;
            margin-bottom: 2rem;
            display: none;
        }
        
        .alert-summary.active {
            display: block;
            animation: slideIn 0.3s ease-out;
        }
        
        @keyframes slideIn {
            from {
                transform: translateY(-20px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        .alert-summary h3 {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
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
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
            margin: 0 auto 1.5rem;
        }
        
        .monitor-icon.normal {
            background: #fff3e0;
            color: #f57c00;
        }
        
        .monitor-icon.alert {
            background: #fee2e2;
            color: #dc2626;
            animation: pulse 2s infinite;
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
            border-radius: 20px;
            font-size: 0.9rem;
        }
        
        .monitor-status.normal {
            background: #dcfce7;
            color: #16a34a;
        }
        
        .monitor-status.alert {
            background: #fee2e2;
            color: #dc2626;
        }
        
        .status-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            animation: pulse 2s infinite;
        }
        
        .status-dot.normal {
            background: #16a34a;
        }
        
        .status-dot.alert {
            background: #dc2626;
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
                <span class="alert-badge" id="alertBadge" style="display: none;">!</span>
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
        
        <!-- Alert Summary -->
        <div class="alert-summary" id="alertSummary">
            <h3>⚠️ Alertas Activas</h3>
            <p id="alertText">Verificando condiciones del almacén...</p>
        </div>
        
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
            <div class="monitor-icon normal" id="monitorIcon">📊</div>
            <h3 class="monitor-title">Monitoreo en Tiempo Real</h3>
            <p class="monitor-description">
                Visualiza temperatura y humedad actual de tu almacén
            </p>
            <span class="monitor-status normal" id="monitorStatus">
                <span class="status-dot normal" id="statusDot"></span>
                <span id="statusText">1 dispositivo activo</span>
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
    
    <!-- Firebase SDK -->
    <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-database-compat.js"></script>
    
    <script>
        // Verificar autenticación
        if (!localStorage.getItem('isAuthenticated')) {
            window.location.href = 'login.html';
        }
        
        // Mostrar nombre de usuario
        const userName = localStorage.getItem('userName') || 'Usuario';
        document.getElementById('userName').textContent = userName;
        
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
        
        // Monitorear alertas en tiempo real
        let hasAlerts = false;
        
        function checkAlerts() {
            const tempRef = database.ref('sensor/temperature');
            const humRef = database.ref('sensor/humidity');
            
            Promise.all([
                tempRef.once('value'),
                humRef.once('value')
            ]).then(([tempSnapshot, humSnapshot]) => {
                const temp = tempSnapshot.val();
                const hum = humSnapshot.val();
                
                if (temp !== null && hum !== null) {
                    const alerts = [];
                    
                    // Verificar temperatura
                    if (temp > 20) {
                        alerts.push('Temperatura muy alta: ' + temp.toFixed(1) + '°C (máximo: 20°C)');
                    } else if (temp < 10) {
                        alerts.push('Temperatura muy baja: ' + temp.toFixed(1) + '°C (mínimo: 10°C)');
                    }
                    
                    // Verificar humedad
                    if (hum > 65) {
                        alerts.push('Humedad muy alta: ' + Math.round(hum) + '% (máximo: 65%)');
                    } else if (hum < 50) {
                        alerts.push('Humedad muy baja: ' + Math.round(hum) + '% (mínimo: 50%)');
                    }
                    
                    // Actualizar UI
                    if (alerts.length > 0) {
                        hasAlerts = true;
                        document.getElementById('alertSummary').classList.add('active');
                        document.getElementById('alertText').innerHTML = alerts.join('<br>');
                        document.getElementById('alertBadge').style.display = 'inline-block';
                        document.getElementById('monitorIcon').className = 'monitor-icon alert';
                        document.getElementById('monitorStatus').className = 'monitor-status alert';
                        document.getElementById('statusDot').className = 'status-dot alert';
                        document.getElementById('statusText').textContent = 'Alertas activas';
                    } else {
                        hasAlerts = false;
                        document.getElementById('alertSummary').classList.remove('active');
                        document.getElementById('alertBadge').style.display = 'none';
                        document.getElementById('monitorIcon').className = 'monitor-icon normal';
                        document.getElementById('monitorStatus').className = 'monitor-status normal';
                        document.getElementById('statusDot').className = 'status-dot normal';
                        document.getElementById('statusText').textContent = '1 dispositivo activo';
                    }
                }
            });
        }
        
        // Verificar alertas al cargar y cada 10 segundos
        checkAlerts();
        setInterval(checkAlerts, 10000);
        
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

### 3. Página de Monitoreo con Alertas Detalladas (monitor.html)

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
        
        /* Alert Banner */
        .alert-banner {
            background: #fee2e2;
            border: 2px solid #fecaca;
            color: #991b1b;
            padding: 1.5rem;
            border-radius: 12px;
            margin-bottom: 2rem;
            display: none;
            animation: slideIn 0.3s ease-out;
        }
        
        .alert-banner.active {
            display: block;
        }
        
        .alert-banner h3 {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
            font-size: 1.2rem;
        }
        
        .alert-list {
            list-style: none;
            padding: 0;
        }
        
        .alert-item {
            background: white;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 0.75rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            border-left: 4px solid #dc2626;
        }
        
        .alert-icon {
            font-size: 1.5rem;
        }
        
        .alert-content {
            flex: 1;
        }
        
        .alert-title {
            font-weight: 600;
            margin-bottom: 0.25rem;
        }
        
        .alert-description {
            font-size: 0.9rem;
            color: #7f1d1d;
        }
        
        .alert-recommendation {
            font-size: 0.85rem;
            color: #991b1b;
            margin-top: 0.25rem;
            font-style: italic;
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
            margin-bottom: 0.5rem;
        }
        
        .sensor-range {
            font-size: 0.85rem;
            opacity: 0.9;
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
        
        @keyframes slideIn {
            from {
                transform: translateY(-20px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
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
        
        <!-- Alert Banner -->
        <div class="alert-banner" id="alertBanner">
            <h3>⚠️ Condiciones Fuera de Rango</h3>
            <ul class="alert-list" id="alertList">
                <!-- Las alertas se insertarán dinámicamente aquí -->
            </ul>
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
                        <div class="sensor-range" id="tempRange">Rango ideal: 10-15°C</div>
                    </div>
                    
                    <!-- Tarjeta de Humedad -->
                    <div class="sensor-card" id="humCard">
                        <div class="sensor-icon">💧</div>
                        <div class="sensor-value" id="humidity">--</div>
                        <div class="sensor-label">Humedad %</div>
                        <div class="sensor-status" id="humStatus">--</div>
                        <div class="sensor-range" id="humRange">Rango ideal: 50-60%</div>
                    </div>
                </div>
                
                <!-- Estados y Alertas -->
                <div class="status-container">
                    <div id="connectionStatus" class="status-card">
                        Verificando conexión...
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
        let currentTemp = null;
        let currentHum = null;
        
        // Funciones de evaluación y alertas
        function evaluateTemperature(temp) {
            const tempCard = document.getElementById('tempCard');
            const tempStatus = document.getElementById('tempStatus');
            const alerts = [];
            
            if (temp >= 10 && temp <= 15) {
                tempCard.className = 'sensor-card temp-optimal';
                tempStatus.textContent = '🟢 Óptimo';
                return { state: 'optimal', alerts: [] };
            } else if (temp > 15 && temp <= 20) {
                tempCard.className = 'sensor-card temp-warning';
                tempStatus.textContent = '🟡 Precaución';
                alerts.push({
                    icon: '🌡️',
                    title: 'Temperatura elevada: ' + temp.toFixed(1) + '°C',
                    description: 'La temperatura está por encima del rango óptimo (10-15°C)',
                    recommendation: 'Considere aumentar la ventilación o reducir la temperatura del almacén'
                });
                return { state: 'warning', alerts };
            } else if (temp > 20) {
                tempCard.className = 'sensor-card temp-critical';
                tempStatus.textContent = '🔴 Crítico';
                alerts.push({
                    icon: '🔥',
                    title: 'Temperatura muy alta: ' + temp.toFixed(1) + '°C',
                    description: 'Supera el límite máximo de 20°C. Riesgo de oxidación y rancidez',
                    recommendation: 'ACCIÓN INMEDIATA: Active el sistema de enfriamiento. Rango correcto: 10-15°C'
                });
                return { state: 'critical', alerts };
            } else {
                tempCard.className = 'sensor-card temp-critical';
                tempStatus.textContent = '🔴 Crítico';
                alerts.push({
                    icon: '❄️',
                    title: 'Temperatura muy baja: ' + temp.toFixed(1) + '°C',
                    description: 'Por debajo del límite mínimo de 10°C. Riesgo de condensación',
                    recommendation: 'ACCIÓN INMEDIATA: Aumente la temperatura. Rango correcto: 10-15°C'
                });
                return { state: 'critical', alerts };
            }
        }
        
        function evaluateHumidity(hum) {
            const humCard = document.getElementById('humCard');
            const humStatus = document.getElementById('humStatus');
            const alerts = [];
            
            if (hum >= 50 && hum <= 60) {
                humCard.className = 'sensor-card hum-optimal';
                humStatus.textContent = '🟢 Óptimo';
                return { state: 'optimal', alerts: [] };
            } else if (hum > 60 && hum <= 65) {
                humCard.className = 'sensor-card hum-warning';
                humStatus.textContent = '🟡 Precaución';
                alerts.push({
                    icon: '💧',
                    title: 'Humedad elevada: ' + Math.round(hum) + '%',
                    description: 'La humedad está por encima del rango óptimo (50-60%)',
                    recommendation: 'Active deshumidificadores para evitar formación de moho'
                });
                return { state: 'warning', alerts };
            } else if (hum > 65) {
                humCard.className = 'sensor-card hum-critical';
                humStatus.textContent = '🔴 Crítico';
                alerts.push({
                    icon: '💦',
                    title: 'Humedad muy alta: ' + Math.round(hum) + '%',
                    description: 'Supera el límite máximo de 65%. Alto riesgo de moho y hongos',
                    recommendation: 'ACCIÓN INMEDIATA: Active todos los deshumidificadores. Rango correcto: 50-60%'
                });
                return { state: 'critical', alerts };
            } else {
                humCard.className = 'sensor-card hum-critical';
                humStatus.textContent = '🔴 Crítico';
                alerts.push({
                    icon: '🏜️',
                    title: 'Humedad muy baja: ' + Math.round(hum) + '%',
                    description: 'Por debajo del límite mínimo de 50%. Los frutos se resecarán',
                    recommendation: 'ACCIÓN INMEDIATA: Active humidificadores. Rango correcto: 50-60%'
                });
                return { state: 'critical', alerts };
            }
        }
        
        function updateAlertBanner(tempAlerts, humAlerts) {
            const alertBanner = document.getElementById('alertBanner');
            const alertList = document.getElementById('alertList');
            const allAlerts = [...tempAlerts, ...humAlerts];
            
            if (allAlerts.length > 0) {
                alertBanner.classList.add('active');
                alertList.innerHTML = allAlerts.map(alert => `
                    <li class="alert-item">
                        <div class="alert-icon">${alert.icon}</div>
                        <div class="alert-content">
                            <div class="alert-title">${alert.title}</div>
                            <div class="alert-description">${alert.description}</div>
                            <div class="alert-recommendation">${alert.recommendation}</div>
                        </div>
                    </li>
                `).join('');
            } else {
                alertBanner.classList.remove('active');
            }
        }
        
        // Escuchar cambios en temperatura
        tempRef.on('value', (snapshot) => {
            const temp = snapshot.val();
            if (temp !== null) {
                currentTemp = temp;
                document.getElementById('temperature').textContent = temp.toFixed(1);
                document.getElementById('loading').style.display = 'none';
                document.getElementById('content').style.display = 'block';
                
                const tempResult = evaluateTemperature(temp);
                if (currentHum !== null) {
                    const humResult = evaluateHumidity(currentHum);
                    updateAlertBanner(tempResult.alerts, humResult.alerts);
                }
            }
        });
        
        // Escuchar cambios en humedad
        humRef.on('value', (snapshot) => {
            const hum = snapshot.val();
            if (hum !== null) {
                currentHum = hum;
                document.getElementById('humidity').textContent = Math.round(hum);
                
                const humResult = evaluateHumidity(hum);
                if (currentTemp !== null) {
                    const tempResult = evaluateTemperature(currentTemp);
                    updateAlertBanner(tempResult.alerts, humResult.alerts);
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

## 📱 Características del Sistema de Alertas Mejorado

### 1. **Alertas Visuales Detalladas**
- Mensajes específicos para cada condición
- Iconos descriptivos (🔥 calor, ❄️ frío, 💦 humedad alta, 🏜️ sequedad)
- Colores según severidad (rojo crítico, amarillo precaución, verde óptimo)

### 2. **Información de Rangos Correctos**
- Muestra el valor actual vs. el rango ideal
- Recomendaciones específicas de acción
- Indicación clara de los límites seguros

### 3. **Alertas en el Dashboard**
- Indicador visual en el menú cuando hay alertas
- Resumen de alertas activas
- Cambio de color en la tarjeta de monitoreo

### 4. **Mensajes de Acción**
Cada alerta incluye:
- **Título**: Descripción del problema
- **Descripción**: Explicación del riesgo
- **Recomendación**: Acción específica a tomar
- **Rango correcto**: Valores ideales a mantener

## 🚨 Ejemplos de Mensajes de Alerta

### Temperatura Alta (>20°C)
```
🔥 Temperatura muy alta: 25.3°C
Supera el límite máximo de 20°C. Riesgo de oxidación y rancidez
ACCIÓN INMEDIATA: Active el sistema de enfriamiento. Rango correcto: 10-15°C
```

### Temperatura Baja (<10°C)
```
❄️ Temperatura muy baja: 7.2°C
Por debajo del límite mínimo de 10°C. Riesgo de condensación
ACCIÓN INMEDIATA: Aumente la temperatura. Rango correcto: 10-15°C
```

### Humedad Alta (>65%)
```
💦 Humedad muy alta: 72%
Supera el límite máximo de 65%. Alto riesgo de moho y hongos
ACCIÓN INMEDIATA: Active todos los deshumidificadores. Rango correcto: 50-60%
```

### Humedad Baja (<50%)
```
🏜️ Humedad muy baja: 42%
Por debajo del límite mínimo de 50%. Los frutos se resecarán
ACCIÓN INMEDIATA: Active humidificadores. Rango correcto: 50-60%
```

## 🔧 Código Arduino Actualizado con Sistema de Alertas

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
#define TEMP_OPTIMAL_MIN 10.0
#define TEMP_OPTIMAL_MAX 15.0
#define TEMP_WARNING_MAX 20.0
#define TEMP_MAX 20.0

#define HUM_MIN 50.0
#define HUM_OPTIMAL_MIN 50.0
#define HUM_OPTIMAL_MAX 60.0
#define HUM_WARNING_MAX 65.0
#define HUM_MAX 65.0

// LEDs para alertas
#define LED_RED 25
#define LED_YELLOW 27
#define LED_GREEN 26

// Buzzer para alertas críticas
#define BUZZER_PIN 32

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
bool signupOK = false;
bool criticalAlert = false;

void setupAlertSystem() {
  pinMode(LED_RED, OUTPUT);
  pinMode(LED_YELLOW, OUTPUT);
  pinMode(LED_GREEN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  
  // Test inicial
  digitalWrite(LED_RED, HIGH);
  delay(200);
  digitalWrite(LED_RED, LOW);
  digitalWrite(LED_YELLOW, HIGH);
  delay(200);
  digitalWrite(LED_YELLOW, LOW);
  digitalWrite(LED_GREEN, HIGH);
  delay(200);
  digitalWrite(LED_GREEN, LOW);
}

void updateAlerts(float temp, float hum) {
  String tempStatus = "";
  String humStatus = "";
  int alertLevel = 0; // 0=optimal, 1=warning, 2=critical
  
  // Evaluar temperatura
  if (temp >= TEMP_OPTIMAL_MIN && temp <= TEMP_OPTIMAL_MAX) {
    tempStatus = "ÓPTIMO";
  } else if (temp > TEMP_OPTIMAL_MAX && temp <= TEMP_WARNING_MAX) {
    tempStatus = "PRECAUCIÓN";
    alertLevel = max(alertLevel, 1);
  } else if (temp > TEMP_MAX) {
    tempStatus = "CRÍTICO - MUY ALTA";
    alertLevel = 2;
    Serial.println("⚠️ ALERTA: Temperatura muy alta!");
    Serial.print("   Valor actual: ");
    Serial.print(temp);
    Serial.println("°C");
    Serial.println("   Rango correcto: 10-15°C (máx 20°C)");
    Serial.println("   Acción: Active sistema de enfriamiento");
  } else if (temp < TEMP_MIN) {
    tempStatus = "CRÍTICO - MUY BAJA";
    alertLevel = 2;
    Serial.println("⚠️ ALERTA: Temperatura muy baja!");
    Serial.print("   Valor actual: ");
    Serial.print(temp);
    Serial.println("°C");
    Serial.println("   Rango correcto: 10-15°C (mín 10°C)");
    Serial.println("   Acción: Aumente la temperatura");
  }
  
  // Evaluar humedad
  if (hum >= HUM_OPTIMAL_MIN && hum <= HUM_OPTIMAL_MAX) {
    humStatus = "ÓPTIMO";
  } else if (hum > HUM_OPTIMAL_MAX && hum <= HUM_WARNING_MAX) {
    humStatus = "PRECAUCIÓN";
    alertLevel = max(alertLevel, 1);
  } else if (hum > HUM_MAX) {
    humStatus = "CRÍTICO - MUY ALTA";
    alertLevel = 2;
    Serial.println("⚠️ ALERTA: Humedad muy alta!");
    Serial.print("   Valor actual: ");
    Serial.print(hum);
    Serial.println("%");
    Serial.println("   Rango correcto: 50-60% (máx 65%)");
    Serial.println("   Acción: Active deshumidificadores");
  } else if (hum < HUM_MIN) {
    humStatus = "CRÍTICO - MUY BAJA";
    alertLevel = 2;
    Serial.println("⚠️ ALERTA: Humedad muy baja!");
    Serial.print("   Valor actual: ");
    Serial.print(hum);
    Serial.println("%");
    Serial.println("   Rango correcto: 50-60% (mín 50%)");
    Serial.println("   Acción: Active humidificadores");
  }
  
  // Actualizar LEDs según nivel de alerta
  digitalWrite(LED_GREEN, LOW);
  digitalWrite(LED_YELLOW, LOW);
  digitalWrite(LED_RED, LOW);
  
  switch(alertLevel) {
    case 0: // Óptimo
      digitalWrite(LED_GREEN, HIGH);
      criticalAlert = false;
      break;
    case 1: // Precaución
      digitalWrite(LED_YELLOW, HIGH);
      criticalAlert = false;
      break;
    case 2: // Crítico
      digitalWrite(LED_RED, HIGH);
      if (!criticalAlert) {
        // Sonar buzzer solo cuando cambia a crítico
        for(int i = 0; i < 3; i++) {
          digitalWrite(BUZZER_PIN, HIGH);
          delay(200);
          digitalWrite(BUZZER_PIN, LOW);
          delay(200);
        }
        criticalAlert = true;
      }
      break;
  }
  
  // Enviar estado de alerta a Firebase
  if(Firebase.ready() && signupOK) {
    Firebase.RTDB.setString(&fbdo, "sensor/tempStatus", tempStatus);
    Firebase.RTDB.setString(&fbdo, "sensor/humStatus", humStatus);
    Firebase.RTDB.setInt(&fbdo, "sensor/alertLevel", alertLevel);
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
  
  Serial.println("\n\n===========================================");
  Serial.println("Sistema de Monitoreo para Frutos Secos v2.0");
  Serial.println("===========================================");
  
  // Inicializar sistema de alertas
  setupAlertSystem();
  
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
  
  Serial.println("\nSistema listo!");
  Serial.println("\nRangos configurados para frutos secos:");
  Serial.println("╔════════════════════════════════════════╗");
  Serial.println("║ TEMPERATURA:                           ║");
  Serial.println("║   🟢 Óptimo: 10-15°C                  ║");
  Serial.println("║   🟡 Precaución: 15-20°C              ║");
  Serial.println("║   🔴 Crítico: <10°C o >20°C           ║");
  Serial.println("╠════════════════════════════════════════╣");
  Serial.println("║ HUMEDAD:                               ║");
  Serial.println("║   🟢 Óptimo: 50-60%                   ║");
  Serial.println("║   🟡 Precaución: 60-65%               ║");
  Serial.println("║   🔴 Crítico: <50% o >65%             ║");
  Serial.println("╚════════════════════════════════════════╝");
  Serial.println();
}

void loop() {
  // Verificar WiFi
  if(WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi perdido, reconectando...");
    digitalWrite(LED_RED, HIGH);
    digitalWrite(LED_YELLOW, HIGH);
    digitalWrite(LED_GREEN, LOW);
    conectarWiFi();
  }
  
  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 15000 || sendDataPrevMillis == 0)) {
    sendDataPrevMillis = millis();
    
    float t = dht.readTemperature();
    float h = dht.readHumidity();
    
    // Validar lecturas
    if(isnan(t)) {
      Serial.println("❌ Error leyendo temperatura!");
      t = 25.0; // Valor por defecto fuera de rango
    }
    if(isnan(h)) {
      Serial.println("❌ Error leyendo humedad!");
      h = 70.0; // Valor por defecto fuera de rango
    }
    
    Serial.println("\n--- Lectura Actual ---");
    
    // Enviar a Firebase
    if(Firebase.RTDB.setFloat(&fbdo, "sensor/temperature", t)) {
      Serial.print("🌡️ Temperatura: ");
      Serial.print(t);
      Serial.print("°C");
    }
    
    if(Firebase.RTDB.setFloat(&fbdo, "sensor/humidity", h)) {
      Serial.print("   💧 Humedad: ");
      Serial.print(h);
      Serial.print("%");
    }
    
    Serial.println();
    
    // Actualizar sistema de alertas
    updateAlerts(t, h);
    
    // Timestamp
    Firebase.RTDB.setInt(&fbdo, "sensor/timestamp", millis());
    
    Serial.println("------------------------");
  }
}
```

## 📊 Beneficios del Sistema de Alertas Mejorado

1. **Prevención Proactiva**: Alertas tempranas evitan daños a los productos
2. **Acciones Específicas**: Recomendaciones claras para cada situación
3. **Visibilidad Total**: Alertas visibles en dashboard y página de monitoreo
4. **Rangos Claros**: Siempre visible el rango correcto para cada parámetro
5. **Sistema Escalable**: Fácil agregar más sensores o condiciones

Este sistema garantiza la máxima protección para los frutos secos almacenados, con alertas claras y accionables que permiten mantener las condiciones óptimas en todo momento.