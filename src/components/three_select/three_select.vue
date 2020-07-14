<template>
 <div>
  <treeselect required   :placeholder="placeholder" :options="options" v-model="value" :multiple="multiple"  @input ="s" @select="onSelect">
    <div slot="value-label" slot-scope="{ node }">{{ node.raw.customLabel }}</div>
  </treeselect>
<!--  <p>
    <label><input type="checkbox" v-model="multiple">Multi-select</label>
  </p> -->
</div>
</template>
<style>
  .vue-treeselect__control{
    : #8a40a7;

  }
  </style>
<script>
 import {Treeselect} from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

const l = ["Sell", "Rent", "Exchange"];

export default {
   name: "tree_select",
  components: {Treeselect},
  data: () => ({
    placeholder: "Adverticement type",
    multiple: true,
    value: [],
    selected_values: [],
    options: l.map(i => ({
      id: l.indexOf(i),
      label: i,
      customLabel: i,

    })),
  }),
  methods: {
       onSelect(e){console.log(JSON.stringify(e));},
    s(e){
           console.log(JSON.stringify(e));
       // alert(this.value);
      //  this.selected_values.clear();
       // for (var i = 0; i < this.value.length; i++){
       //   alert("ffg");
        //  alert(i);
          //this.selected_values.push(i);
//        //alert(JSON.stringify(e))
    }
   }
}
</script>

<style scoped>

</style>