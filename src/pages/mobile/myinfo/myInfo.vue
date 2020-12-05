<template>
  <div>
    <div v-if="identity!='ROLE_Teacher'">
      <student></student>
    </div>
    <div v-else-if="duty=='学生教师'">
      <ts></ts>
    </div>
    <div v-else>
      <teacher></teacher>
    </div>
  </div>
</template>

<script>
import student from "./studentInfo.vue";
import teacher from "./teacherInfo.vue";
import ts from "./tsInfo.vue";
export default {
  components: { student, teacher, ts},
  data() {
    return {
      identity: "",
      duty:'',
    };
  },
  mounted() {
    this.identity = localStorage.getItem("authority");
    this.duty = localStorage.getItem("duty");
  }
};
</script>

<style lang="scss" scoped>
@import "myInfo";
</style>
<style scoped lang="scss">
</style>