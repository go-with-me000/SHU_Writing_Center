<template>
  <div class="template">
    <Tabs>
      <Tab-pane label="浏览界面" key="key1">
        <div class="context">
          <div class="toolbar">
            <i-select style="width:170px" v-model="selected" @on-change="changeSelect(selected)">
              <i-option v-for="dep in checkboxItem" :value="dep" :key="dep.id">{{dep}}</i-option>
            </i-select>
            <input class="inputteacher" v-model="inputEssayMsg" placeholder="输入教师姓名" />
            <Button @click="selectEssayById" type="primary">查找</Button>
            <Button @click="deleteEssay" type="error">删除</Button>
          </div>

          <div class="table">
            <i-table :columns="columns1" :data="essays" @on-selection-change="SelectDeleteEssay"></i-table>
          </div>
          <div class="page">
            <Page :total="this.total" :page-size="8" show-elevator @on-change="changePage"></Page>
          </div>
        </div>
      </Tab-pane>
    </Tabs>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      essays: [],
      inputEssayMsg: "",
      total: 1,
      selected: [],
      getSelectedNow: [],
      checkboxItem: ["正在申请的论文", "已经辅导过的论文"],
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "ID",
          width: 100,
          align: "center",
          key: "essayid"
        },
        {
          title: "论文",
          width: 300,
          align: "center",
          key: "essayname"
        },
        {
          title: "申请人",
          width: 100,
          align: "center",
          key: "adminId"
        },

        {
          title: "名字",
          key: "name",
          align: "center",
          width: 100
        },
        {
          title: "论文申请时间",
          key: "finishtime",
          width: 240,
          align: "center",
          render(h, params) {
            return h("DatePicker", {
              props: {
                clearable: false,
                placeholder: "请选择日期",
                value: new Date(params.row.finishtime),
                type: "datetime",
                format: "yyyy-MM-dd HH:mm:ss",
                size: "large",
                readonly: true,
                transfer: true
              }
            });
          }
        },
        {
          title: "预览",
          width: 110,
          align: "center",
          key: "essaysrc",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: "default",
                  size: "large"
                },
                on: {
                  click: () => {
                    this.pdfsee(params.row.essaysrc);
                  }
                }
              },
              "预览"
            );
          }
        },
        {
          title: "后期关注",
          width: 100,
          align: "center",
          key: "essaysrc",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: "default",
                  size: "large"
                }
              },
              "关注"
            );
          }
        }
      ]
    };
  },
  mounted() {
    axios({
      url: "http://114.55.93.118:8080/monitor/searchEssayonapplying",
      method: "get",
      params: {
        curr: 1,
        nums: 8,
        isupdate: 0
      }
    }).then(res => {
      this.essays = res.data.data;
      this.total = res.data.count;
      this.selected = "正在申请的论文";
    });
  },
  methods: {
    //更新已经选择的行id数组

    //选择框时触发
    SelectDeleteEssay(selectedelete) {
      this.getSelectedNow = [];
      for (var item in selectedelete) {
        this.getSelectedNow.push(selectedelete[item].essayid);
      }
    },

    //点击删除论文的按钮
    deleteEssay() {
      if (this.getSelectedNow.length != 0) {
        this.$Modal.confirm({
          title: "确定删除吗？",
          onOk: () => {
            axios({
              url: "http://114.55.93.118:8080/monitor/deleteessay",
              method: "post",
              data: "deleteids=" + this.getSelectedNow
            }).then(res => {
              if (res.code == 200) {
                this.$Message.info("删除成功");
              } else {
                this.$Message.info("删除失败，请检查是否存在相关预约");
              }
            });
          }
        });
      }
    },

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

    //点击查找论文的按钮
    selectEssayById() {
      if (this.inputEssayMsg != null) {
        axios({
          url: "http://114.55.93.118:8080/monitor/searchEssays",
          method: "get",
          params: {
            essayid: this.inputEssayMsg
          }
        }).then(res => {
          this.essays = res.data.data;
        });
      }
    },

    //点击了换页的按钮
    changePage(page) {
      if (this.selected == "正在申请的论文") {
        this.selecteEssay(page, 0);
      } else {
        this.selecteEssay(page, 1);
      }
    },

    changeSelect(selected) {
      if (selected == "正在申请的论文") {
        this.selecteEssay(1, 0);
      } else {
        this.selecteEssay(1, 1);
      }
    },

    selecteEssay(page, status) {
      if (status != null) {
        axios({
          url: "http://114.55.93.118:8080/monitor/searchEssayonapplying",
          method: "get",
          params: {
            curr: page,
            nums: 8,
            isupdate: status
          }
        }).then(res => {
          var count = res.data.count;
          this.essays = res.data.data;
          this.total = count;
          if (status == 0) {
            this.selected = "正在申请的论文";
          } else {
            this.selected = "已经辅导过的论文";
          }
        });
      }
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
  padding: 5px 20px;
}

.table {
  padding: 5px 7px 0 10px;
  margin: 5px;
  border-color: #d8d8d8;
  border-spacing: 1px;
  border-collapse: collapse;
  border-width: 1px 1px 1px 1px;
  width: 100%;
  float: center;
  zoom: 1;
}

.inputteacher {
  width: 150px;
  height: 30px;
}

.page {
  width: 510px;
  float: left;
  padding: 3px, 3px, 2px, 3px;
}
</style>