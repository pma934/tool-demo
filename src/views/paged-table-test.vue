<!-- :url="(pageSize, currentPage) => `http://localhost:3000/mockApi/getdata?page-size=${pageSize}&page=${currentPage}`" -->
<template>
  <div class="home">
    <h-paged-table
      :fetch="listFetch"
      :data="(json) => json || []"
      :total="(json) => json.length"
      :page-count="(json) => json.totalPage"
      @fetch-success="(json) => {}"
      @fetch-error="(err) => {}"
      :pageSizes="[10, 33, 100]"
      style="height: 360px"
    >
      <el-table slot-scope="props" :data="props.data" force-scroll>
        <el-table-column prop="title" label="title"></el-table-column>
        <el-table-column
          prop="Introduction"
          label="Introduction"
        ></el-table-column>
        <el-table-column prop="thumbnail" label="thumbnail"></el-table-column>
        <el-table-column
          prop="videoLink"
          label="videoLink"
        ></el-table-column>
      </el-table>
    </h-paged-table>
  </div>
</template>

<script>
// 在这里创建一个h-paged-table组件，不要引用其他东西，就是把el-table包住后自带了分页功能

// @ is an alias to /src
import axios from "axios";

export default {
  name: "paged-table-test",
  data() {
    return {};
  },
  components: {},
  methods: {
    async listFetch(url, pageSize, currentPage) {
      console.log(currentPage);
      let employees = await new Promise((resolve, reject) => {
        axios.get("./video.json").then(
          (data) => {
            console.log(data);
            resolve(data);
          },
          (err) => {
            reject(err);
          }
        );
      });
      console.log(employees.data);
      return Promise.resolve(employees.data);
    },
  },
};
</script>
