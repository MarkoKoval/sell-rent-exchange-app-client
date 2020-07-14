<template>
    <div>

     <!--   <p>{{additional}}</p> -->
        <!--<p>{{details}}</p> -->
      <!--  <p>{{Object.keys(details)}}</p> -->
        <!-- <p>{{data.request_details}}</p> -->

        <p style="margin-top: 20px;" align="center">{{data.request_details.answer_type}}</p>
        <p align="center">{{data.request_details.request_message}}</p>
        <p align="center">{{data.request_details.request_time|datify}}</p>

        <div>

            <div v-if="additional">
                <div>
                    <p align="center">До цього
                        {{additional.offer_type.toLowerCase()}} {{additional.suggested_money_count}}
                        {{additional.suggested_currency| currency}} </p>
                </div>

            </div>

        </div>
        <div v-for="detail in details" class="col-sm-12 d-flex justify-content-center"

             style="margin-right: auto; margin-left: auto; margin-top: 5px; width: 75vw;">
            <div class="card w-75  containerq">

                <div class="card-body ">


                    <h5 align="center" class="card-title">{{detail.proposal_description.description}}</h5>
                    <p class="card-text">
                        <!-- {{detail}} -->
                        {{detail.proposal_description.title|restrict(50)}}
                    </p>
                    <a href="#"
                       class="text badge badge-primary"
                       style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{
                        detail.type}}</a>
                    <!--       <a v-if=" detail.proposal_description.proposal_type === 'Оренда'" href="#"
                              class="text badge badge-primary"
                              style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{
                               detail.type}}</a> -->
                    <a v-if=" detail.proposal_description.proposal_type === 'Оренда'" href="#"
                       class="text badge badge-primary"
                       style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">
                        {{ detail.on_rent_time_unit_count}} {{ detail.on_rent_time_unit_measure}} Кількість
                        {{detail.proposal_item_count}}</a>

                    <div class="row">

                        <a class="text badge badge-primary"
                           style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">
                            Кількість {{ detail.proposal_item_count}}</a>
                        <a class="text badge badge-primary"
                           style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{
                            detail.proposal_description.category.category}}/{{
                            detail.proposal_description.category.subcategory}}</a>
                        <a class="text badge badge-primary"
                           style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{
                            detail.proposal_description.proposal_type}}</a>
                        <a class="text badge badge-primary"
                           style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{
                            detail.proposal_description.proposal_item_type}}</a>
                        <a v-if="detail.proposal_description.proposal_item_type==='Товари'"
                           class="text badge badge-primary"
                           style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{detail.proposal_description.proposal_item_state}}</a>
                    </div>


                    <div class="d-flex justify-content-end">

                        <a target="_blank" :href="'/proposals/'+ detail.proposal_item_id +'/details/'"
                           class="btn-sm btn-primary" style="margin-right: 5px;  margin-left: 5px; margin-top:5px;"><i class="fa fa-info-circle"></i></a>


                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import $ from "jquery"
 import current_host from "../get_api_host.js"
    var moment = require("moment")
    export default {
        name: "proposal_requests_details",
        data() {
            return {
                auth: {
                    role: localStorage.getItem("role"),
                    id: parseInt(localStorage.getItem("id")),
                    token: localStorage.getItem("token"),
                    name: localStorage.getItem("name"),
                },
                data: null, details: [], additional: null
            }
        },
        filters: {
            datify(d) {
                //     alert(moment(JSON.stringify(d).substring(1,JSON.stringify(d).length-1)).utc().format('YYYY-MM-DD-HH'))
                return moment(JSON.stringify(d).substring(1, JSON.stringify(d).length - 1)).utc().format('YYYY-MM-DD HH:mm');
                //alue-format="YYYY-MM-DD hh:mm:ss"
            },
            currency: function (curr) {
                //   alert(curr.toUpperCase())
                if (curr.toLowerCase() === "гривня") {
                    return "гривні"
                } else if (curr.toLowerCase() === "dollar") {
                    return "usd"
                } else if (curr.toLowerCase() === "euro") {
                    return "euro"
                }
            },
            restrict: function (value, arg) {
                return value.length > arg ? value.substring(0, arg) + "...." : value
            },
        },
        created() {
            var self = this;
            $.get({
                async: true,
                url:/* "http://127.0.0.1:8000"*/ current_host+"/get/proposal-requests-details/" + self.$route.params.id,
                data: {auth_id: parseInt(localStorage.getItem("id"))},
                //     data:{  user_id: self.user_id,query : JSON.stringify(self.query)},
                dataType: "json",
                success: function (data) {
                    //   alert(JSON.stringify(data));
                    //      alert(JSON.stringify(data));
                    self.data = data;
                    self.details = data.details;
                    self.additional = data.additional;
                },
                error: function (e) {
                  //  alert(JSON.stringify(e))
                }
            })
        },
        methods: {}

    }
</script>

<style scoped>

</style>