<template>
  <div>
    <Tabs>
      <Tab-pane label="浏览界面" key="key1" class="tab1">
        <div class="homeMenu">
          <div class="mainBox">
            <img src="http://120.27.243.181/image/shop/peice.png" alt />
            <div>
              <span class="mainBoxTitel">当前预约数：</span>
              <div class="span">
                <span id="dataNums"></span>
              </div>
            </div>
          </div>
          <div class="mainBox" v-for="item in menuMessage">
            <img :src="item.src" alt />
            <div>
              <span class="mainBoxTitel">{{item.name}}：</span>
              <span class="mainBoxTitel">{{item.value}}</span>
            </div>
          </div>
        </div>

        <div class="tab1">
          <div id="coursesTable"></div>
        </div>
      </Tab-pane>
    </Tabs>

    <Modal
      width="70%"
      v-model="modal"
      class-name="vertical-center-modal"
      title="预约查询"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <div>
        <div>
          <Button @click="deleteAppointments" type="error">删除</Button>
        </div>
        <div class="table">
          <Table :columns="columns1" :data="appointMents" @on-selection-change="handleRowChange"></Table>
        </div>
        <div class="page">
          <Page :total="total" :page-size="8" show-elevator @on-change="changePage"></Page>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { Timetables } from "../statics/Timetables";
