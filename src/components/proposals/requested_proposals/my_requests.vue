<template>
    <div class="row" style="margin-top: 20px">

        <div class="d-flex justify-content-" style="margin: auto;">
            <Dropdown
                    style=" width: 100vw;"
                    :options="[{ id: 1, name: 'Option 1'}, { id: 2, name: 'Option 2'},{ id: 3, name: 'Option 3'}, { id: 4, name: 'Option 4'}]"
                    v-on:selected="validateSelection"
                    v-on:filter="getDropdownValues"
                    :disabled="false"
                    name="zipcode"
                    :maxItem="2"
                    placeholder="Вибери опцію">
            </Dropdown>
        </div>
        <!--   <p>{{requests}}</p>
                <p>{{r}} - {{s}}</p> -->
        <div v-for="proposal in requests" class="col-sm-12 d-flex justify-content-around"

             style="margin-bottom: 5px; width: 75vw;">
            <div class="card w-75  containerq">

                <div class="card-body ">
                    <!--   <h5 align="center" class="card-title">{{proposal.type|restrict(20)}}</h5> -->
                    <p class="card-text">
                        <!--  {{proposal}} -->

                        {{proposal.request_message | restrict(50)}}
                    </p>
                    <!--    <div class="row">
                          <a  class="text badge badge-primary" style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{  proposal.requested_main_item.category.category}}/{{  proposal.requested_main_item.category.subcategory}}</a>
                            <a  class="text badge badge-primary" style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{  proposal.proposal_type}}</a>
                               <a  class="text badge badge-primary" style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{  proposal.proposal_item_type}}</a>
                               <a  v-if="proposal.proposal_item_type==='Товари'" class="text badge badge-primary" style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{  proposal.proposal_item_state}}</a>

                               <a v-if="proposal.available_items!==null" href="#" class="text badge badge-primary" style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">Доступно: {{ proposal.available_items}}</a>
                               <a  v-if="proposal.total_items!==null" href="#" class="text badge badge-primary" style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">Усі: {{  proposal.requested_main_item.total_items}}</a>
                               <a  v-if="proposal.requested_main_item.proposal_type==='Оренда'" href="#" class="text badge badge-primary" style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">Ціна:  {{  proposal.requested_main_item.item_price_value}}  {{proposal.requested_main_item.item_price_currency}} {{    proposal.requested_main_item.rent_time_unit_measure}}</a>
                               <a  v-if="proposal.requested_main_item.proposal_type!=='Оренда' && proposal.item_price_value!==null" href="#" class="text badge badge-primary" style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">Ціна:  {{  proposal.requested_main_item.item_price_value}}  {{proposal.requested_main_item.item_price_currency}}</a>
                               <a  v-if="proposal.requested_main_item.location!==null" href="" class="text badge badge-primary" style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">
                                 {{proposal.requested_main_item.location.str_description| restrict(50)}}</a>

                           </div>

                          <div class="row">

                          <div v-for="tag in proposal.requested_main_item.search_tags">

                      <a  class="text badge badge-primary" style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{tag.title}}</a>

                          </div>
                              </div>
   -->

                    <div class="d-flex justify-content-end">
                        <a target="_blank" :href="'/proposals/request/'+ proposal.id +'/details/'"
                           class="btn-sm btn-primary" style="margin-right: 5px;  margin-left: 5px; margin-top:5px;">Відповіді</a>

                        <a target="_blank" :href="'/proposals/request/'+ proposal.id +'/details/'"
                           class="btn-sm btn-primary" style="margin-right: 5px;  margin-left: 5px; margin-top:5px;">Деталі</a>
                        <a target="_blank" :href="'/proposals/'+ proposal.requested_main_item +'/details/'"
                           class="btn-sm btn-primary" style="margin-right: 5px;  margin-left: 5px; margin-top:5px;">Основний
                            бажаний обєкт</a>
                        <button v-on:click="delete_(proposal.id)" class="btn-sm btn-danger"
                                style="margin-right: 5px;  margin-left: 5px;">Видалити
                        </button>

                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
    import current_host from "../get_api_host.js"

    import $ from "jquery";
    import Dropdown from 'vue-simple-search-dropdown';

    export default {
        name: "my_requests",
        props: [""],
        components: {Dropdown},
        filters: {
            restrict: function (value, arg) {
                return value.length > arg ? value.substring(0, arg) + "...." : value
            },
        },
        data() {
            return {
                r: null,
                s: null,
                requests: [],
                auth_id: localStorage.getItem("id")
            }

        },
        created() {
            this.load_my_requests(this);
        },
        methods: {
            getDropdownValues(e) {
                this.r = e;
            },
            validateSelection(e) {
                this.s = e;
            },
            load_my_requests(self) {
                // alert("4543");
                //   var self = this;
                $.get({
                    async: true,
                    url:/* "http://127.0.0.1:8000"*/ current_host + "/get/my/requests",
                    data: {"user_id": self.auth_id},

                    dataType: "json",
                    success: function (data) {
                        //  alert("4435");
                        //  alert(JSON.stringify(data))
                        self.requests = data.requests;
                        //   alert(JSON.stringify(data));
                        // self.requested_proposal = data.proposal;
                    },
                    error: function (e) {
                     //   alert(JSON.stringify(e))
                    }
                })
            },
            delete_(id) {
                var self = this;
                $.post({
                    async: true, // "http://127.0.0.1:8000"
                    url:   current_host+"/delete/proposal-request/" + id,
                    //   data: { query : null},
                    /*   data:{  user_id: self.user_id,query : JSON.stringify(self.query)},*/
                    dataType: "json",
                    success: function (data) {
                        //  alert("suc"+JSON.stringify(data))
                        //  self.requests = data;
                        //   alert("SUCESS");
                        // alert(JSON.stringify( self.requests) );
                        // alert(self.requests.filter(e => e.id !== id));
                        self.requests = self.requests.filter(e => {
                            //  alert( e.id);
                            //   alert(id);
                            return e.id !== id
                        }) // requests;
                        //  self.load_my_requests(self);
                        //   alert(JSON.stringify(data));
                        // self.requested_proposal = data.proposal;
                    },
                    error: function (e) {
                    //    alert("err" + JSON.stringify(e))
                    }
                })

            },
        }

    }
</script>

<style scoped>

</style>