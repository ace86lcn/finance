module.exports = {
    /* 
        获取项目列表（带分页，筛选）:
            projectStatus:      项目状态
            category:           项目分类
            name:               搜索项
            pageNum:                
            pageSize:
    */
    GetProjectList:  {
        url: '/v1/project/page',
        methods: 'get'
    },
    /* 
        获取全部项目列表:
    */
    GetProjectListAll:  {
        url: '/v1/project/pull-down',
        methods: 'get'
    },
}