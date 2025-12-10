<template>
  <div>
    <section class="sugar-selector-section">
      <h2>选择方糖</h2>
      <p>限制输入参数小于40！当前总方糖数量：<i style="color: red;">{{ totalSugar }}</i></p>
      <el-button type="primary" @click="resetSugarNumbers">重置</el-button>
      <div class="sugar-grid">
        <div v-for="(n, index) in sugarNumbers" class="sugar-item" :key="index">
          <el-card class="sugar-preview" @click.native="clickSugar(index)">
            <sugar :type="index + 1" class="sugar"></sugar>
          </el-card>
          <el-input-number v-model="sugarNumbers[index]" :min="0" :max="40 - totalSugar + sugarNumbers[index]"
            size="mini"></el-input-number>
        </div>
      </div>
    </section>
    <br>
    <p>方糖数组：{{ sugarNumbers }}</p>
    <plate :sugarNumbers="sugarNumbers" />
  </div>
</template>

<script>
import plate from './plate.vue'
import sugar from './sugar.vue'

export default {
  name: 'CubeSugar',
  components: {
    plate,
    sugar
  },
  data() {
    return {
      sugarNumbers: new Array(19).fill(0),
    }
  },
  computed: {
    totalSugar() {
      return this.sugarNumbers.reduce((acc, cur) => acc + cur, 0)
    }
  },
  methods: {
    clickSugar(index) {
      this.$set(this.sugarNumbers, index, this.sugarNumbers[index] + 1)
    },
    resetSugarNumbers() {
      this.sugarNumbers = new Array(19).fill(0)
    }
  }
}

</script>

<style lang="scss" scoped>
.sugar-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;


  .sugar-item {
    height: 100px;
    width: 100px;

    .sugar-preview {
      height: 72px;
      position: relative;
      cursor: pointer;

      ::v-deep .el-card__body {
        height: 100%;
        padding: 16px 8px 0;
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
        align-items: center;

        .sugar {
          transform: scale(0.3);
        }
      }
    }

    .el-input-number {
      width: 100px;
    }
  }
}
</style>
