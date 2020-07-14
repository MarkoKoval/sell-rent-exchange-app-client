<template>
    <div style="margin-top: 10px">
        <!--   <p>{{type}}</p>
           <p>{{requested_proposal}}</p>
           <p>{{suggested_items}}</p>
           <p>{{simple}}</p>
            <p>{{additional_pay}}</p> -->
        <!--  <p>{{$route.params.proposal_id}}</p> -->
        <!--    <p>{{type}}</p>
                    <p>simple {{simple}}</p>
               <p>additional_pay {{additional_pay}}</p>
                <p>suggested_items {{suggested_items}} </p>
                <p>requested_items {{requested_items}}</p> -->

        <!--      <b-form-group v-if="requested_proposal.proposal_type !== 'Обмін'">
                  <div class="d-flex justify-content-center">

                               <datetime format="YYYY/MM/DD h:i:s" width="300px" v-model="date"></datetime>

                      <b-form-radio-group v-model="type">

                          <b-form-radio name="request_type" value="Простий"
                                        style="margin-right: 10px;">Простий запит
                          </b-form-radio>
                          <b-form-radio name="request_type" value="Комбінований"
                                        style="margin-right: 10px;">Комбінований запит
                          </b-form-radio>
                      </b-form-radio-group>

                  </div>
              </b-form-group> -->

        <div class="d-flex justify-content-center">
            <!--
            <div v-if="requested_proposal.proposal_type !== 'Обмін' && type==='Простий' || type==='Комбінований'">
                <simple_request :requested_proposal = "requested_proposal" v-on:submit_result = "submit_result" :simple_proposal_params="simple"></simple_request>
            </div>-->
            <!--        <p>grgergr</p>
                    <div v-if="type==='Простий' || type==='Комбінований'">
                        <simple_request :requested_proposal = "requested_proposal" v-on:submit_result = "submit_result_" :simple_proposal_params="simple"></simple_request>
                    </div>
         sub_type=Комбінований-->
        </div>
        <div v-if="type==='Комбінований'">
            <!--    <p>tt {{requested_proposal}} tt</p> -->
            <simple_request v-if="requested_proposal !== null" :requested_proposal="requested_proposal"
                            v-on:submit_result="submit_result_" :simple_proposal_params="simple"></simple_request>
            <additional_pay v-if="requested_proposal !== null"
                            v-on:additional_pay_changed="additional_pay_changed"></additional_pay>
            <combined_request v-if="requested_proposal !== null" :user="auth_id"
                              :place="'Власні елементи комбінованого запиту'"
                              v-on:update_combined="update_suggested_combined"
                              :combined_values="suggested_items"></combined_request>


            <combined_request v-if="requested_proposal !== null" :user="requested_proposal.creator_id"
                              :place="'Бажані елементи комбінованого запиту'"
                              v-on:update_combined="update_requested_combined"
                              :combined_values="requested_items"></combined_request>
            <!-- <p>44</p>

                       <p>{{requested_proposal}}</p>
                  <p>{{suggested_items}}</p>
                      <p>555</p> -->
            <!-- <div class="d-flex justify-content-center" v-if="type==='Комбінований'">

                     <selectize_ style="width: 90vw;"></selectize_>
                 </div> -->

        </div>
        <load_spiner v-if="loading"></load_spiner>
        <!--<p>{{simple}}</p>
        <p>Комбіновані {{combined_values}}</p> -->

        <!--<datetime_picker></datetime_picker> -->
    </div>
</template>

