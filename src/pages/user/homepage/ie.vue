<template>
  <div id="background">
    <div class="bigpic">
      <img src="@/common/img/libary.jpg" style="width:100%;height:100%" />
    </div>
    <div class="box">
      <p id="news" style="margin-bottom:12px;">
        <span>
          <Icon type="ios-arrow-forward" />中心要闻
        </span>
        /news
      </p>
      <div class="more">
        <span @click="moreNews()">
          更多
          <Icon type="ios-arrow-forward" />
          <Icon type="ios-arrow-forward" />
        </span>
      </div>

      <div id="carousel">
        <img :src="imgs[0].picturesrc" @click="imgnews(0)" style="width:100%;height:360px" />
      </div>

      <div class="information">
        <div id="inform">
          <ul ref="con1" style="list-style:none;">
            <li v-for="(item,index) in news" :key="index">
              <Row style="height:90%;">
                <Col span="7" style="height:100%;">
                  <img
                    :src="item.newsurl"
                    style="height:80%;width:80%;position:relative;left:10%;cursor:pointer"
                    @click="textnews(index)"
                  />
                </Col>
                <Col span="16">
                  <span style="cursor:pointer" @click="textnews(index)">{{item.newsname}}</span>
                  <p>{{item.newstime}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.newstype}}</p>
                </Col>
                <Divider style="position:relative;" />
              </Row>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div id="recommend">
      <p id="news">
        <span>
          <Icon type="ios-arrow-forward" />推荐教师
        </span>
      </p>
      <div class="more">
        <span @click="moreteachers()">
          更多
          <Icon type="ios-arrow-forward" />
          <Icon type="ios-arrow-forward" />
        </span>
      </div>
      <div id="display">
        <div id="content">
          <div id="sectTwo">
            <div class="sectTwo">
              <div class="swiper-option2">
                <div class="swiper-container">
                  <swiper
                    :options="swiperOption"
                    class="swiper-pagination1"
                    style="width:90%;left:0%;position:relative"
                    ref="mySwiper"
                    v-if="teachers.length"
                  >
                    <swiper-slide v-for="(item,index) in teachers" :key="index">
                      <a class="swiper-slide">
                        <div class="img">
                          <img style="width:100%;height:100%" :src="item.imagesrc" alt="name" />
                        </div>
                        <div class="content">
                          <h4>{{item.teachername}}</h4>
                          <p class="helpintention">研究方向:{{item.helpintention}}</p>
                          <div class="intro">
                            <div class="black">
                              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.description}}</div>
                            </div>
                            
                          </div>
                        </div>
                      </a>
                    </swiper-slide>

                    <!-- Optional controls -->
                    <div class="swiper-pagination" slot="pagination"></div>
                  </swiper>
                  <div class="swiper-button-prev" slot="button-prev"></div>
                  <div class="swiper-button-next" slot="button-next"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="teachermodal" :closable="false" width="50%" :styles="{top: '40px'}">
      <Card>
        <Row class="stitle">
          详情：
          <div id="rate">
            评分：
            <Rate disabled v-model="item.satisfaction" />
          </div>
        </Row>
        <Divider size="small" />
        <Row class="expand-row">
          <Col span="12">
            <span class="expand-key">职位:</span>
            <span class="expand-value">{{ item.job }}</span>
          </Col>
          <Col span="12">
            <span class="expand-key">组织:</span>
            <span class="expand-value">{{ item.organization }}</span>
          </Col>
        </Row>
        <Divider class="spider"></Divider>
        <Row class="expand-row">
          <Col span="12">
            <span class="expand-key">学院:</span>
            <span class="expand-value">{{ item.academy }}</span>
          </Col>
          <Col span="12">
            <span class="expand-key">专业:</span>
            <span class="expand-value">{{ item.major }}</span>
          </Col>
        </Row>
        <Divider class="spider"></Divider>
        <Row>
          <Col span="12">
            <span class="expand-key">电话:</span>
            <span class="expand-value">{{ item.phone }}</span>
          </Col>
          <Col span="12">
            <span class="expand-key">邮箱:</span>
            <span class="expand-value">{{ item.email }}</span>
          </Col>
        </Row>
        <Divider class="spider"></Divider>
        <Row>
          <Col span="12">
            <span class="expand-key">校区:</span>
            <span class="expand-value">{{ item.campus }}</span>
          </Col>
          <Col span="12">
            <span class="expand-key">地址:</span>
            <span class="expand-value">{{ item.building }}</span>
          </Col>
        </Row>
      </Card>
      <div slot="footer" style="width:100%;position:relative;left:0%">
        <Button
          type="primary"
          size="large"
          @click="teachermodal=false"
          long
          style="margin-right:1vh;"
        >确定</Button>
      </div>
    </Modal>
    <Modal
      title="上传论文"
      v-model="essaymodal"
      class-name="vertical-center-modal"
      width="30"
      :mask-closable="false"
      :styles="{top: '20px'}"
    >
      <p slot="header" style="color:#000;text-align:center;height:30px;">
        <span style="position:relative;font-size:24px;font-weight:bold;top:20%">上传论文</span>
      </p>
      <div style="width:100%;position:relative">
        <Form ref="article" :model="article" :label-width="80">
          <FormItem label="论文题目" class="formitem">
            <Input v-model="article.essayname" placeholder="请输入论文题目" />
          </FormItem>
          <FormItem label="论文介绍" class="formitem">
            <Input
              v-model="article.description"
              type="textarea"
              :autosize="{minRows: 3,maxRows: 5}"
              placeholder="请写下对论文的介绍（200字之内）"
            />
          </FormItem>
          <FormItem label="选择时段" class="formitem">
            <Select v-model="article.time" placeholder="请选择时段">
              <Option
                v-for="it in item.timeList"
                :value="it.id"
                :key="it.id"
                v-if="it.occupy==0"
              >{{ it.startTime }}--{{it.endTime}}</Option>
            </Select>
          </FormItem>
        </Form>

        <div>
          <div style="position:relative;width:100%;right:0%">
            <Upload
              ref="upload"
              type="drag"
              action="//jsonplaceholder.typicode.com/posts/"
              :before-upload="handleBeforeUpload"
            >
              <div style="padding: 10px 0">
                <Icon type="ios-cloud-upload" size="30" style="color: #3399ff"></Icon>
                <p>
                  请选择你要上传的论文
                  <br />（pdf格式或者word格式）
                </p>
              </div>
            </Upload>
          </div>
          <div
            style="position:relative;font-size:15px;font-weight:normal;left:3%;diaplay:flex;top:5px;"
          >
            上传的文件名:
            <span
              style="position:relative;font-size:15px;font-weight:bold;top:5%;"
            >{{ article.essayfile.name }}</span>
          </div>
        </div>
        <Divider style="position:relative;margin-top:18px;margin-bottom:15px"></Divider>
        <Row type="flex" class="code-row-bg">
          <Col span="17">
            <Input v-model="article.captchacode" placeholder="请输入验证码" size="large" />
          </Col>
          <Col span="4" offset="1">
            <Button
              type="primary"
              size="large"
              @click="captcha()"
              style="margin-left:20px;position:relative"
            >邮箱验证</Button>
          </Col>
        </Row>
      </div>

      <div slot="footer" style="text-align:center">
        <Button
          type="primary"
          size="large"
          @click="hangbefore()"
          style="margin-right:1vh;"
          :disabled="article.essaySubmit"
          :loading="loading"
        >确认预约</Button>
        <Button
          type="primary"
          size="large"
          ghost
          @click="essaymodal=false"
          style="margin-right:1vh;"
        >取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import axios from "axios";
