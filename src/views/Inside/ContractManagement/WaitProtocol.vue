<template>
    <div>
        <div class="white-box padding-align-40">
            <!-- 条件筛选 -->
            <div class="search-list">
                <div class="search-item-title">筛选</div>
                <div class="search-item-wrap">
                    <div class="search-item">
                        <span class="search-title">所属参建单位</span>
                        <el-select v-model="companyActive" 
                                   placeholder="请选择所属参建单位" 
                                   @change="changeCompany">
                            <el-option v-for="item in companyList"
                                      :key="item.bcorpID"
                                      :label="item.corpName"
                                      :value="item.corpCode"/>
                        </el-select>
                    </div>
                    <div class="search-item">
                        <span class="search-title">所属班组</span>
                        <el-select v-model="teamActive" 
                                   placeholder="请选择所属班组" 
                                   :disabled="!companyActive"
                                   @change="getList('change')">
                            <el-option v-for="item in teamList"
                                       :key="item.teamID"
                                       :label="item.teamName"
                                       :value="item.teamID"/>
                        </el-select>
                    </div>
                </div>
            </div>
            <!-- 搜索框 -->
            <search class="m-top-33" placeholder="请输入工人姓名/身份证号/手机号搜索" width="403px" @search="handleSearch" @reset="handleReset"/>
        </div>
        <div class="white-box padding-align-20 m-top-40">
            <!-- table -->
            <el-table :data="tableData" class="normal-table">
                <el-table-column prop="name" label="姓名" width="120"/>
                <el-table-column prop="cardNumber" label="身份证号" width="350"/>
                <el-table-column prop="mobile" label="手机号" width="200"/>
                <el-table-column prop="corporationName" label="所属参建单位" width="350"/>
                <el-table-column prop="teamName" label="所属班组" width="350"/>
                <el-table-column label="操作" fixed="right" width="100">
                    <template slot-scope="scope">
                        <p class="table-handle">
                            <span @click="$router.push(`/contract-management/choose-contract/${scope.row.cardNumber}?workerId=${scope.row.id}`)">拟定合同</span>
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
                companyList: [{
                    corpCode: '',
                    corpName: '全部'
                }],                     //所属参建单位
                companyActive: '',
                teamList: [{
                    value: '',
                    label: '全部'
                }],                    //所属班组
                teamActive: '',
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
        computed: {
            ...mapState(['CompanyPullDownList'])
        },
        methods: {
            // 搜索
            handleSearch(val) {
                this.content = val
                this.page = 1
                this.getList('change')
            },
            // 重置
            handleReset() {
                this.content = ''
                this.page = 1
                this.getList('change')
            },
            // 切换参建单位,获取班组
            changeCompany() {
                this.teamActive = ''
                if(this.companyActive) {
                    this.$http(this.$api.pulldown.TeamPullDown, {
                        projectId: this.$store.state.projectId,
                        corpCode:  this.companyActive
                    })
                    .then(res => {
                        this.teamList = [{
                            teamID: '',
                            teamName: '全部'
                        }, ...res]
                    })
                }
                this.getList('change')
            },
            // 获取列表
            getList(val) {
                // 存在val为改变筛选项，需要把分页重置为1
                if(val) { this.page = 1 }
                // 获取参建单位id
                let corporationId = ''
                if(this.companyActive) {
                    corporationId = this.CompanyPullDownList.find(item => item.corpCode == this.companyActive).bcorpID
                }
                this.$http(this.$api.common.WorkerAndWaitProtocol, {
                    type:            '1',
                    projectId:       this.$store.state.projectId,
                    corporationId:   corporationId,
                    teamId:          this.teamActive,
                    combinationName: this.content,
                    pageNum:         this.page
                })
                .then(res => {
                    this.tableData = res.records
                    this.total     = res.total
                })
            }
        },
        created() {
            this.companyList = this.companyList.concat(this.CompanyPullDownList)
            this.getList()
        }
    }
</script>

<style lang="scss" scoped>
    
</style>