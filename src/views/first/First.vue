<template>
    <Row style="margin-top: 20px; margin-bottom: 15px;" id="first">
        <Col span="10" style="margin-left: 120px;">
            <Card style="box-shadow:0 1px 6px rgba(0, 0, 0, 0.2)">
                <p slot="title">公告信息</p>
                <Tabs value="name1">
                    <TabPane label="维修公告" name="name1">

                        <Row :gutter="30" >
                            <Col span="12" v-for="(item,index) in firstTable" :key="index" style="margin-bottom: 40px;">
                                <Card class="repair-order-title">
                                    <div slot="title">
                                        <Icon type="ios-time-outline" style="font-size: 20px; color: #33CCCC;"/>
                                        <Time :time="new Date().getTime() - calculateTime(item.createTime)" slot="title" />
                                    </div>
                                    <a @click="showMore" slot="extra"  style="color: #33CCCC;">
                                        <Icon type="ios-loop-strong" ></Icon>
                                        更多详情
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
                            <Spin size="large" fix v-if="spinShow"></Spin>
                            <Button type="primary" style="float:right; margin-right: 20px;" @click="showMore">查看更多</Button>
                        </Row>
                    </TabPane>
                    <TabPane label="系统公告" name="name2">标签二的内容</TabPane>
                </Tabs>
            </Card>
        </Col>




        <Col span="11" style="margin-left: 50px;">
            <Card  style="box-shadow:0 1px 6px rgba(0, 0, 0, 0.2)">
                <p slot="title" >填写报修单</p>
                <Form :model="repairTable" :label-width="150">
                    <FormItem label="报修地点">
                        <Input v-model="repairTable.address" placeholder="需要报修的机器在哪里"></Input>
                    </FormItem>
                    <FormItem label="具体说明">
                        <Input v-model="repairTable.desc" placeholder="发生什么故障" type="textarea"></Input>
                    </FormItem>
                    <FormItem label="上传具体的图片(可选)">
                        <Upload
                                :data="data"
                                multiple
                                type="drag"
                                name="tableImg"
                                :on-success="fileSuccess"
                                :before-upload="uploadValidation"
                                action="/api/first/insertImage">
                            <div style="padding: 20px 0">
                                <Icon type="ios-cloud-upload" size="52" style="color: #33CCCC"></Icon>
                                <p>拖动或者点击上传</p>
                            </div>
                        </Upload>
                    </FormItem>
                    <FormItem style="margin-top: 38px;">
                        <Button type="primary" long style="width: 150px; float:right; margin-right: 50px;" @click="submitTable">提交</Button>
                    </FormItem>
                </Form>
            </Card>
        </Col>
    </Row>
</template>

<script>
    export default {
        name: "First",
        data(){
            return{
                imgName: '',
                visible: false,
                uploadList: [],
                number:15407321,
                time2:  (new Date()).getTime() - 60 * 3 * 1000,
                imgName: '',
                data:{
                  number:sessionStorage.getItem("number")
                },
                visible: false,
                spinShow:false,
                uploadList: [],
                firstTable: [],
                repairTable:{
                    address:'',
                    desc:'',
                }
            }
        },
        mounted(){
            this.spinShow = true;
            this.getFirstTable();
            this.spinShow = false;
            console.log("first" + sessionStorage.getItem("number"))
        },
        methods:{

            getFirstTable(){
                this.$axios.get("/api/first/getFirstTable")
                    .then(response=>{
                        if(response.data.success){
                            this.firstTable = response.data.firstTableList;
                        }
                    })
            },
            submitTable(){
                if(!sessionStorage.getItem("number")) {
                    this.$Message.warning('请先登录');
                    this.$router.push("/login");
                    return;
                }
                if(this.repairTable.address == '' || this.repairTable.desc == ''){
                    this.$Message.error('表单中有内容为空,提交失败');
                    return;
                }
              this.$axios({
                  method:"post",
                  url:"/api/first/insertRepairTable",
                  data:{
                      repairTable:this.repairTable
                  }
              }).then(response=>{
                  if(response.data.success){
                      this.getFirstTable();
                      this.$Message.success('提交成功');
                  }else{
                      this.$Message.error('提交失败');
                  }
              })
            },
            calculateTime(time){
                return new Date().getTime() - time
            },
            showMore(){
                this.$router.push('/home/more');
            },
            fileSuccess(file){
                console.log(file.repairsTableId)
            },
            uploadValidation(){
                if(!sessionStorage.getItem("number")) {
                    this.$Message.warning('请先登录');
                    this.$router.push("/login");
                    return false;
                }

                if(sessionStorage.getItem("role") == '3'){
                    this.$Message.warning('没有提交权限,维修人员不能自己提交工单');
                    return false;
                }

            }
        }
    }
</script>

<style scoped>
.repair-order-title span{
    font-size: 15px;
    margin:10px ;
}
    #first Time{
        margin-top: 10px;
    }
.demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
}
.demo-upload-list img{
    width: 100%;
    height: 100%;
}
.demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
}
.demo-upload-list:hover .demo-upload-list-cover{
    display: block;
}
.demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
</style>
