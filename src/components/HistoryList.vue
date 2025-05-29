<template>
  <div class="history-container" v-if="imageStore.history.length > 0">
    <div class="history-header">
      <h3>处理历史</h3>
      <el-button type="danger" size="small" @click="clearHistory">
        清空历史
      </el-button>
    </div>

    <div class="history-list">
      <div
        v-for="(item, index) in imageStore.history"
        :key="index"
        class="history-item"
      >
        <div class="history-image">
          <img :src="item.url" :alt="item.name" />
        </div>
        <div class="history-info">
          <div class="info-row">
            <span class="label">文件名：</span>
            <span class="value">{{ item.name }}</span>
          </div>
          <div class="info-row">
            <span class="label">大小：</span>
            <span class="value">{{ formatFileSize(item.size) }}</span>
          </div>
          <div class="info-row">
            <span class="label">处理时间：</span>
            <span class="value">{{ formatDate(item.timestamp) }}</span>
          </div>
        </div>
        <div class="history-actions">
          <el-button type="primary" size="small" @click="downloadImage(item)">
            下载
          </el-button>
        </div>
      </div>
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

const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleString()
}

const downloadImage = (item) => {
  const link = document.createElement('a')
  link.href = item.url
  link.download = item.name
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const clearHistory = () => {
  imageStore.clearHistory()
}
</script>

<style lang="scss" scoped>
.history-container {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h3 {
    margin: 0;
    color: #303133;
  }
}

.history-list {
  display: grid;
  gap: 1rem;
}

.history-item {
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 1rem;
  padding: 1rem;
  background-color: #f5f7fa;
  border-radius: 4px;
  align-items: center;
}

.history-image {
  width: 100px;
  height: 100px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
}

.history-info {
  .info-row {
    margin-bottom: 0.5rem;

    &:last-child {
      margin-bottom: 0;
    }

    .label {
      color: #606266;
      margin-right: 0.5rem;
    }

    .value {
      color: #303133;
    }
  }
}

.history-actions {
  display: flex;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .history-item {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .history-image {
    margin: 0 auto;
  }

  .history-actions {
    justify-content: center;
  }
}
</style> 