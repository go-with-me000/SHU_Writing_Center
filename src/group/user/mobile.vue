<template>
  <div class="layout">
    <header
      :style="{background: '#245086', height: '60px',boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"
    >
      <div class="header">
        <a href="javascript:;">
          <div class="img logo">
            <img
              src="@/common/img/lastestlogo.png"
              style="position:relative;top:-13px;height:90px;left:-10px;"
            />
            <img
              src="@/common/img/logo4.png"
              style="height:45px;top:13px;position:absolute;left:30px"
            />
              <Button
              type="info"
              ghost
              size="large"
              style=""
              @click="enterLogin()"
              v-if="identity==''"
            >登录</Button>
    
          </div>
        </a>
      
        <!--   <div id="loginbutton">
            <Button
              type="info"
              ghost
              size="large"
              style=""
              @click="enterLogin()"
              v-if="identity==''"
            >登录</Button>
            <Button
              type="info"
              ghost
              size="large"
              @click="logout()"
              style="margin-right:15px;margin-left:15px"
              v-else
            >注销</Button>
          </div>
        -->
          
        <ul id="nav" >
          <li name="index">
            <a href="javascript:;">
              <router-link :to="{ path: 'login' }">
                <Icon type="md-cube" size="17" />介绍
              </router-link>
            </a>
          </li>
          <li name="index">
            <a href="javascript:;">
              <router-link :to="{ path: 'homepage' }">
                <Icon type="ios-mail" size="19" style="top:1px;position:relative"></Icon>首页
              </router-link>
            </a>
          </li>

          <li name="case">
            <a href="javascript:;">
              <span style="position:relative;left:26px">
                <Icon type="ios-people" size="17" />新闻
              </span>
              <i class="iconfont icon-down"></i>
            </a>
            <ul class="childUl">
              <li>
                <a href="javascript:;">
                  <router-link :to="{ path: 'mobileNewsFront' }">
                    <Icon type="md-git-network" size="17" />新闻首页
                  </router-link>
                </a>
              </li>
            </ul>
          </li>
          <li name="product">
            <a href="javascript:;">
              <span style="position:relative;left:26px">
                <Icon type="ios-create-outline" size="17" />预约
              </span>

              <i class="iconfont icon-down"></i>
            </a>
            <ul class="childUl">
              <li>
                <a href="javascript:;">
                  <router-link :to="{ path: 'homepage' }">
                    <Icon type="ios-rose-outline" size="17" />名师预约
                  </router-link>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <router-link :to="{ path: 'homepage' }">
                    <Icon type="ios-rose" size="17" />同伴预约
                  </router-link>
                </a>
              </li>
            </ul>
          </li>
          <li name="support">
            <a href="javascript:;">
              <router-link :to="{ path: 'myPrecontract' }">
                <Icon type="md-attach" size="17" />我的预约
              </router-link>
            </a>
          </li>
          <li name="news">
            <a href="javascript:;">
              <router-link :to="{ path: 'mobileMyInfo' }">
                <Icon type="ios-person" size="17"></Icon>个人信息
              </router-link>
            </a>
          </li>
        </ul>
        <div class="nav" >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>



    <div style="min-height: calc(100vh - 310px)">
      <router-view></router-view>
    </div>
    <div
      class="uppage"
      :style="{margin: '0px', minHeight: '220px',
              backgroundImage:'url(http://202.120.117.43/group1/M00/00/00/ynh1K16YWCuAPaTKAAItI9WGwp8345.jpg)',
              backgroundRepeat:'no-repeat',backgroundSize:'100% 100%',
          }"
    >
      <Row class="code-row-bg">
        <Col span="24" style="height:65px;">
          <Row type="flex">
            <Col span="8" offset="4">
              <p class="wxing">
                了解更多？
                欢迎关注我们的公众号:
                <br />
              </p>
            </Col>
            <Col span="8" offset="1">
              <span style="top:55px;position:relative">
                <img src="@/common/img/code.png" style="height:50%;margin-right:50px;" />
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>

    <div>
      <p
        style=" background-color:#245086;width:100%;font-size: 16px;color: #fff;text-align: center;font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
   "
      >版权所有：上海大学写作中心 &nbsp;&nbsp;&nbsp;&nbsp; 邮编：201900</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "user",
  data() {
    return {
      isCollapsed: false,
      isHome: true,
      activeName: "",
      UserName: "",
      identity: "",
      username: "",
      password: "",
      modal: false,
      screenWidth: window.innerWidth,
      colla: true,
      isLogout: true,
      questionnaires: [], //辅导者接受的问卷
      questionnaires2: [], //被辅导着接受的问卷
      position: 0,
      modal1: false,
      questionnaire: {
        questionId: "",
        requestId: "",
        person_name: "",
        startTime: "",
        endTime: "",
        helpintention: "",
        onTime: "",
        person_rate: 3,
        content_rate: 3,
        suggestion: ""
      },
      rulesx: {
        onTime: [
          {
            required: true,
            message: "请选择对方是否准时",
            trigger: "blur"
          }
        ],
        person_rate: [
          {
            required: true,
            message: "评分不能为空"
            // trigger: "blur"
          }
        ],
        content_rate: [
          {
            required: true,
            message: "评分不能为空"
            // trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
    logo() {
      if (this.colla) {
        return 18;
      } else {
        return 8;
      }
    }
  },
  
  mounted() {
    this.initMenuActive();
    this.computedWidth();
    let userID = sessionStorage.getItem("userID");

    if (userID != null) {
      this.loadDataq();

      this.identity = localStorage.getItem("authority");
      this.isLogout = false;
    }
  },
  methods: {
    computedWidth() {
      if (window.innerWidth < 1220) {
        this.colla = true;
      } else {
        this.colla = false;
      }

      const that = this;
      window.onresize = () => {
        return (() => {
          that.screenWidth = window.innerWidth + "px";
          if (window.innerWidth < 1220) {
            this.colla = true;
          } else {
            this.colla = false;
          }
        })();
      };
    },
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
    enterLogin(){
       this.$router.push('/mobilelogin');
       this.identity = localStorage.getItem("authority");
    },
    
    
    initMenuActive() {
      this.activeName = this.$route.name;
      this.UserName = localStorage.getItem("username");
    },
    push(name) {
      this.$router.push(name);
    },
    warning() {
      this.$Message.warning({
        content: "请从首页进入此页"
      });
    },
    warning2() {
      if (this.isLogout) {
        this.$Message.warning({
          content: "请先登录"
        });
      }
    },
    goAnchor() {
      var element = document.getElementById("main");
      element.scrollIntoView(true);
    },
    logout() {
      localStorage.clear();
      sessionStorage.clear();
      let URL = `${apiPath}/logout`;
      axios({
        url: URL,
        method: "get"
      })
        .then(res => {
          if (res.data.code === 406) {
            this.$router.push({ path: "/mobile/login" });

            this.$Message.success({
              content: `登出成功`
            });
            this.isLogout = true;
            this.identity = "";
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
    loadDataq() {
      let userID = localStorage.getItem("userID");
      let URL = `${apiPath}/user/loadQuestions`;
      let identity = localStorage.getItem("identity") == "ROLE_Teacher" ? 1 : 0;
      axios({
        url: URL,
        method: "get",
        params: {
          userId: userID
        }
      })
        .then(res => {
          if (res.data.code === 200) {
            localStorage.setItem("duty", res.data.data.duty);
            this.questionnaires = res.data.data.list;
            this.questionnaires2 = res.data.data.educatedList;
            if (this.questionnaires) {
              for (let i = 0; i < this.questionnaires.length; i++) {
                this.modal1 = true;
                this.loadData2(i);
              }
            }
            if (this.questionnaires2) {
              for (let i = 0; i < this.questionnaires2.length; i++) {
                this.modal1 = true;
                this.loadData3(i);
              }
            }
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
    loadData2(i) {
      let URL = `${apiPath}/user/questionLoading`;
      // let identity = localStorage.getItem("identity") == "ROLE_Teacher" ? 1 : 0;
      let requestId = this.questionnaires[i].requestId;
      let identity = this.questionnaires[i].identity;
      this.position = identity;
      let duty = localStorage.getItem("duty");
      axios({
        url: URL,
        method: "post",
        data: {
          requestId: requestId,
          identity: identity,
          duty: duty
        }
      })
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.data != null) {
              this.questionnaire = res.data.data;
              this.questionnaire.id = this.questionnaires[i].questionId;
              this.questionnaire.content_rate = this.questionnaire.person_rate = 3;
            }
          } else {
            this.$Message.warning({
              content: `出错，提示：${res.data.msg}`
            });
          }
        })
        .catch(err => {
          this.$Message.warning({ content: `出错，提示：${err}` });
        });
    },
    loadData3(i) {
      let URL = `${apiPath}/user/questionLoading`;
      // let identity = localStorage.getItem("identity") == "ROLE_Teacher" ? 1 : 0;
      let requestId = this.questionnaires2[i].requestId;
      let identity = this.questionnaires2[i].identity;
      let duty = localStorage.getItem("duty");

      this.position = identity;
      axios({
        url: URL,
        method: "post",
        data: {
          requestId: requestId,
          identity: identity,
          duty: duty
        }
      })
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.data != null) {
              this.questionnaire = res.data.data;
              this.questionnaire.id = this.questionnaires2[i].questionId;
              this.questionnaire.content_rate = this.questionnaire.person_rate = 3;
            }
          } else {
            this.$Message.warning({
              content: `出错，提示：${res.data.msg}`
            });
          }
        })
        .catch(err => {
          this.$Message.warning({ content: `出错，提示：${err}` });
        });
    },
    submitNaire(questionnaire) {
      this.$refs[questionnaire].validate(valid => {
        if (valid) {
          if (this.position == 0) {
            let URL = `${apiPath}/user/studentFillTheQuestion`;
            let id = this.questionnaire.id;
            axios({
              url: URL,
              method: "post",
              data: {
                requestId: this.questionnaire.requestId,
                onTime: this.questionnaire.onTime,
                teacherMark: this.questionnaire.person_rate,
                msgMark: this.questionnaire.content_rate,
                advice: this.questionnaire.suggestion,
                id: id
              }
            })
              .then(res => {
                if (res.data.code === 200) {
                  this.$Message.success("提交成功");
                  this.modal1 = false;
                  this.$router.go(0);
                } else {
                  this.$Message.warning({
                    title: `出错，提示：${res.data.msg}`
                  });
                }
              })
              .catch(err => {
                this.$Message.warning({ title: `出错，提示：${err}` });
              });
          } else {
            let URL = `${apiPath}/user/teacherFillTheQuestion`;
            let requestId = this.questionnaire.requestId;
            let id = this.questionnaire.id;
            let onTime = this.questionnaire.onTime;
            let person_rate = this.questionnaire.person_rate;
            let suggestion = this.questionnaire.suggestion;
            axios({
              url: URL,
              method: "post",
              data: {
                requestId: requestId,
                id: id,
                absent: onTime,
                studentMark: person_rate,
                advice: suggestion
              }
            })
              .then(res => {
                if (res.data.code === 200) {
                  this.$Message.success("提交成功");
                  this.modal1 = false;
                  this.$router.go(0);
                } else {
                  this.$Message.warning({
                    title: `出错，提示：${res.data.msg}`
                  });
                }
              })
              .catch(err => {
                this.$Message.warning({ title: `出错，提示：${err}` });
              });
          }
        } else {
          this.$Message.warning("问卷填写不完整");
        }
      });
    }
  },
  watch: {
    modal(val, oldVal) {
      if (!val) {
        this.username = "";
        this.password = "";
      }
    },
    isLogout(val, old) {},
    $route() {
      this.$nextTick(() => {
        this.initMenuActive();
      });
    }
  }
};
</script>

<style lang="scss">
@import "../mobile";
// @import "../chrome.css";
@import "./common/css/styles.css";
.loginmodal .ivu-modal-footer {
  padding: 0px 0px 0px 0px !important;
  border-top: 0px;
}
.loginmodal {
  .ivu-modal-body {
    padding: 0px 0px 0px 0px !important;
  }
}
</style>
<style scoped lang="scss">
.questionfoot {
  .ivu-btn-info {
    border-color: #19be6b;
  }
  .ivu-btn-ghost.ivu-btn-info {
    color: #fff;
  }
  .ivu-btn {
    border: 2px solid;
    border-radius: 2px;
    border-color: #19be6b;
  }
  .ivu-btn-ghost.ivu-btn-info[data-v-752619b6]:hover {
    /* color:#000; */
    background-color: #19be6b;
  }
}
.ivu-btn-info {
  border-color: #19be6b;
}
.ivu-btn-ghost.ivu-btn-info {
  color: #fff;
}
.ivu-btn {
  border: 2px solid;
  border-radius: 2px;
  border-color: #2d68b1;
}
.ivu-btn-ghost.ivu-btn-info[data-v-752619b6]:hover {
  /* color:#000; */
  background-color: #2d68b1;
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}

.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
</style>

