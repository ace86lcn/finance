<template>
    <div class="white-box padding-align-40">
        <h2 class="big-title" style="padding-bottom:8px">考勤规则设置</h2>
        <div class="rule-item">
            <span class="rule-item-text">1.每月按</span>
            <el-input placeholder="请输入" v-model="days"/>
            <span class="rule-item-text">天计算</span>
        </div>
        <div class="rule-item">
            <span class="rule-item-text">2.每天标准工作时长</span>
            <el-input placeholder="请输入" v-model="hours"/>
            <span class="rule-item-text">小时</span>
        </div>
        <h2 class="big-title" style="margin-top: 80px">自动结算设置</h2>
        <div class="rule-item">
            <span class="rule-item-text">1.开启自动结算功能</span>
            <el-radio-group v-model="open">
                <el-radio :label="1">开启</el-radio>
                <el-radio :label="0">关闭</el-radio>
            </el-radio-group>
        </div>
        <div class="rule-item">
            <span class="rule-item-text">2.每月</span>
             <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"/>
            </el-select>
            <span class="rule-item-text">日发放工人工资</span>
        </div>
        <h2 class="big-title" style="margin-top: 80px">其他规则设置</h2>
        <div class="rule-item other-rules">
            <span class="rule-item-text">1.社保缴纳地区</span>
            <el-select v-model="socialProvinceText" placeholder="请选择省">
                <el-option v-for="item in socialProvinces"
                           :key="item"
                           :label="item"
                           :value="item"/>
            </el-select>
            <el-select v-model="socialCityText" 
                       placeholder="请选择市"
                       :disabled="!socialProvinceText"
                       @change="getSocialOne()">
                <el-option v-for="item in socialCitys"
                           :key="item"
                           :label="item"
                           :value="item"/>
            </el-select>
            <el-select v-model="socialValue" 
                       placeholder="请选择社保基数" 
                       :disabled="!socialCityText">
                <el-option v-for="item in socialOptions"
                           :key="item.amount"
                           :label="item.amount"
                           :value="item.amount"/>
            </el-select>
        </div>
        <p class="social-text">每月企业缴纳金额：{{companyMoney}}元；个人缴纳金额：{{personalMoney}}元</p>
        <div class="rule-item other-rules">
            <span class="rule-item-text">2.个税缴纳地区</span>
            <el-select v-model="taxProvinceText" placeholder="请选择省">
                <el-option v-for="item in taxProvinces"
                           :key="item"
                           :label="item"
                           :value="item"/>
            </el-select>
            <el-select v-model="taxCityText" 
                       placeholder="请选择市"
                       :disabled="!taxProvinceText">
                <el-option v-for="item in taxCitys"
                           :key="item"
                           :label="item"
                           :value="item"/>
            </el-select>
            <span class="rule-item-text" style="margin-left:20px">个税税点：{{taxPointTrue}}%</span>
        </div>
        <div class="bottom-btn">
            <el-button type="primary" @click="save">保存</el-button>
        </div>
    </div>
</template>

