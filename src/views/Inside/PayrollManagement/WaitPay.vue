<template>
    <div>
        <div class="white-box padding-align-40">
            <!-- 搜索框 -->
            <search placeholder="请输入工人姓名/身份证号" width="403px" @search="handleSearch" @reset="handleReset"/>
        </div>
        <div class="white-box padding-align-20 m-top-40">
            <div class="select-box">
                <div class="select-box-l">
                    <el-checkbox v-model="allChecked">全选(支持跨分页)</el-checkbox>
                </div>
                <div class="select-box-r">
                    <div class="select-box-count">
                        <p>工资单共  {{payrollCount.payrollAmount.toFixed(2)}} 元，服务费共 {{payrollCount.feeAmount.toFixed(2)}}  元</p>
                        <p>总计：<span>{{payrollCount.totalAmount.toFixed(2)}} </span>元 </p>
                    </div>
                    <el-button type="primary" @click="batchPay">批量支付({{allChecked ? total : multipleSelection.length}})</el-button>
                </div>
            </div>
            <!-- table -->
            <el-table :data="tableData" class="normal-table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"/>
                <el-table-column prop="name" label="姓名" width="150"/>
                <el-table-column prop="cardNumber" label="身份证号" width="350"/>
                <el-table-column prop="provideTime" label="发放日期/月份" width="200"/>
                <el-table-column prop="payAmount" label="应发工资（元）" width="200"/>
                <el-table-column prop="withholdSociaAmount" label="企业扣缴社保（元）" width="200"/>
                <el-table-column prop="payrollAmount" label="工资单金额（元）" width="200"/>
                <el-table-column prop="fee" label="服务费（元）" width="200"/>
                <el-table-column prop="totalAmount" label="共计（元）" width="200"/>
                <el-table-column label="操作" fixed="right" width="100">
                    <template slot-scope="scope">
                        <p class="table-handle">
                            <span @click="detail(scope.row)">查看详情</span>
                        </p>
                        <p class="table-handle" style="margin-top:6px">
                            <span @click="payNow(scope.row)">立即支付</span>
                        </p>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <pages :page.sync="page" :total="total"/>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                content: '',           //搜索字段
                tableData: [],
                page: 1,
                total: 0,
                multipleSelection: [],
                allChecked: false,
                payrollCount: {        //统计数据
                    payrollAmount: 0,  //工资单金额
                    feeAmount:     0,  //服务费
                    totalAmount:   0   //总计金额
                }        
            }
        },
        watch: {
            'page'(val) {      //切换页数
                this.getList()
            },
            'allChecked'(val) {
                this.$refs.multipleTable.clearSelection()
                if(val) {
                    this.$http(this.$api.payroll.PayrollCount, {
                        projectId:       this.$store.state.projectId,
                        status:          1,
                        combinationName: this.content
                    })
                    .then(res => {
                        this.payrollCount = res
                    })
                } else {
                    this.payrollCount = {        
                        payrollAmount: 0,  
                        feeAmount:     0,  
                        totalAmount:   0   
                    }  
                }
            }
        },
        methods: {
            // 搜索
            handleSearch(val) {
                this.content = val
                this.getList('change')
            },
            // 重置
            handleReset() {
                this.content = ''
                this.getList('change')
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
                if(!this.allChecked) {
                    this.payrollCount = {        
                        payrollAmount: 0,  
                        feeAmount:     0,  
                        totalAmount:   0   
                    } 
                    val.map(item => {
                        this.payrollCount.payrollAmount += item.payrollAmount*1
                        this.payrollCount.feeAmount     += item.fee*1
                        this.payrollCount.totalAmount   += item.totalAmount*1
                    })
                }
            },
            getList(val) {
                // 存在val为改变筛选项，需要把分页重置为1
                if(val) { this.page = 1 }

                this.$http(this.$api.payroll.PayrollList, {
                    projectId:       this.$store.state.projectId,
                    status:          1,
                    combinationName: this.content,
                    pageNum:         this.page
                })
                .then(res => {
                    this.total     = res.total
                    this.tableData = res.records
                })
            },
            detail(row) {
                this.$store.commit('setCurrentPayrollItem', row)
                this.$router.push(`/payroll-management/payroll-detail/${row.payrollId}?status=1`)
            },
            // 立即支付
            payNow(row) {
                this.$router.push({
                    path: '/payroll-management/cashier-desk/index',
                    query: {
                        type:          1,
                        totalAmount:   row.totalAmount,    //总金额
                        payrollAmount: row.payrollAmount,  //工资单总金额
                        feeAmount:     row.fee,            //服务费总金额
                        totalCount:    1,                  //总条数
                        ids:           row.payrollId       //工资单id
                    }
                })
            },
            // 批量支付
            batchPay() {
                if(this.allChecked) {
                    if(this.total == 0) {
                        this.$msg.Warning('您还未选择工资单')
                    } else {
                        this.$router.push({
                            path: '/payroll-management/cashier-desk/index',
                            query: {
                                type:            2,
                                totalAmount:     this.payrollCount.totalAmount,    
                                payrollAmount:   this.payrollCount.payrollAmount,  
                                feeAmount:       this.payrollCount.feeAmount,            
                                totalCount:      this.total,     
                                combinationName: this.content
                            }
                        })
                    }
                } else {
                    if(this.multipleSelection.length ==0) {
                        this.$msg.Warning('您还未选择工资单')
                    } else {
                        let ids = []
                        this.multipleSelection.map(item => {
                            ids.push(item.payrollId)
                        })
                        this.$router.push({
                            path: '/payroll-management/cashier-desk/index',
                            query: {
                                type:          1,
                                totalAmount:   this.payrollCount.totalAmount,    
                                payrollAmount: this.payrollCount.payrollAmount,  
                                feeAmount:     this.payrollCount.feeAmount,            
                                totalCount:    this.multipleSelection.length,                  
                                ids:           ids.join()      
                            }
                        })
                    }
                }
            }
        },
        created() {
            this.getList()
        }
    }
</script>

<style lang="scss" scoped>
    .table-status-err {
        color: #F5716F;
    }
    .select-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 10px;
        padding-bottom: 30px;
        .select-box-r {
            display: flex;
            align-items: center;
            /deep/ .el-button {
                width: 108px;
                height: 36px;
                padding: 0;
            }
            .select-box-count {
                display: flex;
                align-items: center;
                margin-right: 50px;
                font-weight: bold;
                p {
                    font-size: 18px;
                    color: #111;
                    &:first-child {
                        margin-right: 72px;
                    }
                    span {
                        color: $color;
                    }
                }
            }
        }
    }
</style>