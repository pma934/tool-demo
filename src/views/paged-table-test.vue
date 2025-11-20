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
let mockData = [];
for (let i = 0; i < 100; i++) {
  mockData.push({
    title: `title${i}`,
    Introduction: `Introduction${i}`,
    thumbnail: `thumbnail${i}`,
    videoLink: `videoLink${i}`,
  });
}
import HPagedTable from "@/components/HPagedTable.vue";

// @ is an alias to /src
import axios from "axios";

export default {
  name: "paged-table-test",
  data() {
    return {};
  },
  components: {
    HPagedTable,
  },
  methods: {
    async listFetch(url, pageSize, currentPage) {
      let employees = await new Promise((resolve, reject) => {
        axios.get("./video.json").then(
          (data) => {
            console.log(data);
            // resolve(data);
            let c = this.getMockData(pageSize, currentPage)
            resolve(c)
          },
          (err) => {
            reject(err);
          }
        );
      });
      console.log(employees.data);
      return Promise.resolve(employees.data);
    },
    getMockData(pageSize, currentPage) {
      let start = (currentPage - 1) * pageSize;
      let end = start + pageSize;
      let result = {
        total: mockData.length,
        data: mockData.slice(start, end),
        totalPage: Math.ceil(mockData.length / pageSize),
      };
      let c = result.data
      c.length = result.total
      c.totalPage = result.totalPage
      return {data: c}
    },
  },
};
</script>
