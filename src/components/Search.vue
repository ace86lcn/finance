<template>
    <div class="search">
        <p>搜索</p>
        <el-input   :placeholder="placeholder"
                    prefix-icon="el-icon-search"
                    :style="`width: ${width}`"
                    v-model="input">
        </el-input>
        <el-button type="primary" style="margin-left: 10px" @click="search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
    </div>
</template>

<script>
    export default {
        props: {
            placeholder: {
                type: String,
                default: '请输入搜索内容'
            },
            width: {
                type: String,
                default: '376px'
            }
        },
        data() {
            return {
                input: ''
            }
        },
        methods: {
            search() {
                this.$emit('search', this.input)
            },
            reset() {
                this.input = ''
                this.$emit('reset', '')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .search {
        display: flex;
        align-items: center;
        background-color: #fff;
        border-radius: 10px;
        p {
            font-size: 16px;
            padding-right: 20px;
            color: #111;
            font-weight: 600;
        }
        /deep/ .el-input__inner {
            height: 36px;
            border-color: $border_color;
        }
        /deep/ .el-input__icon {
            line-height: 36px;
        } 
        /deep/ .el-button {
            margin-left: 40px !important;
            width: 108px;
            height: 36px;
            padding: 0;
        }/deep/ .el-button+.el-button {
            margin-left: 30px !important;
        }
    }
</style>
