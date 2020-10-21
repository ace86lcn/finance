<template>
    <div class="img-upload">
        <ul class="img-group">
            <li v-for="(item, index) in imgs" :key="index">
                <img :src="item.url" alt="">
                <div class="img-mask">
                    <div class="img-control">
                        <i class="el-icon-zoom-in" @click="handlePictureCardPreview(index)"></i>
                        <i class="el-icon-delete" @click="handleRemove(index)"></i>
                    </div>
                </div>
            </li>
        </ul>
        <div class="upload-wrap" v-if="imgs.length < max">
            <el-upload  :action="domain+url"
                        :data="params"
                        list-type="picture-card"
                        :with-credentials="true"
                        :headers="upToken"
                        :show-file-list="false"
                        :on-success="onSuccess"
                        :on-error="onError"
                        :before-upload="beforeAvatarUpload">
                <i slot="default" class="el-icon-plus"></i>
            </el-upload>
            <p class="upload-remark">{{remark}}</p>
        </div>
        <!-- 预览大图 -->
        <el-dialog :visible.sync="previewShow" width="50%">
            <img width="100%" :src="previewImg" alt="">
        </el-dialog>
    </div>
</template>

<script>
    import upToken from '@/utils/upToken'
    export default {
        props: {
            imgs: {  //图片数组
                type: Array,
                default: []
            },
            max: {  //限制上传数量
                type: Number,
                default: 1
            },
            remark: {
                type: String,
                default: '支持png、jpg、jpeg格式，不超过2M'
            }
        },
        data() {
            return {
                domain: '',
                url: '/v1/kodo/upload',
                upToken: upToken,
                params: {
                    folder:     '/finance/contract',
                    bucketType: 'private',
                    sourceCode: 'KODO-FINANCE',
                    instanceId: 88
                },
                previewShow: false,
                previewImg: ''          //预览图片地址
            }
        },
        methods: {
            beforeAvatarUpload(file) {
				const isLt2M = file.size / 1024 / 1024 <= 2      //这里做文件大小限制
				if(!isLt2M) {
					this.$msg.Warning('上传文件大小不能超过 2MB!')
				}
				return isLt2M
            },
            onSuccess(response, file, fileList) {
                let imgs = this.imgs
                imgs.push({
                    downCode: file.response.data.downCode
                })
                this.$http(this.$api.common.CodeToUrl, {
                    downCode:   imgs[imgs.length-1].downCode,
                    sourceCode: 'KODO-FINANCE',
                    instanceId: 88,
                    validity:   60
                }, true)
                .then(res => {
                    imgs[imgs.length-1].url = res.url
                    this.handleChange(imgs)
                })
            },
            // 上传失败
            onError() {
                this.$message.Warning('上传失败')
            },
            // 删除图片
            handleRemove(index) {
                let imgs = this.imgs
                imgs.splice(index, 1)
                this.handleChange(imgs)
            },
            // 预览图片
            handlePictureCardPreview(index) {
                this.previewImg = this.imgs[index].url
                this.previewShow = true
            },
            handleChange(imgs) {
                this.$emit('change', imgs)
            }
        },
        created() {
            this.domain = process.env.VUE_APP_API_URL
        }
    }
</script>

<style lang="scss" scoped>
    .img-upload {
        /deep/ .el-upload-list--picture-card .el-upload-list__item {
            width: 150px;
            height: 90px;
        }
        /deep/ .el-upload--picture-card {
            width: 150px;
            height: 90px;
            line-height: 100px;
            border: none;
            background-color: #EDEDED;
            border-radius: 0;
        }
        .upload-wrap {
            display: flex;
            align-items: center;
        }
        .icon-plus-wrap {
            width: 150px;
            height: 90px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .img-group {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            li {
                box-sizing: border-box;
                width: 150px;
                height: 90px;
                padding: 5px;
                cursor: pointer;
                position: relative;
                &:hover .img-mask {
                    display: block;
                }
                .img-mask {
                    display: none;
                    position: absolute;
                    width: 140px;
                    height: 80px;
                    background-color: #000;
                    opacity: 0.5;
                    top: 5px;
                    left: 5px;
                    border-radius: 10px;
                    .img-control {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0 35px;
                        margin-top: 30px;
                        i {
                            color: #fff;
                            font-size: 20px !important;
                        }
                    }
                }
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 10px;
                    object-fit: cover;
                }
            }
        }
    }
    .upload-remark {
        margin-left: 15px;
        font-size: 12px;
        color: #999;
        width: 156px;
        line-height: 20px;
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
</style>