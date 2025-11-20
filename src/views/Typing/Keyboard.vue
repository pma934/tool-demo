<template>
  <div class="box">
    <div class="keyboard">
      <div class="keyboard-row" v-for="(keyboardRowItem,k1) in keyboardRow" :key="k1">
        <div
          :class="'keyboard-key '+v.class+(v.ascii.includes(activityKey.charCodeAt())?' is-active':'')"
          v-for="(v,k2) in keyboardRowItem"
          :key="k2"
        >
          <div class="key-label">{{v.value[0]}}</div>
          <div v-if="v.value[1]" class="key-label">{{v.value[1]}}</div>
        </div>
      </div>
      <div class="hands">
        <img class="hand hand--left" :src='"../../assets/img/"+hand[0]+".png"' />
        <img class="hand hand--right" :src='"../../assets/img/"+hand[1]+".png"' />
      </div>
    </div>
  </div>
</template>

<script>
var kb = require("./keyboard.json");
var hd = require("./hand.json");
export default {
  name: "keyboard",
  props: {
    activityKey: {
      type: String,
      default: "",
    },
  },
  computed:{
    hand(){
      return hd[this.activityKey]
    }
  },
  data() {
    return {
      keyboardRow: [
        kb.keyboardRow1,
        kb.keyboardRow2,
        kb.keyboardRow3,
        kb.keyboardRow4,
        kb.keyboardRow5,
      ],
    };
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.box {
  //多设一层.box，用来确定.keyboard的margin-bottom
  margin: auto;
  max-width: 800px;
  .keyboard {
    @media screen and (min-width: 800px) {
      margin-bottom: 11%; //.box的宽决定
    }
    @media screen and (min-width: 700px) and (max-width: 800px) {
      margin-bottom: 12%; //.box的宽决定
    }
    @media screen and (min-width: 600px) and (max-width: 700px) {
      margin-bottom: 14%; //.box的宽决定
    }
    @media screen and (max-width: 600px) {
      margin-bottom: 15%; //.box的宽决定
    }
    border-radius: 20px;
    padding: 15px 15px 10px;
    background-color: #d9dadb;
    border: 1px solid rgba(0, 0, 0, 0.07);
    display: flex;
    flex-direction: column;
    flex-basis: 40px;
    position: relative;

    .keyboard-row {
      flex: 1;
      display: flex;
      margin-bottom: 5px;
      position: relative;
      &::after {
        content: " ";
        margin-top: 6.5%;
      }
      .keyboard-key {
        &:last-child {
          margin-right: 0;
        }
        &.is-active {
          background-color: #3295db;
          border-color: #47a0df #3295db #2d86c5;
          color: #fff;
        }
        font-size: 12px;
        line-height: 1;
        // height: 40px;
        flex: 1;
        flex-basis: 40px;
        margin-right: 5px;
        background-color: #fff;
        border-bottom: 1px solid #a9a9a9;
        border-top: 1px solid #fff;
        border-radius: 5px;
        position: relative;
        .key-label {
          align-items: center;
          display: flex;
          height: 100%;
          justify-content: center;
          text-align: center;
          white-space: nowrap;
        }
      }
      .key-duo {
        flex-direction: column;
        .key-label {
          height: 50%;
        }
      }
      .key-letter .key-label {
        font-size: 16px;
      }
      .key-left .key-label {
        justify-content: flex-start;
      }
      .key-right .key-label {
        justify-content: flex-end;
      }
      .key-bottom .key-label {
        align-items: flex-end;
        height: calc(100% - 5px);
      }
      //特殊按键
      .special--backspace {
        flex-basis: 74px;
      }
      .special--tab {
        flex-basis: 68px;
      }
      .special--right-two {
        flex-basis: 48px;
      }
      .special--capsLock {
        flex-basis: 83px;
      }
      .special--enter {
        flex-basis: 83px;
      }
      .special--shift {
        flex-basis: 108px;
      }
      .special--ctrl-alt {
        flex-basis: 50px;
      }
      .special--cmd {
        flex-basis: 70px;
      }
      .special--space {
        flex-basis: 336px;
      }
    }
    .hands {
      position: absolute;
      height: 100%;
      left: 0;
      width: 100%;
      overflow: hidden;
      // top: -10%;
      @media screen and (min-width: 800px) {
        top: 0%;
      }
      @media screen and (min-width: 700px) and (max-width: 800px) {
        top: 2%;
      }
      @media screen and (min-width: 600px) and (max-width: 700px) {
        top: 5%;
      }
      @media screen and (max-width: 600px) {
        top: 7%;
      }
      .hand {
        position: absolute;
      }
      .hand--left {
        left: -20.5%;
        top: -13%;
        width: 74.3%;
      }
      .hand--right {
        left: 33.3%;
        top: -10%;
        width: 84.2%;
      }
    }
  }
}
</style>