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
                <el-button type="primary" @click="$router.push(`/worker-management/detail/${querys.cardNumber}`)">详情信息</el-button>
            </div>
        </div>
        <div class="punch-card">
            <h2>打卡记录</h2>
            <p>
                <span>本日日期：{{querys.time}}</span>
                <span>本日工时：{{workingHours}}小时</span>
            </p>
        </div>
        <!-- table -->
        <el-table :data="tableData" class="normal-table">
            <el-table-column prop="remark" label="打卡设备名称" width="200"/>
            <el-table-column prop="deviceName" label="设备号"/>
            <el-table-column prop="createTime" label="打卡时间"/>
            <el-table-column label="进出方向" width="150">
                <template slot-scope="scope">{{scope.row.state == 1 ? '进' : '出'}}</template>
            </el-table-column>
        </el-table>
        <div class="check-hour">
            <h2>每日工时确认</h2>
            <p v-for="item in checkList" :key="item.calculationHistoryId">
                <span>{{item.createTime}}</span>
                <span>{{item.describe}}</span>
            </p>
        </div>
        <div class="bottom-btn">
            <el-button type="primary" v-if="status == 2" @click="show = true">修改工时</el-button>
            <el-button type="primary">返回上一页</el-button>
        </div>
        <!-- 修改工时 -->
        <handle-dialog :show="show" @close="show = false" @confirm="confirm">
            <div slot="content">
                <p class="slot-title">由于工人或班组长对智能硬件统计工时有异议，请核实工人工时后再填写（保存后不可修改）</p>
                <div class="slot-ipt-group">
                    <span>本日工时：</span>
                    <el-input v-model="workingHours" placeholder="请输入工时"/>
                    <span>小时</span>
                </div>
            </div>
        </handle-dialog>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                tableData: [],         //打卡记录
                show: false,
                checkList: [],         // 确认列表
                worker: {},            // 工人详情
                workingHours: 0,       //工时
                status: ''
            }
        },
        computed: {
            ...mapState(['errorHeader']),
            id() {
                return this.$route.params.id
            },
            querys() {
                return this.$route.query
            }
        },
        methods: {
            // 修改工时确认
            confirm() {
                this.$http(this.$api.attendance.ChangeManHour, {
                    calculationId: this.id,
                    workingHours:  this.workingHours
                })
                .then(res => {
                    this.status = 1
                    this.$msg.Success('修改成功')
                    this.show = false
                    this.getList()
                })
            },
            getList() {
                // 打卡记录
                this.$http(this.$api.attendance.AttendanceRecordDay, {
                    projectId:  this.$store.state.projectId,
                    cardNumber: this.querys.cardNumber,
                    time:       this.querys.time
                })
                .then(res => {
                    this.tableData = res
                })
                // 每日工时确认列表
                this.$http(this.$api.attendance.ManhourDetail, {
                    calculationId: this.id
                })
                .then(res => {
                    this.checkList = res
                })
            }
        },
        created() {
            this.status = this.querys.status
            this.workingHours = this.querys.workingHours
            // 工人信息
            this.$http(this.$api.worker.WorkerDetail, {
                cardNum:   this.querys.cardNumber,
                projectId: this.$store.state.projectId
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
    .punch-card {
        width: 1055px;
        margin-top: 34px;
        h2 {
            font-size: 20px;
            line-height: 20px;
            color: #111;
        }
        p {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            font-size: 16px;
            line-height: 16px;
            color: #111;
        }
    }
    .normal-table {
        margin-top: 20px;
        width: 1055px;
    }
    .check-hour {
        margin-top: 43px;
        h2 {
            font-size: 20px;
            line-height: 20px;
            color: #111;
            padding-bottom: 8px;
        }
        p {
            display: flex;
            margin-top: 12px;
            span {
                font-size: 16px;
                line-height: 16px;
                color: #111;
                &:first-child {
                    width: 214px;
                }
            }
        }
    }
    .bottom-btn {
        width: 1055px;
        text-align: right;
        margin-top: 30px;
        /deep/ .el-button {
            width: 108px;
            height: 36px;
            padding: 0;
            margin-left: 40px;
        }
    }
    .slot-title {
        color: #999;
        font-size: 14px;
    }
    .slot-ipt-group {
        display: flex;
        align-items: center;
        margin-top: 20px;
        span {
            font-size: 18px;
            color: #555;
            font-weight: bold;
        }
        .el-input {
            width: 120px;
            margin-right: 15px;
        }
    }
</style>