<template>
  <div class="sugar">
    <div class="content">
      <div class="basic">
        {{ type }}
      </div>
      <div class="other" :class="`ty${type}`" v-show="type !== 0">
        <template v-for="(val, index) in plate">
          <div class="square" :color="color" :class="[show(val) ? '' : 'no-show', `sq${val}`]" :key="index"></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { sugarData } from "./const";

export default {
  name: "sugar",
  props: {
    type: {
      type: Number,
      require: true,
    },
    color: {
      type: String,
      default: "c0",
    },
  },
  data() {
    return {
      step: 1,
      plate: this.getPlate(),
    };
  },
  methods: {
    getPlate() {
      let plate = [
        ...[-2, -1, 0, 1, 2, 3],
        ...[8, 9, 10, 11, 12, 13],
        ...[18, 19, 20, 21, 22, 23],
        ...[28, 29, 30, 31, 32, 33],
      ];
      return plate;
    },
    show(val) {
      return sugarData[this.type].includes(val);
    },
  },
};
</script>

<style lang="scss" scoped>
$radius: 12px;

.sugar {
  height: 40px;
  width: 40px;
  display: inline-block;

  .content {
    position: relative;

    .basic {
      height: 40px;
      width: 40px;
      border: 1px solid black;
      background-color: lightblue;
      opacity: 0;
    }

    .other {
      position: absolute;
      display: flex;
      width: 240px;
      height: 160px;
      flex-wrap: wrap-reverse;
      top: -120px;
      left: -80px;
      z-index: 100;

      .square {
        height: 40px;
        width: 40px;
        border: 1px solid rgba(255, 255, 255, 0.6);
        background-color: rgba(255, 87, 34, 0.8);
        box-shadow:
          0 4px 10px rgba(0, 0, 0, 0.1),
          inset 0 1px 3px rgba(255, 255, 255, 0.8),
          inset 0 -1px 3px rgba(0, 0, 0, 0.1);

        &.no-show {
          visibility: hidden;
        }

        &[color="c1"] {
          background-color: rgba(255, 140, 148, 0.85);
          /* 柔和的粉色 */
        }

        &[color="c2"] {
          background-color: rgba(255, 234, 167, 0.85);
          /* 温暖的黄色 */
        }

        &[color="c3"] {
          background-color: rgba(162, 155, 254, 0.85);
          /* 柔和的紫色 */
        }

        &[color="c4"] {
          background-color: rgba(129, 236, 236, 0.85);
          /* 淡青色 */
        }

        &[color="c5"] {
          background-color: rgba(250, 177, 160, 0.85);
          /* 珊瑚橙色 */
        }

        &[color="c6"] {
          background-color: rgba(116, 185, 255, 0.85);
          /* 淡蓝色 */
        }

        &[color="c7"] {
          background-color: rgba(253, 203, 110, 0.85);
          /* 暖金色 */
        }

        &[color="c8"] {
          background-color: rgba(178, 190, 195, 0.85);
          /* 浅灰色 */
        }

        &[color="c9"] {
          background-color: rgba(223, 230, 233, 0.85);
          /* 非常浅的灰色 */
        }
      }


      &.ty1 {
        .sq0 {
          border-bottom-left-radius: $radius;
        }

        .sq1 {
          border-bottom-right-radius: $radius;
        }

        .sq10 {
          border-top-left-radius: $radius;
        }

        .sq11 {
          border-top-right-radius: $radius;
        }
      }

      &.ty2 {
        .sq0 {
          border-bottom-left-radius: $radius;
          border-bottom-right-radius: $radius;
        }

        .sq30 {
          border-top-left-radius: $radius;
          border-top-right-radius: $radius;
        }
      }

      &.ty3 {
        .sq0 {
          border-top-left-radius: $radius;
          border-bottom-left-radius: $radius;
        }

        .sq3 {
          border-top-right-radius: $radius;
          border-bottom-right-radius: $radius;
        }
      }

      &.ty4 {
        .sq0 {
          border-bottom-left-radius: $radius;
        }

        .sq1 {
          border-top-right-radius: $radius;
          border-bottom-right-radius: $radius;
        }

        .sq9 {
          border-top-left-radius: $radius;
          border-bottom-left-radius: $radius;
        }

        .sq10 {
          border-top-right-radius: $radius;
        }
      }

      &.ty5 {
        .sq0 {
          border-bottom-left-radius: $radius;
          border-bottom-right-radius: $radius;
        }

        .sq10 {
          border-top-left-radius: $radius;
        }

        .sq11 {
          border-bottom-right-radius: $radius;
        }

        .sq21 {
          border-top-left-radius: $radius;
          border-top-right-radius: $radius;
        }
      }

      &.ty6 {
        .sq0 {
          border-top-left-radius: $radius;
          border-bottom-left-radius: $radius;
        }

        .sq1 {
          border-bottom-right-radius: $radius;
        }

        .sq11 {
          border-top-left-radius: $radius;
        }

        .sq12 {
          border-top-right-radius: $radius;
          border-bottom-right-radius: $radius;
        }
      }

      &.ty7 {
        .sq0 {
          border-bottom-left-radius: $radius;
          border-bottom-right-radius: $radius;
        }

        .sq9 {
          border-bottom-left-radius: $radius;
        }

        .sq10 {
          border-top-right-radius: $radius;
        }

        .sq19 {
          border-top-left-radius: $radius;
          border-top-right-radius: $radius;
        }
      }

      &.ty8 {
        .sq0 {
          border-top-left-radius: $radius;
          border-bottom-left-radius: $radius;
        }

        .sq2 {
          border-top-right-radius: $radius;
          border-bottom-right-radius: $radius;
        }

        .sq11 {
          border-top-left-radius: $radius;
          border-top-right-radius: $radius;
        }
      }

      &.ty9 {
        .sq0 {
          border-bottom-left-radius: $radius;
          border-bottom-right-radius: $radius;
        }

        .sq9 {
          border-top-left-radius: $radius;
          border-bottom-left-radius: $radius;
        }

        .sq20 {
          border-top-left-radius: $radius;
          border-top-right-radius: $radius;
        }
      }

      &.ty10 {
        .sq0 {
          border-bottom-left-radius: $radius;
          border-bottom-right-radius: $radius;
        }

        .sq9 {
          border-top-left-radius: $radius;
          border-bottom-left-radius: $radius;
        }

        .sq11 {
          border-top-right-radius: $radius;
          border-bottom-right-radius: $radius;
        }
      }

      &.ty11 {
        .sq0 {
          border-bottom-left-radius: $radius;
          border-bottom-right-radius: $radius;
        }

        .sq11 {
          border-top-right-radius: $radius;
          border-bottom-right-radius: $radius;
        }

        .sq20 {
          border-top-left-radius: $radius;
          border-top-right-radius: $radius;
        }
      }

      &.ty12 {
        .sq0 {
          border-top-left-radius: $radius;
          border-bottom-left-radius: $radius;
        }

        .sq2 {
          border-bottom-right-radius: $radius;
        }

        .sq12 {
          border-top-left-radius: $radius;
          border-top-right-radius: $radius;
        }
      }

      &.ty13 {
        .sq0 {
          border-bottom-left-radius: $radius;
          border-bottom-right-radius: $radius;
        }

        .sq19 {
          border-top-left-radius: $radius;
          border-bottom-left-radius: $radius;
        }

        .sq20 {
          border-top-right-radius: $radius;
        }
      }

      &.ty14 {
        .sq0 {
          border-bottom-left-radius: $radius;
          border-bottom-right-radius: $radius;
        }

        .sq10 {
          border-top-left-radius: $radius;
        }

        .sq12 {
          border-top-right-radius: $radius;
          border-bottom-right-radius: $radius;
        }
      }

      &.ty15 {
        .sq0 {
          border-bottom-left-radius: $radius;
        }

        .sq1 {
          border-top-right-radius: $radius;
          border-bottom-right-radius: $radius;
        }

        .sq20 {
          border-top-left-radius: $radius;
          border-top-right-radius: $radius;
        }
      }

      &.ty16 {
        .sq0 {
          border-bottom-left-radius: $radius;
        }

        .sq2 {
          border-top-right-radius: $radius;
          border-bottom-right-radius: $radius;
        }

        .sq10 {
          border-top-left-radius: $radius;
          border-top-right-radius: $radius;
        }
      }

      &.ty17 {
        .sq0 {
          border-top-left-radius: $radius;
          border-bottom-left-radius: $radius;
        }

        .sq1 {
          border-bottom-right-radius: $radius;
        }

        .sq21 {
          border-top-left-radius: $radius;
          border-top-right-radius: $radius;
        }
      }

      &.ty18 {
        .sq0 {
          border-bottom-left-radius: $radius;
          border-bottom-right-radius: $radius;
        }

        .sq8 {
          border-top-left-radius: $radius;
          border-bottom-left-radius: $radius;
        }

        .sq10 {
          border-top-right-radius: $radius;
        }
      }

      &.ty19 {
        .sq0 {
          border-bottom-left-radius: $radius;
          border-bottom-right-radius: $radius;
        }

        .sq20 {
          border-top-left-radius: $radius;
        }

        .sq21 {
          border-top-right-radius: $radius;
          border-bottom-right-radius: $radius;
        }
      }

    }
  }
}
</style>
