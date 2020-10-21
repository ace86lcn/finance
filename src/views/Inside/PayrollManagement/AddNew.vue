<template>
    <div class="add-new white-box right-box-along">
        <h2 class="top-title">请选择发放工资工人并完善工资单</h2>
        <!-- search -->
        <new-search class="m-top-33" 
                    placeholder="请输入工人姓名/身份证号" 
                    width="350px" 
                    @search="handleSearch" 
                    @reset="handleReset"/>
        <p class="none-search" v-if="!content && !totalCount">请搜索您需要添加的人员~</p>
        <template v-if="content || totalCount">
            <div class="search-detail-box">
                <div class="worker" v-if="content">
                    <img :src="content.img" :onerror="errorHeader"/>
                    <h2>{{content.name}}</h2>
                    <div class="worker-detail">
                        <p>
                            <span>身份证号：{{content.cardNumber}}</span>
                            <span>联系方式：{{content.mobile}}</span>
                        </p>
                        <p>
                            <span>开户行：{{content.bankName}}</span>
                            <span>银行卡号：{{content.bankNumber}}</span>
                        </p>
                    </div>
                </div>
                <div class="add-group">
                    <div class="add-group-item add-item-style" 
                         v-for="(item, index) in payrollList"
                         :key="index">
                        <div class="add-item-ipt-box">
                            <span class="add-item-ipt-title">发放月份：</span>
                            <el-date-picker placeholder="请选择日期"
                                            type="month"
                                            style="width: 160px"
                                            v-model="item.date"
                                            :picker-options="pickerOptions"/>
                        </div>
                        <div class="add-item-ipt-box" style="margin-top: 12px">  
                            <span class="add-item-ipt-title">应发工资：</span>
                            <el-input style="width: 129px" 
                                      placeholder="请输入金额" 
                                      v-model="item.wage"
                                      @input="changeWage(index)"
                                      type="number"/>
                            <span class="add-item-ipt-unit">元</span>
                            <el-checkbox v-model="item.checked"
                                         @change="changeWage(index)">缴纳社保</el-checkbox>
                        </div>
                        <p class="add-item-price-group" style="margin-top: 28px">
                            <span>社保：{{item.social}}元</span>
                            <span>代缴个税：{{item.tax}}元</span>
                        </p>
                        <p class="add-item-price-group">
                            <span>实发工资：{{item.wageTrue}}元</span>
                            <span>工资单金额：{{item.payrollMoney}}元</span>
                        </p>
                        <p class="add-item-price-group">
                            <span>服务费：{{item.service}}元</span>
                            <span class="add-item-total-price">共计：{{item.total}}元</span>
                        </p>
                        <i class="el-icon-delete" @click="delItem(index)"/>
                    </div>
                    <div class="add-button add-item-style" @click="addPayroll">
                        <div>
                            <i class="el-icon-plus"/>
                            <span>新增工资单</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 工资单弹窗列表 -->
            <transition name="el-zoom-in-bottom">
                <div v-show="show" class="carts-box scroll-y-style">
                    <div class="carts-box-title">
                        <p class="carts-box-title-l">总计:<span>{{totalCount}}</span>份工资单</p>
                        <p class="carts-box-title-r"
                           @click="removeAll"><i class="el-icon-delete"/>清空所有</p>
                    </div>
                    <ul class="carts-list">
                        <li class="carts-item" 
                            v-for="(item, index) in payrollList"
                            :key="index">
                            <span>{{content.name}}</span>
                            <span>{{content.cardNumber}}</span>
                            <span>{{item.date | dateFormat('month')}}</span>
                            <span>￥{{item.wage || 0}}</span>
                            <i class="el-icon-close" @click="delItem(index)"/>
                        </li>
                    </ul>
                </div>
            </transition>
            <!-- tabbar -->
            <div class="tabbar">
                <div class="tabbar-l">
                    <p class="tabbar-l-l">总计:<span>{{totalMoney}}</span>元</p>
                    <div class="tabbar-l-r">
                        <p>工资单金额共  {{payrollTotalMoney}}  元</p>
                        <p>服务费共 {{totalServiceCharge}}  元</p>
                    </div>
                </div>
                <div class="tabbar-r">
                    <span class="toggle-text" @click="show = !show">展开全部</span>
                    <p class="total-count">总计:<span>{{totalCount}}</span>份工资单</p>
                    <el-button type="primary" @click="confirm">确认工资单</el-button>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { timestampToYM } from '@/utils/utils'
    export default {
        components: {
            'NewSearch': () => import('./components/Search')
        },
        data() {
            return {
                show: false,           //工资单弹出框
                content: '',           //搜索工人信息
                payrollList: [],       //添加的工资单列表 
                pickerOptions: {       //选择月份不能大于当前月份
                    disabledDate(time) {
                        return time.getTime() >= (Date.now())
                    }
                },
                scaleForm: {              //计算用的比例，社保比例和税点及服务费
                    social: {             //社保金额
                        amountCompany: 0, //企业
                        amountSelf:    0  //个人
                    },
                    tax: 0,               //实际税点,计算用这个taxPointTrue
                    taxPointFront: 0,     //名义税点
                    service: 0            //服务费比例
                }          
            }
        },
        computed: {
            ...mapState(['errorHeader', 'addPayrollData']),
            // 工资单总数量
            totalCount() {
                return this.payrollList.length
            },
            //工资单总计金额
            totalMoney() {
                if(this.payrollList.length > 0) {
                    let total = 0
                    this.payrollList.map(item => {
                        total += item.total*1
                    })
                    return total.toFixed(2)
                } else {
                    return 0
                }
            },
            //工资单总金额
            payrollTotalMoney() {
                if(this.payrollList.length > 0) {
                    let total = 0
                    this.payrollList.map(item => {
                        total += item.payrollMoney*1
                    })
                    return total.toFixed(2)
                } else {
                    return 0
                }
            },
            //总服务费
            totalServiceCharge() {
                if(this.payrollList.length > 0) {
                    let total = 0
                    this.payrollList.map(item => {
                        total += item.service*1
                    })
                    return total.toFixed(2)
                } else {
                    return 0
                }
            },
        },
        methods: {
            handleSearch(val) {
                this.content     = val
            },
            handleReset() {
                this.content     = ''
            },
            // 添加工资单
            addPayroll() {
                //    添加一条新的数据
                this.payrollList.push({
                    workerId:     this.content.workerId,    //工人id
                    date:         Date.parse(new Date()),   //当前月份
                    wage:         '',                       //应发工资
                    checked:      true,                     //是否缴纳社保，bol
                    social:       this.scaleForm.social.amountSelf*1,              //个人社保
                    tax:          0,                        //个税
                    wageTrue:     0,                        //实发工资
                    payrollMoney: 0,                        //工资单金额
                    service:      0,                        //服务费
                    total:        0                         //总计
                })
            },
            // 修改工资金额
            changeWage(index) {
                let amountCompany = 0, //企业社保金额
                    amountSelf    = 0  //个人社保金额
                // this.payrollList[index]  为当前修改金额所属的那条工资单
                // 判断是否缴纳社保,并设置社保金额
                if(this.payrollList[index].checked) {
                    amountCompany = this.scaleForm.social.amountCompany
                    amountSelf = this.scaleForm.social.amountSelf
                    this.payrollList[index].social = amountSelf*1
                } else {
                    amountCompany = 0
                    amountSelf = 0
                    this.payrollList[index].social = 0
                }
                // 设置代缴个税金额,分两种情况计算，是否大于缴纳社保,代缴个税=（应发工资-社保）*个税税点
                if(this.payrollList[index].wage*1 > this.payrollList[index].social) {
                    this.payrollList[index].tax = ((this.payrollList[index].wage*1 - this.payrollList[index].social) * this.scaleForm.tax/100).toFixed(2)
                } else {
                    this.payrollList[index].tax = (this.payrollList[index].wage*1 * this.scaleForm.tax/100).toFixed(2)
                }
                // 设置实发工资   实发工资=应发工资-个人社保-代缴个税
                this.payrollList[index].wageTrue = (this.payrollList[index].wage*1 - this.payrollList[index].social - this.payrollList[index].tax).toFixed(2)
                // 设置工资单金额   工资单金额=应发工资+企业社保 
                this.payrollList[index].payrollMoney = (this.payrollList[index].wage*1 + amountCompany*1).toFixed(2)
                // 设置服务费   服务费=工资单金额*服务费率
                this.payrollList[index].service = (this.payrollList[index].payrollMoney * this.scaleForm.service).toFixed(2)
                // 设置总计   共计=工资单金额+服务费
                this.payrollList[index].total = (this.payrollList[index].payrollMoney*1 + this.payrollList[index].service*1).toFixed(2)
            },
            // 删除一条工资单
            delItem(index) {
                this.payrollList.splice(index, 1)
                    this.$msg.Success('删除成功')
            },
            // 清空全部
            removeAll() {
                this.$msg.MsgBox('清空后将不能恢复，确认清空？')
                .then(res => {
                    this.payrollList = []
                    this.show = false
                    this.$msg.Success('清空成功')
                })
            },
            // 确认工资单
            confirm() {
                if(this.totalCount == 0) {
                    this.$msg.Warning('您还未添加工资单')
                } else {
                    let isFull = true       //是否填写完整
                    let params = []
                    this.payrollList.map(item => {
                        if(!item.date || !item.wage) {
                            isFull = false
                        }
                        params.push({
                            projectId:         this.$store.state.projectId,
                            workerId:          item.workerId,
                            provideTime:       timestampToYM(item.date),
                            payAmount:         item.wage,
                            paySocialSecurity: item.checked ? 1: 0
                        })
                    })
                    if(!isFull) {
                        this.$msg.Warning('请填写完整')
                    } else {
                        this.$http(this.$api.payroll.AddPayroll, params)
                        .then(res => {
                            this.$router.push(`/payroll-management/confirm-payroll`)
                        })
                    }
                }
            }
        },
        async created() {
            //获取社保比例和税点及服务费
            let res = await this.$http(this.$api.rule.GetRules, { projectId: this.$store.state.projectId })
            //获取到的社保信息
            let socialData = res.find(item => item.ruleCode == 'SOCIAL_PAY').ruleBatch
            // 继续获取社保金额,现获取基数列表
            let socialList = await this.$http(this.$api.rule.GetSocial, { province: socialData[0].value, city: socialData[1].value })
            let findData = JSON.parse(socialList.socialSecurity).find(item => item.amount == socialData[2].value)
            this.scaleForm.social.amountCompany = findData.amount_company ? findData.amount_company*1 : 0
            this.scaleForm.social.amountSelf = findData.amount_self ? findData.amount_self*1 : 0
            //获取到的个税信息
            let taxData = res.find(item => item.ruleCode == 'INCOME_TAX_PAY').ruleBatch
            // 继续获取个税比例
            let taxScale = await this.$http(this.$api.rule.GetTax, { province: taxData[0].value, city: taxData[1].value })
            this.scaleForm.tax = taxScale.taxPointTrue ? taxScale.taxPointTrue : 0
            // 获取服务费比例
            let service = await this.$http(this.$api.payroll.ServiceScale)
            this.scaleForm.service = service.ytValue ? service.ytValue/100 : 0

            // 是否为编辑工资单
            if(this.addPayrollData) { 
                this.addPayrollData.map((item, index) => {
                    this.payrollList.push(item)
                    this.changeWage(index)
                })
            }
        },
        destroyed() {
            this.$store.commit('setPayrollData', '')
        }
    }
