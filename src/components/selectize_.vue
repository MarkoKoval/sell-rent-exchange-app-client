<template>
  <div>


    <multiselect

        class="selectbox-scrollable"
              :multiple="true"
  :taggable="true"
      v-model="selected"
      :options="options"
    @tag="addTag"
  :placeholder="place"
                @input="updateSelected"
    >
    </multiselect>


      <p>{{   selected}}</p>
  </div>
</template>
<style>

.selectbox-scrollable::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;
  background-color: #F5F5F5;
}

.selectbox-scrollable::-webkit-scrollbar
{
  width: 12px;
  background-color: #F5F5F5;
}

.selectbox-scrollable::-webkit-scrollbar-thumb
{
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #555;
}
</style>
<script>
  import Multiselect from 'vue-multiselect'
  export default {
      name:"test",
    components: { Multiselect },
          props: ["place", "tag_init", "need"],
    watch: {
            tag_init: function (e) {
            //  alert(1);
                this.selected = e;
                 this.$emit("change_tag",this.selected);
              //  alert(1)
             //   alert(e);
            },
        },
    data () {
      return {
        select_need: this.need,
        selected:this.tag_init,
        options: ['listFFFF FFFFFFF FFFF', 'of', 'options','list', 'of1', 'options1','list1', 'of2', 'options2','list2', 'of3', 'optio3ns']
      }
    },
    mounted(){
    //  alert("need " + this.select_need )
    },
   created(){
     // alert("need " + this.select_need )
    },
      methods: {
          addTag(e){
          //    alert(e);
              if (this.selected.length < 5){
                  if (e.length < 50 &&  this.selected.indexOf(e) === -1){
                   //   alert(1);
                      this.selected.push(e);
                  }else{
                     // alert(2);
                  }
              }
             this.$emit("change_tag",this.selected);
          },
          updateSelected(e){
          //    alert(e);
              if (this.selected.length > 5){

                this.selected.pop();
              }
              //  alert(this.selected);
                           this.$emit("change_tag",this.selected);

                     //
            //       alert(this.selected);

          }
      }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<!--
<template>
    <div>

        <selectize  ref="rr" required  :placeholder="place" :value="items" :settings="settings" :options="options" v-model="selected" data-max-items="3"></selectize>

    </div>
</template>

<script>
    import "selectize/dist/css/selectize.default.css";
import Selectize from '@idecardo/vue-selectize'

export default {
    name: "selectize_",
    components: {
        Selectize,
    },
    watch: {
        "selected":function (newVal, oldVal) {
            alert("watchh");
              this.$emit("select-tags",newVal);
        }
    },
    props: ["place", "tag_init"],
    data: () => ({
        options: [
            { value: 'One', text: 'One'   },
            { value: 'Two' , text: 'Two'   },
            { value: 'Three' , text: 'Three' },
            { value: 'Four' , text: 'Four'  },
            { value: 'Five', text: 'Five'  },

        ],

        selected: null,
        placeholder: "",
        settings: {
            maxItems: 3,
            items: ['One'],
            plugins: ['remove_button'],
            persist: false,
             create: true,
               createFilter: function(input) { return input.length <= 10 ; },
        },
    }),
    created(){
              this.$refs.rr.clearOptions();

    /*    var self = this;
        var el =  self.tag_init;
        alert("el "+  JSON.stringify( el));
     // this.selected = ["porn"];
      alert("this.selected", JSON.stringify( this.selected));
     alert("self.place "+self.place);
      alert("self.tag_init "+JSON.stringify( self.tag_init));*/
     //   alert(1)
    //  alert(typeof place);
      /*  let self = this;
        alert(self.place);
        var placeholder = self.place;
            alert(placeholder);*/
    },
    methods:{

    }
}

</script>-->