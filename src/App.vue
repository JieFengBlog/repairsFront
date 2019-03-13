<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
  import Home from './Home'
  import In from './views/In'
  export default {
    data(){

    },
    components:{
      Home,
      In
    },
    created(){
      for(let i = 0; i < this.$router.history.current.matched.length; i++ ){
        console.log(this.$router.history.current.matched[i].meta.title)
      }
      console.log()
    }
  }
</script>
<style>

</style>
