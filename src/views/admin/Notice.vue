<template>
    <div id="manager">
        <Modal
                v-model="modalVisible"
                :title="formTitle"
                :loading="modalLoading"
                @on-ok="asyncOK">
            <Form  ref="ItemData" :model="ItemData" :label-width="80">
                <FormItem label="学号/编号" prop="number">
                    <Input v-model="ItemData.number" ></Input>
                </FormItem>
                <FormItem label="姓名" prop="name">
                    <Input v-model="ItemData.name" ></Input>
                </FormItem>
                <FormItem label="用户名" prop="login.username">
                    <Input v-model="ItemData.login.username" ></Input>
                </FormItem>
                <FormItem label="密码" prop="login.password">
                    <Input v-model="ItemData.login.password" ></Input>
                </FormItem>
            </Form>
        </Modal>

        <Button type="success" style="margin-bottom: 10px;" @click="addStudent">添加实验室管理员</Button>


        <Table :data="managerData" :columns="studentColumns" stripe border :loading="loading">
            <template slot-scope="{row}" slot="login">
                <strong>用户名:  </strong>{{row.login.username}}&nbsp;&nbsp;&nbsp;&nbsp;
                <strong>密码:  </strong>{{row.login.password}}
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row)">修改</Button>
                <Button type="error" size="small" @click="remove(row)">删除</Button>
            </template>

        </Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="managerData.length" :current="1" @on-change=""></Page>
            </div>
        </div>
    </div>

</template>
<script>

    export default {
        data () {
            return {
                formType:1,//0 添加 1 编辑
                formTitle:'',
                modalVisible:false,
                modalLoading:true,
                loading:false,
                managerData: [],
                ItemData:{
                    id:'',
                    number:'',
                    name:'',
                    login:{
                        id:'',
                        username:'',
                        password:'',
                    }

                },
                studentColumns: [
                    {
                        title:'编号',
                        key:'number',
                        align:'center',
                        width: 350
                    },
                    {
                        title:'姓名',
                        key:'name',
                        align:'center',
                        width: 450
                    },
                    {
                        title: '登录信息',
                        slot: 'login',
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
            getAllStudent(){
                this.loading = true;
                this.$axios({
                    method:'get',
                    url:'/api/managerPeople/getAllManagerPeople',
                }).then(response =>{
                    if(response.data.success){
                        setTimeout(() =>{
                            this.managerData = response.data.ManagerPeopleList;
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
                        url:'/api/managerPeople/insertOrEditManagerPeople',
                        data:{
                            formType:this.formType,
                            ManagerPeopleInfo:this.ItemData
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
                this.formTitle = '添加实验室管理员';
                this.formType = 0;
            },
            edit(row){
                this.modalVisible = true;
                this.formTitle = '编辑信息';
                this.formType = 1;

                this.ItemData.id = row.id;
                this.ItemData.number = row.number;
                this.ItemData.name = row.name;
                this.ItemData.login.id = row.login.id;
                this.ItemData.login.username = row.login.username;
                this.ItemData.login.password = row.login.password;
            },
            remove(row){
                console.log(row)
                this.$axios.get("/api/managerPeople/deleteManagerPeopleById/" + row.id + '/' + row.login.id).then(
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
