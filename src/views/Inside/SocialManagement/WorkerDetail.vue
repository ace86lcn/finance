<template>
    <div class="white-box padding-align-40">
        <div class="worker-box">
            <div class="worker">
                <img :src="worker.headImage" :onerror="errorHeader"/>
                <h2>{{worker.workerName}}</h2>
                <div class="worker-detail">
                    <p>
                        <span>身份证号：{{worker.idCardNumber}}</span>
                        <span>联系方式：{{worker.link_mobile}}</span>
                    </p>
                    <p>
                        <span>所属参建单位：{{worker.corpName}}</span>
                        <span>所属班组：{{worker.teamName}}</span>
                    </p>
                </div>
                <el-button type="primary" @click="$router.push(`/worker-management/detail/${cardNumber}`)">详情信息</el-button>
            </div>
        </div>
        <h2 class="small-title">缴纳社保记录</h2>
        <div class="table-wrap">
            <!-- table -->
            <el-table :data="tableData" class="normal-table">
                <el-table-column prop="payTimeStr" label="缴纳年月"/>
                <el-table-column prop="personalPay" label="社保金额"/>
                <el-table-column prop="statusName" label="到账情况"/>
            </el-table>
            <!-- 分页 -->
            <pages :page.sync="page" :total="total"/>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                tableData: [],
                page: 1,
                total: 0,
                worker: {}
            }
        },
        watch: {
            'page'(val) {      //切换页数
                this.getList()
            }
        },
        computed: {
            ...mapState(['errorHeader']),
            id() {
                return this.$route.params.id
            },
            cardNumber() {
                return this.$route.query.cardNumber
            }
        },
        methods: {
            getList() {
                // 缴纳社保记录
                this.$http(this.$api.social.SocialPeopleDetail, {
                    socialId: this.id,
                    pageNum:  this.page
                })
                .then(res => {
                    this.total     = res.total
                    this.tableData = res.records
                })
            }
        },
        created() {
            // 工人详情
            this.$http(this.$api.worker.WorkerDetail, {
                projectId: this.$store.state.projectId,
                cardNum:   this.cardNumber
            })
            .then(res => {
                this.worker = res
            })
            this.getList()
        }
    }
</script>

<style lang="scss" scoped>
    .worker-box {
        display: flex;
        .worker {
            background-color: rgba(0, 0 ,0, .03);
            padding: 30px 89px 33px 40px;
            display: flex;
            align-items: center;
            img {
                width: 60px;
                height: 60px;
            }
            h2 {
                font-size: 20px;
                color: #111;
                margin-left: 30px;
            }
        }
        .worker-detail {
            margin-left: 50px;
            p {
                display: flex;
                &:last-child {
                    margin-top: 29px;
                }
                span {
                    font-size: 16px;
                    line-height: 16px;
                    color: #111;
                    &:first-child {
                        width: 382px;
                    }
                    &:last-child {
                        width: 256px;
                    }
                }
            }
        }
        /deep/ .el-button {
            width: 108px;
            height: 36px;
            padding: 0;
        }
    }
    .small-title {
        margin-top: 54px;
        font-size: 20px;
        line-height: 20px;
        color: #111;
        margin-bottom: 20px;
    }
    .table-wrap {
        width: 1047px;
    }
</style>