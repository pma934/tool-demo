<template>
  <div id="login">
    <div class="account-container">
      <div class="left-content-pc">
        <div class="login-container">
          <div class="login-nav">
            <el-select
              v-model="languge"
              placeholder="请选择"
              @change="search"
              @blur="blurEvent"
              @focus="focusEvent"
              class="language-select"
            >
              <el-option
                v-for="(languge, key) in languges"
                :key="key"
                :label="languge"
                :value="languge"
              ></el-option>
            </el-select>

            <div title="Hik-ProConnect" class="logo-container">
              <i class="icon-login_logo"></i>
            </div>

            <div class="select-countries-box">
              <div class="welcome-country">
                <span data-v-2f8ecebc title="歡迎" class="welcome ellipsis">歡迎</span>
                <span data-v-2f8ecebc :title="country" class="country-text ellipsis">{{country}}</span>
              </div>
              <el-select v-model="country" class="country-select">
                <el-option
                  v-for="(country, key) in countries"
                  :key="key"
                  :label="country"
                  :value="country"
                ></el-option>
              </el-select>
            </div>

            <el-form
              :rules="rules"
              ref="form"
              label-position="top"
              :model="user"
              label-width="120px"
              class="login-form"
            >
              <el-form-item label="电子邮件" prop="name" hide-star>
                <el-input tips="1 至 128 個字元，請使用格式：example@domain.com" v-model="user.name"></el-input>
              </el-form-item>

              <el-form-item label="密码" prop="password" hide-star>
                <el-input v-model="user.password" :type="password">
                  <i
                    slot="suffix"
                    class="el-input__icon"
                    :class="passwordIcon"
                    @mousedown="onMousedownClick"
                    @mouseup="onMouseupClick"
                  ></i>
                </el-input>
              </el-form-item>

              <div class="link-button-line">
                <el-button title="忘記密碼" type="link">忘記密碼</el-button>
                <el-button title="立即註冊" type="link">立即註冊</el-button>
              </div>

              <el-button type="primary" :radius="true" class="login-button" @click="onLogin">登入</el-button>

              <div class="login-tip">
                <i class="h-icon-tip_info orange-color"></i>
                <span class="tips">Hik-ProConnect 為安裝商使用的平台，帳戶與 Hik-Connect 帳戶各自獨立</span>
              </div>
            </el-form>

            <el-button type="default" :radius="true" title="體驗 Demo" class="touristMode-button">
              <span class="ellipsis">體驗 Demo</span>
              <i class="h-icon-angle_right_sm floatRight"></i>
            </el-button>
          </div>
        </div>
      </div>
      <div class="right-content">
        <div class="background-container icon-img_login_bg">
          <div>
            <div class="bg-title">
              <p>幫助您有效率地管理資安防護業務的入口網站</p>
            </div>

            <ul>
              <el-carousel height="446px" indicator-position="none" arrow="never" :interval="2000">
                <el-carousel-item v-for="(img,key) in imgs" :key="key">
                  <li>
                    <img :src="img" />
                  </li>
                </el-carousel-item>
              </el-carousel>
            </ul>

            <div class="bg-footer">
              <div class="dimensional-ico">
                <img src="../assets/二维码.png" alt srcset />
              </div>
              <div data-v-8e408530 class="text">
                <p data-v-8e408530 class="code">掃描二維碼下載行動用戶端，或前往應用商店下載</p>
                <p data-v-8e408530 class="iso-certification">
                  <img
                    data-v-8e408530
                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMThweCIgaGVpZ2h0PSIyMnB4IiB2aWV3Qm94PSIwIDAgMTggMjIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDY0ICg5MzUzNykgLSBodHRwczovL3NrZXRjaC5jb20gLS0+CiAgICA8dGl0bGU+aWNvbl9ob21lX2NlcnRpZmljYXRpb248L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0i5LqM57u056CB5LiL6L295YWl5Y+j44CBSVNP5qCH6K+GIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iMTUt5YWz5LqOIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtOTk2LjAwMDAwMCwgLTU4My4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Imljb25faG9tZV9jZXJ0aWZpY2F0aW9uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg5OTMuMDAwMDAwLCA1ODIuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8Zz4KICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0i55+p5b2iIiBmaWxsLW9wYWNpdHk9IjAiIGZpbGw9IiNEOEQ4RDgiIHBvaW50cz0iMCAwIDI0IDAgMjQgMjQgMCAyNCI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMuMDAwMDAwLCAxLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uELTIiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTAuNzQyMjE2Nzc0LDIuMjAzMTc5MzQgTDguMjI2NjUwMzIsMC4yMDYzMjk5NTQgQzguNzMzMzU0NjYsMC4wNzExNDEwNjYzIDkuMjY2NjQ1MzQsMC4wNzExNDEwNjYzIDkuNzczMzQ5NjgsMC4yMDYzMjk5NTQgTDE3LjI1Nzc4MzIsMi4yMDMxNzkzNCBDMTcuNjk1NDc3MiwyLjMxOTk1NjI1IDE4LDIuNzE2Mzc3ODIgMTgsMy4xNjkzODIxMiBMMTgsMTIuODQ1OTgwOCBDMTgsMTQuNDM1MzU3NyAxNy4yNDQzNTYyLDE1LjkzMDA2MjQgMTUuOTY0NDU5NCwxNi44NzIzOTExIEw5LjU5Mjg5MTg5LDIxLjU2MzQ4MTIgQzkuMjQwMjYzNTUsMjEuODIzMTA1MSA4Ljc1OTczNjQ1LDIxLjgyMzEwNTEgOC40MDcxMDgxMSwyMS41NjM0ODEyIEwyLjAzNTU0MDU3LDE2Ljg3MjM5MTEgQzAuNzU1NjQzNzkyLDE1LjkzMDA2MjQgMCwxNC40MzUzNTc3IDAsMTIuODQ1OTgwOCBMMCwzLjE2OTM4MjEyIEMwLDIuNzE2Mzc3ODIgMC4zMDQ1MjI3NjEsMi4zMTk5NTYyNSAwLjc0MjIxNjc3NCwyLjIwMzE3OTM0IFoiIGlkPSLnn6nlvaIiIGZpbGw9IiMyQUI3NzYiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMS44NzU4NDMzLDcuMTk0OTI1NDUgQzEyLjE0MzY1NzksNi45MjM5NDEwMyAxMi41NjU1ODkxLDYuOTM3MTEzNyAxMi44MTgyNTMsNy4yMjQzNDc0MyBDMTMuMDQyODQzMSw3LjQ3OTY2NjMgMTMuMDU4MDkzMSw3Ljg2NTU4NTg1IDEyLjg3MDYxNDYsOC4xMzg1MTQ2OSBMMTIuNzkwODIwMSw4LjIzNTA5MDggTDguMDgxNjQ4MDUsMTMgTDUuMTk2OTYyNzUsOS45MjgzNDk5MiBDNC45MzU2Nzc0Myw5LjY1MDEyOTk0IDQuOTM0MTU3MzgsOS4xOTc0MTU5OCA1LjE5MzU2NzYyLDguOTE3MTg0OTcgQzUuNDI0MTU0NTEsOC42NjgwOTA3NCA1Ljc4MzI5MjA0LDguNjM5MTI1NDkgNi4wNDM3NjI2Niw4LjgzMTE2Njc4IEw2LjEzNjM3MDM0LDguOTEzNTQzNjcgTDguMTAzOTk5MzMsMTEuMDA5NzU2OCBMMTEuODc1ODQzMyw3LjE5NDkyNTQ1IFoiIGlkPSLot6/lvoQtOSIgZmlsbD0iI0ZGRkZGRiIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="
                    class="iso-img"
                  />已通過 ISO27001 認證
                </p>
                <p data-v-8e408530 class="copyright">© 2020 杭州海康威視技術股份有限公司版權所有</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginApi from "@/api/login.js";

