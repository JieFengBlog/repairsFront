<template>
    <Row>
        <Col span="19" v-if="role != '3'">
            <Modal
                    v-model="modal1"
                    title="请给予评价"
                    @on-ok="ok"
                    @on-cancel="cancel">
                <Rate v-model="value" />
            </Modal>
            <Table
                    border
                    :columns="otherPeople"
                    :data="otherPeopleTable.slice((pageNumber-1)*pageSize,pageNumber*pageSize)">
                <template slot-scope="{ row }" slot="repairNumber">
                    <strong style="color: #1ab3a7;">{{ row.repairNumber }}</strong>
                </template>
                <template slot-scope="{ row }" slot="createTime">
                    <span>{{new Date(row.createTime).toLocaleString()}}</span>
                </template>
                <template slot-scope="{ row }" slot="endTime">
                    <span>{{new Date(row.endTime).toLocaleString()}}</span>
                </template>
                <template slot-scope="{row}" slot="assessment">
                    <Rate show-text allow-half disabled v-model="row.assessment" v-if="row.assessment == 0? false:true">
                        <span style="color: #f5a623">{{ row.assessment }}</span>
                    </Rate>
                    <div v-else>
                        <span>还没有评价</span><Button type="primary" ghost @click="assessmentVisible(row)" size="small" style="margin-left: 20px;" >评价</Button>
                    </div>

                </template>
            </Table>
            <Page :total="otherPeopleTable.length"
                  size="small"
                  :page-size-opts="[1,2,3,4]"
                  show-sizer
                  show-elevator
                  :current="pageNumber"
                  :page-size="pageSize"
                  show-total
                  style="float: right; margin-top: 20px;"
                  @on-change="handleCurrentChange"
                  @on-page-size-change="handleSizeChange"/>
        </Col>

        <Col v-else span="19">
            <Table
                    border
                    :columns="repairsPeople"
                    :data=" repairTableData.slice((pageNumber-1)*pageSize,pageNumber*pageSize)">
                <template slot-scope="{ row }" slot="submitNumber">
                    <strong style="color: #1ab3a7;">{{ row.submitNumber }}</strong>
                </template>
                <template slot-scope="{ row }" slot="createTime">
                    <span>{{new Date(row.createTime).toLocaleString()}}</span>
                </template>
                <template slot-scope="{row}" slot="assessment">
                    <Rate show-text allow-half disabled  v-model="row.assessment" v-if="row.value <= 0? false:true">
                        <span style="color: #f5a623">{{ row.assessment }}</span>
                    </Rate>

                </template>
            </Table>
            <Page :total=" repairTableData.length"
                  size="small"
                  :page-size-opts="[1,2,3,4]"
                  show-sizer
                  show-elevator
                  :current="pageNumber"
                  :page-size="pageSize"
                  show-total
                  style="float: right; margin-top: 20px;"
                  @on-change="handleCurrentChange"
                  @on-page-size-change="handleSizeChange"/>
        </Col>

    </Row>
</template>

<script>
    export default {
        name: "History",
        created(){
           this.role = sessionStorage.getItem("role")
        },
        data(){
            return{
                role:'',
                modal1:false,
                pageNumber:1,
                pageSize:4,
                plan:0,
                value:0,
                id:0,
                planVisible:false,
                orderNumber:0,
                otherPeople: [
                    {
                        align: 'center',
                        title: '维修人员编号',
                        width: 120,
                        slot: 'repairNumber'
                    },
                    {
                        align: 'center',
                        title: '创建时间',
                        width: 170,
                        slot: 'createTime'

                    },
                    {
                        align: 'center',
                        title: '结束时间',
                        width: 170,
                        slot: 'endTime'
                    },
                    {
                        align: 'center',
                        title: '维修地址',
                        width: 200,
                        key: 'repairAddress'

                    },
                    {
                        align: 'center',
                        title: '维修描述',
                        width: 200,
                        key: 'repairDesc'

                    },
                    {
                        title: '评价',
                        slot: 'assessment',
                        align: 'center'
                    },

                ],

                repairsPeople:[
                    {
                        align: 'center',
                        title: '提交学号/编号',
                        width: 120,
                        slot: 'submitNumber'
                    },
                    {
                        align: 'center',
                        title: '创建时间',
                        width: 170,
                        slot: 'createTime'

                    },
                    {
                        align: 'center',
                        title: '结束时间',
                        width: 170,
                        key: 'endTime'

                    },
                    {
                        align: 'center',
                        title: '维修地址',
                        width: 200,
                        key: 'repairAddress'

                    },
                    {
                        align: 'center',
                        title: '维修描述',
                        width: 200,
                        key: 'repairDesc'

                    },
                    {
                        title: '评价',
                        slot: 'assessment',
                        align: 'center'
                    },
                ],


                otherPeopleTable: [],
                repairTableData: []
            }
        },
        methods:{
            handleSizeChange(val) {
                this.pageSize = val
            },
            assessmentVisible(row){
                this.modal1 = true;
                this.id = row.id
            },
            handleCurrentChange(val) {
                this.pageNumber = val;
            },
            viewPlan(row){
                this.plan = row.plan;
                this.planVisible = true;
                this.orderNumber = row.number;
            },
            closePlan(){
                this.planVisible = false;
            },
            ok () {
                this.$axios({
                    method: 'post',
                    url: '/api/first/updateAssessment',
                    data: {
                        id:this.id,
                        assessment:this.value
                    }
                }).then(response=>{
                    if(response.data.success){
                        this.getHistoryTable();
                        this.$Message.success('评价成功');
                    }

                })
            },
            cancel () {
                this.$Message.info('评价取消');
            },
            getHistoryTable(){
                this.$axios({
                    method:'post',
                    url:'/api/first/getHistoryOrRepairing',
                    data:{
                        type:'history',
                        role:this.role,
                        number:sessionStorage.getItem("number")
                    }
                }).then(response=>{
                    if(response.data.success){
                        console.log(response.data.tableList)
                        if(this.role == '3')
                            this.repairTableData = response.data.tableList;
                        else
                            this.otherPeopleTable = response.data.tableList;
                    }else{
                        this.$Message.error("请求数据失败");
                    }
                })
            }
        },
        created() {
                this.role = sessionStorage.getItem("role");
                this.getHistoryTable();

        }
    }
</script>

<style scoped>

</style>
