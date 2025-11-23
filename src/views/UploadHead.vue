<template>
  <div class="upload-head">
    <el-upload class="upload-image" action="/" single-file accept="image/jpeg, image/png, image/bmp" :multiple="false"
      :show-file-list="false" :auto-upload="false" :on-change="onChange">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    </el-upload>

    <img title="图像预览处" :src="base64" alt="图像预览处" style="float: left" />

    <el-dialog title="提示" :visible.sync="dialogVisible" :area="730" @close="handleClose" :close-on-click-modal="false">
      <div class="backImg" :style="{
        height: backHeight + 'px',
        width: backWidth + 'px',
        backgroundImage: `${url}`,
        backgroundSize: backgroundSize,
        backgroundPosition: `${backPosX}px ${backPosY}px`,
      }" @mousedown="startDrag" @mouseup="stopDrag">
        <div :class="['clipMask', cropMode]" :style="{
          height: cutBoxHeight + 'px',
          width: cutBoxWidth + 'px',
          top: marginY + 'px',
          left: marginX + 'px'
        }">
          <canvas ref="shapeCanvas" class="shapeCanvas"></canvas>
        </div>



      </div>

      {{ cropMode }}

      <div class="shapeSelection">
        <!-- 形状选择卡片 -->
        <div class="shapeCard" v-for="(label, type) in shapeMap" :key="type" :class="{ active: cropMode === type }"
          @click="cropMode = type">
          <span>{{ label }}</span>
        </div>
      </div>

      <div class="zoomSet">
        {{ zoomRatio }}
        <el-button icon="h-icon-zoom_in" class="rsbtn" v-repeat-click="zoomRatioAdd" />
        <el-slider v-model="zoomRatio" vertical :min="1" :max="5" :step="0.01" height="100px"></el-slider>
        <el-button icon="h-icon-zoom_out" class="rsbtn" v-repeat-click="zoomRatioDec" />
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="clipImg()">裁 剪</el-button>
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UploadHead",
  data() {
    return {
      //界面原始属性
      radius: 180, //截取圆的半径
      marginY: 0, //截取圆离上下边界的间隔
      //---------
      dialogVisible: false, //
      url: "",
      img: new Image(),
      backgroundSize: "",

      imgHeight: 0,
      imgWidth: 0,

      backPosX: 0, // 图片左侧与背景框左侧的距离
      backPosY: 0, // 图片顶部与背景框顶部的距离
      clickX: 0,
      clickY: 0,

      zoomRatio: 0,
      base64: "",

      cropMode: null,

      shapeMap: {
        rect: '矩形',
        circle: '圆形',
        triangle: '三角形',
        star: '五角星',
        heart: '心形',
        hexagon: '六边形',
        starOfDavid: '六芒星',
      }
    };
  },
  directives: {
    RepeatClick: {
      bind(el, binding, vnode) {
        let interval = null;
        let startTime;
        const handler = vnode.context[binding.expression].bind(); //() => vnode.context[binding.expression].apply();
        const clear = () => {
          if (new Date() - startTime < 100) {
            handler();
          }
          clearInterval(interval);
          interval = null;
        };
        el.addEventListener("mousedown", (e) => {
          if (e.button !== 0) return;
          startTime = new Date();
          document.addEventListener("mouseup", clear, { once: true });
          clearInterval(interval);
          interval = setInterval(handler, 100);
        });
      },
    },
  },
  computed: {
    // 截取框
    cutBoxHeight() {
      return this.radius * 2;
    },
    cutBoxWidth() {
      return this.radius * 2;
    },
    // 背景框
    backHeight() {
      return this.radius * 2;
    },
    backWidth() {
      return this.radius * 32 / 9;
    },
    marginX() {
      // (2r * 16 / 9 - 2r) / 2
      return this.radius * 7 / 9;
    },
    // 截取框的移动范围,计算缩放
    limitX() {
      return (
        this.marginX +
        this.cutBoxWidth -
        this.imgWidth * this.zoomRatio
      );
    },
    limitY() {
      return (
        this.marginY +
        this.cutBoxHeight -
        this.imgHeight * this.zoomRatio
      );
    },
  },
  watch: {
    zoomRatio() {
      this.zooming();
    },
    cropMode: {
      handler() {
        this.drawShapePath();
      },
    }
  },
  mounted() {
    // 组件挂载后初始化canvas
    this.$nextTick(() => {
      this.drawShapePath();
    });
  },
  methods: {
    //上传图片时触发
    onChange(file, fileList) {
      // 使用FileReader读取本地文件并生成预览URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        this.url = `url(${imageUrl})`;
        this.getImageSize(imageUrl);
      };
      reader.readAsDataURL(file.raw);
      fileList.shift();
    },
    //设置头像截取时，图像的初始大小及位置
    getImageSize(url) {
      this.img.src = url;
      // 加载完成获取宽高
      this.img.onload = () => {
        this.dialogVisible = true;
        this.$nextTick(() => {
          this.cropMode = 'circle';
        })
        let width = this.img.width;
        let height = this.img.height;
        if (width > height) {
          // 图片短边为高，截取框高为高，宽按比例算得
          width = this.cutBoxHeight * width / height;
          height = this.cutBoxHeight;
          this.backgroundSize = `auto ${this.cutBoxHeight}px`;
        } else {
          // 图片短边为宽，截取框宽为宽，高按比例算得
          height = (height * this.cutBoxWidth) / width;
          width = this.cutBoxWidth;
          this.backgroundSize = `${this.cutBoxWidth}px`;
        }
        this.backPosY = (this.backHeight - height) / 2;
        this.backPosX = (this.backWidth - width) / 2
        this.imgHeight = height;
        this.imgWidth = width;
      };
    },
    //移动图像方法
    startDrag(e) {
      e.preventDefault();
      this.clickX = e.pageX;
      this.clickY = e.pageY;
      document.addEventListener("mousemove", this.dragPic);
      document.addEventListener("mouseup", this.stopDrag);
    },
    stopDrag() {
      document.removeEventListener("mousemove", this.dragPic);
      document.removeEventListener("mouseup", this.stopDrag);
    },
    dragPic(e) {
      let moveX = e.pageX - this.clickX;
      let moveY = e.pageY - this.clickY;
      this.clickX = e.pageX;
      this.clickY = e.pageY;
      this.handleMoveX(moveX);
      this.handleMoveY(moveY);
    },
    handleMoveX(moveX) {
      if (this.backPosX + moveX > this.marginX) {
        return;
      }
      if (this.backPosX + moveX < this.limitX) {
        return;
      }
      this.backPosX += moveX;
    },
    handleMoveY(moveY) {
      if (this.backPosY + moveY > this.marginY) {
        return;
      }
      if (this.backPosY + moveY < this.limitY) {
        return;
      }
      this.backPosY += moveY;
    },

    // 在canvas上绘制形状路径
    drawShapePath() {
      const canvas = this.$refs.shapeCanvas;
      if (!canvas) return;

      // 设置canvas大小与clipMask一致
      canvas.width = this.cutBoxWidth;
      canvas.height = this.cutBoxHeight;

      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 先填充整个canvas为半透明黑色
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'; // 和clipMask属性保持一致
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // 保存当前状态
      ctx.save();
      ctx.beginPath();

      // 根据当前选中的形状绘制路径
      if (this.cropMode === 'rect') {
        ctx.rect(0, 0, this.cutBoxWidth, this.cutBoxHeight);
      } else if (this.cropMode === 'circle') {
        this.generateCirclePath(this.radius, ctx);
      } else if (this.cropMode === 'triangle') {
        this.generateTrianglePath(this.radius, ctx);
      } else if (this.cropMode === 'star') {
        this.generatePentagramPath(this.radius, ctx);
      } else if (this.cropMode === 'heart') {
        this.generateHeartPath(this.radius, ctx);
      } else if (this.cropMode === 'hexagon') {
        this.generateHexagonPath(this.radius, ctx);
      } else if (this.cropMode === 'starOfDavid') {
        this.generateStarOfDavidPath(this.radius, ctx);
      }

      // 闭合路径并裁剪
      ctx.closePath();
      ctx.clip();
      
      // 清除裁剪区域内的半透明背景，露出原始图像
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 恢复状态并重新绘制边框
      ctx.restore();
      ctx.beginPath();
      
      // 重新绘制形状路径以显示边框
      if (this.cropMode === 'rect') {
        ctx.rect(0, 0, this.cutBoxWidth, this.cutBoxHeight);
      } else if (this.cropMode === 'circle') {
        this.generateCirclePath(this.radius, ctx);
      } else if (this.cropMode === 'triangle') {
        this.generateTrianglePath(this.radius, ctx);
      } else if (this.cropMode === 'star') {
        this.generatePentagramPath(this.radius, ctx);
      } else if (this.cropMode === 'heart') {
        this.generateHeartPath(this.radius, ctx);
      } else if (this.cropMode === 'hexagon') {
        this.generateHexagonPath(this.radius, ctx);
      } else if (this.cropMode === 'starOfDavid') {
        this.generateStarOfDavidPath(this.radius, ctx);
      }
      
      // 设置绘制样式并描边
      ctx.strokeStyle = '#4CAF50';
      ctx.lineWidth = 2;
      ctx.closePath();
      ctx.stroke();
    },
    //放缩图像方法相关
    zoomRatioAdd() {
      this.zoomRatio += 0.01;
    },
    zoomRatioDec() {
      this.zoomRatio -= 0.01;
    },
    zooming() {
      let ratio = this.zoomRatio;
      let width = this.imgWidth * ratio;
      let height = this.imgHeight * ratio;
      this.backgroundSize = width > height ? `auto ${height}px` : `${width}px`;

      if (this.backPosX < this.limitX) {
        this.backPosX = this.limitX;
      }
      if (this.backPosY < this.limitY) {
        this.backPosY = this.limitY;
      }
    },
    //关闭截取窗口的回调
    handleClose() {
      console.log("原始尺寸:", this.img.width, this.img.height);
      console.log("比例尺寸:", this.imgWidth, this.imgHeight);
      console.log(
        "放缩尺寸：",
        this.imgWidth * this.zoomRatio,
        this.imgHeight * this.zoomRatio
      );
      this.zoomRatio = 0;
    },
    clipImg() {
      let zoomWidth = this.imgWidth * this.zoomRatio;
      let zoomHeight = this.imgHeight * this.zoomRatio;
      let canvas = document.createElement("canvas"); //不append到html中，会视为变量，随GC回收
      canvas.width = this.cutBoxWidth;
      canvas.height = this.cutBoxHeight;
      let naturalWidth = this.img.width;
      let naturalHeight = this.img.height;
      if (canvas.getContext) {
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, this.cutBoxWidth, this.cutBoxHeight);
        ctx.beginPath();

        // ctx.arc(this.radius, this.radius, this.radius, 0, 2 * Math.PI, false);

        // shapeMap: {
        //   rect: '矩形',
        //   circle: '圆形',
        //   triangle: '三角形',
        //   star: '五角星',
        //   heart: '心形',
        //   hexagon: '六边形',
        //   starOfDavid: '六芒星',
        // }

        // ctx.rect(0, 0, this.cutBoxWidth, this.cutBoxHeight);
        if (this.cropMode === 'rect') {
          ctx.rect(0, 0, this.cutBoxWidth, this.cutBoxHeight);
        } else if (this.cropMode === 'circle') {
          this.generateCirclePath(this.radius, ctx);
        } else if (this.cropMode === 'triangle') {
          this.generateTrianglePath(this.radius, ctx);
        } else if (this.cropMode === 'star') {
          this.generatePentagramPath(this.radius, ctx);
        } else if (this.cropMode === 'heart') {
          this.generateHeartPath(this.radius, ctx);
        } else if (this.cropMode === 'hexagon') {
          this.generateHexagonPath(this.radius, ctx);
        } else if (this.cropMode === 'starOfDavid') {
          this.generateStarOfDavidPath(this.radius, ctx);
        }
        // 
        ctx.clip();

        ctx.drawImage(
          this.img,
          0,
          0,
          naturalWidth,
          naturalHeight,
          this.backPosX - this.marginX,
          this.backPosY - this.marginY,
          zoomWidth,
          zoomHeight
        );
      }
      this.base64 = canvas.toDataURL("image/png", 0.8);
      console.log(this.base64);
    },


    // 生成三角形路径
    generateTrianglePath(radius, ctx) {
      // 圆的外切矩形尺寸：宽高均为2*radius，中心点与圆心重合
      const rectWidth = 2 * radius;
      // const rectHeight = 2 * radius;
      const centerX = radius; // 矩形中心x坐标
      const centerY = radius; // 矩形中心y坐标

      // 在正方形中，最大的正三角形边长为正方形的边长
      const triangleSide = rectWidth;
      const triangleHeight = (Math.sqrt(3) / 2) * triangleSide;

      // 计算正三角形的外接矩形位置，使其中心与截图框中心重合
      // 正三角形的外接矩形：宽度=边长，高度=三角形高度
      const boundingRectHeight = triangleHeight;

      // 外接矩形左上角坐标，使其中心与截图框中心重合
      const boundingRectY = centerY - (boundingRectHeight / 2);

      // 上顶点y坐标 = 外接矩形左上角y坐标
      const offsetY = boundingRectY;

      let shapePath = [
        // 上顶点
        { x: centerX, y: offsetY },
        // 左下顶点
        { x: centerX - triangleSide / 2, y: offsetY + triangleHeight },
        // 右下顶点
        { x: centerX + triangleSide / 2, y: offsetY + triangleHeight }
      ];

      console.log(shapePath)

      ctx.moveTo(shapePath[0].x, shapePath[0].y);
      for (let i = 1; i < shapePath.length; i++) {
        ctx.lineTo(shapePath[i].x, shapePath[i].y);
      }

    },

    // 生成圆形路径
    generateCirclePath(radius, ctx) {
      // 圆的直径等于正方形边长
      // const diameter = 2 * radius;
      const centerX = radius;
      const centerY = radius;

      // 绘制圆形，圆心与截图框中心重合
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    },

    // 生成五角星路径
    generatePentagramPath(radius, ctx) {
      // 五角星的外接圆半径
      const outerRadius = radius * 1.05;
      // 五角星的内接圆半径（内部尖角到中心的距离）
      const innerRadius = outerRadius * 0.382; // 黄金比例的倒数约为0.382

      const centerX = radius;
      const centerY = radius * 1.05;

      // 计算五角星顶点
      let shapePath = [];

      // 五角星有10个点：5个外角点和5个内角点交替
      for (let i = 0; i < 10; i++) {
        // 计算当前角度，从顶部开始（-Math.PI/2），每次旋转Math.PI/5
        const angle = -Math.PI / 2 + (i * Math.PI / 5);
        // 根据是奇数还是偶数点，选择不同的半径
        const currentRadius = i % 2 === 0 ? outerRadius : innerRadius;

        shapePath.push({
          x: centerX + currentRadius * Math.cos(angle),
          y: centerY + currentRadius * Math.sin(angle)
        });
      }

      // 绘制五角星
      ctx.moveTo(shapePath[0].x, shapePath[0].y);
      for (let i = 1; i < shapePath.length; i++) {
        ctx.lineTo(shapePath[i].x, shapePath[i].y);
      }
    },

    // 生成心形路径
    generateHeartPath(radius, ctx) {
      // 心形的绘制 - 调整为正方形中最大尺寸
      const centerX = radius;
      const centerY = radius;
      const size = radius * 1.4; // 增大尺寸以达到正方形中的最大尺寸

      // 心形由两个圆弧和一条曲线组成
      // 左半部分
      ctx.moveTo(centerX, centerY - size * 0.25);
      ctx.bezierCurveTo(
        centerX + size * 0.5, centerY - size,
        centerX + size * 1.3, centerY + size * 0.1,
        centerX, centerY + size * 0.7
      );
      // 右半部分
      ctx.bezierCurveTo(
        centerX - size * 1.3, centerY + size * 0.1,
        centerX - size * 0.5, centerY - size,
        centerX, centerY - size * 0.25
      );
    },

    // 生成正六边形路径
    generateHexagonPath(radius, ctx) {
      const centerX = radius;
      const centerY = radius;
      const outerRadius = radius; // 六边形的外接圆半径

      let shapePath = [];

      // 计算六边形的6个顶点
      for (let i = 0; i < 6; i++) {
        // 从顶部开始，每次旋转60度（Math.PI/3）
        const angle = -Math.PI / 2 + (i * Math.PI / 3);
        shapePath.push({
          x: centerX + outerRadius * Math.cos(angle),
          y: centerY + outerRadius * Math.sin(angle)
        });
      }

      // 绘制六边形
      ctx.moveTo(shapePath[0].x, shapePath[0].y);
      for (let i = 1; i < shapePath.length; i++) {
        ctx.lineTo(shapePath[i].x, shapePath[i].y);
      }
    },

    // 生成六芒星路径
    generateStarOfDavidPath(radius, ctx) {
      const centerX = radius;
      const centerY = radius;
      const outerRadius = radius;

      let shapePath = [];

      // 六芒星由两个正三角形组成：一个向上，一个向下
      // 计算12个点，形成六芒星的六个顶点
      for (let i = 0; i < 12; i++) {
        // 计算当前角度，从顶部开始，每次旋转30度（Math.PI/6）
        const angle = -Math.PI / 2 + (i * Math.PI / 6);
        // 根据点的奇偶性选择不同半径，形成六芒星的交错顶点
        const currentRadius = i % 2 === 0 ? outerRadius : outerRadius / 2;
        shapePath.push({
          x: centerX + currentRadius * Math.cos(angle),
          y: centerY + currentRadius * Math.sin(angle)
        });
      }

      // 绘制六芒星
      ctx.moveTo(shapePath[0].x, shapePath[0].y);
      for (let i = 1; i < shapePath.length; i++) {
        ctx.lineTo(shapePath[i].x, shapePath[i].y);
      }
    }

  },
};
</script>

<style lang="scss" scoped>
$radius: 180px; //截取圆的半径
$marginX: 140px; //截取圆离左右边界的间隔
$marginY: 0; //截取圆离上下边界的间隔

.backImg {
  cursor: pointer;
  overflow: hidden;
  background-repeat: no-repeat;
  border: 1px solid red;
}

.clipMask {
  position: relative;
  box-shadow: 0px 0px 0px 500px rgba(0, 0, 0, 0.4);
  border: 1px dashed green;
}

.shapeCanvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: transparent;
}

.zoomSet {
  width: 40px;
  height: 200px;
  padding-left: 3px;
  background-color: #ffffff0f;
  position: absolute;
  right: 30px;
  bottom: 90px;
  color: #ffffff;
  font-weight: 600;

  .rsbtn {
    color: rgb(255, 255, 255);
    margin: 10px 2px;
  }


}

// 形状选择卡片样式
.shapeSelection {
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-right: 20px;


  .shapeCard {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 80px;

    &.active {
      background-color: #4CAF50;
      color: white;
    }
  }
}
</style>