<template>
  <div class="template">
    <Tabs>
      <Tab-pane label="文章上传" key="key2" class="tab1">
        <Row>
          <Col span="18">
            <Card>
              文章标题
              <Input
                class="input"
                v-model="articleTitle"
                @on-blur="handleArticletitleBlur"
                icon="android-list"
              />

              <div class="margin-top-20">
                <div id="editorMenu"></div>
                <div id="editor" class="toolbar" />
              </div>
            </Card>
          </Col>
          <Col span="6" class="padding-left-10">
            <Card>
              <p slot="title">
                <Icon type="paper-airplane"></Icon>发布
              </p>
              <p class="margin-top-10">
                <Icon type="android-time"></Icon>&nbsp;&nbsp;状&nbsp;&nbsp;&nbsp; 态：
                <i-select size="small" value="草稿" v-model="newsStatus">
                  <Option
                    v-for="item in articleStateList"
                    :value="item.value"
                    :key="item.id"
                  >{{ item.value }}</Option>
                </i-select>
              </p>
              <p class="margin-top-10">
                <Icon type="eye"></Icon>&nbsp;&nbsp;公开度：&nbsp;
                <b>{{ Openness }}</b>
                <Button v-show="!editOpenness" size="small" @click="handleEditOpenness">修改</Button>
                <transition name="openness-con">
                  <div v-show="editOpenness" class="openness-radio-con">
                    <RadioGroup v-model="currentOpenness" vertical>
                      <Radio label="公开">
                        公开
                        <Checkbox v-show="currentOpenness === '公开'" v-model="topArticle">在首页置顶这篇文章</Checkbox>
                      </Radio>

                      <Radio label="私密"></Radio>
                    </RadioGroup>
                    <div>
                      <Button type="primary" @click="handleSaveOpenness">确认</Button>
                      <Button type="warning" @click="cancelEditOpenness">取消</Button>
                    </div>
                  </div>
                </transition>
              </p>
              <p class="margin-top-10">
                <Icon type="ios-calendar-outline"></Icon>&nbsp;&nbsp;
                <span v-if="publishTimeType === 'immediately'">发布时间</span>
                <span v-else>选择时间：{{ publishTime }}</span>
                <Button v-show="!editPublishTime" size="small" @click="handleEditPublishTime">修改</Button>
                <transition name="publish-time">
                  <div v-show="editPublishTime" class="publish-time-picker-con">
                    <div class="margin-top-10">
                      <DatePicker
                        @on-change="setPublishTime"
                        type="datetime"
                        style="width:200px;"
                        placeholder="选择日期和时间"
                      ></DatePicker>
                    </div>
                    <div class="margin-top-10">
                      <Button type="primary" @click="handleSavePublishTime">确认</Button>
                      <Button type="warning" @click="cancelEditPublishTime">取消</Button>
                    </div>
                  </div>
                </transition>
              </p>
              <Row class="margin-top-20 publish-button-con">
                <span class="publish-button">
                  <Button type="warning" @click="handlePreview">预览</Button>
                </span>

                <span class="publish-button">
                  <Button
                    @click="handlePublish"
                    :loading="publishLoading"
                    icon="ios-checkmark"
                    style="width:90px;"
                    type="success"
                  >发布</Button>
                </span>
              </Row>
            </Card>
            <div class="margin-top-1">
              <Card>
                <p slot="title">
                  <Icon type="navicon-round"></Icon>分类目录
                </p>
                <div style="height:430px">
                  <Tabs type="card">
                    <Tree
                      :data="classificationList"
                      @on-check-change="setClassificationInAll"
                      show-checkbox
                    ></Tree>
                  </Tabs>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </Tab-pane>

      <Tab-pane label="轮播图" key="key3" class="tab1">
        <Row>
          <Col span="18">
            <Card>
              新闻选择：
              <i-select style="width:100%; padding:2px" v-model="selected">
                <i-option
                  v-for="news in newsName"
                  :value="news.newsname"
                  :key="news.newsid"
                >{{news.newsname}}</i-option>
              </i-select>轮播序号选择：
              <i-select
                style="width:100%; padding:2px"
               
                v-model="selectedNum"
              >
                <i-option value="1">1</i-option>
                <i-option value="2">2</i-option>
                <i-option value="3">3</i-option>
    
              </i-select>
              <Input class="input" disabled v-model="selected" icon="android-list" />
              <div class="lines"></div>
            </Card>
            <div class="image">
              <img :src="picsrc" style="width:386px;height:308px" />
            </div>
            <Upload
              class="Upload"
              :before-upload="handleBeforeUpload"
              action="//jsonplaceholder.typicode.com/posts/"
            >
              <Button icon="ios-cloud-upload-outline" type="primary" ghost long>点击此处上传图片</Button>
            </Upload>
          </Col>

          <Col span="5">
            <div style="padding:5px">
              <i-button @click="uploadFamouTeacher">发布</i-button>
            </div>
          </Col>
        </Row>
      </Tab-pane>
    </Tabs>
  </div>
