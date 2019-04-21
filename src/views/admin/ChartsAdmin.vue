<template>
    <Row>
        <Col span="12">col-12</Col>
        <Col span="12">col-12</Col>
    </Row>
        <Row>
            <Col span="12">
                <div style="text-align: center; font-size: 20px;">
                    <strong>订单统计</strong><br><br>
                    <ve-histogram :data="chartData"></ve-histogram>
                </div>
            </Col>
            <Col span="12">
                <div style="text-align: center; font-size: 20px;">
                    <strong>维修统计</strong><br><br>
                    <ve-histogram :data="chartData"></ve-histogram>
                </div>
            </Col>
        </Row>
</template>

<script>
    import Col from "iview/src";
    export default {
        name: "ChartsAdmin",
        components: {Col},
        data () {
            return {
                chartData2: {
                    columns: ['类型', '数量'],
                    rows: [
                        { '类型': '设别损坏', '数量': 1393 },
                        { '类型': '系统错误', '数量': 3530 },
                        { '类型': '系统错误', '数量': 2923 },
                        { '类型': '无法开机', '数量': 1723 },
                        { '类型': '其他', '数量': 3792 },
                    ]
                },
                data6:[],
                chartData: {
                    columns: ['日期', '未接单', '维修中', '维修完成'],
                    rows: []
                }
            }
        },
        methods:{
            getPerMonthCount(){
                this.$axios({
                    method: 'get',
                    url: '/api/first/getPerMonthCount'
                }).then(response => {
                    this.chartData.rows = response.data;
                })
            }
        },
        created(){
            this.getPerMonthCount();
        }
    }
</script>

<style scoped>

</style>