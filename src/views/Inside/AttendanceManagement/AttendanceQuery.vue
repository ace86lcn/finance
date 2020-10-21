<template>
    <div>
        <div class="white-box padding-align-40">
            <!-- 条件筛选 -->
            <div class="search-list">
                <div class="search-item-title">筛选</div>
                <div class="search-item-wrap">
                    <div class="search-item">
                        <span class="search-title">日期</span>
                        <el-date-picker v-model="date"
                                        type="daterange"
                                        range-separator="-"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        style="width: 355px"
                                        :disabled="!content"
                                        @change="getData"/>
                    </div>
                </div>
            </div>
            <!-- 搜索框 -->
            <new-search class="m-top-33" 
                        placeholder="请输入工人姓名搜索" 
                        width="403px" 
                        @search="handleSearch" 
                        @reset="handleReset"/>
        </div>
        <!-- 未搜索 -->
        <div class="no-search white-box padding-align-20 m-top-40" v-if="!content">请输入日期及您需要查询的人员~</div>
        <template v-else>
            <!-- empty -->
            <div class="search-empty white-box padding-align-20 m-top-40" v-if="false">
                <img :src="require('@/assets/images/icon-warning.png')"/>
                <p>无该人员信息，请重试~</p>
            </div>
            <!-- 搜索结果 -->
            <div class="search-detail white-box" v-if="true">
                <div class="worker-box">
                    <div class="worker">
                        <div class="worker-l">
                            <img :src="content.img" :onerror="errorHeader"/>
                            <h2>{{content.name}}</h2>
                            <div class="worker-detail">
                                <p>身份证号：{{content.cardNumber}}</p>
                                <p>联系方式：{{content.mobile}}</p>
                            </div>
                        </div>
                        <div class="worker-r">
                            <div>
                                <h4>{{total}}</h4>
                                <p>打卡次数（次）</p>
                            </div>
                            <div>
                                <h4>{{totalHours}}</h4>
                                <p>累计工时（小时）</p>
                            </div>
                        </div>
                    </div>
                    <el-button type="primary" @click="exportExcel" :disabled="cantClick">导出Excel</el-button>
                </div>
                <!-- table -->
                <el-table :data="tableData" class="normal-table">
                    <el-table-column prop="remark" label="打卡设备名称"/>
                    <el-table-column prop="deviceName" label="设备号" width="350"/>
                    <el-table-column prop="createTime" label="打卡时间"/>
                    <el-table-column label="进出方向">
                        <template slot-scope="scope">{{scope.row.state == 1 ? '进' : '出'}}</template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <pages :page.sync="page" :total="total"/>
            </div>
        </template>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { timestampToTime } from '@/utils/utils'
    import { export2Excel } from '@/utils/export2Excel'
    export default {
        data() {
            return {
                date: '',
                content: '',           //搜索人员信息
                tableData: [],         //查询的记录
                page: 1,
                total: 0,
                totalHours: 0,         //累计工时
                cantClick: true        //为true是导出按钮不可点击
            }
        },
        components: {
            'NewSearch': () => import('./components/Search')
        },
        watch: {
            'page'(val) {      //切换页数
                this.getList()
            }
        },
        computed: {
            ...mapState(['errorHeader'])
        },
        methods: {
            // 选择工人
            handleSearch(val) {
                this.content = val
                this.getData()
            },
            // 重置
            handleReset() {
                this.content = ''
                this.date = ''
            },
            getData() {
                // 获取工人累计工时
                this.$http(this.$api.attendance.AttendanceRecordTotal, {
                    projectId:  this.$store.state.projectId,
                    cardNumber: this.content.cardNumber,
                    startTime:  this.date ? timestampToTime(Date.parse(this.date[0]))+' '+'00:00:00' : '',
                    endTime:    this.date ? timestampToTime(Date.parse(this.date[1]))+' '+'23:59:59' : ''
                })
                .then(res => {
                    res ? this.totalHours = res : 0
                })
                this.getList()
            },
            getList() {
                // 考勤列表
                this.$http(this.$api.attendance.AttendanceRecord, {
                    projectId:  this.$store.state.projectId,      
                    startTime:  this.date ? timestampToTime(Date.parse(this.date[0]))+' '+'00:00:00' : '',    
                    endTime:    this.date ? timestampToTime(Date.parse(this.date[1]))+' '+'23:59:59' : '',    
                    cardNumber: this.content.cardNumber,
                    pageNum:    this.page
                })
                .then(res => {
                    this.total     = res.total
                    this.tableData = res.records
                    if(this.total == 0) {
                        this.cantClick = true
                    } else {
                        this.cantClick = false
                    }
                })
            },
            // 导出excel
            exportExcel() {
                if(this.tableData.length == 0) {
                    this.$msg.Warning('暂无考勤记录哦~')
                } else {
                    this.cantClick = true
                    setTimeout(() => {
                        this.cantClick = false
                    }, 3000)
                    // 接口下载
                    this.$http(this.$api.attendance.AttendanceRecord, {
                        projectId:  this.$store.state.projectId,      
                        startTime:  this.date ? timestampToTime(Date.parse(this.date[0]))+' '+'00:00:00' : '',    
                        endTime:    this.date ? timestampToTime(Date.parse(this.date[1]))+' '+'23:59:59' : '',    
                        cardNumber: this.content.cardNumber,
                        pageNum:    1,
                        pageSize:   99999
                    })
                    .then(res => {
                        let exportData = [{
                            remark:     '打卡设备名称',
                            deviceName: '设备号',
                            createTime: '打卡时间',
                            stateText:  '进出方向'
                        }]
                        res.records.map(item => {
                            exportData.push({
                                remark:     item.remark,
                                deviceName: item.deviceName,
                                createTime: item.createTime,
                                stateText:  item.state == 1 ? '进' : '出',
                            })
                        })
                        export2Excel(exportData, `${this.content.name}考勤`)
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .no-search {
        text-align: center;
        line-height: 250px;
        font-size: 20px;
        color: #111;
    }
    .search-empty {
        display: flex;
        align-items: center;
        height: 300px;
        padding-left: 60px;
        img {
            width: 100px;
            height: 100px;
        }
        p {
            font-size: 30px;
            color: #111;
            font-weight: bold;
            margin-left: 50px;
        }
    }
    .search-detail {
        margin-top: 40px;
        padding-top: 40px;
        padding-bottom: 20px;
        .worker-box {
            display: flex;
            align-items: center;
            /deep/ .el-button {
                width: 108px;
                height: 36px;
                padding: 0;
                margin-left: 50px;
            }
            .worker {
                background-color: rgba(0, 0 ,0, .03);
                padding: 30px 89px 33px 40px;
                display: flex;
                align-items: center;
                .worker-l {
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
                    .worker-detail {
                        margin-left: 50px;
                    }
                    p {
                        display: flex;
                        font-size: 16px;
                        line-height: 16px;
                        color: #111;
                        width: 372px;
                        &:last-child {
                            margin-top: 29px;
                        }
                    }
                }
                .worker-r {
                    display: flex;
                    align-items: center;
                    div {
                        &:last-child {
                            margin-left: 50px;
                        }
                        h4 {
                            font-size: 20px;
                            color: #111;
                            line-height: 20px;
                            text-align: center;
                        }
                        p {
                            text-align: center;
                            font-size: 16px;
                            line-height: 16px;
                            color: #111;
                            margin-top: 20px;
                        }
                    }
                }
            }
        }
    }
    .normal-table {
        margin-top: 10px;
    }
</style>