<template>
  <div class="base">
    <Layout>
      <Header style="display:flex;background:#fff">
        
                
           
        <img src="@/common/img/libary.jpg" style="width:100%;height:100%" />
      </Header>
      <Layout style="width:92%;margin-left:4%;margin-bottom:30px">
        <Layout style="height:65px;">
          <div style="margin-top:20px;margin-bottom:10px;">
            <Icon type="md-pin" color="#245086" size="25" />
            <span
              style="font-size:17px;font-weight:bold;color='#245086';"
            >上海大学写作中心 &nbsp;> &nbsp;科教基地</span>
          </div>
        </Layout>
        <Layout>
          <Sider hide-trigger style="background:#f5f7f9">
            <div id="erection2">
             
              <div style="height:50px;background:#245086">
                <span style="font-size:20px;color:#fff;margin-left:30px;position:relative;top:10px">
                  快速导航
                  <Icon type="ios-arrow-forward" style="margin-left:56px" />
                </span>
              </div>
              
              <Menu :active-name="activeName" @on-select="push" width="150">
                <MenuGroup title="伟长专题" name="weichang">
                  <MenuItem
                    name="wintroduction"
                    style="margin-top:15px;border-top-style:solid; 
        border-color:white;
        border-width:1px;"
                  >
                    <Icon type="ios-body-outline" class="icons" />
                    <span>人物介绍</span>
                  </MenuItem>
                  <MenuItem name="masters">
                    <Icon type="ios-brush" class="icons" />
                    <span>大家风范</span>
                  </MenuItem>
                  <MenuItem name="essences">
                    <Icon type="md-bookmarks" class="icons" />
                    <span>学术精粹</span>
                  </MenuItem>
                  <MenuItem name="wbooks">
                    <Icon type="ios-bookmarks-outline" class="icons" />
                    <span>相关图书</span>
                  </MenuItem>
                </MenuGroup>
                <MenuGroup title="匡迪专题" name="kuangdi">
                  <MenuItem
                    name="kintroduction"
                    style="margin-top:20px;border-top-style:solid; 
        border-color:white;
        border-width:1px;"
                  >
                    <Icon type="ios-body-outline" class="icons" />
                    <span>人物介绍</span>
                  </MenuItem>
                  <MenuItem name="collection">
                    <Icon type="ios-briefcase" class="icons" />
                    <span>捐赠藏品</span>
                  </MenuItem>
                  <MenuItem name="kbooks">
                    <Icon type="ios-bookmarks-outline" class="icons" />
                    <span>相关图书</span>
                  </MenuItem>
                </MenuGroup>
              </Menu>
              <div style="margin-left:20%;margin-top:20%">
                 <img src="@/common/images/sciencelogo.png" style="width:80%;height:100%" />
              </div>
            </div>
          </Sider>
          <Content>
              <router-view></router-view>
          </Content>
       
       
       
       </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: 0,
      activeName: "",
    };
  },
  methods: {
    push(name) {console.log(name)
      this.$router.push(name);
      
    },
    initMenuActive() {
      this.activeName = this.$route.name;
    
    },
  },
  watch:{
      $route() {
      this.$nextTick(() => {
        this.initMenuActive();
      });
    }
  },
  mounted(){
      this.initMenuActive();
  }
};
</script>

<style lang="scss">
@import "navigation";
</style>

<style lang="scss">
.base {
  .ivu-layout-header {
    height: 200px;
    padding: 0px;
  }
}
</style>