<template>
  <div class="typing-container">
    <!-- 文本选择面板 -->
    <div class="text-selector">
      <h3 class="section-title">打字练习</h3>

      <!-- 难度筛选控件 -->
      <div class="difficulty-filter">
        <span class="filter-label">难度筛选：</span>
        <div class="level-buttons">
          <button v-for="level in levelOptions" :key="level.value"
            :class="['level-button', { active: selectedLevel === level.value }]" @click="selectLevel(level.value)"
            :data-level="level.label">
            {{ level.label }}
          </button>
        </div>
      </div>

      <!-- 文本选项 -->
      <div class="text-options">
        <template v-if="textOptions.length > 0">
          <button v-for="(text, index) in textOptions" :key="index"
            :class="['text-option', { active: currentTextIndex === index }]" @click="selectText(index)">
            <div class="text-title">{{ text.title }}</div>
            <div class="text-meta">
              <span class="text-length">{{ text.content.length }} 字符</span>
              <span class="text-level" :data-level="getLevelLabel(text.level)">{{ getLevelLabel(text.level) }}</span>
            </div>
          </button>
        </template>
        <div v-else class="no-texts">
          <p>当前难度下没有可用的练习文本</p>
          <button class="reset-filter-btn" @click="selectLevel('all')">查看全部文本</button>
        </div>
      </div>
    </div>

    <!-- 统计面板 -->
    <div class="stats">
      <div class="stat-item">
        <span class="stat-label">打字速度:</span>
        <span class="stat-value">{{ wpm }} WPM</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">准确率:</span>
        <span class="stat-value">{{ accuracy }}%</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">时间:</span>
        <span class="stat-value">{{ timeDisplay }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">进度:</span>
        <span class="stat-value">{{ progress }}%</span>
      </div>
      <div class="stat-item reset-item">
        <button class="reset-btn" @click="resetExercise" title="重置练习">
          重置
        </button>
      </div>
    </div>
    <div class="paper">
      <div class="typing-box">
        <div ref="lines" class="lines" v-if="showText">
          <span class="word" v-for="(word, wordKey) in charArr" :key="wordKey">
            <span class="char" :class="char === '\n' ? 'is-enter' : ''" v-for="(char, charKey) in word" :key="charKey">
              <a>{{ char }}</a>
              <br v-if="char === '\n'" />
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
import { texts } from "./texts";
export default {
  name: "typing",
  data() {
    return {
      // 多文本选择配置
      currentTextIndex: 0,
      allTexts: texts, // 所有文本
      textOptions: [], // 筛选后的文本
      selectedLevel: "beginner", // 当前选择的难度级别

      // 难度级别配置
      levelOptions: [
        // { value: "all", label: "全部" },
        { value: "beginner", label: "初级" },
        { value: "intermediate", label: "中级" },
        { value: "advanced", label: "高级" }
      ],

      // 动态文本（从选择项中获取）
      text: "",

      fun: {}, //存放监听事件
      charEles: [], //字符dom数组
      num: 0, //当前字符序号
      errorMark: new Set(), //错误记录

      // 打字速度统计相关
      startTime: null, //开始时间
      endTime: null, //结束时间
      timer: null, //计时器
      elapsedTime: 0, //已用时间(秒)
      correctChars: 0, //正确字符数
      totalTyped: 0, //总输入字符数

      showText: false
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
    // WPM (Words Per Minute) 计算
    wpm() {
      if (!this.startTime || this.elapsedTime === 0) return 0;
      // 标准计算：每分钟输入的单词数（5个字符=1个单词）
      const words = Math.floor(this.correctChars / 5);
      const minutes = this.elapsedTime / 60;
      return Math.max(0, Math.round(words / minutes));
    },
    // 准确率计算
    accuracy() {
      if (this.totalTyped === 0) return 100;
      return Math.round((this.correctChars / this.totalTyped) * 100);
    },
    // 时间显示
    timeDisplay() {
      const minutes = Math.floor(this.elapsedTime / 60);
      const seconds = this.elapsedTime % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    },
    // 进度显示
    progress() {
      if (this.text.length === 0) return 0;
      return Math.round((this.num / this.text.length) * 100);
    }
  },
  components: {
    keyboard,
  },
  methods: {
    //获取难度标签
    getLevelLabel(level) {
      const labels = {
        beginner: '初级',
        intermediate: '中级',
        advanced: '高级'
      };
      return labels[level] || level;
    },

    // 根据难度筛选文本
    filterTexts() {
      if (this.selectedLevel === "all") {
        this.textOptions = [...this.allTexts];
      } else {
        this.textOptions = this.allTexts.filter(text => text.level === this.selectedLevel);
      }

      // 重置当前选择
      if (this.textOptions.length > 0) {
        this.currentTextIndex = 0;
        this.loadSelectedText();
      } else {
        this.text = "";
        this.currentTextIndex = -1;
      }

      this.resetExercise();
    },

    // 选择难度级别
    selectLevel(level) {
      if (level !== this.selectedLevel) {
        this.selectedLevel = level;
        this.filterTexts();
      }
    },

    //选择文本
    selectText(index) {
      if (index !== this.currentTextIndex && index >= 0 && index < this.textOptions.length) {
        this.currentTextIndex = index;
        this.loadSelectedText();
        this.resetExercise();
      }
    },

    //加载选中的文本
    loadSelectedText() {
      if (this.currentTextIndex >= 0 && this.currentTextIndex < this.textOptions.length) {
        this.text = this.textOptions[this.currentTextIndex].content;
      } else {
        this.text = "";
      }
    },

    //当前字符进入视野
    scrollInto() {
      if (this.charEles[this.num]) {
        this.charEles[this.num].scrollIntoView({ block: "center" });
      }
    },

    //退格
    backspace() {
      if (this.num > 0) {
        this.charEles[this.num] &&
          this.charEles[this.num].classList.remove("is-active");
        this.num--;
        if (this.charEles[this.num]) {
          this.charEles[this.num].classList.remove(
            "is-right",
            "is-error",
            "is-modify"
          );
          this.charEles[this.num].classList.add("is-active");
          this.scrollInto();
        }
      }
    },

    //打字校验
    compare(key) {
      // 开始计时（第一次输入时）
      if (!this.startTime) {
        this.startTime = Date.now();
        this.startTimer();
      }

      if (this.num < this.text.length) {
        this.totalTyped++;

        if (this.text[this.num] === key) {
          this.correctChars++;
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

        if (this.num < this.text.length && this.charEles[this.num]) {
          this.charEles[this.num].classList.add("is-active");
          this.scrollInto();
        } else {
          // 打字完成
          this.endTime = Date.now();
          this.stopTimer();
        }
      }
    },

    //初始化
    init() {
      this.showText = true;
      this.$nextTick(() => {
        this.charEles = this.$refs.lines.querySelectorAll(".char");
        if (this.charEles.length > 0) {
          this.charEles[0].classList.add("is-active");
        }
      });
    },

    // 开始计时器
    startTimer() {
      this.timer = setInterval(() => {
        this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
      }, 1000);
    },

    // 停止计时器
    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    // 重置统计数据
    resetStats() {
      this.stopTimer();
      this.startTime = null;
      this.endTime = null;
      this.elapsedTime = 0;
      this.correctChars = 0;
      this.totalTyped = 0;
      this.num = 0;
      this.errorMark.clear();
    },

    // 重置整个练习
    resetExercise() {
      this.showText = false;
      this.resetStats();
      // 重新初始化DOM元素
      this.$nextTick(() => {
        this.init();
      });
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
    this.filterTexts(); // 初始化并筛选文本
  },
  mounted() {
    this.init();
    // console.log(this.charEles);
  },
  beforeUnmount() {
    this.stopTimer();
    this.remove(this.fun);
  },
};
</script>

<style lang="scss" scoped>
$lines: 5; //行数
$line-height: 58px; //行高
$primary-color: #3295db;
$secondary-color: #f8f9fa;
$border-color: #e0e0e0;
$success-color: #95c590;
$warning-color: #ffc107;
$danger-color: #d55b60;

// 主容器
.typing-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

// 文本选择器样式
.text-selector {
  margin-bottom: 30px;

  .section-title {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
    text-align: center;
  }

  // 难度筛选控件
  .difficulty-filter {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 10px;

    .filter-label {
      font-weight: 500;
      color: #333;
      margin-right: 5px;
    }

    .level-buttons {
      display: flex;
      gap: 8px;
      background: #f1f3f4;
      padding: 4px;
      border-radius: 8px;
    }

    .level-button {
      padding: 6px 16px;
      border: none;
      border-radius: 6px;
      background: transparent;
      color: #666;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(50, 149, 219, 0.1);
        color: $primary-color;
      }

      &.active {
        background: $primary-color;
        color: white;
        box-shadow: 0 2px 4px rgba(50, 149, 219, 0.3);
      }

      &[data-level="初级"]:active {
        background: #28a745;
      }

      &[data-level="中级"]:active {
        background: #ffc107;
        color: #333;
      }

      &[data-level="高级"]:active {
        background: #dc3545;
      }
    }
  }

  // 文本选项
  .text-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 15px;
    max-height: calc(2 * (87px + 15px)); // 2行文本选项的高度（每行高度+间隙）
    overflow-y: auto; // 添加垂直滚动
    padding-right: 5px; // 为滚动条留出空间

    // 无文本提示
    .no-texts {
      grid-column: 1 / -1;
      text-align: center;
      padding: 40px 20px;
      background: #f8f9fa;
      border: 2px dashed #dee2e6;
      border-radius: 10px;

      p {
        color: #666;
        margin-bottom: 15px;
        font-size: 16px;
      }

      .reset-filter-btn {
        background: $primary-color;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.3s ease;

        &:hover {
          background: darken($primary-color, 10%);
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(50, 149, 219, 0.3);
        }
      }
    }

    .text-option {
      background: $secondary-color;
      border: 2px solid $border-color;
      border-radius: 10px;
      padding: 15px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: left;

      &:hover {
        border-color: $primary-color;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(50, 149, 219, 0.15);
      }

      &.active {
        border-color: $primary-color;
        background: rgba(50, 149, 219, 0.1);
        box-shadow: 0 4px 12px rgba(50, 149, 219, 0.2);
      }

      .text-title {
        font-weight: bold;
        color: #333;
        margin-bottom: 8px;
        font-size: 16px;
      }

      .text-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        color: #666;

        .text-length {
          background: #e9ecef;
          padding: 2px 8px;
          border-radius: 12px;
        }

        .text-level {
          padding: 2px 8px;
          border-radius: 12px;
          font-weight: 500;

          &[data-level="初级"] {
            background: #d4edda;
            color: #155724;
          }

          &[data-level="中级"] {
            background: #fff3cd;
            color: #856404;
          }

          &[data-level="高级"] {
            background: #f8d7da;
            color: #721c24;
          }
        }
      }
    }
  }
}

// 统计面板样式
.stats {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: $secondary-color;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;

  .stat-item {
    text-align: center;
    flex: 1;
    min-width: 100px;

    .stat-label {
      display: block;
      font-size: 14px;
      color: #666;
      margin-bottom: 5px;
      font-weight: 500;
    }

    .stat-value {
      display: block;
      font-size: 24px;
      font-weight: bold;
      color: $primary-color;
      font-family: "pt-mono", monospace;
    }
  }

  .reset-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .reset-btn {
    background: $primary-color;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
      background: darken($primary-color, 10%);
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(50, 149, 219, 0.3);
    }

    &:active {
      transform: translateY(0);
    }
  }
}

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
    border-color: $primary-color;
  }

  50% {
    border-color: transparent;
  }

  100% {
    border-color: $primary-color;
  }
}

