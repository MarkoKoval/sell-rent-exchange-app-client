<template>
    <div>


        <div class="d-flex justify-content-center">
            <div style="width: 75vh;">
                <vue-bootstrap-typeahead
                        v-model="query"
                        :data="data.filter(d => !!d)"
                        :minMatchingChars="1"
                        :maxMatches="100"
                        placeholder="Пошук по основній бажаній пропозиції"

                />
            </div>
        </div>
        <!--   @hit="TitleSelected-->

        <div class="d-flex justify-content-center" style="margin-top: 20px">
            <b-form-radio-group v-model="choice">

                <b-form-radio name="called_items" value="Усі"
                              style="margin-right: 10px;">Усі
                </b-form-radio>
                <b-form-radio name="called_items" value="Мої запити"
                              style="margin-right: 10px;">Мої запити
                </b-form-radio>
                <b-form-radio name="called_items" value="Запити до мене"
                              style="margin-right: 10px;">Запити до мене
                </b-form-radio>
                <!--        <b-form-radio name="called_items" value="Повязані"
                                    style="margin-right: 10px;">Повязані
                      </b-form-radio> -->
            </b-form-radio-group>

        </div>

        <div class="row" style="margin-top: 20px">


            <div class="d-flex justify-content-center" style="margin: auto;">


            </div>

            <!--<p >rree {{requests}}</p>-->
            <div v-if="requests.length !==0" v-for="proposal in title_filter( requests)" class="col-sm-12 d-flex justify-content-center"
                 style="margin-bottom: 5px; ">

                <div v-if="   (   choice === 'Усі' || (choice === 'Мої запити' && proposal.request_user_id === auth_id ) ||
              (choice === 'Запити до мене' && proposal.requested_user_id === auth_id ))   "
                     class="card w-50 containerq">

                    <div class="card-body shadow-lg">
                        <h5 v-if="proposal.title !== null" align="center" class="card-title">
                            {{proposal.title|restrict(50)}}</h5>
                        <p class="card-text">
                          <!--  {{proposal}} -->
                            #{{proposal.id}}.
                            {{proposal.request_message | restrict(100)}}

                        </p>
                        <div class="row d-flex justify-content-end">
                            <a class="text badge badge-primary"
                               style="height: 20px;margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">
                                {{ proposal.author}}</a>
                            <a class="text badge badge-primary"
                               style="height: 20px;margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{
                                proposal.answer_type }}</a>
                            <a v-on:click="add_top(proposal.answered_request)" v-if="proposal.answered_request !== null"
                               class="text badge badge-primary"
                               style="cursor: pointer; height: 20px;margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">#
                                {{proposal.answered_request}}</a>
                            <a v-on:click="add_top(proposal.answered)" v-if="proposal.answered !== null"
                               class="text badge badge-primary"
                               style="cursor: pointer; height: 20px;margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">#
                                {{proposal.answered}}</a>

                            <!--    {{ proposal.answered_request ? '':'Відповідь на #' + proposal.answered_request}} -->
                            <a class="text badge badge-primary"
                               style="height: 20px;margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">
                                {{ proposal.answer_user}}</a>
                            <a class="text badge badge-primary"
                               style="height: 20px;margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{
                                proposal.request_main_item }}</a>

                            <a class="text badge badge-primary" v-if="proposal.requested_object_received !== null"
                               style="height: 20px;margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">Підтверджено
                                надання у {{
                                proposal.requested_object_received|datify(3) }}</a>

                            <a class="text badge badge-primary"
                               style="height: 20px;margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{
                                proposal.request_time|datify }}</a>

                        </div>
                        <div class="d-flex justify-content-end">

                            <!--   <a   v-if="proposal.reanswer_for_request_proposal !==  null" class="text badge badge-primary" style="height: 20px;margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px; cursor: pointer">{{proposal.reanswer_for_request_proposal}} деталі</a>-->
                            <!--     <a   v-if="proposal.reanswer_for_request_proposal !==  null && proposal.answer_type !== 'Погодження' " class="text badge badge-primary" style="height: 20px;margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">Без відповіді</a> -->

                        </div>
                        <div class="d-flex justify-content-end">

                          <!--  <a v-if="proposal.requested_object_received !== null" class="text badge badge-primary"
                               style="height: 20px;margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">Час
                                мого підтвердження {{ proposal.requested_object_received }}</a> -->

                            <!--   <p>{{proposal.reanswer_for_request_proposal}}</p>
                                 <p>{{proposal.answer_type}}</p> -->
                            <button v-on:click="approve(proposal.id, proposal.answer_type,proposal.answered_request )" v-if="proposal.requested_object_received === null &&
                             proposal.request_user_id === auth_id &&    (proposal.answer_type === 'Погодження' || (proposal.answer_type === 'Пропозиція'
                                                                                                                   && proposal.reanswer_for_request_proposal === 'Погодження'))"
                                    class="btn-sm btn-primary"
                                    style="margin-right: 5px;  margin-left: 5px; margin-bottom: 5px;  margin-top:5px;">
                                Підтвердити надання
                            </button>

                            <!--   <a v-if="proposal.answered !== null &&  proposal.request_user_id !== auth_id " target="_blank" :href="'/proposals/request/'+ proposal.answered +'/details/'"
                                  class="btn-sm btn-primary" style="margin-right: 5px;  margin-left: 5px; margin-bottom:5px;  margin-top:5px;">Деталі {{proposal.reanswer_for_request_proposal}}</a> -->


                            <!--Деталі-->
                            <a v-if="proposal.answered_request !== null" target="_blank"
                               :href="'/proposals/request/'+ proposal.id +'/details/'"
                               class="btn-sm btn-primary"
                               style="margin-right: 5px;  margin-left: 5px; margin-bottom:5px;  margin-top:5px;"> <i class="fas fa-info-circle"></i>
                              </a>
                            <a v-if="proposal.answered_request === null" target="_blank"
                               :href="'/proposals/request/'+ proposal.id +'/details/'"
                               class="btn-sm btn-primary"
                               style="margin-right: 5px;  margin-left: 5px; margin-bottom: 5px;  margin-top:5px;">  <i class="fas fa-info-circle"></i></a>


                            <!--   <a v-if="proposal.requested_object_received === null" target="_blank" :href="'/proposals/request/'+ proposal.id +'/details/'"
                                 class="btn-sm btn-primary" style="margin-right: 5px;  margin-left: 5px; margin-bottom:5px;  margin-top:5px;">Підтвердити отримання</a>
                                Погодження -->
                            <!--  <p>{{proposal.answer_type}}</p>
                              <p>(proposal.answer_type !== 'Погодити' || proposal.answer_type !== 'Погодження')</p>>-->
                            <a v-if="proposal.request_user_id !== auth_id && proposal.reanswer_for_request_proposal === null && proposal.answered === null  && proposal.answer_type !== 'Погодження' "
                               target="_blank" :href="'/answer/request/'+ proposal.id"
                               class="btn-sm btn-primary"
                               style="margin-right: 5px;  margin-left: 5px; margin-top:5px; margin-bottom: 5px; ">Відповісти</a>

                            <button v-if="proposal.request_user_id === auth_id &&  (proposal.answer_type === 'Пропозиція' || proposal.answer_type === 'Запропонувати') &&  proposal.answered === null"
                                    v-on:click="delete_(proposal.id)" class="btn-sm btn-danger"
                                    style="margin-right: 5px;  margin-left: 5px; margin-top:5px; margin-bottom: 5px;">
                               <i class="fas fa-trash"></i>
                            </button>
            <!--  Скасувати  -->
                        </div>
                    </div>

                </div>
            </div>
        </div>
                    <div v-if="requests !== null && requests.length ===0" > <h4 align="center" style="margin-top: 100px"> Ще немає запитів </h4> </div>

    </div>
