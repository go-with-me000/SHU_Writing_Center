<template>
  <div>
    <div class="c-nav">
      <div class="container navFlex">
        <div class="flexItem">
          <img class="logo" src="/static/logo.png" />
        </div>
        <div class="flexItem hiden">
          <img @click="clickBtn" class="btnImg" src="/static/navBtn.png" />
        </div>
        <div class="flexItem show">
          <ul>
            <li>
              <a href="#">介绍</a>
            </li>
            <li>
              <a href="#">首页</a>
            </li>
            <li>
              <a href="#">新闻</a>
            </li>
            <li>
              <a href="#">预约</a>
            </li>
            <li>
              <a href="#">我的预约</a>
            </li>
            <li>
              <a href="#">个人信息</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      toggle: true
    };
  },
  methods: {
    clickBtn() {
      if (this.toggle) {
        $(".btnImg").css("border", "1px solid #b0ccf3");
        this.toggle = false;
      } else {
        $(".btnImg").css("border", "1px solid transparent");
        this.toggle = true;
      }
      $(".show").slideToggle(300);
    }
  }
};
</script>
<style scoped>
.container {
  max-width: 1140px;
  margin: 0 auto;
}

.c-nav .show {
  display: inline-block;
}
.c-nav .hiden {
  display: none;
}
/* 导航栏 */
.c-nav {
  width: 100%;
  background-color: black;
}
.c-nav .navFlex {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  align-items: center;
  -webkit-align-content: center;
  color: white;
}
.c-nav ul {
  list-style: none;
  margin-bottom: 0px;
  padding-left: 0px;
}
.c-nav ul li {
  padding: 15px 0px 15px 0px;
  margin-left: 30px;
  display: inline-block;
}
.c-nav ul li a {
  color: white;
  padding-bottom: 2px;
  text-decoration: none;
  border-bottom: 3px solid transparent;
}
.c-nav ul li a:hover {
  border-bottom: 3px solid #e4c17e;
}
.c-nav .logo {
  height: 40px;
}
.c-nav .btnImg {
  height: 20px;
  width: 25px;
  padding: 3px 8px 3px 8px;
  box-sizing: content-box;
  border: 1px solid transparent;
}
@media screen and (max-width: 1200px) {
  .c-nav ul li {
    margin-left: 20px;
  }
}
@media screen and (max-width: 992px) {
  .c-nav ul li {
    margin-left: 10px;
  }
}
@media screen and (max-width: 768px) {
  .c-nav ul li:nth-child(4),
  .c-nav ul li:nth-child(5) {
    display: none;
  }
}
@media screen and (max-width: 576px) {
  .c-nav {
    background-color: rgba(176, 204, 243, 0.8);
    padding: 10px 0px 10px 0px;
    opacity: 0.9;
  }
  .c-nav .navFlex {
    flex-wrap: wrap;
    font-size: 20px;
    justify-content: space-between;
  }
  .c-nav .logo {
    height: 30px;
  }
  .c-nav ul li {
    padding-top: 10px;
    margin-left: 0px;
    display: block;
  }
  .c-nav ul li a {
    border-bottom: 3px solid transparent;
  }
  .c-nav ul a:hover {
    border-bottom: 3px solid #e4c17e;
  }
  .c-nav ul li:nth-child(4),
  .c-nav ul li:nth-child(5) {
    display: block;
  }
  .c-nav .hiden {
    display: block;
  }
  .c-nav .show {
    width: 100%;
    font-size: 14px;
    text-align: center;
    display: none;
  }
}
</style>