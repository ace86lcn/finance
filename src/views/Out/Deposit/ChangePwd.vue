<template>
    <div class="white-box padding-align-40 right-box-along">
        <div class="box">
            <h2 class="title">修改支付密码</h2>
            <!-- 步骤条 -->
            <div :class="['steps-box', {'steps-box-active': activeStep == 2}]">
                <span :class="['steps-item', {'steps-item-active': item.id <= activeStep}]"
                      v-for="item in steps"
                      :key="item.id">{{item.title}}</span>
            </div>
            <h3 class="phone-title">{{activeStep == 1 ? '请输入原支付密码（六位数字）' : '请输入新的支付密码（六位数字）'}}</h3>
            <!-- 第一步展示的内容 -->
            <template v-if="activeStep == 1">
                <el-input placeholder="请输入原支付密码..." 
                          prefix-icon="iconfont iconpassword" 
                          v-model="oldPwd" 
                          style="margin-top: 72px"
                          type="password"
                          :maxlength="6"/>
            </template>
            <!-- 第二步展示的内容 -->
            <template v-else>
                <el-input placeholder="请输入新支付密码..." 
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
    export default {
        data() {
            return {
                oldPwd: '',
                newPwd: '',            //密码
                repeatPwd: '',
                activeStep: 1,         //1：手机号验证  2：修改密码
                steps: [{
                    id: 1,
                    title: '第一步，输入原支付密码'
                }, {
                    id: 2,
                    title: '第二步，设置新支付密码'
                }]
            }
        },
        methods: {
            // 第一步要进行第二步
            nextStep() {
                if(!this.oldPwd) {
                    this.$msg.Warning('请填写完整')
                } else {
                    // 接口验证密码是否正确
                    this.$http(this.$api.common.CheckOldPwd, {
                        password: this.oldPwd,
                        type: 2
                    })
                    .then(res => {
                        if(res) {
                            this.activeStep = 2
                        } else {
                            this.$msg.Warning('验证失败')
                        }
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
                    this.$http(this.$api.common.EditPwd, {
                        password: this.oldPwd,
                        newPassword: this.newPwd,
                        type: 2
                    })
                    .then(res => {
                        this.$router.replace('/deposit/set-success?type=修改')
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
                margin-top: 56px;
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
</style>