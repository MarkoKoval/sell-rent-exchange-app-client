<template>
    <div>
        <link rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <!--    <p>{{auth}}</p> -->
        <div v-if="!edit_proposal" class="d-flex justify-content-center">
            <div style="width: 75vh;">
                <vue-bootstrap-typeahead
                        v-model="query"
                        :data="data.filter(d => !!d)"
                        :minMatchingChars="1"
                        :maxMatches="100"
                        placeholder="Пошук по назві"

                />
            </div>
        </div>

        <!--
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


            </div>-->


        <!--   <p>{{ created_proposals_ }}</p> -->
        <div v-show="!edit_proposal" class="row" style="margin-top: 20px">
            <div v-for="proposal in name_filter(created_proposals_)" class="col-sm-12 d-flex justify-content-around"

                 style="margin-bottom: 5px;">
              <!--  <p>{{proposal}}</p> -->
                <!--  <h5 v-if="proposal.id === 1"> {{proposal}} </h5> -->
                <div class="card w-50  containerq shadow-lg">
                    <div class="card-body ">
                        <h5 align="center" class="card-title">{{proposal.title|restrict(40)}}</h5>
                        <p class="card-text">


                            {{proposal.description | restrict(100)}}
                        </p>
                        <div class="row">
                            <a class="text badge badge-primary"
                               style="cursor: pointer;margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{
                                proposal.category.category}}/{{ proposal.category.subcategory}}</a>
                            <a class="text badge badge-primary"
                               style="cursor: pointer; margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{
                                proposal.proposal_type}}</a>
                            <a class="text badge badge-primary"
                               style="cursor: pointer;margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{
                                proposal.proposal_item_type}}</a>
                            <a v-on:click="group_by(proposal.proposal_item_type)" v-if="proposal.proposal_item_type==='Товари'" class="text badge badge-primary"
                               style="cursor: pointer; margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{
                                proposal.proposal_item_state}}</a>

                            <a v-if="proposal.available_items!==null" href="#" class="text badge badge-primary"
                               style="cursor: pointer;margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">Доступно:
                                {{ proposal.available_items}}</a>
                            <a v-if="proposal.total_items!==null" href="#" class="text badge badge-primary"
                               style="cursor: pointer;margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">Усі: {{
                                proposal.total_items}}</a>
                            <a v-if="proposal.proposal_type==='Оренда'" href="#" class="text badge badge-primary"
                               style="cursor: pointer;margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">Ціна:
                                {{ proposal.item_price_value}} {{proposal.item_price_currency}} {{
                                proposal.rent_time_unit_measure}}</a>
                            <a v-if="proposal.proposal_type!=='Оренда' && proposal.item_price_value!==null" href="#"
                               class="text badge badge-primary"
                               style="cursor: pointer;margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">Ціна:
                                {{ proposal.item_price_value}} {{proposal.item_price_currency}}</a>

                            <!--       <p>{{proposal.location}}</p> -->
                            <a v-if="proposal.location!==null" href="" class="text badge badge-primary"
                               style="cursor: pointer;margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">
                                {{proposal.location.str_description| restrict(50)}}</a>

                            <!--   <a href="#" class="badge badge-primary" style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{  proposal.creation_time}}</a> -->

                        </div>

                        <div class="row">

                            <div v-for="tag in proposal.search_tags">

                                <a class="text badge badge-primary"
                                   style="cursor: pointer;margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{tag.title}}</a>

                            </div>

                              <a v-if="proposal.waited_for_deal" class="text badge badge-primary"
                               style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">Є запит з пропозицією </a>
                        </div>

                        <div class="row d-flex justify-content-end">
                             <a v-if="proposal.is_blocked_by_admin" class="text badge badge-danger"
                               style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">Заблокована
                                адміном</a>
                            <a   class="text badge badge-primary" style="margin-right: 15px;  margin-left: 5px; margin-bottom: 3px;"   > {{proposal.creation_time|datify}}</a>
                        </div>

                        <div class="d-flex justify-content-end">
                            <a v-if="proposal.proposal_type==='Обмін'" target="_blank"
                               :href="'/proposals/'+proposal.id+'/wished-for-exchange'"
                               class="btn-sm btn-primary" style="margin-right: 5px;  margin-left: 5px; ">Бажані елементи
                                на обмін</a>
                  <!--          <p>{{proposal.proposal_type}}-{{auth.role}} -{{proposal.proposal_type==='Обмін' && auth.role !== 'Звичайний'}}</p> -->
                       <!--     <button v-if="proposal.proposal_type==='Обмін' && auth.role !== 'Звичайний'"
                                    v-on:click="chain_exchange_variants(proposal.id)" class="btn-sm btn-primary"
                                    data-toggle="tooltip" title="Варіанти ланцюгового обміну"
                                    style="margin-right: 5px;  margin-left: 5px;"><i class="fas fa-recycle"></i>
                            </button>-->


                             <button hidden v-if="proposal.proposal_type==='Обмін' && auth.role !== 'Звичайний'"
                                    v-on:click="chain_exchange_variants(proposal.id)" class="btn-sm btn-primary"
                                    data-toggle="tooltip" title="Варіанти ланцюгового обміну"
                                    style="margin-right: 5px;  margin-left: 5px;"><i class="fas fa-recycle"></i>
                            </button>

                             <button v-if="proposal.proposal_type==='Обмін' && auth.role !== 'Звичайний'"
                                    v-on:click="chain_exchange_variants(proposal.id)" class="btn-sm btn-primary"
                                    data-toggle="tooltip" title="Варіанти ланцюгового обміну"
                                    style="margin-right: 5px;  margin-left: 5px;"><i class="fas fa-recycle"></i>
                            </button>


                            <button v-on:click="show_details(proposal.id)" class="btn-sm btn-primary"
                                    data-toggle="tooltip" title="Детальна інформація"
                                    style="margin-right: 5px;  margin-left: 5px;"><i class="fas fa-info-circle"></i>
                            </button>
