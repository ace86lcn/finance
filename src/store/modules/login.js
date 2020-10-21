import message from '@/utils/validate'
import request from '@/utils/request'
import api from '@/api'

const state = {
    tokenName: 'finance-session-id',                               //令牌名
    token: '',                                                     //token
    companyName: 'companyName',                                    //账号所属公司名称
    adminName: 'adminName',                                        //当前操作用户姓名
    adminMobile: '',                                               //当前操作用户手机号
    adminCount: '',                                                //登录账号
    //corpCode: ''                                                   //企业统一社会信用代码
}

const mutations = {
    setToken(state, token) {
        state.token = token
    },
    setLoginMsg(state, data) {
        state.companyName = data.companyName
        state.adminName = data.name
        state.adminMobile = data.phone
        state.adminCount = data.account
        // state.corpCode = data
    }
}

const actions = {
    // 注销登录
    logOut({commit}, args) {
        message.MsgBox('确认退出登录？')
        .then(() => {
            // request(api.login.LogOut)
            // .then(res => {
                commit('setToken', '')
                setTimeout(_ => window.location.reload(), 200)
            // })
        })
    }
}

export default {
    state,
    mutations,
    actions
}