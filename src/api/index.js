import * as common from './modules/common'
import * as login from './modules/login'
import * as account from './modules/account'
import * as invoice from './modules/invoice'
import * as project from './modules/project'
import * as worker from './modules/worker'
import * as contract from './modules/contract'
import * as pulldown from './modules/pulldown'
import * as attendance from './modules/attendance'
import * as social from './modules/social'
import * as rule from './modules/rule'
import * as payroll from './modules/payroll'

/* 
*    接口方法名: {
*        url: '接口路由',
*        methods: '请求方法 get/post'
*    }
*    用法：this.$http(接口方法名, params:没有为{}（可不传，默认参数为{}）,res=> {}成功回调) 
*/
export default {
    common,     //通用模块
    login,      //登录模块
    account,    //账号模块，保证金
    invoice,    //发票模块
    project,    //项目模块
    worker,     //工人模块
    contract,   //合同模块
    pulldown,   //下拉选项
    attendance, //考勤模块
    social,     //社保模块
    rule,       //规则设置
    payroll,    //工资单
}