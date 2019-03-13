<template>
    <div>
            <Col span="10"  style="height: 400px; " id="my-info">
                <div class="header-img">
                    <div></div>
                </div>
                <Form :model="formItem" :label-width="80" v-if="role == 0">
                    <FormItem label="学号/编号">
                       <Strong>{{formItem.number}}</Strong>
                    </FormItem>
                    <FormItem label="姓名">
                        <Strong>{{formItem.name}}</Strong>
                    </FormItem>
                    <FormItem label="系别">
                        <Strong>{{formItem.department}}</Strong>
                    </FormItem>
                    <FormItem label="班级">
                        <Strong>{{formItem.studentClass}}</Strong>
                    </FormItem>
                </Form>
                <Form :model="formItem" :label-width="80" v-else-if="role == 1">
                    <FormItem label="学号/编号">
                        <Strong>{{formItem.number}}</Strong>
                    </FormItem>
                    <FormItem label="姓名">
                        <Strong>{{formItem.name}}</Strong>
                    </FormItem>
                    <FormItem label="系别">
                        <Strong>{{formItem.department}}</Strong>
                    </FormItem>
                </Form>
                <Form :model="formItem" :label-width="80"  v-else-if="role == 2">
                    <FormItem label="学号/编号">
                        <Strong>{{formItem.number}}</Strong>
                    </FormItem>
                    <FormItem label="姓名">
                        <Strong>{{formItem.name}}</Strong>
                    </FormItem>
                </Form>
                <Form :model="formItem"  v-else-if="role == 3">
                    <FormItem label="学号/编号">
                        <Strong>{{formItem.number}}</Strong>
                    </FormItem>
                    <FormItem label="姓名">
                        <Strong>{{formItem.name}}</Strong>
                    </FormItem>
                    <FormItem label="地址">
                        <Strong>{{formItem.address}}</Strong>
                    </FormItem>
                    <FormItem label="联系方式">
                        <Strong>{{formItem.phone}}</Strong>
                    </FormItem>
                </Form>

            </Col>
    </div>
</template>

<script>
    export default {
        name: "Message",
        data() {
            return {
                role:0,
                formItem: {
                    number:0,
                    name:'',
                    department:'',
                    studentClass:'',
                    address:'',
                    phone:''
                }
            }
        },
        created() {
            this.role = sessionStorage.getItem("role");
            this.formItem.number = sessionStorage.getItem("number");
            this.formItem.name = sessionStorage.getItem("name");
            if(this.role == 0){
                this.formItem.department = sessionStorage.getItem("department");
                this.formItem.studentClass = sessionStorage.getItem("studentClass")
            }else if (this.role == 1){
                this.formItem.department = sessionStorage.getItem("department")
            }else{
                this.formItem.address = sessionStorage.getItem("address");
                this.formItem.phone = sessionStorage.getItem("phone")
            }
        }
    }
</script>

<style>
    #my-info .ivu-form .ivu-form-item-label{
        color:#1ab3a7;
        font-weight: bold;
    }
    #my-info{
        margin-left: 100px;
    }

    #my-info .ivu-form-item-content{
        font-size: 15px;
    }
    #my-info .header-img {
        margin-bottom:5px;
        margin-left: 100px;
        height: 100px;
        width:600px;
        background-image: url("static/birds.png");
        background-size: cover;
    }
    #my-info Form{
        margin-left: 300px;
        margin-top: 30px;
    }
</style>