<script>
    import { dates } from './date'
    export default {
        data() {
            return {
                days: '',                   //每月多少天
                hours: '',                  //每天多少小时
                open: '',                   //自动结算
                options: dates,             
                value: '',                  //每月几号
                socialProvinces: [],        //社保省选项
                socialProvinceText: '',
                socialCitys: [],            //社保市选项
                socialCityText: '',
                socialOptions: [],          //社保基数选项
                socialValue: '',            //社保基数
                companyMoney: 0,            //企业缴纳金额
                personalMoney: 0,           //个人缴纳金额
                taxProvinces: [],           //个税省选项
                taxProvinceText: '',
                taxCitys: [],               //个税市选项
                taxCityText: '',
                taxPointTrue: 0,            //个税税点//实际税点,
                taxPointFront: 0            //个税税点//名义税点
            }
        },
        watch: {
            // 切换社保一级地区
            socialProvinceText(val) {
               if(val) {
                    this.$http(this.$api.rule.SocialCascade, {
                        province: val
                    })
                    .then(res => {
                        this.socialCitys = res
                    })
               }
            },
            socialValue(val) {
                this.$http(this.$api.rule.GetSocial, {
                    province: this.socialProvinceText,
                    city:     this.socialCityText
                })
                .then(res => {
                    this.socialOptions = JSON.parse(res.socialSecurity)
                    this.getSocialTwo()
                })
            },
            // 切换个税一级地区
            taxProvinceText(val) {
                if(val) {
                    this.$http(this.$api.rule.TaxCascade, {
                        province: val
                    })
                    .then(res => {
                        this.taxCitys = res
                    })
                }
            },
            taxCityText() {
                this.getTax()
            }
        },
        methods: {
            getRules() {
                this.$http(this.$api.rule.GetRules, {
                    projectId: this.$store.state.projectId
                })
                .then(res => {
                    //每月多少天
                    this.days = res.find(item => item.ruleCode == 'MONTH_WORKING_DAY').ruleValue
                    //每天多少小时
                    this.hours = res.find(item => item.ruleCode == 'DAY_WORKING_HOURS').ruleValue
                    //自动结算
                    this.open = res.find(item => item.ruleCode == 'AUTOMATIC_ENABLE').ruleValue == 1 ? 1 : 0
                    //每月几号
                    this.value = res.find(item => item.ruleCode == 'MONTH_SALARY').ruleValue
                    //社保
                    let socialData = res.find(item => item.ruleCode == 'SOCIAL_PAY').ruleBatch
                    //社保地区
                    this.socialProvinceText = socialData[0].value
                    this.socialCityText     = socialData[1].value
                    
                    //社保基数
                    this.socialValue = socialData[2].value ? socialData[2].value : ''
                    //个税地区
                    let taxData = res.find(item => item.ruleCode == 'INCOME_TAX_PAY').ruleBatch
                    this.taxProvinceText = taxData[0].value
                    this.taxCityText     = taxData[1].value
                    
                })
            },
            // 获取社保金额
            getSocialOne() {
                this.$http(this.$api.rule.GetSocial, {
                    province: this.socialProvinceText,
                    city:     this.socialCityText
                })
                .then(res => {
                    this.socialOptions = JSON.parse(res.socialSecurity)
                })
            },
            getSocialTwo() {
                let social         = this.socialOptions.find(item => item.amount == this.socialValue)
                this.companyMoney  = social.amount_company
                this.personalMoney = social.amount_self
            },
            // 获取个税税点
            getTax() {
                this.$http(this.$api.rule.GetTax, {
                    province: this.taxProvinceText,
                    city:     this.taxCityText
                })
                .then(res => {
                    this.taxPointTrue  = res.taxPointTrue
                    this.taxPointFront = res.taxPointFront
                })
            },
            // 保存
            save() {
                let projectId = this.$store.state.projectId
                let rules = [{
                    projectId: projectId,
                    rulesType: 0,
                    ruleCode:  "MONTH_WORKING_DAY",
                    ruleValue: this.days,
                    ruleBatch: []
                }, {
                    projectId: projectId,
                    rulesType: 0,
                    ruleCode:  "DAY_WORKING_HOURS",
                    ruleValue: this.hours,
                    ruleBatch: []
                }, {
                    projectId: projectId,
                    rulesType: 0,
                    ruleCode:  "AUTOMATIC_ENABLE",
                    ruleValue: this.open,
                    ruleBatch: []
                }, {
                    projectId: projectId,
                    rulesType: 0,
                    ruleCode:  "MONTH_SALARY",
                    ruleValue: this.value,
                    ruleBatch: []
                }, {
                    projectId: projectId,
                    rulesType: 1,
                    ruleCode:  "SOCIAL_PAY",
                    ruleValue: '',
                    ruleBatch: [{
                        name:  "省",
                        sort:  1,
                        value: this.socialProvinceText
                    }, {
                        name:  "市",
                        sort:  2,
                        value: this.socialCityText
                    }, {
                        name:  "基数",
                        sort:  3,
                        value: this.socialValue
                    }]
                }, {
                    projectId: projectId,
                    rulesType: 1,
                    ruleCode:  "INCOME_TAX_PAY",
                    ruleValue: '',
                    ruleBatch: [{
                        name:  "省",
                        sort:  1,
                        value: this.taxProvinceText
                    }, {
                        name:  "市",
                        sort:  2,
                        value: this.taxCityText
                    }, {
                        name:  "实际税点",
                        sort:  3,
                        value: this.taxPointTrue
                    }, {
                        name:  "名义税点",
                        sort:  4,
                        value: this.taxPointFront
                    }]
                }]
                
                if(!this.days || !this.hours || !this.value || !this.socialValue || !this.taxCityText) {
                    this.$msg.Warning('请填写完整')
                } else {
                    this.$http(this.$api.rule.RuleEdit, rules)
                    .then(res => {
                        this.$msg.Success('保存成功')
                    })
                }
            }
        },
        async created() {
            // 获取社保一级地区
            let result1 = await this.$http(this.$api.rule.SocialCascade)
            this.socialProvinces = result1
            // 获取个税一级地区
            let result2 = await this.$http(this.$api.rule.TaxCascade)
            this.taxProvinces = result2
            
            // 获取配置规则
            this.getRules()
        }
    }
</script>

<style lang="scss" scoped>
    .big-title {
        font-size: 20px;
        color: #111;
        line-height: 20px;
    }
    .rule-item {
        display: flex;
        align-items: center;
        margin-top: 32px;
        .rule-item-text {
            font-size: 16px;
            color: #333;
        }
        /deep/ .el-input {
            width: 300px;
            margin: 0 27px;
        }
        /deep/ .el-radio {
            margin-right: 0;
            margin-left: 72px;
            .el-radio__label {
                display: inline-block;
                margin-top: 4px;
            }
        }
        .no-margin-l {
            /deep/ .el-input {
                margin-left: 0;
            }
        }
    }
    .social-text {
        font-size: 16px;
        color: #333;
        padding-left: 135px;
        margin-top: 15px;
    }
    .bottom-btn {
        margin-top: 48px;
        /deep/ .el-button {
            width: 108px;
            height: 36px;
            padding: 0;
        }
    }
    .other-rules {
        /deep/ .el-input {
            width: 200px;
            margin: 0;
        }
         /deep/ .el-select {
            width: 200px;
            margin-left: 20px;
        }
    }
</style>