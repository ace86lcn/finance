<template>
    <el-dialog
        :visible.sync="show"
        :width="width"
        :before-close="handleClose"
        :center="true"
        title="温馨提示">
        <div class="dialog-content">
            <h2 class="small-title">{{title}}</h2>
            <el-radio-group v-model="ruleForm.radio">
                <el-radio :label="0">企业</el-radio>
                <el-radio :label="1">个人及政府事业单位</el-radio>
            </el-radio-group>
            <el-form :model="ruleForm" 
                     ref="ruleForm" 
                     label-width="100px" 
                     label-position="left"
                     :rules="rules">
                <el-form-item label="发票抬头：" prop="invoice">
                    <el-input v-model="ruleForm.invoice" placeholder="请输入抬头名称"/>
                </el-form-item>
                <el-form-item label="税号：" prop="number">
                    <el-input v-model="ruleForm.number" placeholder="输入纳税人税号"/>
                </el-form-item>
            </el-form>
            <el-checkbox v-model="ruleForm.isDefault">设为默认抬头信息</el-checkbox>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" @click="handleConfirm('ruleForm')">确认</el-button>
        </span>
    </el-dialog>
</template>

<script>
    export default {
        props: {
			title: {
				type: String
			},
            show: {
                type: Boolean,
                default: false
            },
            width: {
                type: String,
                default: '411px'
            },
            editItem: {
                type: Object
            }
        },
        watch: {
            show(bol) {
                if(bol) {
                    if(this.title == '编辑抬头') {
                        this.ruleForm = {
                            radio:     this.editItem.invoiceType,
                            invoice:   this.editItem.companyName,
                            number:    this.editItem.ein,
                            isDefault: this.editItem.defaultStatus == 1 ? true : ''
                        }
                    } else {
                        this.ruleForm = {
                            radio:     0,
                            invoice:   '',
                            number:    '',
                            isDefault: false
                        }
                    }
                }
            }
        },
        data() {
            return {
                ruleForm: {
                    radio: 0,
                    invoice: '',
                    number: '',
                    isDefault: false
                },
                rules: {
                    invoice: [
                        { required: true, message: '请输入抬头名称', trigger: 'blur' },
                    ],
                    number: [
                        { required: true, message: '输入纳税人税号', trigger: 'blur' },
                    ]
                }
            }
        },
        methods: {
            handleClose() {
                this.$emit('close')
            },
            handleConfirm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            companyName:   this.ruleForm.invoice,
                            ein:           this.ruleForm.number,
                            invoiceType:   this.ruleForm.radio,
                            defaultStatus: this.ruleForm.isDefault ? 1: 0
                        }
                        if(this.title == '编辑抬头') {
                            params.id = this.editItem.id
                        }
                        this.$emit('confirm', params)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    /deep/ .el-dialog__title {
        font-size: 16px;
        line-height: 40px;
        color: #fff;
    }
	/deep/ .el-dialog__body {
		padding:  20px 35px 26px 22px;
	}
    /deep/ .el-button {
        width: 108px;
        height: 36px;
        padding: 0;
    }
    /deep/ .el-button+.el-button {
        margin-left: 32px;
    }
	/deep/ .el-dialog__header {
		height: 40px;
		background-color: $color;
		padding: 0;
        padding-left: 20px;
        text-align: left;
	}
	/deep/ .el-dialog__footer {
		padding: 0 72px 30px;
	}
    .dialog-content {
        .small-title {
            font-size: 18px;
            color: #111;
        }
        /deep/ .el-radio-group {
            margin-top: 30px;
            .el-radio {
                margin-right: 45px;
            }
        }
        /deep/ .el-form {
            margin-top: 20px;
            .el-form-item__label {
                font-size: 14px;
                color: #111;
                padding-right: 10px;
            }
        }
    }
</style>