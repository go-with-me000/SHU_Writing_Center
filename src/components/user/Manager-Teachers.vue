<template>
  <div class="template">
    <Tabs v-model="tabPageName">
      <Tab-pane label="教师" key="key1" class="tab1">
        <div class="context">
          <div class="toolbar">
            <i-select style="width:170px" v-model="selected" @on-change="changeSelect(selected)">
              <i-option
                v-for="dep in department"
                :value="dep.departmentid"
                :key="dep.id"
              >{{dep.departmentname}}</i-option>
            </i-select>
            <input class="inputteacher" v-model="inputteacherMsg" placeholder="输入教师姓名" />
            <i-button @click="selectTeacherById" type="default">查找</i-button>
            <i-button @click="addTeacher" type="primary">增加</i-button>
            <i-button @click="updateTeacher" type="default">修改</i-button>
            <i-button @click="deleteTeacher" type="error">删除</i-button>
          </div>

          <div class="table">
            <Table :columns="columns1" :data="teacherMsg" @on-selection-change="handleRowChange"></Table>
          </div>
          <div class="page">
            <Page :total="total" :page-size="8" show-elevator @on-change="changePage"></Page>
          </div>
        </div>
      </Tab-pane>


      <Tab-pane label="学生教师" key="key4" class="tab1">
        <div class="context">
          <div class="toolbar">
            <i-button @click="updatedStTeacher" type="default">修改</i-button>
            <i-button @click="deleteStTeacher" type="error">删除</i-button>
          </div>
          <div class="table">
            <Table
               ref="selection"
              :columns="columns2"
              :data="stTeacherMsg"
              @on-selection-change="StTeacherHandleRowChange"
            ></Table>
          </div>
          <div class="page">
            <Page :total="stTotal" :page-size="8" show-elevator @on-change="changeStTeacherPage"></Page>
          </div>
        </div>
      </Tab-pane>


      <Tab-pane label="编辑" key="key2">
        <Form :model="formItem" ref="Form" :label-width="80">
          <table border="1" cellpadding="0" cellspacing="0" align="center" class="updateTable">
            <tr>
              <td>
                工号:
                <input
                  v-model="formItem.teacherID"
                  class="ivu-input-large"
                  style="width: 170px"
                  type="tel"
                  id="teacherID"
                  name="teacherID"
                  lay-verify="required|number"
                  autocomplete="off"
                />
              </td>
              <td>
                姓名:
                <input
                  v-model="formItem.teachername"
                  class="ivu-input-large"
                  type="tel"
                  id="teachername"
                  name="teachername"
                  autocomplete="off"
                  style="width: 200px"
                />
              </td>
              <td>
                部门:
                <i-select style="width:180px;align:left" v-model="formItem.department1id">
                  <i-option
                    v-for="dep in department"
                    :value="dep.departmentid"
                    :key="dep.id"
                  >{{dep.departmentname}}</i-option>
                </i-select>
              </td>
            </tr>

            <tr>
              <td>
                研究方向:
                <input
                  v-model="formItem.major"
                  type="tel"
                  id="major"
                  name="major"
                  autocomplete="off"
                  class="ivu-input-large"
                  style="width: 170px"
                />
              </td>
              <td>
                <i-button style="width:170px" @click="editTimes()" type="success" long>设置辅导时间</i-button>
              </td>
              <td>
                辅导意愿:
                <input
                  v-model="formItem.helpintention"
                  type="tel"
                  id="helpintention"
                  name="helpintention"
                  autocomplete="off"
                  class="ivu-input-large"
                  style="width: 200px"
                />
              </td>
            </tr>

            <tr>
              <td>
                <div style="width:150px">
                  <input type="file" ref="file" />
                  <button @click="uploadfile()" type="button">上传图片</button>
                </div>
              </td>
              <td>
                <img
                  height="270px"
                  width="200px"
                  style="border:0"
                  :src="picsrc"
                  class="img"
                  id="img"
                />
              </td>
              <td>
                <textarea
                  v-model="formItem.description"
                  style="width:100%;height:270px"
                  id="description"
                  name="description"
                  placeholder="简介"
                  class="layui-textarea"
                ></textarea>
              </td>
            </tr>
          </table>
          <div style="padding:5px 0 0 530px">
            <i-button @click="submitTeacherMsg" type="info">提交</i-button>
            <i-button @click="cancel" type="warning">取消</i-button>
          </div>
        </Form>

        <div style="height:60px">
          <Modal
            class="Modal"
            width="800px"
            v-model="modal"
            title="修改时间"
            @on-ok="modalOk"
            @on-cancel="modalCancel"
          >
            <div class="context">
              <i-form :model="formDynamic" :label-width="80">
                <Form-item v-for="item in formDynamic.items" :label="'开始时间' " :key="item.id">
                  <Row>
                    <i-col span="8" style="padding:0 15px">
                      <Date-picker
                        v-model="item.starttime"
                        id="starttime"
                        type="datetime"
                        placeholder="选择开始时间"
                        show-week-numbers
                        :options="startDateOptions"
                        :time-picker-options="startTimPicker"
                        name="starttime"
                        :editable="false"
                        autocomplete="off"
                        style="width: 200px"
                      ></Date-picker>
                    </i-col>
                    <i-col span="8" style="padding:0 15px">
                      <Date-picker
                        v-model="item.endtime"
                        type="datetime"
                        placeholder="选择结束时间"
                        :options="endDateOptions"
                        :time-picker-options="endTimPicker"
                        name="endtime"
                        autocomplete="off"
                        :editable="false"
                        style="width: 200px"
                      ></Date-picker>
                    </i-col>
                    <i-col span="4" offset="1">
                      <i-button type="default" @click="handleRemove(item)">删除</i-button>
                    </i-col>
                  </Row>
                </Form-item>
                <Form-item>
                  <Row>
                    <i-col span="12">
                      <i-button type="dashed" long @click="handleAdd()" icon="plus-round">新增</i-button>
                    </i-col>
                  </Row>
                </Form-item>
              </i-form>
            </div>
          </Modal>
        </div>
      </Tab-pane>
      <Tab-pane label="名师推荐" key="key3" class="tab1">
              <Row>
          <Col span="18">
            <Card>
              <div class="margin-top-20">
                <div id="editorMenu"></div>
                <div id="editor" />
              </div>
            </Card>
          </Col span="10">
          
          <Col span="5">
               <div class="context">
                <div style="width:200px;">
                  <Cascader
                    :data="data4"
                    :load-data="loadData"
                    class="Cascader"
                    @on-change="famouChange"
                  ></Cascader>选定教师为：
                  <Input class="input" disabled  v-model="famousTeacherName" />
                  <div  style="padding:5px">
                            <i-button @click="uploadFamousTeachers">发布名师</i-button>
                            <i-button @click="deleteFamouTeacher">删除名师</i-button>
                  </div>
                </div>
              </div>
          </Col>
        </Row>
      </Tab-pane>
    </Tabs>

    <Drawer title="学生教师编辑" v-model="Drawer" width="720" :mask-closable="false" :styles="styles">
      <Form :model="DrawerData">
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="ID" label-position="top">
              <Input v-model="DrawerData.stteacherid" placeholder="ID" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="姓名" label-position="top">
              <Input v-model="DrawerData.stteachername" placeholder="姓名"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="部门" label-position="top">
              <i-select style="width:320px" v-model="DrawerData.departmentid">
                <i-option
                  v-for="dep in department"
                  :value="dep.departmentid"
                  :key="dep.id"
                >{{dep.departmentname}}</i-option>
              </i-select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="辅导方向" label-position="top">
              <Input v-model="DrawerData.helpintention" placeholder="辅导方向"></Input>
            </FormItem>
          </Col>
        </Row>

        <FormItem label="详情" label-position="top">
          <Input type="textarea" v-model="DrawerData.description" :rows="2" />
    
        </FormItem>
    <div class="lines"></div>
        <FormItem
          v-for="(item, index) in items"
          v-if="item.status"
          :key="index"
          :value="item.value"
        >
           <Row>
                    <i-col span="8" style="padding:0 15px">
                      <Date-picker
                        v-model="item.starttime"
                        id="starttime"
                        type="datetime"
                        placeholder="选择开始时间"
                        show-week-numbers
                        :options="startDateOptions"
                        :time-picker-options="startTimPicker"
                        name="starttime"
                        :editable="false"
                        autocomplete="off"
                        style="width: 200px"
                      ></Date-picker>
                    </i-col>
                    <i-col span="8" style="padding:0 15px">
                      <Date-picker
                        v-model="item.endtime"
                        type="datetime"
                        placeholder="选择结束时间"
                        :options="endDateOptions"
                        :time-picker-options="endTimPicker"
                        name="endtime"
                        autocomplete="off"
                        :editable="false"
                        style="width: 200px"
                      ></Date-picker>
                    </i-col>
                    <i-col span="4" offset="1">
                      <i-button type="default" @click="sTdeleteTime(index)">删除</i-button>
                    </i-col>
                  </Row>
        </FormItem>

        <FormItem>
          <Row>
            <Col span="12">
              <i-button @click="addTime()">添加辅导时间</i-button>
              <Button type="primary" @click="sTSaveTime">保存时间</Button>
            </Col>
          </Row>
        </FormItem>
         <div class="lines"></div>
      </Form>
      <div class="demo-drawer-footer">
        <Button style="margin-right: 8px" @click="StCancel">取消</Button>
        <Button type="primary" @click="upDateStTeacher">提交数据</Button>
      </div>
    </Drawer>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
