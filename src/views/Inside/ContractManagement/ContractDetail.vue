<template>
    <div class="contract-detail white-box padding-align-40">
        <!-- 甲方 -->
        <div class="jiafang">
            <h4 class="title-1">甲方：</h4>
            <p class="jiafang-item">
                <span>公司名称：</span>
                <span>{{detail.corpName}}</span>
            </p>
        </div>
        <!-- 乙方 -->
        <div class="yifang">
            <h4 class="title-1">乙方：</h4>
            <div class="yifang-r">
                <p class="yifang-item">
                    <span>姓名：</span>
                    <span>{{detail.name}}</span>
                </p>
                <p class="yifang-item">
                    <span>身份证号：</span>
                    <span>{{detail.cardNumber}}</span>
                </p>
                <p class="yifang-item">
                    <span>联系方式：</span>
                    <span>{{detail.phone}}</span>
                </p>
            </div>
        </div>
        <!-- 合同详情 -->
        <h2 class="title-2">合同详情：</h2>
        <p class="detail-item">
            <span>试用期薪资：</span>
            <span>{{detail.probationSalary}}元/月</span>
        </p>
        <p class="detail-item">
            <span>试用期：</span>
            <span>{{detail.probationStartTime}} —— {{detail.probationEndTime}}</span>
        </p>
        <p class="detail-item">
            <span>正式薪资：</span>
            <span>{{detail.officialSalary}}元/月</span>
        </p>
        <p class="detail-item">
            <span>任用期限：</span>
            <span>{{detail.appointmentStartTime}} —— {{detail.appointmentEndTime}}</span>
        </p>
        <p class="detail-item">
            <span>是否缴纳社保：</span>
            <span>{{detail.paySocialSecurity == 1 ? '缴纳' : '不缴纳'}}</span>
        </p>
        <div class="bottom-btn">
            <el-button @click="$router.back()">返回上一页</el-button>
            <el-button type="primary" @click="previewContract">合同预览</el-button>
            <el-button type="primary" v-if="type == 3" @click="changeContract">修改合同</el-button>
            <el-button type="danger" @click="cancel" v-if="type == 1">合同作废</el-button>
        </div>
        <!-- 合同状态 -->
        <div class="status">
            <h2 class="status-text status-text-warning" v-if="type == 0">待签署</h2>
            <h2 class="status-text status-text-warning" v-else-if="type == 3">待修改</h2>
            <h2 class="status-text status-text-success" v-else-if="type == 1">已签署</h2>
            <div class="change-box" v-if="type == 3">
                <h2>修改原因</h2>
                <p>{{detail.updateReason}}</p>
            </div>
        </div>
        <!-- 合同预览 -->
        <el-dialog
            :visible.sync="show"
            width="50%"
            :before-close="handleClose"
            :center="true"
            title="合同预览">
            <div class="dialog-content">
                <img v-for="(item, index) in imgs"
                     :key="index"
                     :src="item"/>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import request from '@/utils/postRequest'
    export default {
        data() {
            return {
                detail: '',
                show: false,
                imgs: []
            }
        },
        computed: {
            type() {
                return this.$route.query.type       //0：待签署，1：已签署，3：待修改
            },
            id() {
                return this.$route.params.id
            },
            workerId() {
                return this.$route.query.workerId       //工人id
            }
        },
        methods: {
            // 合同作废
            cancel() {
                this.$msg.MsgBox('作废后需重新上传合同，确认作废合同？')
				.then(() => {
					this.$http(this.$api.contract.CancelledContract, {
                        contractId: this.id
                    })
                    .then(res => {
                        this.$msg.Success('作废成功')
                        this.$router.replace(`/contract-management/cancelled?cardNumber=${this.detail.cardNumber}&workerId=${this.workerId}`)
                    })
				})
            },
            // 合同预览
            previewContract() {
                // 线上签约预览
                if(this.detail.contractType == 0) {
                    this.$http(this.$api.contract.PreviewDetailContract, {
                        contractId: this.id
                    })
                    .then(res => {
                        window.open(res, '_blank')
                    })
                } else if(this.detail.contractType == 1) {
                    // 线下签约预览
                    this.show = true
                    this.imgs = this.detail.contractAddress.split(',')
                }
            },
            // 修改合同
            changeContract() {
                // 线上签署
                this.$router.push({
                    path: '/contract-management/sign-contract',
                    query: {
                        cardNumber: this.detail.cardNumber,
                        id:         this.detail.contractId,
                        workerId:   this.workerId,
                        contractId: this.id
                    }
                })
            },
            handleClose() {
                this.show = false
            }
        },
        created() {
            // 获取详情
            this.$http(this.$api.contract.ContractDetail, {
                contractId: this.id
            })
            .then(res =>{
                this.detail = res
            })
        }
    }
</script>

<style lang="scss" scoped>
    .title-1 {
        font-size: 20px;
        color: #111;
        line-height: 20px;
    }
    .lable-1 {
        width: 118px;
        text-align: right;
        font-size: 16px;
        color: #333;
        margin-right: 63px;
        line-height: 16px;
    }
    .jiafang {
        display: flex;
        align-items: center;
        .jiafang-item {
            display: flex;
            span {
                font-size: 16px;
                color: #333;
                line-height: 16px;
                &:first-child {
                    width: 118px;
                    text-align: right;
                    margin-right: 63px;
                }
            }
        }
    }
    .yifang {
        display: flex;
        margin-top: 37px;
        .yifang-item {
            display: flex;
            &:first-child {
                margin-top: 3px;
            }
            &:not(:first-child) {
                margin-top: 40px;
            }
            span {
                font-size: 16px;
                color: #333;
                line-height: 16px;
                &:first-child {
                    width: 118px;
                    text-align: right;
                    margin-right: 63px;
                }
            }
        }
    }
    .title-2 {
        font-size: 20px;
        color: #111;
        line-height: 20px;
        margin-top: 80px;
    }
    .detail-item {
        display: flex;
        margin-top: 38px;
        span {
            font-size: 16px;
            color: #333;
            line-height: 16px;
            &:first-child {
                width: 112px;
                text-align: right;
                margin-right: 40px;
            }
        }
    }
    .bottom-btn {
        display: flex;
        margin-top: 72px;
        button {
            width: 108px;
            height: 36px;
            padding: 0;
            &:not(:first-child) {
                margin-left: 40px;
            }
        }
    }
    .contract-detail {
        position: relative;
    }
    .status {
        position: absolute;
        top: 40px;
        right: 150px;
        width: 353px;
        .status-text {
            text-align: center;
        }
        .change-box {
            width: 353px;
            box-sizing: border-box;
            margin-top: 29px;
            padding: 50px 30px;
            border-radius: 10px;
            border: 1px solid $color;
            h2 {
                text-align: center;
                font-size: 24px;
                color: #111;
                line-height: 24px;
                font-weight: normal;
                margin-bottom: 20px;
            }
            p {
                text-align: center;
                font-size: 14px;
                color: #111;
                line-height: 28px;
            }
        }
    }
    
	/deep/ .el-dialog__header {
		height: 40px;
		background-color: $color;
		padding: 0;
	}
    /deep/ .el-dialog__title {
        font-size: 16px;
        line-height: 40px;
        color: #fff;
    }
    .dialog-content {
        img {
            display: block;
            width: 100%;
        }
    }
</style>