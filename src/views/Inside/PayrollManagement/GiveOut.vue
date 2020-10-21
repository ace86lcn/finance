<template>
    <div>
        <div class="white-box padding-align-40">
            <!-- 搜索框 -->
            <search placeholder="请输入工人姓名/身份证号" width="403px" @search="handleSearch" @reset="handleReset"/>
        </div>
        <div class="white-box padding-align-20 m-top-40">
            <!-- table -->
            <el-table :data="tableData" class="normal-table">
                <el-table-column prop="name" label="姓名" width="150"/>
                <el-table-column prop="cardNumber" label="身份证号" width="350"/>
                <el-table-column prop="provideTime" label="发放日期/月份" width="200"/>
                <el-table-column prop="payAmount" label="应发工资（元）" width="200"/>
                <el-table-column prop="withholdSociaAmount" label="企业扣缴社保（元）" width="200"/>
                <el-table-column prop="payrollAmount" label="工资单金额（元）" width="200"/>
                <el-table-column prop="fee" label="服务费（元）" width="200"/>
                <el-table-column prop="totalAmount" label="共计（元）" width="200"/>
                <el-table-column label="操作" fixed="right" width="100">
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
    export default {
        data() {
            return {
                content: '',           //搜索项目名称
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
            // 搜索
            handleSearch(val) {
                this.content = val
                this.getList('change')
            },
            // 重置
            handleReset() {
                this.content = ''
                this.getList('change')
            },
            getList(val) {
                // 存在val为改变筛选项，需要把分页重置为1
                if(val) { this.page = 1 }

                this.$http(this.$api.payroll.PayrollList, {
                    projectId:       this.$store.state.projectId,
                    status:          2,
                    combinationName: this.content,
                    pageNum:         this.page
                })
                .then(res => {
                    this.total     = res.total
                    this.tableData = res.records
                })
            },
            detail(row) {
                this.$store.commit('setCurrentPayrollItem', row)
                this.$router.push(`/payroll-management/payroll-detail/${row.payrollId}?status=2`)
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