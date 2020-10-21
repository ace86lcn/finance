const state = {
    rechargeData: {},                               //充值信息
}

const mutations = {
    setRechargeData(state, data) {
        state.rechargeData = data
    }
}

export default {
    state,
    mutations
}