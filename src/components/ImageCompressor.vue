<template>
  <div class="compressor-container">
    <div class="quality-control">
      <span class="label">压缩质量：</span>
      <el-slider
        v-model="quality"
        :min="1"
        :max="100"
        :step="1"
        show-input
        @change="handleQualityChange"
      />
    </div>

    <div class="image-info" v-if="imageStore.originalImage">
      <div class="info-item">
        <span class="label">原始大小：</span>
        <span>{{ formatFileSize(imageStore.originalImage.size) }}</span>
      </div>
      <div class="info-item" v-if="imageStore.processedImage">
        <span class="label">压缩后大小：</span>
        <span>{{ formatFileSize(imageStore.processedImage.size) }}</span>
      </div>
      <div class="info-item" v-if="imageStore.processedImage">
        <span class="label">压缩率：</span>
        <span>{{ calculateCompressionRatio() }}%</span>
      </div>
    </div>

    <div class="actions">
      <el-button
        type="primary"
        :disabled="!imageStore.originalImage"
        @click="compressImage"
      >
        开始压缩
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useImageStore } from '../stores/image'

const imageStore = useImageStore()
const quality = ref(80)

const handleQualityChange = (value) => {
  imageStore.setProcessingOptions({ quality: value })
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const calculateCompressionRatio = () => {
  if (!imageStore.originalImage || !imageStore.processedImage) return 0
  const ratio = ((imageStore.originalImage.size - imageStore.processedImage.size) / imageStore.originalImage.size) * 100
  return ratio.toFixed(2)
}

const compressImage = async () => {
  if (!imageStore.originalImage) return

  const img = new Image()
  img.src = imageStore.originalImage.url

  img.onload = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    canvas.width = img.width
    canvas.height = img.height
    
    ctx.drawImage(img, 0, 0)
    
    canvas.toBlob(
      (blob) => {
        const url = URL.createObjectURL(blob)
        imageStore.setProcessedImage({
          file: blob,
          url: url,
          name: imageStore.originalImage.name,
          size: blob.size
        })
      },
      'image/jpeg',
      quality.value / 100
    )
  }
}
</script>

<style lang="scss" scoped>
.compressor-container {
  padding: 1rem;
}

.quality-control {
  margin-bottom: 1.5rem;

  .label {
    display: block;
    margin-bottom: 0.5rem;
    color: #606266;
  }
}

.image-info {
  margin: 1.5rem 0;
  padding: 1rem;
  background-color: #f5f7fa;
  border-radius: 4px;

  .info-item {
    margin-bottom: 0.5rem;
    
    &:last-child {
      margin-bottom: 0;
    }

    .label {
      color: #606266;
      margin-right: 0.5rem;
    }
  }
}

.actions {
  margin-top: 1.5rem;
  text-align: center;
}
</style> 