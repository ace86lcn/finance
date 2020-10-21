<template>
    <div class="white-box padding-align-40">
        <div class="user-top">
            <img :src="detail.headImage" :onerror="errorHeader"/>
            <h2 class="user-name">{{detail.workerName}}</h2>
            <div class="user-top-r">
                <p>
                    <span>身份证号：{{detail.idCardNumber}}</span>
                    <span>联系方式：{{detail.link_mobile}}</span>
                </p>
                <p>
                    <span>所属参建单位：{{detail.corpName}}</span>
                    <span>所属班组：{{detail.teamName}}</span>
                </p>
            </div>
        </div>
        <p class="msg-item" style="margin-top: 72px">
            <span>户口性质：</span>
            <!-- 户口性质 农业 1 城镇 -->
            <span>{{detail.family_type == 1 ? '城镇' : '农业'}}</span>
        </p>
        <p class="msg-item">
            <span>开户行：</span>
            <span>{{detail.openBank}}</span>
        </p>
        <p class="msg-item">
            <span>银行卡号：</span>
            <span>{{detail.bankID}}</span>
        </p>
        <p class="msg-item">
            <span>地址：</span>
            <span>{{detail.address}}</span>
        </p>
        <p class="msg-item">
            <span>工种:</span>
            <span>{{detail.workType}}</span>
        </p>
        <p class="msg-item">
            <span>工人类型：</span>
            <span>{{detail.workRole}}</span>
        </p>
        <p class="msg-item">
            <span>政治面貌：</span>
            <span>{{detail.politicsType}}</span>
        </p>
        <p class="msg-item">
            <span>文化程度：</span>
            <span>{{detail.cultureLevelType}}</span>
        </p>
        <div class="card-group">
            <div class="card-item">
                <span>身份证正面：</span>
                <img :src="detail.positiveIDCardImage"/>
            </div>
            <div class="card-item">
                <span>身份证反面：</span>
                <img :src="detail.negativeIDCardImage"/>
            </div>
        </div>
        <el-button type="primary" class="back-btn" style="margin-top: 90px" @click="$router.back()">返回上一页</el-button>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        computed: {
            ...mapState(['errorHeader']),
            cardNum() {
                return this.$route.params.cardNum       //工人身份证号
            }
        },
        data() {
            return {
                detail: {}      //工人详情
            }
        },
        created() {
            this.$http(this.$api.worker.WorkerDetail, {
                cardNum:   this.cardNum,
                projectId: this.$store.state.projectId
            })
            .then(res => {
                this.detail = res
            })
        }
    }
</script>

<style lang="scss" scoped>
    .user-top {
        display: flex;
        align-items: center;
        img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
        }
        .user-name {
            color: #111;
            font-size: 20px;
            margin-left: 30px;
        }
        .user-top-r {
            margin-left: 50px;
            p {
                line-height: 16px;
                font-size: 16px;
                color: #111;
                display: flex;
                span {
                    &:first-child {
                        width: 380px;
                    }
                    &:last-child {
                        width: 200px;
                    }
                }
                &:last-child {
                    margin-top: 29px;
                }
            }
        }
    }
    .msg-item {
        display: flex;
        align-items: center;
        margin-top: 29px;
        &:nth-child(5) {
            margin-top: 49px;
        }
        span {
            font-size: 16px;
            line-height: 16px;
            &:first-child {
                color: #666;
                width: 120px;
            }
            &:last-child {
                color: #111;
            }
        }
    }
    .card-group {
        display: flex;
        margin-top: 40px;
        .card-item {
            display: flex;
            &:last-child {
                margin-left: 40px;
            }
            span {
                width: 120px;
                font-size: 16px;
                line-height: 16px;
                color: #666;
            }
            img {
                width: 150px;
                height: 90px;
            }
        }
    }
</style>