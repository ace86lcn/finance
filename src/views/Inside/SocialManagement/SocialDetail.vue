<template>
    <div>
        <div class="white-box padding-align-40 m-top-40">
            <h2 class="samll-title">社保单详情
                <span class="status-text-success" v-if="currentSocialDetail.status == 1">已实缴</span>
                <span class="status-text-error" v-else-if="currentSocialDetail.status == 2">缴纳失败</span>
                <span class="status-text-warning" v-else-if="currentSocialDetail.status == 0">未到账</span>
            </h2>
            <div class="table-remark">
                <p style="margin-left:0">
                    <span>社保单编号：</span>
                    <span>{{currentSocialDetail.socialRecordCode}}</span>
                </p>
                <p v-if="currentSocialDetail.status == 1">
                    <span>实缴时间：</span>
                    <span>{{currentSocialDetail.updateTime}}</span>
                </p>
                <p v-if="currentSocialDetail.status == 2">已退款至企业保证金</p>
            </div>
            <div class="table-remark" v-if="currentSocialDetail.status == 2">
                <p style="margin-left:0">
                    <span>失败原因：</span>
                    <span>{{currentSocialDetail.remarks}}</span>
                </p>
            </div>
            <!-- table -->
            <el-table :data="[currentSocialDetail]" class="normal-table">
                <el-table-column prop="name" label="姓名" width="120"/>
                <el-table-column prop="cardNumber" label="身份证号"/>
                <el-table-column label="发放月份">
                    <template slot-scope="scope">{{scope.row.payTime | dateSlice}}</template>
                </el-table-column>
                <el-table-column prop="personalPay" label="个人缴纳社保（元）"/>
                <el-table-column prop="enterprisePay" label="企业扣缴社保（元）"/>
            </el-table>
            <!-- 回执单 -->
            <div class="invoices-wrap" v-if="currentSocialDetail.status == 1">
                <h2 class="samll-title">回执单</h2>
                <div class="invoices">
                    <img-download :url="item" 
                                  class="invoices-item" 
                                  v-for="(item, index) in imgs"
                                  :key="index"/>
                </div>
            </div>
            <div class="bottom-btn">
                <el-button @click="$router.back()">返回上一页</el-button>
            </div>
        </div>
        <div class="white-box padding-align-40 m-top-40">
            <h2 class="samll-title">关联工资单
                <span v-if="payrollDetail.status == 1">待支付</span>
                <span v-else-if="payrollDetail.status == 2">发放中</span>
                <span v-else-if="payrollDetail.status == 3">发放完成</span>
                <span v-else-if="payrollDetail.status == 4">发放失败</span>
                <span v-else-if="payrollDetail.status == 5">已退款</span>
                <span v-else-if="payrollDetail.status == 6">有异议</span>
            </h2>
            <div class="table-remark">
                <p>
                    <span>工资单编号：</span>
                    <span>{{payrollDetail.orderCode}}</span>
                </p>
                <p>
                    <span>工资单生成方式：</span>
                    <span>{{payrollDetail.type == 0 ? '平台智能结算，自动生成' : '手动生成'}}</span>
                </p>
            </div>
            <!-- table -->
            <el-table :data="[payrollDetail]" class="normal-table">
                <el-table-column prop="name" label="姓名"/>
                <el-table-column prop="cardNumber" label="身份证号"/>
                <el-table-column prop="provideTime" label="发放月份"/>
                <el-table-column prop="payAmount" label="应发工人工资（元）"/>
                <el-table-column prop="withholdSociaAmount" label="企业扣缴社保（元）"/>
                <el-table-column prop="fee" label="服务费（元）"/>
                <el-table-column prop="actualSalary" label="工资单金额（元）"/>
            </el-table>
            <div class="bottom-btn">
                <el-button type="primary" @click="toPayrollDetail">工资单详情</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {
            'ImgDownload': () => import('@/components/ImgDownload')
        },
        data() {
            return {  
                payrollDetail: {},       //关联工资单
                currentSocialDetail: {},
                imgs: []
            }
        },
        computed: {
            id() {
                return this.$route.params.id            //社保id
            },
            payrollId() {
                return this.$route.query.payrollId      //工资单id
            }
        },
        methods: {
            // 工资单详情
            toPayrollDetail() {
                this.$store.commit('setCurrentPayrollItem', this.payrollDetail)
                this.$router.push(`/payroll-management/payroll-detail/${this.payrollDetail.payrollId}?status=${this.payrollDetail.status}`)
            }
        },
        created() {
            // 获取社保详情
            this.$http(this.$api.social.SocialRecordDetail, {
                socialRecordId: this.id
            })
            .then(res => {
                this.currentSocialDetail = res
                this.imgs = res.receiptUrl ? res.receiptUrl.split(',') : []
            })
            // 获取关联工资单
            this.$http(this.$api.social.AssociatedPayroll, {
                payrollId: this.payrollId
            })
            .then(res => {
                this.payrollDetail = res
            })
        }
    }
</script>

<style lang="scss" scoped>
    .samll-title {
        font-size: 20px;
        color: #333;
        display: flex;
        align-items: center;
        line-height: 20px;
        justify-content: space-between;
        span {
            color: #FFC471;
            font-size: 20px;
        }
    }
    .bottom-btn {
        text-align: right;
        margin-top: 30px;
        .el-button {
            width: 108px;
            height: 36px;
            padding: 0;
        }
    }
    .table-remark {
        margin-top: 20px;
        display: flex;
        p {
            display: flex;
            font-size: 14px;
            line-height: 14px;
            color: #666;
            &:last-child {
                margin-left: 136px;
            }
            span {
                &:first-child {
                    width: 148px;
                }
            }
        }
    }
    .invoices-wrap {
        margin-top: 60px;
        .invoices {
            display: flex;
            flex-wrap: wrap;
            .invoices-item {
                margin-top: 34px;
                width: 150px;
                height: 90px;
                margin-right: 83px;
            }
        }
    }
</style>