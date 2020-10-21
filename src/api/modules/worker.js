module.exports = {
    /* 
        工人详情：
            cardNum:    身份证号,
            projectId:  项目id
    */
    WorkerDetail: {
        url: '/v1/worker/dtl',
        methods: 'get'
    },
    /* 
        查询工人：
            projectId：      项目id，
            combinationName: 姓名/身份证
    */
    SearchWorker: {
        url: '/v1/worker/combination',
        methods: 'get'
    }
}