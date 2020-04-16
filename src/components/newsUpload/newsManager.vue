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
            <Button @click="selectNewsByDate" type="primary">查找</Button>
            <Button @click="deleteTeacher" type="error">删除</Button>
          </div>

          <div class="table">
            <Table :columns="columns1" :data="NewsMsg" @on-selection-change="handleRowChange"></Table>
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
      NewsMsg: [],
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "编号",
          width: 60,
          align: "center",
          key: "newsid"
        },
         {
          title: "状态",
          width: 80,
          align: "center",
          key: "newsstatus"
        },
       

        {
          title: "文章名称",
          align: "center",
          width: 410,
          key: "newsname"
        },


        {
          title: "文章类别",
          align: "center",
          width:110,
          key: "newstype"
        },
        {
          title: "发布时间",
            sortable: true,
          width: 260,
          key: "newstime",
          
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              this.formatDate(new Date(params.row.newstime), "yyyy-MM-dd hh:mm")
            );
          }
        },
        {
          title: "权限",
          align: "center",
          width: 80,
          key: "newsauth"
        },

        {
          title: "预览",
          width:100,
          key: "sd",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                   
                    size: "large"
                  },
                  on: {
                    click: () => {
                      this.handlePreview(params.row.newsid);
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
    this.searchNews(1);
  },
  methods: {
    //点击页数发起请求
    searchNews(pages) {
      this.page = pages;
      axios({
        url: "http://202.120.117.43:8080/monitor/searchNewsManager",
        method: "get",
        params: {
          curr: this.page
        }
      }).then(res => {
        this.NewsMsg = res.data.data;
      
      
        this.total = res.data.count;
      });
    },

    //点击选择框时候
    handleRowChange(select) {

      this.selected = [];
      for (var item in select) {
      
        this.selected.push(select[item].newsid);
      }
    },

    //点击删除的时候
    deleteTeacher() {
      if (this.selected.length != 0) {
      
        this.$Modal.confirm({
          title: "确认删除吗？",
          onOk: () => {
            axios({
              url: "http://202.120.117.43:8080/monitor/deleteNews",
              method: "post",
              data: "deleteids=" + this.selected
            }).then(res => {
              var i = 0;
           
              for (var item in this.NewsMsg) {
                for (var i = 0; i < this.selected.length; i++) {
                  if (this.selected[i] == this.NewsMsg[item].newsid) {
                    this.NewsMsg.splice(item, 1);
                    this.$Message.info("删除成功")
                  }
                }
              }
              this.selected = [];
            });
          }
        });
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

    //点击查找的时候
    selectNewsByDate() {
      if (this.endTime > this.startTime) {
         this.page=1;
        axios({
          url: "http://202.120.117.43:8080/monitor/selectNewsByDate",
          method: "get",
          params: {
            inputstartdate: this.startTime,
            inputenddate: this.endTime,
            curr: this.page,
           
          }
        }).then(res => {
          this.NewsMsg = res.data.data;
          this.total = res.data.count;
        });
      } else {
        this.$Message.info("请正确选择时间");
      }
    },

    //点击相应页数后
    changePage(page) {
      this.searchNews(page);
    },

    //点击预览按钮
     handlePreview(index) {

         axios({
          url: "http://202.120.117.43:8080/monitor/searchNews",
          method: "get",
          params: {
        "newsId":index,
          }
         }).then(res=>{
             var dateNumber= res.data.data[0].newstime;
          let date = new Date(dateNumber);
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          let day = date.getDate();
       
          localStorage.publishTime =
            year +
            " 年 " +
            month +
            " 月 " +
            day +
            " 日 " 
         ;
       
        localStorage.articletitle=res.data.data[0].newsname;
        localStorage.content = res.data.data[0].newscontext;
        localStorage.type=res.data.data[0].newstype;
        //this.$router.push({
          //name: "preView"
        //});

        var newPage=window.open();
        newPage.location.href="http://202.120.117.43:8443/#/manager/preView"


         })
      
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