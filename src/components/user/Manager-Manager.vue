<template>
  <div class="template">
    <Tabs>
      <Tab-pane label="管理员管理" key="page1">
        <div class="toolbar">
           
          <Button @click="addManager" type="primary">增加管理员</Button>
          <Button @click="deleteUser" type="error">删除管理员</Button>
        </div>
        <div class="table">
          <Table :columns="columns1" :data="managerMsg" @on-selection-change="selectChange"></Table>
        </div>
        <div class="page">
          <Page :total="total" :current="page" :page-size="8" show-elevator @on-change="changePage"></Page>
        </div>
      </Tab-pane>
    </Tabs>

    <Modal
      width="600px"
      v-model="modal"
      class-name="vertical-center-modal"
      title="增加管理员"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <div class="context">
        <Form :model="ManagerForm">
          <i-input
          v-model="ManagerForm.teacherID"
            size="large"
            style="width:280px;align:center"
            id="teacherID"
            name="teacherID"
            placeholder="管理员ID"
          ></i-input>
          <i-input
               v-model="ManagerForm.teachername"
            size="large"
            style="width:280px;align:center"
            id="teachername"
            name="teachername"
            placeholder="姓名"
          ></i-input>
          <i-input
             v-model="ManagerForm.phone"
            size="large"
            style="width:280px;align:center"
            id="phone"
            name="phone"
            placeholder="电话"
          ></i-input>
                 <i-select style="width:280px"  v-model="ManagerForm.depId">
              <i-option
                v-for="dep in department"
                :value="dep.departmentid"
                :key="dep.id"
              >{{dep.departmentname}}</i-option>
            </i-select>
    
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      ManagerForm: {

        teacherID:"",
        teachername:"",
        phone:"",
        depId:""

      },
      department:[],
      total: 1,
      page: 1,
      modal: false,
      managerMsg: [],
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "管理员id",
          key: "adminid",
          sortable: true,
          width: 200,
          align: "center"
        },
        {
          title: "姓名",
          key: "name",
          width: 170,
          align: "center"
        },
        {
          title: "职业",
          key: "duty",
          width: 150,
          align: "center"
        },
        {
          title: "学院",
          key: "organization",
          width: 200,
          align: "center"
        },
          {
          title: "电话",
          key: "phone",
          width: 180,
          align: "center"
        },
        {
          title: "权限",
          key: "auth",
          width: 250,
          align: "center"
        }
      ]
    };
  },
  mounted() {
    axios({
      url: `${apiPath}/monitor/searchManager`,
      method: "get",
      params: {
        curr: this.page,
        nums: 8
      }
    }).then(res => {
      this.managerMsg = res.data.data;
      this.total = res.data.count;
    });
  },
  methods: {

   

    //点击增加管理员按钮
    addManager() {
      Object.assign(this.$data.ManagerForm, this.$options.data().ManagerForm);
      this.modal = true;   
    
    axios
      .get(`${apiPath}/monitor/searchdep`)
      .then(response => {
        this.department = response.data.data;
      })
      .catch(error => {
      });

    },

    ok() {
      if(this.ManagerForm.teacherID!=null && this.ManagerForm.teachername!=null)
      {
        axios({
          url:`${apiPath}/monitor/addMangers`,
          method:"post",
          data:this.ManagerForm,
        }).then(res=>{
            this.$Message.info("增加成功");
        }).catch(error=>
        {
            this.$Message.info("增加失败，请检查信息");
        })
      }
    },
    cancel() {},

    //点击删除按钮的时候
    deleteUser() {
      if (this.selected != null) {
        this.$Modal.confirm({
          title: "确定删除吗？",
          onOk: () => {
            axios({
              url: `${apiPath}/monitor/deleteMangers`,
              method: "post",
              data: "requestiId=" + this.selected
            }).then(res => {
              this.$Message.info("删除成功");
            });
          }
        });
      } else {
        this.$Message.info("请选择删除目标");
      }
    },

    //选择框发生变化的时候
    selectChange(select) {
      this.selected = [];
      for (var item in select) {
        this.selected.push(select[item].adminid);
      }
    },

    //发起查询管理员请求
    selectMangers() {
      axios({
        url:`${apiPath}/monitor/searchManager`,
        method: "get",
        params: {
          curr: this.page,
          nums: 8
        }
      }).then(res => {
        this.managerMsg = res.data.data;
        this.total = res.data.count;
      });
    },
    //点击分页
    changePage(page1) {
      this.page = page1;
      this.selectMangers();
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
.toolbar {
  float: left;
  width: 400px;
  list-style: none;
  padding: 4px 1px 6px 16px;
}
.page {
  float: left;
  padding: 4px 45px;
}
</style>