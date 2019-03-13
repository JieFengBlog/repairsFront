<template>
    <div id="login">
        <i-form ref="adminLogin" :model="adminLogin"   class="card-box">
            <Form-item class="formLogin-title">
                <h3>实验室维修系统后台登录</h3>
            </Form-item>

            <Form-item prop="username">
                <i-input size="large" type="text" v-model="adminLogin.username" placeholder="用户名">
                    <Icon type="md-person" slot="prepend"/>
                </i-input>
            </Form-item>
            <Form-item prop="password">
                <i-input size="large"  type="password" v-model="adminLogin.password" placeholder="密码">
                    <Icon type="md-lock" slot="prepend"></Icon>
                </i-input>
            </Form-item>
            <Form-item class="login-no-bottom">
                <Row>
                    <Col span="18" offset="3">
                        <Button type="primary" :loading="loading"  @click="adminLoginValidation" long>
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
                adminLogin: {
                    username: '',
                    password: '',
                },
                loading:false,
            }
        },
        methods: {
            adminLoginValidation() {
                this.loading = true;
                if(this.adminLogin.username == '' || this.adminLogin.password == ''){
                    this.$Message.warning("输入不能为空");
                    this.loading = false;
                    return;
                }

                this.$axios({
                    method:'post',
                    url:'/api/login/adminValidation',
                    data:{
                        adminLogin:this.adminLogin
                    }
                }).then(response=>{
                    if(response.data.success){
                        sessionStorage.setItem("adminLoginStatus","1");
                        this.$router.push("/adminHome");
                        this.$Message.success("登录成功");
                    }else{
                        this.$Message.error(response.data.errMsg);
                        this.loading = false;
                    }
                })
            },
        },
        created() {
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
        margin-bottom: 20px;
        background-color: #F9FAFC;
        margin: 300px auto;
        width: 400px;
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
        background: #3399FF;
    }
</style>
