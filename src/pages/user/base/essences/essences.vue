<template>
  <div class="essences">
    <Tabs  style="margin-left:20px;" :value="theVariety" @on-click="tabClick">
      <TabPane label="自然科学" name="1">
        <Table :columns="columns" :data="datas" style="width:98%;margin-left:2%">
          <template slot-scope="{ row, index }" slot="abstract">
            <Button type="primary" ghost style="margin-right:5px" @click="show(index)">查看</Button>
          </template>
        </Table>
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
      <TabPane label="人文社科" name="2"></TabPane>
      <TabPane label="外文著作" name="3"></TabPane>
      <TabPane label="其他" name="4"></TabPane>
    </Tabs>
    <div>
      <Modal v-model="modal1" width="440" :styles="{top: '180px'}">
        <p slot="header" style="color:#245086;text-align:center;font-size:20px">
          <Icon type="ios-information-circle"></Icon>
          <span>摘要详情</span>
        </p>
        <p>{{abstract}}</p>

        <div slot="footer" style="text-align:center">
          <Button type="primary" size="large" @click="modal1=false" long>确定</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 100,
      modal1: false,
      abstract: "",
      theVariety:"1",
      page:1,
      columns: [
        {
          type: "index",
          width: 70,
          align: "center",
          title: "序号"
        },
        {
          title: "标题",
          key: "title",
          align: "center"
        },
        {
          title: "作者",
          key: "author",
          align: "center"
        },
        {
          title: "出版年",
          key: "publication",
          align: "center"
        },
        {
          title: "引用",
          key: "quote",
          align: "center"
        },
        {
          title: "摘要",
          slot: "abstract",
          align: "center",
          width: 140
        }
      ],
      datas: [
        {
          title: "钱伟长图书",
          author: "钱伟长",
          publication: "1999-1-2",
          quote: "引用自他人",
          abstract: "这是一份简短的摘要。"
        },
        {
          title: "钱伟长图书",
          author: "钱伟长",
          publication: "1999-1-2",
          quote: "引用自他人",
          abstract: "这是一份简短的摘要。"
        },
        {
          title: "钱伟长图书",
          author: "钱伟长",
          publication: "1999-1-2",
          quote: "引用自他人",
          abstract: "这是一份简短的摘要。"
        },
        {
          title: "钱伟长图书",
          author: "钱伟长",
          publication: "1999-1-2",
          quote: "引用自他人",
          abstract: "这是一份简短的摘要。"
        }
      ]
    };
  },
  methods: {
    show(index) {
      this.abstract = this.datas[index].abstract;
      this.modal1 = true;
    },
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

      axios({
        url: URL,
        method: "post",
        data: {
          variety:this.theVariety,
          page:this.page,
        }
      })
        .then(res => {
          if (res.data.code === 200) {
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
@import "essences";
</style>
<style lang="scss">
.essences .ivu-table-header thead tr th {
  background: #245086;
  color: #fff;
}
</style>