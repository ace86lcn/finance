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
                                        type="monthrange"
                                        range-separator="-"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        style="width: 355px"
                                        @change="getList('change')"/>
                    </div>
                    <div class="search-item">
                        <span class="search-title">缴纳状态</span>
                        <el-select v-model="statusActive" 
                                   placeholder="请选择缴纳状态" 
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
            <search class="m-top-33" 
                    placeholder="请输入工人姓名/身份证号搜索" 
                    width="403px" 
                    @search="handleSearch" 
                    @reset="handleReset"/>
        </div>
        <div class="white-box padding-align-20 m-top-40">
            <!-- table -->
            <el-table :data="tableData" class="normal-table">
                <el-table-column prop="name" label="工人姓名"/>
                <el-table-column prop="cardNumber" label="身份证号" width="350"/>
                <el-table-column prop="payTimeStr" label="缴纳年月"/>
                <el-table-column prop="personalPay" label="社保金额" width="180"/>
                <el-table-column label="到账情况">
                    <template slot-scope="scope">
                        <span class="table-status-err" v-if="scope.row.statusName == '缴纳失败'">缴纳失败</span>
                        <span v-else>{{scope.row.statusName}}</span>
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
    import { timestampToYM } from '@/utils/utils'
    export default {
        data() {
            return {
                date: '',
                status: [{
                    value: '',
                    label: '全部'
                    }, {
                    value: '0',
                    label: '未到账'
                    }, {
                    value: '1',
                    label: '已实缴'
                    }, {
                    value: '2',
                    label: '缴纳失败'
                }],                    //项目分类
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
                this.$http(this.$api.social.SocialRecordList, {
                    projectId:       this.$store.state.projectId,
                    beginTime:       this.date ? timestampToYM(this.date[0])+'-01'+' '+'00:00:00' : '',
                    endTime:         this.date ? timestampToYM(this.date[1])+'-30'+' '+'23:59:59' : '',
                    status:          this.statusActive,
                    combinationName: this.content,
                    pageNum:         this.page
                })
                .then(res => {
                    this.tableData = res.records
                    this.total     = res.total
                })
            },
            // 详情
            detail(row) {
                this.$router.push(`/social-management/social-detail/${row.socialRecordId}?payrollId=${row.payrollId}`)
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