<template>
    <div v-if="auth.token">
       <!-- <p>{{r}}</p> -->
       <!-- <p>hell</p>
         <p>{{res}}</p>
         <p>{{res.length}}</p> -->
        <b-form-group>
            <div class="d-flex justify-content-center" style="margin-top: 20px">
                <b-form-radio-group v-model="called_items">

                    <b-form-radio name="called_items" value="Cтворення"
                                  style="margin-right: 10px;">Cтворення
                    </b-form-radio>
                    <b-form-radio name="called_items" value="Cтворені"
                                  style="margin-right: 10px;">Cтворені
                    </b-form-radio>
                    <b-form-radio name="called_items" value="Запитувані"
                                  style="margin-right: 10px;">Запитувані
                    </b-form-radio>
                    <b-form-radio name="called_items" value="Збережені"
                                  style="margin-right: 10px;">Збережені
                    </b-form-radio>
                </b-form-radio-group>

            </div>
        </b-form-group>


      <!--    <div v-if="res.length !== 0" class="d-flex justify-content-center">
            <div style="width: 75vh;">
                <vue-bootstrap-typeahead
                        v-model="query"
                        :data="title.filter(d => !!d)"
                        :minMatchingChars="1"
                        :maxMatches="100"
                        placeholder="Пошук по назві"

                />
            </div>
        </div>-->

        <div class="row" style="margin-top: 10px;">
            <p></p>
            <div v-if="res.length !== 0" v-for="proposal in res" class="col-sm-12 d-flex justify-content-around"
                 style="margin-bottom: 5px;">
                <div class="card w-50  containerq">
                    <div class="card-body ">
                        <h5 class="card-title">{{proposal.info.title|restrict(20)}}</h5>
                        <p class="card-text">

                            {{proposal.info.description | restrict(50)}}
                        </p>
                        <div class="row">
                            <a href="#" class="badge badge-primary"
                               style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{
                                proposal.info.category.category}} / {{ proposal.info.category.subcategory}}</a>
                            <a href="#" class="badge badge-primary"
                               style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{
                                proposal.info.proposal_type}}</a>
                            <a href="#" class="badge badge-primary"
                               style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{
                                proposal.info.proposal_item_type}}</a>
                            <a v-if="proposal.info.proposal_item_type==='Товари'" href="#" class="badge badge-primary"
                               style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{
                                proposal.info.proposal_item_state}}</a>

                            <!--    <a v-if="proposal.available_items!==null" href="#" class="badge badge-primary" style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">Доступно: {{ proposal.available_items}}</a>
                                 <a  v-if="proposal.total_items!==null" href="#" class="badge badge-primary" style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">Усі: {{  proposal.total_items}}</a> -->
                            <!--     <a  v-if="proposal.info.proposal_type==='Оренда'" href="#" class="badge badge-primary" style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{    proposal.rent_time_unit_measure}}</a> -->
                            <!--  <a  v-if="proposal.item_price_value!==-1" href="#" class="badge badge-primary" style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">Ціна:  {{  proposal.item_price_value}}  {{proposal.item_price_currency}}</a>-->
                            <a v-if="proposal.info.location!==null" href="#" class="badge badge-primary"
                               style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">Розташування:
                                {{proposal.proposal_location_latitude}}
                                {{proposal.proposal_location_longitude}}</a>

                            <a href="#" class="badge badge-primary"
                               style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{
                                proposal.creation_time}}</a>

                        </div>

                        <div class="row">

                            <div v-for="tag in proposal.info.search_tags">

                                <a href="#" class="badge badge-primary"
                                   style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{tag.title}}</a>

                            </div>
                        </div>


                        <div class="d-flex justify-content-end">
                            <a :href="'/proposals/'+proposal.info.id+'/request/create'" target="_blank"
                               class="btn-sm btn-primary"
                               style="margin-right: 5px;  margin-left: 5px;">Запит-бажання</a>
