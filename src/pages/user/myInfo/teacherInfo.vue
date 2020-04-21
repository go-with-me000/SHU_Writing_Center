<template>
  <div class="wrapper">
    <Row type="flex" justify="center" class="code-row-bg">
      <Col span="16">
        <div class="content">
          <Form
            ref="person_info"
            :model="person_info"
            :rules="rulesx"
            :label-width="120"
            class="formEx"
            style="width: 500px"
            size="large"
          >
            <FormItem label="姓名" prop="name">
              <Input v-model="person_info.teachername" placeholder="请输入您的名字" disabled></Input>
            </FormItem>
            <FormItem label="工号" prop="teacherid">
              <Input v-model="person_info.teacherid" placeholder="请输入您的工号" disabled></Input>
            </FormItem>
            <FormItem label="学院" prop="academy">
              <Input v-model="person_info.academy" placeholder="请输入您的学院" disabled></Input>
            </FormItem>
            <FormItem label="您的评分">
              <Rate disabled v-model="person_info.satisfaction" allow-half show-text>
                <span style="color: #f5a623">{{ person_info.satisfaction }}</span>
              </Rate>
            </FormItem>
            <Divider class="spider"></Divider>

            <FormItem label="职位" prop="job">
              <Input v-model="person_info.job" placeholder="请输入您的职位" :disabled="disable_impl"></Input>
            </FormItem>

            <FormItem label="组织" prop="organization">
              <Input
                v-model="person_info.organization"
                placeholder="请输入您的组织"
                :disabled="disable_impl"
              ></Input>
            </FormItem>
            <FormItem label="专业" prop="major">
              <Input v-model="person_info.major" placeholder="请输入您的专业" :disabled="disable_impl"></Input>
            </FormItem>
            <FormItem label="辅导方向" prop="helpintention">
              <Input
                v-model="person_info.helpintention"
                placeholder="请输入辅导方向"
                :disabled="disable_impl"
              ></Input>
            </FormItem>
            <FormItem label="在线状态" prop="online">
              <RadioGroup v-model="person_info.online">
                <Radio label="是" :disabled="disable_impl">是</Radio>
                <Radio label="否" :disabled="disable_impl">否</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="校区" prop="campus">
              <RadioGroup v-model="person_info.campus">
                <Radio label="宝山校区" :disabled="disable_impl">宝山校区</Radio>
                <Radio label="延长校区" :disabled="disable_impl">延长校区</Radio>
                <Radio label="嘉定校区" :disabled="disable_impl">嘉定校区</Radio>
              </RadioGroup>
            </FormItem>

            <FormItem label="地址" prop="building">
              <Input
                v-model="person_info.building"
                placeholder="请输入您所在的教学楼"
                :disabled="disable_impl"
              ></Input>
            </FormItem>
            <FormItem label="手机" prop="phone">
              <Input v-model="person_info.phone" placeholder="请输入你的手机号码" :disabled="disable_impl"></Input>
            </FormItem>
            <FormItem label="邮箱" prop="email">
              <Input v-model="person_info.email" placeholder="请输入您的邮箱" :disabled="disable_impl"></Input>
            </FormItem>
            <FormItem label="个人简介">
              <Input
                v-model="person_info.description"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                :disabled="disable_impl"
                placeholder="简单介绍一下自己"
              ></Input>
            </FormItem>
          </Form>

          <div class="autos">
            <Button
              type="info"
              size="large"
              v-if="disable_impl"
              style="margin-left: 50px"
              ghost
              @click="checkTime()"
            >查看辅导时间</Button>
            <Button
              type="primary"
              size="large"
              v-if="disable_impl"
              style="margin-left: 25px"
              ghost
              @click="Change()"
            >修改信息</Button>
            <Button
              size="large"
              style="margin-left: 100px"
              v-if="!disable_impl"
              @click="cancel('person_info')"
            >取消</Button>
            <Button
              type="success"
              size="large"
              style="margin-left: 20px"
              :loading="loading"
              v-if="!disable_impl"
              ghost
              @click="updatePersonInfo('person_info')"
            >保存</Button>
          </div>
        </div>
      </Col>

      <Col span="2" style="text-align:center;">
        <div class="displayimg">
          <Upload
            :before-upload="handleBeforeUpload"
            action="//jsonplaceholder.typicode.com/posts/"
            style="margin-top:10px;width:100%"
          >
            <Button icon="ios-cloud-upload-outline" type="primary" ghost long>点击此处上传照片</Button>
          </Upload>
          <div class="display">
            <img :src="person_info.imagesrc" style="width: 95%;height:100%;" />
          </div>
          <div class="qrcode">
            <img src="@/common/img/public.jpg" />
            <p style="font-weight:bold;font-size:14px;">请老师扫码二维码，关注公众号</p>
            <p style="font-weight:bold;font-size:16px;">更快获取最新预约信息</p>
          </div>
        </div>
      </Col>
    </Row>
    <Modal v-model="modal1" width="56" :styles="{top: '20px'}">
      <p slot="header" style="color:#000;text-align:center;height:30px;">
        <span style="position:relative;font-size:24px;font-weight:bold;top:20%">辅导时间段</span>
      </p>
      <div style="text-align:center">
        <Table border :columns="columns" :data="course" stripe :loading="loading2" height="300"></Table>
      </div>
      <div slot="footer" style="text-align:center">
        <Button type="info" size="large" @click="modal4=true">增加时间段</Button>
        <Button type="success" size="large" @click="refresh()">刷新</Button>
      </div>
    </Modal>
    <Modal v-model="modal2" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>删除之后所有相关信息将不可恢复</p>
        <p>确认删除？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="loading3" @click="Delete()">删除</Button>
      </div>
    </Modal>
    <Modal v-model="modal3" width="350">
      <p slot="header" style="color:#000;text-align:center;height:30px;">
        <span style="position:relative;font-size:24px;font-weight:bold;top:20%">修改时间段</span>
      </p>
      <div style="text-align:center">
        <Form ref="theCourse" :model="theCourse" :label-width="80">
          <FormItem label="开始时间">
            <DatePicker
              type="datetime"
              placeholder="选择时间"
              :value="theCourse.startTime"
              :options="options3"
              ref="changestart"
              @on-change="theCourse.startTime=$event;showTimePanel('changestart')"
              hide-disabled-options
              :time-picker-options="optionstart"
              format="yyyy-MM-dd HH:mm:ss"
            ></DatePicker>
          </FormItem>
          <FormItem label="结束时间">
            <DatePicker
              type="datetime"
              placeholder="选择时间"
              :value="theCourse.endTime"
              @on-change="theCourse.endTime=$event;showTimePanel('deleteend')"
              format="yyyy-MM-dd HH:mm:ss"
              :options="options3"
              :time-picker-options="optionend"
              ref="deleteend"
            ></DatePicker>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" style="text-align:center">
        <Button type="success" size="large" @click="sure()">确认</Button>
        <Button type="info" size="large" @click="modal3=false">取消</Button>
      </div>
    </Modal>
    <Modal v-model="modal4" width="350">
      <p slot="header" style="color:#000;text-align:center;height:30px;">
        <span style="position:relative;font-size:24px;font-weight:bold;top:20%">增加时间段</span>
      </p>
      <div style="text-align:center">
        <Form ref="theCourse" :model="theCourse" :label-width="80">
          <FormItem label="开始时间">
            <DatePicker
              type="datetime"
              placeholder="选择时间"
              :value="theCourse.startTime"
              @on-change="theCourse.startTime=$event;showTimePanel('addstart')"
              ref="addstart"
              format="yyyy-MM-dd HH:mm:ss"
              :options="options3"
              :time-picker-options="optionstart"
            ></DatePicker>
          </FormItem>
          <FormItem label="结束时间">
            <DatePicker
              type="datetime"
              placeholder="选择时间"
              :value="theCourse.endTime"
              @on-change="theCourse.endTime=$event;showTimePanel('addend')"
              ref="addend"
              format="yyyy-MM-dd HH:mm:ss"
              :options="options3"
              :time-picker-options="optionend"
            ></DatePicker>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" style="text-align:center">
        <Button type="success" size="large" @click="add()">确认</Button>
        <Button type="info" size="large" @click="modal4=false">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    const validateNum = (rule, value, callback) => {
      if (value % 1 != 0) {
        return callback(new Error("请填写正确的手机号码"));
      } else {
        callback();
      }
    };
    return {
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
      disable_impl: true,
      loading: false,
      loading2: false,
      loading3: false,
      theIndex: "",
      theCourse: {
        // helpintention: "",
        // online: "",
        startTime: "",
        endTime: "",
        id: 0,
        occupy: ""
      },
      person_info: {
        teachername: "",
        campus: "",
        building: "",

        job: "",
        organization: "",
        teacherid: "",
        academy: "",
        phone: "",
        description: "",
        imagesrc: "",
        helpintention: "",
        online: "",
        major: "",
        satisfaction: 0,
        email: ""
      },
      person_temp: {},
      options3: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      optionend: {
        // steps:[1,10,10],
        disabledHours: [0, 1, 2, 3, 4, 5, 6, 7, 23],
        hideDisabledOptions: true
      },
      optionstart: {
        // steps:[1,10,10],
        disabledHours: [0, 1, 2, 3, 4, 5, 6, 7, 22, 23],
        hideDisabledOptions: true
      },
      rulesx: {
        job: [
          {
            required: true,
            message: "职位不能为空",
            trigger: "blur"
          }
        ],

        campus: [
          {
            required: true,
            message: "请选择校区",
            trigger: "blur"
          }
        ],
        building: [
          {
            required: true,
            message: "教学楼不能为空",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "邮箱不能为空",
            trigger: "blur"
          },
          { type: "email", message: "邮箱格式错误", trigger: "blur" }
        ],

        organization: [
          {
            required: true,
            message: "组织不能为空",
            trigger: "blur"
          }
        ],
        // email: [
        //   {
        //     required: true,
        //     message: "邮箱不能为空",
        //     trigger: "blur"
        //   },
        //   { type: "email", message: "邮箱格式错误", trigger: "blur" }
        // ],
        phone: [
          {
            required: true,
            message: "手机号码不能为空",
            trigger: "blur"
          },
          { validator: validateNum }
        ],
        helpintention: [
          {
            required: true,
            message: "辅导方向不能为空",
            trigger: "blur"
          }
        ],
        major: [
          {
            required: true,
            message: "专业不能为空",
            trigger: "blur"
          }
        ],
        online: [
          {
            required: true,
            message: "请选择是否在线",
            trigger: "blur"
          }
        ]
      },

      columns: [
        {
          type: "index",
          width: 70,
          align: "center",
          title: "序号"
        },
        {
          title: "开始时间",
          key: "startTime"
        },
        {
          title: "结束时间",
          key: "endTime"
        },
        {
          title: "预约状态",
          key: "occupy",
          width: 140,
          render: (h, params) => {
            const row = params.row;
            const color = row.occupy === 1 ? "success" : "primary";
            const text = row.occupy === 1 ? "已被预约" : "尚未预约";

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
          title: "Action",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                    ghost: true,
                    disabled: params.row.occupy !== 1 ? false : true
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.change(params.index);
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                    ghost: true,
                    disabled: params.row.occupy !== 1 ? false : true
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      course: []
    };
  },
  methods: {
    showTimePanel(refName) {
      this.$refs[refName].onSelectionModeChange("time");
    },
    updatePersonInfo(person_info) {
      this.$refs[person_info].validate(valid => {
        if (valid) {
          let URL = `${apiPath}/user/changeTeacherPersonal`;
          // let free = true ? false : this.person_info.free == "是";
          let online = 1 ? 0 : this.person_info.online == "是";
          this.loading = true;
          if(this.person_info.phone.length>=11){
            this.$Message.warning({
                  content: `请输入正确的手机位数`
                });
                this.loading = false;
                return;
          }
          axios({
            url: URL,
            method: "POST",
            data: {
              teacherId: this.person_info.teacherid,
              email: this.person_info.email,
              phone: this.person_info.phone,
              campus: this.person_info.campus,
              building: this.person_info.building,

              job: this.person_info.job,
              online: online,
              organization: this.person_info.organization,
              helpintention: this.person_info.helpintention,
              description: this.person_info.description,
              major: this.person_info.major
            }
          })
            .then(res => {
              if (res.data.code === 200) {
                this.$Message.success("修改成功");
                this.disable_impl = !this.disable_impl;
              } else {
                this.$Message.warning({
                  content: `出错，提示：${res.data.msg}`
                });
                this.disable_impl = !this.disable_impl;
              }
              this.loading = false;
            })
            .catch(err => {
              this.$Message.warning({ content: `出错，提示：${err}` });
              this.disable_impl = !this.disable_impl;
              this.loading = false;
            });
        } else {
          this.$Message.warning("个人信息填写不正确");
        }
      });
    },
    cancel(name) {
      // this.$refs[name].resetFields();
      this.person_info = this.person_temp;
      this.disable_impl = !this.disable_impl;
    },
    save() {
      localStorage.setItem("name", person_info.name);
    },
    refresh() {
      this.loadData2();
    },
    remove(index) {
      (this.theIndex = index), (this.modal2 = true);
    },
    change(index) {
      (this.theIndex = index), (this.modal3 = true);
    },
    Change() {
      this.disable_impl = !this.disable_impl;
      this.person_temp = this.person_info;
    },
    add() {
      //增加课程
      if (!(this.theCourse.startTime == "" || this.theCourse.endTime == "")) {
        let URL = `${apiPath}/user/addAppointmentTime`;
        let startTime = this.theCourse.startTime;
        let endTime = this.theCourse.endTime;
        let teacherId = localStorage.getItem("userID");

        axios({
          url: URL,
          method: "POST",
          data: {
            teacherId: teacherId,
            startTime: startTime,
            endTime: endTime
          }
        })
          .then(res => {
            if (res.data.code === 200) {
              this.$Message.success("增加成功");
              this.modal4 = false;
              this.loadData2();
            } else {
              this.$Message.warning({
                content: `出错，提示：${res.data.msg}`
              });
            }
          })
          .catch(err => {
            this.$Message.warning({ content: `出错，提示：${err}` });
          });
      } else {
        this.$Message.warning("请填写完整时间信息");
      }
    },
    sure() {
      //修改课程
      if (!(this.theCourse.startTime == "" || this.theCourse.endTime == "")) {
        let URL = `${apiPath}/user/changeAppointmentTime`;
        let id = this.theCourse.id;
        let teacherId = localStorage.getItem("userID");
        let startTime = this.theCourse.startTime;
        let endTime = this.theCourse.endTime;
        axios({
          url: URL,
          method: "POST",
          data: {
            id: id,
            startTime: startTime,
            endTime: endTime
          }
        })
          .then(res => {
            if (res.data.code === 200) {
              this.$Message.success("修改成功");
              this.modal3 = false;
              this.loadData2();
            } else {
              this.$Message.warning({
                content: `出错，提示：${res.data.msg}`
              });
            }
          })
          .catch(err => {
            this.$Message.warning({ content: `出错，提示：${err}` });
          });
      } else {
        this.$Message.warning("请填写完整时间信息");
      }
    },
    checkTime() {
      let email = localStorage.getItem("email");
      if (email != "") {
        this.modal1 = true;
      } else {
        this.$Notice.warning({
          title: "未填邮箱",
          desc: "请先填写个人信息，再进行预约"
        });
      }
    },
    Delete() {
      let URL = `${apiPath}/user/deleteAppointmentTime`;
      let id = this.course[this.theIndex].id;
      this.loading3 = true;
      axios({
        url: URL,
        method: "post",
        data: {
          id: id
        }
      })
        .then(res => {
          if (res.data.code === 200) {
            this.$Notice.success({ title: `删除成功` });
            this.loading3 = false;
            this.modal2 = false;
            this.loadData2();
          } else {
            this.$Notice.warning({ title: `出错，提示：${res.data.msg}` });
            this.loading3 = false;
          }
        })
        .catch(err => {
          this.$Notice.warning({ title: `出错，提示：${err}` });
          this.loading3 = false;
        });
    },
    loadData() {
      let teacherid = localStorage.getItem("userID");
      let URL = `${apiPath}/user/showTeacherPersonal?teacherId=${teacherid}`;
      axios({
        url: URL,
        method: "get"
      })
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.data != null) {
              this.person_info = res.data.data;
              this.person_info.online = 1 ? "是" : "否";
              this.person_info.satisfaction = parseFloat(
                this.person_info.satisfaction
              );
            }
          } else {
            this.$Notice.warning({ title: `出错，提示：${res.data.msg}` });
          }
        })
        .catch(err => {
          // this.$Notice.warning({ title: `出错，提示：${err}` });
        });
    },
    loadData2() {
      let teacherid = localStorage.getItem("userID");
      let URL = `${apiPath}/user/seeAppointmentTime?teacherId=${teacherid}`;
      this.loading2 = true;
      axios({
        url: URL,
        method: "get"
      })
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.data != "暂时还没有设置时间") {
              this.course = res.data.data;
            }
            this.loading2 = false;
          } else {
            this.$Notice.warning({ title: `出错，提示：${res.data.msg}` });
            this.loading2 = false;
          }
        })
        .catch(err => {
          this.$Notice.warning({ title: `出错，提示：${err}` });
          this.loading2 = false;
        });
    },
    changeimg(src) {
      let teacherid = localStorage.getItem("userID");
      let URL = `${apiPath}/user/changeImage`;

      axios({
        url: URL,
        method: "post",
        data: {
          src: src,
          teacherId: teacherid
        }
      })
        .then(res => {
          if (res.data.code === 200) {
            this.$Message.success("照片上传成功");
          } else {
            this.$Notice.warning({ title: `出错，提示：${res.data.msg}` });
          }
        })
        .catch(err => {
          this.$Notice.warning({ title: `出错，提示：${err}` });
        });
    },
    handleBeforeUpload(file) {
      const extension1 = file.name.split(".")[1] === "jpg";
      const extension2 = file.name.split(".")[1] === "jpeg";
      const extension3 = file.name.split(".")[1] === "png";
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!extension1 && !extension2 && !extension3) {
        this.$Notice.warning({
          title: "这个文件的格式错误",
          desc:
            "名字为" +
            file.name +
            " 的文件格式是错误的，请上传jpg,jpeg,png后缀的文件"
        });
        return false;
      }
      if (!isLt5M) {
        this.$Notice.warning({
          title: "文件体积过大",
          desc: file.name + " 超出5MB"
        });
        return false;
      }
      let formData = new FormData();
      formData.append("uploadfile", file);
      axios
        .post(`${apiPath}/uploadfile`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          this.person_info.imagesrc = "http://202.120.117.43" + res.data;
          console.log(this.person_info.imagesrc);
          this.changeimg(this.person_info.imagesrc);
        });
      return false;
    }
  },
  mounted() {
    this.loadData();
  },
  watch: {
    modal1() {
      if (this.modal1) {
        this.loadData2();
      }
    },
    modal4(val, oldVal) {
      if (!val) {
        this.theCourse.id = 0;
        this.theCourse.startTime = "";
        this.theCourse.endTime = "";
      }
    },
    modal3(val, oldVal) {
      if (!val) {
        this.theCourse.id = 0;
        this.theCourse.startTime = "";
        this.theCourse.endTime = "";
      } else {
        this.theCourse.startTime = this.course[this.theIndex].startTime;
        this.theCourse.endTime = this.course[this.theIndex].endTime;
        this.theCourse.id = this.course[this.theIndex].id;
      }
    },
    theCourse: {
      handler() {
        this.theCourse.startTime = this.theCourse.startTime.replace(
          "00:00:00",
          "08:00:00"
        );
        this.theCourse.endTime = this.theCourse.endTime.replace(
          "00:00:00",
          "08:00:00"
        );
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "myInfo";
</style>
<style>
.ivu-btn-primary {
  color: #fff;

  border-color: rgba(216, 218, 218, 0.4);
}
</style>
