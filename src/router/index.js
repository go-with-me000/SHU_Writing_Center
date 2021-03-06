import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/group/login/login.vue'

Vue.use(Router)
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
const path =  window.innerWidth<=500?'mobile':'user';
var router = new Router({
  // mode: 'history',
  
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: {path:`${path}`}
    }, {
      path: '/logout',
      name: 'logout',
      beforeEnter(to, from, next) {
        localStorage.clear();
        next({name: 'login'})
      }
    },
    {
      path: '/mobilelogin',
      name: 'mobilelogin',
      component:resolve => require(['@/group/login/loginMobile'], resolve),
    },
    {
      path: '/login',
      name: 'login',
      component:resolve => require(['@/group/login/login'], resolve),
    },{
      path:'/mobile',
      name:'mobile',
      component:resolve => require(['@/group/user/mobile'], resolve),
      redirect: {path:'mobile/login'},
      children:[
        {
          path:'login',
          name:'login',
          component:resolve=>require(['@/pages/mobile/login/mobilelogin.vue'],resolve)
        },
        {
          path:'homepage',
          name:'homepage',
          component:resolve => require(['@/pages/mobile/homepage/homepage.vue'], resolve),
        },{
          path: 'base',
          name: 'base',
          component: resolve => require(['@/pages/user/base/navigation.vue'], resolve),
          redirect: {path:'base/wintroduction'},
          children: [{
              path: 'wintroduction',
              name: 'wintroduction',
              component: resolve => require(['@/pages/user/base/introductions/introduction1.vue'], resolve),
            },{
              path: 'kintroduction',
              name: 'kintroduction',
              component: resolve => require(['@/pages/user/base/introductions/introduction2.vue'], resolve),
            },{
              path: 'masters',
              name: 'masters',
              component: resolve => require(['@/pages/user/base/masters/masters.vue'], resolve),
            },
            {
              path: 'wbooks',
              name: 'wbooks',
              component: resolve => require(['@/pages/user/base/books/books1.vue'], resolve),
            },{
              path: 'kbooks',
              name: 'kbooks',
              component: resolve => require(['@/pages/user/base/books/books2.vue'], resolve),
            },{
              path: 'essences',
              name: 'essences',
              component: resolve => require(['@/pages/user/base/essences/essences.vue'], resolve),
            },{
              path: 'collection',
              name: 'collection',
              component: resolve => require(['@/pages/user/base/collection/collection.vue'], resolve),
            },
    
    
          ]
        },{
          path:'mobilePrecontract',
          name:'mobilePrecontract',
          component:resolve => require(['@/pages/mobile/precontract/precontract.vue'], resolve),
        },
        {
          path:'mobilePrecontract2',
          name:'mobilePrecontract2',
          component:resolve => require(['@/pages/mobile/precontract2/precontract.vue'], resolve),
        },{
          path:'mobileMyPrecontract',
          name:'mobileMyPrecontract',
          component:resolve => require(['@/pages/mobile/myPrecontract/myPrecontract.vue'], resolve),
        },{
          path:'mobileMyInfo',
          name:'mobileMyInfo',
          component:resolve => require(['@/pages/mobile/myInfo/myInfo.vue'], resolve),
        },{
          path:'mobileNewsFront',
          name:'mobileNewsFront',
          component:resolve => require(['@/pages/mobile/newsPage/newsFront.vue'], resolve),
        },{
          path:'mobileNewsPage',
          name:'mobileNewsPage',
          component:resolve => require(['@/pages/mobile/newsPage/newsPage.vue'], resolve),
        },
      ],
      // meta: {
      //   requiresAuth: true
      // }
    }, {
      path:'/user',
      name:'user',
      component:resolve => require(['@/group/user/user'], resolve),
      redirect: {path:'user/login'},
      children:[
        {
          path:'login',
          name:'login',
          component:resolve=>require(['@/pages/user/login/choose.vue'],resolve)
        },
        {
          path:'homepage',
          name:'homepage',
          component:resolve => require(['@/pages/user/homepage/choose.vue'], resolve),
        },{
          path:'precontract',
          name:'precontract',
          component:resolve => require(['@/pages/user/precontract/precontract.vue'], resolve),
        },{
          path:'precontract2',
          name:'precontract2',
          component:resolve => require(['@/pages/user/precontract2/precontract.vue'], resolve),
        },{
          path:'myPrecontract',
          name:'myPrecontract',
          component:resolve => require(['@/pages/user/myPrecontract/myPrecontract.vue'], resolve),
        },{
          path:'myInfo',
          name:'myInfo',
          component:resolve => require(['@/pages/user/myInfo/myInfo.vue'], resolve),
        }, {
          path: 'base',
          name: 'base',
          component: resolve => require(['@/pages/user/base/navigation.vue'], resolve),
          redirect: {path:'base/wintroduction'},
          children: [{
              path: 'wintroduction',
              name: 'wintroduction',
              component: resolve => require(['@/pages/user/base/introductions/introduction1.vue'], resolve),
            },{
              path: 'kintroduction',
              name: 'kintroduction',
              component: resolve => require(['@/pages/user/base/introductions/introduction2.vue'], resolve),
            },{
              path: 'masters',
              name: 'masters',
              component: resolve => require(['@/pages/user/base/masters/masters.vue'], resolve),
            },
            {
              path: 'wbooks',
              name: 'wbooks',
              component: resolve => require(['@/pages/user/base/books/books1.vue'], resolve),
            },{
              path: 'kbooks',
              name: 'kbooks',
              component: resolve => require(['@/pages/user/base/books/books2.vue'], resolve),
            },{
              path: 'essences',
              name: 'essences',
              component: resolve => require(['@/pages/user/base/essences/essences.vue'], resolve),
            },{
              path: 'collection',
              name: 'collection',
              component: resolve => require(['@/pages/user/base/collection/collection.vue'], resolve),
            },
    
    
          ]
        },{
          path:'newsFront',
          name:'newsFront',
          component:resolve => require(['@/pages/user/news/newsFront.vue'], resolve),
        },{
          path:'newsPage',
          name:'newsPage',
          component:resolve => require(['@/pages/user/news/newsPage.vue'], resolve),
        },
      ],
      // meta: {
      //   requiresAuth: true
      // }
    },{
      path: '/manager',
      name: 'manager',
      component:resolve => require(['@/components/common/Total.vue'], resolve),
      children: [{
          path: 'appointmentPic',
          name: 'appointmentPic',
          component:resolve => require(['@/components/appointment/appointmentPic.vue'], resolve),
        },

        {
          path: 'appointmentTotal',
          name: 'appointmentTotal',
          component:resolve => require(['@/components/appointment/appointmentTotal.vue'], resolve),
        },
        {
          path: 'Essay',
          name: 'Essay',
          component:resolve => require(['@/components/essay/essay.vue'], resolve),
        },
        {
          path: 'PicUpload',
          name: 'PicUpload',
          component:resolve => require(['@/components/newsUpload/newsUpload.vue'], resolve),
        },

        {
          path: 'newsPage',
          name: 'newsPage',
          component:resolve => require(['@/components/newsUpload/newsPage.vue'], resolve),
   },

        {
          path: 'preView',
          name: 'preView',
          component:resolve => require(['@/components/newsUpload/preView.vue'], resolve),
        },

        {
          path: 'newsManager',
          name: 'newsManager',
          component:resolve => require(['@/components/newsUpload/newsManager.vue'], resolve),
    },

        {
          path: 'Teacher',
          name: 'Teacher',
          component:resolve => require(['@/components/user/Manager-Teachers.vue'], resolve),
        },
        {
          path: 'User',
          name: 'User',
          component:resolve => require(['@/components/user/Manager-User.vue'], resolve),
        },
        {
          path: 'Manager',
          name: 'Manager',
          component:resolve => require(['@/components/user/Manager-Manager.vue'], resolve),
        },
 
      ]
    },
  ]
})




export default router