export default {
  name: "Login",
  data() {
    return {
      languge: "语言二",
      languges: ["语言一", "语言二", "语言三", "语言四"],
      country: "城市一",
      countries: ["城市一", "城市二", "城市三", "城市四"],
      password: "password",
      passwordIcon: "h-icon-password_unvisible",
      user: {
        name: "",
        password: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
      imgs: [
        "http://10.19.133.122/img/img_login_background_1.9a94a41c.svg",
        "http://10.19.133.122/img/img_login_background_2.037b08a9.svg",
        "http://10.19.133.122/img/img_login_background_3.8799bb8b.svg",
        "http://10.19.133.122/img/img_login_background_4.e7c74e18.svg",
      ],
    };
  },
  created() {},
  mounted() {},
  activited() {},
  update() {},
  beforeRouteUpdate() {},
  methods: {
    async onLogin() {
      let params = {
        email: this.user.name,
        password: this.user.password,
        loginType: 2,
        passwordType: 0,
      };
      const [data, err, res] = await LoginApi.login(params).finally(() => {
        console.log("login over");
      });
      console.log(data, err, res);
    },
    search() {
      console.log("选中值发生变化时触发", arguments, this.languge);
    },
    blurEvent() {
      console.log("失焦时触发", arguments);
    },
    focusEvent() {
      console.log("聚焦时触发", arguments);
    },
    onMousedownClick() {
      console.log("按下回调");
      this.password = "text";
      this.passwordIcon = "h-icon-password_visible";
    },
    onMouseupClick() {
      console.log("松开回调");
      this.password = "password";
      this.passwordIcon = "h-icon-password_unvisible";
    },
  },
  filter: {},
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
#login {
  height: 100%;
  text-align: initial;
}

.account-container {
  display: flex;
  height: 100%;
  .left-content-pc {
    width: 40%;
    min-width: 350px;
    height: 100%;
    min-height: 860px;
  }
  .right-content {
    background-color: darkgrey;
    flex: 1;
    min-height: 860px;
    min-width: 700px;
    .background-container {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      height: 100%;
      width: 100%;
      background-color: #1d2036;
      min-height: 860px;
      ul {
        height: 446px;
        width: 100%;
        position: relative;
        margin: 32px 0;
        li {
          position: absolute;
          text-align: center;
          width: 100%;
          height: 100%;
          img {
            width: 620px;
            height: 442px;
          }
        }
      }
      .bg-title {
        font-weight: 700;
        font-size: 35px;
        color: #fff;
      }
      .bg-footer {
        text-align: center;
        .dimensional-ico {
          margin: auto;
          height: 114px;
          width: 114px;
          background-color: white;
          padding: 10px;
        }
        .text {
          display: inline-block;
          margin-top: 16px;
          text-align: center;
          .code {
            color: #fff;
            margin-bottom: 14px;
          }
          .iso-certification {
            display: flex;
            align-items: center;
            justify-content: center;
            color: hsla(0, 0%, 100%, 0.6);
            margin-top: 40px;
            margin-bottom: 8px;
            .iso-img {
              margin-right: 8px;
            }
          }
          .copyright {
            color: #fff;
            opacity: 0.6;
          }
        }
      }
    }
  }
}

.login-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-nav {
    .language-select {
      width: 160px;
      height: 40px;
      position: absolute;
      top: 16px;
      right: 16px;
    }
    .login-form {
      margin-top: 51px;
      .login-button {
        font-weight: 600;
        font-size: 16px;
        color: #fff;
        letter-spacing: 0;
        line-height: 24px;
        height: 40px;
        margin-left: 0;
        width: 100%;
        max-width: 342px;
        border-radius: 20px;
      }
      .login-tip {
        width: 342px;
        margin-top: 8px;
        position: relative;
        .orange-color {
          color: #ff9200;
          font-size: 24px;
          position: absolute;
          top: -2px;
          cursor: default;
        }
        .tips {
          margin-left: 24px;
          display: inline-block;
          width: 318px;
          font-size: 13px;
          color: rgba(0, 0, 0, 0.5);
          letter-spacing: 0;
          line-height: 18px;
          vertical-align: middle;
        }
      }
    }
    .touristMode-button {
      height: 40px;
      display: block;
      margin: 84px auto 0 auto;
      padding-right: 32px;
      min-width: 224px;
      max-width: 300px;
      border: 1px solid rgba(0, 0, 0, 0.3);
      border-radius: 20px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.7);
      line-height: 24px;
      .ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .floatRight {
        position: absolute;
        right: 8px;
      }
    }
  }
}

.logo-container {
  font-size: 0;
}

.select-countries-box {
  margin-top: 24px;
  position: relative;
  &,
  .welcome-country {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .country-select {
    top: 0;
    right: 0;
    width: 100%;
  }
  .welcome-country {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    background: #fff;
    right: 36px;
    pointer-events: none;
    .welcome {
      font-weight: 600;
      font-size: 18px;
      line-height: 24px;
      color: rgba(0, 0, 0, 0.7);
      pointer-events: initial;
    }
    .ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .country-text {
      line-height: 40px;
      color: rgba(0, 0, 0, 0.7);
      cursor: pointer;
    }
  }
}

.link-button-line {
  display: flex;
  justify-content: space-between;
  top: -20px;
  position: relative;
}
</style>

<style>
.select-countries-box .el-input__inner {
  border-width: 0;
  font-size: 18px;
}
.el-form .el-form-item__label-text {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.7);
  font-weight: 600;
}
</style>