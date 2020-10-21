// 外部模块路由
import Home from '@/views/Out/Home'

/**
 * hidden:              不在侧边栏 显示 meta里还有一个hidden
 * noLogin：            不需要登录
 * type:                inside
 * defaulNeedrefresh:   需要更新meta里的defaultActive
 * defaultActive
 */
const Out = [
    {
      path: '/',
      component: Home,
      name: '首页',                            //一个节点不需要填写
      iconCls: 'iconfont iconViewGallery',    //图标样式class
      leaf: true,                             //只有一个节点,多节点可不添加
      meta: { type: 'out' },
      redirect: '/project-management/index',
      children:[
        { path: '/project-management/index', name: '项目管理', meta: { title: '项目管理' }, component: () => import('@/views/Out/ProjectManagement/Index') }
      ]
    },
    {
        path: '/',
        component: Home,
        name: '企业保证金',                           
        iconCls: 'iconfont iconqian',  
        leaf: true,                             
        meta: { type: 'out' },
        children:[
          { path: '/deposit/index', name: '企业保证金', meta: { title: '企业保证金' }, component: () => import('@/views/Out/Deposit/Index') },
          { path: '/deposit/recharge', name: '充值', meta: { title: '充值', hidden: true, defaultActive: '/deposit/index' }, component: () => import('@/views/Out/Deposit/Recharge') },
          { path: '/deposit/recharge-detail', name: '充值', meta: { title: '充值', hidden: true, defaultActive: '/deposit/index' }, component: () => import('@/views/Out/Deposit/RechargeDetail') },
          { path: '/deposit/bill-detail', name: '账单明细', meta: { title: '账单明细', hidden: true, defaultActive: '/deposit/index' }, component: () => import('@/views/Out/Deposit/BillDetail') },
          { path: '/deposit/set-pwd', name: '设置支付密码', meta: { title: '设置支付密码', hidden: true, defaultActive: '/deposit/index' }, component: () => import('@/views/Out/Deposit/SetPwd') },
          { path: '/deposit/change-pwd', name: '修改支付密码', meta: { title: '修改支付密码', hidden: true, defaultActive: '/deposit/index' }, component: () => import('@/views/Out/Deposit/ChangePwd') },
          { path: '/deposit/set-success', name: '设置成功', meta: { title: '设置成功', hidden: true, defaultActive: '/deposit/index' }, component: () => import('@/views/Out/Deposit/SetSuccess') }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '发票',    
        iconCls: 'iconfont iconfapiao',
        meta: { type: 'out' },
        children:[
            { path: '/invoice-management/index', name: '发票管理', meta: { title: '发票管理' }, component: () => import('@/views/Out/Invoice/InvoiceManagement') },
            { path: '/invoice-management/askfor-invoice', name: '索取发票', meta: { title: '索取发票', hidden: true, defaultActive: '/invoice-management/index' }, component: () => import('@/views/Out/Invoice/AskforInvoice') },
            { path: '/invoice-management/askfor-invoice2', name: '索取发票', meta: { title: '索取发票', hidden: true, defaultActive: '/invoice-management/index' }, component: () => import('@/views/Out/Invoice/AskforInvoice2') },
            { path: '/invoice-management/ask-success', name: '索取成功', meta: { title: '索取成功', hidden: true, defaultActive: '/invoice-management/index' }, component: () => import('@/views/Out/Invoice/AskSuccess') },
            { path: '/invoice-management/invoice-detail/:id', name: '发票详情', meta: { title: '发票详情', hidden: true, defaultActive: '/invoice-management/index' }, component: () => import('@/views/Out/Invoice/InvoiceDetail') },
            { path: '/invoice-management/invoice-title', name: '抬头信息管理', meta: { title: '抬头信息管理' }, component: () => import('@/views/Out/Invoice/InvoiceTitle') },
            { path: '/invoice-management/address-management', name: '寄送地址管理', meta: { title: '寄送地址管理' }, component: () => import('@/views/Out/Invoice/AddressManagement') }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '首页',                           
        iconCls: 'iconfont icon552cc1fc7c4c5',  
        leaf: true,                             
        meta: { type: 'out' },
        children:[
          { path: '/set/index', name: '账户设置', meta: { title: '账户设置' }, component: () => import('@/views/Out/Set/Index') },
          { path: '/set/change-pwd', name: '修改登录密码', meta: { title: '修改登录密码', hidden: true, defaultActive: '/set/index' }, component: () => import('@/views/Out/Set/ChangePwd') },
          { path: '/set/forget-pwd', name: '忘记登录密码', meta: { title: '忘记登录密码', hidden: true, defaultActive: '/set/index' }, component: () => import('@/views/Out/Set/ForgetPwd') },
          { path: '/set/set-success', name: '设置成功', meta: { title: '设置成功', hidden: true, defaultActive: '/set/index' }, component: () => import('@/views/Out/Set/SetSuccess') }
        ]
    }
]

export default Out