export default {};
</script>

<script>
import axios from "axios";

export default {
  data() {
    return {
      swiperOption: {
        pagination: ".swiper-pagination1",
        slidesPerView: 3,
        spaceBetween: 50,
        // centeredSlides: false,

        onSlideChangeEnd: swiper => {
          //这个位置放swiper的回调方法
          this.page = swiper.realIndex + 1;
          this.index = swiper.realIndex;
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        //自动播放
        loop: true,
        // autoplay: {
        //   delay: 2000,
        //   disableOnInteraction: false
        // },
        pagination: {
          el: ".swiper-pagination"
          // type: "custom",
        }
        // effect: "coverflow",
        //循环
      },

      item: "", //item
      teachermodal: false, //老师详情
      essaymodal: false,
      loading: false,
      identity: "", //身份
      newspicture: 0, //新闻轮播图
      animate1: false, //确保inform不会回滚
      animate2: false, //确保teacher不会回滚
      animate3: false, //teacher左移
      news: [],
      imgs: [],
      teachers: [],
      article: {
        essayname: "", //论文题目
        description: "", //论文介绍
        essaysrc: "", //论文地址
        essaySubmit: true, //是否提交了论文
        essayfile: "", //论文文件
        time: "",
        captchacode: ""
      },
      questionnaires: [],
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
  methods: {
    // hangbefore() {
    //   let userID = sessionStorage.getItem("userID");
    //   if (userID != null) {
    //     this.hang();
    //   }
    // },
    captcha() {
      let URL = `${apiPath}/user/sendSsmCode`;
      axios({
        url: URL,
        method: "get"
      })
        .then(res => {
          if (res.data.code === 200) {
            this.$Message.success({
              content: "验证码已发出，请注意查收"
            });
          } else {
            this.$Notice.warning({ title: `${res.data.msg}` });
          }
        })
        .catch(err => {
          this.$Notice.warning({ title: `出错，提示：${err}` });
        });
    },
    hangbefore() {
      let URL = `${apiPath}/user/checkMsgCode`;
      axios({
        url: URL,
        method: "get",
        params: {
          msgCode: this.article.captchacode
        }
      })
        .then(res => {
          if (res.data.code === 200) {
            this.hang();
          } else {
            this.$Message.warning({
              content: `${res.data.msg}`
            });
          }
        })
        .catch(err => {
          this.$Notice.warning({ title: `出错，提示：${err}` });
        });
    },

    moreNews() {
      this.$router.push({ name: "newsFront" });
    },
    moreteachers() {
      let userID = sessionStorage.getItem("userID");
      if (userID != null) {
        this.$router.push({ name: "precontract" });
      } else {
        this.$Message.warning({
          content: "请先登录"
        });
      }
    },
    specifics(item) {
      this.item = item;
      this.teachermodal = true;
    },
    precontract(item) {
      if (this.identity != null) {
        let email = localStorage.getItem("email");
        if (email != "") {
          this.item = item;
          this.essaymodal = true;
        } else {
          this.$Notice.warning({
            title: "未填邮箱",
            desc: "请先进入个人信息页面填写个人信息，再进行预约"
          });
        }
      } else {
        this.$Message.warning({
          content: `请先登录`
        });
      }
    },
    cancel() {
      this.essaymodal = false;
      this.$refs.upload.fileList.splice(0, 1);
    },

    loadDataText() {
      let URL = `${apiPath}/public/showNewsWithoutPicture`;
      axios({
        url: URL,
        method: "get"
      })
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.data != null) {
              this.news = res.data.data;
              this.loadDataP();
              this.loadDataT();
            }
          } else {
            if (!res.data.msg) {
              this.$Message.warning({
                title: `出错，提示：${res.data.msg}`
              });
            }
          }
        })
        .catch(err => {
          if (!err) {
            this.$Message.warning({ title: `出错，提示：${err}` });
          }
        });
    },
    loadDataP() {
      let URL = `${apiPath}/public/showPictureNews`;
      axios({
        url: URL,
        method: "get"
      })
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.data != null) {
              this.imgs = res.data.data;
            }
          } else {
            if (!res.data.msg) {
              this.$Message.warning({
                title: `出错，提示：${res.data.msg}`
              });
            }
          }
        })
        .catch(err => {
          if (!err) {
            this.$Message.warning({ title: `出错，提示：${err}` });
          }
        });
    },
    loadDataT() {
      let URL = `${apiPath}/public/showTeachers`;
      axios({
        url: URL,
        method: "get"
      })
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.data != null) {
              this.teachers = res.data.data;
              for (let i = 0; i < this.teachers.length; i++) {
                this.teachers[i].satisfaction = parseFloat(
                  this.teachers[i].satisfaction
                );
              }
            }
          } else {
            if (!res.data.msg) {
              this.$Message.warning({
                title: `出错，提示：${res.data.msg}`
              });
            }
          }
        })
        .catch(err => {
          if (!err) {
            this.$Message.warning({ title: `出错，提示：${err}` });
          }
        });
    },

    imgnews(index) {
      localStorage.setItem("newsid", this.imgs[index].newId);
      this.$router.push({
        name: "newsPage",
        params: { newsid: this.imgs[index].newId }
      });
    },
    textnews(index) {
      localStorage.setItem("newsid", this.news[index].newsId);
      this.$router.push({
        name: "newsPage",
        params: { newsid: this.news[index].newsId }
      });
    },
    hang() {
      let URL = `${apiPath}/user/userConfirmsAppointment`;
      let userID = localStorage.getItem("userID");
      let teacherid = this.item.teacherId;

      axios({
        url: URL,
        method: "post",
        data: {
          teacherid: teacherid,
          studentId: userID,
          essaysrc: this.article.essaysrc,
          description: this.article.description,
          essayname: this.article.essayname,
          timeid: this.article.time
        }
      })
        .then(res => {
          if (res.data.code === 200) {
            this.$Notice.success({ title: `预约成功` });
            this.essaymodal = false;
          } else {
            this.$Notice.warning({ title: `出错，提示：${res.data.msg}` });
          }
        })
        .catch(err => {
          this.$Notice.warning({ title: `出错，提示：${err}` });
        });
    },
    handleBeforeUpload(file) {
      const extension1 = /.pdf/.test(file.name);
      const extension2 = /.doc/.test(file.name);
      const extension3 = /.docx/.test(file.name);
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!extension1 && !extension2 && !extension3) {
        this.$Notice.warning({
          title: "这个文件的格式错误",
          desc:
            "名字为" +
            file.name +
            " 的文件格式是错误的，请上传doc，docx，pdf后缀的文件"
        });
        return false;
      }
      if (!isLt5M) {
        this.$Notice.warning({
          title: "文件体积过大",
          desc: file.name + " 超出20MB"
        });
        return false;
      }
      this.article.essayfile = file;
      let formData = new FormData();
      formData.append("uploadfile", file);
      this.loading = true;
      axios
        .post(`http:${apiPath}/uploadfile`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          this.article.essaysrc = "http://202.120.117.43/" + res.data;
          this.$Message.success("论文上传成功");
          this.loading = false;
        });
      return false;
    }
  },
  mounted() {
    this.identity = localStorage.getItem("authority");
    this.loadDataText();
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  watch: {
    $route: function(newVal, oldVal) {
      this.$nextTick(() => {});
    },
    essaymodal(val, oldVal) {
      if (!val) {
        this.article.essayname = "";
        this.article.description = "";
        this.article.essayfile = "";
        this.article.essaySubmit = false;
        this.article.essaysrc = "";
        this.article.time = "";
        this.article.captchacode = "";
      }
    },
    article: {
      handler() {
        if (
          this.article.essayname != "" &&
          this.article.essayfile != "" &&
          this.article.description != "" &&
          this.article.time != "" &&
          this.article.captchacode != ""
        ) {
          this.article.essaySubmit = false;
        } else {
          this.article.essaySubmit = true;
        }
      },
      deep: true
    }
  }
};
</script>

