import request from '@/utils/request'
import api from '@/api'

const state = {
    projectId: '',              //项目id
    allProjectList: [],         //全部的项目列表，下拉选项用到
}

const mutations = {
    setProjectId(state, id) {
        state.projectId = id
    },
    setProjectList(state, list) {
        state.allProjectList = list
    }
}

const actions = {
    setAllProject({commit}, args) {
        request(api.project.GetProjectListAll)
        .then(res => {
            commit('setProjectList', res)
        })
    }
}

export default {
    state,
    mutations,
    actions
}