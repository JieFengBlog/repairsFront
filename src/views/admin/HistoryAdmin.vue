<template>
    <div class="historyAdmin">
        <Table border :columns="columns12" :data="data6.slice((currentPage-1)*currentSize,currentPage*currentSize)">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row }" slot="createTime">
                <strong>{{ new Date(row.createTime).toLocaleString() }}</strong>
            </template>
            <template slot-scope="{ row }" slot="status">
                <Tag v-if="row.status == 0" color="primary">未接单</Tag>
                <Tag v-else-if="row.status == 4" color="warning">订单完成</Tag>
                <Tag v-else color="success">维修中</Tag>
            </template>
            <template slot-scope="{row}" slot="destoryType">
                {{row.destoryType.name}}
            </template>
        </Table>

        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="data6.length"
                      :current="1"
                      show-elevator
                      show-sizer
                      :page-size="currentSize"
                      @on-page-size-change="handleSizeChange"
                      @on-change="handleCurrentChange"
                      :page-size-opts="[10, 20, 30, 40]"
                ></Page>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "History",
        data () {
            return {

                currentSize:10,
                currentPage:1,
                columns12: [
                    {
                        title: '订单状态',
                        slot: 'status',
                        width: 150,
                        align: 'center',
                        filters: [
                            {
                                label: '未接单',
                                value:  0
                            },
                            {
                                label: '维修中',
                                value: 1
                            },
                            {
                                label: '订单完成',
                                value: 4
                            }
                        ],
                        filterMethod (value, row) {
                            if(value == 0){
                                return row.status == 0;
                            }else if(value == 4){
                                return row.status == 4;
                            }else{
                                return row.status > 0 && row.status < 4
                            }
                        }
                    },
                    {
                        title: '维修地点',
                        key:"repairAddress",
                        width: 250,
                        align: 'center',
                    },
                    {
                        title: '损坏类型',
                        slot:"destoryType",
                        align: 'center',
                    },
                    {
                        title: '维修说明',
                        key:"repairDesc",
                        width: 350,
                        align: 'center',
                    },
                    {
                        title:'订单提交者学号 / 工号',
                        align: 'center',
                        key: 'submitNumber',
                    },
                    {
                        title:'维修者编号',
                        align: 'center',
                        key: 'repairNumber',
                        width: 250,
                    },
                    {
                        title:'创建时间',
                        align: 'center',
                        slot: 'createTime',
                        width: 250,
                    },
                ],
                data6: []
            }
        },
        methods:{
            handleSizeChange(val) {
                this.currentSize = val
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            getAllTable() {
                this.$axios({
                    method: 'get',
                    url: '/api/first/getAllTable'
                }).then(response => {
                    this.data6 = response.data;
                })
            }
        },
        created() {
            this.getAllTable();
        }
    }
</script>

<style scoped>

</style>