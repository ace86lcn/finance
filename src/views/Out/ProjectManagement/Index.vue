<template>
    <div>
        <div class="white-box padding-align-40">
            <!-- 条件筛选 -->
            <div class="search-list">
                <div class="search-item-title">筛选</div>
                <div class="search-item-wrap">
                    <div class="search-item">
                        <span class="search-title">项目状态</span>
                        <el-select v-model="statusActive" placeholder="请选择项目状态" @change="getList('change')">
                            <el-option v-for="item in status"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"/>
                        </el-select>
                    </div>
                    <div class="search-item">
                        <span class="search-title">项目分类</span>
                        <el-select v-model="classifyActive" placeholder="请选择项目分类" @change="getList('change')">
                            <el-option v-for="item in classify"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value"/>
                        </el-select>
                    </div>
                </div>
            </div>
            <!-- 搜索框 -->
            <search class="m-top-33" placeholder="请输入项目名称" @search="handleSearch" @reset="handleReset"/>
        </div>
        <div class="white-box padding-align-40 m-top-40">
            <!-- 项目列表 -->
            <div class="project-list">
                <div class="project-item" v-for="item in list" :key="item.projectId">
                    <p class="item-title">{{item.projectName}}</p>
                    <div class="item-content">
                        <div class="item-content-l">
                            <!-- 项目状态 -->
                            <p>项目状态：{{item.projectStatus | projectStatusText}}</p>
                            <!-- 项目分类 -->
                            <p>项目分类：{{item.category | projectCategoryText}}</p>
                            <p>项目地址：{{item.address}}</p>
                        </div>
                        <div class="item-content-r">
                            <h2>{{item.personNum}}</h2>
                            <p>人员数</p>
                        </div>
                    </div>
                    <div class="item-btn">
                        <el-button @click="goProject(item.projectId)">进入项目</el-button>
                    </div>
                </div>
            </div>
            <el-button type="primary" class="loading-more" v-if="!isOver" @click="loadMore">加载更多</el-button>
            <p class="empty-text" v-if="list.length == 0">暂无项目哦~</p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                status: [{
                    value: '',
                    label: '全部'
                    }, {
                    value: '001',
                    label: '筹备'
                    }, {
                    value: '002',
                    label: '立项'
                    }, {
                    value: '003',
                    label: '在建'
                    }, {
                    value: '004',
                    label: '完工'
                    }, {
                    value: '005',
                    label: '停工'
                }],                     //项目状态
                statusActive: '',
                classify: [{
                    value: '',
                    label: '全部'
                    }, {
                    value: '01',
                    label: '房屋建筑工程'
                    }, {
                    value: '02',
                    label: '市政公用工程'
                    }, {
                    value: '03',
                    label: '机电安装工程'
                    }, {
                    value: '04',
                    label: '铁路工程'
                    }, {
                    value: '05',
                    label: '公路工程'
                    }, {
                    value: '06',
                    label: '港口与航道工程'
                    }, {
                    value: '07',
                    label: '水利水电工程'
                    }, {
                    value: '08',
                    label: '电力工程'
                    }, {
                    value: '09',
                    label: '矿山工程'
                    }, {
                    value: '10',
                    label: '冶炼工程'
                    }, {
                    value: '11',
                    label: '化工石油工程'
                    }, {
                    value: '12',
                    label: '通信工程'
                    }, {
                    value: '99',
                    label: '其他'
                }],                    //项目分类
                classifyActive: '',
                content: '',           //搜索字段
                page: 1,
                isOver: true,
                list: []
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
            // 进入项目主页
            goProject(projectId) {
                this.$store.commit('setProjectId', projectId)
                this.$store.dispatch('setAllProject')
                this.$store.dispatch('getCompanyPullDownList')
                this.$router.push('/worker-management/index')
                // setTimeout(_ => window.location.reload(), 200)
            },
            // 加载更多
            loadMore() {
                this.page = this.page+1
                this.getList()
            },
            // 获取列表
            getList(val) {
                // 存在val为改变筛选项，需要把分页重置为1
                if(val) { this.page = 1 }
                this.$http(this.$api.project.GetProjectList, {
                    projectStatus: this.statusActive,   
                    category:      this.classifyActive,       
                    name:          this.content,      
                    pageNum:       this.page
                })
                .then(res => {
                    if(this.page = 1) {
                        this.list = res.records
                    } else {
                        this.list = this.list.concat(res.records)
                    }
                    if(res.pages > this.page) {
                        this.isOver = false
                    } else {
                        this.isOver = true
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
    .project-list {
        display: flex;
        flex-wrap: wrap;
        .project-item {
            box-sizing: border-box;
            width: calc((100% - 60px) / 4);
            padding: 40px 30px 30px;
            border: 1px solid #ccc;
            border-radius: 10px;
            margin-bottom: 20px;
            &:nth-child(4n) {
                margin-left: 20px;
            }
            &:nth-child(4n-1) {
                margin-left: 20px;
            }
            &:nth-child(4n-2) {
                margin-left: 20px;
            }
            &:hover {
                border: 1px solid $color;
                box-shadow: 0px 4px 20px 0px rgba(127, 127, 127, 0.2);
            }
            .item-title {
                font-size: 20px;
                color: #111111;
                line-height: 20px;
                height: 40px;
            }
            .item-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 27px;
                .item-content-l {
                    p {
                        font-size: 14px;
                        color: #666666;
                        line-height: 14px;
                        &:not(:first-child) {
                            margin-top: 22px;
                        }
                    }
                }
                .item-content-r {
                    width: 78px;
                    h2 {
                        color: #FFC371;
                        font-size: 36px;
                        line-height: 36px;
                        text-align: center;
                    }
                    p {
                        color: #666;
                        font-size: 16px;
                        line-height: 16px;
                        text-align: center;
                        margin-top: 20px;
                    }
                }
            }
            .item-btn {
                text-align: right;
                margin-top: 14px;
                /deep/ .el-button {
                    width: 107px;
                    height: 36px;
                    padding: 0;
                }
            }
        }
    }
    .loading-more {
        width: 300px;
        height: 36px;
        padding: 0;
        display: block;
        margin: 20px auto 0;
    }
    .empty-text {
        text-align: center;
        font-size: 20px;
        color: #999;
    }
</style>