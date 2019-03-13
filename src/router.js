import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/Home";
import Login from "@/Login";
import First from "@/views/first/First";
import Personal from "@/views/first/Personal";
import Information from "@/views/role/Information";
import Repairs from "@/views/role/Repairs";
import Historyed from "@/views/role/Historyed";
import MoreDetail from "@/views/first/MoreDetail";
import AdminLogin from "@/AdminLogin";
import AdminHome from "@/AdminHome";
import Student from "@/views/admin/Student";
import Teacher from "@/views/admin/Teacher";
import Manager from "@/views/admin/Manager";
import RepairPeople from "@/views/admin/RepairPeople";
import Notice from "@/views/admin/Notice";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/login',
      name:"login",
      component:Login
    },
    {
      path:'/adminLogin',
      name:"adminLogin",
      component:AdminLogin
    },

    {
      path:'/home',
      component:Home,
      meta:{
        title:'首页'
      },
      children:[
        {
          path:'/',
          meta:{
            fatherId:"1",
          },
          component:First,
        },
        {
          path:'more',
          component:MoreDetail,
        },
        {
          path:'personal',
          meta:{
            fatherId:"2",
            title:'个人中心',
          },
          component:Personal,
          children:[
            {path:"/",name:"message",component:Information,meta:{fatherId:"2",id:"1"}},
            {path:"repairs",name:"repairs",component:Repairs,meta:{fatherId:"2",id:"2"}},
            {path:"history",name:"history",component:Historyed,meta:{fatherId:"2",id:"3"}},
          ]
        }
      ]
    },

    {
      path:'/adminHome',
      component:AdminHome,
      meta:{
        title:'首页',
        icon:'md-home',
      },
      children:[
        {
          path:"/",
          name:"notice",
          component:Notice,
          meta:
              {
                index:'1',
                title:'公告管理',
                icon:'ios-chatboxes'
              }
        },
        {
          path:"student",
          name:"student",
          component:Student,
          meta:
              {
                index:'2',
                title:'学生管理',
                icon:'ios-happy'
              }
        },
        {
          path:"teacher",
          name:"teacher",
          component:Teacher,
          meta:
              {
                index:'3',
                title:'教师管理',
                icon:'ios-man'
              }
        },
        {
          path:"manager",
          name:"manager",
          component:Manager,
          meta:
              {
                index:'4',
                title:'实验室管理员管理',
                icon:'md-medical'
              }
        },
        {
          path:"repairPeople",
          name:"repairPeople",
          component:RepairPeople,
          meta:
              {
                index:'5',
                title:'维修人员管理',
                icon:'md-build'
              }
        },

      ]
    }
  ],

})
