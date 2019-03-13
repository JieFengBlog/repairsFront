<template>
    <div class="adminHome" style="height:100vh">
        <div class="layout">
            <Layout style="position: absolute;top: 0px;bottom: 0px;left: 0px;right: 0px;" >
                <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                    <Menu :active-name="activeMenuIndex" theme="dark" width="auto" :class="menuitemClasses" style="margin-top: 64px;">
                        <MenuItem name="1" to="/adminHome">
                            <Icon type="ios-chatboxes" />
                            <span>公告管理</span>
                        </MenuItem>
                        <MenuItem name="2" to="/adminHome/student">
                            <Icon type="ios-happy" />
                            <span>学生管理</span>
                        </MenuItem>
                        <MenuItem name="3" to="/adminHome/teacher">
                            <Icon type="ios-man" />
                            <span>教师管理</span>
                        </MenuItem>
                        <MenuItem name="4" to="/adminHome/manager">
                            <Icon type="md-medical" />
                            <span>实验室管理员</span>
                        </MenuItem>
                        <MenuItem name="5" to="/adminHome/repairPeople">
                            <Icon type="md-build" />
                            <span>维修人员管理</span>
                        </MenuItem>
                    </Menu>
                </Sider>
                <Layout>
                    <Header :style="{padding: 0}" class="layout-header-bar">
                            <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px',cursor:'pointer'}" type="md-menu" size="24"></Icon>
                            <div style="float: right; margin-right: 50px;">
                                <Dropdown  @on-click="adminCenter">
                                    <div style="cursor: pointer; height: 40px; font-size: 15px">

                                        管理中心
                                        <Icon type="ios-arrow-down"></Icon>
                                    </div>
                                    <DropdownMenu slot="list">
                                        <DropdownItem name="1">修改密码</DropdownItem>
                                        <DropdownItem divided name="0">退出登录</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                    </Header>
                    <Card style="margin-top: 10px ;box-shadow:0 1px 6px rgba(0, 0, 0, 0.1)">
                        <Breadcrumb>
                            <BreadcrumbItem v-for="(item,index) in breadList " :to="item.path" :key="index">
                                <Icon :type="item.meta.icon"></Icon>{{item.meta.title}}
                            </BreadcrumbItem>
                        </Breadcrumb>
                    </Card>
                    <Content :style="{margin: '20px', background: '#fff', minHeight: '260px',padding:'20px'}">
                        <router-view/>
                    </Content>
                </Layout>
            </Layout>
        </div>
        <Modal
                v-model="modal1"
                title="更改管理员密码"
                @on-ok="ok"
                @on-cancel="cancel">
            <Form  ref="changeData" :model="changeData" :rules="ruleInline">
                <FormItem prop="oldPassword">
                    <Input type="password" v-model="changeData.oldPassword" placeholder="旧密码">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="newPassword">
                    <Input type="password" v-model="changeData.newPassword" placeholder="新密码">
                        <Icon type="ios-unlock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>


    export default {
        data () {
            return {
                modal1:false,
                isCollapsed: false,
                breadList:[],
                changeData:{
                    oldPassword:'',
                    newPassword:''
                },
                ruleInline: {
                    oldPassword: [
                        { required: true, message: '输入不能为空', trigger: 'blur' }
                    ],
                    newPassword: [
                        { required: true, message: '输入不能为空', trigger: 'blur' },
                    ],
                }
            }
        },
        created(){
            if(!sessionStorage.getItem("adminLoginStatus")){
                this.$router.push("/adminLogin");
                return;
            }
            this.breadList = this.$router.history.current.matched;
        },
        computed: {
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            },
            activeMenuIndex(){
                return this.$router.history.current.matched[this.$router.history.current.matched.length-1].meta.index
            }
        },
        methods: {
            collapsedSider () {
                this.$refs.side1.toggleCollapse();
            },
            adminCenter(name){
                if(name == "0"){
                    this.sessionStorage.removeItem("adminLoginStatus");
                    this.$router.push("/adminLogin");
                }else{
                    this.modal1 = true;
                }
            },
            ok () {

                if(this.changeData.oldPassword == '' || this.changeData.newPassword == ''){
                    this.$Message.warning('提交不能为空');
                    return;
                }

                this.$axios({
                    method:'post',
                    url:'/api/login/changePassword',
                    data:{
                        oldPassword:this.changeData.oldPassword,
                        newPassword:this.changeData.newPassword
                    }
                }).then(response=>{
                    if(response.data.success){
                        this.changeData.oldPassword = '';
                        this.changeData.newPassword = '';
                        this.$Message.success('密码已经成功更改');
                    }else{
                        this.$Message.error(response.data.errMsg);
                    }
                })

            },
            cancel () {
                this.$Message.info('已经取消更改密码');
            }
        },
        watch:{
            $route(){
                this.breadList = this.$router.history.current.matched
                console.log(this.$route.path)
            }
        },
    }
</script>

<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 100px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }

    .adminHome  .layout[data-v-0a44ba25]{
        border: none;
    }
    .adminHome .layout[data-v-0a44ba25]{
        position: relative;
        width: 100%;
        height: 100%;
    }
</style>
