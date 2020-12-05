<template>
  <Layout style="height:100vh">
    <Header class="header">
      <img
        src="../../common/img/login/logo-white.png"
        style="width:170px;position:relative;top:10%;left:10%"
      />
    </Header>
    <Content class="content">
      <Layout
        class="theBg"
        style="height: calc(100vh - 175px);"
       
      ></Layout>
      <div class="login">
        <div :style="fixStyle" class="filter">
          <div class="SysTitle">
            <div id="title">登录/login</div>

            <div class="login-box">
              <Input
                v-model="username"
                style="margin-bottom:25px;wdith:100%"
                size="large"
                prefix="md-person"
                placeholder="请输入账号/Campus ID Number"
              />
              <Input
                v-model="password"
                type="password"
                style="margin-bottom: 25px"
                prefix="md-lock"
                size="large"
                placeholder="请输入密码/Password"
              />
              <!-- <input
                type="button"
                class="button"
                value="登录"
                @click="handleOnClickLogin()"
                @keyup.enter="keyupSubmit()"
                style="cursor:pointer"
              />-->
              <Button
                size="large"
                type="primary"
                long
                @click="handleOnClickLogin()"
                @keyup.enter="handleOnClickLogin()"
                ghost
              >登录/login</Button>
            </div>
          </div>
        </div>
      </div>
    </Content>
    <Footer class="footer">
      <p class="message">
        信息服务电话：66133370 技术支持 上海大学信息化工作办公室
        <br />Technical support: IT Office of Shanghai University Tel:66133370
        <br />地址：上海市宝山区上大路99号 邮编：200444 Address: 99 Shangda Rd. Shanghai, China. 200444.
        <br />Copyright © 2012-2020 Shanghai University, All Rights Reserved.
      </p>
    </Footer>
  </Layout>
</template>

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
             if(res.data.data.email==null){
              localStorage.setItem("email", 'noemail');
            }else{
              localStorage.setItem("email", res.data.data.email);
            }
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
   
  },
  mounted(){
     window.addEventListener("keydown", this.keyDown);
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
