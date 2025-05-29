<template>
  <div class="uploader-container">
    <el-upload
      class="image-uploader"
      drag
      action="#"
      :auto-upload="false"
      :show-file-list="false"
      :on-change="handleFileChange"
      accept="image/*"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        将图片拖到此处，或<em>点击上传</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          支持 jpg、png、webp、gif 等格式图片
        </div>
      </template>
    </el-upload>
  </div>
</template>

<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
import { useImageStore } from '../stores/image'

const imageStore = useImageStore()

const handleFileChange = (file) => {
  if (file) {
    // 创建图片预览
    const reader = new FileReader()
    reader.onload = (e) => {
      imageStore.setOriginalImage({
        file: file.raw,
        url: e.target.result,
        name: file.name,
        size: file.size
      })
    }
    reader.readAsDataURL(file.raw)
  }
}
</script>

<style lang="scss" scoped>
.uploader-container {
  margin-bottom: 2rem;
}

.image-uploader {
  :deep(.el-upload) {
    width: 100%;
  }

  :deep(.el-upload-dragger) {
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.el-upload__tip {
  text-align: center;
  color: #909399;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}
</style> 