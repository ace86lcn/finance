// 内部模块路由
import Home from '@/views/Inside/Home'

/**
 * leaf:                一个节点需要设置true，可不设置
 * hidden:              不在侧边栏 显示 meta里还有一个hidden
 * noLogin：            不需要登录
 * type:                inside
 * defaulNeedrefresh:   需要更新meta里的defaultActive
 * defaultActive
 */
const Inside = [
    {
        path: '/',
        component: Home,
        name: '首页',                            //一个节点不需要填写
        iconCls: 'iconfont iconbussiness-card',  //图标样式class
        leaf: true,                              //只有一个节点,多节点可不添加
        meta: { type: 'inside' },
        children:[
          { path: '/worker-management/index', name: '工人管理', meta: { title: '工人管理' }, component: () => import('@/views/Inside/WorkerManagement/Index') },
          { path: '/worker-management/detail/:cardNum', name: '工人详情', meta: { title: '工人详情', hidden: true, defaultActive: '/worker-management/index' }, component: () => import('@/views/Inside/WorkerManagement/Detail') }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '合同管理',    
        iconCls: 'iconfont iconhetong',
        meta: { type: 'inside' },
        children:[
            { path: '/contract-management/wait-protocol', name: '合同待拟定', meta: { title: '合同待拟定' }, component: () => import('@/views/Inside/ContractManagement/WaitProtocol') },
            { path: '/contract-management/choose-contract/:cardNumber', name: '拟定合同', meta: { title: '拟定合同', hidden: true, defaultActive: '/contract-management/wait-protocol' }, component: () => import('@/views/Inside/ContractManagement/ChooseContract') },
            { path: '/contract-management/sign-contract', name: '线上签约', meta: { title: '线上签约', hidden: true }, component: () => import('@/views/Inside/ContractManagement/SignContract') },
            { path: '/contract-management/offline-contract', name: '线下签约', meta: { title: '线下签约', hidden: true }, component: () => import('@/views/Inside/ContractManagement/OfflineContract') },
            { path: '/contract-management/wait-sign', name: '合同待签署', meta: { title: '合同待签署' }, component: () => import('@/views/Inside/ContractManagement/WaitSign') },
            { path: '/contract-management/wait-change', name: '合同待修改', meta: { title: '合同待修改' }, component: () => import('@/views/Inside/ContractManagement/WaitChange') },
            { path: '/contract-management/signed', name: '合同已签署', meta: { title: '合同已签署' }, component: () => import('@/views/Inside/ContractManagement/Signed') },
            { path: '/contract-management/contract-detail/:id', name: '合同详情', meta: { title: '合同详情', hidden: true, defaulNeedrefresh: true }, component: () => import('@/views/Inside/ContractManagement/ContractDetail') },
            { path: '/contract-management/cancelled', name: '合同作废成功', meta: { title: '合同作废成功', hidden: true, defaultActive: '/contract-management/signed' }, component: () => import('@/views/Inside/ContractManagement/Cancelled') }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '考勤管理',    
        iconCls: 'iconfont iconqunzu',
        meta: { type: 'inside' },
        children:[
            { path: '/attendance-management/daily-hours', name: '每日工时', meta: { title: '每日工时' }, component: () => import('@/views/Inside/AttendanceManagement/DailyHours') },
            { path: '/attendance-management/attendance-query', name: '考勤查询', meta: { title: '考勤查询' }, component: () => import('@/views/Inside/AttendanceManagement/AttendanceQuery') },
            { path: '/attendance-management/manhour-detail/:id', name: '工时详情', meta: { title: '工时详情', hidden: true, defaultActive: '/attendance-management/daily-hours' }, component: () => import('@/views/Inside/AttendanceManagement/ManhourDetail') }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '工资单管理',    
        iconCls: 'iconfont iconweb-icon-',
        meta: { type: 'inside' },
        children:[
            { path: '/payroll-management/add-new', name: '新增工资单', meta: { title: '新增工资单' }, component: () => import('@/views/Inside/PayrollManagement/AddNew') },
            { path: '/payroll-management/wait-pay', name: '待支付工资单', meta: { title: '待支付工资单' }, component: () => import('@/views/Inside/PayrollManagement/WaitPay') },
            { path: '/payroll-management/give-out', name: '发放中工资单', meta: { title: '发放中工资单' }, component: () => import('@/views/Inside/PayrollManagement/GiveOut') },
            { path: '/payroll-management/finished', name: '已完成工资单', meta: { title: '已完成工资单' }, component: () => import('@/views/Inside/PayrollManagement/Finished') },
            { path: '/payroll-management/error', name: '发放失败工资单', meta: { title: '发放失败工资单' }, component: () => import('@/views/Inside/PayrollManagement/Error') },
            { path: '/payroll-management/objection', name: '有异议工资单', meta: { title: '有异议工资单' }, component: () => import('@/views/Inside/PayrollManagement/Objection') },
            { path: '/payroll-management/confirm-payroll', name: '确认工资单', meta: { title: '确认工资单', hidden: true, defaultActive: '/payroll-management/add-new' }, component: () => import('@/views/Inside/PayrollManagement/ConfirmPayroll') },
            { path: '/payroll-management/payroll-detail/:id', name: '工资单详情', meta: { title: '工资单详情', hidden: true, defaulNeedrefresh: true }, component: () => import('@/views/Inside/PayrollManagement/PayrollDetail') },
            { path: '/payroll-management/cashier-desk/index', name: '收银台', meta: { title: '收银台', hidden: true, defaultActive: '/payroll-management/wait-pay' }, component: () => import('@/views/Inside/PayrollManagement/CashierDesk/Index') },
            { path: '/payroll-management/cashier-desk/success', name: '支付成功', meta: { title: '支付成功', hidden: true, defaultActive: '/payroll-management/wait-pay' }, component: () => import('@/views/Inside/PayrollManagement/CashierDesk/PaySuccess') },
            { path: '/payroll-management/cashier-desk/recharge', name: '充值', meta: { title: '充值', hidden: true, defaultActive: '/payroll-management/wait-pay' }, component: () => import('@/views/Inside/PayrollManagement/CashierDesk/Recharge') }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '社保单管理',    
        iconCls: 'iconfont iconzhengzhouyinhangAPPtubiaodiergaolunkuohuachunse-46',
        meta: { type: 'inside' },
        children:[
            { path: '/social-management/work-list', name: '缴纳社保人员', meta: { title: '缴纳社保人员' }, component: () => import('@/views/Inside/SocialManagement/WorkerList') },
            { path: '/social-management/worker-detail/:id', name: '工人详情', meta: { title: '工人详情', hidden: true, defaultActive: '/social-management/work-list' }, component: () => import('@/views/Inside/SocialManagement/WorkerDetail') },
            { path: '/social-management/social-list', name: '社保单记录', meta: { title: '社保单记录' }, component: () => import('@/views/Inside/SocialManagement/SocialList') },
            { path: '/social-management/social-detail/:id', name: '社保单详情', meta: { title: '社保单详情', hidden: true, defaultActive: '/social-management/social-list' }, component: () => import('@/views/Inside/SocialManagement/SocialDetail') }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '首页',                           //一个节点不需要填写
        iconCls: 'iconfont icon552cc1fc7c4c5',  //图标样式class
        leaf: true,                             //只有一个节点,多节点可不添加
        meta: { type: 'inside' },
        children:[
          { path: '/rule/index', name: '规则设置', meta: { title: '规则设置' }, component: () => import('@/views/Inside/Rule/Index') }
        ]
    }
]

export default Inside