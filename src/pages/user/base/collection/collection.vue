<template>
  <div>
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
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      total: 100,
      datas: [
     
      ]
    };
  },
   methods: {
    cutaway(index) {
      this.page = index;
      this.loadData();
    },
  
    loadData() {
      let URL = `${apiPath}/xkd/xkdDonateCollection`;
      let pageSize=6;
      axios({
        url: URL,
        method: "get",
        params: {
          pageSize:pageSize,
          page:this.page,
        }
      })
        .then(res => {
          if (res.data.code === 200) {
            console.log(res)
            this.datas = res.data.data;
            this.total = res.data.total;
           
          } else {
            this.$Notice.warning({ title: `出错，提示：${res.data.msg}` });
          }
        })
        .catch(err => {
          this.loading = false;
        });
    }
  },
  mounted() {
  
    this.loadData();
  },
  watch: {
   
  }
};
</script>

<style lang="scss" scoped>
@import "collection";
</style>