<template>
  <div>
    <Button icon="ios-refresh" type="success" ghost size="large" @click="refresh(tab)" id="fresh">刷新</Button>
    <Row>
      <Tabs :value="theIdentity" class="tabs" @on-click="tabClick">
        <TabPane label="预约发起" name="student" icon="md-bookmarks">
          <div class="checkbox">
            审核
            <i-switch v-model="Status1.check" style="margin-right: 5px"></i-switch>成功
            <i-switch v-model="Status1.success" style="margin-right: 5px"></i-switch>拒绝
            <i-switch v-model="Status1.fail" style="margin-right: 5px"></i-switch>
          </div>
          <Table
            :columns="columns1"
            :data="data1"
            class="tableMain"
            height="700"
            stripe
            border
            :loading="loading"
          ></Table>
        </TabPane>

        <TabPane label="预约接收" name="teacher" icon="ios-folder" v-if="identity!='ROLE_Student'">
          <div class="checkbox">
            审核
            <i-switch v-model="Status2.check" style="margin-right: 5px"></i-switch>成功
            <i-switch v-model="Status2.success" style="margin-right: 5px"></i-switch>拒绝
            <i-switch v-model="Status2.fail" style="margin-right: 5px"></i-switch>
          </div>
          <Table
            :columns="columns2"
            :data="data2"
            class="tableMain"
            height="700"
            stripe
            border
            :loading="loading"
          ></Table>
        </TabPane>
      </Tabs>
    </Row>
    <Modal v-model="modal1" class-name="vertical-center-modal" :styles="{top: '150px'}">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span style="font-size:18px;">拒绝理由</span>
      </p>
      <div style="position:relative;width:90%;left:5%;">
        <Card>
          <p style="line-height:2em;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{this.reason}}</p>
        </Card>
      </div>
      <div slot="footer" style="text-align:center">
        <Button type="success" size="large" @click="again()" style="margin-right:1vh;">重新预约</Button>
        <Button type="primary" size="large" @click="modal1=false">确定</Button>
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
          <Col span="4" offset="1">
            <Button
              type="primary"
              size="large"
              @click="captcha()"
              style="margin-left:10px;position:relative"
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
    <Modal v-model="modal3" width="440">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>请给出拒绝理由</span>
      </p>
      <div style="text-align:center;">
        <Input v-model="reason" type="textarea" :rows="5" placeholder="请写入理由" />
      </div>
      <div slot="footer" style="text-align:center">
        <Button type="info" ghost size="large" @click="cancel2()">取消</Button>
        <Button type="error" size="large" @click="against()">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import expandRow1 from "./myPrecontract1.vue";
