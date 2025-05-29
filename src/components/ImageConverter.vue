<template>
  <div class="converter-container">
    <div class="format-selection">
      <span class="label">目标格式：</span>
      <el-select v-model="targetFormat" placeholder="请选择目标格式">
        <el-option label="JPEG" value="jpeg" />
        <el-option label="PNG" value="png" />
        <el-option label="WebP" value="webp" />
        <el-option label="GIF" value="gif" />
      </el-select>
    </div>

    <div class="quality-control" v-if="targetFormat === 'jpeg' || targetFormat === 'webp'">
      <span class="label">质量：</span>
      <el-slider
        v-model="quality"
        :min="1"
        :max="100"
        :step="1"
        show-input
      />
    </div>

    <div class="actions">
      <el-button
        type="primary"
        :disabled="!imageStore.originalImage"
        @click="convertImage"
      >
        开始转换
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useImageStore } from '../stores/image'

const imageStore = useImageStore()
const targetFormat = ref('jpeg')
const quality = ref(80)

const convertImage = async () => {
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
        const newName = imageStore.originalImage.name.replace(/\.[^/.]+$/, '') + '.' + targetFormat.value
        imageStore.setProcessedImage({
          file: blob,
          url: url,
          name: newName,
          size: blob.size
        })
      },
      'image/' + targetFormat.value,
      quality.value / 100
    )
  }
}
</script>

<style lang="scss" scoped>
.converter-container {
  padding: 1rem;
}

.format-selection {
  margin-bottom: 1.5rem;

  .label {
    display: block;
    margin-bottom: 0.5rem;
    color: #606266;
  }
}

.quality-control {
  margin-bottom: 1.5rem;

  .label {
    display: block;
    margin-bottom: 0.5rem;
    color: #606266;
  }
}

.actions {
  margin-top: 1.5rem;
  text-align: center;
}
</style> 