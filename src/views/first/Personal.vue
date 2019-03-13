<template>

    <div id="personal">
        <div style="width: 80%; margin-left: 10%; ">
            <Card style="min-height: 600px; box-shadow:0 1px 6px rgba(0, 0, 0, 0.2)">
                <Row>
                    <Col span="5">
                            <Menu theme="light" :active-name="activeMenuIndex" style="margin-top: 100px;">
                                <MenuGroup title="内容管理">
                                        <MenuItem name="1" to="/home/personal">
                                            <Icon type="md-notifications" />
                                            个人信息
                                        </MenuItem>
                                    <MenuItem name="2" to="/home/personal/repairs">
                                        <Icon type="ios-hammer" />
                                        所有工单
                                    </MenuItem>

                                    <MenuItem name="3" to="/home/personal/history">
                                        <Icon type="ios-time" />
                                        维修历史
                                    </MenuItem>
                                </MenuGroup>
                            </Menu>
                    </Col>


                    <div style="margin:80px 60px">
                        <router-view/>
                    </div>
                </Row>
            </Card>

        </div>
    </div>


</template>

<script>
    export default {
        name: "Personal",
        data(){
            return{
            }
        },
        computed:{
            activeMenuIndex(){
                console.log(this.$route)
                return this.$route.meta.id
            }
        },
        mounted(){
            if(!sessionStorage.getItem("login"))

                this.$router.push("/login")
        }

    }
</script>

<style>

    #personal{
        margin-top: 20px;
    }
    #personal .ivu-card-body{
        padding:0px;
    }
</style>
