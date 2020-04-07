<template>
  <div class="login">
    <div :style="fixStyle" class="filter">
      <div class="SysTitle">
        上海大学写作中心
        <div class="login-box">
          <form>
            <Input
              v-model="username"
              style="margin-bottom: 10px"
              size="large"
              prefix="md-person"
              placeholder="学/工号"
            />
            <Input
              v-model="password"
              type="password"
              style="margin-bottom: 7px"
              prefix="md-lock"
              size="large"
              placeholder="密码"
            />

            <ButtonGroup size="large">
              <div style="display: flex;">
                <Button
                  size="large"
                  type="primary"
                  :loading="loading"
                  @click="handleOnClickLogin()"
                  v-on:keyup.13="login"
                  ghost
                >登录</Button>
              </div>
            </ButtonGroup>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {

      fixStyle: "",
      username: "",
      password: "",
     
    };
  },
  methods: {
    handleOnClickLogin() {
      // this.loading = true;
      var params = new URLSearchParams();
      params.append("username", this.username);
      params.append("password", this.password);
      // this.$router.push({ path: "/user/login" });
      axios
        .post("http://localhost:8080/loginShu", params)
        .then(res => {
          if (res.status == 200) {
            
            localStorage.setItem("authority", res.data.data[0].authority);
            localStorage.setItem("username", res.data.data[0].username);
            localStorage.setItem("userID", this.username);
            this.$router.push({ path: "/user/homepage" });
          }else{

          }
        })
        .catch(err => {
         
          this.$Message.warning({ content: `账号或密码出错` });
        });
    },
    
  },
  mounted() {
    localStorage.setItem("browser",this.checkBrowser());
    // localStorage.setItem("browsesadar",123123);
   
  }
};
</script>

<style scoped lang="scss">
@import "./login.scss";
</style>

<style lang="scss">
.login-box {
  .ivu-input {
    background-color: transparent;
    color: #f8f8f9ab;
  }
}

.ivu-select-selection {
  background-color: #fff0 !important;
}

.ivu-select-selected-value {
  background-color: transparent;
  color: #f8f8f9ab;
}

.ivu-select-arrow {
  color: #f8f8f9ab;
}
</style>