<script>
    import load_spiner from "../load_spiner.vue"
    import current_host from "../get_api_host.js"
    //  import current_host from  "../ge"
    import $ from "jquery"
    import additional_pay from "./additional_pay.vue"
    // import from "./simple_request.vue"
    import datetime_picker from "../datetime_picker.vue"
    import {uk} from 'vuejs-datepicker/dist/locale'

    import combined_request from "./combined_request.vue"
    import simple_request from "./simple_request.vue"
    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';
    import 'vue2-datepicker/locale/uk';

    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import VueNumericInput from 'vue-numeric-input'
    import selectize_ from "./selectize_.vue"

    export default {
        name: "create_proposal_request",
        components: {
            load_spiner,
            additional_pay,
            simple_request,
            VueNumericInput,
            selectize_,
            DatePicker,
            datetime_picker,
            combined_request
        },
        data() {
            return {
                loading: false,
                auth_id: parseInt(localStorage.getItem("id")),
                requested_proposal: null,
                proposal_type: "Оренда",
                own_place: "Власні елементи комбінованого запиту",
                type: "Комбінований",
                rent_time: ['Хвилина', 'Година', 'День', 'Місяць', 'Рік'],
                currencies: ['Гривня', 'Dollar', 'Euro'],
                suggested_items: [],
                requested_items: [],
                additional_pay: null,
                simple: {
                    request_type: "Оренда",
                    request_message: "",
                    proposal_item_count: null,
                    on_rent_time_unit_measure: null,
                    on_rent_time_unit_count: null,
                    //    suggested_money_count: null,
                    //   suggested_currency: 'Гривня',
                    request_deadline_for_answer: null
                },
            }
        },
        mounted() {
            var self = this;
            $.get({
                async: true,
                url: /*"http://127.0.0.1:8000"*/  current_host + "/get/proposals/" + self.$route.params.proposal_id,
                //   data: { query : null},
                /*   data:{  user_id: self.user_id,query : JSON.stringify(self.query)},*/
                dataType: "json",
                success: function (data) {
                    //     alert(JSON.stringify(data));
                    self.requested_proposal = data.proposal;
                    // alert(JSON.stringify(    self.requested_proposal));
                    self.simple.request_type = data.proposal.proposal_type;
                    if (requested_proposal.proposal_type === 'Оренда')
                        self.on_rent_time_unit_measure = data.proposal.rent_time_unit_measure;
                },
                error: function (e) {
                    alert(JSON.stringify(e))
                }
            })
        },
        methods: {
            is_ok_fitted_items(elem) {
                // alert(13566)

                for (var i = 0; i < elem.length; i++) {
                    //   alert(JSON.stringify(elem[i]));
                    //  alert("else "+elem[i].count)
                    /*   alert(elem[i].proposal_type)
                     alert(elem[i].count)
                     alert(elem[i].on_rent_time_unit_count)*/
                    if (elem[i].proposal_type === "Продаж" || elem[i].proposal_type === "Обмін") {
                        if (elem[i].count === null || isNaN(elem[i].count)) {
                            //      alert(1);
                            return false;
                        }

                    }
                    if (elem[i].proposal_type === "Оренда") {
                        //     alert(elem[i].suggested_items[i].on_rent_time_unit_count);
                        if (elem[i].count === null || isNaN(elem[i].count) || elem[i].on_rent_time_unit_count === null) {
                            //     alert(2);

                            return false;
                        }
                    }

                }
                return true;
            },
            submit_result_(e) {
                this.loading = true;
                // alert(44);
                var i = 0;
                //  alert(this.type)
                var self = this;
                //self.loading = true;
                if (this.is_ok_fitted_items(this.suggested_items) && this.is_ok_fitted_items(this.requested_items)) {
               //     alert(1)
                    $.post({
                        async: false,
                        url:/* "http://127.0.0.1:8000"*/  current_host + "/create/combined/request/" + self.$route.params.proposal_id,
                        data: {
                            data: JSON.stringify({
                                proposal_type: self.proposal_type,
                                suggested_items: self.suggested_items,
                                requested_items: self.requested_items,
                                additional_pay: self.additional_pay,
                                user_id: self.auth_id, simple: self.simple
                            })
                        },
                        dataType: "json",
                        success: function (data) {
                            window.location = "/proposals/requested";
                            self.loading = false
                        },
                        error: function (e) {
                            //  alert("errr")
                        }
                    });
                }


            },
            submit_simple(e) {
                //      alert(JSON.stringify(e));
            },
            update_suggested_combined(e) {
                this.suggested_items = e;
            },

            update_requested_combined(e) {
                this.requested_items = e;
            },
            additional_pay_changed(e) {
                //  alert(12)
                //  alert(3);
                //  alert(e);
                this.additional_pay = e;
            }

        }
    }
</script>

<style scoped>

</style>