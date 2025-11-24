<template>
  <div class="video-config-form">
    <header>
      <el-button
        @click="deleteItem"
        icon="el-icon-close"
        :radius="true"
        size="mini"
      ></el-button>
    </header>
    <div class="video-config-form-basic">
      <div class="left-content">
        <el-input
          v-model="video.videoLink"
          placeholder="视频链接"
          class="video-link-box"
        ></el-input>
        <upload-pic
          class="upload-pic-box"
          @upload-pic="setThumbnail"
        ></upload-pic>
        <el-input
          class="title-box"
          type="textarea"
          :rows="2"
          placeholder="默认标题"
          v-model="video.title"
        ></el-input>
        <el-input
          class="introduction-box"
          type="textarea"
          :rows="3"
          resize
          placeholder="默认简介"
          v-model="video.introduction"
        ></el-input>
      </div>
      <div class="right-content">
        <el-select
          class="list-type-select"
          v-model="video.countryList[0]"
          @change="listTypeChange"
        >
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <div class="checkbox-group-box">
          <el-input
            size="mini"
            class="country-list-search"
            v-model="countryListSearch"
          ></el-input>
          <el-scrollbar
            style="height: calc(100% - 32px)"
            wrapStyle="height:100%; overflow-x:hidden; padding-left: 14px;"
          >
            <el-checkbox-group
              v-model="video.countryList[1]"
              size="small"
              class="checkbox-group"
              :disabled="!video.countryList[0]"
            >
              <el-checkbox
                v-for="item in options2"
                :key="item.index"
                :label="item.index"
                v-show="
                  item.label
                    .toLocaleLowerCase()
                    .indexOf(countryListSearch.toLocaleLowerCase()) !== -1
                "
              >
                <div style="width: 80px">{{ item.label }}</div>
              </el-checkbox>
            </el-checkbox-group>
          </el-scrollbar>
        </div>
        <div class="translation-box">
          <div class="translation-checkbox-group">
            <el-scrollbar wrapStyle="height:100%; overflow-x:hidden;"  style="height: calc(100% - 2px)">
              <el-checkbox-group
                v-model="translationCheckboxValue"
                size="small"
                class="checkbox-group"
              >
                <el-checkbox
                  v-for="(value, name) in options3"
                  :key="name"
                  :label="value"
                  @change="translationCheckboxChange"
                >
                  <div style="width: 50px">{{ value }}</div>
                </el-checkbox>
              </el-checkbox-group>
            </el-scrollbar>
          </div>
          <div class="translation-table-onoff">
            <el-button
              type="primary"
              :plain="true"
              size="large"
              @click="translationTableOnoff = !translationTableOnoff"
              >多语言翻译</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <el-collapse-transition>
      <div class="translation-table-box" v-show="translationTableOnoff">
        <translation-table
          :translation="video.translation"
          :language-array="translationCheckboxValue"
        ></translation-table>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import uploadPic from "./uploadPic";
import translationTable from "./translationTable";
import { LIST_TYPE, COUNTRY_INDEX, LANGUAGE_NAME } from "./options";

export default {
  name: "videoConfigForm",
  data() {
    return {
      options1: LIST_TYPE,
      options2: COUNTRY_INDEX,
      options3: LANGUAGE_NAME,
      translationCheckboxValue: [],
      translationTableOnoff: false,
      oldthumbnail: null,
      countryListSearch: "",
    };
  },
  props: {
    video: Object,
    index: Number,
  },
  components: {
    "upload-pic": uploadPic,
    "translation-table": translationTable,
  },
  methods: {
    setThumbnail(flie) {
      let thumbnail = {};
      thumbnail.file = flie.raw;
      thumbnail.name = +new Date() + "_" + flie.name;
      this.$emit("set-thumbnail", [thumbnail, this.oldthumbnail]);
      this.video.thumbnail = thumbnail.name;
      this.oldthumbnail = thumbnail;
    },
    listTypeChange(e) {
      if (e === 0) {
        this.$set(this.video.countryList, 1, []);
      }
    },
    translationCheckboxChange(isAdd, e) {
      let language = e.srcElement.value;
      if (isAdd) {
        this.$set(this.video.translation, language, {
          title: "",
          introduction: "",
        });
      } else {
        this.$delete(this.video.translation, language);
      }
    },
    deleteItem() {
      this.$confirm("是否删除该项?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "question",
      }).then(() => {
        this.$emit("delete-item", {
            index: this.index,
            thumbnail: this.oldthumbnail,
          });
      }).catch(() => {
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.video-config-form {
  width: 900px;
  box-shadow: 1px 1px 6px #9e9e9e;
  border-radius: 8px;
  header {
    text-align: right;
    padding-right: 2px;
  }
  .video-config-form-basic {
    display: flex;
    .left-content {
      width: 390px;
      border: 0.5px solid transparent;
      padding: 0 8px 8px 8px;
      .upload-pic-box,
      .title-box,
      .video-link-box {
        margin-bottom: 8px;
      }
    }
    .right-content {
      width: calc(100% - 390px);
      height: 100%;
      border: 0.5px solid transparent;
      padding: 0 8px 8px 0;
      .list-type-select {
        margin-bottom: 8px;
      }
      .checkbox-group-box {
        height: 270px;
        width: 100%;
        // padding-left: 14px;
        position: relative;
        box-shadow: inset 0px 0px 1px 0px #000000;
        border: 0.5px solid #b3b3b3;
        border-radius: 2px;
        margin-bottom: 8px;
        .country-list-search {
          padding: 4px 16px 0;
        }
        .checkbox-group {
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          text-align: start;
        }
      }
      .translation-box {
        height: 72px;
        width: 100%;
        position: relative;
        border-radius: 2px;
        display: flex;
        justify-content: space-between;
        .translation-checkbox-group {
          height: 72px;
          width: 373px;
          padding-left: 10px;
          position: relative;
          box-shadow: inset 0px 0px 1px 0px #000000;
          border: 0.5px solid #b3b3b3;
          border-radius: 2px;
          .checkbox-group {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            text-align: start;
          }
        }
        .translation-table-onoff {
          height: 72px;
          position: relative;
          border: 0.5px solid transparent;
          // border-radius: 2px;
          display: flex;
          justify-content: center;
          flex-direction: column;
        }
      }
    }
  }
  .translation-table-box {
    margin: 0 8px;
    border-top: 1px solid #b3b3b3;
    padding: 8px;
    position: relative;
  }
}
</style>