<template>
  <div class="upload-pic">
    <!--single-file模式才能筛选文件类型-->
    <el-upload action="/" single-file accept="image/jpeg, image/png, image/bmp" :multiple="false"
      :show-file-list="false" :auto-upload="false" :on-change="onChange">
      <div class="upload-image" slot="trigger">
        <div class="pic-preview" :class="havePic ? 'have-pic' : 'no-pic'" :style="{ backgroundImage: `${url}` }">
          <i class="h-icon-add"></i>
          <div class="upload-img-text">
            {{ havePic ? "重新上传" : "上传缩略图" }}
          </div>
          <div class="mask"></div>
        </div>
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "UploadHead",
  data() {
    return {
      url: "",
      havePic: false,
    };
  },
  methods: {
    onChange(file, fileList) {
      // this.url = `url(${file.url})`;
      // this.havePic = true;
      // this.$emit("upload-pic", file);
      // fileList.shift(); //single-file模式下，fileList为空才显示trigger插槽中的内容
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        this.url = `url(${imageUrl})`;
        this.havePic = true;
        this.$emit("upload-pic", file);
      };
      reader.readAsDataURL(file.raw);
      fileList.shift();
    },
  },
};
</script>

<style lang="scss" scoped>
.upload-pic {
  width: 373px;
  height: 210px;
}

.upload-image {
  width: 373px;
  height: 210px;

  .pic-preview {
    position: relative;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: 50%;
    background-color: #f0f0f0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;

    i {
      font-size: 32px;
      margin-bottom: 8px;
      z-index: 2;
    }

    .upload-img-text {
      z-index: 2;
    }

    .mask {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 1;
      opacity: 0;
    }

    &.no-pic {
      color: rgba(0, 0, 0, 0.4);
      border: 1px dashed #ccc;
    }

    &.have-pic {
      color: rgb(255, 255, 255);

      i,
      .upload-img-text {
        opacity: 0;
      }

      &:hover i,
      &:hover .upload-img-text,
      &:hover .mask {
        opacity: 1;
      }
    }

    &.have-pic:hover {

      i,
      .upload-img-text,
      .mask {
        opacity: 1;
      }
    }
  }
}
</style>