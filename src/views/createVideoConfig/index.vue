<template>
  <div class="createVideoConfig">
    <div class="float-button-group">
      <el-button :radius="true" icon="h-icon-add" @click="addItem" />
      <el-button :radius="true" icon="h-icon-download" @click="download" />
    </div>
    <div class="content">
      <video-config-form
        class="video-config-form"
        v-for="(d, i) in timeKey"
        :key="d"
        :video="config[i]"
        :index="i"
        @set-thumbnail="saveThumbnail"
        @delete-item="deleteItem"
      ></video-config-form>
      <div class="add-item" @click="addItem">
        <span>ADD ITEM</span>
      </div>
    </div>
  </div>
</template>

<script>
import JsZip from "jszip";
import { saveAs } from "file-saver";
import videoConfigForm from "./videoConfigForm";

export default {
  name: "createVideoConfig",
  data() {
    return {
      zip: new JsZip(),
      thumbnailFolder: "",
      config: [],
      timeKey: [], //防止复用
    };
  },
  components: {
    "video-config-form": videoConfigForm,
  },
  methods: {
    saveThumbnail([thumbnail, oldThumbnail]) {
      console.log(thumbnail, oldThumbnail);
      if (oldThumbnail) {
        this.thumbnailFolder.remove(oldThumbnail.name);
      }
      this.thumbnailFolder.file(thumbnail.name, thumbnail.file);
      //   saveAs(file.raw, file.name);
    },
    addItem() {
      this.timeKey.push(+new Date());
      this.$set(this.config, this.config.length, {
        //添加项
        title: "",
        thumbnail: "",
        videoLink: "",
        countryList: [0, []],
        introduction: "",
        translation: {},
      });
      this.$nextTick(function () {
        window.scrollTo({
          //滑动到底部
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      });
    },
    deleteItem({ index, thumbnail }) {
      if (thumbnail) {
        this.thumbnailFolder.remove(thumbnail.name);
      }
      this.timeKey.splice(index, 1);
      this.$delete(this.config, index);
    },
    download() {
      this.$confirm("是否生成配置文件?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "question",
        onConfirm: () => {
          let that = this;
          this.zip.file("video_list.json", JSON.stringify(this.config));
          this.zip.generateAsync({ type: "blob" }).then(function (content) {
            saveAs(content, "video_list_config.zip");
          });
          that.$message({
            type: "success",
            message: "生成配置文件成功!",
          });
        },
        onCancel: () => {},
      });
    },
    init() {
      this.thumbnailFolder = this.zip.folder("thumbnail"); //创建一个文件夹放缩略图
      this.addItem(); //添加一个新配置项
    },
  },
  created() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.createVideoConfig {
  .float-button-group {
    position: fixed;
    right: 60px;
    bottom: 100px;
    box-shadow: 0 2px 12px 0 rgba(94, 100, 133, 0.5);
    display: flex;
    flex-direction: column;
    border-radius: 32px;
    button {
      margin: 8px;
    }
  }
  .content {
    padding-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
  .video-config-form {
    margin-bottom: 16px;
  }
  .add-item {
    width: 900px;
    height: 60px;
    margin-bottom: 16px;
    border: 2px dashed #b3b3b3;
    cursor: pointer;
    line-height: 60px;
    font-size: 48px;
    color: #9e9e9e;
    font-weight: bold;
    &:hover {
      border-color: #e72528;
      background-color: #fff;
      color: #e72528;
    }
    &:active {
      border-color: #d2373a;
      background-color: #fff;
      color: #d2373a;
      outline: none;
    }
  }
}
</style>