<template>
    <div id="login">
        <div style="z-index: 3; position: absolute; width: 100%; height: 100%; background: rgba(0,0,0,0.5); ">

        </div>
            <i-form ref="formLogin" :model="formLogin" :rules="formLoginRules"  class="card-box">
                <Form-item class="formLogin-title">
                    <h3>系统登录</h3>
                </Form-item>

                <Form-item prop="username">
                    <i-input size="large" type="text" v-model="formLogin.username" placeholder="用户名">
                        <Icon type="md-person" slot="prepend"/>
                    </i-input>
                </Form-item>
                <Form-item prop="password">
                    <i-input size="large"  type="password" v-model="formLogin.password" placeholder="密码">
                        <Icon type="md-lock" slot="prepend"></Icon>
                    </i-input>
                </Form-item>
                <Form-item >
                    <div style="float: right;">
                        <span>选择身份登录： </span>
                        <Select v-model="role" style="width:200px">
                            <Option v-for="item in roleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </div>

                </Form-item>
                <Form-item>
                        <Checkbox v-model="remember">   &nbsp;&nbsp;记住密码</Checkbox>
                </Form-item>
                <Form-item class="login-no-bottom">
                    <Row>
                        <Col span="18" offset="3">
                            <Button type="primary" :loading="loading"  @click="handleSubmit('formLogin')" long>
                                <span v-if="!loading">登&nbsp;&nbsp; 录</span>
                                <span v-else>登录中...</span>
                            </Button>
                        </Col>

                    </Row>
                </Form-item>
            </i-form>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                role:0,
                remember:false,
                formLogin: {
                    username: '',
                    password: '',
                },
                roleList: [
                    {
                        value: 0,
                        label: '学生'
                    },
                    {
                        value: 1,
                        label: '老师'
                    },
                    {
                        value: 2,
                        label: '实验室管理员'
                    },
                    {
                        value: 3,
                        label: '维修员'
                    },
                ],

                loading:false,
                formLoginRules: {
                    username: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                if(this.formLogin.username == '' || this.formLogin.password == ''){
                    this.$Message.warning('请输入用户名或者密码');
                    return;
                }
                this.loading = true
                this.$axios({
                    method:'post',
                    url:'/api/login/validation',
                    data:{
                        "Login" :{
                            username:this.formLogin.username,
                            password:this.formLogin.password
                        },
                        "role":this.role
                    }
                }).then(response=>{
                    if(response.data.success){
                        if(this.remember){
                            sessionStorage.setItem("remember","true");
                        }else{
                            sessionStorage.removeItem("remember")
                        }
                        this.handlerRole(response.data.userInfo);
                        sessionStorage.setItem("login","true");
                        sessionStorage.setItem("role",this.role);
                        this.$Message.success('登录成功');
                        this.$router.push("/home");
                    }else{
                            this.$Message.error(response.data.errMsg);
                            this.loading = false
                    }
                })
            },
            handlerRole(userInfo){
                sessionStorage.setItem("username",this.formLogin.username);
                sessionStorage.setItem("password",this.formLogin.password);
                sessionStorage.setItem("name",userInfo.name);
                sessionStorage.setItem("number",userInfo.number);
                sessionStorage.setItem("id",userInfo.id);
                switch (this.role) {
                    case 0:
                        sessionStorage.setItem("department",userInfo.department);
                        sessionStorage.setItem("studentClass",userInfo.studentClass);
                        break;
                    case 1:
                        sessionStorage.setItem("department",userInfo.department);
                        break;
                    case 3:
                        sessionStorage.setItem("address",userInfo.address);
                        sessionStorage.setItem("phone",userInfo.phone);
                }
            }
        },
        created() {
                if(sessionStorage.getItem("remember")){
                    this.remember = true;
                    this.formLogin.username = sessionStorage.getItem("username");
                    this.formLogin.password = sessionStorage.getItem("password");
                }
        }
    }
</script>


<style scoped>
    .card-box {
        padding: 20px;
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        background-color: #F9FAFC;
        width: 400px;
        z-index: 999;
        box-shadow:  rgba(255,255,255,0.8) 0px  0px 15px;
        /* border: 2px solid #8492A6;*/
    }

    .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
    .formLogin-title {
        text-align: center;
        font-seze: 28px;
    }
    .formLogin-title h3{
        font-size: 18px;
    }
    .login-no-bottom {
        margin-bottom: 10px;
    }

    #login{
        position: fixed;
        width: 100%;
        height: 100%;
        background-size:cover;
        background: url("./assets/bg.jpg");
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
    }
    #login:after{
        content: "";
        width:100%;
        height:100%;
        position: absolute;
        left:0;
        top:0;
        background: inherit;
        filter: blur(5px);
        z-index: 2;
    }

</style>
