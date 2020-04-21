<template>
  <div class="loginMobile">
    <div class="login-box" style="text-align: center">
      <img src="@/common/img/img/shu_title.png" style="width: 60vw" />
      <br />
      <br />
      <p style="font-size:160%; color: #000066; font-family: 新宋体;font-weight: bolder">上海大学写作中心</p>
      <br />
      <van-field
        v-model="username"
        clearable
        
        left-icon="contact"
        placeholder="请输入账号/Campus ID Number"
      />
      <br />
      <van-field
        v-model="password"
        type="password"
       
        clearable
        left-icon="lock"
        placeholder="请输入密码/Password"
      />
      <br />
      <van-button round type="info" block @click="handleOnClickLogin()" >登录</van-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "loginMobile",
  data() {
    return {
      username: "",
      password: "",
      loading: false
    };
  },
  methods: {
    handleOnClickLogin() {
      // this.loading = true;
      var params = new URLSearchParams();
      if (this.username == "" || this.password == "") {
        this.$Message.warning({
          content: `请填写完整的登录信息`
        });
        return;
      }
      params.append("username", this.username);
      params.append("password", this.password);
      axios
        .post(`${apiPath}/login`, params)
        .then(res => {
          if (res.status == 200) {
            localStorage.setItem("authority", res.data.data[0].authority);
            localStorage.setItem("username", res.data.data[0].username);
            localStorage.setItem("userID", this.username);
            localStorage.setItem("email", res.data.data[0].email);
            sessionStorage.setItem("userID", this.username);
            this.loginmessage();
            this.$Message.success({
              content: `登陆成功`
            });
            this.$router.go(-1);
          } else {
          }
        })
        .catch(err => {
          this.$Message.warning({ content: `账号或密码出错` });
        });
    },
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
    },
  }
};
</script>

<style scoped lang="scss">
@import "loginMobile";
</style>
