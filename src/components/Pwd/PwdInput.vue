<template>
    <div class='am_payPwd' :id="`ids_${id}`">
        <input  type="password"
                maxlength="1"
                @input="changeInput"
                @click="changePwd"
                v-model="pwdList[i]"
                @keyup="keyUp($event)"
                @keydown="oldPwdList = pwdList.length"
                class="shortInput"
                v-for="(v, i) in 6" :key="i"/>
    </div>
</template>

<script>
    export default {
        props: {
            id: String, // 当一个页面有多个密码输入框时，用id来区分
            default: '1'
        },
         data () {
            return {
                pwdList: [],
                oldPwdList: [],
                isDelete: false,
                ipt: ''
            }
        },
        mounted () {　　
            this.ipt = document.querySelectorAll(`#ids_${this.id} .shortInput`)
        },
        methods: {
            keyUp (ev) {
                let index = this.pwdList.length
                if (!index) return
                if (ev.keyCode === 8) {
                    this.isDelete = true
                    if (this.oldPwdList === this.pwdList.length) {
                        if (index === this.pwdList.length) {
                            this.pwdList.pop()
                        }
                        index--
                    } else {
                        index > 0 && index--
                    }
                    this.ipt[index].focus()
                } else if (this.isDelete && index === this.pwdList.length && /^\d$/.test(ev.key)) {
                    this.isDelete = false
                    this.pwdList.pop()
                    this.pwdList.push(ev.key)
                    this.ipt[this.pwdList.length] && this.ipt[this.pwdList.length].focus()
                }
                this.$emit('getPwd', this.pwdList.join(''))
            },
            changePwd () {
                let index = this.pwdList.length
                index === 6 && index--
                this.ipt[index].focus()
            },
            changeInput () {
                let index = this.pwdList.length
                let val = this.pwdList[index - 1]
            　　   if (!/[0-9]/.test(val)) {　
                    this.pwdList.pop() 　　　　  　　　　 
                    return 　　　 　　
                }
                if (!val) {
                    this.pwdList.pop()
                    index--
                    if (index > 0) this.ipt[index - 1].focus()
                } else {
                    if (index < 6) this.ipt[index].focus()
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .am_payPwd {
        display: inline-block;
        width: 242px;
        height: 40px;
        position: relative;
        .shortInput {
            text-align: center;
            font-size: 20px;
            float: left;
            width: 30px;
            height: 38px;
            color: #333;
            outline: #ff0067;
            border: none;
            border: 1px solid #ccc;
            margin-right: 10px;
            border-radius: 4px;
            &:last-child {
                margin-right: 0;
            }
            &:focus {
                border-color: $color;
            }
        }
    }
</style>