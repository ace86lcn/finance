module.exports = {
    /* 
        账号登录：
            account: 登录账号，
            password: 登录密码
        手机号登录：
            phone: 手机号，
            vCode: 验证码
    */
    Login: {
        url: '/login',
        methods: 'post'
    },
    /* 
        注销登录：
    */
    LogOut: {
        url: '/logout',
        methods: 'get'
    }
}