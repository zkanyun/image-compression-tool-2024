<template>
  <div class="preview-container" v-if="imageStore.originalImage">
    <div class="preview-header">
      <h3>图片预览</h3>
    </div>

    <div class="preview-content">
      <div class="original-image">
        <h4>原始图片</h4>
        <div class="image-wrapper">
          <img :src="imageStore.originalImage.url" :alt="imageStore.originalImage.name" />
        </div>
        <div class="image-info">
          <span>{{ imageStore.originalImage.name }}</span>
          <span>{{ formatFileSize(imageStore.originalImage.size) }}</span>
        </div>
      </div>

      <div class="processed-image" v-if="imageStore.processedImage">
        <h4>处理后图片</h4>
        <div class="image-wrapper">
          <img :src="imageStore.processedImage.url" :alt="imageStore.processedImage.name" />
        </div>
        <div class="image-info">
          <span>{{ imageStore.processedImage.name }}</span>
          <span>{{ formatFileSize(imageStore.processedImage.size) }}</span>
        </div>
      </div>
    </div>

    <div class="preview-actions" v-if="imageStore.processedImage">
      <el-button type="primary" @click="downloadImage">
        下载处理后的图片
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { useImageStore } from '../stores/image'

const imageStore = useImageStore()

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const downloadImage = () => {
  if (!imageStore.processedImage) return

  const link = document.createElement('a')
  link.href = imageStore.processedImage.url
  link.download = imageStore.processedImage.name
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<style lang="scss" scoped>
.preview-container {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.preview-header {
  margin-bottom: 1.5rem;
  
  h3 {
    margin: 0;
    color: #303133;
  }
}

.preview-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.original-image,
.processed-image {
  h4 {
    margin: 0 0 1rem 0;
    color: #606266;
  }
}

.image-wrapper {
  width: 100%;
  height: 300px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
}

.image-info {
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;
  color: #909399;
  font-size: 0.9rem;
}

.preview-actions {
  margin-top: 1.5rem;
  text-align: center;
}

@media (max-width: 768px) {
  .preview-content {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style> 