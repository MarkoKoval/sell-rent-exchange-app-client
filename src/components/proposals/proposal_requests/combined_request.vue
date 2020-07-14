<template>
    <div>
     <!-- <div class="d-flex justify-content-center">
        <b-form-textarea
                            id="textarea-default"
                            placeholder="Опис запиту"
                            v-model="request_message"
                            style="width: 70vh;"
                            rows="6"
                    ></b-form-textarea>
</div-->




       <div class="d-flex justify-content-center">
           <!--   <p>444 {{place_}}</p>-->
                <selectize_  :place="place_"  :need="'Пошук наявних пропозицій'" :user="user_" :tag_init="tag_init"  v-on:change_tag="change_selected" style="width: 90vw;"></selectize_>
            </div>
<br>
                     <requested_items_params  v-on:delete_item_request="delete_item_request" :items="values"></requested_items_params>
<!--<p>{{values}}</p>-->
    </div>
</template>
<script>
    import selectize_ from "./selectize_.vue"

    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import requested_items_params from "./requested_items_params.vue"
        import VueNumericInput from 'vue-numeric-input'
import datetime_picker from "../datetime_picker.vue"
    export default {name: "combined_request",
        components: {datetime_picker,selectize_,requested_items_params,VueNumericInput},
        props: ["combined_values", "place", "user"],

        watch:{
        values:function (e) {
            this.$emit("update_combined",e);
        }
        },
        data(){
            return {
                place_: this.place,
                user_: this.user,
                request_message: "",
                                currencies: ['Гривня', 'Dollar', 'Euro'],
                 suggested_money_count: null,
                    suggested_currency: 'Гривня',
             //   place: "Власні елементи комбінованого запиту",
                tag_init: [],
                values:this.combined_values,//[ /*{title: "hahaha"}, {title: "hohoho"}*/]
            }
        },
        created(){
     //alert("ehtrhtrhwf");
        },
        methods:{

            delete_item_request(t){
           //     alert(t);
             //   alert(JSON.stringify(this.tag_init))
             //    this.tag_init = this.values.filter(el => el.title !== t).map(el => el.title);
//alert(JSON.stringify(this.tag_init));
                this.values = this.values.filter(el => el.title !== t);
         //       alert(JSON.stringify(   this.values));
           //     this.tag_init = this.values.filter(el => el.title !== t).map(el => el.title);
               // alert(JSON.stringify( this.tag_init))
                // this.tag_init = this.tag_init.filter(el => el !== t);
              //   alert(JSON.stringify(this.tag_init))
              /*  var e = this.values.filter(i => i.title !== t );
                alert(JSON.stringify(e));
                  this.tag_init = e.map(el => el.title);
                                  alert(JSON.stringify( this.tag_init));*/
            },
            change_selected(e , proposal){
            //    alert("changef");
               // alert(e);
                //alert(typeof  e);
               // this.values.push({title: e[0]});
             /*    this.values.clear();
               for (var i = 0; i < e.length; i++) {
              //      alert(e[i]);
                    this.values.push({title: e[i]});
                }*/
         //  this.values = [];
                //alert(e);
               // this.values = [];
               // alert("chabge");
                //alert(e);
                this.values = [];

                for (var i = 0; i < proposal.length; i++) {
                    //if (this.values.find(el => el.title === e[i]) === undefined) {
                        this.values.push({
                            id:  proposal[i].id,
                            title: proposal[i].title,
                          //   type: proposal[i].title,
                            count : 1,
                           on_rent_time_unit_count:1, //proposal[i].available_items,
                            allowed_count: proposal[i].available_items === null ? null:proposal[i].available_items ,
                            proposal_type:  proposal[i].proposal_type,
                            rent_time:  proposal[i].rent_time_unit_measure
                        });
                    //}
                }
               /* for (var i = 0; i < e.length; i++){
                    if (this.values.find(el => el.title === e[i]) === undefined) {
                        this.values.push({title: e[i], count: null,allowed_count: 3, proposal_type: "Оренда", rent_time:"Місяць"});
                    }
                }*/
                //proposal_type
            }
        }
    }
</script>

<style scoped>

</style>