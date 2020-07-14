<template>
    <div>
        <load_spinner v-if="loadpage"></load_spinner>
        <!--   <p>{{query}}</p>
           <p>{{ client_searched_results_len }}</p> -->
        <!--  <p>{{query !== null}} {{ query.publicator_search }} {{ query.publicator !== null}} {{ query.publicator.length > 2}}</p> -->
        <!--   <p>{{available_publicators }}</p>-->
        <!--  <img class="card-img-top" src="https://i.ibb.co/vstDPjZ/Appf.jpg" alt="Card image cap">-->
        <!--   </label> -->
        <!--<p>{{proposals.length / 21}}</p> -->
        <!--   <label :for="'sp_' + proposal.id "> -->
        <!--  {{proposal}}-->
        <!-- <p>creat {{proposal.creator_is_blocked }}</p> -->
        <!-- <input type="checkbox" :id="'sp_' + proposal.id "> -->
        <!-- src="https://i.imgur.com//tipZC5H.png" -->
        <!--  <p>{{query}}</p>  -->
        <div id="qe" style="margin-top: 10px;">

            <!--    <div v-if="proposals.length > proposal_per_page && client_searched_results_len > proposal_per_page"
                     class="d-flex justify-content-center">
                    <paginate v-if="proposals.length > proposal_per_page"
                              :margin-pages="5"
                              :page-count="parseInt(proposals.length / proposal_per_page) + 1"
                              :click-handler="pageChanged"
                              :prev-text="'Попередня'"
                              :next-text="'Наступна'"
                              :container-class="'className'">
                    </paginate>


                </div>-->

            <main_search_bar :locations_="available_locations" :publicator_names.sync="available_publicators"
                             :title_.sync="available_titles" v-on:search="search"
                             v-on:search_values_changed="search_values_changed"></main_search_bar>


            <div v-if="proposals.length > proposal_per_page && client_searched_results_len > proposal_per_page"
                 class="d-flex justify-content-center">
                <paginate v-if="proposals.length > proposal_per_page"
                          :margin-pages="5"
                          :page-count="parseInt(proposals.length / proposal_per_page) + 1"
                          :click-handler="pageChanged"
                          :prev-text="'Попередня'"
                          :next-text="'Наступна'"
                          :container-class="'className'">
                </paginate>


            </div>

            <div>
                <div class="row  d-flex justify-content-center" style="margin-top: 10px;">
                    <div v-for="proposal in paginator(params_filter(proposals))"
                         class="clearfix col-auto mb-4"
                         style="margin-bottom: 5px;">

                        <div v-if="proposal.available_items !== 0 &&  proposal.creator_is_blocked === false || (proposal.creator_is_blocked && auth.role === 'Адміністратор') "
                             class="card shadow-lg" style="width: 600px">

                            <img v-if="proposal.images !== undefined && proposal.images !== null && proposal.images.length !== 0 "
                                 class="card-img-top" v-bind:src="host+proposal.images[0].url" alt="Картинка"
                                 style="height: 40vh;">
                            <img v-if="proposal.images === null || proposal.images.length === 0 " class="card-img-top"
                                 src="@/assets/no_image.png" alt="Картинка" style="height: 40vh;">

                            <div class="card-body ">
                                <h5 class="card-title">{{proposal.title|restrict(50)}}</h5>
                                <p class="card-text">
                                    {{proposal.description|restrict(100)}}
                                </p>
                                <div class="row">
                                    <div class="badge badge-primary borders"> {{proposal.proposal_type}}</div>
                                    <div class="badge badge-primary borders"> {{proposal.proposal_item_type}}</div>
                                    <div v-if="proposal.proposal_item_type === 'Товари' && proposal.proposal_item_state"
                                         class="badge badge-primary borders">
                                        {{proposal.proposal_item_state}}
                                    </div>
                                    <div class="badge badge-primary borders">
                                        {{proposal.category.category}}/{{proposal.category.subcategory}}
                                    </div>
                                    <div v-if="proposal.proposal_type === 'Продаж' && proposal.item_price_value"
                                         class="badge badge-primary borders">{{
                                        proposal.item_price_value}} {{proposal.item_price_currency}}
                                    </div>
                                    <div v-if="proposal.proposal_type === 'Оренда' && proposal.item_price_value && proposal.item_price_currency && proposal.rent_time"
                                         class="badge badge-primary borders">{{
                                        proposal.item_price_value}} {{proposal.item_price_currency}} {{
                                        proposal.rent_time}}
                                    </div>


                                </div>

                                <div class="row">
                                    <div v-for="tag in proposal.search_tags">
                                        <div class="badge badge-primary"
                                             style="margin-left: 5px; margin-top: 3px; margin-bottom: 3px;">
                                            {{tag.title|restrict(30)}}
                                        </div>
                                    </div>
                                </div>

                                <div class="row d-flex justify-content-end">

                                    <div class="badge badge-primary borders"
                                         data-toggle="tooltip" data-placement="left"
                                         :title="proposal.location.str_description"
                                         v-if="proposal.location!==undefined && (proposal.location !== '' && proposal.location !== null)"
                                         style="cursor: pointer;margin-top: 5px;">
                                        {{proposal.location.str_description|restrict(30)}}
                                    </div>
                                    <div class="badge badge-primary borders" style="margin-left: 5px; margin-top: 5px;">
                                        {{proposal.creator_name}}
                                    </div>
                                    <div class="badge badge-primary borders" style="margin-left: 5px; margin-top: 5px;">
                                        {{proposal.creation_time|datify}}
                                    </div>
                                </div>

                                <div class="row d-flex justify-content-end">

                                    <div v-if="proposal.creator_is_blocked" class="badge badge-danger borders" style="margin-left: 5px; margin-top: 5px; height: 20px; margin-right: 3px;">
                                      Публікатор заблокований
                                    </div>

                                    <div v-if="proposal.is_blocked_by_admin" class="badge badge-danger borders" style="margin-left: 5px; margin-top: 5px; height: 20px;">
                                      Пропозиція заблокована
                                    </div>

                                    <a target="_blank" :href="'/proposals/'+ proposal.id +'/details/'"
                                       data-toggle="tooltip" title="Детальна інформація"
                                       class="btn-sm btn-primary"
                                       style="margin-right: 5px;  margin-left: 5px; margin-top:5px;"><i
                                            class="fas fa-info-circle"></i></a>

                                </div>
                            </div>
                        </div>

                    </div>

                </div>


            </div>
            <div v-if="proposals.length === 0 || client_searched_results_len === 0" style="margin-top:40px;">
                <h3 align="center">Не знайдено результатів за бажаними критеріями</h3>
            </div>

        </div>


    </div>
