<template>
    <div class="white-box padding-align-40">
        <div class="cancaled">
            <img :src="require('@/assets/images/icon-right.png')"/>
            <div class="canceled-r">
                <h2>恭喜您，支付成功！</h2>
                <p>系统已在为您自动处理工资单，请耐心等待！</p>
            </div>
        </div>
        <div class="bottom-btn">
            <el-button type="primary" @click="$router.push('/payroll-management/wait-pay')">查看工资单</el-button>
            <el-button @click="$router.push('/payroll-management/add-new')">继续新增工资单</el-button>
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
        padding-left: 50px;
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