<template></template>

<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      fixStyle: "",
      username: "",
      password: ""
    };
  },
  methods: {
    keyDown(e) {
      //如果是回车则执行登录方法
      if (e.keyCode == 13) {
        this.handleOnClickLogin();
      }
    },
    handleOnClickLogin(code, url) {
      // this.spin = true;
      // console.log(code);
      // console.log(url);
      axios({
        url: apiPath + "/login",
        // url: `${apiPath}/login`,
        method: "post",
        data: {
          code: code,
          url: url
        }
      })
        .then(res => {
          // this.spin = false;

          if (res.status == 200) {
            localStorage.setItem("authority", res.data.data[0].authority);
            localStorage.setItem("username", res.data.data[0].username);
            localStorage.setItem("userID", this.username);
            localStorage.setItem("email", res.data.data[0].email);
            sessionStorage.setItem("userID", this.username);
            this.identity = res.data.data[0].authority;

            this.loginmessage();
            this.$router.go(-1);
            this.$Message.success({
              content: `登陆成功`
            });
          } else {
          }
        })
        .catch(err => {
          this.spin = false;
          this.$Notice.warning({ title: `发生错误：${err}` });
        });
    },
    // handleOnClickLogin() {
    //   // this.loading = true;
    //   var params = new URLSearchParams();
    //   if (this.username == "" || this.password == "") {
    //     this.$Message.warning({
    //       content: `请填写完整的登录信息`
    //     });
    //     return;
    //   }
    //   params.append("username", this.username);
    //   params.append("password", this.password);
    //   axios
    //     .post(`${apiPath}/login`, params)
    //     .then(res => {
    //       if (res.status == 200) {
    //         localStorage.setItem("authority", res.data.data[0].authority);
    //         localStorage.setItem("username", res.data.data[0].username);
    //         localStorage.setItem("userID", this.username);
    //         localStorage.setItem("email", res.data.data[0].email);
    //         sessionStorage.setItem("userID", this.username);
    //         this.identity = res.data.data[0].authority;

    //         this.loginmessage();
    //         this.$router.go(-1);
    //         this.$Message.success({
    //           content: `登陆成功`
    //         });
    //       } else {
    //       }
    //     })
    //     .catch(err => {
    //       this.$Message.warning({ content: `账号或密码出错` });
    //     });
    // },
    loginmessage() {
      let URL = `${apiPath}/user/getEmailAndPhone`;
      let userId = localStorage.getItem("userID");
      axios({
        url: URL,
        method: "get",
        params: {
          userId: userId
        }
      })
        .then(res => {
          if (res.data.code === 200) {
            localStorage.setItem("email", res.data.data.email);
            localStorage.setItem("phone", res.data.data.phone);
          } else {
            this.$Message.warning({
              content: `出错，提示：${res.data.msg}`
            });
          }
        })
        .catch(err => {
          // this.$Message.warning({ title: `出错，提示：${err}` });
        });
    }
    // loginmessage() {
    //   let URL = `${apiPath}/user/getEmailAndPhone`;
    //   let userId = localStorage.getItem("userID");
    //   axios({
    //     url: URL,
    //     method: "get",
    //     params: {
    //       userId: userId
    //     }
    //   })
    //     .then(res => {
    //       if (res.data.code === 200) {
    //         localStorage.setItem("email", res.data.data.email);
    //         localStorage.setItem("phone", res.data.data.phone);
    //       } else {
    //         this.$Message.warning({
    //           content: `出错，提示：${res.data.msg}`
    //         });
    //       }
    //     })
    //     .catch(err => {
    //       // this.$Message.warning({ title: `出错，提示：${err}` });
    //     });
    // }
  },
  mounted() {
    window.addEventListener("keydown", this.keyDown);
    let token = localStorage.getItem("token");
    let logout = localStorage.getItem("logout");
    if (token) {
      this.handleOnClickLogin("", "");
    } else if (logout == "comfirm") {
      console.log(logout);
      localStorage.removeItem("logout");
      window.location.href =
        "https://oauth.shu.edu.cn/oauth/logout?retUrl=" + window.location.href;
    } else {
      let code = this.$route.query.code;
      if (code) {
        this.handleOnClickLogin(code, document.location.href.split("?")[0]);
      } else {
        document.location.href =
          "https://oauth.shu.edu.cn/oauth/authorize?response_type=code&client_id=Tp8uecHJi00aHlpufk8Fqp2A_2zpaKzS" +
          "&redirect_uri=http://writingcenter.shu.edu.cn/login" +
          "&scope=1";
      }
    }
  },
  created() {
    // this.keyupEnter();
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyDown, false);
  }
};
</script>

<style scoped lang="scss">
@import "./login.scss";
</style>

<style lang="scss">
.login-box {
  .ivu-input {
    // color: #f8f8f9ab;
  }
}

.ivu-select-selection {
  background-color: rgba(19, 15, 15, 0) !important;
}

.ivu-select-selected-value {
  background-color: transparent;
  color: #f8f8f9ab;
}

.ivu-select-arrow {
  color: #f8f8f9ab;
}
</style>
<style lang="scss">
.footer {
  padding-top: 10px;
  position: relative;
  p {
    position: relative;
    top: -10px;
  }
  .ivu-layout-footer {
  }
}
.login-box {
  .ivu-btn-ghost.ivu-btn-primary {
    background-color: #275085;
    border-radius: 8px;
  }
  .ivu-btn-ghost.ivu-btn-primary {
    color: #fff;
  }
  .ivu-input-with-prefix {
    background-color: #fff;
  }
  .ivu-input .ivu-input-large .ivu-input-with-prefix {
    background: #fff;
  }
  .ivu-input {
    background: #fff;
  }
}
.button {
  .ivu-input {
    background-color: #275085;
    color: #fff;
  }
}
.theBg {
  background: url("../../common/img/login/login-bg.jpg") no-repeat;

  background-size: 100% 100%;

  position: fixed;
  width: 100%;
}
</style>
