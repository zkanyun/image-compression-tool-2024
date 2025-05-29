import { defineStore } from 'pinia'

export const useImageStore = defineStore('image', {
  state: () => ({
    originalImage: null,
    processedImage: null,
    processingOptions: {
      quality: 80,
      format: 'jpeg',
      watermark: {
        text: '',
        position: 'bottom-right',
        opacity: 0.5
      }
    },
    history: []
  }),

  actions: {
    setOriginalImage(image) {
      this.originalImage = image
    },

    setProcessedImage(image) {
      this.processedImage = image
      // 添加到历史记录
      this.addToHistory(image)
    },

    setProcessingOptions(options) {
      this.processingOptions = {
        ...this.processingOptions,
        ...options
      }
    },

    addToHistory(image) {
      this.history.unshift({
        ...image,
        timestamp: new Date().toISOString()
      })
      // 只保留最近10条记录
      if (this.history.length > 10) {
        this.history.pop()
      }
    },

    clearHistory() {
      this.history = []
    }
  }
}) 