let E = require("wangeditor");
let editor;
export default {
  data() {
    return {
      data4: [],
      Drawer: false,
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static"
      },
      stindex: 1,
      DrawerData: {
        stteacherid: "",
        stteachername: "",
        duty: "",
        departmentid: "",
        helpintention: "",
        description: "",
      },

      items: [],
       items2: [],

      htmla: "",
      famousTeacherName: "",
      formDynamic: {
        items: [
          {
            id: 0,
            starttime: "",
            endtime: "",
            occupy: 0,
            teacherid: 0
          }
        ]
      },

      startTimPicker: {
        "hide-disabled-options": true,
        "disabled-hours": [0, 1, 2, 3, 4, 5, 6, 7, 22, 23]
      },
      endTimPicker: {
        "hide-disabled-options": true,
        "disabled-hours": [0, 1, 2, 3, 4, 5, 6, 7, 23]
      },
      startDateOptions: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      endDateOptions: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      teacherid: 0,
      editTime: {},
      editTimeNumber: 0,
      modal: false,
      index: 0,
      picsrc: "",
      inputteacherMsg: null,
      tabPageName: 0,
      total: 1,
      stTotal: 1,
      checkboxSelected: [],
      checkAllMsg: [],
      selected: [],
      formItem: {
        teachername: "",
        teacherID: 0,
        department1id: "",
        description: "",

        helpintention: "",
        building: "",
        housenumber: "1",
        imgurl: "",
        phone: "",
        email: "",
        major: "",
        job: "",
        campus: ""
      },

      columns2: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "ID",
          width: 120,
          align: "center",
          key: "stteacherid"
        },
        {
          title: "姓名",
          width: 100,
          align: "center",
          key: "stteachername"
        },
        {
          title: "部门",
          width: 160,
          align: "center",
          key: "organization"
        },
        {
          title: "辅导时间",
          align: "center",
          width: 270,
          key: "teachstarttime",
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
                    this.checkboxSelected=[],
                    this.checkboxSelected.push(params.row.stteacherid)
                    this.DrawerData=params.row;
                    this.updatedStTeacher();
                    }
                  }
                },
                "编辑辅导时间"
              )
            ]);
          }
        },
        {
          title: "职业",
          align: "center",
          width: 170,
          key: "duty"
        },
        {
          title: "希望辅导方向",
          align: "center",
          width: 180,
          key: "helpintention"
        }
      ],

      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "ID",
          width: 120,
          align: "center",
          key: "teacherid"
        },
        {
          title: "姓名",
          width: 80,
          align: "center",
          key: "teachername"
        },
        {
          title: "(未))状态(在)",
          width: 170,
          align: "center",
          render: (h, params) => {
            return h("i-switch", {
              props: {
                //这里可以设置它的属性
                value: params.row.free //设置它的值比如：true或false
              },

              on: {
                //操作事件
                input: function(event) {
                  //这里会起到监听的作用
                  if (event) {
                    params.row.free = true;
                  } else {
                    params.row.free = false;
                  }
                },
                "on-change": val => {
                  this.updateTeacherAppointmentStatus(
                    params.index,
                    params.row.free
                  );
                }
              }
            });
          }
        },
        {
          title: "部门",
          width: 130,
          align: "center",
          key: "organization"
        },
        {
          title: "辅导时间",
          align: "center",
          width: 250,
          key: "teachstarttime",
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
                      this.editTimesInTable(params.row.teacherid);
                    }
                  }
                },
                "编辑辅导时间"
              )
            ]);
          }
        },
        {
          title: "职业",
          align: "center",
          width: 170,
          key: "duty"
        },
        {
          title: "希望辅导方向",
          align: "center",
          width: 180,
          key: "helpintention"
        }
      ],
      department: [],
      teacherMsg: [],
      stTeacherMsg: []
    };
  },
  mounted() {
    this.geteditor();
  },

  methods: {

       //学生删除数据
     deleteStTeacher() {
      if (this.checkboxSelected.length == 0) {
        this.$Message.info("请选择删除的对象");
      } else {
        this.$Modal.confirm({
          title: "确认删除吗？",
          onOk: () => {
            axios({
              url: `${apiPath}/monitor/deleteStTeacher`,
              method: "post",
              data: "deleteids=" + this.checkboxSelected
            }).then(res => {
              if (res.data.code == 200) {
                this.$Message.info("成功删除");

                for (var item in this.stTeacherMsg) {
                  for (var selectitem in this.checkboxSelected) {
                    if (
                      this.checkboxSelected[selectitem] ==
                      this.stTeacherMsg[item].stteacherid
                    ) {
                      this.stTeacherMsg.splice(item, 1);
                    }
                  }
                }
                this.checkboxSelected = null;
              } else {
                this.$Message.info(
                  "请检查该老师是否有进行中预约或者设置过预约时间"
                );
              }
            });
          },
          onCancel: () => {
            this.$Message.info("已经取消删除");
          }
        });
      }
    },


    //学生界面提交数据按钮
    upDateStTeacher()
    {
        if(this.DrawerData.stteacherid!=null && this.DrawerData!=null)
        {
          axios({
            url:`${apiPath}/monitor/upDateStTeacher`,
            method:"post",
            data:this.DrawerData,
          }).then(res=>
          {
            if(res.data.code==200)
            {
              this.$Message.info("数据保存成功");
               this.$refs.selection.selectAll(false);
              this.items=[];
                   this.checkboxSelected=[];
              this.Drawer=false;
            }else if(res.data.code==500)
            {
               this.$Message.info("教师不存在，请在用户界面添加为学生教师");
            }else{
                  this.$Message.info("数据保存失败");
            }
          })
        }

    },

    //学生教师界面取消按钮
    StCancel()
    {
      this.$refs.selection.selectAll(false);
      this.checkboxSelected=[];
      this.items=[];
      this.Drawer=false;

    },

    //学生教师界面查询已有时间
      StEditTime() {
      if (this.checkboxSelected.length==1) {
        axios({
          url: `${apiPath}/monitor/searchEditTimes`,
          method: "get",
          params: {
            teacherid: this.checkboxSelected[0]
          }
        }).then(res => {
        
              for(var item in res.data.data)
              {
                  this.items.push(
                    {
                       id: 0,
                      starttime:  res.data.data[item].starttime,
                      endtime: res.data.data[item].endtime,
                      occupy: 0,
                       teacherid: this.checkboxSelected[0],
                       status:1
                    }
                  )
              }   
        });
      }
    },

    

    //学生教师界面保存时间
    sTSaveTime() {

      if (this.checkboxSelected.length!=1) {
        this.$Message.info("未指定教师，无法修改");
        return;
      }

      this.$Modal.confirm({
        title: "确认修改辅导时间吗？",
        onOk: () => {
          //先删除所有status为0的对象
        
      
         for(var item in this.items)
          {
        
            if(this.items[item].status ==1)
            {
              
               this.items2.push(this.items[item]);
            }
          }
          
        
             this.items= this.items2;
             this.items2=[];
          
          for (var item in this.items) {
              
            if (
              this.items[item].starttime == "" ||
              this.items[item].endtime == ""
            ) {
              this.$Message.info("保存失败，时间不能为空");
              return;
            }

            var hours = new Date(
              this.items[item].starttime
            ).getHours();
            var hours2 = new Date(
              this.items[item].endtime
            ).getHours();
            if (hours < 8 || hours > 21 || hours2 < 8 || hours2 > 22) {
              this.$Message.info("保存失败，时间要在规定时间内");
              return;
            }

            if (
              new Date(this.items[item].starttime) >=
                new Date(this.items[item].endtime) ||
              new Date(this.items[item].starttime) < new Date()
            ) {
              this.$Message.info("保存失败，时间无法执行");
              return;
            }
          }

          if (
            this.items == [] ||
            this.items.length == 0
          ) {
           
            axios({
              url:`${apiPath}/monitor/saveNullTimes`,
              method: "get",
              params: {
                teacherid: this.checkboxSelected[0]
              }
            }).then(res => {
              if(res.data.code==200)
              {
                this.$Message.info("设置成功");
              }
              this.items = [];
          
              
            });
          } else {
            axios({
              url: `${apiPath}/monitor/saveTimes`,
              method: "post",
              data: this.items
            }).then(res => {
           
              if(res.data.msg=="200")
              {
                this.$Message.info("设置成功");
      
               
              }else{
                 this.$Message.info("设置失败，请检查时间");
              }
            });
          }
        }
      });
    },

    //学生教师界面方法
    addTime() {
      this.stindex++;
      this.items.push({
        id: this.editTimeNumber,
        starttime: "",
        endtime: "",
        occupy: 0,
        teacherid: this.checkboxSelected[0],
        status:1
      });
    },
    sTdeleteTime(index) {
      
     
      this.items[index].status = 0;
    },

    //学生教师界面修改教师方法
    updatedStTeacher() {
    
      if (this.checkboxSelected.length != 1) {
        this.$Message.info("一次只能修改一个老师");
        return;
      }
      this.StEditTime();
      this.Drawer = true;
      
    },

    //学生教师界面显示教师方法
    searchStTeacher(stPage) {
      //查询学生教师的信息
      axios({
        url: `${apiPath}/monitor/searchStteacher`,
        method: "get",
        params: {
          curr: stPage
        }
      }).then(res => {
        this.stTeacherMsg = res.data.data;
        this.stTotal = res.data.count;
      });
    },

    //名师界面点击删除名师
    deleteFamouTeacher() {
      if (this.famousTeacherName == null) {
        this.$Message.info("请选择删除名师");
        return;
      }
      if (this.famousTeacherName != null) {
        this.$Modal.confirm({
          title: "确定删除名师：" + this.famousTeacherName + "吗？",
          onOk: () => {
            axios({
              url: `${apiPath}/monitor/deleteFamouTeacher`,
              method: "get",
              params: {
                teacherName: this.famousTeacherName
              }
            }).then(res => {
              if (res.data.code == 200) {
                this.$Message.info("删除成功");
              } else {
                this.$Message.info("删除失败");
              }
            });
          }
        });
      }
    },

    //名师界面点击发布名师信息
    uploadFamousTeachers() {
      if (this.famousTeacherName == "" || this.famousTeacherName.length == 0) {
        this.$Message.info("必须选择发布教师");
        return;
      }
      this.$Modal.confirm({
        title: "确认发布名师信息吗？",
        onOk: () => {
          this.htmla = editor.txt.html();
          axios({
            url: `${apiPath}/monitor/uploadFamouTeacher`,
            method: "post",
            data: {
              teacherName: this.famousTeacherName,
              html: this.htmla
            }
          }).then(res => {
            if (res.data.code == 200) {
              this.$Message.info("发布成功");
            } else {
              this.$Message.info("发布失败");
            }
          });
        }
      });
    },
    //名师界面初始化富文本编辑器
    geteditor() {
      editor = new E("#editor");
      editor.customConfig.uploadImgServer =
       `${apiPath}/WangUploadfile`;
      editor.customConfig.uploadFileName = "uploadfile";
      editor.customConfig.withCredentials = true;
      editor.customConfig.customAlert = function(info) {
        // info 是需要提示的内容
        alert("自定义提示：" + info);
      };
      editor.create();
      editor.txt.html("文字请设置为黑色方能正常显示，图片上下空一行");
    },
    //名师推荐选择后
    famouChange(value, selectedData) {
      this.famousTeacherName = selectedData[1].label;
    },

    //名师推荐多选框
    loadData(item, callback) {
      item.loading = true;
      setTimeout(() => {
        axios({
          url: `${apiPath}/monitor/selectTeacherInFamous`,
          method: "get",
          params: {
            departmentid: item.value
          }
        }).then(res => {
          for (var teacher in res.data.data)
            item.children.push({
              value: res.data.data[teacher].departmentid,
              label: res.data.data[teacher].teachername
            });
        });

        item.loading = false;
        callback();
      }, 1000);
    },

    //模态框的添加等方法
    handleAdd() {
      this.formDynamic.items.push({
        id: this.editTimeNumber,
        starttime: "",
        endtime: "",
        occupy: 0,
        teacherid: this.teacherid
      });
      this.editTimeNumber = this.formDynamic.items.length;
    },

    handleRemove(deleteitem) {
      this.index = 0;
      for (var item in this.formDynamic.items) {
        if (this.formDynamic.items[item].id == deleteitem.id) {
          this.formDynamic.items.splice(this.index, 1);
        }
        this.index = this.index + 1;
      }
      this.editTimeNumber = this.editTimeNumber - 1;
    },

    //在设置辅导时间的模态框中的方法
    modalOk() {
      if (this.teacherid == 0) {
        this.$Message.info("未指定教师，无法修改");
        return;
      }

      this.$Modal.confirm({
        title: "确认修改辅导时间吗？",
        onOk: () => {
          for (var item in this.formDynamic.items) {
            if (
              this.formDynamic.items[item].starttime == "" ||
              this.formDynamic.items[item].endtime == ""
            ) {
              this.$Message.info("保存失败，时间不能为空");
              return;
            }

            var hours = new Date(
              this.formDynamic.items[item].starttime
            ).getHours();
            var hours2 = new Date(
              this.formDynamic.items[item].endtime
            ).getHours();
            if (hours < 8 || hours > 21 || hours2 < 8 || hours2 > 22) {
              this.$Message.info("保存失败，时间要在规定时间内");
              return;
            }

            if (
              new Date(this.formDynamic.items[item].starttime) >=
                new Date(this.formDynamic.items[item].endtime) ||
              new Date(this.formDynamic.items[item].starttime) < new Date()
            ) {
              this.$Message.info("保存失败，时间无法执行");
              return;
            }
          }

          if (
            this.formDynamic.items == [] ||
            this.formDynamic.items.length == 0
          ) {
            axios({
              url: `${apiPath}/monitor/saveNullTimes`,
              method: "get",
              params: {
                teacherid: this.teacherid
              }
            }).then(res => {
              this.formDynamic.items = [];
              this.teacherid = 0;
            });
          } else {
            axios({
              url:`${apiPath}/monitor/saveTimes`,
              method: "post",
              data: this.formDynamic.items
            }).then(res => {
              this.formDynamic.items = [];
              this.teacherid = 0;
            });
          }
        }
      });
    },

    modalCancel() {
      this.formDynamic.items = [];
    },

    //教师编辑页面点击了设置辅导时间,先请求已经设定的时间段
    editTimes() {
      if (this.formItem.teacherID != "") {
        axios({
          url: `${apiPath}/monitor/searchEditTimes`,
          method: "get",
          params: {
            teacherid: this.formItem.teacherID
          }
        }).then(res => {
          this.formDynamic.items = res.data.data;
          for (var item in this.formDynamic.items) {
            this.formDynamic.items[item].id = item;
          }
          this.editTimeNumber = this.formDynamic.items.length;
        });
      }
      this.modal = true;
    },

    //用户点击了设置辅导时间,先请求已经设定的时间段
    editTimesInTable(teacherid) {
      if (teacherid != null) {
        axios({
          url: `${apiPath}/monitor/searchEditTimes`,
          method: "get",
          params: {
            teacherid: teacherid
          }
        }).then(res => {
          this.formDynamic.items = res.data.data;
          for (var item in this.formDynamic.items) {
            this.formDynamic.items[item].id = item;
          }

          this.editTimeNumber = this.formDynamic.items.length;
        });
      }
      this.teacherid = teacherid;
      this.modal = true;
    },

    //更改表格中教师预约状态的方法
    updateTeacherAppointmentStatus(index, free) {
      var updateTeacherid = this.teacherMsg[index].teacherid;
      if (updateTeacherid != null && free != null) {
        this.$Modal.confirm({
          title: "确认修改教师状态吗？",
          onOk: () => {
            axios({
              url: `${apiPath}/monitor/updateTeacherStatus`,
              params: {
                teacherid: updateTeacherid,
                teacherstatus: free
              },
              method: "get"
            })
              .then(res => {})
              .catch(res => {});
          }
        });
      }
    },

    //点击修改的按钮
    updateTeacher() {
      if (this.checkboxSelected.length != 1) {
        this.$Message.info("一次只能修改一个人");
      } else {
        var updateId = this.checkboxSelected;
        this.tabPageName = 2;
        for (var index in this.teacherMsg) {
          if (this.teacherMsg[index].teacherid == updateId) {
            this.formItem = this.teacherMsg[index];
            this.teacherid = this.formItem.teacherID;
            this.formItem.teacherID = this.teacherMsg[index].teacherid;
            if (this.teacherMsg[index].online == 1) {
              this.formItem.online = true;
            } else {
              this.formItem.online = false;
            }

            this.formItem.imgurl = this.teacherMsg[index].imagesrc;
            this.picsrc = this.formItem.imgurl;
          }
        }
      }
    },

    //点击删除按钮时候触发
    deleteTeacher() {
      if (this.checkboxSelected.length == 0) {
        this.$Message.info("请选择删除的对象");
      } else {
        this.$Modal.confirm({
          title: "确认删除吗？",
          onOk: () => {
            axios({
              url: `${apiPath}/monitor/deleteteacherdata`,
              method: "post",
              data: "deleteids=" + this.checkboxSelected
            }).then(res => {
              if (res.code == 200) {
                this.$Message.info("成功删除");

                for (var item in this.teacherMsg) {
                  for (var selectitem in this.checkboxSelected) {
                    if (
                      this.checkboxSelected[selectitem] ==
                      this.teacherMsg[item].teacherid
                    ) {
                      this.teacherMsg.splice(item, 1);
                    }
                  }
                }
                this.checkboxSelected = null;
              } else {
                this.$Message.info(
                  "请检查该老师是否有进行中预约或者设置过预约时间"
                );
              }
            });
          },
          onCancel: () => {
            this.$Message.info("已经取消删除");
          }
        });
      }
    },

    //表格中选择框被点击时
    handleRowChange(currentRow) {
      this.checkAllMsg = currentRow;
      this.checkboxSelected = [];
      for (var item in currentRow) {
        this.checkboxSelected.push(currentRow[item].teacherid);
      }
    },

    //学生教师表格中选择框被点击时
    StTeacherHandleRowChange(currentRow) {
      if(currentRow.length!=0)
      {
        this.DrawerData = currentRow[0];
      }
      

      this.checkboxSelected = [];
      for (var item in currentRow) {
        this.checkboxSelected.push(currentRow[item].stteacherid);
      }
    },

    //点击取消按钮
    cancel() {
      this.tabPageName = 0;
      //Object.assign(this.$data.formItem, this.$options.data().formItem);
      this.picsrc = "";
      this.teacherid = 0;
      this.formDynamic.items = [];
    },

    //点击文件上传的按钮
    uploadfile() {
      let formData = new FormData();
      formData.append("uploadfile", this.$refs.file.files[0]);
      axios
        .post(`${apiPath}/uploadfile`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          this.formItem.imgurl = "http://202.120.117.43/" + res.data;
          this.$Message.info("图片上传成功");

          this.picsrc = this.formItem.imgurl;
        });
    },

    //点击增加老师时候触发
    addTeacher() {
      Object.assign(this.$data.formItem, this.$options.data().formItem);
      this.picsrc = "";
      this.teacherid = 0;
      this.tabPageName = 1;
    },

    //编辑页提交教师信息按钮
    submitTeacherMsg() {
      if (this.formItem.teacherID != "") {
        this.$Modal.confirm({
          title: "确认提交信息吗？",
          onOk: () => {
            axios
              .post(
               `${apiPath}/monitor/addteacher`,
                this.formItem
              )
              .then(result => {
                this.$Message.info("教师添加成功");
              })
              .catch(result => {
                this.$Message.info("请填写必要信息");
              });
          },
          onCancel: () => {
            this.$Message.info("已经取消");
          }
        });
      }
    },

    //点击查询的时候触发
    selectTeacherById() {
      if (this.inputteacherMsg == null) {
        this.$Message.info("请输入查询教师");
        return;
      }
      axios
        .get(`${apiPath}/monitor/searchteacherbyid`, {
          params: {
            inputtexts: this.inputteacherMsg
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        })
        .then(result => {
          this.total = result.data.count;
          this.teacherMsg = result.data.data;
        })
        .catch(result => {
        });
    },

    //改变分页时候触发的函数
    changePage(page) {
      this.changeSelect(this.selected, page);
    },

    changeStTeacherPage(stPage) {
      this.searchStTeacher(stPage);
    },

    //选择框变动时候触发
    changeSelect(selected, curr) {
      axios
        .get(`${apiPath}/monitor/searchteacherbydepid`, {
          params: {
            category1id: selected,
            curr: curr,
            nums: 8
          }
        })
        .then(response => {
          this.teacherMsg = response.data.data;
          this.total = response.data.count;
        })
        .catch(error => {
        });
    }
  },
  created: function() {
    axios
      .get(`${apiPath}/monitor/searchdep`)
      .then(response => {
        this.department = response.data.data;
        for (var item in this.department) {
          this.data4.push({
            value: this.department[item].departmentid,
            label: this.department[item].departmentname,
            children: [],
            loading: false
          });
        }
      })
      .catch(error => {
      });
    this.selected = 1;
    this.changeSelect(1, 1);
    this.changeStTeacherPage(1);
  }
};
</script>

