// import vue from 'vue'
import Vuex from 'vuex'
vue.use(Vuex)

const state={
    studentname: "",
    academy: "",
    studentID: "",
    gender: "",
    status: 1,
    phone: "",
    email: "",
    grade: "",
    essaysrc:
      "",
    description:
      ""
}

const mutations={
    
}


export default new  Vuex.Store({
    state,
    mutations
})