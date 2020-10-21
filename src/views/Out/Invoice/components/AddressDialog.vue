<template>
    <el-dialog
        :visible.sync="show"
        :width="width"
        :before-close="handleClose"
        :center="true"
        title="温馨提示">
        <div class="dialog-content">
            <h2 class="small-title">{{title}}</h2>
            <el-form :model="ruleForm" 
                     ref="ruleForm" 
                     label-width="100px" 
                     label-position="left"
                     :rules="rules">
                <el-form-item label="姓名：" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入收件人姓名"/>
                </el-form-item>
                <el-form-item label="手机号：" prop="mobile">
                    <el-input v-model="ruleForm.mobile" placeholder="请输入收件人手机号"/>
                </el-form-item>
                <el-form-item label="地址：" prop="address">
                    <el-input type="textarea"
                              :rows="3" 
                              v-model="ruleForm.address" 
                              placeholder="请输入地址"/>
                </el-form-item>
            </el-form>
            <el-checkbox v-model="ruleForm.isDefault">设为默认寄送地址</el-checkbox>
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
                    if(this.title == '编辑地址') {
                        this.ruleForm = {
                            name:      this.editItem.name,
                            mobile:    this.editItem.mobile,
                            address:   this.editItem.address,
                            isDefault: this.editItem.defaultStatus == 1 ? true : false
                        }
                    } else {
                        this.ruleForm = {
                            name: '',
                            mobile: '',
                            address: '',
                            isDefault: false
                        }
                    }
                }
            }
        },
        data() {
            return {
                ruleForm: {
                    name: '',
                    mobile: '',
                    address: '',
                    isDefault: false
                },
                rules: {
                    name: [
                        { required: true, message: '请输入收件人姓名', trigger: 'blur' },
                    ],
                    mobile: [
                        { required: true, message: '请输入收件人手机号', trigger: 'blur' },
                    ],
                    address: [
                        { required: true, message: '请输入地址', trigger: 'blur' },
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
                            name:          this.ruleForm.name,
                            mobile:        this.ruleForm.mobile,
                            defaultStatus: this.ruleForm.isDefault ? 1 : 0,
                            address:       this.ruleForm.address
                        }
                        if(this.title == '编辑地址') {
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
        /deep/ .el-form {
            margin-top: 30px;
            .el-form-item__label {
                font-size: 14px;
                color: #111;
                padding-right: 10px;
            }
            .el-textarea {
                width: 100% !important;
            }
            .el-form-item {
                margin-bottom: 22px !important;
            }
        }
    }
</style>