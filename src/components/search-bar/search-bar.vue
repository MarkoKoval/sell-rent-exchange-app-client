<template>
  <div class = "inp">
    <b-form-input v-model="text" placeholder="Enter your name"></b-form-input>
  <!--  <div class="mt-2">Value: {{ text }}</div> -->
  </div>
</template>
<style>
    .inp {
        margin-left:10px;
           margin-right:10px;
           margin-bottom:10px;
           margin-top:10px;
    }
</style>
<script>
  export default {
      name: "search_bar",
    data() {
      return {
        text: ''
      }
    }
  }
</script>