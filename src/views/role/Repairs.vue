<template>
    <Row>

        <Col span="18" v-if="role == '3'">
            <Table
                    border
                    :columns="repairTable"
                    :data="repairData.slice((pageNumber-1)*pageSize,pageNumber*pageSize)">

                <template slot-scope="{ row, index }" slot="action">
                    <Button type="success" ghost @click="changeFinished(row)">完成订单</Button>
                </template>
            </Table>


            <Page :total="repairData.length"
                  size="small"
                  :page-size-opts="[5,8,10]"
                  show-sizer
                  show-elevator
                  :current="pageNumber"
                  :page-size="pageSize"
                  show-total
                  style="float: right; margin-top: 20px;"
                  @on-change="handleCurrentChange"
                  @on-page-size-change="handleSizeChange"/>
        </Col>

        <Col span="18" v-else>
            <Table
                    border
                   :columns="submitColumn"
                   :data="submitData.slice((pageNumber-1)*pageSize,pageNumber*pageSize)">
                <template slot-scope="{ row }" slot="repairNumber">
                    <strong>{{ row.repairNumber }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <!--<Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>-->
                    <!--<Button type="error" size="small" @click="remove(index)">Delete</Button>-->
                    <Tag color="success" v-if="row.status == 0? true:false" >未接</Tag>
                    <Tag color="error" v-else>维修中</Tag>
                </template>
                <template slot-scope="{ row, index }" slot="view">
                    <!--<Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>-->
                    <!--<Button type="error" size="small" @click="remove(index)">Delete</Button>-->
                    <Button type="error" ghost  disabled v-if="row.status == 0? true:false">查看进度</Button>
                    <Button type="success" ghost v-else @click="viewPlan(row)">查看进度</Button>
                </template>
            </Table>
            <Page :total="submitData.length"
                  size="small"
                  :page-size-opts="[5,8,10]"
                  show-sizer
                  show-elevator
                  :current="pageNumber"
                  :page-size="pageSize"
                  show-total
                  style="float: right; margin-top: 20px;"
                  @on-change="handleCurrentChange"
                  @on-page-size-change="handleSizeChange"/>
        </Col>




        <Col span="18" style="margin-top: 80px; margin-left: 340px;" v-if="planVisible">
            <div>
                <div style="float: left;"><Strong>订单编号: </Strong>{{orderNumber}}</div>
                <a style="color: #c5c8ce;" @click="closePlan">
                    <Icon type="md-close" style="float: right; margin-right: 100px; font-size: 20px" />
                </a>
            </div>

            <Steps :current="plan" style="margin-top: 30px;">
                <Step title="未接单" content="订单还没有工人接收"></Step>
                <Step title="已接单" content="已经有维修工人接收"></Step>
                <Step title="维修中" content="正在维修"></Step>
                <Step title="维修完成" content="维修完成"></Step>
                <Step title="请评价" content="给予工人维修评价"></Step>
            </Steps>
        </Col>

    </Row>
</template>

<script>
    export default {
        name: "RepairsIng",
        methods:{
        },
        data(){
            return{
                finished:false,
                pageNumber:1,
                pageSize:5,
                plan:0,
                role:0,
                planVisible:false,
                orderNumber:0,
                submitColumn: [
                    {
                        title: '订单状态',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    },
                    {
                        align: 'center',
                        title: '维修编号',
                        width: 150,
                        slot: 'repairNumber'
                    },
                    {
                        align: 'center',
                        title: '维修地址',
                        width: 200,
                        key: 'repairAddress'

                    },
                    {
                        align:'center',
                        title: "具体描述",
                        key:'repairDesc'
                    },
                    {
                        title: '操作',
                        slot: 'view',
                        width: 150,
                        align: 'center'
                    },

                ],
                repairTable: [
                    {
                        align: 'center',
                        title: '提交编号',
                        width: 150,
                        key: 'submitNumber'
                    },
                    {
                        align: 'center',
                        title: '维修地址',
                        width: 200,
                        key: 'repairAddress'

                    },
                    {
                        align:'center',
                        title: "具体描述",
                        key:'repairDesc'
                    },
                    {
                        title: '进度安排',
                        slot: 'action',
                        width: 200,
                        align: 'center'
                    },
                ],
                submitData: [
                ],
                repairData:[
                ]
            }
        },
        methods:{
            changeFinished(row){
                this.$axios({
                    method:'post',
                    url:'/api/first/changeFinished',
                    data:{
                        id:row.id
                    }
                }).then(response=>{
                    if(response.data.success){
                        this.getRepairing();
                        this.$Message.success("操作成功");
                    }
                })
            },
            handleSizeChange(val) {
                this.pageSize = val
            },
            handleCurrentChange(val) {
                this.pageNumber = val;
            },
            viewPlan(row){
                this.plan = row.status;
                this.planVisible = true;
            },
            closePlan(){
                this.planVisible = false;
            },
            getRepairing(){
                this.$axios({
                    method:'post',
                    url:'/api/first/getHistoryOrRepairing',
                    data:{
                        type:'ing',
                        role:this.role,
                        number:sessionStorage.getItem("number")
                    }
                }).then(response=>{
                    if(response.data.success){
                        console.log(response.data.tableList)
                        if(this.role == '3')
                            this.repairData = response.data.tableList;
                        else
                            this.submitData = response.data.tableList;
                    }else{
                        this.$Message.error("请求数据失败");
                    }
                })
            }
        },
        created(){
            this.role = sessionStorage.getItem("role");
            this.getRepairing();
        }
    }
</script>

<style scoped>

</style>
