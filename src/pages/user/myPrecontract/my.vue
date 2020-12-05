<template>
  <div>
    <Button icon="ios-refresh" type="success" ghost size="large" @click="refresh()" id="fresh">刷新</Button>
    <Row>
      <Tabs value="name1" size="medium" class="tabs">
        <TabPane label="审核中" name="name1" icon="md-bookmarks">
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
        <TabPane icon="ios-browsers" label="已成功" name="name2">
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
        <TabPane label="已拒绝" name="name3" icon="md-card">
          <Table
            :columns="columns3"
            :data="data3"
            class="tableMain"
            height="700"
            stripe
            border
            :loading="loading"
          ></Table>
        </TabPane>
        <TabPane label="预约请求" name="name4" icon="ios-folder" v-if="identity==2">
          <Table
            :columns="columns4"
            :data="data4"
            class="tableMain"
            height="700"
            stripe
            border
            :loading="loading"
          ></Table>
        </TabPane>
      </Tabs>
    </Row>
  </div>
</template>

<script>
import expandRow1 from "./myPrecontract1.vue";
import expandRow2 from "./myPrecontract2.vue";
import expandRow3 from "./myPrecontract3.vue";
import expandRow4 from "./myPrecontract4.vue";
export default {
  components: { expandRow1, expandRow2, expandRow3, expandRow4 },
  data() {
    return {
      identity: "",
      loading: false,
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
          title: "老师",
          key: "teachername",
          width: 150
        },
        {
          title: "辅导方向",
          key: "helpintention",
          width: 240
        },
        {
          title: "辅导开始时间",
          key: "teachstarttime"
          // width: 140
        },
        {
          title: "辅导结束时间",
          key: "teachendtime"
          // width: 140
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
        {
          title: "老师",
          key: "teachername",
          width: 120
        },
        {
          title: "辅导方向",
          key: "helpintention",
          width: 240
        },
        {
          title: "辅导开始时间",
          key: "teachstarttime"
          // width: 160
        },
        {
          title: "辅导结束时间",
          key: "teachendtime"
          // width: 160
        }
      ],
      columns3: [
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            return h(expandRow3, {
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
          title: "老师",
          key: "teachername",
          width: 150
        },
        {
          title: "辅导方向",
          key: "helpintention",
          width: 240
        },
        {
          title: "辅导开始时间",
          key: "teachstarttime"
        },
        {
          title: "辅导结束时间",
          key: "teachendtime"
        }
      ],
      columns4: [
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            return h(expandRow4, {
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
          title: "学生姓名",
          key: "studentname",
          width: 120
        },
        {
          title: "性别",
          key: "gender",
          width: 100
        },
        {
          title: "学院",
          key: "academy",
          width:240
        },
        {
          title: "预约状态",
          key: "status"
        },
        {
          title: "操作",
          key: "action",
          // width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
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
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "拒绝"
              )
            ]);
          }
        }
      ],
      data1: [
        {
          teacherid: "12",
          teachername: "盛君",
          major: "计算机工程与技术",
          organization: "上海大学信息办",
          online: "是",
          campus: "宝山校区",
          building: "A楼",
          housenumber: "503",
          satisfaction: "96",
          teachstarttime: "2019-9-3",
          teachendtime: "2020-1-1",
          phone: "134324519",
          email: "23343@163.com",
          reservestatus: "已批准",
          depertmentid: "计算机工程与科学学院",
          major: "计算机科学与技术",
          duty: "副院长",
          imagesrc: "",
          description:
            "我是一个为人很好的老师，很欣慰很教学生，希望大家能来炫舞，我可以在任何时间教书。",
          helpintention: "人工智能"
        },
        {
          teacherid: "12",
          teachername: "盛君",
          major: "计算机工程与技术",
          organization: "上海大学信息办",
          online: "线上",
          campus: "宝山校区",
          building: "A楼",
          housenumber: "503",
          satisfaction: "96",
          teachstarttime: "2019-9-3",
          teachendtime: "2020-1-1",
          phone: "134324519",
          email: "23343@163.com",
          reservestatus: "审核中",
          depertmentid: "计算机工程与科学学院",
          major: "计算机科学与技术",
          duty: "副院长",
          imagesrc: "",
          description:
            "我是一个为人很好的老师，很欣慰很教学生，希望大家能来炫舞，我可以在任何时间教书。",
          helpintention: "人工智能"
        },
        {
          teacherid: "12",
          teachername: "盛君",
          major: "计算机工程与技术",
          organization: "上海大学信息办",
          online: "是",
          campus: "宝山校区",
          building: "A楼",
          housenumber: "503",
          satisfaction: "96",
          teachstarttime: "2019-9-3",
          teachendtime: "2020-1-1",
          phone: "134324519",
          email: "23343@163.com",
          reservestatus: "审核中",
          depertmentid: "计算机工程与科学学院",
          major: "计算机科学与技术",
          duty: "副院长",
          imagesrc: "",
          description:
            "我是一个为人很好的老师，很欣慰很教学生，希望大家能来炫舞，我可以在任何时间教书。",
          helpintention: "人工智能"
        }
      ],
      data2: [
        {
          teacherid: "12",
          teachername: "张波分",
          major: "计算机工程与技术",
          organization: "上海大学信息办",
          online: "线下",
          campus: "宝山校区",
          building: "A楼",
          housenumber: "503",
          satisfaction: "96",
          teachstarttime: "2019-9-3",
          teachendtime: "2020-1-1",
          phone: "134324519",
          email: "23343@163.com",
          reservestatus: "被拒绝",
          depertmentid: "计算机工程与科学学院",
          major: "计算机科学与技术",
          duty: "副院长",
          imagesrc: "",
          description:
            "我是一个为人很好的老师，很欣慰很教学生，希望大家能来炫舞，我可以在任何时间教书。",
          helpintention: "人工智能"
        },
        {
          teacherid: "12",
          teachername: "盛君",
          major: "计算机工程与技术",
          organization: "上海大学信息办",
          online: "是",
          campus: "宝山校区",
          building: "A楼",
          housenumber: "503",
          satisfaction: "96",
          teachstarttime: "2019-9-3",
          teachendtime: "2020-1-1",
          phone: "134324519",
          email: "23343@163.com",
          reservestatus: "已完成",
          depertmentid: "计算机工程与科学学院",
          major: "计算机科学与技术",
          duty: "副院长",
          imagesrc: "",
          description:
            "我是一个为人很好的老师，很欣慰很教学生，希望大家能来炫舞，我可以在任何时间教书。",
          helpintention: "人工智能"
        }
      ],
      data3: [
        {
          teacherid: "12",
          teachername: "盛君",
          major: "计算机工程与技术",
          organization: "上海大学信息办",
          online: "是",
          campus: "宝山校区",
          building: "A楼",
          housenumber: "503",
          satisfaction: "96",
          teachstarttime: "2019-9-3",
          teachendtime: "2020-1-1",
          phone: "134324519",
          email: "23343@163.com",
          reservestatus: "审核中",
          depertmentid: "计算机工程与科学学院",
          major: "计算机科学与技术",
          duty: "副院长",
          imagesrc: "",
          description:
            "我是一个为人很好的老师，很欣慰很教学生，希望大家能来炫舞，我可以在任何时间教书。",
          helpintention: "人工智能"
        },
        {
          teacherid: "12",
          teachername: "盛君",
          major: "计算机工程与技术",
          organization: "上海大学信息办",
          online: "是",
          campus: "宝山校区",
          building: "A楼",
          housenumber: "503",
          satisfaction: "96",
          teachstarttime: "2019-9-3",
          teachendtime: "2020-1-1",
          phone: "134324519",
          email: "23343@163.com",
          reservestatus: "审核中",
          depertmentid: "计算机工程与科学学院",
          major: "计算机科学与技术",
          duty: "副院长",
          imagesrc: "",
          description:
            "我是一个为人很好的老师，很欣慰很教学生，希望大家能来炫舞，我可以在任何时间教书。",
          helpintention: "人工智能"
        }
      ],
      data4: [
        {
          studentname: "谢鹏",
          academy: "计算机工程与科学学院",
          studentID:'1213123123',
          gender: "女",
          status:'已同意',
          phone:'123123213',
          email:"154@qq.com",
          grade:'大四',
          description:'年担任杭州电子工业学院英文及国际贸易教师，1995年创办中国第一家互联网商业信息发布网站“中国黄页”，1998年出任中国国际电子商务中心国富通信息技术发展有限公司总经理，1999年创办阿里巴巴，并担任阿里集团CEO、董事局主席。'
        },
        {
          studentname: "谢鹏",
          academy: "计算机工程与科学学院",
          gender: "女",
          status:'已同意',
        },
        {
          studentname: "谢鹏",
          academy: "计算机工程与科学学院",
          gender: "女",
          status:'已同意',
        }
      ]
    };
  },
  methods: {
    loadData() {
      let URL = `${apiPath}/`;
      this.loading = true;
      axios({
        url: URL,
        method: "get"
      })
        .then(res => {
          if (res.data.code === "SUCCESS") {
            this.data1 = res.data.data1;
            this.data2 = res.data.data2;
            this.data3 = res.data.data3;
            this.loading = true;
          } else {
            this.$Notice.warning({ title: `出错，提示：${res.data.message}` });
            this.loading = true;
          }
        })
        .catch(err => {
          // this.$Notice.warning({ title: `出错，提示：${err}` });
          this.loading = true;
        });
    }
  },
  mounted() {
    this.identity = localStorage.getItem("identity");
  }
};
</script>

<style lang="scss" scoped>
@import "myPrecontract";
</style>