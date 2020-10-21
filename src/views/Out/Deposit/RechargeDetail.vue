<template>
    <div class="white-box padding-align-40">
        <h2 class="big-title">
            <span>充值</span>
        </h2>
        <h2 class="big-title" style="margin-top: 100px">
            <span>请于15天内将款项打到以下账户中</span>
        </h2>
        <div class="price-box-1">
            <div class="price-box-1-top">
                <span class="price-box-1-top-l">打款金额：</span>
                <p><span>{{rechargeData.amount}}</span>元</p>
            </div>
            <div class="price-box-1-item">
                <span>打款方：</span>
                <span>{{rechargeData.name}}</span>
            </div>
            <div class="price-box-1-item">
                <span>收款方：</span>
                <span>{{rechargeData.receivingSide}}</span>
            </div>
            <div class="price-box-1-item">
                <span>收款方账号：</span>
                <span>{{rechargeData.receivingSideAccount}}</span>
            </div>
            <div class="price-box-1-item">
                <span>收款方开户行：</span>
                <span>{{rechargeData.bankOfDeposit}}</span>
            </div>
            <div class="price-box-1-item">
                <span>财务专属码：</span>
                <span>{{rechargeData.exclusiveCode}}</span>
            </div>
            <div class="price-box-1-item item-remark">
                <span></span>
                <span>（转账时请务必在备注一栏填写财务专属码）</span>
            </div>
        </div>
        <!-- 底部按钮 -->
        <div class="bottom-btn">
            <el-button type="primary" @click="copy">复制账户信息</el-button>
            <el-button @click="$router.replace('/deposit/index')">返回企业保证金</el-button>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                text: `打款金额：999元
                        打款方：打款方
                        收款方：打款方
                        收款方账号：打款方
                        收款方开户行：打款方
                        账单号：打款方`
            }
        },
        computed: {
            ...mapState(['rechargeData'])
        },
        methods: {
            // 复制账户信息
            copy() {
                this.text = `打款金额：${this.rechargeData.amount}元
                            打款方：${this.rechargeData.name}
                            收款方：${this.rechargeData.receivingSide}
                            收款方账号：${this.rechargeData.receivingSideAccount}
                            收款方开户行：${this.rechargeData.bankOfDeposit}
                            账单号：${this.rechargeData.exclusiveCode}`
                
                this.$msg.Success('复制成功')

                var Url2 = this.text;
                var oInput = document.createElement("input");
                oInput.value = Url2;
                document.body.appendChild(oInput);
                oInput.select(); // 选择对象
                document.execCommand("Copy"); // 执行浏览器复制命令
                oInput.className = "oInput";
                oInput.style.display = "none";
                this.$msg.Success('复制成功')
            }
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
            span {
                font-size: 14px;
                color: #111;
            }
        }
        .item-remark {
            margin-top: 10px;
            span {
                color: $color_red;
                margin-right: -12px;
            }
        }
    }
    .bottom-btn {
        margin-top: 120px;
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