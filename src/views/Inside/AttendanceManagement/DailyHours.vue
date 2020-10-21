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
                                        type="date"
                                        placeholder="请选择日期"
                                        style="width: 356px"
                                        @change="getList('change')"/>
                    </div>
                    <div class="search-item">
                        <span class="search-title">确认状态</span>
                        <el-select v-model="statusActive" 
                                   placeholder="确认状态"
                                   @change="getList('change')">
                            <el-option v-for="item in status"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value"/>
                        </el-select>
                    </div>
                </div>
            </div>
            <!-- 搜索框 -->
            <search class="m-top-33" placeholder="请输入工人姓名/身份证号" width="403px" @search="handleSearch" @reset="handleReset"/>
        </div>
        <div class="white-box padding-align-20 m-top-40">
            <!-- table -->
            <el-table :data="tableData" class="normal-table">
                <el-table-column prop="name" label="工人姓名"/>
                <el-table-column prop="cardNumber" label="身份证号" width="350"/>
                <el-table-column prop="leaderName" label="班组长"/>
                <el-table-column label="日期">
                    <template slot-scope="scope">{{scope.row.createTime | dateSlice}}</template>
                </el-table-column>
                <el-table-column label="本日工时">
                    <template slot-scope="scope">{{scope.row.workingHours}}小时</template>
                </el-table-column>
                <el-table-column prop="address" label="确认状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == 0">待确认</span>
                        <span v-else-if="scope.row.status == 1">已确认</span>
                        <span class="table-status-err" v-else-if="scope.row.status == 2">有异议</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <p class="table-handle">
                            <span @click="detail(scope.row)">查看详情</span>
                        </p>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <pages :page.sync="page" :total="total"/>
        </div>
    </div>
</template>

<script>
    import { timestampToTime } from '@/utils/utils'
    export default {
        data() {
            return {
                date: '',
                status: [{
                    value: '',
                    label: '全部'
                    }, {
                    value: '0',
                    label: '待确认'
                    }, {
                    value: '1',
                    label: '已确认'
                    }, {
                    value: '2',
                    label: '有异议'
                }],                    //确认状态
                statusActive: '',
                content: '',           //搜索字段
                tableData: [],
                page: 1,
                total: 0
            }
        },
        watch: {
            'page'(val) {      //切换页数
                this.getList()
            }
        },
        methods: {
            handleSearch(val) {
                this.content = val
                this.getList('change')
            },
            handleReset() {
                this.content = ''
                this.getList('change')
            },
            // 获取列表
            getList(val) {
                // 存在val为改变筛选项，需要把分页重置为1
                if(val) { this.page = 1 }

                this.$http(this.$api.attendance.DailyHoursList, {
                    projectId:       this.$store.state.projectId,
                    time:            this.date ? timestampToTime(this.date) : '',
                    status:          this.statusActive,
                    combinationName: this.content,
                    pageNum:         this.page
                })
                .then(res => {
                    this.tableData = res.records
                    this.total     = res.total
                })
            },
            // 进入详情
            detail(row) {
                this.$router.push({
                    path: `/attendance-management/manhour-detail/${row.calculationId}`,
                    query: {
                        name:         row.name,
                        cardNumber:   row.cardNumber,
                        time:         timestampToTime(row.createTime),
                        workingHours: row.workingHours,
                        status:       row.status
                    }
                })
            }
        },
        created() {
            this.getList()
        }
    }
</script>

<style lang="scss" scoped>
    .table-status-err {
        color: #F5716F;
    }
</style>