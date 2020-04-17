<template>
  <div>
    <Layout
      style="height: calc(100vh - 60px);"
      :style="{margin: '0px', background: '#fff', minHeight: '220px',
         backgroundImage:'url(http://114.55.93.118/group1/M00/00/00/rBA7015hBzqATVEgAAGCweLpcpo381.jpg)',
         backgroundRepeat:'no-repeat',backgroundSize:'100% 100%',
          }"
    >
      <Layout class="backs"></Layout>
      <div class="intbutton" @click="go">
        <Poptip content="中心介绍" trigger="hover" class="arrow" placement="left"></Poptip>
      </div>

      <div class="texts">
        <p class="title1">上海大学写作中心</p>

        <p class="title2">SHU Writing Center</p>
        <p class="title2">一站式写作教学、写作服务、写作科研的平台</p>
      </div>
    </Layout>
  </div>
</template>

<script>
export default {};
</script>
<style scoped>
.texts {
  position: absolute;
  top: 25%;
  transform: translate(-50%, 0);
  left: 50%;
  font-weight: bold;
  z-index: 2;
  color: #fff;
  text-align: center;
}

.title1 {
  font-size: 50px;
  position: relative;
}

.title2 {
  font-size: 30px;
  position: relative;
  margin-top: 10px;
}

.backs {
  position: absolute;
  width: 100%;
  height: 100%;

  background: rgba(29, 28, 28, 0.4);
  z-index: 1;
}

@media screen and (max-width: 810px) {
  .texts .title1 {
    font-size:30px;
  }

    .texts .title2 {
    font-size: 20px;
  }
}

@media screen and (max-width: 480px) {
  .texts .title1 {
    font-size:20px;
  }

    .texts .title2 {
    font-size: 13px;
  }
}

@media screen and (max-width: 320px) {
  .texts .title1 {
    font-size:14px;
  }

    .texts .title2 {
    font-size: 10px;
  }
}

</style>