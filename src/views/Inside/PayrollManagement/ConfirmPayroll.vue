<template>
    <div>
        <div class="white-box table-box">
            <div class="top-total">
                <p>共 {{total}}  条工资单</p>
                <p>工资单金额共 {{payrollCount.payrollAmount}}  元，服务费共{{payrollCount.feeAmount}}  元</p>
                <p>总计：<span>{{payrollCount.totalAmount}}</span>元</p>
            </div>
            <!-- table -->
            <el-table :data="tableData" class="normal-table m-top-33">
                <el-table-column prop="name" label="工人姓名"/>
                <el-table-column prop="cardNumber" label="身份证号" width="350"/>
                <el-table-column prop="provideTime" label="发放日期/月份"/>
                <el-table-column prop="payAmount" label="应发工资（元）"/>
                <el-table-column prop="withholdSociaAmount" label="企业扣缴社保（元）"/>
                <el-table-column prop="payrollAmount" label="工资单金额（元）"/>
                <el-table-column prop="fee" label="服务费（元）"/>
                <el-table-column prop="totalAmount" label="共计（元）"/>
            </el-table>
            <!-- 分页 -->
            <pages :page.sync="page" :total="total"/>
        </div>
        <div class="white-box m-top-40 date-box">
            <el-form :model="ruleForm" ref="ruleForm" label-width="230px">
                <el-form-item label="请选择期望工资到账日期" required>
                    <el-date-picker placeholder="请选择日期"
                                    style="width: 300px"
                                    v-model="ruleForm.date"
                                    :picker-options="pickerOptions"/>
                </el-form-item>
            </el-form>
        </div>
        <div class="white-box m-top-40 remark-box">
            <h2>备注</h2>
            <el-input type="textarea" 
                      :rows="4"
                      placeholder="请输入备注（不超过200个字）"
                      v-model="ruleForm.remark"
                      :maxlength="200"/>
        </div>
        <!-- tabbar -->
        <div class="tabbar">
            <div class="tabbar-l">
                <p class="tabbar-l-l">总计:<span>{{payrollCount.totalAmount}}</span>元</p>
                <div class="tabbar-l-r">
                    <p>工资单金额共  {{payrollCount.payrollAmount}}  元</p>
                    <p>服务费共 {{payrollCount.feeAmount}}  元</p>
                </div>
            </div>
            <div class="tabbar-r">
                <el-button type="primary" @click="confirm">立即提交</el-button>
                <el-button @click="edit">编辑工资单</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import { timestampToTime } from '@/utils/utils'
    export default {
        data() {
            return {
                tableData: [],
                page: 1,
                total: 0,
                ruleForm: {
                    date: '',
                    remark: ''
                },
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < (Date.now() + 3 * 24 * 60 * 60 * 1000);
                    }
                },
                payrollCount: ''        //统计数据
            }
        },
        watch: {
            'page'(val) {      //切换页数
                this.getList()
            }
        },
        methods: {
            getList() {
                this.$http(this.$api.payroll.PayrollList, {
                    projectId:       this.$store.state.projectId,
                    status:          0,
                    pageNum:         this.page
                })
                .then(res => {
                    this.total     = res.total
                    this.tableData = res.records
                })
            },
            confirm() {
                if(!this.ruleForm.date) {
                    this.$msg.Warning('请选择期望工资到账日期')
                } else {
                    this.$http(this.$api.payroll.CommitWaitpay, {
                        projectId:         this.$store.state.projectId,
                        expectProvideTime: timestampToTime(this.ruleForm.date) + ' ' + '00:00:00',
                        remark:            this.ruleForm.remark
                    })
                    .then(res => {
                        this.$router.replace({
                            path: '/payroll-management/cashier-desk/index',
                            query: {
                                type:          0,
                                batchCode:     res,                              //批次code
                                totalAmount:   this.payrollCount.totalAmount,    //总金额
                                payrollAmount: this.payrollCount.payrollAmount,  //工资单总金额
                                feeAmount:     this.payrollCount.feeAmount,      //服务费总金额
                                totalCount:    this.total                        //总条数
                            }
                        })
                    })
                }
            },
            // 编辑工资单
            edit() {
                this.$http(this.$api.payroll.PayrollList, {
                    projectId:       this.$store.state.projectId,
                    status:          0,
                    pageSize:        99999
                })
                .then(res => {
                    let payrollList = []
                    res.records.map(item => {
                        payrollList.push({
                            workerId:     item.workerId,                            //工人id
                            date:         Date.parse(item.provideTime),             //当前月份
                            wage:         item.payAmount*1,                         //应发工资
                            checked:      item.withholdSociaAmount ? true : false,  //是否缴纳社保，bol
                            social:       0,                                        //个人社保
                            tax:          0,                                        //个税
                            wageTrue:     0,                                        //实发工资
                            payrollMoney: 0,                                        //工资单金额
                            service:      0,                                        //服务费
                            total:        0                                         //总计
                        })
                    })
                    this.$store.commit('setPayrollData', payrollList)
                    this.$router.replace('/payroll-management/add-new')
                })
            }
        },
        created() {
            this.getList()
            // 获取统计数据
            this.$http(this.$api.payroll.PayrollCount, {
                projectId: this.$store.state.projectId,
                status:    0
            })
            .then(res => {
                this.payrollCount = res
            })
        }
    }
</script>

<style lang="scss" scoped>
    .table-box {
        padding-top: 40px;
        padding-bottom: 20px;
    }
    .top-total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
            display: flex;
            align-items: center;
            color: #111;
            font-size: 20px;
            span {
                color: $color;
                font-size: 24px;
            }
        }
    }
    .date-box {
        display: flex;
        align-items: center;
        padding-top: 30px;
        padding-bottom: 30px;
        /deep/ .el-form-item {
            margin-bottom: 0;
        }
    }
    .remark-box {
        padding-top: 34px;
        padding-bottom: 40px;
        h2 {
            font-size: 20px;
            line-height: 20px;
            color: #111;
        }
        /deep/ .el-textarea {
            margin-top: 26px;
        }
    }
    .tabbar {
            margin: 40px auto;
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
                /deep/ .el-button+.el-button {
                    margin-left: 40px;
                }
            }
        }
</style>