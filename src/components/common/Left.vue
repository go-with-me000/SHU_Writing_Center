<template>
  <div class="template">
    <Menu class="frameMenu" @on-select="routeTo" accordion>
      <div class="logo">
        <div class="logoText">欢迎管理员：<span>{{this.userID}}</span></div>
      </div>
      <div v-for="(menu,menu_index) in menus" :key="menu_index">
        <div class="menu">
          <ul>
            <li>
              <Submenu :name="menu.name" v-if="menu.children" :key="menu_index">
                <template slot="title">
                  <div>
                    <i :class="menu.logo" />
                    {{menu.title}}
                  </div>
                </template>
                <dl>
                  <dt>
                    <Menu-item
                      :name="child.href"
                      v-for="(child,child_index) in menu.children"
                      class="item"
                      :key="child_index"
                    >{{child.title}}</Menu-item>
                  </dt>
                </dl>
              </Submenu>
            </li>
          </ul>
        </div>
      </div>
    </Menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userID:localStorage.getItem("userID"),
      menus: [
        {
          title: "用户",
          name: "UserManager",
          logo: "iconfont icon-guanliyuan left",
          children: [
            {
              title: "教师",
              name: "teacherManager",
              href: "Teacher",
              choosed: true
            },
            {
              title: "用户",
              name: "student",
              href: "User",
              choosed: false
            },

            {
              title: "管理员",
              name: "monitor",
              href: "Manager",
              choosed: false
            }
          ]
        },
        {
          title: "预约",
          name: "appoinment",
          logo: "iconfont icon-yuyue left",
          children: [
            {
              title: "预约情况",
              name: "appointMent",
              href: "appointmentTotal",
              choosed: false
            },
            {
              title: "预约图示",
              name: "appointPic",
              href: "appointmentPic",
              choosed: false
            }
          ]
        },
        {
          title: "论文",
          name: "essay",
          logo: "iconfont icon-lunwenhuibian left",
          children: [
            {
              title: "查看论文",
              name: "viewEssay",
              href: "Essay",
              choosed: false
            }
          ]
        },
        {
          title: "新闻",
          name: "News",
          logo: "iconfont icon-news left",
          children: [
            {
              title: "文章管理",
              name: "newsManager",
              href: "newsManager",
              choosed: false
            },

            {
              title: "材料上传",
              name: "PicUpload",
              href: "PicUpload",
              choosed: false
            },
            {
              title: "新闻页面",
              name: "newsPage",
              href: "newsPage",
              choosed: false
            }
          ]
        }
      ]
    };
  },
  methods: {
    routeTo(name) {
      this.$router.push(name);
    }
  }
};
</script>
<style lang="scss" scope="">
.frameMenu {
  background: #343957;

  width: 10%;
  height: 860px;
  min-width: 100;
  ul {
    padding: 0px;
    margin: 0px;
  }
  .menu {
    overflow-x: auto;
    overflow-y: hidden;
    dl dt {
      display: block;
      width: 100%;
      box-sizing: border-box;
      -moz-box-sizing: border-box; /* Firefox */
      -webkit-box-sizing: border-box; /* Safari */
      .item:hover {
        background-color: #53545a !important;
        //color: rgb(164, 163, 168);
      }
    }
    ul li {
      width: 237px;
      font-size: 17px;
      color: white;
      a i.left {
        color: #8d9a9c;
        margin-right: 0px;
        font-size: 18px;
        padding: 0 0px 0 0;
      }
      a:hover {
        background-color: #474c5c !important;
        color: rgb(109, 108, 173);
      }
    }
  }

  .logo {
    float: center;
    width: 100%;
    height: 5%;
    padding: 5% 0px;
    overflow: hidden;
    border-bottom: 1px solid #e3eaeb;
    box-sizing: border-box;
    -moz-box-sizing: border-box; /* Firefox */
    -webkit-box-sizing: border-box; /* Safari */
    .logoText {
      height: 100%;

      text-align: center;
      color: #fff;
    }
  }
}
</style>