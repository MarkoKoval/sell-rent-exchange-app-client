<template>
        <!-- object value -->
      <model-select :options="options"
                                v-model="item"
                                placeholder="select item">
         </model-select>

         <!-- string value -->
       <!--  <model-select :options="options2"
                                 v-model="item2"
                                 placeholder="select item2">
         </model-select> -->
</template>

<script>
  import { ModelSelect } from 'vue-search-select'

  export default {
    data () {
      return {
          name: "search",
       options: [
          { value: '1', text: 'aa' + ' - ' + '1' },
          { value: '2', text: 'ab' + ' - ' + '2' },
          { value: '3', text: 'bc' + ' - ' + '3' },
          { value: '4', text: 'cd' + ' - ' + '4' },
          { value: '5', text: 'de' + ' - ' + '5' }
        ],
        item: {
          value: '',
          text: ''
        },
       /* options2: [
          { value: '1', text: 'aa' + ' - ' + '1' },
          { value: '2', text: 'ab' + ' - ' + '2' },
          { value: '3', text: 'bc' + ' - ' + '3' },
          { value: '4', text: 'cd' + ' - ' + '4' },
          { value: '5', text: 'de' + ' - ' + '5' }
        ],
        item2: ''*/
      }
    },
      watch:{
        "item": function (el) {
            this.$emit("select_wished", el);
        },
      },
    methods: {
   /*   reset () {
        this.item = {}
      },
      selectFromParentComponent1 () {
        // select option from parent component
        this.item = this.options[0]
      }
      reset2 () {
        this.item2 = ''
      },
      selectFromParentComponent2 () {
        // select option from parent component
        this.item2 = this.options2[0].value
      }*/
    },
    components: {
      ModelSelect
    }
  }
</script>