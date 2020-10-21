<template>
    <div>
        <status-error v-if="status == 4" :detail="currentPayrollItem"/>
        <status-normal v-else :detail="currentPayrollItem"/>
        <div class="white-box padding-align-20 m-top-40">
            <h2 class="samll-title">工资单详情</h2>
            <div class="table-remark">
                <p>
                    <span>工资单编号：</span>
                    <span>{{currentPayrollItem.orderCode}}</span>
                </p>
                <p>
                    <span>工资单生成方式：</span>
                    <span>{{currentPayrollItem.type == 0 ? '平台智能结算，自动生成' : '手动添加'}}</span>
                </p>
            </div>
            <p class="table-remark-text" v-if="status == 6">
                <span>工人异议：</span>
                <span>{{currentPayrollItem.objectionDescribe}}</span>
            </p>
            <!-- table -->
            <el-table :data="payrollData" class="normal-table">
                <el-table-column prop="name" label="姓名" width="150"/>
                <el-table-column prop="cardNumber" label="身份证号" width="350"/>
                <el-table-column prop="provideTime" label="发放日期/月份" width="200"/>
                <el-table-column prop="payAmount" label="应发工资（元）" width="200"/>
                <el-table-column prop="withholdSociaAmount" label="企业扣缴社保（元）" width="200"/>
                <el-table-column prop="payrollAmount" label="工资单金额（元）" width="200"/>
                <el-table-column prop="fee" label="服务费（元）" width="200"/>
                <el-table-column prop="totalAmount" label="共计（元）" width="200"/>
            </el-table>
            <div class="bottom-btn">
                <el-button type="primary" @click="service" v-if="status == 4">联系客服</el-button>
                <el-button @click="$router.back()">返回上一页</el-button>
                <el-button type="primary" v-if="status == 1" @click="payNow">立即支付</el-button>
            </div>
        </div>
        <div class="white-box padding-align-20 m-top-40">
            <h2 class="samll-title">工时统计</h2>
            <div class="hours-empty" v-if="tableData.length == 0"> 
                <img :src="require('@/assets/images/icon-warning.png')"/>
                <span>无工时统计~</span>
            </div>
            <template v-else>
                <!-- table -->
                <el-table :data="tableData" class="normal-table">
                    <el-table-column prop="createTime" label="日期"/>
                    <el-table-column prop="workingHours" label="本日工时"/>
                    <el-table-column prop="payAmount" label="应发工资（元）"/>
                </el-table>
                <!-- 分页 -->
                <pages :page.sync="page" :total="total"/>
            </template>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { timestampToTime } from '@/utils/utils'
    export default {
        components: {
            'StatusNormal': () => import('./components/StatusNormal'),
            'StatusError': () => import('./components/StatusError')
        },
        data() {
            return {
                payrollData: [],
                tableData: [],
                total: 0,
                page: 1
            }
        },
        computed: {
            ...mapState(['serviceMobile', 'currentPayrollItem']),
            status() {
                return this.$route.query.status         //状态(0 初始状态 1待支付 2发放中 3发放完成 4 发放失败(退款归属4) 5退款 6 异议原因)
            }
        },
        watch: {
            'page'(val) {      //切换页数
                this.getList()
            }
        },
        methods: {
            service() {
                this.$msg.MsgAlert(`客服热线：${this.serviceMobile}`, () => {})
            },
            getList() {
                let params = {
                    projectId:       this.$store.state.projectId,
                    combinationName: this.currentPayrollItem.cardNumber,
                    pageNum:         this.page
                }
                if(this.currentPayrollItem.provideTime.length == 7) {
                    // 按月发放
                    params.date = this.currentPayrollItem.provideTime+'-01 00:00:00-'+this.currentPayrollItem.provideTime+'-30 23:59:59'
                } else {
                    // 按日发放
                    params.time = this.currentPayrollItem.provideTime+' 00:00:00-'+this.currentPayrollItem.provideTime+' 23:59:59'
                }
                this.$http(this.$api.attendance.DailyHoursList, params)
                .then(res => {
                    this.tableData = res.records
                    this.total     = res.total
                })
            },
            // 立即支付
            payNow() {
                this.$router.push({
                    path: '/payroll-management/cashier-desk/index',
                    query: {
                        type:          1,
                        totalAmount:   this.currentPayrollItem.totalAmount,    //总金额
                        payrollAmount: this.currentPayrollItem.payrollAmount,  //工资单总金额
                        feeAmount:     this.currentPayrollItem.fee,            //服务费总金额
                        totalCount:    1,                                      //总条数
                        ids:           this.currentPayrollItem.payrollId       //工资单id
                    }
                })
            }
        },
        created() {
            this.payrollData.push(this.currentPayrollItem)
            // 获取客服电话
            this.$store.dispatch('getServiceMobile')
            // 获取工时统计列表
            this.getList()
        }
    }
</script>

<style lang="scss" scoped>
    .samll-title {
        font-size: 20px;
        color: #333;
    }
    .bottom-btn {
        text-align: right;
        margin-top: 30px;
        .el-button {
            margin-left: 32px;
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
    .table-remark-text {
        margin-top: 15px;
        display: flex;
        font-size: 14px;
        line-height: 14px;
        color: $color_red;
        span {
            &:first-child {
                width: 148px;
            }
        }
    }
    .hours-empty {
        display: flex;
        align-items: center;
        padding: 60px 128px;
        img {
            width: 100px;
            height: 100px;
        }
        span {
            font-size: 20px;
            color: #333;
            margin-left: 36px;
        }
    }
</style>