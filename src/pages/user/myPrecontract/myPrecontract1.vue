<template>
  <div>
    <Row>
      <!-- <Col span="5">
        <Card :bordered="false" style="margin-top:25px;">
          <p slot="title" style="text-align:center">头像</p>
          <img src="../../../assets/img/teacher1.jpg"  />
        </Card>
      </Col> -->
      <Col span="17" offset="3" :bordered="false">
        <Card>
          <Row class="stitle">详情：
             <div id="rate">
            评分：
            <Rate disabled v-model="row.satisfaction" />
          </div>
          </Row>
          <Divider size="small" />
          <Row class="expand-row" v-if="identity=='学生教师'">
            
            <Col span="12">
              <span class="expand-key">学院:</span>
              <span class="expand-value">{{ row.academy }}</span>
            </Col>
            <Col span="12">
              <span class="expand-key">组织:</span>
              <span class="expand-value">{{ row.organization }}</span>
            </Col>
          </Row>
          <Row class="expand-row" v-else>
            <Col span="8">
              <span class="expand-key">职位:</span>
              <span class="expand-value">{{ row.duty }}</span>
            </Col>
            <Col span="8">
              <span class="expand-key">学院:</span>
              <span class="expand-value">{{ row.academy }}</span>
            </Col>
            <Col span="8">
              <span class="expand-key">组织:</span>
              <span class="expand-value">{{ row.organization }}</span>
            </Col>
          </Row>
          <Divider class="spider"></Divider>
          <Row>
            <Col span="12">
              <span class="expand-key">电话:</span>
              <span class="expand-value">{{ row.phone }}</span>
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
              <span class="expand-value">{{ row.beginTime }}</span>
            </Col>
            <Col span="12">
              <span class="expand-key">结束时间:</span>
              <span class="expand-value">{{ row.endTime }}</span>
            </Col>
           
          </Row>
          <Divider class="spider"></Divider>
          <Row>
            <span class="expand-key">个人简介:<br><br></span>
            <span class="expand-value">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ row.description }}</span>
          </Row>
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
  data(){
    return{
      identity:''
    }
  },
  mounted(){
    this.identity=localStorage.getItem("duty")
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
.expand-key {
}
.spider {
  font-weight: bold;
}
</style>