module.exports = {
    /* 
        参建单位/甲方公司下拉：
            projectId:      项目id
    */
    CompanyPullDown: {
        url: '/v1/company-pull-down',
        methods: 'get'
    },
    /* 
        班组下拉：
            projectId:      项目id，
            corpCode:       企业统一社会信用代码
    */
    TeamPullDown: {
        url: '/v1/team-pull-down',
        methods: 'get'
    },
    /* 
        一级职位下拉：
    */
    ClassOnePullDown: {
        url: '/v1/class-one-pull-down',
        methods: 'get'
    },
    /* 
        二级职位下拉：
            levelOneId:      一级职位id
    */
    ClassTwoPullDown: {
        url: '/v1/class-two-pull-down',
        methods: 'get'
    },
    /* 
        参建单位/甲方公司列表：
            levelOneId:      一级职位id
    */
}