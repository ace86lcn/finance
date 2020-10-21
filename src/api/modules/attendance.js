module.exports = {
    /* 
        每日工时列表：
            projectId:       项目id，
            time:            时间，
            status：         确认状态，0：待确认:1：已确认:2：有异议，
            combinationName: 搜索字段
    */
    DailyHoursList: {
        url: '/v1/attendance/page',
        methods: 'get'
    },
    /* 
        工时详情：
            calculationId:       考勤计算表主键id
    */
    ManhourDetail: {
        url: '/v1/attendance/history',
        methods: 'get'
    },
    /* 
        导出excel：
            projectId:       项目id,
            startTime:       开始时间，
            endTime:         结束时间，
            cardNumber:      身份证号
    */
    ExportAttendance: {
        url: '/v1/attendance/records-export',
        methods: 'get'
    },
    /* 
        考勤查询：
            projectId:       项目id,
            startTime:       开始时间，
            endTime:         结束时间，
            cardNumber:      身份证号，
            name:            姓名
    */
    AttendanceRecord: {
        url: '/v1/attendance/records',
        methods: 'get'
    },
    /* 
        每日打卡记录查询：
            projectId:       项目id,
            cardNumber:      身份证号，
            time:            查询时间
    */
    AttendanceRecordDay: {
        url: '/v1/attendance/record',
        methods: 'get'
    },
    /* 
        考勤查询的累计工时：
            projectId:       项目id,
            cardNumber:      身份证号，
            startTime:       开始时间，
            endTime:         结束时间
    */
    AttendanceRecordTotal: {
        url: '/v1/attendance/records-total',
        methods: 'get'
    },
    /* 
        修改工时：
            calculationId:       考勤计算表主键id,
            workingHours:        考勤工时
    */
    ChangeManHour: {
        url: '/v1/attendance/edit',
        methods: 'post'
    }
}