<style scoped lang="scss">
@import "ie";
@import "css/swiper.css";
@import "css/ie.css";
</style>
<style lang="scss">
.ivu-carousel-dots li button.radius {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.ivu-carousel-dots li.ivu-carousel-active > button.radius {
  width: 10px;
}

.ivu-carousel-dots li button {
  margin-top: -10px;
  background-color: #f0ebf7;
}
.ivu-select-selected-value {
  color: #000;
}
.code-row-bg .ivu-card {
  background: #00959f;
}

.swiper-pagination-customs-active {
  width: 1.5rem;
  height: 0.14rem;
  display: inline-block;
  border-radius: 0.07rem;
  background-color: #28a7e1;
}
#sectTwo .swiper-pagination {
  top: 520px;
  position: absolute;
  /* bottom: 30px */
}

#sectTwo .swiper-pagination-bullet {
  width: 20px;
  height: 6px;
  border-radius: 5px;
  background: #fff;
}

#sectTwo .swiper-pagination-bullet-active {
  background: #e51c60;
  width: 50px;
}

.action {
  position: relative;
  top: 20px;
  text-align: center;
  .ivu-btn {
    font-size: 20px;
    width: 70px;
    height: 34px;
  }
}
.books {
  color: #fff !important;
  margin-top: 110px;
}
.swiper-button-prev {
  right: 10%;
}
.swiper-container {
}
.ivu-select-item {
  padding: 7px 6.8px;
}
.formitem {
  position: relative;
  margin-bottom: 15px;
}
.ivu-btn-large {
  padding-left: 15px;
  padding-right: 15px;
}
</style>