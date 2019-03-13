<template>
    <div>
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
                <FormItem label="系别" prop="department">
                    <Input v-model="ItemData.department" ></Input>
                </FormItem>
                <FormItem label="用户名" prop="login.username">
                    <Input v-model="ItemData.login.username" ></Input>
                </FormItem>
                <FormItem label="密码" prop="login.password">
                    <Input v-model="ItemData.login.password" ></Input>
                </FormItem>
            </Form>
        </Modal>

        <Button type="success" style="margin-bottom: 10px;" @click="addStudent">添加老师</Button>


        <Table :data="teacherData" :columns="studentColumns" stripe border :loading="loading">
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
                <Page :total="teacherData.length" :current="1" @on-change=""></Page>
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
                loading: false,
                modalVisible:false,
                modalLoading:true,
                teacherData: [],
                ItemData:{
                    id:'',
                    number:'',
                    name:'',
                    department:'',
                    login:{
                        id:'',
                        username:'',
                        password:'',
                    }
                },
                studentColumns: [
                    {
                        title:'教师编号',
                        key:'number',
                        align:'center',
                        width: 200
                    },
                    {
                        title:'姓名',
                        key:'name',
                        align:'center',
                        width: 250
                    },
                    {
                        title:'系别',
                        key:'department',
                        align:'center',
                        width: 250
                    },
                    {
                        title:'账户信息',
                        slot:'login',
                        align:'center',
                        width: 400
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
                    url:'/api/teacher/getAllTeacher',
                }).then(response =>{
                    if(response.data.success){
                        setTimeout(() => {
                            this.teacherData = response.data.TeacherList;
                            this.loading = false;
                        }, 1000);
                    }else{
                        this.$Message.error("加载失败")
                    }
                })
            },
            asyncOK () {
                setTimeout(() => {
                    console.log("teacher:" + this.Stude)
                    this.$axios({
                        method:'post',
                        url:'/api/teacher/insertOrEditTeacher',
                        data:{
                            formType:this.formType,
                            TeacherInfo:this.ItemData
                        }
                    }).then(response =>{
                        if(response.data.success)
                            this.getAllStudent();
                            this.$Message.success("操作成功");
                    })
                    this.modalVisible = false;
                }, 1000);
            },
            addStudent(){
                console.log(this.$refs['ItemData'].resetFields());
                this.modalVisible = true;
                this.formTitle = '添加教师';
                this.formType = 0;
            },
            edit(row){
                this.modalVisible = true;
                this.formTitle = '编辑信息';
                this.formType = 1;

                this.ItemData.id = row.id;
                this.ItemData.number = row.number;
                this.ItemData.name = row.name;
                this.ItemData.department = row.department;
                this.ItemData.login.id = row.login.id;
                this.ItemData.login.username = row.login.username;
                this.ItemData.login.password = row.login.password;

            },
            remove(row){
                this.$axios.get("/api/teacher/deleteTeacherById/" + row.id + '/' + row.login.id).then(
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

