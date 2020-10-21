<template>
    <div>
        <div class="white-box padding-align-40">
            <!-- 条件筛选 -->
            <div class="search-list">
                <div class="search-item-title">筛选</div>
                <div class="search-item-wrap">
                    <div class="search-item">
                        <span class="search-title">交易类型</span>
                        <el-select v-model="status1Active" placeholder="请选择交易类型" @change="status1Change">
                            <el-option v-for="item in status1"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"/>
                        </el-select>
                    </div>
                    <div class="search-item">
                        <span class="search-title">交易明细</span>
                        <el-select v-model="status2Active" placeholder="请选择交易明细" @change="getList('change')">
                            <el-option v-for="item in status2"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"/>
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="search-list" style="padding-left:50px;margin-top:33px">
                <div class="search-item-wrap">
                    <div class="search-item">
                        <span class="search-title">日期</span>
                        <el-date-picker v-model="date"
                                        type="daterange"
                                        range-separator="-"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        style="width: 355px"
                                        @change="getList('change')"/>
                    </div>
                </div>
            </div>
            <!-- 搜索框 -->
            <search class="m-top-33" placeholder="请输入交易编号/订单号/账单号搜索" width="403px" @search="handleSearch" @reset="handleReset"/>
        </div>
        <!-- 搜索结果 -->
        <div class="white-box padding-align-40 m-top-40">
            <!-- table -->
            <el-table :data="tableData" class="normal-table">
                <el-table-column prop="recordCode" label="交易编号"/>
                <el-table-column prop="createTime" label="交易时间"/>
                <el-table-column prop="dealTypeName" label="交易类型"/>
                <el-table-column prop="dealDtlTypeName" label="交易明细"/>
                <el-table-column prop="orderCode" label="关联订单号"/>
                <el-table-column label="交易金额(元)">
                    <template slot-scope="scope">
                        <span class="table-text-red" v-if="scope.row.dealTypeName == '消费'">-{{scope.row.dealAmount}}</span>
                        <span class="table-text-green" v-else>+{{scope.row.dealAmount}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <pages :page.sync="page" :total="total"/>
        </div>
    </div>
</template>

<script>
    import { timestampToTime } from '@/utils/utils'
    export default {
        data() {
            return {
                status1: [{
                    value: '',
                    label: '全部'
                    }, {
                    value: '1',
                    label: '充值'
                    }, {
                    value: '2',
                    label: '消费'
                    }, {
                    value: '3',
                    label: '退款'
                }],                    //交易类型
                status1Active: '',
                status2: [{
                    value: '',
                    label: '全部'
                    }, {
                    value: '1',
                    label: '保证金缴纳'
                    }, {
                    value: '2',
                    label: '代发工资支付'
                    }, {
                    value: '3',
                    label: '代缴社保支付'
                    }, {
                    value: '4',
                    label: '服务费支付'
                    }, {
                    value: '5',
                    label: '代发工资退款'
                    }, {
                    value: '6',
                    label: '代缴社保退款'
                    }, {
                    value: '7',
                    label: '服务费退款'
                }],                    //交易明细
                status2Active: '',
                date: '',
                content: '',           //搜索字段
                tableData: [],
                page: 1,
                total: 0
            }
        },
        watch: {
            'page'(val) {      //切换页数
                this.getList()
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
            // 选择交易类型
            status1Change() {
                this.status2Active = ''
                // 对交易类型判断显示不同的交易明细
                // 交易类型 1：充值，2：消费，3：退款
                if(this.status1Active == 1) {
                    this.status2 = [{
                        value: '',
                        label: '全部'
                        }, {
                        value: '1',
                        label: '保证金缴纳'
                    }]
                } else if(this.status1Active == 2) {
                    this.status2 = [{
                        value: '',
                        label: '全部'
                        }, {
                        value: '2',
                        label: '代发工资支付'
                        }, {
                        value: '3',
                        label: '代缴社保支付'
                        }, {
                        value: '4',
                        label: '服务费支付'
                    }]
                } else if(this.status1Active == 3) {
                    this.status2 = [{
                        value: '',
                        label: '全部'
                        }, {
                        value: '5',
                        label: '代发工资退款'
                        }, {
                        value: '6',
                        label: '代缴社保退款'
                        }, {
                        value: '7',
                        label: '服务费退款'
                    }]
                } else {
                    this.status2 = [{
                        value: '',
                        label: '全部'
                        }, {
                        value: '1',
                        label: '保证金缴纳'
                        }, {
                        value: '2',
                        label: '代发工资支付'
                        }, {
                        value: '3',
                        label: '代缴社保支付'
                        }, {
                        value: '4',
                        label: '服务费支付'
                        }, {
                        value: '5',
                        label: '代发工资退款'
                        }, {
                        value: '6',
                        label: '代缴社保退款'
                        }, {
                        value: '7',
                        label: '服务费退款'
                    }]
                }
                this.getList('change')
            },
            getList(val) {
                // 存在val为改变筛选项，需要把分页重置为1
                if(val) { this.page = 1 }
                this.$http(this.$api.account.BillDetailList, {
                    dealType:        this.status1Active,
                    dealDtlType:     this.status2Active,
                    beginTime:       this.date ? timestampToTime(this.date[0]) : '',
                    endTime:         this.date ? timestampToTime(this.date[1]) : '',
                    combinationCode: this.content,
                    pageNum:         this.page
                })
                .then(res => {
                    this.tableData = res.records
                    this.total     = res.total
                })
            }
        },
        created() {
            this.getList()
        }
    }
</script>

<style lang="scss" scoped>
    /deep/ .el-select {
        width: 324px !important;
    }
</style>