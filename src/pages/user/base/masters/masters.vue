<template>
  <div>
    <Tabs style="margin-left:20px;" :value="theVariety" @on-click="tabClick">
      <TabPane label="名家风采" name="1">
        <Row class="exhibit">
          <ul>
            <li style="display:block;" v-for="(item,index) in datas" :key="index">
              <div class="list">
                <div class="img">
                  <img :src="item.imagesrc" alt="name" style="width:200px;height:188px;" />
                </div>
                <div class="introduce">
                  <h3>{{item.title}}</h3>
                </div>
              </div>
            </li>
          </ul>
        </Row>

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
      </TabPane>
      <TabPane label="耕耘不懈" name="2">
        <Row class="exhibit">
          <ul>
            <li style="display:block;" v-for="(item,index) in datas" :key="index">
              <div class="list">
                <div class="img">
                  <img :src="item.imagesrc" alt="name" style="width:200px;height:188px;" />
                </div>
                <div class="introduce">
                  <h3>{{item.title}}</h3>
                </div>
              </div>
            </li>
          </ul>
        </Row>

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
      </TabPane>
      <TabPane label="翰墨留香" name="3">
        <Row class="exhibit">
          <ul>
            <li style="display:block;" v-for="(item,index) in datas" :key="index">
              <div class="list">
                <div class="img">
                  <img :src="item.imagesrc" alt="name" style="width:200px;height:188px;" />
                </div>
                <div class="introduce">
                  <h3>{{item.title}}</h3>
                </div>
              </div>
            </li>
          </ul>
        </Row>

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
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      theVariety: 1,
      total: 100,
      page: 1,
      datas: [
        {
          imagesrc: require("@/common/images/weichang.png"),
          title: "标题"
        },
        {
          imagesrc: require("@/common/images/weichang.png"),
          title: "标题"
        },
        {
          imagesrc: require("@/common/images/weichang.png"),
          title: "标题"
        },
        {
          imagesrc: require("@/common/images/weichang.png"),
          title: "标题"
        },
        {
          imagesrc: require("@/common/images/weichang.png"),
          title: "标题"
        },
        {
          imagesrc: require("@/common/images/weichang.png"),
          title: "标题"
        }
      ]
    };
  },
  methods: {
    cutaway(index) {
      this.page = index;
      this.loadData();
    },
    tabClick(name) {
      this.theVariety = name;
      this.loadData();
    },
    loadData() {
      let URL = `${apiPath}`;

      // axios({
      //   url: URL,
      //   method: "post",
      //   data: {
      //     variety:this.theVariety,
      //     page:this.page,
      //   }
      // })
      //   .then(res => {
      //     if (res.data.code === 200) {
      //       this.datas = res.data.data;
      //       this.total = res.data.total;
      //       for(let i = 0; i<this.datas.length;i++){
      //         this.datas[i].imagesrc=require(this.datas[i].imagesrc);
      //       }
      //     } else {
      //       this.$Notice.warning({ title: `出错，提示：${res.data.msg}` });
      //     }
      //   })
      //   .catch(err => {
      //     this.loading = false;
      //   });
    }
  },
  mounted() {
    this.theVariety = "1";
    this.loadData();
  },
  watch: {
    theVariety(newVal, oldVal) {
      this.page = 1;
    },
    page(newVal, oldVal) {}
  }
};
</script>

<style lang="scss" scoped>
@import "masters";
</style>