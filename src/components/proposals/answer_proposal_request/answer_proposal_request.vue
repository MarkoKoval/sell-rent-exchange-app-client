<template>
    <div>

    <div v-if="request_data.request_details.requested_user_id === user_id ">
        <b-form @submit="submit_result_" style="margin-top: 10px; margin-left: 15vw;  margin-right: 15vw;">
            <div>
                <!--  <p>gggg {{answer_to_user}}</p> -->
                <b-form-group>
                    <b-form-textarea
                            id="textarea-default"
                            placeholder="Відповідь на запит"
                            v-model="description"
                            required
                            minlength="5"
                            maxlength="10000"
                            rows="9"
                    ></b-form-textarea>
                </b-form-group>
                <div class="d-flex justify-content-center">
                    <div class="row">
                        <b-form-group>
                            <div class="d-flex justify-content-start">
                                <b-form-radio-group v-model="approve">

                                    <b-form-radio value="Погодження" style="margin-right: 10px;">Погодити
                                    </b-form-radio>
                                    <b-form-radio value="Відхилення" style="margin-right: 10px;">Відхилити
                                    </b-form-radio>
                                    <b-form-radio value="Пропозиція" style="margin-right: 10px;">Запропонувати
                                    </b-form-radio>
                                </b-form-radio-group>
                            </div>
                        </b-form-group>

                        <b-button type="submit" variant="primary" class="btn btn-sm"
                                  style="height:28px; margin-right: 10px">Відповісти
                        </b-button>
                    </div>
                </div>
                <!-- <p>{{request_data}}</p>
                 <p>{{approve}}</p> -->
                <div v-if="approve==='Пропозиція'">
                    <!--    <p>{{request_deadline_for_answer}}</p>
                        <p>{{additional_pay}}</p>
                        <p>{{suggested_items}}</p>
                          <p>{{requested_items}}</p> -->

                    <additional_pay v-on:additional_pay_changed="additional_pay_changed"></additional_pay>
                    <div class="d-flex justify-content-center" style="margin-bottom: 5px;">
                        <!--    <datetime_picker v-on:date_changed="set_deadline"></datetime_picker> -->
                    </div>
                    <combined_request :user="auth_id" place="Власні елементи комбінованого запиту"
                                      v-on:update_combined="update_suggested_combined"
                                      :combined_values="suggested_items"></combined_request>
                    <combined_request  :user="answer_to_user" place="Бажані елементи комбінованого запиту"
                                      v-on:update_combined="update_requested_combined"
                                      :combined_values="requested_items"></combined_request>



                </div>
                <!-- <additional_pay v-on:additional_pay_changed="additional_pay_changed"></additional_pay>  -->
                <!--    <combined_request :user="auth_id" place="Власні елементи комбінованого запиту" v-on:update_combined="update_suggested_combined"  :combined_values="suggested_items"></combined_request>


                                <combined_request :user="requested_proposal.creator_id" place="Бажані елементи комбінованого запиту" v-on:update_combined="update_requested_combined" :combined_values="requested_items"></combined_request>-->

                <div>
                </div>


            </div>
            <div>
                <!-- <p>Por</p>
                         <p>{{form}}</p> -->
            </div>

        </b-form>

        <!--  <datetime_picker></datetime_picker> -->
    </div>
    <div v-else>
        <h4 align="center" style="margin-top: 200px;"> Немає прав </h4>
    </div>
    </div>
</template>

