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
                <FormItem label="班级" prop="studentClass">
                    <Input v-model="ItemData.studentClass" ></Input>
                </FormItem>
                <FormItem label="用户名" prop="login.username">
                    <Input v-model="ItemData.login.username" ></Input>
                </FormItem>
                <FormItem label="密码" prop="login.password">
                    <Input v-model="ItemData.login.password" ></Input>
                </FormItem>
            </Form>
        </Modal>

        <Button type="success" style="margin-bottom: 10px;" @click="addStudent">添加学生</Button>


        <Table :data="studentData.slice((currentPage-1)*currentSize,currentPage*currentSize)" :columns="studentColumns" stripe border :loading="loading">
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
                <Page :total="studentData.length"
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
                studentData: [],
                ItemData:{
                    id:'',
                    number:'',
                    name:'',
                    department:'',
                    studentClass: '',
                    login:{
                        id:'',
                        username:'',
                        password:'',
                    }

                },
                studentColumns: [
                    {
                        title:'学号',
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
                        title:'班级',
                        key:'studentClass',
                        align:'center',
                        width: 250
                    }
                    ,
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
                    url:'/api/student/getAllStudent',
                }).then(response =>{
                    if(response.data.success){
                        setTimeout(() =>{
                            this.studentData = response.data.studentList;
                            this.loading = false;
                        },1000)

                    }
                })
            },
            asyncOK () {
                setTimeout(() => {
                    this.$axios({
                        method:'post',
                        url:'/api/student/insertOrEditStudent',
                        data:{
                            formType:this.formType,
                            studentInfo:this.ItemData
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
                this.formTitle = '添加学生';
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
                this.ItemData.studentClass = row.studentClass;
                this.ItemData.login.id = row.login.id;
                this.ItemData.login.username = row.login.username;
                this.ItemData.login.password = row.login.password;

            },
            remove(row){
                this.$axios.get("/api/student/deleteStudentById/" + row.id + '/' + row.login.id).then(
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
