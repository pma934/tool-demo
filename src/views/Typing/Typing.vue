<template>
  <div>
    <div class="paper">
      <div class="typing-box">
        <div ref="lines" class="lines">
          <span class="word" v-for="(word,wordKey) in charArr" :key="wordKey">
            <span
              class="char"
              :class="char==='\n'?'is-enter':''"
              v-for="(char,charKey) in word"
              :key="charKey"
            >
            <a>{{char}}</a>
            <br v-if="char==='\n'" />
              <!-- 注意上面的{{char}}两边紧贴 -->
            </span>
          </span>
        </div>
      </div>
    </div>
    <keyboard :activity-key="activityKey" />
  </div>
</template>

<script>
import keyboard from "./Keyboard";
export default {
  name: "typing",
  data() {
    return {
      //换行顶格
      text: `In a faraway land, there was a rooster who lived with his master and the wife.
Every early morning, the rooster would make a very loud sound.
This shocked his master and the wife so much that they jumped up from their sleep.
One day, the rooster heard that his master and the wife wanted to slaughter him for dinner. He was afraid. He wanted to run away. But before he went off, he quickly took one of the wife's shoes and the master's fiddling stick.
Then he ran off into the forest feeling happy and satisfied.`,
      fun: {}, //存放监听事件
      charEles: [], //字符dom数组
      num: 0, //当前字符序号
      errorMark: new Set(), //错误记录
    };
  },
  computed: {
    //处理字符
    charArr() {
      return this.text.split(/(?<=\s)/).map((word) => {
        return word.split("");
      });
    },
    activityKey() {
      //键盘上激活的按钮
      return this.text[this.num];
    },
  },
  components: {
    keyboard,
  },
  methods: {
    //当前字符进入视野
    scrollInto() {
      this.charEles[this.num].scrollIntoView({ block: "center" });
    },
    //退格
    backspace() {
      if (this.num > 0) {
        this.charEles[this.num] &&
          this.charEles[this.num].classList.remove("is-active");
        this.num--;
        this.charEles[this.num].classList.remove(
          "is-right",
          "is-error",
          "is-modify"
        );
        this.charEles[this.num].classList.add("is-active");
        this.scrollInto();
      }
    },
    //打字校验
    compare(key) {
      if (this.num < this.text.length) {
        if (this.text[this.num] === key) {
          if (this.errorMark.has(this.num)) {
            this.charEles[this.num].classList.add("is-modify");
          } else {
            this.charEles[this.num].classList.add("is-right");
          }
        } else {
          this.errorMark.add(this.num);
          this.charEles[this.num].classList.add("is-error");
        }
        this.charEles[this.num].classList.remove("is-active");
        this.num++;
        if (this.num < this.text.length) {
          this.charEles[this.num].classList.add("is-active");
          this.scrollInto();
        }
      }
    },
    //初始化
    init() {
      this.charEles = this.$refs.lines.querySelectorAll(".char");
      this.charEles[0].classList.add("is-active");
    },
    // 添加键盘监听事件
    add() {
      console.log("添加键盘监听事件");
      let lastKeypress = new Set();
      const keydownFun = (kEvent) => {
        if (kEvent.key === " ") {
          kEvent.preventDefault(); //移除空格键的默认事件,keypress里移除不了长按
          if (!lastKeypress.has(kEvent.key)) {
            lastKeypress.add(kEvent.key);
            this.compare(kEvent.key);
          }
        }
        if (kEvent.key === "Backspace" && !lastKeypress.has(kEvent.key)) {
          lastKeypress.add(kEvent.key); //退格事件,keypress捕获不到
          this.backspace();
        }
      };
      const keypressFun = (kEvent) => {
        if (!lastKeypress.has(kEvent.key)) {
          lastKeypress.add(kEvent.key);
          if (kEvent.key === "Enter") {
            //回车事件,key值特殊处理
            this.compare("\n");
          } else {
            this.compare(kEvent.key);
          }
        }
      };
      const keyupFun = () => {
        lastKeypress.clear();
      };
      document.addEventListener("keydown", keydownFun);
      document.addEventListener("keypress", keypressFun);
      document.addEventListener("keyup", keyupFun);
      return {
        keydownFun,
        keypressFun,
        keyupFun,
      };
    },
    // 移除键盘监听事件
    remove(fun) {
      console.log("移除键盘监听事件");
      document.removeEventListener("keydown", fun.keydownFun);
      document.removeEventListener("keypress", fun.keypressFun);
      document.removeEventListener("keyup", fun.keyupFun);
    },
  },
  created() {
    this.fun = this.add();
  },
  mounted() {
    this.init();
    // console.log(this.charEles);
  },
  destroyed() {
    // console.log(this.fun);
    this.remove(this.fun);
  },
};
</script>

<style lang="scss" scoped>
$lines: 5; //行数
$line-height: 58px; //行高
.paper {
  max-width: 940px;
  margin: auto;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 4px 4px 10px 4px #e0e0e0;
  padding: 5px 15px 20px 15px;
  .typing-box {
    height: calc(#{$line-height} * #{$lines});
    overflow-y: hidden;
    .lines {
      font-size: 30px;
      font-family: "pt-mono", "Times New Roman";
      text-align: left;
      background-image: url("./type-border-tall.gif");
      background-size: 100% $line-height;
      will-change: transform;
      .word {
        .char {
          animation: cursorBlink;
          line-height: $line-height;
          color: #4a4a4a;
          margin: 5px 2px 5px 0;
          border-bottom: 3px solid transparent;
          border-radius: 5px;
          &.is-active {
            animation: cursorBlink 2s ease 1s infinite both;
            background-color: transparent;
            color: #3295db;
            border-radius: 0px;
          }

          &.is-error {
            background-color: #ffdcd9;
            color: #d55b60;
          }

          &.is-right {
            background: #edf7e7;
            color: #95c590;
          }

          &.is-modify {
            background: #fff9c4;
            color: #ffc107;
          }
        }
        .is-enter::before {
          content: "↲";
        }
      }
    }
  }
}
@keyframes cursorBlink {
  0% {
    border-color: #3295db;
  }

  50% {
    border-color: transparent;
  }

  100% {
    border-color: #3295db;
  }
}
</style>