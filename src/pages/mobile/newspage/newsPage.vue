<template>
  <div class="template" v-if="mark">
   
    <Row style="padding:15px">
      <Col span="23" >
        <div class="page">
          <div>
            <p style="font-size:16px;font-weight: bold;padding:15px 20px 20px 20px ;color:#000">{{title}}</p>
          </div>
          <div class="newsMsg">
            <span class="iconfont icon-shijian"></span>
            <span class="time">发布时间：{{uploadTime}}</span>
            <span class="iconfont icon-fenlei"></span>
            <span>文章类型：{{type}}</span>
          </div>
          <div class="lines"></div>
          <div class="mainContext">
            <div v-html="this.context" class="context"></div>
          </div>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      uploadTime: new Date(),
      // uploadTime:'2020-1-1',
      type: "",
      title: "",
      context: "",
      managerNews: [],
      latestNews: [],
      mark:false,
    };
  },

  mounted: function() {
    let newsid = localStorage.getItem("newsid")
    let number =newsid;
    
    this.readNews(number)
    let URL = `${apiPath}/public/searchNewsForLatest`;
    axios({
      url: URL,
      method: "get"
    }).then(res => {
      this.latestNews = res.data.data[0];
      this.managerNews = res.data.data[1];
    }).catch(err=>{
    })
  },
  methods: {
    readNews(index) {
      let URL = `${apiPath}/public/searchNews`;
      axios({
        url: URL,
        method: "get",
        params: {
          newsId: index
        }
      }).then(res => {
        
        this.title = res.data.data[0].newsname;
        this.context = res.data.data[0].newscontext;
        this.type = res.data.data[0].newstype;
        let dateNumber = res.data.data[0].newstime;
        let date = new Date(dateNumber);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        this.uploadTime = year + " 年 " + month + " 月 " + day + " 日 ";
        this.mark=true;
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "newsPage";
</style>