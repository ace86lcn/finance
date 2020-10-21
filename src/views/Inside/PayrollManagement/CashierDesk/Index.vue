<template>
    <div class="white-box padding-align-40">
        <h2 class="big-title">
            <span>收银台</span>
        </h2>
        <div class="price-box-1">
            <div class="price-box-1-top">
                <span class="price-box-1-top-l">总计：</span>
                <p><span>{{this.query.totalAmount}}</span>元</p>
            </div>
            <div class="price-box-1-item">
                <span class="price-box-1-item-l">工资单数量：</span>
                <p><span>{{this.query.totalCount}}</span>条</p>
            </div>
            <div class="price-box-1-item">
                <span class="price-box-1-item-l">工资单总金额：</span>
                <p><span>{{this.query.payrollAmount}}</span>元</p>
            </div>
            <div class="price-box-1-item">
                <span class="price-box-1-item-l">服务费：</span>
                <p><span>{{this.query.feeAmount}}</span>元</p>
            </div>
        </div>
        <!-- 支付方式 -->
        <h2 class="big-title" style="margin-top: 80px;padding-bottom: 67px">
            <span>支付方式</span>
            <span>保证金支付</span>
        </h2>
        <div class="price-box-2">
            <span class="price-box-2-l">本次扣除：</span>
            <p><span class="price-box-2-price-1">-{{this.query.totalAmount}}</span>元</p>
        </div>
        <div class="price-box-2-wrap">
            <div class="price-box-2">
                <span class="price-box-2-l">保证金余额：</span>
                <p><span>{{balance}}</span>元</p>
            </div>
            <span class="balance-text-1" v-if="isEnough > 0">（余额充足）</span>
            <span class="balance-text-2" v-else>（余额不足，请先充值）</span>
        </div>
        <div class="price-box-2-wrap" v-if="isEnough < 0">
            <div class="price-box-2">
                <span class="price-box-2-l">充值余额：</span>
                <p><el-input placeholder="请输入充值金额" v-model="addMoney"/>元</p>
            </div>
            <span class="balance-text-2" v-if="addMoney && addIsEnough">（充值金额不足）</span>
        </div>
        <!-- 密码输入框 -->
        <div class="pwd-box">
            <span class="pwd-title">支付密码：</span>
            <pwd-input @getPwd="getPwd"/>
            <span class="forget-pwd-text" @click="$router.push('/deposit/set-pwd?title=忘记支付密码&type=4')">忘记密码？</span>
        </div>
        <!-- 底部按钮 -->
        <div class="bottom-btn" v-if="isEnough > 0">
            <el-button type="primary" @click="confirm">确认付款</el-button>
            <el-button @click="$router.back()">返回上一页</el-button>
        </div>
        <div class="bottom-btn" v-else>
            <el-button type="primary" @click="recharge">充值并支付订单</el-button>
        </div>
    </div>
</template>

