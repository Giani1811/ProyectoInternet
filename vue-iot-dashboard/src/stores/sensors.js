import { defineStore } from 'pinia'
import { sensorService } from '../services/sensors'

export const useSensorsStore = defineStore('sensors', {
  state: () => ({
    temperature: null,
    humidity: null,
    lastUpdate: null,
    isOnline: false,
    temperatureHistory: [],
    humidityHistory: [],
    isLoading: true
  }),

  getters: {
    temperatureStatus: (state) => {
      if (state.temperature === null) return 'unknown'
      
      if (state.temperature >= 10 && state.temperature <= 15) {
        return 'optimal'
      } else if (state.temperature > 15 && state.temperature <= 20) {
        return 'warning'
      } else {
        return 'critical'
      }
    },

    humidityStatus: (state) => {
      if (state.humidity === null) return 'unknown'
      
      if (state.humidity >= 50 && state.humidity <= 60) {
        return 'optimal'
      } else if (state.humidity > 60 && state.humidity <= 65) {
        return 'warning'
      } else {
        return 'critical'
      }
    },

    overallStatus: (state) => {
      const tempStatus = state.temperatureStatus
      const humStatus = state.humidityStatus
      
      if (tempStatus === 'critical' || humStatus === 'critical') {
        return 'critical'
      } else if (tempStatus === 'warning' || humStatus === 'warning') {
        return 'warning'
      } else if (tempStatus === 'optimal' && humStatus === 'optimal') {
        return 'optimal'
      } else {
        return 'unknown'
      }
    },

    statusMessage: (state) => {
      const status = state.overallStatus
      
      switch (status) {
        case 'optimal':
          return 'Condiciones óptimas para almacenamiento'
        case 'warning':
          return 'Condiciones en precaución - Monitorear'
        case 'critical':
          return '¡Atención! Condiciones críticas detectadas'
        default:
          return 'Conectando con sensores...'
      }
    }
  },

  actions: {
    // Inicializar conexión con Firebase
    async initializeSensors() {
      try {
        this.isLoading = true
        await sensorService.initialize()
        this.subscribeToSensorData()
      } catch (error) {
        console.error('Error inicializando sensores:', error)
        this.isLoading = false
      }
    },

    // Suscribirse a datos en tiempo real
    subscribeToSensorData() {
      sensorService.subscribeToSensorData((data) => {
        if (data.temperature !== undefined) {
          this.temperature = data.temperature
          this.addToHistory('temperature', data.temperature)
        }
        
        if (data.humidity !== undefined) {
          this.humidity = data.humidity
          this.addToHistory('humidity', data.humidity)
        }
        
        if (data.timestamp && data.timestamp > 0) {
          // Asegurar que el timestamp esté en milisegundos
          const timestampMs = data.timestamp < 10000000000 ? data.timestamp * 1000 : data.timestamp
          this.lastUpdate = new Date(timestampMs)
          this.updateConnectionStatus()
        }
        
        this.isLoading = false
      })
    },

    // Agregar datos al historial
    addToHistory(type, value) {
      // Usar timestamp del sensor si está disponible, sino usar timestamp actual
      const timestamp = this.lastUpdate || new Date()
      const dataPoint = { timestamp, value }
      
      if (type === 'temperature') {
        this.temperatureHistory.push(dataPoint)
        // Mantener solo las últimas 50 lecturas
        if (this.temperatureHistory.length > 50) {
          this.temperatureHistory.shift()
        }
      } else if (type === 'humidity') {
        this.humidityHistory.push(dataPoint)
        // Mantener solo las últimas 50 lecturas
        if (this.humidityHistory.length > 50) {
          this.humidityHistory.shift()
        }
      }
    },

    // Actualizar estado de conexión
    updateConnectionStatus() {
      if (this.lastUpdate) {
        const now = new Date()
        const diffInSeconds = (now - this.lastUpdate) / 1000
        this.isOnline = diffInSeconds < 30 // Online si datos < 30 segundos
      } else {
        this.isOnline = false
      }
    },

    // Verificar conexión periódicamente
    startConnectionCheck() {
      setInterval(() => {
        this.updateConnectionStatus()
      }, 5000) // Verificar cada 5 segundos
    }
  }
})