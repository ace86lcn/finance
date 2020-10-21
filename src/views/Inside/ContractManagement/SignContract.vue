<template>
    <div class="write-contract white-box padding-align-40">
        <!-- 甲方 -->
        <div class="jiafang">
            <h4 class="title-1">甲方：</h4>
            <span class="lable-1">公司名称：</span>
            <el-select v-model="companyActive" 
                       placeholder="请选择公司" 
                       style="width: 300px"
                       @change="changeCompony">
                <el-option v-for="item in CompanyPullDownList"
                           :key="item.bcorpID"
                           :label="item.corpName"
                           :value="item.corpCode"/>
            </el-select>
        </div>
        <!-- 乙方 -->
        <div class="yifang">
            <h4 class="title-1">乙方：</h4>
            <div class="yifang-r">
                <p class="yifang-item">
                    <span>姓名：</span>
                    <span>{{worker.workerName}}</span>
                </p>
                <p class="yifang-item">
                    <span>身份证号：</span>
                    <span>{{worker.idCardNumber}}</span>
                </p>
                <p class="yifang-item">
                    <span>联系方式：</span>
                    <span>{{worker.link_mobile}}</span>
                </p>
            </div>
        </div>
        <!-- 合同信息 -->
        <h2 class="title-2">请完善合同信息</h2>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="155px">
            <el-form-item label="所属班组:" prop="teamActive">
                <el-select v-model="ruleForm.teamActive" 
                           placeholder="请选择班组" 
                           style="width: 100%"
                           :disabled="!companyActive">
                    <el-option v-for="item in teams"
                               :key="item.teamID"
                               :label="item.teamName"
                               :value="item.teamID"/>
                </el-select>
            </el-form-item>
            <el-form-item label="职位:" prop="jobLevelTwo">
                <div class="job-level">
                    <el-select v-model="ruleForm.jobLevelOne" 
                               placeholder="请选择一级职位">
                        <el-option v-for="item in jobsLevelOne"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id"/>
                    </el-select>
                    <el-select v-model="ruleForm.jobLevelTwo" 
                               placeholder="请选择二级职位" 
                               :disabled="!ruleForm.jobLevelOne"
                               style="margin-left: 40px"
                               @change="isEdit = true">
                        <el-option v-for="item in jobsLevelTwo"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id"/>
                    </el-select>
                </div>
            </el-form-item>
            <el-form-item label="试用期薪资:">
                <el-col :span="11">
                    <el-form-item prop="syqPrice">
                        <el-input v-model="ruleForm.syqPrice" 
                                  placeholder="请输入试用期薪资"/>
                    </el-form-item>
                </el-col>
                <el-col class="item-line" :span="3">元 /</el-col>
                <el-col :span="10">
                    <el-form-item prop="syqPrice">
                        <el-select v-model="ruleForm.dateType" 
                                   placeholder="请选择"
                                   style="width: 160px">
                            <el-option label="每天" :value="0"/>
                            <el-option label="每月" :value="1"/>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="试用期:">
                <el-col :span="9">
                    <el-date-picker type="date" 
                                    placeholder="请选择时间" 
                                    v-model="ruleForm.date1" 
                                    style="width: 100%"
                                    @change="changeDate1"/>
                </el-col>
                <el-col class="item-line" :span="2">-</el-col>
                <el-col :span="9">
                    <el-date-picker type="date" 
                                    placeholder="请选择时间" 
                                    v-model="ruleForm.date2" 
                                    style="width: 100%"
                                    :picker-options="syqPickerOptions"/>
                </el-col>
            </el-form-item>
            <el-form-item label="正式薪资:" prop="zsPrice">
                <el-col :span="11">
                    <el-form-item prop="syqPrice">
                        <el-input v-model="ruleForm.zsPrice" 
                                  placeholder="请输入正式薪资"/>
                    </el-form-item>
                </el-col>
                <el-col class="item-line" :span="3">元 /</el-col>
                <el-col :span="10">
                    <el-form-item prop="syqPrice">
                        <el-select v-model="ruleForm.dateType" 
                                   placeholder="请选择"
                                   style="width: 160px">
                            <el-option label="每天" :value="0"/>
                            <el-option label="每月" :value="1"/>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="任用期限:" prop="date4">
                <el-col :span="9">
                    <el-date-picker type="date" 
                                    placeholder="请选择时间" 
                                    v-model="ruleForm.date3" 
                                    style="width: 100%"
                                    @change="changeDate3"/>
                </el-col>
                <el-col class="item-line" :span="2">-</el-col>
                <el-col :span="9">
                    <el-date-picker type="date" 
                                    placeholder="请选择时间" 
                                    v-model="ruleForm.date4" 
                                    style="width: 100%"
                                    :picker-options="zsPickerOptions"/>
                </el-col>
            </el-form-item>
            <el-form-item label="是否缴纳社保:" required>
                <el-radio-group v-model="ruleForm.isSocial" :disabled="ruleForm.dateType == 0">
                    <el-radio :label="1">缴纳</el-radio>
                    <el-radio :label="0">不缴纳</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <div class="bottom-btn">
            <el-button @click="goBack()">返回上一页</el-button>
            <el-button type="primary" @click="previewContract('ruleForm')">合同预览</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">提交工人签署</el-button>
        </div>
        <!-- 合同状态 -->
        <div class="status" v-if="id">
            <h2 class="status-text">待修改</h2>
            <div class="change-box">
                <h2>修改原因</h2>
                <p>{{detail.updateReason}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { timestampToTime } from '@/utils/utils'
    export default {
        data() {
            return {
                loading: '',
                detail: '',
                isEdit: false,
                companyActive: '',
                worker: '',             //工人信息
                teams: [],
                jobsLevelOne: [],       //一级职位列表
                jobsLevelTwo: [],       //二级职位列表
                ruleForm: {
                    teamActive: '', //所属班组
                    jobLevelOne: '',//一级职位
                    jobLevelTwo: '',//二级职位
                    syqPrice: '',   //试用期薪资
                    dateType: '',   //薪资结算周期
                    date1: '',      //试用期
                    date2: '',
                    isSocial: '',   //是否缴纳社保
                    zsPrice: '',   //正式薪资
                    date3: '',      //任用期限
                    date4: ''
                },
                rules: {
                    teamActive: [
                        { required: true, message: '请选择必选项', trigger: 'change' }
                    ],
                    jobLevelTwo: [
                        { required: true, message: '请选择必选项', trigger: 'change' }
                    ],
                    zsPrice: [
                        { required: true, message: '请选择必选项', trigger: 'change' }
                    ],
                    dateType: [
                        { required: true, message: '请选择必选项', trigger: 'change' }
                    ],
                    date3: [
                        { required: true, message: '请选择必选项', trigger: 'change' }
                    ],
                    date4: [
                        { required: true, message: '请选择必选项', trigger: 'change' }
                    ]
                },
                syqPickerOptions: {},
                zsPickerOptions: {}
            }
        },
        watch: {
            'ruleForm.jobLevelOne'(val) {
                this.ruleForm.jobLevelTwo = ''
                // 获取二级职位列表
                this.$http(this.$api.contract.JobLevelTwo, {
                    levelOneId: this.ruleForm.jobLevelOne
                })
                .then(res => {
                    this.jobsLevelTwo = res
                    if(this.id && !this.isEdit) {
                        // 编辑的时候第一次填充职位
                        this.ruleForm.jobLevelTwo = this.detail.positionLevelTwo
                    }
                    this.isEdit = true
                })
            },
            'ruleForm.dateType'(val) {
                if(val == 0) {
                    this.ruleForm.isSocial = ''
                }
            } 
        },
        computed: {
            ...mapState(['CompanyPullDownList', 'projectId']),
            cardNumber() {
                return this.$route.query.cardNumber     //工人身份证号
            },
            id() {
                return this.$route.query.id             //合同id
            },
            workerId() {
                return this.$route.query.workerId       //工人id
            },
            contractId() {
                return this.$route.query.contractId     //合同id
            }
        },
        methods: {
            // 切换企业，获取班组
            changeCompony(val) {
                if(!val) {
                    this.ruleForm.teamActive = ''
                }
                
                if(this.companyActive) {
                    this.$http(this.$api.pulldown.TeamPullDown, {
                        projectId: this.projectId,
                        corpCode:  this.companyActive
                    })
                    .then(res => {
                        this.teams = res
                    })
                }
            },
            // 合同预览
            previewContract(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(!this.companyActive || !this.ruleForm.teamActive) {
                        this.$msg.Warning('请选择公司和班组')
                    } else {
                        this.loading = this.$loading({
                            lock: true,
                            text: 'Loading',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        })
                        // 企业id
                        let corporationId = this.CompanyPullDownList.find(item => item.corpCode == this.companyActive).bcorpID
                        let params = {
                            projectId:            this.projectId, 
                            corporationId:        corporationId, 
                            workerId:             this.workerId, 
                            teamId:               this.ruleForm.teamActive, 
                            positionLevelOne:     this.ruleForm.jobLevelOne, 
                            positionLevelTwo:     this.ruleForm.jobLevelTwo, 
                            probationSalary:      this.ruleForm.syqPrice, 
                            probationStartTime:   this.ruleForm.date1 ? timestampToTime(this.ruleForm.date1) : '', 
                            probationEndTime:     this.ruleForm.date2 ? timestampToTime(this.ruleForm.date2) : '', 
                            officialSalary:       this.ruleForm.zsPrice, 
                            appointmentStartTime: this.ruleForm.date3 ? timestampToTime(this.ruleForm.date3) : '', 
                            appointmentEndTime:   this.ruleForm.date4 ? timestampToTime(this.ruleForm.date4) : '', 
                            settlementType:       this.ruleForm.dateType, 
                            paySocialSecurity:    this.ruleForm.isSocial 
                        }
                        
                        this.$http(this.$api.contract.PreviewContract, params)
                        .then(res => {
                            this.loading.close()
                            window.open(res, '_blank')
                        })
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            // 提交保存
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(!this.companyActive || !this.ruleForm.teamActive) {
                        this.$msg.Warning('请选择公司和班组')
                    } else {
                        if(this.ruleForm.syqPrice && (this.ruleForm.zsPrice*1 < this.ruleForm.syqPrice*1)) {
                            this.$msg.Warning('正式薪资不能小于试用期薪资')
                            return false
                        }
                        if(this.ruleForm.dateType == 1 && (this.ruleForm.isSocial !== 0 && this.ruleForm.isSocial !== 1)) {
                            this.$msg.Warning('请填写完整')
                            return false
                        }  
                        
                        this.$msg.MsgBox('请核对合同内容无误后再提交，确认提交？')
                        .then(() => {
                            this.loading = this.$loading({
                                lock: true,
                                text: 'Loading',
                                spinner: 'el-icon-loading',
                                background: 'rgba(0, 0, 0, 0.7)'
                            })
                            // 企业id
                            let corporationId = this.CompanyPullDownList.find(item => item.corpCode == this.companyActive).bcorpID
                            let params = {
                                contractType:         0,
                                projectId:            this.projectId, 
                                corporationId:        corporationId, 
                                workerId:             this.workerId, 
                                teamId:               this.ruleForm.teamActive, 
                                positionLevelOne:     this.ruleForm.jobLevelOne, 
                                positionLevelTwo:     this.ruleForm.jobLevelTwo, 
                                probationSalary:      this.ruleForm.syqPrice, 
                                probationStartTime:   this.ruleForm.date1 ? timestampToTime(this.ruleForm.date1) : '', 
                                probationEndTime:     this.ruleForm.date2 ? timestampToTime(this.ruleForm.date2) : '', 
                                officialSalary:       this.ruleForm.zsPrice, 
                                appointmentStartTime: timestampToTime(this.ruleForm.date3), 
                                appointmentEndTime:   timestampToTime(this.ruleForm.date4), 
                                settlementType:       this.ruleForm.dateType, 
                                paySocialSecurity:    this.ruleForm.isSocial 
                            }
                            // 判断是否为修改，并使用不同接口
                            let httpUrl
                            if(this.id) {
                                httpUrl = this.$api.contract.EditContract
                                params.contractId = this.contractId
                            } else {
                                httpUrl = this.$api.contract.AddContract
                            }
                            this.$http(this.$api.contract.AddContract, params)
                            .then(res => {
                                this.loading.close()
                                if(res) {
                                    this.$msg.Success('提交成功')
                                    this.$router.replace('/contract-management/wait-protocol')
                                } else {
                                    this.$msg.Warning('提交失败')
                                }
                            })
                        })
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            // 返回上一页
            goBack() {
                this.$msg.MsgBox('返回上一页后页面数据将不能恢复，确认返回？')
				.then(() => {
					this.$router.back()
				})
            },
            changeDate1() {
                let that = this
                this.syqPickerOptions = {
                    disabledDate(time) {
                        return time.getTime() < Date.parse(that.ruleForm.date1)+1 * 24 * 60 * 60 * 1000
                    }
                }
            },
            changeDate3() {
                let that = this
                this.zsPickerOptions = {
                    disabledDate(time) {
                        return time.getTime() < Date.parse(that.ruleForm.date3)+1 * 24 * 60 * 60 * 1000
                    }
                }
            }
        },
        async created() {
            // 获取工人信息
            let worker = await this.$http(this.$api.worker.WorkerDetail, {
                projectId: this.projectId,
                cardNum:   this.cardNumber
            })
            this.worker = worker
            // 获取一级职位列表
            let jobLevelOne   = await this.$http(this.$api.contract.JobLevelOne)
            this.jobsLevelOne = jobLevelOne
            if(this.id) {   //待修改
                let detail  = await this.$http(this.$api.contract.ContractDetail, { contractId: this.id })
                this.detail = detail
                this.companyActive = this.CompanyPullDownList.find(item => item.bcorpID == detail.corporationId).corpCode
                this.changeCompony('have')
                this.ruleForm = {
                    teamActive:  detail.teamId+'',
                    jobLevelOne: detail.positionLevelOne,
                    jobLevelTwo: detail.positionLevelTwo,
                    syqPrice:    detail.probationSalary,   
                    dateType:    detail.settlementType,   
                    date1:       Date.parse(detail.probationStartTime),      
                    date2:       Date.parse(detail.probationEndTime),
                    isSocial:    detail.paySocialSecurity,   
                    zsPrice:     detail.officialSalary,   
                    date3:       Date.parse(detail.appointmentStartTime),      
                    date4:       Date.parse(detail.appointmentEndTime)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './signContact.scss';
    .bottom-btn {
        padding-top: 73px;
    }
</style>