import expandRow2 from "./myPrecontract4.vue";
// import store from "@/vuex/store";
import axios from "axios";
export default {
  components: { expandRow1, expandRow2 },
  data() {
    return {
      theIdentity: "",
      duty: "", //用户的第二重身份
      modal1: false, //学生查看拒绝理由对话框
      essaymodal: false, //重新提交论文对话框
      modal3: false, //老师拒绝理由对话框
      articleSubmit: true, //是否上传了论文，true为还未上传
      reason: "", //拒绝理由
      slavery: "student", //身份
      index: "",
      item: "",
      loading: false,
      article: {
        essayname: "", //论文题目
        description: "", //论文介绍
        essaysrc: "", //论文地址
        essaySubmit: true, //是否提交了论文
        essayfile: "", //论文文件
        time: "",
        captchacode: ""
      },
      Status1: {
        check: true,
        success: true,
        fail: true
      }, //用户此时的查询状态
      Status2: {
        check: true,
        success: true,
        fail: true
      }, //老师此时的查询状态
      tab: 1, //标签页的序号，1代表学生，2代表老师
      identity: "",
      loading: false, //表格是否处在加载
      data1: [],
      data2: [],
      columns1: [
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            return h(expandRow1, {
              props: {
                row: params.row
              }
            });
          }
        },
        {
          type: "index",
          width: 70,
          align: "center",
          title: "序号"
        },
        {
          title: "预约号",
          key: "requestid",
          // width: 150
        },
        {
          title: "预约老师",
          key: "teachername",
          // width: 150
        },

        {
          title: "辅导方向",
          key: "helpintention"
          // width: 150
        },
        {
          title: "预约地点",
          key: "building"
        },
       
        {
          title: "预约状态",
          key: "applystatus",
          // width: 192,
          render: (h, params) => {
            const row = params.row;
            const color =
              row.applystatus === 1
                ? "warning"
                : row.applystatus === 2
                ? "success"
                : "error";
            const text =
              row.applystatus === 1
                ? "正在审核"
                : row.applystatus === 2
                ? "预约成功"
                : "预约失败";

            return h("div", [
              h(
                "Tag",
                {
                  props: {
                    type: "dot",
                    color: color
                  }
                },
                text
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    // size:'small',
                    ghost: true
                  },
                  style: {
                    display: row.applystatus != 3 ? "none" : "inline-block",

                    marginRight: "-100px"
                  },
                  on: {
                    click: () => {
                      this.specifics(params.row);
                    }
                  }
                },
                "详情"
              )
            ]);
          }
        }
      ],
      columns2: [
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            return h(expandRow2, {
              props: {
                row: params.row
              }
            });
          }
        },

        {
          type: "index",
          width: 70,
          align: "center",
          title: "序号"
        },
        // {
        //   title: "预约号",
        //   key: "requestId",
        //   // width: 150
        // },
        
        // {
        //   title: "论文",
        //   key: "essayName"
        // },
        {
          title: "预约状态",
          key: "applystatus",
          width: 140,
          render: (h, params) => {
            const row = params.row;
            const color =
              row.applyStatus == 1
                ? "warning"
                : row.applyStatus == 2
                ? "success"
                : "error";
            const text =
              row.applyStatus == 1
                ? "未操作"
                : row.applyStatus == 2
                ? "已同意"
                : "已拒绝";

            return h(
              "Tag",
              {
                props: {
                  type: "dot",
                  color: color
                }
              },
              text
            );
          }
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                    ghost: true,
                    disabled: params.row.applyStatus === 1 ? false : true
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.agree(params.index);
                    }
                  }
                },
                "同意"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                    ghost: true,
                    disabled: params.row.applyStatus === 1 ? false : true
                  },
                  on: {
                    click: () => {
                      this.index = params.index;
                      this.modal3 = true;
                    }
                  }
                },
                "拒绝"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    init() {
      if (this.identity == "ROLE_Teacher") {
        if (this.duty == "学生教师") {
          this.loadData3();
        } else {
          this.loadData2();
        }

        this.theIdentity = "teacher";
      } else {
        this.loadData1();
        this.theIdentity = "student";
      }
    },
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
    hang() {
      let URL = `${apiPath}/user/userConfirmsAppointment`;
      let URL2 = `${apiPath}/user/userAppointStteacher`;
      let URLs = this.item.job == undefined ? URL2 : URL;
      let teacherid =
        this.item.job == undefined
          ? this.item.stteacherid
          : this.item.teacherid;
      let userID = localStorage.getItem("userID");

      axios({
        url: URLs,
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
            this.loadData1();
          } else {
            this.$Notice.warning({ title: `出错，提示：${res.data.msg}` });
          }
        })
        .catch(err => {
          this.$Notice.warning({ title: `出错，提示：${err}` });
        });
    },
    loadData1() {
      let URL = `${apiPath}/user/userCheckStatus`;
      this.loading = true;
      this.tab = 1;
      let check = this.Status1.check;
      let success = this.Status1.success;
      let fail = this.Status1.fail;
      let studentID = localStorage.getItem("userID");

      axios({
        url: URL,
        method: "post",
        data: {
          success: success,
          check: check,
          fail: fail,
          userId: studentID
        }
      })
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.data != null) {
              if (res.data.data != "成功") {
                this.data1 = res.data.data;
                for (let i = 0; i < this.data1.length; i++) {
                  this.data1[i].satisfaction = parseFloat(
                    this.data1[i].satisfaction
                  );
                  for (let j = 0; j < this.data1[i].timeList.length; j++) {
                    var reg = /-/;
                    this.data1[i].timeList[j].startTime = this.data1[
                      i
                    ].timeList[j].startTime.replace(reg, "年");
                    this.data1[i].timeList[j].startTime = this.data1[
                      i
                    ].timeList[j].startTime.replace(reg, "月");
                    this.data1[i].timeList[j].startTime = this.data1[
                      i
                    ].timeList[j].startTime.replace(/\s/, "日 ");
                    this.data1[i].timeList[j].endTime = this.data1[i].timeList[
                      j
                    ].endTime.replace(reg, "年");
                    this.data1[i].timeList[j].endTime = this.data1[i].timeList[
                      j
                    ].endTime.replace(reg, "月");
                    this.data1[i].timeList[j].endTime = this.data1[i].timeList[
                      j
                    ].endTime.replace(/\s/, "日 ");
                  }
                }
              } else {
                this.data1 = [];
              }
            }

            this.loading = false;
          } else {
            this.$Notice.warning({ title: `出错，提示：${res.data.msg}` });
            this.loading = false;
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },

    loadData2() {
      let URL = `${apiPath}/user/showAppointmentForTeacher`;
      this.loading = true;
      this.tab = 2;
      let teacherID = localStorage.getItem("userID");
      let check = this.Status2.check;
      let success = this.Status2.success;
      let fail = this.Status2.fail;
      axios({
        url: URL,
        method: "post",
        data: {
          success: success,
          check: check,
          fail: fail,
          userId: teacherID
        }
      })
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.data != null) {
              if (res.data.data != "成功") {
                this.data2 = res.data.data;
              } else {
                this.data2 = [];
              }
            }

            this.loading = false;
          } else {
            this.$Notice.warning({
              content: `出错，提示：${res.data.msg}`
            });
            this.loading = false;
          }
        })
        .catch(err => {
          // this.$Notice.warning({ content: `出错，提示：${err}` });
          this.loading = false;
        });
    },
    loadData3() {
      let URL = `${apiPath}/teacher/showAppointmentForstteacher`;
      this.loading = true;
      this.tab = 2;
      let teacherID = localStorage.getItem("userID");
      let check = this.Status2.check;
      let success = this.Status2.success;
      let fail = this.Status2.fail;

      axios({
        url: URL,
        method: "post",
        data: {
          success: success,
          check: check,
          fail: fail,
          userId: teacherID
        }
      })
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.data != null) {
              if (res.data.data != "成功") {
                this.data2 = res.data.data;
              } else {
                this.data2 = [];
              }
            }

            this.loading = false;
          } else {
            this.$Notice.warning({
              content: `出错，提示：${res.data.msg}`
            });
            this.loading = false;
          }
        })
        .catch(err => {
          // this.$Notice.warning({ content: `出错，提示：${err}` });
          this.loading = false;
        });
    },
    captcha(studentid,teacherid,method) {
      let URL = `${apiPath}/user/sendSsmCode`;
      axios({
        url: URL,
        method: "get",
        params:{
          studentid:studentid,
          teacherid:teacherid,
          method:method
        }
      })
        .then(res => {
          if (res.data.code === 200) {
            // this.$Message.success({
            //   content: "验证码已发出，请注意查收"
            // });
          } else {
            this.$Notice.warning({ title: `${res.data.msg}` });
          }
        })
        .catch(err => {
          this.$Notice.warning({ title: `出错，提示：${err}` });
        });
    },
    agree(index) {
      let requestId = this.data2[index].requestId;
      let userId=localStorage.getItem("userID")
      let URL = `${apiPath}/teacher/agreeAppointment`;
      let URL2 = `${apiPath}/teacher/stTeacherAgreeAppointment`;
      let URLs = this.duty == "学生教师" ? URL2 : URL;
      axios({
        url: URLs,
        method: "post",
        data: {
          requestId: requestId
        }
      })
        .then(res => {
          if (res.data.code === 200) {
            
            this.$Message.success({
              content: `您已同意${this.data2[index].studentName}同学的预约`
            });
            this.captcha(this.data2[index].studentid,userId,0)
            if (this.duty == "学生教师") {
              this.loadData3();
            } else {
              this.loadData2();
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
    specifics(item) {
      let URL = `${apiPath}/user/showRefusedReason`;
      let requestId = item.requestid;

      this.modal1 = true;
      this.item = item;
      axios({
        url: URL,
        method: "post",
        data: {
          requestId: requestId
        }
      })
        .then(res => {
          if (res.data.code === 200) {
            this.reason = res.data.data;
          } else {
            this.$Notice.warning({
              content: `出错，提示：${res.data.msg}`
            });
          }
        })
        .catch(err => {
          this.$Notice.warning({ content: `出错，提示：${err}` });
        });
    },
    again() {
      this.modal1 = false;
      this.essaymodal = true;
    },
    cancel() {
      this.essaymodal = false;
    },
    cancel2() {
      this.modal3 = false;
    },
    against() {
      let requestID = this.data2[this.index].requestId;
      let reason = this.reason;
      let URL = `${apiPath}/teacher/refuseAppointment`;
      let userId=localStorage.getItem("userID")
      if (reason == "") {
        this.$Message.error({
          content: `请填写拒绝理由`
        });
        return;
      }
      axios({
        url: URL,
        method: "post",
        data: {
          requestId: requestID,
          reason: reason
        }
      })
        .then(res => {
          if (res.data.code === 200) {
            this.$Message.error({
              content: `您已拒绝${this.data2[this.index].studentName}的预约`
            });
            this.captcha(this.data2[this.index].studentid,userId,1)
            this.modal3 = false;
            if (this.duty == "学生教师") {
              this.loadData3();
            } else {
              this.loadData2();
            }
          } else {
            this.$Message.warning({
              content: `出错，提示：${res.data.msg}`
            });
            this.modal3 = false;
          }
        })
        .catch(err => {
          this.$Message.warning({ content: `出错，提示：${err}` });
        });
    },
    tabClick(name) {
      if (name == "student") {
        this.tab = 1;
        this.loadData1();
      } else if (this.duty == "学生教师") {
        this.tab = 2;
        this.loadData3();
      } else {
        this.tab = 2;

        this.loadData2();
      }
    },
    refresh(index) {
      if (index == 1) {
        this.loadData1();
      } else if (this.duty == "学生教师") {
        this.loadData3();
      } else {
        this.loadData2();
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
      axios
        .post(`http:${apiPath}/uploadfile`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          this.loading = false;
          this.article.essaysrc = "http://202.120.117.43/" + res.data;
          this.$Message.success("论文上传成功");
        });
      return false;
    }
  },
  mounted() {
    this.identity = localStorage.getItem("authority");
    this.duty = localStorage.getItem("duty");
    this.init();
  },
  watch: {
    modal3() {
      if (!this.modal3) {
        this.reason = "";
      }
    },
    Status1: {
      handler() {
        this.loadData1();
      },
      deep: true
      // immediate:true,
    },
    Status2: {
      handler() {
        if (this.duty == "学生教师") {
          this.loadData3();
        } else {
          this.loadData2();
        }
      },
      deep: true
      // immediate:true,
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

<style lang="scss" scoped>
@import "myPrecontract";
</style>
<style>
.ivu-select-item {
  padding: 7px 6.8px;
}
</style>