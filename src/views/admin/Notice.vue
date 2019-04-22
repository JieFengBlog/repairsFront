<template>
    <div id="manager">
        <Modal
                v-model="modalVisible"
                :title="formTitle"
                :loading="modalLoading"
                @on-ok="asyncOK">
            <Form  ref="ItemData" :model="ItemData" :label-width="80">
                <FormItem label="标题" prop="title">
                    <Input v-model="ItemData.title" ></Input>
                </FormItem>
                <FormItem label="发布人" prop="name">
                    <Input v-model="ItemData.name" ></Input>
                </FormItem>
                <FormItem label="公告内容" prop="content">
                    <Input v-model="ItemData.content" type="textarea"></Input>
                </FormItem>
            </Form>
        </Modal>

        <Button type="success" style="margin-bottom: 10px;" @click="addStudent">添加公告信息</Button>


        <Table :data="managerData.slice((currentPage-1)*currentSize,currentPage*currentSize)" :columns="studentColumns" stripe border :loading="loading">
            <template slot-scope="{row}" slot="createTime">
                    {{new Date(row.createTime).toLocaleString()}}
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row)">修改</Button>
                <Button type="error" size="small" @click="remove(row)">删除</Button>
            </template>

        </Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="managerData.length"
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
        data () {
            return {
                currentSize:10,
                currentPage:1,
                formType:1,//0 添加 1 编辑
                formTitle:'',
                modalVisible:false,
                modalLoading:true,
                loading:false,
                managerData: [],
                ItemData:{
                    id:'',
                    title:'',
                    name:'',
                    content:'',
                    createTime:''

                },
                studentColumns: [
                    {
                        title:'标题',
                        key:'title',
                        align:'center',
                        width: 250
                    },
                    {
                        title:'发送人',
                        key:'name',
                        align:'center',
                        width: 150
                    },
                    {
                        title: '内容',
                        key: 'content',
                        align: 'center',
                        width: 800
                    },
                    {
                        title: '发送时间',
                        slot: 'createTime',
                        width: 250,
                        align: 'center'
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        align: 'center'
                    }
                ]
            }
        },
        methods: {
            handleSizeChange(val) {
                this.currentSize = val
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            getAllStudent(){
                this.loading = true;
                this.$axios({
                    method:'get',
                    url:'/api/notice/getAllNotice',
                }).then(response =>{
                    if(response.data.success){
                        setTimeout(() =>{
                            this.managerData = response.data.NoticeList;
                            this.loading = false;
                        },1000)
                    }else{
                        this.$Message.error("获取数据失败")
                    }
                })
            },
            asyncOK () {
                setTimeout(() => {
                    this.$axios({
                        method:'post',
                        url:'/api/notice/insertOrEditNotice',
                        data:{
                            formType:this.formType,
                            NoticeInfo:this.ItemData
                        }
                    }).then(response =>{
                        if(response.data.success)
                        {
                            this.getAllStudent();
                            this.$Message.success("操作成功");
                        }

                    })
                    this.modalVisible = false;
                }, 1000);
            },
            addStudent(){
                console.log(this.$refs['ItemData'].resetFields());
                this.modalVisible = true;
                this.formTitle = '添加公告信息';
                this.formType = 0;
            },
            edit(row){
                this.modalVisible = true;
                this.formTitle = '编辑公告信息';
                this.formType = 1;

                this.ItemData.id = row.id;
                this.ItemData.title = row.title;
                this.ItemData.name = row.name;
                this.ItemData.content = row.content;
            },
            remove(row){
                console.log(row)
                this.$axios.get("/api/notice/deleteNoticeById/" + row.id).then(
                    response=>{
                        if(response.data){
                            this.getAllStudent();
                            this.$Message.success("删除成功");
                        }
                    }
                )
            }
        },
        created(){
            this.getAllStudent();
        }
    }
</script>

<style >
    #manager dfklsjkfldj{

    }
</style>
