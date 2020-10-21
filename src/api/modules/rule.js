module.exports = {
    /* 
        规则查询：
            projectId:       项目id
    */
    GetRules: {
        url: '/v1/rule/list',
        methods: 'get'
    },
    /* 
        获取社保金额：
            province:       省
            city:           市
    */
    GetSocial: {
        url: '/v1/rule/social',
        methods: 'get'
    },
    /* 
        获取个税税点：
            province:       省
            city:           市
    */
    GetTax: {
        url: '/v1/rule/tax',
        methods: 'get'
    },
    /* 
        编辑规则：
            province:       省
            city:           市
    */
    RuleEdit: {
        url: '/v1/rule/edit',
        methods: 'post'
    },
    /* 
        获取社保地区：
            province:       一级地区，获取二级需传
    */
    SocialCascade: {
        url: '/v1/rule/social-cascade',
        methods: 'get'
    },
    /* 
        获取个税地区：
            province:       一级地区，获取二级需传
    */
    TaxCascade: {
        url: '/v1/rule/tax-cascade',
        methods: 'get'
    },
}