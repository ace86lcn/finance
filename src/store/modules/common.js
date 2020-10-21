import request from '@/utils/request'
import api from '@/api'
import store from '../index'

const state = {
    moyunLogo: require('@/assets/images/logo.png'),                                     //平台主页logo
    moyunLogo2: require('@/assets/images/logo2.png'),                                   //平台主页logo
    moyunLogo3: require('@/assets/images/logo3.png'),                                   //平台主页logo
    platformName: '摩云劳务财务端',                                                      //平台名称
    adminAvatar: require('@/assets/images/default-header.png'),                         //默认用户头像
    defaultHeader: require('@/assets/images/icon-header.png'),                          //默认用户头像
    bgScreen: require('@/assets/images/login.jpg'),                                     //大背景图
    errorHeader: 'this.src="' + require('@/assets/images/icon-header.png') + '"',       //工人头像失败图
    CompanyPullDownList: [],                                                            //参建单位/甲方公司列表  
    serviceMobile: ''                                                                   //客服电话
}

const mutations = {
    setCompanyPullDownList(state, data) {
        state.CompanyPullDownList = data
    },
    setServiceMobile(state, data) {
        state.serviceMobile = data
    }
}

const actions = {
    // 获取公司列表
    getCompanyPullDownList({commit}, args) {
        request(api.pulldown.CompanyPullDown, {
            projectId: store.state.projectId
        })
        .then(res => {
            commit('setCompanyPullDownList', res)
        })
    },
    // 客服电话
    getServiceMobile({commit}, args) {
        request(api.common.ServiceMobile)
        .then(res => {
            commit('setServiceMobile', res.ytValue)
        })
    }
}

export default {
    state,
    mutations,
    actions
}