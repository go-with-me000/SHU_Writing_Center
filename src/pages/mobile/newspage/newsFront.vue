<template>
  <div style="position:relative;">
    <Row type="flex" justify="center" class="code-row-bg">
      <Col span="2"></Col>
      <Col span="16">
        <Tabs class="tabs">
          <TabPane label="新闻资讯">
            <Row type="flex" justify="space-between" class="code-row-bg">
              <Col span="25" class="displaynews">
                <ul>
                  <li v-for="(theNew,index) in news" :key="index">
                    <span class="spantime">{{theNew.newsTime}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span
                      class="spantype"
                    >{{theNew.newstype}}</span>
                    <br />
                    <Divider style="margin-top:10px;margin-bottom:15px;" />
                  
                      <a class="spanname" @click="textnews(index)">{{theNew.newsname}}</a>
              
                  </li>
                </ul>
              </Col>
            </Row>
            <Row type="flex" justify="space-between" class="code-row-bg">
              <Col span="2"></Col>
              <Col span="18" style="text-align:center;">
                <Page :total="totalnews" style="margin-bottom:40px;" @on-change="cutaway" />
              </Col>
              <Col span="2"></Col>
            </Row>
          </TabPane>
        </Tabs>
      </Col>
      <Col span="2"></Col>
    </Row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      news: [],
      totalnews: 0,
      page: 0
    };
  },

  methods: {
    textnews(index) {
      localStorage.setItem("newsid", this.news[index].newsid);
      this.$router.push({
         path: `mobileNewsPage`
        })

    },
    cutaway(index) {
      this.loadData(index);
      this.page = index;
    },
    loadData(index) {
      let URL = `${apiPath}/public/newsPage?cur=${index}`;

      axios({
        url: URL,
        method: "get"
      })
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.data != null) {
              this.totalnews = res.data.count;
              this.news = res.data.data;
            }
          } else {
            this.$Message.warning({
              title: `出错，提示：${res.data.msg}`
            });
          }
        })
        .catch(err => {
          // this.$Message.warning({ title: `出错，提示：${err}` });
        });
    }
  },
  mounted() {
    this.loadData(1);
  }
};
</script>

<style lang="scss" scoped>
@import "newsFront";
</style>
