module.exports = {
    /* 
        工人工资单联想搜索：
            combinationName	   搜索条件
            projectId	       项目Id
    */
    SearchWorker: {
        url: '/v1/worker/combination',
        methods: 'get'
    },
    /* 
        服务费比例：
    */
    ServiceScale: {
        url: '/v1/rule/config-rate',
        methods: 'get'
    },
    /* 
        新增工资单：
            [{
                "projectId": 0,
                "workerId": 0,
                "provideTime": "str", //发放日期/月份
                "payAmount": "BigDecimal", //应发工资(元)
                paySocialSecurity   0 不缴纳 1缴纳
            }]
    */
    AddPayroll: {
        url: '/v1/finance/add',
        methods: 'post'
    },
    /* 
        确认工资单-立即提交：
            expectProvideTime	string	必须
            remark	string	非必须
    */
    CommitWaitpay: {
        url: '/v1/finance/commit-waitpay',
        methods: 'post'
    },
    /* 
        工资单提交支付：
            "type": 0, //0 按照批次支付  1 自定义选择工资单id支付 2全选支付
            "projectId": 0, // 项目id                 type = 2 使用
            "combinationName": "str",  //组合         type = 2 使用     
            "batchCode": "str", //批次code            type = 0 使用
            "payrollIdList": [
                "Long"
            ],                //工资单id list          type = 1 使用
            "payrollTotal": "BigDecimal",  //工资单金额 非必填
            "feeTotal": "BigDecimal",      //服务费金额 非必填
            "socialTotal": "BigDecimal",    //社保总金额 非必填
            "payTotalAmount": "BigDecimal",   //总金额 必填
            "payPassword": "str"         //支付密码 必填
    */
    ConfirmPay: {
        url: '/v1/finance/confirm-pay',
        methods: 'post'
    },
    /* 
        确认工资单/待支付/发放中/已完成：
            projectId	是	
            status	是	 状态(0 初始状态 1待支付 2发放中 3发放完成 4 发放失败(退款也包含再4内) 5退款 6 异议原因)
            combinationName	否	
    */
    PayrollList: {
        url: '/v1/finance/payroll',
        methods: 'get'
    },
    /* 
        列表统计数据：
            projectId	是	
            status	是	 状态(0 初始状态 1待支付 2发放中 3发放完成 4 发放失败 5退款 6 异议原因)
    */
    PayrollCount: {
        url: '/v1/finance/payroll-count',
        methods: 'get'
    },
}