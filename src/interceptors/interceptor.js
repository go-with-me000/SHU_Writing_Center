import axios from 'axios'
import Router from '@/router'
import context from '@/main.js'
axios.interceptors.request.use((config) => {
  config.credentials = true;
  axios.credentials = true;
  return config;
}, (error) => {

  if (error.response) {
    switch (error.response.status) {
      case 405:
        localStorage.clear()
        const path =  window.innerWidth<=500?'mobile':'user';
        Router.replace(`/${path}/login`);
        setTimeout(() => {
          context.$Notice.error({
            title: "您没有访问权限",
            desc: "您没有访问该页面的权限，或许是您的用户身份与该页面不一致，也可能是您没有登录，请重新登录，系统会自动跳转到相应页面。",
            duration: 5
          })
        }, 500)
        break;
    }
  }
  return Promise.reject(error)
})

axios.interceptors.response.use((res) => {

  return res;


}, (error) => {
  if (error.response) {

    switch (error.response.status) {
      case 405:
        localStorage.clear()
        const path =  window.innerWidth<=500?'mobile':'user';
        Router.replace(`/${path}/login`);
        setTimeout(() => {
          context.$Notice.error({
            title: "您没有访问权限",
            desc: "您没有访问该页面的权限,请先登录",
            duration: 5
          })


        }, 500)
        break;

    }
  }
  return Promise.reject(error);
})