<script>
    import current_host from "../get_api_host.js"
    import additional_pay from "../proposal_requests/additional_pay.vue"
    import $ from "jquery"
    import datetime_picker from "../datetime_picker.vue"
    import combined_request from "../proposal_requests/combined_request.vue"
    import simple_request from "../proposal_requests/simple_request.vue"
    // import Simple_request from "../proposal_requests/simple_request";
    export default {
        name: "answer_proposal_request",
        components: {additional_pay, combined_request, simple_request, datetime_picker},
        watch: {
            approve: function (e) {
                // alert(e)
                if (e === "Погодження") {
                    //  alert(1)
                    this.description = "Так згода";
                } else if (e === "Відхилення") {
                    //   alert(2)
                    this.description = "Ні не згода";
                } else if (e === "Пропозиція") {
                    //  alert(3)
                    this.description = "Як щодо такої пропозиції";
                }
                // alert(  this.description);
            }
        },
        data() {
            return {
                user_id: 0,
                request_deadline_for_answer: null,
                suggested_items: [],
                requested_items: [],
                additional_pay: null,
                answer_to_user: null,
                requested_proposal: null,
                description: "Так згода",
                request_data: "",
                approve: "Погодження",
                auth_id: parseInt(localStorage.getItem("id")),
                request_main_item: "",
                simple: {
                    request_type: "Оренда",
                    request_message: "",
                    proposal_item_count: null,
                    on_rent_time_unit_measure: 'Місяць',
                    on_rent_time_unit_count: null,
                    //    suggested_money_count: null,
                    //   suggested_currency: 'Гривня',
                    request_deadline_for_answer: null
                },

            }
        },
        mounted() {
            this.user_id = parseInt( localStorage.getItem('id')) ;
            var self = this;
            //  alert("fwef");
            //get/proposal-requests-details/
            $.get({
                async: true,
                url:/* "http://127.0.0.1:8000" */ current_host + "/get/proposal-requests-details/" + self.$route.params.id,
                //   data: { query : null},
                /*   data:{  user_id: self.user_id,query : JSON.stringify(self.query)},*/
                dataType: "json",
                success: function (data) {
                    //    alert("fwef")
                    //    alert(JSON.stringify(data));
                    self.request_data = data;
                    // self.request_data = data;
                    self.request_main_item = data.request_details.request_main_item
                    self.answer_to_user = data.request_user_id
                    // self.requested_proposal = data.proposal;
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
                    //  alert(JSON.stringify(elem[i]));
                    if (elem[i].proposal_type === "Продаж" || elem[i].proposal_type === "Обмін") {
                        if (elem[i].count === null || isNaN(elem[i].count)) {
                            //  alert(1);
                            return false;
                        }
                    }
                    if (elem[i].proposal_type === "Оренда") {
                        //     alert(elem[i].suggested_items[i].on_rent_time_unit_count);
                        if (elem[i].count === null || isNaN(elem[i].count) || elem[i].on_rent_time_unit_count === null) {
                            alert(2);

                            return false;
                        }
                    }

                }
                return true;
            },
            update_suggested_combined(e) {
                this.suggested_items = e;
            },
            update_requested_combined(e) {
                this.requested_items = e;
            },
            additional_pay_changed(e) {
                //   alert("pat")
                //  alert(JSON.stringify(e))
                //  alert(3);
                //  alert(e);
                this.additional_pay = e;
            },
            set_deadline(e) {
                this.request_deadline_for_answer = e;
            },
            submit_result_(e) {
            //    alert(1)
                e.preventDefault()
                //   alert(JSON.stringify(e));
                var self = this;
                if (this.is_ok_fitted_items(this.suggested_items) && this.is_ok_fitted_items(this.requested_items)) {

                    $.post({
                        async: false,
                        url:/* "http://127.0.0.1:8000" */ current_host + "/create/request/answer/" + self.$route.params.id,
                        data: {
                            data: JSON.stringify({

                                request_main_item: self.request_main_item,
                                answered_request: self.$route.params.id,
                                request_deadline_for_answer: this.request_deadline_for_answer,
                                description: self.description,
                                approve: self.approve,
                                suggested_items: self.suggested_items,
                                requested_items: self.requested_items,
                                additional_pay: self.additional_pay,
                                answer_to: self.answer_to_user,
                                user_id: self.auth_id
                            })
                        },
                        dataType: "json",
                        success: function (data) {
                       //     alert(JSON.stringify(data))
                            window.location = "/proposals/requested";
                            // alert("suc")
                            // alert("fewfwefwe");
                            //  window.location = "/proposals/requested";
                            //  alert(JSON.stringify(data))
                            // window.location = "/proposals/saved";
                            //  self.requested_proposal = data.proposal;
                        },
                        error: function (e) {
                          //  alert(JSON.stringify(e))
                            //alert("errr")
                            //  alert(JSON.stringify(e))
                        }
                    });
                    //alert("GOOGD")
                }


            },
            create_new_proposal(e) {

            }
        }

    }
</script>

<style scoped>

</style>