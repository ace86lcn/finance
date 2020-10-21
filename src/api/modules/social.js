module.exports = {
    /* 
        缴纳社保人员列表：
            projectId:       项目id，
            corporationId:   参建单位id，
            teamId：         班组id，
            combinationName: 搜索字段
    */
    SocialPeopleList: {
        url: '/v1/social/page',
        methods: 'get'
    },
    /* 
        社保工人详情：
            socialId:       社保主键
    */
    SocialPeopleDetail: {
        url: '/v1/social/page-detail',
        methods: 'get'
    },
    /* 
        社保单记录：
            projectId:       项目id，
            beginTime:       开始时间，
            endTime:         结束时间，
            status:          缴纳状态 0：未到账，1：已实缴，2：缴纳失败，
            combinationName: 搜索字段
    */
    SocialRecordList: {
        url: '/v1/social/page-record',
        methods: 'get'
    },
    /* 
        社保单详情：
            socialRecordId:       
    */
    SocialRecordDetail: {
        url: '/v1/social/record',
        methods: 'get'
    },
    /* 
        关联工资单：
            payrollId:       
    */
    AssociatedPayroll: {
        url: '/v1/finance/associated_payroll',
        methods: 'get'
    }
}