import "../statics/num";
import axios from "axios";
export default {
  data() {
    return {
      katonNumber: 0,
      menuMessage: [
        {
          name: "教师数",
          value: "12004.5",
          key: "money",
          src: "http://120.27.243.181/image/shop/vip.png"
        },
        {
          name: "预约总数",
          value: "256",
          key: "people",
          src: "http://120.27.243.181/image/shop/money.png"
        },
        {
          name: "违约次数",
          value: "3056",
          key: "piece",
          src: "http://120.27.243.181/image/shop/peice.png"
        }
      ],
      columns1: [
        {
          type: "selection",
          width: 30,
          align: "center"
        },
        {
          title: "申请编号",
          key: "requestId",
          width: 100,
          align: "center"
        },
        {
          title: "状态",
          key: "status",
            width: 160,
          align:"center",
          render: (h, params) => {
            const row = params.row;
            const color =
              row.applystatus == "1"
                ? "success"
                : row.applystatus == "0"
                ? "primary"
                : "error";
            const text =
              row.applystatus == "1"
                ? "已确认"
                : row.applystatus == "0"
                ? "待确认"
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
          title: "ID",
          align: "center",
          width: 100,
          key: "adminId"
        },

        {
          title: "教师",
          width: 80,
          key: "teachername"
        },
        {
          title: "申请时间",
          key: "beginTime",
          align: "center",
          width: 170,
          render: (h, params) => {
            return h(
              "div",
              this.formatDate(
                new Date(params.row.beginTime),
                "yyyy-MM-dd hh:mm"
              )
            );
          }
        },
        {
          title: "论文标题",
          align: "center",
          key: "essayname"
        },

        {
          title: "简介",
          key: "description",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "i-button",
                {
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "文章简介",
                        content: params.row.description
                      });
                    }
                  }
                },
                "预览"
              )
            ]);
          }
        },

        {
          title: "预览",
          key: "sd",
          width: 80,
          align: "center",
          render: (h, params) => {
            //return  <i-button type="success"  shape="circle" size="large">预览</i-button>;

            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "large"
                  },
                  on: {
                    click: () => {
                      this.pdfsee(params.row.essaysrc);
                    }
                  }
                },
                "预览"
              )
            ]);
          }
        }
      ],
      checkboxSelected: [],
      checkAllMsg: [],
      appointMents: [],
      index: [],
      selected: [],
      total: 1,
      modal: false,
      courseType: [
        [{ name: "8:00", index: "1" }, 1],
        [{ name: "9:00", index: "2" }, 1],
        [{ name: "10:00", index: "3" }, 1],
        [{ name: "11:00", index: "4" }, 1],
        [{ name: "12:00", index: "5" }, 1],
        [{ name: "13:00", index: "6" }, 1],
        [{ name: "14:00", index: "7" }, 1],
        [{ name: "15:00", index: "8" }, 1],
        [{ name: "16:00", index: "9" }, 1],
        [{ name: "17:00", index: "10" }, 1],
        [{ name: "18:00", index: "11" }, 1],
        [{ name: "19:00", index: "12" }, 1],
        [{ name: "20:00", index: "13" }, 1],
        [{ name: "21:00", index: "14" }, 1]
      ],
      week: ["223"],
      courseList: []
    };
  },
  mounted: function() {
    let that = this;
    axios({
      url: "http://202.120.117.43:8080/monitor/searchCircle",
      method: "get"
    }).then(res => {
      (this.katonNumber = res.data.data[0]),
        (this.menuMessage[0].value = res.data.data[2]),
        (this.menuMessage[1].value = res.data.data[1]),
        (this.menuMessage[2].value = res.data.data[3]);

      $("#dataNums").rollNumDaq({
        deVal: this.katonNumber
      });
    });

    axios
      .get("http://202.120.117.43:8080/monitor/getAppointmentsin14days")
      .then(response => {
        this.week = response.data.time1;
        this.courseList = response.data.time2;
        //初始化图表
        var Timetable = new Timetables({
          el: "#coursesTable",
          timetables: this.courseList,
          week: this.week,
          timetableType: this.courseType,

          gridOnClick: e => {
            if (e.name != null) {
              this.modal = true;
              this.selected = e.week;
              this.index = e.index;
              //如果点击的模块有预约，则查询当天预约
              that.getApplicationByOneTime(this.selected, this.index, 1);
            }
          },
          styles: {
            Gheight: 50
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  },

  methods: {
    //点击预览按钮
    pdfsee(essaysrc) {
      layui.use("layer", function() {
        var layer = layui.layer;
        layer.open({
          type: 2,
          area: ["1000px", "700px"],
          fixed: false, //不固定
          maxmin: true,
          content: essaysrc
        });
      });
    },

    //点击删除按钮时触发
    deleteAppointments() {
      if (this.checkboxSelected.length != null) {
        this.$Modal.confirm({
          title: "确认删除预约吗？",
          onOk: () => {
            axios({
              url: "http://202.120.117.43:8080/monitor/deleteAppointments",
              method: "post",
              data: "deleteids=" + this.checkboxSelected
            }).then(res => {
              this.$Message.info("删除成功");
            });
          }
        });
      }
    },

    //模态框选择框触发
    handleRowChange(currentRow) {
      this.checkAllMsg = currentRow;
      this.checkboxSelected = [];
      for (var item in currentRow) {
        this.checkboxSelected.push(currentRow[item].requestId);
      }
    },

    //模态框分页点击函数
    changePage(page) {
      this.getApplicationByOneTime(this.selected, this.index, page);
    },

    //格式化时间的函数
    formatDate(date, fmt) {
      let o = {
        "M+": date.getMonth() + 1, // 月份
        "d+": date.getDate(), // 日
        "h+": date.getHours(), // 小时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        S: date.getMilliseconds() // 毫秒
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
        }
      }
      return fmt;
    },

    ok() {},
    cancel() {},

    //点击模块后发起请求查询当天预约情况
    getApplicationByOneTime(myweek, myindex, page) {
      if (myweek != null && myindex != null) {
        //发起请求查询当天预约
        axios({
          url: "http://202.120.117.43:8080/monitor/getApplicationByOneTime",
          method: "get",
          params: {
            hourtime: myweek,
            hour: myindex,
            curr: page,
            nums: 8
          }
        }).then(res => {
          this.total = res.data.count;
          this.appointMents = res.data.data;
         
        });
        //开启模态框
        this.modal10 = true;
      }
    }
  }
};
</script>

 <style>
.vertical-center-modal {
  display: flex;
  align-items: top;
  justify-content: center;
}
.ivu-modal {
  top: 30px;
  height: 40%;
}
.tab1 {
  height: 70%;
  padding: 0;
  width: 1270px;
  padding: 0;
}
/*
  模态框分页
 */
.page {
  height: 5%;
  width: 50%;
}

.table {
  width: 100%;
}

#coursesTable {
  padding: 5px 3px;
}

.Courses-head {
  background-color: #edffff;
}

.Courses-head > div {
  text-align: center;
  font-size: 14px;
  line-height: 28px;
}

.left-hand-TextDom,
.Courses-head {
  background-color: #f2f6f7;
}

.Courses-leftHand {
  background-color: #f2f6f7;
  font-size: 12px;
}

.Courses-leftHand .left-hand-index {
  color: #9c9c9c;
  margin-bottom: 4px !important;
}

.Courses-leftHand .left-hand-name {
  color: #666;
}

.Courses-leftHand p {
  text-align: center;
  font-weight: 900;
}

.Courses-head > div {
  border-left: none !important;
}

.Courses-leftHand > div {
  padding-top: 5px;
  border-bottom: 1px dashed rgb(219, 219, 219);
}

.Courses-leftHand > div:last-child {
  border-bottom: none !important;
}

.left-hand-TextDom,
.Courses-head {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
}

.Courses-content > ul {
  border-bottom: 1px dashed rgb(219, 219, 219);
  box-sizing: border-box;
}

.Courses-content > ul:last-child {
  border-bottom: none !important;
}

.highlight-week {
  color: #02a9f5 !important;
}

.Courses-content li {
  text-align: center;
  color: #666666;
  font-size: 14px;
  line-height: 50px;
}

.Courses-content li span {
  padding: 3px 2px;
  box-sizing: border-box;
  line-height: 18px;
  border-radius: 4px;
  white-space: normal;
  word-break: break-all;
  cursor: pointer;
}

.grid-active {
  z-index: 9999;
}

.grid-active span {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

.homeMenu {
  width: 100%;
  height: 7%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background: #fdfffe;
}
.mainBox {
  width: calc(25% - 20px);
  background: #fdfffe;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  margin: 0px 5px;
  padding: 2px 5px;
  box-shadow: 2px 2px 10px #dcdcdc;
}
.mainBox img {
  width: 60px;
  height: 50px;
}

.mainBoxTitel {
  font-size: 18px;
  color: #737577;
}
.mainBoxNum {
  font-size: 19px;
  color: black;
  font-weight: 400;
}

/**
  数字滚动
   */

.inrow > li,
.inrow span {
  display: inline-block;
  *display: inline;
  *zoom: 1;
  font-size: 12px;
  letter-spacing: normal;
  word-spacing: normal;
}
.dataNums {
  position: absolute;
  display: block;
}
.dataNums .dataOne {
  width: 16px;
  height: 35px;
}
.dataNums .dataBoc {
  position: relative;
  height: 100%;
  overflow: hidden;
}
.dataNums .dataBoc .tt {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
}
.dataNums .tt span {
  height: 100%;
  font: bold 18px/28px "Arial";
}

.span {
  float: right;
  height: 23px;
  padding: 0 10px;
}
</style>