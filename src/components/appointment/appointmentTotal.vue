<template>
  <div class="template">
    <div>
      <Tabs>
        <Tab-pane label="浏览界面" key="key1" class="tab1">
          <div class="toolbar">
            <Date-picker
              type="datetime"
              @on-change="setStartTime"
              placeholder="开始时间"
              style="width: 200px"
            ></Date-picker>
            <Date-picker
              type="datetime"
              @on-change="setEndTime"
              placeholder="结束时间"
              style="width: 200px"
            ></Date-picker>
            <Button @click="selectAppointmentByDate" type="primary">查找</Button>
            <Button @click="deleteTeacher" type="error">删除</Button>
          </div>

          <div class="table">
            <Table :columns="columns1" :data="EssayMsg" @on-selection-change="handleRowChange"></Table>
          </div>
          <div class="page">
            <Page :total="total" :page-size="8" show-elevator @on-change="changePage"></Page>
          </div>
        </Tab-pane>
      </Tabs>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      selected: [],
      startTime: "",
      endTime: "",
      page: 1,
      total: 1,
      EssayMsg: [],
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "编号",
          width: 100,
          align: "center",
          key: "requestId"
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
          title: "申请人",
          align: "center",
          width: 100,
          key: "adminId"
        },
        {
          title: "姓名",
          width: 90,
          align: "center",
          key: "name"
        },

        {
          title: "教师姓名",
           width: 100,
          align: "center",
          key: "teachername"
        },
        {
          title: "预约开始时间",
          width: 140,
          key: "beginTime",
          align: "center",
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
          align:"center",
          width:280,
          key: "essayname"
        },
           {
          title: "简介",
          key: "description",
          width:90,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "i-button",
                {
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title:"文章简介",
                         content:params.row.description
                      })
                    }
                  }
                },
                "简介"
              )
            ]);
          }
        },
        {
          title: "预览",
          key: "sd",
          width:100,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "i-button",
                {
                  props: {
                  
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
      ]
    };
  },
  mounted() {
    axios({
      url: "http://114.55.93.118:8080/monitor/selectAllAppoinments",
      method: "get",
      params: {
        curr: 1,
        nums: 8
      }
    }).then(res => {
    
      this.EssayMsg = res.data.data;
      this.total = res.data.count;
    });
  },
  methods: {
    //点击选择框时候
    handleRowChange(select) {
      this.selected = [];
      for (var item in select) {
        this.selected.push(select[item].requestId);
      }
    },

    //点击删除的时候
    deleteTeacher() {
        
      if (this.selected.length != 0) {
        this.$Modal.confirm(
        {
            title: "确认删除吗？",
              onOk: () => {
                axios({
                  url: "http://114.55.93.118:8080/monitor/deleteAppointments",
                  method: "post",
                  data: "deleteids=" + this.selected
                }).then(res => {
                    var i=0;
                  this.$Message.info("成功删除");
                  for (var item in this.EssayMsg) {
                      for( var i=0;i<this.selected.length;i++)
                      {
                           if (this.selected[i] == this.EssayMsg[item].requestId) {
                        this.EssayMsg.splice(item, 1);
                      }
                      }
                     
                  
                  }
                  this.selected = [];
                });
              }
            
        })
      }
    },

    //点击查找的时候
    selectAppointmentByDate(page) {
      if (this.endTime > this.startTime) {
        axios({
          url: "http://114.55.93.118:8080/monitor/selectAppointmentByDate",
          method: "get",
          params: {
            inputstartdate: this.startTime,
            inputenddate: this.endTime,
            curr: this.page,
            nums: 8
          }
        }).then(res => {
          this.EssayMsg = res.data.data;
          this.total = res.data.count;
        });
      } else {
        this.$Message.info("请正确选择时间");
      }
    },

    //设置结束时间之后
    setEndTime(endtime) {
      this.endTime = endtime;
    },

    //设置开始时间之后
    setStartTime(starttime) {
      this.startTime = starttime;
    },

    //点击相应页数后
    changePage(page) {
      if(this.startTime=="" && this.endTime=="") 
      {

             axios({
        url: "http://114.55.93.118:8080/monitor/selectAllAppoinments",
        method: "get",
        params: {
          curr: page,
          nums: 8
        }
      }).then(res => {
        for (var item in res.data.data) {
          if (res.data.data[item].applystatus == 1) {
            res.data.data[item].applystatus = true;
          } else {
            res.data.data[item].applystatus = false;
          }
        }
        this.EssayMsg = res.data.data;
        this.total = res.data.count;
      });
      }else
      {
        this.page=page;
          this.selectAppointmentByDate(page)

      }
 
    },

    //点击预览按钮
    pdfsee(essaysrc) {
      layui.use("layer", function() {
        var layer = layui.layer;
        layer.open({
          title:"论文",
          shade:0.4,
          type: 2,
          area: ["1000px", "700px"],
          fixed: true, //不固定
          maxmin: true,
    
          btn:['确定', '取消'],
          content: essaysrc,
          
        });
      });
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
    }
  }
};
</script>
<style scoped>
.template {
 
    height: 835px;
  width: 1260px;
  min-width: 1260px;
}
.toolbar {
  float: left;
  padding: 0 20px;
}

.tab1 {
  height: 700px;
}

.table {
  width: 100%;
  padding: 20px 2px 5px 20px;
  border-color: #d8d8d8;
  border-spacing: 1px;
  border-collapse: collapse;
  border-width: 1px 1px 1px 1px;
  float: center;
  zoom: 1;
}

.page {
  float: left;
  padding: 5px 0 0px 70px;
}
</style>