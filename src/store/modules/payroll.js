const state = {
    addPayrollData: '',              //新增工资单信息
    currentPayrollItem: {}           //需要查看详情的工资单item
}

const mutations = {
    setPayrollData(state, data) {   //新增工资单需保存信息，确认后需清空
        state.addPayrollData = data
    },
    setCurrentPayrollItem(state, data) {
        state.currentPayrollItem = data
    }
}

export default {
    state,
    mutations
}