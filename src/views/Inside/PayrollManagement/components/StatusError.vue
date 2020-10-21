<template>
    <div class="status-normal">
        <span v-for="item in status"
              :key="item.id"
              :class="['status-text', { 'status-text-active': item.id<=activeStatus}]">{{item.name}}</span>
        <div class="over-time over-time-1" v-if="activeStatus >= 2">
            <p>支付完成时间</p>
            <p>{{detail.payTime}}</p>
        </div>
        <div class="over-time over-time-2" v-if="activeStatus == 2">
            <p>失败原因</p>
            <p>{{detail.privideFail}}</p>
        </div>
        <div class="over-time over-time-3" v-if="activeStatus == 3">
            <p>退款完成时间</p>
            <p>{{detail.refundTime}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['detail'],
        data() {
            return {
                status: [{
                    id: 1,
                    name: '待支付'
                }, {
                    id: 2,
                    name: '发放失败'
                }, {
                    id: 3,
                    name: '退款中'
                }],
                activeStatus: 2
            }
        },
        created() {
            if(this.detail.refundTime) {
                this.activeStatus = 3
            }
            if(this.activeStatus == 3) {
                this.status[2].name = '退款完成'
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
            width: 120px;
            text-align: center;
            &:not(:first-child) {
                &::before {
                    content: '';
                    position: absolute;
                    width: 180px;
                    height: 3px;
                    background-color: #999;
                    top: 15px;
                    left: -192px;
                }
            }
            &:nth-child(2) {
                color: $color_red;
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
            top: 80px;
            p {
                text-align: center;
                font-size: 14px;
                color: #666;
                line-height: 16px;
                width: 170px;
            }
        }
        .over-time-1 {
            left: 275px;
        }
        .over-time-2 {
            right: 295px;
        }
        .over-time-3 {
            right: 125px;
        }
    }
</style>