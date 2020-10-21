<template>
    <el-dialog
        :visible.sync="show"
        :width="width"
        :before-close="handleClose"
        :center="true"
        :title="title">
        <div class="dialog-content">
            <slot name="content"></slot>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button v-if="showBtn1" @click="handleClose">{{btn1Text}}</el-button>
            <el-button type="primary" @click="handleConfirm">{{btn2Text}}</el-button>
        </span>
    </el-dialog>
</template>

<script>
    export default {
        props: {
			title: {
				type: String,
				default: '温馨提示'
			},
            show: {
                type: Boolean,
                default: false
            },
            showBtn1: {
                type: Boolean,
                default: true
            },
            btn1Text: {
                type: String,
                default: '取消'
            },
            btn2Text: {
                type: String,
                default: '确认'
            },
            width: {
                type: String,
                default: '411px'
            }
        },
        methods: {
            handleClose() {
                this.$emit('close')
            },
            handleConfirm() {
                this.$emit('confirm')
            }
        }
    }
</script>

<style lang="scss" scoped>
    /deep/ .el-dialog__title {
        font-size: 16px;
        line-height: 40px;
        color: #fff;
    }
	/deep/ .el-dialog__body {
		padding:  26px 55px;
	}
    /deep/ .el-button {
        width: 108px;
        height: 36px;
        padding: 0;
    }
    /deep/ .el-button+.el-button {
        margin-left: 32px;
    }
	/deep/ .el-dialog__header {
		height: 40px;
		background-color: $color;
		padding: 0;
        padding-left: 20px;
        text-align: left;
	}
	/deep/ .el-dialog__footer {
		padding: 0 72px 30px;
	}
</style>