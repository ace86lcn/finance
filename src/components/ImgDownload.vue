<template>
    <div>
        <div class="img-download">
            <img :src="url"/>
            <div class="img-mask-wrap">
                <div class="img-mask">
                    <i class="el-icon-zoom-in" @click="preview"/>
                    <i class="el-icon-download" @click="downs"/>
                </div>
            </div>
        </div>
        <!-- 预览弹窗 -->
        <el-dialog
            :visible.sync="show"
            :before-close="handleClose"
            :center="true"
            title="预览">
            <img :src="url" class="preview-img"/>
        </el-dialog>
    </div>
</template>

<script>
    import { downloadIamge } from '@/utils/utils'
    export default {
        props: {
            url: {
                type: String
            },
            name: {
                type: String,
                default: 'pic'
            }
        },
        data() {
            return {
                show: false
            }
        },
        methods: {
            downs() {
                downloadIamge(this.url, this.name)
            },
            preview() {
                this.show = true
            },
            handleClose() {
                this.show = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .img-download {
        width: 150px;
        height: 90px;
        position: relative;
        img {
            width: 100%;
            height: 100%;
        }
        .img-mask-wrap {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: none;
            background-color: rgba(0, 0, 0, .3);
            .img-mask {
                height: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 30px;
                i {
                    color: #fff;
                    font-size: 22px;
                    cursor: pointer;
                }
            }
        }
        &:hover .img-mask-wrap  {
            display: block;
        }
    }
	/deep/ .el-dialog__header {
		height: 40px;
		background-color: $color;
		padding: 0;
	}
    /deep/ .el-dialog__title {
        font-size: 16px;
        line-height: 40px;
        color: #fff;
    }
    .preview-img {
        display: block;
        width: 100%;
    }
</style>