// 为文本难度标签添加动态属性
.text-level {
  &[data-level="初级"] {
    background: #d4edda;
    color: #155724;
  }

  &[data-level="中级"] {
    background: #fff3cd;
    color: #856404;
  }

  &[data-level="高级"] {
    background: #f8d7da;
    color: #721c24;
  }
}

// 响应式设计
@media screen and (max-width: 768px) {
  .typing-container {
    padding: 10px;
  }

  .text-selector {
    .difficulty-filter {
      flex-direction: column;
      align-items: stretch;

      .filter-label {
        text-align: center;
        margin-right: 0;
      }

      .level-buttons {
        justify-content: center;

        .level-button {
          padding: 8px 12px;
          font-size: 13px;
        }
      }
    }

    .text-options {
      grid-template-columns: 1fr;
    }
  }

  .stats {
    flex-wrap: wrap;
    gap: 10px;
    padding: 10px;

    .stat-item {
      flex: 1;
      min-width: 80px;

      .stat-label {
        font-size: 12px;
      }

      .stat-value {
        font-size: 18px;
      }
    }

    .reset-btn {
      font-size: 12px;
      padding: 6px 12px;
    }
  }

  .paper {
    margin-bottom: 10px;
    padding: 5px 10px 15px 10px;
  }

  .paper .typing-box .lines {
    font-size: 20px;
  }
}
</style>