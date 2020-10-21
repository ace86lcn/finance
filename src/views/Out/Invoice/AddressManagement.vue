<template>
    <div>
        <div class="white-box padding-align-40">
            <div class="add-btn">
                <el-button type="primary" @click="add">新增地址</el-button>
            </div>
            <!-- table -->
            <el-table :data="tableData" class="normal-table-default" :row-class-name="(row) => row.row.defaultStatus ? 'table-item-active' : ''">
                <el-table-column label="收件人姓名">
                    <template slot-scope="scope">
                        <p>
                            <span class="table-default-text">{{scope.row.defaultStatus ? '默认' : ''}}</span>
                            <span>{{scope.row.name}}</span>
                        </p>
                    </template>
                </el-table-column>
                <el-table-column prop="mobile" label="电话号码"/>
                <el-table-column prop="address" label="地址"/>
                <el-table-column label="操作" width="130">
                    <template slot-scope="scope">
                        <p class="table-handle">
                            <span @click="edit(scope.row)">编辑</span>
                            <span @click="del(scope.row.id)">删除</span>
                        </p>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <pages :page.sync="page" :total="total"/>
        </div>
        <!-- 地址弹窗 -->
        <address-dialog :show="show" 
                        :title="title"
                        :editItem="editItem"
                        @close="handleClose"
                        @confirm="handleConfirm"/>
    </div>
</template>

<script>
    export default {
        components: {
            'AddressDialog': () => import('./components/AddressDialog')
        },
        data() {
            return {
                tableData: [],
                page: 1,
                total: 0,
                show: false,
                title: '',
                editItem: {}      //需要修改的item
            }
        },
        watch: {
            'page'(val) {      //切换页数
                this.getList()
            }
        },
        methods: {
            // 新增
            add() {
                this.title = '新增地址'
                this.show = true
            },
            // 编辑
            edit(item) {
                this.editItem = item
                this.title = '编辑地址'
                this.show = true
            },
            // 删除
            del(id) {
                this.$msg.MsgBox('删除后将不能恢复，确认删除？')
				.then(() => {
					this.$http(this.$api.invoice.DelAddress, {
                        id: id
                    })
                    .then(res => {
                        this.$msg.Success('删除成功')
                        this.getList()
                    })
				})
            },
            // 关闭弹窗
            handleClose() {
                this.show = false
            },
            // 提交表单
            handleConfirm(params) {
                if(this.title == '编辑地址') {
                    // 编辑保存
                    this.$http(this.$api.invoice.EditAddress, params)
                    .then(res => {
                        this.$msg.Success('编辑成功')
                        this.show = false
                        this.getList()
                    })
                } else {
                    // 新增保存
                    this.$http(this.$api.invoice.AddAddress, params)
                    .then(res => {
                        this.$msg.Success('新增成功')
                        this.show = false
                        this.getList()
                    })
                }
            },
            getList() {
                this.$http(this.$api.invoice.AddressList, {
                    pageNum: this.page
                })
                .then(res => {
                    this.tableData = res.records
                    this.total     = res.total
                })
            }
        },
        created() {
            this.getList()
        }
    }
</script>

<style lang="scss" scoped>
    .add-btn {
        text-align: right;
        padding-bottom: 20px;
        /deep/ .el-button {
            width: 108px;
            height: 36px;
            padding: 0;
        }
    }
</style>