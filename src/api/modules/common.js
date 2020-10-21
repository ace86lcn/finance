module.exports = {
    /* 
        发送验证码：   
            phone： 手机号，       
            type：  1=登录 验证码  2=密码找回 验证码  3=支付设置密码 验证码  4=支付密码找回 验证码
    */
    SendCode: {
        url: '/send-sms',
        methods: 'get'
    },
    /* 
        验证找回密码的验证码(登录密码和支付密码)：
            phone: 手机号，
            code: 验证码
    */
    CheckForgetCode: {
        url: '/check-code',
        methods: 'get'
    },
    /* 
        找回密码保存：     
            phone:         手机号，需CryptoJS加密，             
            newPassword:   修改后的密码，  
            type：         1 忘记密码之保存新密码  2忘记支付密码之保存新支付密码
    */
    FindPwd: {      
        url: '/save-pwd',
        methods: 'post'
    },
    /* 
        修改密码：  
            password:       旧密码，
            newPassword:    新密码，        
            type：          1 修改密码 2修改支付密码
    */
    EditPwd: {
        url: '/edit-pwd',
        methods: 'post'
    },
    /*
        校验旧密码是否正确：   
            password：  旧密码，
            type：      1 登录密码 2支付密码 
     */
    CheckOldPwd: {
        url: '/check-pwd',
        methods: 'get'
    },
    /* 
        工人列表/合同待拟定：
            type：              为空时 工人列表， 不为空时 合同待拟定列表，
            projectId：         项目id，
            corporationId：     参建单位id，
            teamId：            班组id，
            combinationName：   手机号/姓名/身份证，
            pageNum：           分页，              (列表通用)
            pageSize：          每页数量            (列表通用)
    */
    WorkerAndWaitProtocol:  {
        url: '/v1/worker/page',
        methods: 'get'
    },
    /*
        获取客服电话：   
     */
    ServiceMobile: {
        url: '/v1/rule/config-phone',
        methods: 'get'
    },
    /*
        code获取图片url：   
            downCode:
            sourceCode:         KODO-FINANCE
            instanceId:         88
            validity:           60
     */
    CodeToUrl: {
        url: '/v1/kodo/obtain-url',
        methods: 'get'
    },
}