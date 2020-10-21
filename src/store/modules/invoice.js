const state = {
    invoiceCheckAll: ''              //全选开票信息
}

const mutations = {
    setInvoiceCheckAll(state, data) {
        state.invoiceCheckAll = data
    }
}

export default {
    state,
    mutations
}