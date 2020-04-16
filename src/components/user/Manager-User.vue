<template >
  <div class="template">
    <Tabs>
      <Tab-pane label="用户管理" key="page1">
        <div class="toolbar">
          <i-select style="width:170px" v-model="checkBox" @on-change="changeSelect(checkBox)">
            <i-option v-for="user in userType" :value="user" :key="user.id">{{user}}</i-option>
          </i-select>
          <input class="inputteacher" v-model="inputteacherMsg" placeholder="输入用户姓名" />
          <Button @click="selectUserById" type="primary">查找</Button>
          <Button @click="deleteUser" type="error">删除</Button>
          <Button style @click="addToStTeacher">添加为学生教师</Button>
          <Button style @click="addWeiXinId">添加到公众号</Button>
        </div>
        <div class="table">
          <Table :columns="tableHead" :data="userMsg" @on-selection-change="selectChange"></Table>
        </div>
        <div class="page">
          <Page :total="total" :current="page" :page-size="8" show-total @on-change="changePage"></Page>
        </div>
      </Tab-pane>
    </Tabs>

      <Modal
      width="600px"
      v-model="modal"
      class-name="vertical-center-modal"
      title="添加公众号openid"
      @on-ok="ok"
    >
      <div class="context">
        <Form>
          <i-input v-model="selectWeiXin" readonly  ></i-input>
          <i-input
          v-model="weixinId"
            size="large"
            style="align:center"
            id="weixinId"
            name="weixinId"
            placeholder="openid"
          ></i-input>
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
      selectWeiXin:"",
      modal: false,
      weixinId:"",
      userType: ["普通用户信息", "失信人员情况"],
      checkBox: "普通用户信息",
      selected: [],
      inputteacherMsg: "",
      total: 1,
      page: 1,
      userMsg: [],
      tableHead: [],
      brokencolumns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },

        {
          title: "用户id",
          key: "userid",
          width: 190,
          sortable: true,
          align: "center"
        },
        {
          title: "用户姓名",
          key: "name",
          width: 190,
          align: "center"
        },
        {
          title: "违约原因",
          key: "reason",
          width: 300,
          align: "center"
        },
        {
          title: "违约时间",
          sortable: true,
          key: "time",
          width: 370,
          align: "center"
        }
      ],

      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "用户",
          key: "adminid",
          sortable: true,
          width: 150,
          align: "center"
        },
        {
          title: "姓名",
          key: "name",
          width:110,
          align: "center"
        },
        {
          title: "职业",
          key: "duty",
           sortable: true,
          width: 100,
          align: "center"
        },
        {
          title: "学院",
          key: "organization",
          width: 220,
          align: "center"
        },
           {
          title: "电话",
          key: "phone",
          width: 170,
          align: "center"
        },
        {
          title: "邮箱",
          key: "email",
          sortable: true,
          width: 200,
          align: "center"
        },
          {
          title: "微信openid",
          key: "weixinid",
          sortable: true,
          width: 220,
          align: "center"
        }
      ]
    };
  },
  mounted() {
    axios({
      url: `${apiPath}/monitor/searchStudent`,
      method: "get",
      params: {
        curr: this.page,
        nums: 8
      }
    }).then(res => {
      this.tableHead = this.columns1;
      this.userMsg = res.data.data;
      this.total = res.data.count;
    });
  },
  methods: {

   //点击增加openid
    ok() {
      if(this.selectWeiXin==null || this.selectWeiXin=="")
      {
         this.$Message.info("输入不能为空");
         return;
      }
   
          this.$Modal.confirm({
              title:"确定添加openId吗？",
              onOk:()=>{

              axios({
                url: `${apiPath}/monitor/addOpenId`,
                method: "get",
                params: {OpenId:this.weixinId,teacherId:this.selectWeiXin}
              }).then(res => {
              
                if(res.data.code==200)
                {
                    this.$Message.info("添加成功");
                }else{
                   this.$Message.info("添加失败，请检查添加信息");
                }
                this.weixinId = null;
              });

              }
          })
    },

    //添加教师的公众号ID
  addWeiXinId()
  {
     if(this.checkBox!="普通用户信息")
      {
        this.$Message.info("请在用户信息界面设置");
      
       }else
       {
         if(this.selected.length!=1)
         {
             this.$Message.info("一次只能设置一个");
             return;
         }
        else
        {
            //校验只有学生职业能被添加为学生教师
            for(var index in this.userMsg)
            {
              for(var selectindex in this.selected)
              {
                      if(this.userMsg[index].adminid==this.selected[selectindex])
                      {
                        if(this.userMsg[index].duty=="教职工" || this.userMsg[index].duty=="离退休" || this.userMsg[index].duty=="学生教师")
                        {
                          this.selectWeiXin=this.userMsg[index].adminid;
                        
                            this.modal = true;  
    

                        }
                      }
              }
            }
      
        }    
       }
  },
    //添加为学生教师
    addToStTeacher()
    {
      if(this.checkBox=="普通用户信息")
      {
        if(this.selected.length!=0)
        {
            //校验只有学生职业能被添加为学生教师
            for(var index in this.userMsg)
            {
              for(var selectindex in this.selected)
              {
                      if(this.userMsg[index].adminid==this.selected[selectindex])
                      {
                        if(this.userMsg[index].duty=="教职工" || this.userMsg[index].duty=="离退休" )
                        {
                          this.$Message.info("只能添加学生成为学生教师");
                          return;
                        }
                      }
              }
            }
          
          this.$Modal.confirm({
              title:"确定添加为学生教师吗？",
              onOk:()=>{

              axios({
                url: `${apiPath}/monitor/addToStteacher`,
                method: "post",
                data: "requestiId=" + this.selected
              }).then(res => {
              
                if(res.data.code==200)
                {
                    this.$Message.info("添加成功");
                }else{
                   this.$Message.info("添加失败，请检查添加人员");
                }
                this.selected = null;
              });

              }
          })
        }
      }
    
    },

    //点击删除按钮的时候
    deleteUser() {
      if (this.checkBox == "普通用户信息") {
        if (this.selected.length != 0) {
          this.$Modal.confirm({
            title: "确定删除吗？",
            onOk: () => {
              axios({
                url: `${apiPath}/monitor/deleteStudent`,
                method: "post",
                data: "requestiId=" + this.selected
              }).then(res => {
                this.$Message.info("删除成功");

                for (var item in this.userMsg) {
                  for (var i = 0; i < this.selected.length; i++) {
                    if (this.selected[i] == this.userMsg[item].adminid) {
                      this.userMsg.splice(item, 1);
                    }
                  }
                }
                this.selected = null;
              });
            }
          });
        }
      } else if (this.checkBox == "失信人员情况") {
        if (this.selected.length != null) {
          this.$Modal.confirm({
            title: "确定删除失信记录吗？",

            onOk: () => {
              axios({
                url: `${apiPath}/monitor/deleteDishonest`,
                method: "post",
                data: "requestiId=" + this.selected
              }).then(res => {
                this.$Message.info("删除成功");

                for (var item in this.userMsg) {
                  for (var i = 0; i < this.selected.length; i++) {
                    if (this.selected[i] == this.userMsg[item].userid) {
                      this.userMsg.splice(item, 1);
                    }
                  }
                }
                this.selected = null;
              });
            }
          });
        }
      }
    },

    //checkbox变化的时候
    changeSelect(check) {
      if (check == "普通用户信息") {
          this.userMsg=[],
        this.tableHead = this.userMsg;
        this.page = 1;
        this.selectUser();
      } else if (check == "失信人员情况") {
        this.userMsg=[],
        this.page = 1;
        this.tableHead = this.brokencolumns1;
        this.selectBrokenUser();
      }
    },

    //选择框发生变化的时候
    selectChange(select) {
      this.selected = [];
      if (this.checkBox == "普通用户信息") {
        for (var item in select) {
          this.selected.push(select[item].adminid);
        }
      } else if (this.checkBox == "失信人员情况") {
        for (var item in select) {
          this.selected.push(select[item].userid);
        }
      }
    },

    //点击查找按钮后
    selectUserById() {
      axios({
        url: `${apiPath}/monitor/searchStudentById`,
        method: "get",
        params: {
          UserId: this.inputteacherMsg
        }
      }).then(res => {
        if(res.data.count!=0)
        {
             this.userMsg = res.data.data;
        this.total = res.data.count;
        }else{
          this.$Message.info("未查询到用户");
        }
     
      });
    },

    //发起查询失信人员请求
    selectBrokenUser() {
      axios({
        url: `${apiPath}/monitor/searchDishonestPerson`,
        method: "get",
        params: {
          curr: this.page,
          nums: 8
        }
      }).then(res => {
        if(res.data.count!=0)
        {
        this.userMsg = res.data.data;
        this.total = res.data.count;
        }else
        {
          this.$Message.info("当前没有失信人员");
        }
     
      });
    },

    //发起查询用户请求
    selectUser() {
      axios({
        url: `${apiPath}/monitor/searchStudent`,
        method: "get",
        params: {
          curr: this.page,
          nums: 8
        }
      }).then(res => {
        this.tableHead = this.columns1;
        this.userMsg = res.data.data;
        this.total = res.data.count;
      });
    },
    //点击分页
    changePage(page1) {
      this.page = page1;
      if (this.checkBox == "普通用户信息") {
        this.selectUser();
      } else if (this.checkBox == "失信人员情况") {
        this.selectBrokenUser();
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

.table {
  padding: 3px 3px 0 0px;
  margin: 3px;
  border-color: #d8d8d8;
  border-spacing: 1px;
  border-collapse: collapse;
  border-width: 1px 1px 1px 1px;
  width: 100%;
  float: center;
  zoom: 1;
}

.toolbar {
  float: left;
  list-style: none;
  padding: 4px 1px 6px 16px;
}
.inputteacher {
  width: 150px;
  height: 30px;
}

.page {
  float: left;
  padding: 4px 45px;
}
</style>