<script>
    import request from '@/utils/postRequest'
    export default {
        components: {
            'pwd-input': () => import('@/components/Pwd/PwdInput')
        },
        data() {
            return {
                pwd: '',        //支付密码
                balance: 0,     //保证金余额
                addMoney: '',   //充值金额
            }
        },
        computed: {
            type() {
                return this.$route.query.type           //0 按照批次支付  1 自定义选择工资单id支付  2全选支付
            },
            query() {
                return this.$route.query                //路由参数
            },
            isEnough() {
                return this.balance*1 - this.query.totalAmount*1        //余额是否足够
            },
            addIsEnough() {
                return (this.addMoney*1 + this.balance*1) <= this.query.totalAmount*1  //充值金额是否足够
            }
        },
        methods: {
            getPwd(pwd) {
                this.pwd = pwd
            },
            // 确认付款
            confirm() {
                if(!this.pwd || this.pwd.length !== 6) {
                    this.$msg.Warning('请输入6位完整密码')
                } else {
                    let params = {
                        type:           this.type,
                        payTotalAmount: this.query.totalAmount,
                        payPassword:    this.pwd
                    }
                    if(this.type == 0) {
                        params.batchCode = this.query.batchCode
                    } else if(this.type == 1) {
                        params.payrollIdList =  this.query.ids.split(',')
                    } else if(this.type == 2) {
                        params.projectId = this.$store.state.projectId
                        params.combinationName = this.query.combinationName
                    }
                    this.$http(this.$api.payroll.ConfirmPay, params)
                    .then(res => {
                        this.$msg.Success('支付成功')
                        this.$router.replace('/payroll-management/cashier-desk/success')
                    })
                }
            },
            // 充值
            recharge() {
                if(this.addIsEnough) {
                    this.$msg.Warning('充值金额不足')
                } else {
                    if(!this.pwd || this.pwd.length !== 6) {
                        this.$msg.Warning('请输入6位完整密码')
                    } else {
                        // 接口验证密码是否正确
                        this.$http(this.$api.common.CheckOldPwd, {
                            password: this.pwd,
                            type: 2
                        })
                        .then(res => {
                            if(res) {
                                // 调用充值接口
                                request(this.$api.account.Recharge, {
                                    amount: this.addMoney
                                })
                                .then(res2 => {
                                    this.$store.commit('setRechargeData', res2)
                                    this.$router.replace('/payroll-management/cashier-desk/recharge')
                                })
                            } else {
                                this.$msg.Warning('密码输入错误')
                            }
                        })
                    }
                }
            }
        },
        created() {
            // 获取保证金余额
            this.$http(this.$api.account.GetBalance)
            .then(res => {
                this.balance = res
            })
        }
    }
</script>

<style lang="scss" scoped>
    .big-title {
        width: 389px;
        display: flex;
        justify-content: space-between;
        span {
            font-size: 20px;
            line-height: 20px;
            color: #111;
            font-weight: bold;
        }
    }
    .price-box-1 {
        width: 389px;
        padding-top: 27px;
        box-sizing: border-box;
        .price-box-1-top {
            display: flex;
            justify-content: space-between;
            line-height: 36px;
            line-height: 88px;
            border-bottom: 1px solid #ccc;
            .price-box-1-top-l {
                font-size: 18px;
                color: #111;
            }
            p {
                display: flex;
                align-items: center;
                font-size: 18px;
                color: #111;
                span {
                    color: $color;
                    font-size: 36px;
                    margin-right: 18px;
                }
            }
        }
        .price-box-1-item {
            display: flex;
            justify-content: space-between;
            margin-top: 40px;
            line-height: 18px;
            .price-box-1-item-l {
                font-size: 14px;
                color: #111;
            }
            p {
                display: flex;
                align-items: center;
                font-size: 14px;
                color: #111;
                span {
                    color: $color;
                    font-size: 18px;
                    margin-right: 18px;
                }
            }
        }
    }
    .price-box-2 {
        width: 389px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        line-height: 18px;
        .price-box-2-l {
            font-size: 14px;
            color: #111;
        }
        p {
            font-size: 14px;
            color: #111;
            display: flex;
            align-items: center;
            /deep/ .el-input {
                margin-right: 15px;
                width: 130px;
            }
            span {
                margin-right: 18px;
                font-size: 18px;
            }
            .price-box-2-price-1 {
                color: #F5716F;
            }
        }
    }
    .price-box-2-wrap {
        display: flex;
        align-items: center;
        margin-top: 42px;
        line-height: 18px;
        .balance-text-1 {
            font-size: 14px;
            color: #666;
            margin-left: 20px;
        }
        .balance-text-2 {
            font-size: 14px;
            color: #F5716F;
            margin-left: 20px;
        }
    }
    .pwd-box {
        display: flex;
        align-items: center;
        margin-top: 90px;
        .pwd-title {
            font-size: 18px;
            color: #111;
            margin-right: 5px;
        }
        .forget-pwd-text {
            font-size: 14px;
            color: $color;
            text-decoration: underline;
            margin-left: 37px;
            cursor: pointer;
        }
    }
    .bottom-btn {
        margin-top: 73px;
        /deep/ .el-button {
            width: 108px;
            height: 36px;
            padding: 0;
        }
        /deep/ .el-button+.el-button {
            margin-left: 40px;
        }
    }
</style>