<template>
  <div class="upload-head">
    <el-upload
      class="upload-image"
      action="/"
      single-file
      accept="image/jpeg, image/png, image/bmp"
      :multiple="false"
      :show-file-list="false"
      :auto-upload="false"
      :on-change="onChange"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    </el-upload>

    <img
      title="图像预览处"
      :src="base64"
      alt="图像预览处"
      style="float: left"
    />

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :area="730"
      @close="handleClose"
    >
      <div
        class="backImg"
        :style="{
          backgroundImage: `${url}`,
          backgroundSize: backgroundSize,
          backgroundPosition: `${backPosX}px ${backPosY}px`,
        }"
        @mousedown="startDrag"
        @mouseup="stopDrag"
      >
        <div class="clipMask"></div>
      </div>

      <div class="zoomSet">
        <el-button
          icon="h-icon-zoom_in"
          class="rsbtn"
          v-repeat-click="zoomRatioAdd"
        />
        <el-slider
          v-model="zoomRatio"
          vertical
          :max="100"
          height="100px"
        ></el-slider>
        <el-button
          icon="h-icon-zoom_out"
          class="rsbtn"
          v-repeat-click="zoomRatioDec"
        />
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
      radius: 185, //截取圆的半径
      marginX: 168, //截取圆离左右边界的间隔
      marginY: 18, //截取圆离上下边界的间隔
      //---------
      dialogVisible: false, //
      url: "",
      img: new Image(),
      backgroundSize: "",

      imgHeight: 0,
      imgWidth: 0,

      backPosX: 150,
      backPosY: 0,
      clickX: 0,
      clickY: 0,

      zoomRatio: 0,
      base64: "",
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
    cutBoxHeight() {
      return 2 * (this.radius + this.marginY);
    },
    cutBoxWidth() {
      return 2 * (this.radius + this.marginX);
    },
    limitX() {
      return (
        this.marginX +
        2 * this.radius -
        this.imgWidth * (this.zoomRatio / 100 + 1)
      );
    },
    limitY() {
      return (
        this.marginY +
        2 * this.radius -
        this.imgHeight * (this.zoomRatio / 100 + 1)
      );
    },
  },
  watch: {
    zoomRatio() {
      this.zooming();
    },
  },
  methods: {
    //上传图片时触发
    onChange(file, fileList) {
      console.log(file, fileList);
      this.url = `url(${file.url})`;
      this.getImageSize(file.url);
      fileList.shift();
    },
    //设置头像截取时，图像的初始大小及位置
    getImageSize(url) {
      this.img.src = url;
      window.iii = this.img;
      // 加载完成获取宽高
      this.img.onload = () => {
        this.dialogVisible = true;
        let width = this.img.width;
        let height = this.img.height;
        if (width > height) {
          width = (width * this.cutBoxHeight) / height;
          height = this.cutBoxHeight;
          this.backgroundSize = `auto ${this.cutBoxHeight}px`;
          this.backPosX = this.marginX + this.radius - width / 2;
          this.backPosY = 0;
        } else {
          height = (height * this.cutBoxHeight) / width;
          width = this.cutBoxHeight;
          this.backgroundSize = `${this.cutBoxHeight}px`;
          this.backPosY = this.marginY + this.radius - height / 2;
          this.backPosX = this.marginX - this.marginY;
        }
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
        return false;
      }
      if (this.backPosX + moveX < this.limitX) {
        return false;
      }
      this.backPosX += moveX;
    },
    handleMoveY(moveY) {
      if (this.backPosY + moveY > this.marginY) {
        return false;
      }
      if (this.backPosY + moveY < this.limitY) {
        return false;
      }
      this.backPosY += moveY;
    },
    //放缩图像方法相关
    zoomRatioAdd() {
      this.zoomRatio++;
    },
    zoomRatioDec() {
      this.zoomRatio--;
    },
    zooming() {
      let ratio = this.zoomRatio / 100 + 1;
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
        this.imgWidth * (this.zoomRatio / 100 + 1),
        this.imgHeight * (this.zoomRatio / 100 + 1)
      );
      this.zoomRatio = 0;
    },
    clipImg() {
      let zoomWidth = this.imgWidth * (this.zoomRatio / 100 + 1);
      let zoomHeight = this.imgHeight * (this.zoomRatio / 100 + 1);
      let canvas = document.createElement("canvas"); //不append到html中，会视为变量，随GC回收
      canvas.width = 2 * this.radius;
      canvas.height = 2 * this.radius;
      let naturalWidth = this.img.width;
      let naturalHeight = this.img.height;
      if (canvas.getContext) {
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, 2 * this.radius, 2 * this.radius);
        ctx.beginPath();
        ctx.arc(this.radius, this.radius, this.radius, 0, 2 * Math.PI, false);
        ctx.clip();
        ctx.drawImage(
          this.img,
          0,
          0,
          naturalWidth,
          naturalHeight,
          this.backPosX - 168,
          this.backPosY - 18,
          zoomWidth,
          zoomHeight
        );
      }
      this.base64 = canvas.toDataURL("image/png", 0.8);
      console.log(this.base64);
    },
  },
};
</script>

<style lang="scss" scoped>
$radius: 185px; //截取圆的半径
$marginX: 168px; //截取圆离左右边界的间隔
$marginY: 18px; //截取圆离上下边界的间隔
.backImg {
  height: 2 * ($radius + $marginY); //406px;
  width: 2 * ($radius + $marginX); //706px;
  cursor: pointer;
  overflow: hidden;
  background-repeat: no-repeat;
}
.clipMask {
  position: relative;
  top: $marginY;
  left: $marginX;
  width: 2 * $radius;
  height: 2 * $radius;
  border-radius: $radius;
  box-shadow: 0px 0px 0px 500px rgba(0, 0, 0, 0.4);
  border: 2px solid #ffffff80;
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
</style>