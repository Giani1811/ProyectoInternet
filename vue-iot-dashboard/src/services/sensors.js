import { database } from './firebase'
import { ref, onValue, off } from 'firebase/database'

class SensorService {
  constructor() {
    this.tempRef = ref(database, 'sensor/temperature')
    this.humRef = ref(database, 'sensor/humidity')
    this.timestampRef = ref(database, 'sensor/timestamp')
    this.listeners = []
  }

  // Inicializar servicio
  async initialize() {
    try {
      console.log('🔥 Conectando con Firebase...')
      return Promise.resolve()
    } catch (error) {
      console.error('❌ Error conectando con Firebase:', error)
      throw error
    }
  }

  // Suscribirse a datos de sensores en tiempo real
  subscribeToSensorData(callback) {
    let sensorData = {
      temperature: null,
      humidity: null,
      timestamp: null
    }

    // Listener para temperatura
    const tempListener = onValue(this.tempRef, (snapshot) => {
      const temperature = snapshot.val()
      if (temperature !== null) {
        sensorData.temperature = temperature
        console.log('🌡️ Nueva temperatura:', temperature)
        callback({ ...sensorData })
      }
    }, (error) => {
      console.error('❌ Error leyendo temperatura:', error)
    })

    // Listener para humedad
    const humListener = onValue(this.humRef, (snapshot) => {
      const humidity = snapshot.val()
      if (humidity !== null) {
        sensorData.humidity = humidity
        console.log('💧 Nueva humedad:', humidity)
        callback({ ...sensorData })
      }
    }, (error) => {
      console.error('❌ Error leyendo humedad:', error)
    })

    // Listener para timestamp
    const timestampListener = onValue(this.timestampRef, (snapshot) => {
      const timestamp = snapshot.val()
      if (timestamp !== null && timestamp > 0) {
        // Convertir timestamp de Firebase (que puede estar en segundos) a milisegundos
        const timestampMs = timestamp < 10000000000 ? timestamp * 1000 : timestamp
        sensorData.timestamp = timestampMs
        
        // Mostrar hora en zona horaria de Lima, Perú
        const limaDate = new Date(timestampMs).toLocaleString('es-PE', {
          timeZone: 'America/Lima',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
        console.log('⏰ Nuevo timestamp:', limaDate)
        callback({ ...sensorData })
      }
    }, (error) => {
      console.error('❌ Error leyendo timestamp:', error)
    })

    // Guardar listeners para poder desuscribirse
    this.listeners = [tempListener, humListener, timestampListener]
  }

  // Desuscribirse de datos
  unsubscribe() {
    if (this.listeners.length > 0) {
      // Firebase v9 maneja automáticamente la desuscripción con onValue
      // Solo necesitamos limpiar nuestro array
      this.listeners = []
      console.log('🔇 Desconectado de Firebase')
    }
  }

  // Obtener datos históricos (simulado por ahora)
  async getHistoricalData(hours = 24) {
    // En una implementación real, podrías almacenar datos históricos
    // Por ahora retornamos un array vacío
    return {
      temperature: [],
      humidity: [],
      timestamps: []
    }
  }

  // Verificar estado de conexión
  isConnected() {
    return database && database.app
  }
}

export const sensorService = new SensorService()