<!-- proposals/21/details/-->
                            <a :href="'/proposals/'+proposal.info.id +'/details'" target="_blank"  data-toggle="tooltip" title="Детальна інформація"
                               class="btn-sm btn-primary" style="margin-right: 5px;  margin-left: 5px;"><i class="fas fa-info-circle"></i></a>

                            <button v-on:click="delete_(proposal.id)" class="btn-sm btn-danger" data-toggle="tooltip" title="Видалити"
                                    style="margin-right: 5px;  margin-left: 5px;"><i class="fa fa-trash"></i>
                            </button>

                            <!--    <button v-on:click="edit1(i.n)" class="btn btn-primary"
                                        style="margin-right: 5px;  margin-left: 5px;">Edit
                                </button> -->
                        </div>
                    </div>
                </div>

            </div>
        </div>
                    <div v-if="res.length === 0"> <h4 align="center" style="margin-top: 100px"> Ще немає збережених пропозицій </h4> </div>

        <div v-if="edit_proposal">

            <edit_proposal v-on:go_back="back" :edit_values="to_edit"></edit_proposal>
        </div>
    </div>
</template>
<style>


</style>
<script>


    // Using callback
       import current_host from "../get_api_host.js"

    import $ from "jquery"


    import edit_proposal from "./edit_proposal.vue"
    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    export default {
        name: "saved_proposals",
        components: {edit_proposal},
        filters: {
            restrict: function (value, arg) {
                return value.length > arg ? value.substring(0, arg) + "...." : value
            },
        },
        watch: {
            called_items: function (new_, old_) {
                //alert(new_);
                //  alert(old_);
                if (new_ !== old_) {
                    //  alert(new_);
                    //alert(new_)
                    if (new_ === "Cтворені") {
                        window.location = "/proposals";
                    }
                    if (new_ === "Cтворення") {
                        window.location = "/proposals/create";
                    } else if (new_ === "Запитувані") {
                        window.location = '/proposals/requested';
                    }
                    /*   else if(new_ === "Збережені"){
                       window.location = "/proposals/saved";
                       }*/
                }
            }
        },
        data() {
            return {
                title: [],
                auth: {
                    role: localStorage.getItem("role"),
                    id: parseInt(localStorage.getItem("id")),
                    token: localStorage.getItem("token"),
                    name: localStorage.getItem("name"),
                },
                res: [],
                called_items: "Збережені",
                edit_proposal: false,
                to_edit: null,
                auth_id: parseInt(localStorage.getItem("id")),
                created_proposals_: [
                    {
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
                    },

                ]
            }
        },
        mounted() {
            var self = this;
         //   alert(self.auth_id)
            $.get({
                async: true,
                url:/* "http://127.0.0.1:8000" */ current_host+"/proposals/wished/get",
                data: {user_id: self.auth_id, auth: JSON.stringify(self.auth)},
                dataType: "json",
                success: function (data) {
                    self.res = data.result;
               //     self.title = self.res.map(el => el.title);
                  //  alert(data.date)
                    //   alert(JSON.stringify(data));
                    //   self.proposals = data.proposals;
                    //   window.location = "/proposals/saved";

                },
                error: function (e) {
              //      alert(JSON.stringify(e))
                }
            })
        },
        created() {
//42.6016209,29.0210111
            // outputs "Buckingham Palace"


            this.a();

        },
        methods: {
            delete_(id) {
                var self = this;
                $.get({
                    async: true,
                    url:/* "http://127.0.0.1:8000"*/ current_host +"/proposals/wished/delete/"+id,
                   data: { user_id :self.auth_id, auth: JSON.stringify(self.auth)},
                    dataType: "json",
                    success: function (data) {
                     //   alert(JSON.stringify(self.res))
                        self.res = self.res.filter(r => r.id !== id)
                  //      alert(JSON.stringify(data));
                      //  self.res = data.result;
                     //   alert(JSON.stringify(data));
                       //   self.proposals = data.proposals;
                      //   window.location = "/proposals/saved";

                    },
                    error: function (e) {
                    //    alert(JSON.stringify(e))
                    }
              })
        },
            },
            back() {
                this.edit_proposal = false;
               // alert(JSON.stringify(this.created_proposals_));
            },
            edit(e) {

                this.to_edit = e;
                this.edit_proposal = true;

            },
            async a() {

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