</template>


<script>

       import current_host from "../get_api_host.js"

    var moment = require('moment')


    import $ from "jquery";
    import Dropdown from 'vue-simple-search-dropdown';

    export default {
        name: "requests_related_to_me",
        props: [""],
        components: {Dropdown},
        filters: {
            include(title, query) {
                alert(23)
                if (query.length === 0)
                    return true

                return title.includes(query);
            },
            restrict: function (value, arg) {
                return value.length > arg ? value.substring(0, arg) + "...." : value
            },
            datify(d, add = 0) {
                //     alert(moment(JSON.stringify(d).substring(1,JSON.stringify(d).length-1)).utc().format('YYYY-MM-DD-HH'))
                return moment(JSON.stringify(d).substring(1, JSON.stringify(d).length - 1)).add(add, 'hours').utc().format('YYYY-MM-DD HH:mm');
                //alue-format="YYYY-MM-DD hh:mm:ss"
            },
        },
        watch: {
            query: function (e) {

            }
        },
        data() {
            return {
                someVariableUnderYourControl: false,
                query: '',

                item: {id: 9, name: 'Lion', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
                data: ["опис"],
                choice: 'Усі',
                r: null,
                s: null,
                requests: null,
                auth_id: parseInt(localStorage.getItem("id"))
            }

        },
        mounted() {
            this.all_related_my_requests(this);
        },
        methods: {
            approve_get(id) {
                alert(id);
            },
            getLabel(item) {
                return item.name
            },


            getDropdownValues(e) {
                this.r = e;
            },
            validateSelection(e) {
                this.s = e;
            },
            my_requests() {

            },
            all_related_my_requests(self) {
                //    alert("4543");
                //   var self = this;
                $.get({
                    async: true,
                    url: /*"http://127.0.0.1:8000"*/  current_host + "/requests/related/me",
                    data: {user: JSON.stringify({"id": self.auth_id})},

                    dataType: "json",
                    success: function (data) {
                        //  alert("4435");
                        //  alert(JSON.stringify(data))
                        self.requests = data.requests;
                        //   self.loaded = true;
                        //          alert(JSON.stringify( self.requests));

                        self.data = Array.from(new Set(self.requests.map(el => el.title).filter(el => !!el)))
                        //self.someVariableUnderYourControl = true;
                        //       self.choice = "Усі"
                        //      alert( self.choice);
                        //   alert(JSON.stringify(data));
                        // self.requested_proposal = data.proposal;
                    },
                    error: function (e) {
                        alert(JSON.stringify(e))
                    }
                })
            },
            locationSelected(e) {
                alert(1);
                alert(e)
            },
            title_filter(arr) {
                //   alert(JSON.stringify(arr));

                if (this.choice === "Повязані") {

                }
                if (this.query.length === 0)
                    return arr;
                var res = [];
                if (this.query.length !== 0) {
                    // alert(this.query)
                    for (var i = 0; i < arr.length; i++) {
                      //  alert(JSON.stringify(res))
                        if (arr[i].title !== null && arr[i].title.toLowerCase().includes(this.query.toLowerCase()))
                            res.push(arr[i]);

                    }
                }

                return res
            },
            add_top(id) {
                var arr = JSON.parse(JSON.stringify(this.requests));
                var top = this.requests.filter(r => r.id === id)
                arr = arr.filter(a => a.id !== id)
                this.requests = top;
                this.requests = this.requests.concat(arr);
                $('html, body').animate({scrollTop: 0}, 'fast');
                //  $('html,body').scrollTop(0);
            },
            approve(id,answer_type,answered_request) {
                $.post({
                    url:/* 'http://127.0.0.1:8000"*/   current_host+"/proposals/approve-object-get/" + id,
                    async: true,
                    dataType: "json",
                    data: { params: JSON.stringify({answer_type: answer_type,answered_request: answered_request})},
                    success: function (data) {
                        //alert(JSON.stringify(data))
                        location.reload()
                    },
                    error: function (data) {
                      //  alert(JSON.stringify(data))
                    }
                })
            },
            delete_(id) {
                var self = this;
                $.post({
                    async: true,
                    url: /*"http://127.0.0.1:8000"*/   current_host+"/delete/proposal-request/" + id,
                    //   data: { query : null},
                    /*   data:{  user_id: self.user_id,query : JSON.stringify(self.query)},*/
                    dataType: "json",
                    success: function (data) {
                        //  alert("suc"+JSON.stringify(data))
                        //  self.requests = data;
                        //   alert("SUCESS");
                        // alert(JSON.stringify( self.requests) );
                        // alert(self.requests.filter(e => e.id !== id));
                        //   alert(JSON.stringify(self.requests))
                        self.requests = self.requests.filter(e => {
                            //       self.data.push(e.request_message);
                            //  alert( e.id);
                            //   alert(id);
                            return e.id !== id
                        }) // requests;
                        //  self.load_my_requests(self);
                        //   alert(JSON.stringify(data));
                        // self.requested_proposal = data.proposal;
                    },
                    error: function (e) {
                      //  alert("err" + JSON.stringify(e))
                    }
                })

            },
        }

    }
</script>

<style scoped>

</style>