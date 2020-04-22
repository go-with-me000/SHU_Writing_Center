<template>
  <div class="main">
    <Row class="head" :style="{'--headHeight':this.headHeight}">
      <div class="search">
        <van-row>
          <van-col span="4" offset="1">
            <van-field
              readonly
              clickable
              style="border:1px solid #E8E8E8;border-radius:5%;font-size:18px;"
              :value="choose.campus"
              placeholder="选择校区"
              @click="showCampus=true"
            />
            <van-popup v-model="showCampus" position="bottom">
              <van-picker
                show-toolbar
                :columns="campusList"
                title="选择校区"
                clearable
                @cancel="showCampus=false"
                @confirm="onConfirm"
              />
            </van-popup>
          </van-col>
          <van-col style="margin-left:5px">
            <van-field
              readonly
              clickable
              style="border:1px solid #E8E8E8;border-radius:5%;font-size:18px;"
              :value="choose.academy"
              placeholder="请选择学院"
              @click="showAcademy = true"
            />
            <van-popup v-model="showAcademy" position="bottom">
              <van-picker
                show-toolbar
                :columns="academyList"
                title="选择学院"
                @cancel="showAcademy = false"
                @confirm="onConfirmAcademy"
              />
            </van-popup>
          </van-col>
        </van-row>
        <van-row style="margin-top:5px">
          <van-col span="21" offset="1">
            <van-field
              v-model="teacherName"
              style="border:1px solid #E8E8E8;border-radius:5%"
              placeholder="请输入老师的姓名查找"
            />
          </van-col>
        </van-row>
      </div>
    </Row>
    <van-divider />

    <Row>
      <ul class="exhibit">
        <li style="display:block;" v-for="(item,index) in data" :key="index">
          <div class="list">
            <div class="img">
              <img :src="item.imagesrc" alt="name" style="width:40vw;height:29vw" />
            </div>
            <div class="introduce">
              <h3>{{item.teachername}}</h3>
              <h4>教职工</h4>
              <p>{{item.helpintention}}</p>
              <ul>
                <li>
                  <Button
                    @click="specifics(item)"
                    ghost
                    size="small"
                    type="default"
                    style="margin-top:-10px;margin-left:13px;"
                  >详情</Button>
                </li>
                <li>
                  <Button
                    ghost
                    type="default"
                    size="small"
                    style="margin-top:-5.5px;position:absolute"
                    @click="precontract(item)"
                  >预约</Button>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </Row>

    <Row type="flex" justify="space-between" class="code-row-bg">
      <Col span="2"></Col>
      <Col span="18" style="text-align:center;">
        <Page
          :total="totalteacher"
          show-elevator
          style="margin-bottom:40px;padding-top:15px;"
          @on-change="cutaway"
          :page-size="12"
          simple
        />
      </Col>
      <Col span="2"></Col>
    </Row>

    <Row>
      <Modal v-model="modal1" :closable="false" width="50%" :styles="{top: '10px'}">
        <Card>
          <Row class="stitle">
            <span style="font-weight:normal">教师ID:</span>
            {{item.teacherid}}
            <div id="rate">
              评分：
              <Rate disabled v-model="item.satisfaction" />
            </div>
          </Row>
          <Divider size="small" class="spider" />
          <Row class="expand-row">
            <Col span="12">
              <span class="expand-key">职位:<br></span>
              <span class="expand-value">{{ item.job }}</span>
            </Col>

            <Col span="12">
              <span class="expand-key">组织:<br></span>
              <span class="expand-value">{{ item.organization }}</span>
            </Col>
          </Row>
          <Divider class="spider"></Divider>
          <Row class="expand-row">
            <Col span="12">
              <span class="expand-key">学院:<br></span>
              <span class="expand-value">{{ item.academy }}</span>
            </Col>
            <Col span="12">
              <span class="expand-key">专业:<br></span>
              <span class="expand-value">{{ item.major }}</span>
            </Col>
          </Row>
          <Divider class="spider"></Divider>
          <Row>
            <Col span="12">
              <span class="expand-key">电话:<br></span>
              <span class="expand-value">{{ item.phone }}</span>
            </Col>
            <Col span="12">
              <span class="expand-key">邮箱:<br></span>
              <span class="expand-value">{{ item.email }}</span>
            </Col>
          </Row>
          <Divider class="spider"></Divider>
          <Row>
            <Col span="12">
              <span class="expand-key">校区:<br></span>
              <span class="expand-value">{{ item.campus }}</span>
            </Col>
            <Col span="12">
              <span class="expand-key">地址:<br></span>
              <span class="expand-value">{{ item.building }}</span>
            </Col>
          </Row>
          <Divider class="spider"></Divider>

          <Row>
            <span class="expand-key">
              个人简介:
              <br />
              <br />
            </span>
            <span
              class="expand-value"
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.description }}</span>
          </Row>
        </Card>
        <div slot="footer" style="width:100%;position:relative;left:0%">
          <Button
            type="primary"
            size="large"
            @click="modal1=false"
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
            <FormItem label="论文题目">
              <Input v-model="article.essayname" placeholder="请输入论文题目" />
            </FormItem>
            <FormItem label="论文介绍">
              <Input
                v-model="article.description"
                type="textarea"
                :autosize="{minRows: 3,maxRows: 5}"
                placeholder="请写下对论文的介绍（200字之内）"
              />
            </FormItem>
            <FormItem label="选择时段">
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
            <Col span="4" >
              <Button
                type="primary"
                size="large"
                @click="captcha()"
                style="float:right;position:relative;left:45px"
                :disabled="article.emailSubmit"
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
    </Row>
  
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      showCampus: false,
      showAcademy: false,
      browser: "",
      captchamodal: false,
      campusList: ["全部", "宝山", "嘉定", "延长"],
      academyList: [
        "理学院",
        "文学院",
        "法学院",
        "外国语学院",
        "社会学院",
        "马克思主义学院",
        "新闻传播学院",
        "计算机工程与科学学院",
        "机电工程与自动化学院",
        "通信与信息工程学院",
        "环境与化学工程学院",
        "材料科学与工程学院",
        "材料基因组工程研究院",
        "中欧工程技术学院",
        "土木工程系",
        "力学所",
        "纳米科学与技术中心",
        "经济学院",
        "管理学院",
        "图书情报档案系",
        "悉尼工商学院",
        "MBA中心",
        "医学院",
        "上海电影学院",
        "上海美术学院",
        "上海研究院",
        "生命科学学院",
        "音乐学院",
        "数码艺术学院",
        "上海温哥华电影学院",
        "社区学院",
        "社会科学学部",
        "钱伟长学院",
        "体育学院",
        "微电子中心",
        "人才学院",
        "国际教育学院"
      ],
      article: {
        essayname: "", //论文题目
        description: "", //论文介绍
        essaysrc: "", //论文地址
        essaySubmit: true, //是否提交了论文
        essayfile: "", //论文文件
        emailSubmit: true,
        time: "",
        captchacode: ""
      },
      totalteacher: 0,
      tag: false,
      loading: false,
      academyactive: true, //学院搜索栏是否为展开状态
      item: "",
      campusitem: "",
      data: [], //老师详细数据
      choose: {
        campus: "", //校区搜索栏
        academy: "" //学院搜索栏
      },
      campus: "全部",
      page: 1, //页码
      tag2: false, //标记page
      // counselList: [], //方向搜索栏
      teacherName: "", //老师名字搜索栏
      modal1: false, //详情dialog
      essaymodal: false, //预约dialog
      headHeight: "30vh" //无用的头高度
    };
  },
  methods: {
   
    onConfirm(value) {
      this.choose.campus = value;
      this.showCampus = false;
    },
    onConfirmAcademy(value) {
      this.choose.academy = value;
      this.showAcademy = false;
    },
    captcha() {
      let URL = `${apiPath}/user/sendSsmCode`;
      axios({
        url: URL,
        method: "get"
      })
        .then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.$Message.success({
              content: "验证码已发出，请注意查收"
            });
          } else {
            this.$Message.warning({
              content: `请正确填写填写邮箱信息，否则无法发送邮件`
            });
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
    hang() {
      let URL = `${apiPath}/user/userConfirmsAppointment`;
      let teacherid = this.item.teacherid;
      let userID = localStorage.getItem("userID");

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
            this.$Notice.warning({ title: `${res.data.msg}` });
            // this.essaymodal = false;
          }
        })
        .catch(err => {
          this.$Notice.warning({ title: `出错，提示：${err}` });
        });
    },
    cutaway(index) {
      this.page = index;
    },

    loadDataCampus() {
      let URL = `${apiPath}/user/loadDataCampus`;
      let campus =
        this.choose.campus != "全部"
          ? this.choose.campus + "校区"
          : this.choose.campus;
      let page = this.page;

      if (this.tag) {
        return;
      } else {
        axios({
          url: URL,
          method: "post",
          data: {
            campus: campus,
            page: page
          }
        })
          .then(res => {
            if (res.data.code === 200) {
              if (res.data.data != "暂时没有教师") {
                this.data = res.data.data;
                this.totalteacher = res.data.count;
                for (let i = 0; i < this.data.length; i++) {
                  this.data[i].satisfaction = parseFloat(
                    this.data[i].satisfaction
                  );
                  for (let j = 0; j < this.data[i].timeList.length; j++) {
                    var reg = /-/;
                    this.data[i].timeList[j].startTime = this.data[i].timeList[
                      j
                    ].startTime.replace(reg, "年");
                    this.data[i].timeList[j].startTime = this.data[i].timeList[
                      j
                    ].startTime.replace(reg, "月");
                    this.data[i].timeList[j].startTime = this.data[i].timeList[
                      j
                    ].startTime.replace(/\s/, "日 ");
                    this.data[i].timeList[j].endTime = this.data[i].timeList[
                      j
                    ].endTime.replace(reg, "年");
                    this.data[i].timeList[j].endTime = this.data[i].timeList[
                      j
                    ].endTime.replace(reg, "月");
                    this.data[i].timeList[j].endTime = this.data[i].timeList[
                      j
                    ].endTime.replace(/\s/, "日 ");
                  }
                }
              } else {
                this.data = "";
                this.totalteacher = 0;
              }
            } else {
              this.$Notice.warning({
                title: `出错，提示：${res.data.msg}`
              });
            }
          })
          .catch(err => {});
      }
    },
    loadDataAcademy() {
      let URL = `${apiPath}/user/loadDataAcademy`;
      let academy = this.choose.academy;
      let campus = this.choose.campus;
      let page = this.page;
      if (this.tag) {
        return;
      } else {
        axios({
          url: URL,
          method: "post",
          data: {
            academy: academy,
            campsuList: campus,
            page: page
          }
        })
          .then(res => {
            if (res.data.code === 200) {
              if (res.data.data != "暂时没有教师") {
                this.data = res.data.data;
                this.totalteacher = res.data.count;
                for (let i = 0; i < this.data.length; i++) {
                  this.data[i].satisfaction = parseFloat(
                    this.data[i].satisfaction
                  );
                  for (let j = 0; j < this.data[i].timeList.length; j++) {
                    var reg = /-/;
                    this.data[i].timeList[j].startTime = this.data[i].timeList[
                      j
                    ].startTime.replace(reg, "年");
                    this.data[i].timeList[j].startTime = this.data[i].timeList[
                      j
                    ].startTime.replace(reg, "月");
                    this.data[i].timeList[j].startTime = this.data[i].timeList[
                      j
                    ].startTime.replace(/\s/, "日 ");
                    this.data[i].timeList[j].endTime = this.data[i].timeList[
                      j
                    ].endTime.replace(reg, "年");
                    this.data[i].timeList[j].endTime = this.data[i].timeList[
                      j
                    ].endTime.replace(reg, "月");
                    this.data[i].timeList[j].endTime = this.data[i].timeList[
                      j
                    ].endTime.replace(/\s/, "日 ");
                  }
                }
              } else {
                this.data = "";
                this.totalteacher = 0;
              }
            } else {
              this.$Notice.warning({
                title: `出错，提示：${res.data.msg}`
              });
            }
          })
          .catch(err => {
            this.$Notice.warning({ title: `出错，提示：${err}` });
          });
      }
    },

    loadDataName() {
      let URL = `${apiPath}/user/loadDataName`;
      let name = this.teacherName;
      axios({
        url: URL,
        method: "post",
        data: {
          name: name
        }
      })
        .then(res => {
          if (res.data.code === 200) {
            this.data = res.data.data;
            this.tag = true;
            this.choose.campus = "全部";
            this.choose.academy = "";
            this.totalteacher = 1;
            for (let i = 0; i < this.data.length; i++) {
              this.data[i].satisfaction = parseFloat(this.data[i].satisfaction);
              for (let j = 0; j < this.data[i].timeList.length; j++) {
                var reg = /-/;
                this.data[i].timeList[j].startTime = this.data[i].timeList[
                  j
                ].startTime.replace(reg, "年");
                this.data[i].timeList[j].startTime = this.data[i].timeList[
                  j
                ].startTime.replace(reg, "月");
                this.data[i].timeList[j].startTime = this.data[i].timeList[
                  j
                ].startTime.replace(/\s/, "日 ");
                this.data[i].timeList[j].endTime = this.data[i].timeList[
                  j
                ].endTime.replace(reg, "年");
                this.data[i].timeList[j].endTime = this.data[i].timeList[
                  j
                ].endTime.replace(reg, "月");
                this.data[i].timeList[j].endTime = this.data[i].timeList[
                  j
                ].endTime.replace(/\s/, "日 ");
              }
            }
          } else {
            this.$Notice.warning({ title: `查无此老师` });
            this.data = null;
            this.teacherName = "";
          }
        })
        .catch(err => {
          this.$Notice.warning({ title: `出错：${err}` });
        });
    },
    expend() {
      this.academyactive = !this.academyactive;
    },
    specifics(item) {
      this.item = item;
      this.modal1 = true;
    },
    precontract(item) {
      if (item.timeList.length == 0) {
        this.$Message.warning("老师还没做好准备，请稍后再来亲");
        return;
      }
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
      // this.$Loading.start();
      axios
        .post(`http:${apiPath}/uploadfile`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          // this.$Loading.finish();
          this.loading = false;
          this.$Message.success("论文上传成功");
          this.article.essaysrc = "http://202.120.117.43/" + res.data;
        });
      return false;
    }
  },
  watch: {
    page(val, oldVal) {
      if (val != 0) {
        if (this.choose.academy != "") {
          this.loadDataAcademy();
        } else {
          this.loadDataCampus();
        }
      }
    },
    choose: {
      handler(newVal, oldVal) {
        this.page = 0;

        if (this.campusitem != this.choose.campus) {
          this.campusitem = this.choose.campus;
          if (!this.tag) {
            this.choose.academy = "";
          }
          this.loadDataCampus();
        } else if (this.choose.academy != "") {
          this.loadDataAcademy();
        }
        this.tag = false;
      },
      deep: true
    },
    // counselList: {
    //   handler() {
    //     this.loadDataHelp();
    //   },
    //   deep: true
    // },

    essaymodal(val, oldVal) {
      if (!val) {
        this.article.essayname = "";
        this.article.description = "";
        this.article.essayfile = "";
        this.article.essaySubmit = false;
        this.article.emailSubmit = false;
        this.article.essaysrc = "";
        this.article.time = "";
        this.article.captchacode = "";
      }
    },
    article: {
      handler() {
        if (
          this.article.essayname != "" &&
          this.article.essaysrc != "" &&
          this.article.description != "" &&
          this.article.time != "" &&
          this.article.captchacode != ""
        ) {
          this.article.essaySubmit = false;
        } else {
          this.article.essaySubmit = true;
        }
        if (
          this.article.essayname != "" &&
          this.article.essaysrc != "" &&
          this.article.description != "" &&
          this.article.time != ""
        ) {
          this.article.emailSubmit = false;
        } else {
          this.article.emailSubmit = true;
        }
      },
      deep: true
    },
    teacherName(val, oldVal) {
      if (val != "") {
        this.loadDataName();
      }
    }
  },
  mounted() {
    this.choose.campus = "全部";
    this.browser = localStorage.getItem("browser");
  }
};
</script>
<style lang="scss" scoped>
@import "precontract";
</style>
<style lang="scss">
.ivu-select-selected-value {
  color: #000;
}
.expand-value {
  color: #000;
}

.ivu-select-item {
  padding: 7px 6.8px;
}
</style>

<style lang="scss">
.exhibit {
  li {
    .list:hover {
      .ivu-btn-ghost.ivu-btn-dashed,
      .ivu-btn-ghost.ivu-btn-default {
        border-color: rgb(255, 255, 255);
        color: rgb(255, 255, 255);
      }
    }
  }
}
ul li .ivu-btn-ghost.ivu-btn-dashed,
.ivu-btn-ghost.ivu-btn-default {
  border-color: rgb(131, 131, 131);
  color: rgb(121, 120, 120);
}
</style>