</template>


<script>
import axios from "axios";
let E = require("wangeditor");
let editor;
export default {
  data() {
    return {
      newsName: [],
      Nums: [{ value: "1" }, { value: "2" }, { value: "3" }, { value: "4" }],
      picsrc: "",
      selectedNum: "",
      newsStatus: "",
      selected: "",
      htmla: "",
      text: "",
      selected: 1,
      articleTitle: "",
      articleError: "",
      showLink: false,
      fixedLink: "",
      articlePath: "",
      articlePathHasEdited: false,
      editLink: false,
      editPathButtonType: "ghost",
      editPathButtonText: "编辑",
      articleStateList: [{ value: "已发布" }],
      editOpenness: false,
      Openness: "公开",
      currentOpenness: "公开",
      topArticle: false,
      publishTime: "",
      publishTimeType: "immediately",
      editPublishTime: false, // 是否正在编辑发布时间
      articleTagSelected: [], // 文章选中的标签
      articleTagList: [], // 所有标签列表
      classificationList: [],
      classificationSelected: [], // 在所有分类目录中选中的目录数组
      offenUsedClass: [],
      offenUsedClassSelected: [], // 常用目录选中的目录
      classificationFinalSelected: [], // 最后实际选择的目录
      publishLoading: false,
      addingNewTag: false, // 添加新标签
      newTagName: "", // 新建标签名
      picsrc: "",
      content: `<p>hello world</p>`
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
    completeUrl() {
      let finalUrl = this.fixedLink + this.articlePath;
      localStorage.finalUrl = finalUrl; // 本地存储完整文章路径
      return finalUrl;
    }
  },

  mounted() {
    var nowDate = new Date();

    axios({
      url: `${apiPath}/monitor/searchNewsName`,
      method: "get"
    })
      .then(res => {
        this.newsName = res.data.data;
      })
      .catch(error => {
      });

    this.geteditor();
    this.classificationList = [
      {
        title: "规则制度",
        expand: true
      },

      {
        title: "新闻资讯",
        expand: true
      }
    ];
  },

  methods: {

    //轮播图发布方法
    uploadFamouTeacher() {
      if (
        this.picsrc == null ||
        this.selected == null ||
        this.selectedNum == null
      ) {
        alert(this.picsrc);
        alert(this.selected);
        alert(this.selectedNum);
        this.$Message.info("请检查上传选项");
        return;
      }
     this.$Modal.confirm({
        title: "确定上传轮播图吗？",
        onOk: () => {
          axios({
            url: `${apiPath}/monitor/uploadFamPic`,
            method: "post",
            data: {
              "picNum": this.selectedNum,
              "newsName": this.selected,
              "picsrc": this.picsrc
            }
          }).then(res => {
            if (res.data.code == 200) {
              this.$Message.info("上传成功");
            } else {
              this.$Message.info("上传失败");
            }
          });
        }
      });
    },

    //轮播图上次方法
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
          this.picsrc = "https://writingcenter.shu.edu.cn/" + res.data;
          // this.picsrc = "https://120./" + res.data;
        });
      return false;
    },

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

    handleArticletitleBlur() {
      if (this.articleTitle.length !== 0) {
        // this.articleError = '';
        localStorage.articleTitle = this.articleTitle; // 本地存储文章标题
        if (!this.articlePathHasEdited) {
          let date = new Date();
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          let day = date.getDate();
          this.fixedLink =
            window.location.host + "/" + year + "/" + month + "/" + day + "/";
          this.articlePath = this.articleTitle;
          this.articlePathHasEdited = true;
          this.showLink = true;
        }
      } else {
        // this.articleError = '文章标题不可为空哦';
        this.$Message.error("文章标题不可为空哦");
      }
    },
    editArticlePath() {
      this.editLink = !this.editLink;
      this.editPathButtonType =
        this.editPathButtonType === "ghost" ? "success" : "ghost";
      this.editPathButtonText =
        this.editPathButtonText === "编辑" ? "完成" : "编辑";
    },
    handleEditOpenness() {
      this.editOpenness = !this.editOpenness;
    },
    handleSaveOpenness() {
      this.Openness = this.currentOpenness;
      this.editOpenness = false;
    },
    cancelEditOpenness() {
      this.currentOpenness = this.Openness;
      this.editOpenness = false;
    },
    handleEditPublishTime() {
      this.editPublishTime = !this.editPublishTime;
    },
    handleSavePublishTime() {
      this.publishTimeType = "timing";
      this.editPublishTime = false;
    },
    cancelEditPublishTime() {
      this.publishTimeType = "immediately";
      this.editPublishTime = false;
    },
    setPublishTime(datetime) {
      this.publishTime = datetime;
    },
    setClassificationInAll(selectedArray) {
      this.classificationFinalSelected = selectedArray.map(item => {
        return item.title;
      });
      localStorage.classificationSelected = JSON.stringify(
        this.classificationFinalSelected
      ); // 本地存储所选目录列表
    },
    setClassificationInOffen(selectedArray) {
      this.classificationFinalSelected = selectedArray;
    },
    handleAddNewTag() {
      this.addingNewTag = !this.addingNewTag;
    },
    createNewTag() {
      if (this.newTagName.length !== 0) {
        this.articleTagList.push({ value: this.newTagName });
        this.addingNewTag = false;
        setTimeout(() => {
          this.newTagName = "";
        }, 200);
      } else {
        this.$Message.error("请输入标签名");
      }
    },
    cancelCreateNewTag() {
      this.newTagName = "";
      this.addingNewTag = false;
    },
    canPublish() {
      if (this.articleTitle.length === 0) {
        this.$Message.error("请输入文章标题");
        return false;
      } else {
        return true;
      }
    },
    handlePreview() {
      if (this.canPublish()) {
        if (this.publishTimeType === "immediately") {
          let date = new Date();
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          let day = date.getDate();
          let hour = date.getHours();
          let minute = date.getMinutes();
          let second = date.getSeconds();
          localStorage.publishTime =
            year + " 年 " + month + " 月 " + day + " 日 ";
        } else {
          localStorage.publishTime = this.publishTime; // 本地存储发布时间
        }

        localStorage.articletitle = this.articleTitle;
        localStorage.content = editor.txt.html();
        localStorage.type = this.classificationFinalSelected[0];
        //this.$router.push({
        //name: "preView"
        //});

        var newPage = window.open();
        newPage.location.href = `${apiPath2}/#/manager/preView`;
      }
    },

    handlePublish() {
      if (this.canPublish()) {
        var newDate = new Date(this.publishTime);
        this.publishLoading = true;
        this.htmla = editor.txt.html();
        axios({
          url:`${apiPath}/monitor/uploadNews`,
          method: "post",
          data: {
            newsname: this.articleTitle,
            newscontext: this.htmla,
            newsstatus: this.newsStatus,
            newsauth: this.currentOpenness,
            newstime: newDate,
            newstype: this.classificationFinalSelected[0]
          }
        })
          .then(res => {
            this.publishLoading = false;
            this.$Message.info("发布成功");
          })
          .catch(error => {
            this.publishLoading = false;
            this.$Message.info("发布失败，请检查发布选项");
          });
      }
    },
    handleSelectTag() {
      localStorage.tagsList = JSON.stringify(this.articleTagSelected); // 本地存储文章标签列表
    }
  }
};
</script>

<style scoped>
.input {
  width: 100%;
  padding: 0 0 10px 0px;
}

.template {
  background-color: #f9fafc;
  height: 835px;
  width: 1260px;
  min-width: 1260px;
}
.toolbar {
  height: 650px;
}

.Carousel {
  width: 100%;
  height: 300px;
  align-items: center;
  padding: 11px 0 0 0;
}

.editor {
  background-color: white;
  width: 100%;
}

.margin-top-1 {
  margin-top: 4px;
  height: 350px;
}
.margin-top-10 {
  margin-top: 4px;
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

.image {
  text-align: center;
  margin: 0 auto;
  padding: 3%;
}

.Upload {
  text-align: center;
  margin: 0 auto;
}
</style>