<template>
    <div>
        <div class="white-box padding-align-40">
            <h2 class="small-title"><span>企业保证金</span></h2>
            <p class="money">余额<span>{{balance}}</span>元</p>
            <div class="bottom-btn">
                <el-button type="primary" @click="$router.push('/deposit/recharge')">充值</el-button>
                <el-button type="primary" @click="$router.push('/deposit/bill-detail')">账单明细</el-button>
                <el-button @click="$router.push('/deposit/change-pwd')">修改密码</el-button>
                <span class="forget-pwd" @click="$router.push('/deposit/set-pwd?title=忘记支付密码&type=4')">忘记密码?</span>
            </div>
        </div>
        <div class="text-box white-box padding-align-40 m-top-40">
            <h2 class="small-title" style="padding-bottom:12px">
                <img :src="require('@/assets/images/icon-warning.png')"/>
                <span>什么是企业保证金？</span>
            </h2>
            <p class="text-item">企业保证金是为确保准时足额地给工人发放工资，需要企业在平台缴纳的任意数额的保证金，当自动结算工人工资时，会自动从企业保证金里扣除。</p>
            <h2 class="small-title" style="padding-bottom:12px;margin-top:26px">
                <img :src="require('@/assets/images/icon-warning.png')"/>
                <span>企业保证金怎么使用？</span>
            </h2>
            <p class="text-item">当您选择自动为工人结算工资、社保时，系统会自动扣除保证金为工人发放工资和缴纳社保。</p>
            <h2 class="small-title" style="padding-bottom:12px;margin-top:26px">
                <img :src="require('@/assets/images/icon-warning.png')"/>
                <span>企业保证金不足怎么办？</span>
            </h2>
            <p class="text-item">当您的企业保证金不足时，系统将暂停您账户下所有项目人员的工资发放和社保缴纳，并以短信的形式提醒您，同时记录您的欠费记录（频繁的欠费将会影响您企业的信用分）</p>
        </div>
        <!-- 前往设置密码弹窗 -->
        <handle-dialog :show="show"
                       :showBtn1="false"
                       btn2Text="前往设置"
                       @close="show=false"
                       @confirm="$router.push('/deposit/set-pwd?title=设置支付密码&type=3')">
            <p slot="content" class="set-text">为保障您的保证金资金安全，请先设置保证金支付密码</p>
        </handle-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                show: false,
                balance:  0,        //账户余额
            }
        },
        created() {
            // 是否设置支付密码
            this.$http(this.$api.account.PayIsSet)
            .then(res => {
                if(!res) { this.show = true }
            })
            // 获取余额
            this.$http(this.$api.account.GetBalance)
            .then(res => {
                this.balance = res
            })
        }
    }
</script>

<style lang="scss" scoped>
    .set-text {
         font-size: 18px;
         color: #666;
    }
    .small-title {
        display: flex;
        align-items: center;
        img {
            width: 24px;
            height: 24px;
            margin-right: 10px;
        }
        span {
            font-size: 20px;
            color: #111;
        }
    }
    .money {
        display: flex;
        margin-top: 90px;
        padding-left: 28px;
        color: #333;
        font-size: 16px;
        line-height: 36px;
        span {
            color: $color;
            font-size: 36px;
            margin: 0 15px;
            margin-top: -6px;
        }
    }
    .bottom-btn {
        display: flex;
        align-items: center;
        margin-top: 118px;
        /deep/ .el-button {
            width: 108px;
            height: 36px;
            padding: 0;
            margin-right: 40px;
            margin-left: 0;
        }
        .forget-pwd {
            color: $color;
            text-decoration: underline;
            cursor: pointer;
            font-size: 14px;
        }
    }
    .text-item {
        color: #333;
        font-size: 14px;
    }
</style>