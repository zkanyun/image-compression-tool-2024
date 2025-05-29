<template>
  <div class="watermark-container">
    <div class="watermark-type">
      <span class="label">水印类型：</span>
      <el-radio-group v-model="watermarkType">
        <el-radio label="text">文字水印</el-radio>
        <el-radio label="image">图片水印</el-radio>
      </el-radio-group>
    </div>

    <!-- 文字水印设置 -->
    <template v-if="watermarkType === 'text'">
      <div class="watermark-text">
        <span class="label">水印文字：</span>
        <el-input v-model="watermarkText" placeholder="请输入水印文字" />
      </div>

      <div class="watermark-style">
        <div class="style-item">
          <span class="label">字体大小：</span>
          <el-input-number v-model="fontSize" :min="12" :max="72" />
        </div>

        <div class="style-item">
          <span class="label">字体颜色：</span>
          <el-color-picker v-model="fontColor" />
        </div>

        <div class="style-item">
          <span class="label">透明度：</span>
          <el-slider v-model="opacity" :min="0" :max="100" :step="1" show-input />
        </div>
      </div>
    </template>

    <!-- 图片水印设置 -->
    <template v-else>
      <div class="watermark-image">
        <span class="label">水印图片：</span>
        <el-upload
          class="watermark-uploader"
          action="#"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="handleWatermarkImageChange"
          accept="image/*"
        >
          <img v-if="watermarkImageUrl" :src="watermarkImageUrl" class="watermark-preview" />
          <el-icon v-else class="watermark-uploader-icon"><plus /></el-icon>
        </el-upload>
      </div>

      <div class="watermark-style">
        <div class="style-item">
          <span class="label">透明度：</span>
          <el-slider v-model="opacity" :min="0" :max="100" :step="1" show-input />
        </div>
      </div>
    </template>

    <div class="watermark-position">
      <span class="label">水印位置：</span>
      <el-select v-model="position" placeholder="请选择水印位置">
        <el-option label="左上" value="top-left" />
        <el-option label="右上" value="top-right" />
        <el-option label="左下" value="bottom-left" />
        <el-option label="右下" value="bottom-right" />
        <el-option label="居中" value="center" />
      </el-select>
    </div>

    <div class="actions">
      <el-button
        type="primary"
        :disabled="!imageStore.originalImage"
        @click="addWatermark"
      >
        添加水印
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { useImageStore } from '../stores/image'

const imageStore = useImageStore()

// 水印类型
const watermarkType = ref('text')

// 文字水印设置
const watermarkText = ref('')
const fontSize = ref(24)
const fontColor = ref('#000000')

// 图片水印设置
const watermarkImageUrl = ref('')
const watermarkImage = ref(null)

// 通用设置
const opacity = ref(50)
const position = ref('bottom-right')

const handleWatermarkImageChange = (file) => {
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      watermarkImageUrl.value = e.target.result
      watermarkImage.value = file.raw
    }
    reader.readAsDataURL(file.raw)
  }
}

const addWatermark = async () => {
  if (!imageStore.originalImage) return

  const img = new Image()
  img.src = imageStore.originalImage.url

  img.onload = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    canvas.width = img.width
    canvas.height = img.height
    
    // 绘制原始图片
    ctx.drawImage(img, 0, 0)
    
    // 设置透明度
    ctx.globalAlpha = opacity.value / 100

    if (watermarkType.value === 'text') {
      // 设置文字样式
      ctx.font = `${fontSize.value}px Arial`
      ctx.fillStyle = fontColor.value
      
      // 计算文字位置
      const textWidth = ctx.measureText(watermarkText.value).width
      let x, y
      
      switch (position.value) {
        case 'top-left':
          x = 20
          y = fontSize.value + 20
          break
        case 'top-right':
          x = canvas.width - textWidth - 20
          y = fontSize.value + 20
          break
        case 'bottom-left':
          x = 20
          y = canvas.height - 20
          break
        case 'bottom-right':
          x = canvas.width - textWidth - 20
          y = canvas.height - 20
          break
        case 'center':
          x = (canvas.width - textWidth) / 2
          y = canvas.height / 2
          break
      }
      
      // 绘制文字水印
      ctx.fillText(watermarkText.value, x, y)
    } else if (watermarkType.value === 'image' && watermarkImage.value) {
      const watermarkImg = new Image()
      watermarkImg.src = watermarkImageUrl.value
      
      watermarkImg.onload = () => {
        // 计算水印图片位置
        let x, y
        
        switch (position.value) {
          case 'top-left':
            x = 20
            y = 20
            break
          case 'top-right':
            x = canvas.width - watermarkImg.width - 20
            y = 20
            break
          case 'bottom-left':
            x = 20
            y = canvas.height - watermarkImg.height - 20
            break
          case 'bottom-right':
            x = canvas.width - watermarkImg.width - 20
            y = canvas.height - watermarkImg.height - 20
            break
          case 'center':
            x = (canvas.width - watermarkImg.width) / 2
            y = (canvas.height - watermarkImg.height) / 2
            break
        }
        
        // 绘制图片水印
        ctx.drawImage(watermarkImg, x, y)
        
        // 导出处理后的图片
        exportImage(canvas)
      }
    } else {
      // 如果没有水印图片，直接导出
      exportImage(canvas)
    }
  }
}

const exportImage = (canvas) => {
  canvas.toBlob(
    (blob) => {
      const url = URL.createObjectURL(blob)
      const newName = imageStore.originalImage.name.replace(/\.[^/.]+$/, '') + '_watermarked.' + imageStore.originalImage.name.split('.').pop()
      imageStore.setProcessedImage({
        file: blob,
        url: url,
        name: newName,
        size: blob.size
      })
    },
    'image/' + imageStore.originalImage.name.split('.').pop(),
    1
  )
}
</script>

<style lang="scss" scoped>
.watermark-container {
  padding: 1rem;
}

.watermark-type,
.watermark-text,
.watermark-style,
.watermark-position {
  margin-bottom: 1.5rem;

  .label {
    display: block;
    margin-bottom: 0.5rem;
    color: #606266;
  }
}

.watermark-style {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.style-item {
  display: flex;
  align-items: center;
  gap: 1rem;

  .label {
    margin-bottom: 0;
    white-space: nowrap;
  }
}

.watermark-uploader {
  :deep(.el-upload) {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);

    &:hover {
      border-color: var(--el-color-primary);
    }
  }
}

.watermark-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
}

.watermark-preview {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.actions {
  margin-top: 1.5rem;
  text-align: center;
}
</style> 