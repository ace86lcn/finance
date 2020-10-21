<template>
    <div>
        <div class="white-box padding-align-40">
            <!-- 条件筛选 -->
            <div class="search-list">
                <div class="search-item-title">筛选</div>
                <div class="search-item-wrap">
                    <div class="search-item">
                        <span class="search-title">甲方公司</span>
                        <el-select v-model="companysActive" 
                                   placeholder="请选择所属参建单位" 
                                   @change="getList('change')">
                            <el-option v-for="item in companys"
                                      :key="item.bcorpID"
                                      :label="item.corpName"
                                      :value="item.bcorpID"/>
                        </el-select>
                    </div>
                </div>
            </div>
            <!-- 搜索框 -->
            <search class="m-top-33" placeholder="请输入工人姓名/身份证号/手机号搜索" width="377px" @search="handleSearch" @reset="handleReset"/>
        </div>
        <div class="white-box padding-align-20 m-top-40">
            <!-- table -->
            <el-table :data="tableData" class="normal-table">
                <el-table-column prop="corporationName" label="甲方（公司名称）"/>
                <el-table-column prop="name" label="乙方（工人姓名）" width="180"/>
                <el-table-column prop="cardNumber" label="身份证号"/>
                <el-table-column prop="phone" label="手机号" width="180"/>
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <p class="table-handle">
                            <span @click="$router.push(`/contract-management/contract-detail/${scope.row.contractId}?type=0&workerId=${scope.row.workerId}`)">查看详情</span>
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
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                companys: [{
                    corpCode: '',
                    corpName: '全部'
                }],                    //甲方公司
                companysActive: '',
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
        computed: {
            ...mapState(['CompanyPullDownList'])
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
            // 获取列表
            getList(val) {
                // 存在val为改变筛选项，需要把分页重置为1
                if(val) { this.page = 1 }

                this.$http(this.$api.contract.ContractList, {
                    status:          0,
                    projectId:       this.$store.state.projectId,
                    corporationId:   this.companysActive,
                    combinationName: this.content,
                    pageNum:         this.page
                })
                .then(res => {
                    this.total     = res.total
                    this.tableData = res.records
                })
            }
        },
        created() {
            this.companys = this.companys.concat(this.CompanyPullDownList)
            this.getList()
        }
    }
</script>

<style lang="scss" scoped>
    
</style>