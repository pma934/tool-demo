<template>
  <div>
      <slot name="default" :data="data_" :total="total_" :pageCount="pageCount_"></slot>
      <el-pagination
        :current-page.sync="currentPage"
        :page-sizes="pageSizes"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total_"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
  </div>
</template>

<script>
export default {
  name: "HPagedTable",
  props: {
    fetch:{
        type: Function,
        default: () => {},
    },
    data:{
        type: Function,
        default: () => [],
    },
    total:{
        type: Function,
        default: () => 0,
    },
    pageCount:{
        type: Function,
        default: () => 0,
    },
  },
  data() {
    return {
        json: null,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [1, 10, 33, 100],
    };
  },
  computed: {
    data_() {
      return this.data(this.json || [])
    },
    total_() {
      return this.total(this.json || [])
    },
    pageCount_() {
      return  this.pageCount(this.json || {totalPage:0});
    }
  },
  mounted() {
    this.handleFetch('url', this.pageSize, this.currentPage);
  },
  methods: {
    async handleFetch(url, pageSize, currentPage) {
      this.json = await this.fetch(url, pageSize, currentPage);
      this.$emit("fetch-success", this.json);     
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.handleFetch('url', this.pageSize, this.currentPage);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.handleFetch('url', this.pageSize, this.currentPage);
    },
  },
};
</script>