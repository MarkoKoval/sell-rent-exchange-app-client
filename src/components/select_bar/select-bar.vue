<template>
  <div class="sel">
    <b-form-select v-model="selected" :options="options" :value="selectedI" v-on:change="onChange"></b-form-select>
   <!-- <div class="mt-3">Selected: <strong>{{ selected }}</strong></div> -->
  </div>
</template>
<style>
    .sel {
        margin-left:10px;
           margin-right:10px;
           margin-bottom:10px;
           margin-top:10px;
    }
</style>
<script>
    import Vue from 'vue'
  export default {
      name: "select_bar",
     // props: ["selected", "options"],
    data() {
      return {
        selected: null,selectedI: "",
        options: [
          { value: null, text: 'Please select an option' },
          { value: 'a', text: 'This is First option' },
          { value: 'b', text: 'Selected Option' },
          { value: 'c', text: 'This is an option with object value' },
          { value: 'd', text: 'This one is disabled', disabled: true }
        ]
      }
    },
      mounted(){
            this.selectedI = "a"
      },
       methods: {
        onChange(event) {

            this.selectedI = event;
            this.$emit('select_changed', this.selectedI);
        }
    }
  }
</script>