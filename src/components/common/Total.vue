<template>
  <div>

 <router-view></router-view>
 
  </div>
</template>
  
    <Head></Head>
    <table>
      <tr>
        <td class="td">
            <Left></Left>
        </td>
    <td class="right">
        <router-view></router-view>
    </td>
      </tr>
    </table>
 
<script>
import Left from "./Left.vue";
import Head from "./Head.vue";

export default {
  components: {
     
    Left,
    Head,

  
  
  }
};
</script>

<style>
.td{
 
  float: left;
}
.table{
  margin: 0px;
  float: left;
}

.right{
  margin: 0px;
  padding: 0 0 0 0 ;
  float: center;
}

</style>