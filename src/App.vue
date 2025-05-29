<template>
  <div class="app-container">
    <!-- 顶部导航栏 -->
    <header class="header">
      <h1>图片处理工具</h1>
    </header>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <div class="tool-container">
        <!-- 图片上传组件 -->
        <ImageUploader />
        
        <!-- 图片处理选项 -->
        <div class="processing-options">
          <el-tabs v-model="activeTab">
            <el-tab-pane label="压缩" name="compress">
              <ImageCompressor />
            </el-tab-pane>
            <el-tab-pane label="格式转换" name="convert">
              <ImageConverter />
            </el-tab-pane>
            <el-tab-pane label="添加水印" name="watermark">
              <WatermarkAdder />
            </el-tab-pane>
          </el-tabs>
        </div>

        <!-- 预览区域 -->
        <ImagePreview />

        <!-- 历史记录 -->
        <HistoryList />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ImageUploader from './components/ImageUploader.vue'
import ImageCompressor from './components/ImageCompressor.vue'
import ImageConverter from './components/ImageConverter.vue'
import WatermarkAdder from './components/WatermarkAdder.vue'
import ImagePreview from './components/ImagePreview.vue'
import HistoryList from './components/HistoryList.vue'

const activeTab = ref('compress')
</script>

<style lang="scss">
.app-container {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.header {
  background-color: #fff;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h1 {
    margin: 0;
    color: #409eff;
    font-size: 1.5rem;
  }
}

.main-content {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.tool-container {
  background-color: #fff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.processing-options {
  margin: 2rem 0;
}
</style> 