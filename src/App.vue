<template>
  <div id="app" class='container'>
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
    
    <h1 class="text-center">{{ msg }}</h1>
    <hr>

    <router-view></router-view>

    <hr>
  </div>
</template>


<script>

export default {
  
  name: 'App',
  
  data() {
    return {
      msg: "The Car Park",    
      
    };
  },

  methods: {
  },

  components: {  
  }
}
</script>

<style>
  #app {
    margin-top: 60px;
  }
</style>