<template>
  <div>


    <multiselect

        class="selectbox-scrollable your_custom_class"
              :multiple="true"
  :taggable="true"
      v-model="selected"
      :options="options"
    @tag="addTag"
  :placeholder="place_"
                @input="updateSelected"
    >
    </multiselect>


     <!-- <p>{{   selected}}</p> -->
  </div>
</template>
<style lang="css" scoped>
.your_custom_class >>> .multiselect__tag {

  background-color: dodgerblue;
}
</style>
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
   import current_host from "../get_api_host.js"
  import $ from "jquery"
  import Multiselect from 'vue-multiselect'
  export default {
      name:"test",
    components: { Multiselect },
          props: ["place", "tag_init", "need", "user"],
    watch: {
        proposals_: function(e){
    //      alert(JSON.stringify(e));
        //  this.options = []
        },
       selected: function (e) {
         // alert("tag")
        },
            tag_init: function (e) {
  //    alert(JSON.stringify(this.selected))
          if(this.select_need === 'Пошук наявних пропозицій'){
              this.$emit("change_tag", this.selected, this.proposals_.filter(p => this.selected.includes(p.title) ));
            }
            else {
              this.$emit("change_tag", this.selected);
            }
        //  alert("tag")
            //  alert(1);
              //  this.selected = e;
              //   this.$emit("change_tag",this.selected);
              //  alert(1)
             //   alert(e);
            },
        },
    data () {
      return {
        place_ : this.place !== undefined?  this.place:'Описові теги',
        proposals_: [],
        select_need: this.need  ,
        selected:this.tag_init,
        options: ["розваги"],//['listFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', 'of', 'options','list', 'of1', 'options1','list1', 'of2', 'options2','list2', 'of3', 'optio3ns']
      }
    },
    mounted(){
     // alert(11)
       if(this.select_need === 'Пошук наявних пропозицій'){
        // alert(this.user)
         this.available_proposals(this.user)
       }
    },
   created(){
     // alert("m need " + this.select_need )
    },
      methods: {
        available_proposals(id){
           //alert(id);
          var self = this;

                $.get({
                    async: true,
                    url:/* "http://127.0.0.1:8000"*/ current_host+"/proposals/user/"+id,
                    data: {available: true},
                    dataType: "json",
                    success: function (data) {
                      //  alert(JSON.stringify(data));
                      //  alert(JSON.stringify( data.proposals))
                        self.proposals_ = data.proposals;
                        self.options = self.proposals_.map(p => p.title);
                       //    alert(3)
                    },
                    error: function (data) {
                      //  alert(JSON.stringify(data));
                      //   alert(2)
                    }
                })
        },
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

              if(this.select_need === 'Пошук наявних пропозицій'){
              this.$emit("change_tag", this.selected, this.proposals_.filter(p => this.selected.includes(p.title) ));
            }
            else {
              this.$emit("change_tag", this.selected);
            }

          //   this.$emit("change_tag",this.selected);
          },
          updateSelected(e){
          //    alert(e);
              if (this.selected.length > 5){

                this.selected.pop();
              }
              //  alert(this.selected);
            if(this.select_need === 'Пошук наявних пропозицій'){
              this.$emit("change_tag", this.selected, this.proposals_.filter(p => this.selected.includes(p.title) ));
            }
            else {
              this.$emit("change_tag", this.selected);
            }
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