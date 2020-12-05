<template>
  <div>
    <div>
      <div id="college">
        <span class="choose_title">图书分类:</span>
        <RadioGroup v-model="variety" :class="{choose:academyactive}" class="choosetrue">
          <Radio label="A">马列主义毛泽东思想邓小平理论</Radio>

          <Radio label="B">哲学，宗教</Radio>
          <Radio label="C">社会科学总论</Radio>
          <Radio label="D">政治,法律</Radio>
          <Radio label="E">军事</Radio>
          <Radio label="F">经济</Radio>
          <Radio label="G">文化、科学、教育、体育</Radio>
          <Radio label="H">语言、文字</Radio>
          <Radio label="I">文学</Radio>
          <Radio label="J">艺术</Radio>
          <Radio label="K">历史、地理</Radio>
          <Radio label="N">自然科学总论</Radio>
          <Radio label="O">数理科学和化学</Radio>
          <Radio label="P">天文学、地球科学</Radio>
          <Radio label="Q">生物学</Radio>
          <Radio label="R">医药、卫生</Radio>
          <Radio label="S">农业科学</Radio>
          <Radio label="T">工业技术</Radio>
          <Radio label="U">交通运输</Radio>
          <Radio label="V">航天、航空</Radio>
          <Radio label="X">环境科学、安全科学</Radio>
          <Radio label="Z">综合性图书</Radio>
        </RadioGroup>
        <div>
          <Button
            type="info"
            ghost
            style="position:relative;float:right; flex-grow: 0;;
        flex-shrink: 0;"
            @click="academyactive = !academyactive;"
          >
            <div v-if="this.academyactive">
              <Icon type="ios-arrow-down" style="margin-left:-10px;padding:0px;position:relative" />
              <span style="margin-right:-10px;position:relative">展开</span>
            </div>
            <div v-else>
              <Icon type="ios-arrow-up" style="margin-left:-10px;padding:0px;position:relative" />
              <span style="margin-right:-10px;position:relative">收起</span>
            </div>
          </Button>
        </div>
      </div>
    
      <div id="books">
        <Row class="exhibit1">
          <ul>
            <li style="display:block;" v-for="(item,index) in datas" :key="index">
              <div class="list">
                <div class="img">
                  <img :src="item.pic" alt="name" style="width:200px;height:250px;" />
                </div>
                <div class="introduce">
                  <p>书名：{{item.title}}</p>
                  <p>作者：{{item.author}}</p>
                  <p>出版社：{{item.imprint}}</p>
                  <p>出版时间：{{item.year}}</p>
                  <p>索书号：{{item.labrarynum}}</p>
                  <p>ISBN：{{item.isbn}}</p>
                  <p class="abstract">摘要：{{item.abstracts}}</p>
                </div>
              </div>
            </li>
          </ul>
        </Row>
      </div>
       <Row type="flex" justify="space-between" class="code-row-bg">
          <Col span="2"></Col>
          <Col span="18" style="text-align:center;">
            <Page
              :total="total"
              show-elevator
              style="margin-bottom:40px;padding-top:15px;"
              @on-change="cutaway"
              :page-size="12"
            />
          </Col>
          <Col span="2"></Col>
        </Row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      total:0,
      variety: "",
      page:1,
      datas: [
      
       
      ],
      academyactive: true //学院搜索栏是否为展开状态
    };
  },
  methods: {
    expend() {
      this.academyactive = !this.academyactive;
    },
    cutaway(index) {
      this.page = index;
      this.loadData();
    },
     loadData() {
      let URL = `${apiPath}/xkd/xkdDonateBook`;
      let pagesize=6;
      axios({
        url: URL,
        method: "get",
        params: {
          category:this.variety,
          page:this.page,
          pageSize:pagesize
        }
      })
        .then(res => {
          if (res.data.code === 200) {
            this.datas = res.data.data;
            this.total = res.data.count;
            for(let i = 0; i<this.datas.length;i++){
           
              if(this.datas[i].abstracts==null){
                this.datas[i].abstracts="暂无本书摘要"
              }
            }
            
          } else {
            this.$Notice.warning({ title: `出错，提示：${res.data.msg}` });
          }
        })
        .catch(err => {
          this.loading = false;
        });
    }
  },
  mounted(){
    this.variety="all";
  },
  watch:{
    variety(newVal,oldVal){
      this.page = 1;
      this.loadData();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "books.scss";
</style>
<style type="text/css">
</style>