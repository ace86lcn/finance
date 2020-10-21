<template>
    <div class="white-box padding-align-40">
        <div class="cancaled">
            <img :src="require('@/assets/images/icon-right.png')"/>
            <div class="canceled-r">
                <h2>合同作废成功！</h2>
                <p>依国家规定，项目上施工的工人需签订劳务合同后才可上岗，请尽快与该工人签订新的合同！</p>
            </div>
        </div>
        <div class="bottom-btn">
            <el-button type="primary" @click="$router.replace(`/contract-management/choose-contract/${$route.query.cardNumber}?workerId=${$route.query.workerId}`)">拟定新的合同</el-button>
            <el-button @click="$router.replace('/contract-management/signed')">下次再说</el-button>
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