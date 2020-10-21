<template>
    <div class="white-box padding-align-40">
        <h2 class="small-title" style="padding-bottom:14px">发票详情<span>{{detail.statusName}}</span></h2>
        <p class="invoice-text">
            <span>发票编号：{{detail.invoiceCode}}</span>
            <span>发票金额：{{detail.invoiceAmount}}元</span>
        </p>
        <p class="invoice-text">
            <span>发票抬头：{{detail.invoiceInfoName}}</span>
            <span>发票明细：{{detail.invoiceTypeName}}</span>
        </p>
        <p class="invoice-text">寄送地址：{{detail.invoiceAddressName}}</p>
        <p class="invoice-text">
            <span>申请时间：{{detail.createTime}}</span>
            <span v-if="detail.statusName == '已开票'">开票时间：{{detail.invoiceTime}}</span>
        </p>
        <img-download :url="detail.invoicePic"
                      v-if="detail.statusName == '已开票'"
                      style="margin-top:50px"/>
        <h2 class="small-title" style="margin-top:60px">相关订单</h2>
        <!-- table -->
        <el-table :data="tableData" class="normal-table">
            <el-table-column prop="recordCode" label="交易编号" width="200"/>
            <el-table-column prop="createTime" label="交易时间" width="200"/>
            <el-table-column prop="dealTypeName" label="交易类型"/>
            <el-table-column prop="orderCode" label="订单号/账单号"/>
            <el-table-column prop="dealNotation" label="交易备注"/>
            <el-table-column prop="dealAmount" label="交易金额(元)"/>
            <el-table-column prop="dealAmount" label="可开票金额"/>
        </el-table>
        <!-- 分页 -->
        <pages :page.sync="page" :total="total"/>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                detail: {},
                tableData: [],
                page: 1,
                total: 0,
            }
        },
        components: {
            'ImgDownload': () => import('@/components/ImgDownload')
        },
        watch: {
            'page'(val) {      //切换页数
                this.getList()
            }
        },
        computed: {
            id() {
                return this.$route.params.id
            }
        },
        methods: {
            getList() {
                this.$http(this.$api.invoice.InvoiceDetailOrder, {
                    invoiceId: this.id,
                    pageNum:   this.page
                })
                .then(res => {
                    this.total     = res.total
                    this.tableData = res.records
                })
            }
        },
        created() {
            // 获取详情信息
            this.$http(this.$api.invoice.InvoiceDetail, {
                invoiceId: this.id
            })
            .then(res => {
                this.detail = res
            })
            this.getList()
        }
    }
</script>

<style lang="scss" scoped>
    .small-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 20px;
        color: #111;
        span {
            color: #3CD97F;
            font-size: 30px;
        }
    }
    .invoice-text {
        display: flex;
        margin-top: 30px;
        font-size: 14px;
        line-height: 14px;
        color: #121212;
        span {
            &:first-child {
                width: 455px;
            }
        }
    }
</style>