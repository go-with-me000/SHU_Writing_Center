<template>
  <div class="template">
    <Row style="padding:20px">
      <i-col span="15">
        <div class="page">
          <div>
            <p
              style="font-size:21px;  text-align: center;font-weight: bold;padding:35px 15px 15px 0 "
            >{{title}}</p>
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
      </i-col>
      <i-col span="7" class="span7">
        <div class="otherNews">
          <Card :bordered="false">
            <p slot="title">管理办法</p>
            <div class="newstitle" v-for="item in managerNews" :key="item.id">
              <span class="iconfont icon-youjiantou">
                <a class="newstitle">{{item.newsname}}</a>
              </span>
            </div>
          </Card>
        </div>

        <div class="otherNews">
          <Card :bordered="false">
            <p slot="title">最新更新</p>
            <div class="newstitle" v-for="item in latestNews" :key="item.id">
              <span class="iconfont icon-youjiantou">
                <a class="newstitle">{{item.newsname}}</a>
              </span>
            </div>
          </Card>
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      uploadTime: new Date(),
      type: "",
      title: "",
      context: "",
      managerNews: [],
      latestNews: []
    };
  },

  mounted: function() {
    var localStorage = window.localStorage;
    this.title = localStorage.articletitle;
    this.context = localStorage.content;
    this.uploadTime = localStorage.publishTime;
    this.type = localStorage.type;
  alert(this.title);
    axios({
      url: "http://202.120.117.43:8080/monitor/searchNewsForLatest",
      method: "get"
    }).then(res => {
      this.latestNews = res.data.data[0];
      this.managerNews = res.data.data[1];
    });
  }
};
</script>

<style scoped>
.page {
  width: 950px;
  background-color: white;
  float: right;
}

.template {
  width: 1260px;
  min-width: 1260px;
  padding: 0 0 0 500px;
  background-color: #d8d8d8;
}

.otherNews {
  width: 100%;
  height: 100%;
  background-color: white;
  margin: left;
  float: left;
  text-align: left;
  margin: 0px 7px 5px 10px;
}

.newsMsg {
  font-size: 13px;
  color: #685050;
  padding: 11px 0 0 0;
  text-align: center;
}

.time {
  padding: 0 40px 0 0px;
}

.lines {
  position: relative;
  margin: 3px auto;
  padding: 2px 0 0 0;
  width: 88%;
  height: 2px;
  background-color: #d4d4d4;
  text-align: center;
  font-size: 19px;
  color: rgba(101, 101, 101, 1);
}

.newstitle {
  color: black;
  font-size: 15px;
}

.context {
  text-align: left;

  padding: 15px 50px;
  line-height: 180%;
}

.span7 {
  width: 270px;
}
</style>