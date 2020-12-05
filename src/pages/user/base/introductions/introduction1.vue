<template>
  <div>
    <Row :gutter="16">
      <Col span="5"></Col>
      <Col span="8" offset="2">
        <p style="font-size:22px;margin-top:20px;margin-bottom:10px;"><Icon type="md-person" style="margin-right:15px" /><span style="color:#000">钱伟长</span></p>
        <p style="font-size:22px;margin-top:10px;margin-bottom:20px"><Icon type="md-school" style="margin-right:15px" /><span style="color:#000">上海大学校长</span></p>
        <img src="@/common/images/weichang.png" style="width:100%;height:100%" />
      </Col>
      <Col span="2"></Col>
      <Col span="12" offset="1" class="title">
        <Card :bordered="false" class="card">
          <p slot="title">简介</p>
          <p>钱伟长，1912年10月9日－2010年7月30日，江苏无锡人，中国力学家、应用数学家、教育家，中国科学院院士，上海大学校长，耀华中学名誉校长。中国近代力学、应用数学的奠基人之一。中国人民政治协商会议第六届、七届、八届和九届全国委员会副主席，民盟中央副主席、名誉主席。</p>
        </Card>
        <Card :bordered="false" class="card">
          <p slot="title">荣誉</p>
          <p>世界著名的杰出华人科学家，教育家，社会活动家。国际上以钱氏命名的力学，应用数学科研成果就有"钱伟长方程"、"钱伟长方法"、"钱伟长一般方程"，"圆柱壳的钱伟长方程"等。</p>
        </Card>
        <Card :bordered="false" class="card">
          <p slot="title">经历</p>
          <p>1931年，清华大学物理系就读 1940年，赴加拿大多伦多大学攻读博士</p>
          <p>1942年，到美国从事航空航天研究工作</p>
          <p>1948年，回国创立中国第一个力学专业</p>
          <p>1956年，制定中国第一个12年科学规划</p>
          <p>1994年，任上海大学第一任校长</p>
        </Card>
        <Card :bordered="false" class="card">
          <p slot="title">钱伟长语录</p>
          <p>
            我不是党员,不过我还是拿党的事业作为我的终生事业。为了我们的民族，我们个人吃点亏不要后悔,不值得后悔。我们历史上有许多英雄人物靠这么点精神，为我们中华民族立了大功绩！这就是公而忘私，...我们先哲对我们的教育是很多的，譬如像范仲淹那句话“先天下之忧而忧，后天下之乐而乐”的名言就很精彩的！换句话说，就是我们要为天下着想，也就是为中华民族、为党的事业着想。(1987)
            <br />我们培养的学生首先应该是一个全面的人，是一个爱国者，一个辩证唯物主义者，一个有文化艺术修养、道德品质高尚、心灵美好的人；其次，才是一个拥有学科、专业知识的人，一个未来的工程师、专门家。
          </p>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {};
</script>

<style>
.title .ivu-card-head p,
.ivu-card-head-inner {
  font-size: 20px;
  font-weight: bold;
  color: #245086;
}
</style>
<style lang="scss" scoped>
.card {
  position: relative;

  margin-bottom: 20px;
}
p {
  font-size: 15px;
}
</style>
