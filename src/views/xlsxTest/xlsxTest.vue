<template>
  <div id="xlsx-test">
    <el-button @click="exportDate">{{ "导出" }}</el-button>
    <el-button @click="serviceWorker">{{ "serviceWorker" }}</el-button>
  </div>
</template>

<script>
import { getXlsxBlob, saveAsZip } from "./exportMethod";
// import { ttt } from "./ttt";

export default {
  name: "xlsx-test",
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    async exportDate() {
      let xlsxBlob = await getXlsxBlob("xxxx");
      let files = [];
      files.push({
        name: `xxx.xlsx`,
        blob: xlsxBlob,
      });

      saveAsZip(files, `xxx`);
      // ttt();
    },
    serviceWorker() {
      if ("serviceWorker" in navigator) {
        /* 当页面加载完成就创建一个serviceWorker */
        /* 创建并指定对应的执行内容 */
        /* scope 参数是可选的，可以用来指定你想让 service worker 控制的内容的子目录。 在这个例子里，我们指定了 '/'，表示 根网域下的所有内容。这也是默认值。 */
        navigator.serviceWorker
          .register("./serviceWorker.js", { scope: "./" })
          .then(function (registration) {
            console.log(
              "ServiceWorker registration successful with scope: ",
              registration.scope
            );
          })
          .catch(function (err) {
            console.log("ServiceWorker registration failed: ", err);
          });
      }
    },
  },
};
</script>

<style scoped>
#table {
  width: 100%;
  height: calc(100vh - 94px);
  border: 1px solid #2e63d6;
  box-sizing: border-box;
}
</style>
