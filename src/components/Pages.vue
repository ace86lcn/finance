<template>
    <div class="pages-wrap" v-if="total > 0">
        <el-pagination
            @current-change="handleCurrentChange"
            :page-size="size"
            layout="total, prev, pager, next"
            :total="total"
            :prev-text="'上一页'"
            :next-text="'下一页'"
            background>
        </el-pagination>
    </div>
</template>

<script>
    export default {
        props: {
            total: {
                type: Number,
                default: 0
            },
            size: {
                type: Number,
                default: 10
            }
        },
        data() {
            return {
                
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.$emit('update:page', val)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .pages-wrap {
        display: flex;
        justify-content: center;
    }
    .el-pagination {
        display: flex;
        align-items: center;
        margin-top: 20px;
        /deep/ .el-pagination__total {
            font-size: 14px;
            color: #3A3A3A;
        }
        /deep/ .btn-prev,/deep/ .btn-next {
            box-sizing: border-box;
            width: 93px;
            height: 36px;
            background-color: #fff;
            border-radius: 4px;
            border: 1px solid $color;
            span {
                color: $color;
                font-size: 14px;
                font-weight: normal;
            }
        }
        /deep/ .btn-prev {
            margin-right: 20px;
        }
        /deep/ .btn-next {
            margin-left: 20px;
        }
        /deep/ .el-pager {
            li {
                margin: 0;
                background-color: #fff;
                border-top: 1px solid $border_color;
                border-bottom: 1px solid $border_color;
                border-left: 1px solid $border_color;
                border-radius: 0;
                color: #3A3A3A;
                font-size: 14px;
                font-weight: normal;
                height: 34px;
                line-height: 34px;
                padding: 0;
                width: 59px;
                &:first-child {
                    border-top-left-radius: 4px;
                    border-bottom-left-radius: 4px;
                }
                &:last-child {
                    border-right: 1px solid $border_color;
                    border-top-right-radius: 4px;
                    border-bottom-right-radius: 4px;
                }
            }
            .active {
                border-color: $color !important;
            }
        }
    }
</style>