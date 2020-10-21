<template>
    <div class="white-box padding-align-40 right-box-along">
        <div class="box">
            <h2 class="title">{{title}}</h2>
            <!-- 步骤条 -->
            <div :class="['steps-box', {'steps-box-active': activeStep == 2}]">
                <span :class="['steps-item', {'steps-item-active': item.id <= activeStep}]"
                      v-for="item in steps"
                      :key="item.id">{{item.title}}</span>
            </div>
            <h3 class="phone-title">{{activeStep == 1 ? '请验证您的手机号' : '请输入新的支付密码（六位数字）'}}</h3>
            <!-- 第一步展示的内容 -->
            <template v-if="activeStep == 1">
                <p class="your-mobile">您的手机号: <span>{{adminMobile}}</span></p>
                <div class="code-ipt">
                    <el-input placeholder="请输入验证码..." 
                              prefix-icon="iconfont iconpassword" 
                              v-model="code"
                              style="width: 180px"/>
                    <el-button slot="suffix"  
                               type="primary" 
                               v-if="!verification" 
                               @click="startLow">获取验证码</el-button>
                    <el-button slot="suffix" 
                               type="info"  
                               plain 
                               disabled 
                               v-else>{{timer}}s</el-button>
                </div>
            </template>
            <!-- 第二步展示的内容 -->
            <template v-else>
                <el-input placeholder="请输入支付密码..." 
                          prefix-icon="iconfont iconpassword" 
                          v-model="newPwd" style="margin-top: 42px" 
                          type="password"
                          :maxlength="6"/>
                <el-input placeholder="请确认支付密码..." 
                          prefix-icon="iconfont iconpassword" 
                          v-model="repeatPwd" style="margin-top: 19px" 
                          type="password"
                          :maxlength="6"/>
            </template>
            <button class="login-btn" @click="nextStep" v-if="activeStep == 1">下一步</button>
            <button class="login-btn" @click="save" v-else>保存密码</button>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { encryptByDES } from '@/utils/utils'
    export default {
        components: {
            'pwd-input': () => import('@/components/Pwd/PwdInput')
        },
        data() {
            return {
                newPwd: '',            //密码
                repeatPwd: '',
                activeStep: 1,         //1：手机号验证  2：修改密码
                code: '',              //验证码
                timer: 60,             //倒计时时间
                verification: false,   //是否开始倒计时
                auth_timer: '',        //倒计时函数
                steps: [{
                    id: 1,
                    title: '第一步，核实您的身份'
                }, {
                    id: 2,
                    title: '第二步，设置支付密码'
                }]
            }
        },
        computed: {
            ...mapState(['adminMobile']),
            title() {
                return this.$route.query.title
            },
            type() {
                return this.$route.query.type           //发送验证码类型
            }
        },
        methods: {
            // 发送验证码，开始倒计时
            startLow() {
                // 接口发送
                this.$http(this.$api.common.SendCode, {
                    phone: this.adminMobile,
                    type:  this.type
                })
                .then(res => {
                    this.$msg.Success('发送成功')
                    clearInterval(this.auth_timer)
                    this.verification = true
                    this.auth_timer = setInterval(()=>{     //定时器设置每秒递减
                        this.timer--;                       //递减时间
                        if(this.timer<=0){  
                            this.verification = false;      //60s时间结束还原v-show状态并清除定时器
                            clearInterval(this.auth_timer)
                        }
                    },1000)
                })
            },
            // 第一步要进行第二步
            nextStep() {
                if(!this.code) {
                    this.$msg.Warning('请填写完整')
                } else {
                    // 接口验证验证码是否正确
                    this.$http(this.$api.common.CheckForgetCode, {
                        phone: this.adminMobile,
                        code:  this.code
                    })
                    .then(res => {
                        this.activeStep = 2
                    })
                }
            },
            // 保存修改密码
            save() {
                if(!this.newPwd || !this.repeatPwd) {
                    this.$msg.Warning('请填写完整')
                } else if(this.newPwd !== this.repeatPwd) {
                    this.$msg.Warning('两次密码输入不一致')
                } else {
                    // 接口修改密码
                    this.$http(this.$api.common.FindPwd, {
                        phone:       encryptByDES(this.adminMobile),
                        newPassword: this.newPwd,
                        type:        2
                    })
                    .then(res => {
                        this.$router.replace('/deposit/set-success?type=设置')
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .white-box {
        position: relative;
        .box {
            width: 550px;
            box-sizing: border-box;
            background-color: #fff;
            padding-top: 60px;
            .title {
                color: #333;
                font-size: 30px;
                letter-spacing: 1px;
                line-height: 30px;
            }
            .steps-box {
                display: flex;
                justify-content: space-between;
                margin-top: 56px;
                position: relative;
                &::after {
                    content: "";
                    position: absolute;
                    width: 80px;
                    height: 1px;
                    top: 8px;
                    left: 238px;
                    background-color: #ccc;
                }
                .steps-item {
                    color: #999;
                    font-size: 16px;
                    line-height: 16px;
                    position: relative;
                    padding-left: 22px;
                    &::before {
                        content: "";
                        position: absolute;
                        width: 16px;
                        height: 16px;
                        box-sizing: border-box;
                        border: 2px solid #ccc;
                        border-radius: 50%;
                        top: 1px;
                        left: 0;
                    }
                }
                .steps-item-active {
                    color: $color;
                    &::before {
                        border: 2px solid $color;
                    }
                    &::after {
                        content: "";
                        position: absolute;
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        top: 5px;
                        left: 4px;
                        background-color: $color;
                    }
                }
            }
            .steps-box-active {
                &::after {
                    background-color: $color;
                }
            }
            .small-title {
                font-size: 16px;
                color: #111;
            }
            .pwd-box {
                margin-top: 27px;
                /deep/ .am_payPwd {
                    width: 300px;
                    .shortInput:not(:last-child) {
                        margin-right: 21px;
                    }
                }
            }
            .phone-title {
                margin-top: 75px;
                color: $color;
                font-size: 20px;
                line-height: 20px;
            }
            /deep/ .el-input {
                background-color: transparent;
                width: 300px;
            }
            /deep/ .el-input__inner {
                border-radius: 4px;
                height: 36px;
                font-weight: 600;
                color: #666;
                font-size: 12px;
                padding-left: 34px;
                letter-spacing: 1px;
                border-color: #999;
            }
            /deep/ .el-input__icon {
                line-height: 36px;
                margin-left: 4px;
                font-size: 18px;
                color: #666;
            }
            .login-btn {
                width: 300px;
                background-color: $color;
                display: block;
                height: 36px;
                margin-top: 60px;
                border: none;
                border-radius: 4px;
                font-size: 14px;
                color: #fff;
                cursor: pointer;
                &:active {
                    background-color: $active_color;
                }
            }
        }
    }
    /deep/ .iconfont {
        font-size: 22px !important;
    }
    .code-ipt {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 39px;
        width: 300px;
        button {
            width: 108px;
            height: 36px;
            padding: 0;
        }
    }
    .your-mobile {
        font-size: 12px;
        color: #001111;
        line-height: 12px;
        margin-top: 42px;
        span {
            margin-left: 20px;
        }
    }
</style>