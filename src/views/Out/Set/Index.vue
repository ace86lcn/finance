<template>
    <div class="white-box padding-align-40 right-box-along">
        <h2 class="admin-name">{{adminName}}</h2>
        <div class="set-item">
            <span class="set-item-text">登录手机号：</span>
            <span class="set-item-text">{{adminMobile}}</span>
            <span class="set-item-remark">手机号暂不支持修改</span>
        </div>
        <div class="set-item">
            <span class="set-item-text">登录账号：</span>
            <span class="set-item-text">{{adminCount}}</span>
        </div>
        <div class="set-item">
            <span class="set-item-text">登录密码：</span>
            <span class="set-item-text">******</span>
        </div>
        <div class="set-item">
            <el-button @click="out">退出登录</el-button>
            <el-button type="primary" @click="$router.push('/set/change-pwd')">修改密码</el-button>
            <el-button type="primary" @click="$router.push('/set/forget-pwd')">忘记密码</el-button>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { logout } from '@/utils/utils'
    export default {
        computed: {
            ...mapState(['adminMobile', 'adminName', 'adminCount'])
        },
        methods: {
            out() {
                this.$store.dispatch('logOut')
			}
        }
    }
</script>

<style lang="scss" scoped>
    .admin-name {
        color: #111;
        font-size: 20px;
        line-height: 20px;
    }
    .set-item {
        display: flex;
        align-items: center;
        margin-top: 40px;
        .set-item-text {
            font-size: 14px;
            color: #111;
            width: 125px;
        }
        .set-item-remark {
            color: #666;
            font-size: 14px;
        }
        /deep/ .el-button {
            width: 108px;
            height: 36px;
            padding: 0;
        }
        /deep/ .el-button+.el-button {
            margin-left: 40px;
        }
    }
</style>