<template>
    <div class="white-box padding-align-40">
        <h2 class="page-title">请选择合同签约方式</h2>
        <div class="card-group">
            <div :class="['card-item', {'card-item-active': item.id == active}]" v-for="item in list" :key="item.id" @click="chooseWay(item.id)">
                <h2>{{item.title}}</h2>
                <p v-for="(i, index) in item.texts" :key="index">{{i}}</p>
            </div>
        </div>
        <div class="btn-wrap">
            <el-button type="primary" class="back-btn" @click="next">下一步</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [{
                    id: 1,
                    title: '线上签约',
                    texts: ['企业通过平台直接向工人发起在线合同签约申请', '工人登录工人端即可完成在线签约', '同时可以生成纸质合同副本']
                }, {
                    id: 2,
                    title: '线下签约',
                    texts: ['企业与工人已于线下签署纸质合同', '需上传至平台备份']
                }],
                active: ''
            }
        },
        computed: {
            cardNumber() {
                return this.$route.params.cardNumber      
            },
            workerId() {
                return this.$route.query.workerId      
            }
        },
        methods: {
            chooseWay(id) {
                this.active = id
            },
            next() {
                if(!this.active) {
                    this.$msg.Warning('请选择签约方式')
                } else if(this.active == 1) {
                    // 线上签约
                    this.$router.push(`/contract-management/sign-contract?cardNumber=${this.cardNumber}&workerId=${this.workerId}`)
                } else {
                    // 线下签约
                    this.$router.push(`/contract-management/offline-contract?cardNumber=${this.cardNumber}&workerId=${this.workerId}`)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page-title {
        font-size: 20px;
        line-height: 20px;
        color: #111;
    }
    .card-group {
        display: flex;
        margin: 47px 0;
        .card-item {
            border-radius: 10px;
            border: 1px solid #ccc;
            height: 260px;
            width: 354px;
            box-sizing: border-box;
            padding: 50px 28px 0;
            cursor: pointer;
            &:last-child {
                margin-left: 35px;
            }
            &:hover {
                border: 1px solid $color;
                box-shadow: 0px 4px 20px 0px rgba(128, 128, 128, 0.3);
            }
            h2 {
                text-align: center;
                font-weight: normal;
                font-size: 24px;
                color: #111;
                line-height: 24px;
                padding-bottom: 15px;
            }
            p {
                margin-top: 15px;
                font-size: 14px;
                color: #111;
                line-height: 14px;
                text-align: center;
            }
        }
        .card-item-active {
            border: 1px solid $color;
            box-shadow: 0px 4px 20px 0px rgba(128, 128, 128, 0.3);
        }
    }
    .btn-wrap {
        width: 743px;
        text-align: center;
    }
</style>