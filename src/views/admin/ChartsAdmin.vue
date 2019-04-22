<template>
        <Row style="margin-top: 150px">
            <Col span="12">
                <div style="text-align: center; font-size: 20px;">
                    <strong>近三个月维修订单统计</strong><br><br>
                    <ve-histogram :data="chartData"></ve-histogram>
                </div>
            </Col>
            <Col span="12">
                <div style="text-align: center; font-size: 20px;">
                    <strong>维修类型统计</strong><br><br>
                    <ve-pie :data="chartData2"></ve-pie>
                </div>
            </Col>
        </Row>
</template>

<script>
    export default {
        name: "ChartsAdmin",
        data () {
            return {
                chartData2: {
                    columns: ['类型', '数量'],
                    rows: []
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
            },
            getPerTypeCount(){
                this.$axios({
                    method: 'get',
                    url: '/api/type/getPerRepairsTypeCount'
                }).then(response => {
                    this.chartData2.rows = response.data;
                })
            }
        },
        created(){
            this.getPerMonthCount();
            this.getPerTypeCount();
        }
    }
</script>

<style scoped>

</style>