<style scoped>
.switch {
  align-content: center;
  padding: 0 30px 0 40px;
}

.updateTable {
  border: 0ch;
  width: 480px;
}
.page {
  width: 100%;
  float: left;
  padding: 3px, 3px, 2px, 3px;
}

.template {
  height: 835px;
  width: 1260px;
  min-width: 1260px;
}

.inputteacher {
  width: 150px;
  height: 30px;
}

.toolbar {
  float: left;
  padding: 5px 0 0 10px;
}

.table {
  padding: 5px 7px 0 10px;
  margin: 4px;
  border-color: #d8d8d8;
  border-spacing: 1px;
  border-collapse: collapse;
  border-width: 1px 1px 1px 1px;
  width: 100%;
  float: center;
  zoom: 1;
}

.picbtn {
  padding: 20px 7px 0 10px;
  margin: 8px;
}

.submit {
  float: center;
}

.img {
  box-sizing: border-box;
  border: 10px solid #82a1df; /*设置边框的宽度*/
}

.tb_title {
  width: 100%;
}

.Cascader {
  width: 150%;
}

.margin-top-20 {
  padding: 1px;
}

.lines {
  position: relative;
  margin: 3px auto;
  padding: 2px 0 0 0;
  width: 100%;
  height: 2px;
  background-color: #d4d4d4;
  text-align: center;
  font-size: 19px;
  color: rgba(101, 101, 101, 1);
}
</style>