</template>
<style>
    .borders {
        margin-left: 3px;
        margin-right: 3px;
        margin-top: 3px;
        margin-bottom: 3px;
    }

    #qe {
        overflow-x: hidden; /* Hide horizontal scrollbar */
    }

    #qe::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #F5F5F5;
    }

    #qe::-webkit-scrollbar {
        width: 10px;
        background-color: #F5F5F5;
    }

    #qe::-webkit-scrollbar-thumb {
        background-color: #000000;
        border: 2px solid #555555;
    }
</style>
<script>
    import load_spinner from "../load_spinner.vue"
    import current_host from "../get_api_host.js"

    var moment = require('moment')
    import main_search_bar from "./main_search_bar.vue"
    import get_current_auth from "../get_current_auth.js"
    import $ from "jquery"
    //import Proposals from "../proposals/proposals";
    //  moment(JSON.stringify(value_).substring(1,JSON.stringify(value_).length-1)).utc().format('YYYY-MM-DD-HH')}
    export default {
        name: "mainer",
        components: {load_spinner,/*Proposals,*/ main_search_bar},

        filters: {
            datify(d) {
                //     alert(moment(JSON.stringify(d).substring(1,JSON.stringify(d).length-1)).utc().format('YYYY-MM-DD-HH'))
                // alert(333)
                return moment(JSON.stringify(d).substring(1, JSON.stringify(d).length - 1)).utc().format('YYYY-MM-DD HH:mm');
                //alue-format="YYYY-MM-DD hh:mm:ss"
            },
            restrict: function (value, arg = 50) {
//alert(value);
                ///    alert(444)
                return value.length > arg ? value.substring(0, arg) + "...." : value
            },
        },
        created() {
            //  this.loadpage = true;
            // alert(1)
        },
        mounted() {

            this.get_proposals()
        },
        data() {
            return {//host: "",
                loadpage: false,
                available_locations: [],
                proposal_per_page: 12,
                client_searched_results_len: 1,
                date: "",
                available_titles: [],
                available_publicators: [],
                auth: get_current_auth.get_current_auth(),
                page: 1,
                host: current_host, //  "http://127.0.0.1:8000",
                user_id: parseInt(localStorage.getItem("id")),
                query: null,
                proposals: [
                    {}
                ]
            }
        },

        methods: {

            get_proposals() {
                //  alert(1)
                this.auth = get_current_auth.get_current_auth()
                //alert(JSON.stringify(this.auth))
             //   alert(2);
                var self = this;
                self.date = new Date();
                $.get({
                    async: false,
                    url: current_host + "/get/proposals",
                    data: {auth: JSON.stringify(this.auth), user_id: self.user_id, query: JSON.stringify(self.query)},
                    dataType: "json",
                    success: function (data) {
                        //   alert(JSON.stringify(data))
                        self.proposals = data.proposals;
                        self.page = 1;
                        /*   for (var i = 0; i<10000000; i++){

                           }*/
                        self.available_titles = self.proposals.map(el => el.title)
                        self.available_publicators = Array.from(new Set(self.proposals.map(p => p.creator_name)));
                        self.available_locations = Array.from(new Set(self.proposals.filter(p => p.location !== null).map(p => p.location.str_description)));
                        self.loadpage = false

                        //    var dd = new Date();
                        //   alert(12)
                        //   alert(JSON.stringify(self.date) + " "+JSON.stringify(dd))
                    },
                    error: function (e) {
                        // alert(JSON.stringify(e))
                    }
                })


            },
            paginator(arr) {
                //  alert(3)
                // return arr
                //      alert(JSON.stringify(arr))
                var k = (this.page - 1) * this.proposal_per_page;

                if (arr.length > this.page * this.proposal_per_page) {
                    var res = []
                    for (var i = k; i < k + this.proposal_per_page; i++) {
                        res.push(arr[i])
                    }
                    //        alert(4)

                    return res
                    //   alert(k + " * " + k+21)
                    //                    return arr.slice(k, k+21);//може 20

                } else {
                    var res1 = []
                    //  alert(JSON.stringify(arr))
                    for (var j = k; j < arr.length; j++) {
                        res1.push(arr[j])
                    }
                    //      alert(5)

                    return res1
                    //alert(k +" * "+ arr.length)
                    //             return arr.slice(k,  arr.length );//Може  +1
                }

                //    var end = this.page * 21 > arr.length ? arr.length -1: this.page * 21 - 1;
                //return arr.slice(this.page === 1 ? 0: this.page * 21 - 21 - this.page , arr.length)
            },
            pageChanged(e) {
                this.page = e;
            },
            search() {

                var self = this;
                //   alert(self.self.user_id);
                $.get({
                    async: true,
                    url:/* "http://127.0.0.1:8000"*/    current_host + "/get/proposals",
                    data: {auth: JSON.stringify(self.auth), user_id: self.user_id, query: JSON.stringify(self.query)},
                    dataType: "json",
                    success: function (data) {
                        //   alert(JSON.stringify(data));
               //        alert(1)
//alert(JSON.stringify(data.proposals));
             //          alert(data.proposals.le);
                        self.proposals = data.proposals;
                        //         alert(1)
                        //  self.available_titles = self.proposals.map(el => el.title)
                    },
                    error: function (e) {
                       //  alert(JSON.stringify(e))

                    }
                })
            },
            search_values_changed(e) {

                // alert(134)
                this.query = e;
            },
            params_filter(proposals) {

                var result = proposals;
                if (result.length !== 0 && this.query !== null && this.query.title.length > 1 && proposals !== null && proposals.length !== 0) {

                    result = result.filter(proposal => proposal.title.toLowerCase().includes(this.query.title.toLowerCase()))

                }

                if (result.length !== 0 && this.query !== null &&
                    this.query.location !== null && this.query.location.length > 2) {
                    result = result.filter(proposal => proposal.location !== null &&
                        proposal.location.str_description.toLowerCase().includes(this.query.location.toLowerCase()))
                }

                if (result.length !== 0 && this.query !== null && this.query.publicator_search && this.query.publicator !== null && this.query.publicator.length > 2) {
                    result = result.filter(proposal =>
                        proposal.creator_name.toLowerCase().includes(this.query.publicator.toLowerCase()))
                }
                this.client_searched_results_len = result.length;
                return result
            }
        }
    }
</script>

<style scoped>

</style>