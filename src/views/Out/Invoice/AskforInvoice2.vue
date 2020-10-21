<template>
    <div class="white-box padding-align-40 right-box-along">
        <h2 class="small-title">索取发票</h2>
        <el-form :model="ruleForm" ref="ruleForm" label-width="135px" label-position="left">
            <el-form-item label="发票总金额：" >
                <p class="money"><span>{{$route.query.total}}</span>元</p>
            </el-form-item>
            <el-form-item label="发票抬头：" required>
                <div class="form-item-box">
                    <el-select v-model="invoiceTitle" placeholder="请选择">
                        <el-option v-for="item in invoiceOptions"
                                    :key="item.id"
                                    :label="item.companyName"
                                    :value="item.id"/>
                    </el-select>
                    <span class="add-text" @click="invoiceShow = true">+ 新增抬头</span>
                </div>
            </el-form-item>
            <el-form-item label="寄送地址：" required>
                <div class="form-item-box">
                    <el-select v-model="addressTitle" placeholder="请选择">
                        <el-option v-for="item in addressOptions"
                                    :key="item.id"
                                    :label="item.address"
                                    :value="item.id"/>
                    </el-select>
                    <span class="add-text" @click="addressShow = true">+ 新增地址</span>
                </div>
            </el-form-item>
            <el-form-item label="备注：">
                <el-input type="textarea" 
                          :rows="5"  
                          placeholder="请输入备注，不超过40个字" 
                          v-model="ruleForm.remark"/>
            </el-form-item>
        </el-form>
        <div class="bottom-btn">
            <el-button @click="$router.back()">上一步</el-button>
            <el-button type="primary" @click="confirm">索取发票</el-button>
        </div>
        <!-- 抬头弹窗 -->
        <invoice-dialog :show="invoiceShow" 
                        title="新增抬头"
                        @close="invoiceShow = false"
                        @confirm="invoiceConfirm"/>
        <!-- 地址弹窗 -->
        <address-dialog :show="addressShow" 
                        title="新增地址"
                        @close="addressShow = false"
                        @confirm="addressConfirm"/>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        components: {
            'InvoiceDialog': () => import('./components/InvoiceDialog'),
            'AddressDialog': () => import('./components/AddressDialog')
        },
        data() {
            return {
                ruleForm: {
                    remark: ''          //备注
                },
                invoiceTitle: '',       //发票抬头
                invoiceOptions: [],
                addressTitle: '',       //地址抬头
                addressOptions: [],
                invoiceShow: false,     //新增发票弹窗
                addressShow: false      //新增地址弹窗
            }
        },
        computed: {
            ...mapState(['invoiceCheckAll'])
        },
        methods: {
            // 新增抬头
            invoiceConfirm(params) {
                this.$http(this.$api.invoice.AddInvoiceTitle, params)
                .then(res => {
                    this.$msg.Success('新增成功')
                    this.invoiceShow = false
                    this.getInvoice()
                })
            },
            // 新增地址
            addressConfirm(params) {
                this.$http(this.$api.invoice.AddAddress, params)
                .then(res => {
                    this.$msg.Success('新增成功')
                    this.addressShow = false
                    this.getAddress()
                })
            },
            // 索取
            confirm() {
                if(!this.invoiceTitle || !this.addressTitle) {
                    this.$msg.Warning('请填写完整')
                } else {
                    let params = {
                        invoiceInfoId:    this.invoiceTitle,       
                        invoiceAddressId: this.addressTitle,          
                        invoiceAmount:    this.$route.query.allMoney,  
                        remark:           this.ruleForm.remark,
                        invoiceType:      this.$route.query.status
                    }
                    // 跨分页全选
                    if(this.$route.query.type == 1) {
                        params.type            = 1
                        params.beginTime       = this.invoiceCheckAll.beginTime
                        params.endTime         = this.invoiceCheckAll.endTime
                        params.combinationCode = this.invoiceCheckAll.combinationCode
                    } else {
                        params.type       = 0
                        params.recordList = this.$route.query.ids.split(',') 
                    }
                    this.$http(this.$api.invoice.AddInvoice, params)
                    .then(res => {
                        this.$msg.Success('提交成功')
                        this.$router.replace('/invoice-management/ask-success')
                    })
                }
            },
            // 获取抬头列表
            async getInvoice() {
                let result          = await this.$http(this.$api.invoice.InvoiceTitleList, { pageSize: 9999 })
                this.invoiceOptions = result.records
                let defaultData     = await this.$http(this.$api.invoice.DefaultInvoiceTitle)
                this.invoiceTitle   =  defaultData ? defaultData.id : ''
            },
            // 获取地址列表
            async getAddress() {
                let result = await this.$http(this.$api.invoice.AddressList, { pageSize: 9999 })
                this.addressOptions = result.records
                let defaultData     = await this.$http(this.$api.invoice.DefaultAddress)
                this.addressTitle   =  defaultData ? defaultData.id : ''
            }
        },
        created() {
            this.getInvoice()
            this.getAddress()
        }
    }
</script>

<style lang="scss" scoped>
    .small-title {
        font-size: 20px;
        line-height: 20px;
        color: #111;
    }
    /deep/ .el-form {
        margin-top: 58px;
        .el-form-item__label {
            font-size: 14px;
            color: #111;
        }
        .money {
            display: flex;
            color: #111;
            font-size: 18px;
            span {
                color: $color;
                font-size: 36px;
                margin-right: 15px;
                margin-top: -4px;
            }
        }
        .el-form-item {
            margin-bottom: 40px;
        }
        .form-item-box {
            display: flex;
            align-items: center;
            /deep/ .el-select {
                width: 427px;
            }
            .add-text {
                color: $color;
                font-size: 14px;
                margin-left: 37px;
                text-decoration: underline;
                cursor: pointer;
            }
        }
        /deep/ .el-textarea {
            width: 427px;
        }
    }
    .bottom-btn {
        padding-top: 53px;
        /deep/ .el-button {
            width: 108px;
            height: 36px;
            padding: 0;
        }
        button+button {
            margin-left: 40px;
        }
    }
</style>