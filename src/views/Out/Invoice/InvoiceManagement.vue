<template>
    <div>
        <div class="white-box padding-align-40">
            <h2 class="small-title">可索取发票金额</h2>
            <div class="money">
                <p><span>{{money}}</span>元</p>
                <el-button type="primary" @click="askInvoice">索取发票</el-button>
            </div>
        </div>
        <div class="white-box padding-align-40 m-top-40">
            <!-- 条件筛选 -->
            <div class="search-list">
                <div class="search-item-title">筛选</div>
                <div class="search-item-wrap">
                    <div class="search-item">
                        <span class="search-title">发票明细</span>
                        <el-select v-model="groups1Active" placeholder="请选择发票明细" @change="getList('change')">
                            <el-option v-for="item in groups1"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value"/>
                        </el-select>
                    </div>
                    <div class="search-item">
                        <span class="search-title">开票状态</span>
                        <el-select v-model="groups2Active" placeholder="请选择开票状态" @change="getList('change')">
                            <el-option v-for="item in groups2"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value"/>
                        </el-select>
                    </div>
                </div>
            </div>
        </div>
        <div class="white-box padding-align-20 m-top-40">
            <!-- table -->
            <el-table :data="tableData" class="normal-table">
                <el-table-column prop="createTime" label="申请时间" width="200"/>
                <el-table-column prop="invoiceInfoName" label="发票抬头" width="240"/>
                <el-table-column prop="invoiceAmount" label="发票总金额(元)"/>
                <el-table-column prop="invoiceTypeName" label="发票明细"/>
                <el-table-column prop="statusName" label="发票状态"/>
                <el-table-column label="操作" width="170">
                    <template slot-scope="scope">
                        <p class="table-handle">
                            <template v-if="scope.row.statusName == '已开票'">
                                <span @click="preview(scope.row.invoicePic)">预览</span>
                                <span @click="download(scope.row.invoicePic)">下载</span>
                            </template>
                            <span @click="$router.push(`/invoice-management/invoice-detail/${scope.row.invoiceId}`)">详情</span>
                        </p>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <pages :page.sync="page" :total="total"/>
        </div>
        <!-- 预览弹窗 -->
        <el-dialog
            :visible.sync="show"
            :before-close="handleClose"
            :center="true"
            title="预览">
            <img :src="previewImg" class="preview-img"/>
        </el-dialog>
    </div>
</template>

<script>
    import { downloadIamge } from '@/utils/utils'
    export default {
        data() {
            return {
                show: false,
                previewImg: '',
                groups1: [{
                    value: '',
                    label: '全部'
                    }, {
                    value: '3',
                    label: '工资消费'
                    }, {
                    value: '2',
                    label: '服务费消费'
                    }, {
                    value: '1',
                    label: '社保消费'
                }],                     //发票明细
                groups1Active: '',
                groups2: [{
                    value: '',
                    label: '全部'
                    }, {
                    value: '0',
                    label: '开票中'
                    }, {
                    value: '1',
                    label: '已开票'
                }],                    //开票状态
                groups2Active: '',
                tableData: [],
                page: 1,
                total: 0,
                money: 0               //可索取发票金额
            }
        },
        watch: {
            'page'(val) {      //切换页数
                this.getList()
            }
        },
        methods: {
            getList(val) {
                // 存在val为改变筛选项，需要把分页重置为1
                if(val) { this.page = 1 }
                this.$http(this.$api.invoice.InvoiceList, {
                    status:      this.groups2Active,
                    invoiceType: this.groups1Active,
                    pageNum:     this.page
                })
                .then(res => {
                    this.total     = res.total
                    this.tableData = res.records
                })
            },
            // 预览
            preview(url) {
                this.invoicePic = url
                this.show = true
            },
            // 下载
            download(url) {
                downloadIamge(url, '发票')
            },
            handleClose() {
                this.show = false
            },
            askInvoice() {
                if(this.money) {
                    this.$router.push('/invoice-management/askfor-invoice')
                } else {
                    this.$msg.Warning('您当前不可索取发票')
                }
            }
        },
        created() {
            this.getList()
            // 获取可索取发票金额
            this.$http(this.$api.invoice.CanAskInvoiceMoney)
            .then(res => {
                this.money = res
            })
        }
    }
</script>

<style lang="scss" scoped>
    .small-title {
        font-size: 20px;
        color: #111;
        line-height: 20px;
    }
    .money {
        margin-top: 48px;
        display: flex;
        align-items: center;
        padding-left: 69px;
        p {
            color: #111;
            font-size: 18px;
            span {
                color: $color;
                font-size: 36px;
                margin-right: 15px;
            }
        }
        .el-button {
            width: 108px;
            height: 36px;
            padding: 0;
            margin-left: 88px;
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
    .preview-img {
        display: block;
        width: 100%;
    }
</style>