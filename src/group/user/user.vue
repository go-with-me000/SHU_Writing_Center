<template>
  <div class="layout">
    <Layout style="height: 100vh;">
      <Layout>
        <Header
          :style="{background: '#245086', height: '60px',boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"
          class="layout-header-bar"
        >
          <Row class="code-row-bg">
            <Col :span="logo" style="z-index:1;position:relative;left:0px;display:flex;">
              <img src="@/common/img/lastestlogo.png" style="position:relative;top:-26px" />
              <img
                src="@/common/img/logo4.png"
                style="height:60px;top:5px;position:relative;right:85px"
              />
            </Col>
            <Col
              span="16"
              ref="refName"
              style="position:relative;left:0px"
              id="horizontal"
              v-if="!colla"
            >
              <Menu :active-name="activeName" mode="horizontal" @on-select="push">
                <MenuItem name="login" @click.native="goAnchor()">
                  <Icon type="md-cube" />
                  <span>介绍</span>
                </MenuItem>
                <MenuItem name="homepage" @click.native="goAnchor()">
                  <Icon type="ios-mail"></Icon>
                  <span>首页</span>
                </MenuItem>
                <Submenu name="news">
                  <template slot="title">
                    <Icon type="ios-people" />新闻
                  </template>
                  <MenuItem name="newsFront" @click.native="goAnchor()">
                    <Icon type="md-git-network" />
                    <span>新闻首页</span>
                  </MenuItem>
                  <MenuItem name="newsPage" disabled @click.native="warning()">
                    <Icon type="ios-ribbon" />
                    <span>具体新闻</span>
                  </MenuItem>
                </Submenu>
                <Submenu name="meeting">
                  <template slot="title">
                    <Icon type="ios-create-outline" />预约
                  </template>
                  <MenuItem
                    name="precontract"
                    :disabled="isLogout"
                    @click.native="goAnchor();warning2()"
                  >
                    <Icon type="ios-rose-outline" />
                    <span>名师预约</span>
                  </MenuItem>
                  <MenuItem
                    name="precontract2"
                    :disabled="isLogout"
                    @click.native="goAnchor();warning2()"
                  >
                    <Icon type="ios-rose" />
                    <span>同伴预约</span>
                  </MenuItem>
                </Submenu>
                <MenuItem
                  name="myPrecontract"
                  :disabled="isLogout"
                  @click.native="goAnchor();warning2()"
                >
                  <Icon type="md-attach" />
                  <span>我的预约</span>
                </MenuItem>

                <MenuItem name="myInfo" :disabled="isLogout" @click.native="goAnchor();warning2()">
                  <Icon type="ios-person"></Icon>
                  <span>个人信息</span>
                </MenuItem>
              </Menu>
            </Col>
          </Row>
          <div id="loginbutton">
            <Button
              type="info"
              size="large"
              @click.native="$router.push('/manager/appointmentPic')"
              ghost
              v-if="identity=='ROLE_Monitor'"
            >管理员</Button>
            <Button
              type="info"
              ghost
              size="large"
              style="margin-right:15px;margin-left:15px"
              @click="modal=true"
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
          <div class="collapsed" v-if="colla">
            <Icon
              @click.native="collapsedSider"
              :class="rotateIcon"
              type="md-menu"
              size="30"
              id="ver"
            ></Icon>
          </div>
        </Header>

        <Content
          :style="{margin: '0px', background: '#fff', minHeight: '90vh',
         
          }"
          style="height:90vh;"
        >
          <GeminiScrollbar class="my-scroll-bar">
            <div id="main" style="position:absolute"></div>

            <div style="min-height: calc(100vh - 304px)">
              <router-view></router-view>
            </div>
            <div
              class="uppage"
              :style="{margin: '0px', minHeight: '220px',
              backgroundImage:'url(http://114.55.93.118/group1/M00/00/00/rBA7015h37CAf9jGAAItI9WGwp8717.jpg)',
              backgroundRepeat:'no-repeat',backgroundSize:'100% 100%',
          }"
            >
              <Row class="code-row-bg">
                <Col span="8" style="color:#fff;" class="text">
                  <p>
                    <Icon type="md-pin" size="30" />地址：上海市上大路99号上海大学图书馆
                  </p>

                  <p style="margin-top:30px">
                    <Icon type="ios-mail" size="30" />邮箱：shdxwritingcenter@oa.shu.edu.cn
                  </p>
                </Col>
                <Col span="8" style="text-align:center">
                  <img src="@/common/img/logo3.png" style="margin-top:10px " />
                  <img src="@/common/img/logo4.png" style="position:relative;margin-top:-30px " />
                </Col>
                <Col span="7" style="height:65px;left:10px">
                  <Row type="flex">
                    <Col span="8" offset="1">
                      <p class="wxing">
                        了解更多？
                        欢迎关注我们的公众号:
                        <br />
                      </p>
                    </Col>
                    <Col span="10" offset="1">
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

            <!-- <div class="page">
              <p class="page">版权所有：上海大学 &nbsp;&nbsp;&nbsp;&nbsp; 邮编：430062 &nbsp;&nbsp;&nbsp;&nbsp; 鄂ICP备17017874号-1</p>
            </div>-->
          </GeminiScrollbar>
        </Content>

        <!--页面部分-->
      </Layout>
      <!--右边部分-->
      <Sider
        ref="side1"
        hide-trigger
        collapsible
        :collapsed-width="0"
        v-model="isCollapsed"
        width="150"
        style="background:#fff"
        v-if="colla==true"
      >
        <div style="position:relative;height:60px;z-index:3;background-color:#245086"></div>
        <div id="erection">
          <Menu :active-name="activeName" @on-select="push" width="150">
            <MenuItem name="login" @click.native="goAnchor()">
              <Icon type="md-cube" />
              <span>介绍</span>
            </MenuItem>
            <MenuItem name="homepage" @click.native="goAnchor()">
              <Icon type="ios-mail"></Icon>
              <span>首页</span>
            </MenuItem>
            <Submenu name="news">
              <template slot="title">
                <Icon type="ios-people" />新闻
              </template>
              <MenuItem name="newsFront" @click.native="goAnchor()">
                <Icon type="md-git-network" />
                <span>新闻首页</span>
              </MenuItem>
              <MenuItem name="newsPage" disabled @click.native="warning()">
                <Icon type="ios-ribbon" />
                <span>具体新闻</span>
              </MenuItem>
            </Submenu>
            <Submenu name="meeting">
              <template slot="title">
                <Icon type="ios-create-outline" />预约
              </template>
              <MenuItem
                name="precontract"
                :disabled="isLogout"
                @click.native="goAnchor();warning2()"
              >
                <Icon type="ios-rose-outline" />
                <span>名师预约</span>
              </MenuItem>
              <MenuItem
                name="precontract2"
                :disabled="isLogout"
                @click.native="goAnchor();warning2()"
              >
                <Icon type="ios-rose" />
                <span>同伴预约</span>
              </MenuItem>
            </Submenu>
            <MenuItem
              name="myPrecontract"
              :disabled="isLogout"
              @click.native="goAnchor();warning2()"
            >
              <Icon type="md-attach" />
              <span>我的预约</span>
            </MenuItem>

            <MenuItem name="myInfo" :disabled="isLogout" @click.native="goAnchor();warning2()">
              <Icon type="ios-person"></Icon>
              <span>个人信息</span>
            </MenuItem>
          </Menu>
        </div>
      </Sider>
    </Layout>
    <Modal v-model="modal" width="400" :styles="{top: '200px'}" :mask-closable="false">
      <p slot="header" style="color:#000;text-align:center;height:40px;">
        <span style="position:relative;font-size:30px;font-weight:bold;top:20%">登录</span>
      </p>
      <div style="text-align:center">
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
          </form>
        </div>
      </div>
      <div slot="footer">
        <Button
          size="large"
          type="primary"
          long
          @click="handleOnClickLogin()"
          @keyup.enter="handleOnClickLogin()"
          ghost
        >登录</Button>
      </div>
    </Modal>
    <Modal v-model="modal1" fullscreen title="Fullscreen Modal" :closable="false">
      <p slot="header" id="questionheader">
        <Icon type="md-create" />
        <span v-if="position==0">老师评估问卷</span>
        <span v-else>学生评估问卷</span>
      </p>
      <div style="text-align:center;position:relative;width:40%;left:35%">
        <Form
          :model="questionnaire"
          label-position="left"
          :label-width="250"
          :rules="rulesx"
          ref="questionnaire"
        >
          <FormItem label="订单号:" style="text-align:left;">{{questionnaire.requestId}}</FormItem>
          <FormItem
            label="老师姓名:"
            style="text-align:left;"
            v-if="position==0"
          >{{questionnaire.person_name}}</FormItem>
          <FormItem label="学生姓名:" style="text-align:left;" v-else>{{questionnaire.person_name}}</FormItem>
          <FormItem label="辅导方向:" style="text-align:left;">{{questionnaire.helpintention}}</FormItem>
          <FormItem label="辅导开始时间:" style="text-align:left;">{{questionnaire.startTime}}</FormItem>
          <FormItem label="辅导结束时间:" style="text-align:left;">{{questionnaire.endTime}}</FormItem>
          <Divider></Divider>
          <FormItem label="对方是否准时:" style="text-align:left" prop="onTime">
            <RadioGroup v-model="questionnaire.onTime">
              <Radio label="1">是</Radio>
              <Radio label="0">否</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem
            label="对老师评分:"
            style="text-align:left"
            v-if="position==0"
            prop="person_rate"
          >
            <Rate show-text allow-half v-model="questionnaire.person_rate">
              <span style="color: #f5a623"></span>
            </Rate>
          </FormItem>
          <FormItem label="对学生评分:" style="text-align:left" v-else prop="person_rate">
            <Rate show-text allow-half v-model="questionnaire.person_rate">
              <span style="color: #f5a623"></span>
            </Rate>
          </FormItem>
          <FormItem
            label="对辅导内容评分:"
            style="text-align:left"
            prop="content_rate"
            v-if="position==0"
          >
            <Rate show-text allow-half v-model="questionnaire.content_rate ">
              <span style="color: #f5a623"></span>
            </Rate>
          </FormItem>
          <FormItem label="建议:">
            <Input
              v-model="questionnaire.suggestion"
              type="textarea"
              :autosize="{minRows: 5,maxRows: 7}"
              placeholder="欢迎提出建议"
            ></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" class="questionfoot">
        <Button type="success" size="large" long @click="submitNaire('questionnaire')">提交问卷</Button>
      </div>
    </Modal>
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
  created() {
    this.keyupSubmit();
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
    keyupSubmit() {
      let that = this;
      document.onkeydown = e => {
        let _key = window.event.keyCode;
        if (_key === 13 && that.modal) {
          this.handleOnClickLogin();
        }
      };
    },
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
    handleOnClickLogin() {
      // this.loading = true;
      var params = new URLSearchParams();
      params.append("username", this.username);
      params.append("password", this.password);
      axios
        .post("http://114.55.93.118:8080/login", params)
        .then(res => {
          if (res.status == 200) {
            localStorage.setItem("authority", res.data.data[0].authority);
            localStorage.setItem("username", res.data.data[0].username);
            localStorage.setItem("userID", this.username);
            localStorage.setItem("email", res.data.data[0].email);
            sessionStorage.setItem("userID", this.username);
            this.identity = res.data.data[0].authority;
            this.modal = false;
            this.loginmessage();
            this.$router.go(0);
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
            this.$router.push({ path: "/user/login" });

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
@import "../group";
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
