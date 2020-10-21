<template>
    <div class="white-box padding-align-40">
        <h2 class="small-detail">充值</h2>
        <div class="msg-form">
            <div class="msg-form-item">
                <span class="form-item-l">充值类型：</span>
                <span class="form-item-r">企业保证金</span>
            </div>
            <div class="msg-form-item">
                <span class="form-item-l">充值账户：</span>
                <span class="form-item-r">{{companyName}}</span>
            </div>
            <div class="msg-form-item">
                <span class="form-item-l">账户余额：</span>
                <span class="form-item-r">{{balance}}元</span>
            </div>
            <div class="msg-form-item">
                <span class="form-item-l">充值金额：</span>
                <div class="form-item-ipt">
                    <el-input placeholder="请输入充值金额" v-model="addMoney"/>
                    <span>元</span>
                </div>
            </div>
            <div class="msg-form-item">
                <span class="form-item-l">充值后余额：</span>
                <span class="form-item-r">{{addMoney ? balance + addMoney*1 : balance}}元</span>
            </div>
        </div>
        <div class="checked-box">
            <el-checkbox v-model="checked"/>
            <p>我同意<span @click="agreement">《企业保证金服务协议》</span></p>
        </div>
        <el-button type="primary" class="next-btn" :disabled="!checked || !addMoney" @click="confirm">下一步</el-button>
        <!-- 保证金服务协议弹窗 -->
        <el-dialog
            :visible.sync="show"
            width="50%"
            :before-close="handleClose"
            :center="true"
            title="企业保证金服务协议">
            <div class="dialog-content">
                
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import request from '@/utils/postRequest'
    export default {
        data() {
            return {
                checked:  false,
                balance:  0,        //账户余额
                addMoney: '',       //充值金额
                show: false
            }
        },
        computed: {
            ...mapState(['companyName'])
        },
        methods: {
            confirm() {
                request(this.$api.account.Recharge, {
                    amount: this.addMoney
                })
                .then(res => {
                    this.$store.commit('setRechargeData', res)
                    this.$router.replace('/deposit/recharge-detail')
                })
            },
            handleClose() {
                this.show = false
            },
            agreement() {
                window.open('http://mobile.caishui.hzjyun.com/serviceagreement.html', '_black')
            }
        },
        created() {
            // 获取余额
            this.$http(this.$api.account.GetBalance)
            .then(res => {
                this.balance = res
            })
        }
    }
</script>

<style lang="scss" scoped>
    .small-detail {
        font-size: 20px;
        line-height: 20px;
        color: #111;
    }
    .msg-form {
        width: 355px;
        margin-top: 80px;
        .msg-form-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            &:not(:first-child) {
                margin-top: 40px;
            }
            .form-item-l {
                font-size: 14px;
                color: #111;
            }
            .form-item-r {
                font-size: 14px;
                color: #111;
            }
            .form-item-ipt {
                display: flex;
                align-items: center;
                span {
                    font-size: 14px;
                    color: #111;
                    margin-left: 10px;
                }
                /deep/ .el-input {
                    width: 160px;
                }
            }
        }
    }
    .checked-box {
        display: flex;
        align-items: center;
        margin-top: 118px;
        p {
            color: #333;
            font-size: 14px;
            margin-left: 10px;
            span {
                color: $color;
                text-decoration: underline;
                cursor: pointer;
            }
        }
    }
    .next-btn {
        width: 300px;
        height: 36px;
        padding: 0;
        margin-top: 84px;
    }
    /deep/ .el-dialog__title {
        font-size: 16px;
        line-height: 40px;
        color: #fff;
    }
	/deep/ .el-dialog__header {
		height: 40px;
		background-color: $color;
		padding: 0;
        padding-left: 20px;
        text-align: left;
	}
</style>