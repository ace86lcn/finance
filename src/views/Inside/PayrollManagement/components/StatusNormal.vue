<template>
    <div class="status-normal">
        <span v-for="item in statusArr"
              :key="item.id"
              :class="['status-text', { 'status-text-active': item.id<=activeStatus}]">{{item.name}}</span>
        <div class="over-time over-time-1" v-if="activeStatus >= 2">
            <p>支付完成时间</p>
            <p>{{detail.payTime}}</p>
        </div>
        <div class="over-time over-time-2" v-if="activeStatus >= 3">
            <p>发放完成时间</p>
            <p>{{detail.provideFinishTime}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['detail'],
        data() {
            return {
                statusArr: [{
                    id: 1,
                    name: '待支付'
                }, {
                    id: 2,
                    name: '发放中'
                }, {
                    id: 3,
                    name: '已完成'
                }],
                activeStatus: 1
            }
        },
        computed: {
            status() {
                return this.$route.query.status
            }
        },
        created() {
            if(this.status < 3) {
                this.activeStatus = this.status
            } else {
                this.activeStatus = 3
            }
        }
    }
</script>

<style lang="scss" scoped>
    .status-normal {
        padding: 40px 0 67px 149px;
        width: 760px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        .status-text {
            font-size: 30px;
            line-height: 30px;
            color: #999;
            position: relative;
            &:not(:first-child) {
                &::before {
                    content: '';
                    position: absolute;
                    width: 195px;
                    height: 3px;
                    background-color: #999;
                    top: 15px;
                    left: -220px;
                }
            }
        }
        .status-text-active {
            color: $color;
            &::before {
                background-color: $color !important;
            }
        }
        .over-time {
            position: absolute;
            bottom: 30px;
            p {
                text-align: center;
                font-size: 14px;
                color: #666;
                line-height: 16px;
            }
        }
        .over-time-1 {
            left: 295px;
        }
        .over-time-2 {
            right: 145px;
        }
    }
</style>