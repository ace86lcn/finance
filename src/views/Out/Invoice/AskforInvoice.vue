<template>
    <div>
        <div class="white-box padding-align-40">
            <!-- 条件筛选 -->
            <div class="search-list">
                <div class="search-item-title">筛选</div>
                <div class="search-item-wrap">
                    <div class="search-item">
                        <span class="search-title">交易明细</span>
                        <el-select v-model="statusActive" 
                                   placeholder="请选择交易明细" 
                                   @change="getList('change')">
                            <el-option v-for="item in status"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value"/>
                        </el-select>
                    </div>
                    <div class="search-item">
                        <span class="search-title">日期</span>
                        <el-date-picker v-model="date"
                                        type="daterange"
                                        range-separator="-"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        style="width: 355px"
                                        :picker-options="pickerOptions"
                                        @change="getList('change')"/>
                    </div>
                </div>
            </div>
            <!-- 搜索框 -->
            <search placeholder="请输入交易编号/订单号/账单号搜索" width="377px" class="m-top-33" @search="handleSearch" @reset="handleReset"/>
        </div>
        <div class="white-box padding-align-20 m-top-40">
            <div class="select-box">
                <div class="select-box-l">
                    <el-checkbox v-model="allChecked">全选(支持跨分页)</el-checkbox>
                </div>
                <div class="select-box-r">
                    <div class="select-box-count">
                        <p>待开票金额：<span>{{allMoney}}</span>元</p>
                    </div>
                    <el-button type="primary" @click="ask">索取发票({{allChecked ? total : multipleSelection.length}})</el-button>
                </div>
            </div>
            <!-- table -->
            <el-table :data="tableData" class="normal-table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"/>
                <el-table-column prop="recordCode" label="交易编号" width="200"/>
                <el-table-column prop="createTime" label="交易时间" width="200"/>
                <el-table-column prop="dealTypeName" label="交易类型"/>
                <el-table-column prop="orderCode" label="订单号/账单号" width="200"/>
                <el-table-column prop="dealDtlTypeName" label="交易备注"/>
                <el-table-column prop="dealAmount" label="交易金额(元)"/>
                <el-table-column prop="dealAmount" label="可开票金额"/>
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
                status: [{
                    value: '2',
                    label: '工资消费'
                    }, {
                    value: '4',
                    label: '服务费消费'
                    }, {
                    value: '3',
                    label: '社保消费'
                }],                    //项目分类
                statusActive: '2',
                date: [Date.parse(new Date()) - 30*24*60*60*1000, Date.parse(new Date())],
                pickerOptions: {
                    // disabledDate(time) {
                    //     return time.getTime() < (Date.now() + 3 * 24 * 60 * 60 * 1000);
                    // }
                },
                content: '',           //搜索字段
                tableData: [],
                page: 1,
                total: 0,
                multipleSelection: [],
                allChecked: false,
                allMoney: 0
            }
        },
        watch: {
            'page'(val) {      //切换页数
                this.getList()
            },
            allChecked(val) {
                if(val) {
                    this.$refs.multipleTable.toggleAllSelection()
                    // 获取可索取发票金额
                    this.$http(this.$api.invoice.CanAskInvoiceMoney, {
                        dealDtlType:     this.statusActive,
                        beginTime:       this.date ? timestampToTime(this.date[0])+' '+'00:00:00' : '',
                        endTime:         this.date ? timestampToTime(this.date[1])+' '+'23:59:59' : '',
                        invoiceed:       2,
                        combinationCode: this.content
                    })
                    .then(res => {
                        this.allMoney = res
                    })
                } else {
                    this.$refs.multipleTable.clearSelection()
                    this.allMoney = 0
                }
            }
        },
        methods: {
            handleSearch(val) {
                this.content = val
                this.getList('change')
            },
            handleReset() {
                this.content = ''
                this.getList('change')
            },
            handleSelectionChange(val) {
                if(!this.allChecked) {
                    this.multipleSelection = val
                    this.allMoney          = 0
                    val.map(item => {
                        this.allMoney += item.dealAmount*1
                    })
                }
            },
            getList(val) {
                if(val) { this.page = 1 }

                this.$http(this.$api.invoice.CanAskInvoiceList, {
                    dealDtlType:     this.statusActive,
                    beginTime:       this.date ? timestampToTime(this.date[0])+' '+'00:00:00' : '',
                    endTime:         this.date ? timestampToTime(this.date[1])+' '+'23:59:59' : '',
                    invoiceed:       2,
                    combinationCode: this.content,
                    pageNum:         this.page
                })
                .then(res => {
                    this.total     = res.total
                    this.tableData = res.records
                })
            },
            // 索取发票
            ask() {
                if(this.allChecked) {
                    this.$store.commit('setInvoiceCheckAll', {
                        beginTime:       this.date ? timestampToTime(this.date[0])+' '+'00:00:00' : '',
                        endTime:         this.date ? timestampToTime(this.date[1])+' '+'23:59:59' : '',
                        combinationCode: this.content
                    })
                    this.$router.push(`/invoice-management/askfor-invoice2?type=1&total=${this.allMoney}&status=${this.statusActive}`)
                } else {
                    if(this.multipleSelection.length == 0) {
                        this.$msg.Warning('勾选数量不能为空')
                    } else {
                        let ids = []
                        this.multipleSelection.map(item => {
                            ids.push(item.recordId)
                        })
                        this.$router.push(`/invoice-management/askfor-invoice2?total=${this.allMoney}&status=${this.statusActive}&ids=${ids.join(',')}`)
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
        padding-bottom: 20px;
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
                margin-right: 95px;
                p {
                    font-size: 18px;
                    color: #333;
                    font-weight: bold;
                }
            }
        }
    }
</style>