<!-- v-if="!proposal.waited_for_deal" -->

                            <button  v-if="!proposal.waited_for_deal" v-on:click="edit(proposal)" class="btn-sm btn-primary" data-toggle="tooltip"
                                    title="Редагувати"
                                    style="margin-right: 5px;  margin-left: 5px;"><i class="fas fa-edit"></i>
                            </button>
                            <!--v-if="!proposal.waited_for_deal"-->
                            <button  v-if="!proposal.waited_for_deal" v-on:click="delete_(proposal.id)" class="btn-sm btn-danger" data-toggle="tooltip"
                                    title="Видалити"
                                    style="margin-right: 5px;  margin-left: 5px;"><i class="fa fa-trash"></i>
                            </button>
                            <!--    <button class="btn"><i class="far fa-trash-alt"></i></button>-->

                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div v-if="edit_proposal">

            <edit_proposal v-on:go_back="back" :edit_values="to_edit"></edit_proposal>
        </div>
        <div v-if="created_proposals_!== null && created_proposals_.length ===0"><h4 align="center" style="margin-top: 100px"> Ще немає створених пропозицій </h4>
        </div>

    </div>
</template>
<style>

    .text {
        color: white !important;
    }
</style>
<script>
       import current_host from "../get_api_host.js"

    import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
    // Using callback
    import current_auth from "../get_current_auth.js"
    import $ from "jquery"
    import Swal from 'sweetalert2/dist/sweetalert2.js'
    import 'sweetalert2/dist/sweetalert2.css'

    import edit_proposal from "./edit_proposal.vue"
    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
       var moment = require("moment")
       export default {
        name: "created_proposals",
        components: {edit_proposal, FontAwesomeIcon},
        filters: {
            restrict: function (value, arg) {
                return value.length > arg ? value.substring(0, arg) + "...." : value
            },
            datify(d) {
                //     alert(moment(JSON.stringify(d).substring(1,JSON.stringify(d).length-1)).utc().format('YYYY-MM-DD-HH'))
                return moment(JSON.stringify(d).substring(1, JSON.stringify(d).length - 1)).utc().format('YYYY-MM-DD HH:mm');
                //alue-format="YYYY-MM-DD hh:mm:ss"
            },
        },
        data() {
            return {
                query: "",
                user_id: parseInt(localStorage.getItem("id")),

                edit_proposal: false,
                to_edit: null,
                data: [],
                auth:null,/*{
                    role: localStorage.getItem("role"),
                    id: parseInt(localStorage.getItem("id")),
                    token: localStorage.getItem("token"),
                    name: localStorage.getItem("name"),
                },*/
                created_proposals_: null,  //[
                    /*  {
                          id: 0,
                          title: "hahahahah",
                          description: "yrthtrhtrhtrhtrhrthtrhrhrhrh",
                          images: null,
                          category: "erherhrer",
                          search_tags: ["tagas", "the"],
                          creator_id: 0,
                          user_name: "John",
                          creation_time: "2020 ",
                          proposal_type: "Продаж",
                          proposal_item_type: "Товари",
                          proposal_item_state: "Новий",
                          proposal_location_latitude: 33,
                          proposal_location_longitude: 22,
                          available_items: null,
                          total_items: null,
                          set_visible_for_all: true,
                          is_blocked_by_admin: false,
                          rent_time_unit_measure: "",
                          item_price_value: null,
                          item_price_currency: "Гривня",
                          wished_items: null,
                          complains: null,
                      },*/

               // ]
            }
        },

        mounted() {
        //    alert(12);
            this.auth = current_auth.get_current_auth();
            var self = this;
            $.get({
                async: true,
                url: /*"http://127.0.0.1:8000"*/   current_host+"/proposals/user/" + localStorage.getItem("id"),
                dataType: "json",
                success: function (data) {
                    //      alert(JSON.stringify(data));
                    self.created_proposals_ = data.proposals;
                    self.data = self.created_proposals_.map(x => x.title)
                    //   self.data = ["ffffff","ddfffff","aaaaaa"];
                },
                error: function (data) {
                    alert(JSON.stringify(data));
                }
            })
        },

        methods: {
            name_filter(arr) {
                if (this.query.length === 0)
                    return arr;
                var res = [];

                for (let i = 0; i < arr.length; i++) {
                    //   alert(11)
                    if (this.query !== "" && arr[i].title.toLowerCase().includes(this.query.toLowerCase())) {
                        //    alert(12)
                        res.push(arr[i]);
                    }
                }
                return res
            },
            chain_exchange_variants(id) {
                this.auth = current_auth.get_current_auth();
                var self = this;
                // alert(id);
                $.get({
                    async: true,
                    url:/* "http://127.0.0.1:8000"*/ current_host+"/find/chain-exchange-variants/" + id, dataType: "json",
                    data: {auth: JSON.stringify(self.auth),user: JSON.stringify({id: self.user_id})},
                    success: function (data) {
                        //       alert(JSON.stringify(data));
                        Swal.fire({
                            title: "Варіанти є",
                            text: "Можна переглянути можливі варіанти",
                            icon: 'success',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#c91d12',
                            cancelButtonText: 'Ні не треба',
                            confirmButtonText: 'Переглянути'
                        }).then((result) => {
                            if (result.value) {
                                ///    alert(JSON.stringify(data));
                                localStorage.setItem("current_chain_exchange_variants", JSON.stringify(data.result));
                                //   window.location = "/proposals/" +id+"/possible-chain-exchange-variants";
                                var url = "/proposals/" + id + "/possible-chain-exchange-variants";
                                window.open(url, '_blank');

                            }
                        })
                    },
                    error: function (err) {
                       // alert(JSON.stringify(err))
                        if (err.responseJSON.err !== undefined){
                            Swal.fire({
                                text: err.responseJSON.result,
                                icon: 'info',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',

                            })
                        }
                        else {
                            Swal.fire({
                                title: "Варіантів нема",
                                text: "Попробуйте будь ласка пізніше",
                                icon: 'info',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',

                            })
                        }


                    },
                });
            },
            delete_(id) {
                var self = this;
               // alert(id);
                $.get({
                    async: true,
                    url:/* "http://127.0.0.1:8000"*/  current_host+"/delete/proposals/" + id,
                    dataType: "json",
                    data: {auth: JSON.stringify(self.auth)},
                    success: function (data) {
                        //  alert(JSON.stringify(data));
                        // alert(JSON.stringify(self.created_proposals_))
                        // alert(JSON.stringify(self.created_proposals_.length))
                        self.created_proposals_ = self.created_proposals_.filter(el => el.id !== id);
                        //  alert(JSON.stringify(self.created_proposals_))
                        //  alert(JSON.stringify(self.created_proposals_.length))
                        //self.created_proposals_ = data.proposals;
                    },
                    error: function (data) {

                          Swal.fire({

                            text: data.responseJSON.result, // "Попробуйте будь ласка пізніше",
                            icon: 'info',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',

                        });

                    }
                })
            },
            show_details(i) {
                let a = document.createElement('a');
                a.target = '_blank';
                a.href = "/proposals/" + i + "/details";
                a.click();
            },
            /* chain_exchange_variants(p){
                 alert(1);
             },*/
            back() {
                this.edit_proposal = false;
            },
            edit(e) {

                this.to_edit = e;
                this.edit_proposal = true;

            },

            group_by(elem){

            }

                /*   var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://us1.locationiq.com/v1/reverse.php?key=eb08ae2706974a&lat=49.827106&lon=23.428710&format=json",
                "method": "GET"
              }

              $.ajax(settings).done(function (response) {
                alert(response.display_name);
              });*/



        }
    }
</script>

<style scoped>

</style>