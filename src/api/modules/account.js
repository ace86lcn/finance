module.exports = {
    /* 
        判断支付密码是否设置：
    */
    PayIsSet: {
        url: '/judge-pwd',
        methods: 'get'
    },
    /* 
        获取保证金账单明细：     
            dealType:         交易类型， 1 充值 2消费 3退款            
            dealDtlType:      交易明细，  
            beginTime:        开始时间，
            endTime：         结束时间，
            combinationCode： 搜索字段
    */
    BillDetailList: {
        url: '/v1/finance/finance-record-page',
        methods: 'get'
    },
    /* 
        充值：
            amount:    充值金额
    */
    Recharge: {
        url: '/v1/finance/recharge',
        methods: 'post'
    },
    /* 
        获取余额：
    */
    GetBalance: {
        url: '/v1/finance/balance',
        methods: 'get'
    },
}