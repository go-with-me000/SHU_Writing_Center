<template>
  <div class="wrapper">
    <div>
      <Form
        ref="person_info"
        :model="person_info"
        :rules="rulesx"
        :label-width="70"
        class="formEx"
        style="width: 500px"
        size="large"
      >
        <FormItem label="姓名">
          <Input v-model="person_info.name" placeholder="请输入你的名字" disabled></Input>
        </FormItem>
        <FormItem label="学号">
          <Input v-model="person_info.studentId" placeholder="请输入你的学号" disabled></Input>
        </FormItem>
        <FormItem label="学院">
          <Input v-model="person_info.academy" placeholder="请输入你的学院" disabled></Input>
        </FormItem>
        <Divider class="spider"></Divider>

        <!-- <FormItem label="邮箱" prop="mail">
          <Input v-model="person_info.mail" placeholder="请输入你的邮箱" :disabled="disable_impl"></Input>
        </FormItem>-->
        <FormItem label="手机" prop="telephone">
          <Input v-model="person_info.telephone" placeholder="请输入你的手机号码" :disabled="disable_impl"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <Input v-model="person_info.email" placeholder="请输入您的邮箱" :disabled="disable_impl"></Input>
        </FormItem>
        <!-- <FormItem label="备注">
          <Input
            v-model="person_info.intruction"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            :disabled="disable_impl"
            placeholder="简单介绍一下自己"
          ></Input>
        </FormItem>-->
      </Form>
      <div class="autos">
        <Button
          type="primary"
          size="large"
          v-if="disable_impl"
          style="margin-left: 175px"
          ghost
          @click="Change()"
        >修改</Button>
        <Button
          size="large"
          style="margin-left: 120px"
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
      temp: "",
      temp2: "",
      identity: "",
      disable_impl: true,
      loading: false,
      person_info: {
        name: "",
        email: "",
        studentId: "",
        academy: "",
        telephone: ""
        // intruction: ""
      },
      rulesx: {
        mail: [
          {
            required: true,
            message: "邮箱不能为空",
            trigger: "blur"
          },
          { type: "email", message: "邮箱格式错误", trigger: "blur" }
        ],
        telephone: [
          {
            required: true,
            message: "手机号码不能为空",
            trigger: "blur"
          },
          { validator: validateNum }
        ],
        email: [
          {
            required: true,
            message: "邮箱不能为空",
            trigger: "blur"
          },
          { type: "email", message: "邮箱格式错误", trigger: "blur" }
        ],
      }
    };
  },
  methods: {
    Change() {
      this.disable_impl = !this.disable_impl;
      this.temp = this.person_info.telephone;
      this.temp2 = this.person_info.email;
    },
    updatePersonInfo(person_info) {
      this.$refs[person_info].validate(valid => {
        if (valid) {
          let studentId = localStorage.getItem("userID");
          let URL = `${apiPath}/user/changeStudentInformation`;
          let userId = this.person_info.studentId;
          let telephone = this.person_info.telephone;
          this.loading = true;
         
          axios({
            url: URL,
            method: "POST",
            data: {
              email: this.person_info.email,
              userId: userId,
              // academy: this.person_info.academy,
              telephone: telephone
              // intruction:this.person_info.intruction,
            }
          })
            .then(res => {

             
              if (res.data.code === 200) {
                this.$Message.success("修改成功");
                this.disable_impl = !this.disable_impl;
              } else {
                this.$Message.warning({
                  content: `出错，提示：${res.data.message}`
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
    save() {
      localStorage.setItem("name", this.person_info.name);
      // localStorage.setItem("mail", this.person_info.mail);
      localStorage.setItem("studentId", this.person_info.studentId);
      localStorage.setItem("academy", this.person_info.academy);
      localStorage.setItem("telephone", this.person_info.telephone);
      // localStorage.setItem("intruction", this.person_info.intruction);
    },
    cancel(name) {
      this.$refs[name].resetFields();
      // loadData();
      this.disable_impl = !this.disable_impl;
      this.person_info.telephone = this.temp;
      this.person_info.email=this.temp2;
    },
    loadData() {
      let studentId = localStorage.getItem("userID");
      let URL = `${apiPath}/user/getStudentInformation?userId=${studentId}`;
      axios({
        url: URL,
        method: "get"
      })
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.data != null) {
              this.person_info = res.data.data;
             
            }
          } else {
            this.$Notice.warning({ title: `出错，提示：${res.data.message}` });
          }
        })
        .catch(err => {
          // this.$Notice.warning({ title: `出错，提示：${err}` });
        });
    }
  },
  mounted() {
    this.identity = localStorage.getItem("identity");
    this.loadData();
  }
};
</script>

<style lang="scss" scoped>
@import "myInfo";
</style>
<style scoped lang="scss">
.wrapper {
  margin-top: 0px;
  margin-left: 0px;
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  right: 10%;
}
</style>