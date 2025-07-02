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

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
bool signupOK = false;

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
  delay(3000);  // Delay más largo
  
  Serial.println("\n\nIniciando ESP32...");
  
  // Inicializar DHT pero después del WiFi
  Serial.println("Iniciando sensores...");
  dht.begin();
  
  // Conectar WiFi ANTES que nada más
  conectarWiFi();
  
  // Solo después de WiFi, configurar Firebase
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
    
    if(isnan(t)) t = 25.0;
    if(isnan(h)) h = 60.0;
    
    if(Firebase.RTDB.setFloat(&fbdo, "sensor/temperature", t)) {
      Serial.print("Temp: ");
      Serial.print(t);
      Serial.println("°C enviada");
    }
    
    if(Firebase.RTDB.setFloat(&fbdo, "sensor/humidity", h)) {
      Serial.print("Humedad: ");
      Serial.print(h);
      Serial.println("% enviada");
    }
    
    Firebase.RTDB.setInt(&fbdo, "sensor/timestamp", millis());
  }
}






este es el enlace del index que es el sitio web estatitco que esta consumineto literalmente la implementacion que se hizo del ESP32y el sensor de temperatura y humedad DTH11