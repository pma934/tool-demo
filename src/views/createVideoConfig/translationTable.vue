<template>
  <el-table :data="languageArray" style="width: 100%">
    <el-table-column label="语言" width="80" :resizable="false">
      <template slot-scope="scope">
        <label>{{ scope.row }}</label>
      </template>
    </el-table-column>
    <el-table-column label="标题" width="300" :resizable="false">
      <template slot-scope="scope">
        <el-input
          v-model="translation[scope.row].title"
          :placeholder="scope.row + '标题'"
        ></el-input>
      </template>
    </el-table-column>
    <el-table-column label="简介">
      <template slot-scope="scope">
        <el-input
          v-model="translation[scope.row].introduction"
          :placeholder="scope.row + '简介'"
        ></el-input>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "translationTableDialog",
  props: {
    translation: Object,
    languageArray: Array,
  },
};
</script>

<style>
</style>