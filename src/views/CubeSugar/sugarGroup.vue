<template>
  <div class="sugar-group">
    <div class="content">
      <template v-for="({ sugarType, color }, index) in typeList">
        <sugar :type="sugarType" :color="'c' + color" :key="index" />
      </template>
    </div>
  </div>
</template>

<script>
import Sugar from "./sugar";
import { sugarData } from "./const";

const getPlate = function (order = 6) {
  const plate = new Array(86).fill(false);
  for (let y = 0; y < order; y++) {
      for (let x = 0; x < order; x++) {
        plate[10 * y + x] = true;
    }
  }
  return plate;
};

export default {
  name: "sugar-group",
  components: {
    Sugar,
  },
  props: {
    groupList: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      typeList: new Array(86).fill({ sugarType: 0, color: 0 }),
    };
  },
  methods: {
    init() {
        this.typeList = new Array(86).fill({ sugarType: 0, color: 0 });
    },
    fill(plate = getPlate(), order = 0) {
      let step = plate.findIndex((v) => v);
      let type = this.groupList[order];
      sugarData[type].forEach((i) => {
        plate[i + step] = false;
      });
      this.$set(this.typeList, step, {
        sugarType: type,
        color: order + 1,
      });
      if (order < this.groupList.length - 1) {
        this.fill(plate, order + 1);
      }
    },
  },
  watch: {
    groupList: {
      handler(val) {
        this.init();
        if (val.length) {
          this.fill();
        } 
      },
      immediate: true,
    }
  },
};
</script>

<style lang="scss" scoped>
.sugar-group {
  width: 240px;
  height: 240px;
  overflow: hidden;

  .content {
    width: 400px;
    height: 240px;
    display: flex;
    flex-wrap: wrap-reverse;
  }
}
</style>