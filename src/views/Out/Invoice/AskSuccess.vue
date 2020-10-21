<template>
    <div class="white-box padding-align-40 right-box-along">
        <div class="cancaled">
            <img :src="require('@/assets/images/icon-right.png')"/>
            <div class="canceled-r">
                <h2>发票索取成功，正在为您开票中...</h2>
                <p>发票开具完成，会有短信通知您，请注意查收！</p>
            </div>
        </div>
        <div class="bottom-btn">
            <el-button type="primary" @click="$router.replace('/invoice-management/askfor-invoice')">继续索取发票</el-button>
            <el-button @click="$router.replace('/invoice-management/index')">查看我的发票</el-button>
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
            p {
                margin-top: 30px;
                font-size: 14px;
                line-height: 40px;
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
            &:not(:first-child) {
                margin-left: 40px;
            }
        }
    }
</style>