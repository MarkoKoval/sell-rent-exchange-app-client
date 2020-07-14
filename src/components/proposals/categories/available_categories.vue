<template>
    <div>
   <treeselect
            @select="onSelect"
  :multiple="false"
  :options="options"
  :disable-branch-nodes="true"
  v-model="value"


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
         name: "available_categories",
          components: {Treeselect},
props: ["category", "subcategory"],
  data: () => ({
    value: ["ІншеA"],//this.subcategory === undefined?["ІншеA"] : [this.subcategory],

    options: [],

  }),

    mounted(){

             const alp = ['A','B', 'C','D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'X', 'Z',  'W', 'Y']
             for(var i in json){
                 var child = [];
                 //alert(json[i]);
                 for(var j =0; j< json[i].length; j++){
                     child.push({id:  i+alp[j], label:json[i][j]})
                 }
                 this.options.push({id: 'm',
      label: i,  children: child});
                 //alert(i);
             }
      // alert(JSON.stringify(this.options));
       // alert(this.subcategory)
       // alert(JSON.stringify(this.options))
        this.value =  this.subcategory === undefined ? ["ІншеA"] : [this.subcategory];
       // alert(JSON.stringify(this.options))
      //  alert( this.subcategory === undefined )
        var res = this.subcategory === undefined ? {category: "Інше",subcategory: "Інше"} :
            {category: this.category,subcategory: this.subcategory}
       this.$emit("select-category",res);
    },

    methods:{
            onSelect(e){
             //   alert();
              // alert(JSON.stringify(e));
             /*   if (this.value.length !== 0)
                    this.value = [];.*/
            //    alert(JSON.stringify(e));
             //   alert(JSON.stringify(this.value));
          //      alert(e.id);
                //alert();
                var res = {category: e.id.slice(0, -1),subcategory: e.label};
                this.$emit("select-category",res);
            },


    }
}
</script>

<style scoped>

</style>