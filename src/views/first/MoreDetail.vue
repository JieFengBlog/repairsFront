<template>
    <div>
            <Card style="margin-top: 50px; box-shadow:0 1px 6px rgba(0, 0, 0, 0.2)">
                <p slot="title">
                    <Icon type="md-build"></Icon>
                    所有待维修订单
                </p>
                <Row style="margin-top: 20px; margin-bottom: 15px;">
                    <Spin size="large" fix v-if="spinShow"></Spin>
                    <Col span="4" v-for="(item,index) in moreTable" :key="index" style="margin-left:30px;margin-bottom: 40px; margin-right: 30px;">
                        <Card class="repair-order-title">
                            <div slot="title">
                                <Icon type="ios-time-outline" style="font-size: 20px; color: #33CCCC;"/>
                                <Time :time="new Date().getTime() - calculateTime(item.createTime)" slot="title" />
                            </div>
                            <a @click="showItem(index)" slot="extra"  style="color: #33CCCC;">
                                <Icon type="ios-loop-strong" ></Icon>
                                详情
                            </a>
                            <Form :label-width="80">
                                <FormItem label="学号/编号">
                                    <span>{{item.submitNumber}}</span>
                                </FormItem>
                                <FormItem label="报修地址">
                                    <span>{{item.repairAddress}}</span>
                                </FormItem>
                                <FormItem label="具体说明">
                                    <span>{{item.repairDesc}}</span>
                                </FormItem>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Card>

        <Card style="margin-top: 50px; margin-bottom: 100px; box-shadow:0 1px 6px rgba(0, 0, 0, 0.2)" v-if="repairDetailVisible">
            <p slot="title">
                <Icon type="md-build"></Icon>
                维修订单详情
                <Icon type="md-close" style="float: right; font-size: 20px;cursor: pointer;" @click="closeDetail"></Icon>
            </p>

            <Row style="margin-top: 20px; margin-bottom: 15px; margin-left: 20%;">
                <Col span="6">
                    <Form  :label-width="80">
                        <FormItem label="学号/编号">
                            {{tableItem.submitNumber}}
                        </FormItem>
                        <FormItem label="报修地址">
                            {{tableItem.repairAddress}}
                        </FormItem>
                        <FormItem label="报修描述">
                            {{tableItem.repairDesc}}
                        </FormItem>
                        <FormItem label="报修时间">
                            {{new Date(tableItem.createTime).toLocaleString()}}
                        </FormItem>
                    </Form>
                </Col>
                <Col span="6">
                    <h3>图片详情</h3>
                         <div style="margin-left: 150px;">
                            <div v-if="tableItem.imageUrl == null || tableItem.imageUrl == '' " style="width: 200px; height: 200px;">
                                没有上传图片
                                <img src="./22.png" alt="没有发现图片" style="width: 50%; height: 50%;"/>
                            </div>

                            <div v-else>
                                <div style="width: 170px; height: 250px; float: left;">
                                    <img :src="'/api/image/' +tableItem.imageUrl"  style="width: 100%; height:100%;box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.3); "/>
                                </div>
                                <div style="float: right;">
                                    <Icon type="ios-expand" @click="handleView()" style="font-size: 20px;">查看</Icon>
                                </div>

                                <Modal title="View Image" v-model="visible">
                                    <img :src="'/api/image/' +tableItem.imageUrl" v-if="visible" style="width: 80%; height: 80%; margin-left: 10%; ">
                                </Modal>
                            </div>

                         </div>
                </Col>

                <Col span="3" style="margin: 60px; left: 50px;">
                    <Button type="primary" @click="receiveTheRepair" long>接取此工单</Button>
                </Col>
            </Row>
        </Card>

    </div>
</template>

<script>
    export default {
        name: "MoreDetail",
        data(){
            return{
                repairDetailVisible:false,
                moreTable:[],
                spinShow:false,
                visible:false,
                tableItem:{
                    id:0,
                    submitNumber:'',
                    createTime:'',
                    repairAddress:'',
                    repairDesc:'',
                    status:'',
                    imageUrl:'',
                }
            }
        },

        created(){
            this.spinShow = true;
            this.getMoreTable();
            this.spinShow = false;
        },
        methods:{
            calculateTime(time){
                return new Date().getTime() - time
            },
            showItem(index){
                this.repairDetailVisible = true;
                this.tableItem.id = this.moreTable[index].id;
                this.tableItem.submitNumber = this.moreTable[index].submitNumber;
                this.tableItem.repairAddress = this.moreTable[index].repairAddress;
                this.tableItem.repairDesc = this.moreTable[index].repairDesc;
                this.tableItem.createTime = this.moreTable[index].createTime;
                this.tableItem.imageUrl =  this.moreTable[index].imageUrl;

            },
            handleView () {
                this.visible = true;
            },
            receiveTheRepair(){
                if(sessionStorage.getItem("role") != "3"){
                    this.$Message.error('抱歉,没有维修权限');
                    console.log(sessionStorage.getItem("role"))
                    return;
                }
                this.$axios({
                    method: "post",
                    url:'/api/first/receiveTheRepair',
                    data:{
                        id:this.tableItem.id,
                        number:sessionStorage.getItem("number")
                    }
                }).then(response =>{
                    if(response.data.success){
                        this.getMoreTable();
                        this.closeDetail();
                        this.$Message.success('已经接受了此工单');
                    }
                })
            },
            closeDetail(){
                this.repairDetailVisible = false;
            },
            getMoreTable(){
                this.$axios.get("/api/first/getMoreTable")
                    .then(response=>{
                        if(response.data.success){
                            this.moreTable = response.data.moreTable;
                            console.log(response.data.moreTable)
                        }
                    })
            },
        }
    }
</script>

<style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
</style>
