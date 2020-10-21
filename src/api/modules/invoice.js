module.exports = {
    /* 
        获取可索取发票金额：(待补充)
    */
    CanAskInvoiceMoney: {
        url: '/v1/invoice/ask-amount',
        methods: 'get'
    },
    /* 
        发票列表：
            "status":       发票状态
            "invoiceType":  发票明细
    */
    InvoiceList: {
        url: '/v1/invoice/page',
        methods: 'get'
    },
    /* 
        发票详情：
            "invoiceId":       发票id
    */
    InvoiceDetail: {
        url: '/v1/invoice/invoice-dtl',
        methods: 'get'
    },
    /* 
        可索取发票列表：
            dealType		
            dealDtlType		
            beginTime		
            endTime		
            invoiceed	
            combinationCode	
    */
    CanAskInvoiceList: {
        url: '/v1/finance/finance-record-page',
        methods: 'get'
    },
    /* 
        索取发票提交：
            "invoiceInfoId": 1,       //发票抬头id
            "invoiceAddressId": 1,    //发票地址id
            "invoiceType": 1,         //发票类型
            "invoiceAmount": "1000",  //发票总金额
            "remark": "1111",         //备注
            "recordList": [
                1
            ]                         //财务流水id List
    */
    AddInvoice: {
        url: '/v1/invoice/invoice-add',
        methods: 'post'
    },
    /* 
        发票相关订单：
            "invoiceId":       发票id
    */
    InvoiceDetailOrder: {
        url: '/v1/invoice/invoice-dtl-record',
        methods: 'get'
    },
    /* 
        发票抬头列表：
    */
    InvoiceTitleList: {
        url: '/v1/invoice/look-up',
        methods: 'get'
    },
    /* 
        新增发票抬头：
            "companyName":   抬头
            "ein":           税号
            "invoiceType":   开具类型    0：企业，1：个人
            "defaultStatus": 是否默认    1：默认，0：普通
    */
    AddInvoiceTitle: {
        url: '/v1/invoice/look-up-add',
        methods: 'post'
    },
    /* 
        编辑发票抬头：
            "id"  :         主键
            "companyName":   抬头
            "ein":           税号
            "invoiceType":   开具类型
            "defaultStatus": 是否默认
    */
    EditInvoiceTitle: {
        url: '/v1/invoice/look-up-edit',
        methods: 'post'
    },
    /* 
        删除发票抬头：
            "id"  :         主键
    */
    DelInvoiceTitle: {
        url: '/v1/invoice/look-up-del',
        methods: 'get'
    },
    /* 
        默认发票抬头：
    */
    DefaultInvoiceTitle: {
        url: '/v1/invoice/look-up-def',
        methods: 'get'
    },
    /* 
        寄送地址列表：
    */
    AddressList: {
        url: '/v1/invoice/address-page',
        methods: 'get'
    },
    /* 
        新增寄送地址：
            "name":            姓名
            "mobile":          手机号
            "defaultStatus":   是否默认    1：默认，0：普通
            "address":         地址
    */
    AddAddress: {
        url: '/v1/invoice/address-add',
        methods: 'post'
    },
    /* 
        编辑寄送地址：
            "id"  :            主键
            "name":            姓名
            "mobile":          手机号
            "defaultStatus":   是否默认    1：默认，0：普通
            "address":         地址
    */
    EditAddress: {
        url: '/v1/invoice/address-edit',
        methods: 'post'
    },
    /* 
        删除地址：
            "id"  :         主键
    */
   DelAddress: {
        url: '/v1/invoice/address-del',
        methods: 'get'
    },
    /* 
        默认发票地址：
    */
    DefaultAddress: {
        url: '/v1/invoice/address-def',
        methods: 'get'
    },
}