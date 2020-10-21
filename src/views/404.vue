<template>
    <div class="not-found">
        <div>
            <img :src="img"/>
            <p @click="$router.back()">返回上一页</p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                img: require('@/assets/images/404.gif')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .not-found {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        div {
            margin-top: -10%;
            width: 40%;
            img {
                display: block;
                width: 100%;
                margin: 0 auto;
            }
            p {
                font-size: 20px;
                text-align: center;
                color: rgb(192, 204, 218);
                font-weight: bold;
                text-decoration: underline;
                cursor: pointer;
            }
        }
    }
</style>