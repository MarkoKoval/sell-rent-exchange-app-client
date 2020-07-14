<template>
    <div>
      <div class="d-flex justify-content-center">
        <b-form-textarea
                            id="textarea-default"
                            placeholder="Опис запиту"
                            v-model="request_message"
                            style="width: 70vh;"
                            rows="6"
                    ></b-form-textarea>
</div>
              <div class="d-flex justify-content-center" style="margin-bottom: 10px;">


                        <vue-numeric-input required text-align='center'
                                               style="width: 220px;height: 30px;  margin-left:10px;margin-top: 5px;"
                                               :precision="3" placeholder="Можлива Доплата"
                                               v-model="suggested_money_count"
                                               :min="0" :max="1000000000" :step="1"></vue-numeric-input>


                            <b-form-select
                                    v-model="suggested_currency"
                                    :options="currencies"
                                    style="margin-right: 5px;margin-left: 5px;width: 120px; margin-top: 5px; "
                                    required
                            ></b-form-select>
                            <datetime_picker style="margin-top: 5px"></datetime_picker>
                        </div>



       <div class="d-flex justify-content-center">

                <selectize_  :place="place" :tag_init="tag_init"  v-on:change_tag="change_selected" style="width: 90vw;"></selectize_>
            </div>
                        <requested_items_params v-on:delete_item_request="delete_item_request" :items="values"></requested_items_params>
<!--<p>{{tag_init}}</p> -->
    </div>
</template>

<script>
    import selectize_ from "../selectize_.vue"

    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import requested_items_params from "./requested_items_params.vue"
        import VueNumericInput from 'vue-numeric-input'
import datetime_picker from "./datetime_picker.vue"
    export default {name: "combined_request",
        components: {datetime_picker,selectize_,requested_items_params,VueNumericInput},
        data(){
            return {
                request_message: "",
                                currencies: ['Гривня', 'Dollar', 'Euro'],
                 suggested_money_count: null,
                    suggested_currency: 'Гривня',
                place: "Власні елементи комбінованого запиту",
                tag_init: [],
                values:[],//[ /*{title: "hahaha"}, {title: "hohoho"}*/]
            }
        },
        methods:{
            delete_item_request(t){
                var e = this.values.filter(i => i.title !== t );
                  this.tag_init = e.map(el => el.title);
            },
            change_selected(e){
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

                for (var i = 0; i < e.length; i++){
                    if (this.values.find(el => el.title === e[i]) === undefined) {
                        this.values.push({title: e[i], count: null,allowed_count: 3, proposal_type: "Оренда", rent_time:"Місяць"});
                    }
                }
                //proposal_type
            }
        }
    }
</script>

<style scoped>

</style>