</script>

<style lang="scss" scoped>
    .add-new {
        box-sizing: border-box;
        padding-bottom: 150px;
        position: relative;
        padding-top: 58px;
        .top-title {
            font-size: 20px;
            line-height: 20px;
            color: #111;
        }
        .none-search {
            font-size: 16px;
            color: #111;
            line-height: 300px;
            padding-left: 200px;
        }
        .search-detail-box {
            margin-top: 80px;
        }
        .worker {
            background-color: rgba(0, 0 ,0, .03);
            padding: 30px 89px 33px 40px;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            width: 1056px;
            img {
                width: 60px;
                height: 60px;
            }
            h2 {
                font-size: 20px;
                color: #111;
                margin-left: 30px;
            }
        }
        .worker-detail {
            margin-left: 50px;
            p {
                display: flex;
                &:last-child {
                    margin-top: 29px;
                }
                span {
                    font-size: 16px;
                    line-height: 16px;
                    color: #111;
                    &:first-child {
                        width: 382px;
                    }
                    &:last-child {
                        width: 280px;
                    }
                }
            }
        }
        .add-group {
            display: flex;
            flex-wrap: wrap;
            max-width: 1260px;
            .add-button {
                width: 400px;
                height: 240px;
                box-sizing: border-box;
                border-radius: 10px;
                border: 1px solid #ccc;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                div {
                    display: flex;
                    align-items: center;
                    /deep/ .el-icon-plus {
                        color: #ccc;
                        font-size: 36px;
                    }
                    span {
                        font-size: 20px;
                        color: #333;
                        margin-left: 20px;
                    }
                }
            }
            .add-item-style {
                margin-top: 20px;
                margin-right: 20px;
                &:hover {
                    border-color: $color;
                }
                //&:nth-child(3n) {
                    //margin-left: 20px;
                //}
                //&:nth-child(3n-1) {
                 //   margin-left: 20px;
                //}
            }
            .add-group-item {
                width: 400px;
                height: 240px;
                box-sizing: border-box;
                border-radius: 10px;
                border: 1px solid #ccc;
                padding-top: 20px;
                padding-left: 17px;
                position: relative;
                /deep/ .el-icon-delete {
                    position: absolute;
                    top: 20px;
                    right: 17px;
                    font-size: 22px;
                    color: $color;
                    cursor: pointer;
                }
                .add-item-ipt-box {
                    display: flex;
                    align-items: center;
                    .add-item-ipt-title {
                        position: relative;
                        width: 80px;
                        padding-left: 8px;
                        box-sizing: border-box;
                        font-size: 14px;
                        color: #111;
                        &::before {
                            content: "*";
                            position: absolute;
                            top: 2px;
                            left: 0;
                            color: #F4716F;
                        }
                    }
                    .add-item-ipt-unit {
                        font-size: 14px;
                        color: #111;
                        margin-left: 8px;
                        margin-right: 25px;
                    }
                }
                .add-item-price-group {
                    display: flex;
                    margin-top: 13px;
                    span {
                        font-size: 14px;
                        color: #111;
                        line-height: 14px;
                        &:first-child {
                            width: 175px;
                        }
                    }
                    .add-item-total-price {
                        color: $color;
                    }
                }
            }
        }
        .carts-box {
            position: fixed;
            bottom: 150px;
            left: 300px;
            width: calc(100% - 375px);
            box-sizing: border-box;
            padding: 40px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0px 4px 40px 0px rgba(35, 35, 35, 0.1);
            max-height: 360px;
            overflow-y: scroll;
            z-index: 999;
            .carts-box-title {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-bottom: 20px;
                .carts-box-title-l {
                    font-size: 18px;
                    color: #111;
                    line-height: 24px;
                    span {
                        color: $color;
                        font-size: 24px;
                        margin: 0 10px;
                    }
                }
                .carts-box-title-r {
                    display: flex;
                    align-items: center;
                    color: $color;
                    font-size: 16px;
                    cursor: pointer;
                    /deep/ .el-icon-delete {
                        margin-right: 10px;
                        margin-top: 4px;
                    }
                }
            }
            .carts-list {
                display: flex;
                flex-wrap: wrap;
                .carts-item {
                    width: 500px;
                    box-sizing: border-box;
                    height: 40px;
                    border-radius: 10px;
                    border: 1px solid #999;
                    display: flex;
                    align-items: center;
                    padding-left: 14px;
                    margin-top: 20px;
                    position: relative;
                    &:nth-child(2n) {
                        margin-left: 60px;
                    }
                    span {
                        margin-right: 15px;
                        color: #333;
                        font-size: 14px;
                    }
                    /deep/ .el-icon-close {
                        position: absolute;
                        top: 10px;
                        right: 15px;
                        color: #F5716F;
                        font-size: 18px;
                        cursor: pointer;
                    }
                }
            }
        }
        .tabbar {
            position: fixed;
            bottom: 50px;
            left: 300px;
            width: calc(100% - 375px);
            box-sizing: border-box;
            padding: 27px 60px 30px 40px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0px 4px 40px 0px rgba(35, 35, 35, 0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 999;
            .tabbar-l {
                display: flex;
                align-items: center;
                .tabbar-l-l {
                    display: flex;
                    align-items: center;
                    font-size: 18px;
                    color: #111;
                    span {
                        color: $color;
                        font-size: 24px;
                        margin: 0 10px;
                    }
                }
                .tabbar-l-r {
                    margin-left: 76px;
                    position: relative;
                    &::before {
                        content: "";
                        position: absolute;
                        top: 0;
                        left: -39px;
                        width: 1px;
                        height: 40px;
                        background-color: #EDEDED;
                    }
                    p {
                        font-size: 14px;
                        line-height: 14px;
                        color: #111;
                        &:last-child {
                            margin-top: 15px;
                        }
                    }
                }
            }
            .tabbar-r {
                display: flex;
                align-items: center;
                /deep/ .el-button {
                    width: 108px;
                    height: 36px;
                    padding: 0;
                }
                .toggle-text {
                    color: $color;
                    text-decoration: underline;
                    font-size: 14px;
                    cursor: pointer;
                }
                .total-count {
                    display: flex;
                    align-items: center;
                    font-size: 18px;
                    color: #111;
                    margin: 0 27px 0 39px;
                    span {
                        color: $color;
                        font-size: 24px;
                        margin: 0 10px;
                    }
                }
            }
        }
    }
</style>