<template>
    <div class="white-box padding-align-40 right-box-along">
        <div class="cancaled">
            <img :src="require('@/assets/images/icon-right.png')"/>
            <div class="canceled-r">
                <h2>登录密码设置成功！</h2>
            </div>
        </div>
        <div class="bottom-btn">
            <el-button type="primary" @click="$router.replace('/set/index')">返回账户设置</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .cancaled {
        display: flex;
        align-items: center;
        padding-left: 20px;
        padding-top: 20px;
        img {
            width: 100px;
            height: 100px;
        }
        .canceled-r {
            padding-left: 39px;
            h2 {
                font-size: 30px;
                line-height: 30px;
                color: #111;
            }
        }
    }
    .bottom-btn {
        display: flex;
        margin-top: 52px;
        padding-left: 68px;
        button {
            width: 108px;
            height: 36px;
            padding: 0;
        }
    }
</style>