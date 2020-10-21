import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'  //vuex持久化解决
import common from './modules/common'       //公共模块 
import login from './modules/login'         //登录模块
import project from './modules/project'     //项目模块
import invoice from './modules/invoice'     //发票模块
import account from './modules/account'     //发票模块
import payroll from './modules/payroll'     //工资单模块

Vue.use(Vuex)

const state = {
    ...common.state,
    ...login.state,
    ...project.state,
    ...invoice.state,
    ...account.state,
    ...payroll.state
}   

const mutations = {
    ...login.mutations,
    ...project.mutations,
    ...common.mutations,
    ...invoice.mutations,
    ...account.mutations,
    ...payroll.mutations
}

const actions = {
    ...login.actions,
    ...project.actions,
    ...common.actions
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    plugins:[
        new VuexPersistence({
            reducer: state => ({
                //这个就是存入localStorage的值
                token:               state.token,
                companyName:         state.companyName, 
                adminName:           state.adminName,
                adminCount:          state.adminCount,
                adminMobile:         state.adminMobile,
                projectId:           state.projectId,
                allProjectList:      state.allProjectList,
                CompanyPullDownList: state.CompanyPullDownList,
                invoiceCheckAll:     state.invoiceCheckAll,
                rechargeData:        state.rechargeData,
                addPayrollData:      state.addPayrollData,
                currentPayrollItem:  state.currentPayrollItem
            })
        }).plugin
    ]
})