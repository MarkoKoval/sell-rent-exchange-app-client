<template>
    <div>
   <treeselect
            @select="onSelect"
  :multiple="false"
  :options="options"
  :disable-branch-nodes="true"
  v-model="value"
    placeholder="Оберіть Категорію"

              :show-count="true"
            required
  />
        <!--  maxHeight=250-->
    </div>
</template>

<script>
    import json from './categories.json'
 import {Treeselect} from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'


export default {
         name: "tree_select2",
          components: {Treeselect},
  data: () => ({
    value: ["kfc-chicken-litties-sandwiches"],

    options: [ {
      id: 'm',
      label: 'McDonalds',
      children: [ {id: 'm-cheeseburger45',
        label: 'French Fries',
      }, {
        id: 'm-cheeseburger',
        label: 'Cheeseburger',
      }, {
        id: 'm-white-cheedar-burger',
        label: 'White Cheddar Burger',
      }, {
        id: 'm-southwest-buttermilk-crispy-chicken-salad',
        label: 'Southwest Buttermilk Crispy Chicken Salad',
      }, {
        id: 'm-cola',
        label: 'Coca-Cola®',
      }, {
        id: 'm-chocolate-shake',
        label: 'Chocolate Shake',
      } ],
    }, {
      id: 'kfc',
      label: 'KFC',
      children: [ {
        id: 'kfc-fries',
        label: 'French Fries',
      }, {
        id: 'kfc-chicken-litties-sandwiches',
        label: 'Chicken Litties Sandwiches',
      }, {
        id: 'kfc-grilled-chicken',
        label: 'Grilled Chicken',
      }, {
        id: 'kfc-cola',
        label: 'Pepsi® Cola',
      } ],
    }, {
      id: 'bk',
      label: 'Burger King',
      children: [ {
        id: 'bk-chicken-fries',
        label: 'Chicken Fries',
      }, {
        id: 'bk-chicken-nuggets',
        label: 'Chicken Nuggets',
      }, {
        id: 'bk-garden-side-salad',
        label: 'Garden Side Salad',
      }, {
        id: 'bk-cheeseburger',
        label: 'Cheeseburger',
      }, {
        id: 'bk-bacon-king-jr-sandwich',
        label: 'BACON KING™ Jr. Sandwich',
      }, {
        id: 'bk-cola',
        label: 'Coca-Cola®',
      }, {
        id: 'bk-oreo-chocolate-shake',
        label: 'OREO® Chocolate Shake',
      } ],
    } ],
  }),

    mounted(){
      //  alert(JSON.stringify(json));
          this.$emit("select-category","McDonalds");
    },

    methods:{
            onSelect(e){
             //   alert(JSON.stringify(e);
             /*   if (this.value.length !== 0)
                    this.value = [];.*/
            //    alert(JSON.stringify(e));
             //   alert(JSON.stringify(this.value));
                this.$emit("select-category",e.label);
            },


    }
}
</script>

<style scoped>

</style>