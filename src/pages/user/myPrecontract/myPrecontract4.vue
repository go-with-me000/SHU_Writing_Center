<template>
  <div>
    <Row>
      <Col span="12" offset="6" :bordered="false">
        <Card>
          <Row class="stitle">
            详情：
            <Button
              type="primary"
              ghost
              id="thesis"
              size="large"
              @click="article(row.essaysrc)"
            >查看论文</Button>
          </Row>
          <Divider size="small" />
          <Row class="expand-row">
            <Col span="12">
              <span class="expand-key">学号:</span>
              <span class="expand-value">{{ row.studentId}}</span>
            </Col>

            <Col span="12">
              <span class="expand-key">学院:</span>
              <span class="expand-value">{{ row.academy }}</span>
            </Col>
           
          </Row>
          <Divider class="spider"></Divider>
           <Row>
             <Col span="12">
              <span class="expand-key">电话:</span>
              <span class="expand-value">{{ row.phoneNumber }}</span>
            </Col>
            <Col span="12">
              <span class="expand-key">邮箱:</span>
              <span class="expand-value">{{ row.email }}</span>
            </Col>
          </Row>
          <Divider class="spider"></Divider>
          <Row>
            <Col span="12">
              <span class="expand-key">开始时间:</span>
              <span class="expand-value">{{ row.startTime }}</span>
            </Col>
            <Col span="12">
              <span class="expand-key">结束时间:</span>
              <span class="expand-value">{{ row.endTime }}</span>
            </Col>
          </Row>
          <Divider class="spider"></Divider>
         
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  props: {
    row: Object
  },
  data() {
    return {
      screenHeight: window.innerHeight
    };
  },
  methods: {
    article(essaysrc) {
      layer.open({
        type: 2,
        area: ["700px", this.screenHeight],
        fixed: false, //不固定
        maxmin: true,
        content: essaysrc
      });
    }
  },
  watch: {},
  mounted() {
    this.screenHeight = window.innerHeight + "px";
    const that = this;
    window.onresize = () => {
      return (() => {
        that.screenHeight = window.innerHeight + "px";
      })();
    };
  }
};
</script>
<style lang="scss" scoped>
@import "myPrecontract";
</style>
<style scoped >
.expand-row {
  margin-bottom: 16px;
}

.spider {
  font-weight: bold;
}
#thesis {
  position: relative;
  float: right;
  right: 30px;
}
</style>