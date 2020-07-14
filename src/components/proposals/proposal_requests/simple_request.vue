<template>
    <div style="margin-top: 20px">
       <!-- <p> {{typeof requested_proposal_}}     rrr {{requested_proposal_}} few   {{Object.keys(requested_proposal_)}} FF {{requested_proposal_.available_items}}</p>
<p>bfd fwe {{max_elements}} </p>
             <p>{{sub_type_}}</p> -->
      <!--  <p>{{simple}}</p> -->
                <div class="d-flex justify-content-center">
            <div >
            <b-form @submit="send_request">

                <b-form-group
                        description="">
                      <div v-if="!limit">
                    <b-form-textarea

                            required
                            id="textarea-default"
                            v-bind:placeholder="'Опис запиту-бажання для пропозиції ' + requested_proposal_.title"
                            v-model="simple.request_message"
                            style="width: 70vh;"
                            rows="6"
                    ></b-form-textarea>
                      </div>
                    <div class="d-flex justify-content-center">
                        <div class="row">
                       <!--     <p>{{simple}}</p>
                            <p>{{min_elements}}  - {{max_elements}}</p>-->
                         <!--   <p>[f[f[</p>
                            <p>{{simple}}</p>
                            <p>{{  requested_proposal_ }} </p>-->
                            <vue-numeric-input v-if="sub_type_ !== 'Комбінований'" text-align='center' style="width: 220px;height: 30px; margin-top: 5px;"
                                               :precision="3" placeholder="кількість елементів"
                                               v-model="simple.proposal_item_count"
                                              :min="'1'" :max="max_elements" :step="1"></vue-numeric-input>

<!--<p>gregr {{requested_proposal_.request_type}}</p> -->
                            <div v-if="simple.request_type === 'Оренда'  && sub_type_ !== 'Комбінований'">

                                <vue-numeric-input required text-align='center'
                                                   style="width: 220px;height: 30px;  margin-left:10px;margin-top: 5px;"
                                                   :precision="3" placeholder="кількість часу"
                                                   v-model="simple.on_rent_time_unit_count"
                                                   :min="1" :max="1000000000" :step="1"></vue-numeric-input>

                            </div>

   <div v-if="simple.request_type === 'Оренда' && sub_type_ !== 'Комбінований' "><p style="margin-left: 5px;">Місяць</p></div>
                      <!--      <div v-if="simple.request_type === 'Оренда'">
                                <b-form-select

                                        :options="simple.rent_time"
                                        v-model="simple.on_rent_time_unit_measure"
                                        style="margin-right: 5px;margin-left: 5px; margin-top: 5px;"
                                        required
                                ></b-form-select>
                            </div> -->

                        </div>
                    </div>
                                <div class = "row">
       <div class="d-flex justify-content-around" style="margin: auto;">




       <!--    <datetime_picker  style="margin-top: 5px;" v-on:date_changed="date_changed"></datetime_picker> -->

                        </div>
           </div>
                </b-form-group>
                <div class="d-flex justify-content-end">
            <!--v-if="sub_type_ === 'Простий'" -->
                <button class="button btn-primary" type="submit">Надіслати запит</button>
                </div>
            </b-form>
            </div>

        </div>
      <!--  <p>{{placeholder}}</p>
        <p>ttt {{requested_proposal_.title}}ttt</p> -->
<!--<p>{{simple}}</p> -->
    </div>
</template>

<script>
       import current_host from "../get_api_host.js"
        import VueNumericInput from 'vue-numeric-input'
    import datetime_picker from "../datetime_picker.vue"
    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    export default {
        name: "simple_request",
        components: {datetime_picker,VueNumericInput},
        props: ["simple_proposal_params","sub_type", "requested_proposal","placeholder_" , "limit"],
        watch: {
             simple:   function(e){
             //   this.$emit("simple_proposal_params_changed",e);
            }
        },
        data(){
            return {
                limit_: this.limit === true,
                placeholder: 'Опис запиту-бажання для пропозиції ' ,
                min_elements: null,
                max_elements: null,
                requested_proposal_ : this.requested_proposal,
                sub_type_: this.sub_type,
             simple:     this.simple_proposal_params,
            }
        },
        mounted(){
           // alert(JSON.stringify(this.requested_proposal_))
          //  alert(this.simple.available_items);
            this.min_elements = 1;
         //   alert("rrty")
         //   alert(this.requested_proposal_.available_items);
            this.max_elements = this.requested_proposal_.available_items === null ? 100000: this.requested_proposal_.available_items;
            this.simple.request_message = "Хотів би отримати пропозицію  '"+ this.requested_proposal_.title+ "' як основну";
        },
        methods:{
            date_changed(e){
                this.simple.request_deadline_for_answer = e;
            },
            send_request(e){
               // alert(1);
              //  alert(this.simple.request_type);
                //alert( this.simple.on_rent_time_unit_count)
                 e.preventDefault();
           //        alert(2)
              //  alert(this.simple.proposal_item_count );
               // alert( this.simple.on_rent_time_unit_count);
                if (this.simple.request_type === "Оренда" && (
                     (this.simple.proposal_item_count === null || isNaN(this.simple.proposal_item_count )) ||
                    (this.simple.on_rent_time_unit_count === null || isNaN(this.simple.on_rent_time_unit_count ))
                     )) {
                    // alert(3);
                    return;
                }
                else if (this.simple.request_type === "Оренда"  ) {
                  //    alert(4);
                   this.$emit("submit_result", this.simple);
                   return;
                }

                if ((this.simple.request_type === "Продаж" || this.simple.request_type === "Обмін") &&
                    (this.simple.proposal_item_count === null || isNaN(this.simple.proposal_item_count ))) {
                   //  alert(5);
                    return;
                }
                else if (this.simple.request_type === "Продаж" || this.simple.request_type === "Обмін") {
               //     alert(2);
                    //  alert(5);
                   this.$emit("submit_result", this.simple);
                   return;
                  //  alert(2)
                }
            }
        }
    }
</script>

<style scoped>

</style>