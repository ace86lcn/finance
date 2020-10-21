module.exports = {
    /* 
        待签署/待修改/已签署 列表：
            status:             合同状态 0：待签署 1：已生效 2：已作废 3：修改中,
            projectId:          项目id，
            corporationId:      甲方公司，
            combinationName:    手机号/姓名/身份证,
    */
    ContractList: {
        url: '/v1/contract/page',
        methods: 'get'
    },
    /* 
        新增合同：
            type:                 0：线上 1：线下,
            projectId:            项目id，
            corporationId:        公司id,
            workerId:             工人id,
            teamId:               班组id,
            positionLevelOne:     一级职位id,
            positionLevelTwo:     二级职位id,
            probationSalary:      试用期薪资,
            probationStartTime:   试用期开始时间,
            probationEndTime:     试用期结束时间,
            officialSalary:       正式薪资,
            appointmentStartTime: 任用开始时间,
            appointmentEndTime:   任用结束时间,
            settlementType:       薪资结算方式(0 日结 1 月结 ),
            paySocialSecurity:    是否缴纳社保(0不缴纳 1 缴纳),
            contractAddress:      合同图片地址 （储存的是code）
    */
    AddContract: {
        url: '/v1/contract/add',
        methods: 'post'
    },
    /* 
        编辑合同：
            。。。
    */
    EditContract: {
        url: '/v1/contract/add',
        methods: 'post'
    },
    /* 
        合同详情：
            contractId
    */
    ContractDetail: {
        url: '/v1/contract/detail',
        methods: 'get'
    },
    /* 
        合同作废：
            contractId
    */
    CancelledContract: {
        url: '/v1/contract/invalid',
        methods: 'get'
    },
    /* 
        合同预览：
            "projectId": 76, //项目id
            "corporationId": 34, //公司id
            "workerId": 15, //工人id
            "teamId": 206, //班组id
            "positionLevelOne": 62, // 一级职位id
            "positionLevelTwo": 76, //二级职位id
            "probationSalary": "100.00", //试用期薪资
            "probationStartTime": 1599807734938, //试用期开始时间
            "probationEndTime": 1599807734938, //试用期结束时间
            "officialSalary": "120.00", //正式薪资
            "appointmentStartTime": 1599807734938, //任用开始时间
            "appointmentEndTime": 1599807734938, // 任用结束时间
            "settlementType": 0, //薪资结算方式(0 日结 1 月结 )
            "paySocialSecurity": 0 //是否缴纳社保(0不缴纳 1 缴纳)
    */
    PreviewContract: {
        url: '/v1/contract/preview',
        methods: 'post'
    },
    /* 
        获取合同地址-合同预览  待签署，待修改，已签署：
            contractId
    */
    PreviewDetailContract: {
        url: '/v1/contract/preview-dtl',
        methods: 'get'
    },
    /* 
        一级职位：
    */
    JobLevelOne: {
        url: '/v1/class-one-pull-down',
        methods: 'get'
    },
    /* 
        二级职位：
            levelOneId
    */
    JobLevelTwo: {
        url: '/v1/class-two-pull-down',
        methods: 'get'
    },
}