<template>
    <div class="search">
        <p>搜索</p>
        <el-input :placeholder="placeholder"
                  prefix-icon="el-icon-search"
                  :style="`width: ${width}`"
                  v-model="input"
                  @focus="show = true"
                  @blur="iptBlur"/>
        <el-button @click="reset">重置</el-button>
        <div class="search-content scroll-y-style" v-if="show">
            <p class="search-item-text"
               v-for="item in list"
               :key="item.id"
               @click="chooseWorker(item)">{{item.splicing}}</p>
            <p class="search-item-text" v-if="list.length == 0">无相关联想词~</p>
        </div>
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
                input: '',
                list: [],
                show: false
            }
        },
        watch: {
            'input'(val) {
                if(val) {
                    this.$http(this.$api.worker.SearchWorker, {
                        projectId:       this.$store.state.projectId,
                        combinationName: val
                    })
                    .then(res => {
                        this.list = res
                    })
                } else {
                    this.list = []
                    this.$emit('reset', '')
                }
            }
        },
        methods: {
            search() {
                this.$emit('search', this.input)
            },
            reset() {
                this.input = ''
                this.$emit('reset', '')
            },
            chooseWorker(item) {
                this.input = item.name
                this.$emit('search', { 
                    name:       item.name,
                    cardNumber: item.cardNumber,
                    mobile:     item.phone,
                    img:        item.url,
                })
            },
            iptBlur() {
                setTimeout(() => {
                    this.show = false
                }, 200)
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
        position: relative;
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
        .search-content {
            position: absolute;
            top: 40px;
            left: 53px;
            width: 403px;
            box-sizing: border-box;
            border: 1px solid #ccc;
            border-radius: 4px;
            min-height: 150px;
            max-height: 200px;
            overflow-y: scroll;
            background-color: #fff;
            box-shadow: 0px 4px 20px 0px rgba(128, 128, 128, 0.3);
            z-index: 999;
            .search-item-text {
                padding: 0 30px;
                font-size: 14px;
                color: #666;
                line-height: 36px;
                cursor: pointer;
                display: flex;
                &:hover {
                    background-color: #F5F7FA;
                    color: $color;
                }
                span {
                    &:first-child {
                        width: 80px;
                    }
                }
            }
        }
    }
</style>
