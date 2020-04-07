<template>
  <Row class="header">
    <i-col  :span="2" :offset="21">
    <i-button @click="callback()">返回</i-button>
    </i-col>

  </Row>
</template>
<script>
import axios from 'axios'
  export default {
      data(){
          return{
           
          }
      },
      methods:{
      callback()
      {
        this.$router.push('/user/homepage')

      }
 
      }
  }
</script>
<style scoped>
  .header{
    width: 100%;
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #f9fafc;
  }

</style>
