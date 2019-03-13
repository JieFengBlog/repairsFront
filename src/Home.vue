<template>
    <div id="home">
        <Layout class="r-layout">
            <Card shadow class="r-header-card">
            <Header >

                <img src="./assets/logo2.png" style="float: left; margin-left: 20px; cursor: pointer;" @click="jumpHome"/>
                <div class="r-container" style="width: 80%; margin-left: 20%;">

                        <div class="header-login"  v-if="loginShow">
                            <Dropdown>
                                <Avatar size="large" :style="{background: color}">{{name}}</Avatar>
                                    <Icon type="md-exit"  style="font-size: 24px; cursor: pointer;margin-left: 25px;" @click="exitSystem"/>
                            </Dropdown>
                        </div>

                        <div v-else class="header-login" style="float:right">

                                <Avatar src="http://pic.51yuansu.com/pic3/cover/00/94/68/58dcd6dae081f_610.jpg"  />

                            <Button type="text" ghost style="color:#000; font-size: 14px;" @click="Login">登&nbsp;录</Button>
                        </div>

                </div>


                    <Menu mode="horizontal"
                          theme="light"
                          :active-name="activeMenuIndex"
                          style="float: right;margin-right: 50px;"
                          >
                        <MenuItem name="1" to="/home/">
                            <Icon type="md-home" />
                            首页
                        </MenuItem>
                            <MenuItem name="2" to="/home/personal">
                                <Icon type="ios-people" />
                                个人中心
                            </MenuItem>
                    </Menu>
            </Header>
            </Card>
            <Content style="min-height: 820px; margin-top: 10px;">
                <router-view></router-view>
            </Content>
            <Footer style="background: #515a6e; text-align: center; height: 64px; color: #fff; ">
                <p>© 2019 山西省长治市长治学院</p>
            </Footer>
        </Layout>
    </div>
</template>
<script>

    const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae','#00CCCC','#9999FF','#CC6699','#FF9966','#FF99FF'];
    import First from './views/first/First'
    export default {
        name: 'home',
        data() {
            return {
                loginShow:true,
                name:'',
                color:'#ffbf00',
            };
        },
        components:{
            First
        },
        computed:{
            activeMenuIndex(){
                console.log(this.$route)
                return this.$route.meta.fatherId
            }
        },
        created(){
            this.color = ColorList[Math.floor((Math.random()*9)+1)]
            this.name = sessionStorage.getItem("name");
            if(!sessionStorage.getItem("login")){
                    this.loginShow = false;
            }
        },
        methods:{
            exitSystem(){
                sessionStorage.removeItem("login");
                this.$router.push("/login")
            },
            Login(){
                this.$router.push("/login")
            },
            jumpHome(){
                this.$router.push('/home')
            }
        }
    }
</script>


<style>
    .r-header-card .ivu-card-body{
        padding: 5px;
    }

    .r-layout .ivu-layout-header{
        background: #fff;
    }
    .r-container{
        position:relative;
        width: 100%;
    }

    .header-login{
        float:right;
    }
    #home .ivu-badge-count{
        position: absolute;
        top:0px
    }

    #home .ivu-tabs-nav{
        float: right;
    }
</style>

