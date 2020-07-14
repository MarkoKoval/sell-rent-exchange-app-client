<template>
    <div>
        <!--   <p style="margin-top: 300px">token {{auth.token}} </p>-->

        <!--   <p>{{complain_options}}</p>
             <p>{{related_complaints}}</p>
             <p>{{ complain_options === 'На мене'}}</p>
             <p>{{for_desicion}}</p> -->

        <div style="margin-top: 20px;">

            <!--
      <p>{{auth.name}}</p>
                <p>{{complain_options}}</p>
                <p>{{related_complaints}}</p>
                <p>{{ complain_options === 'На мене'}}</p>
                <p>{{for_desicion}}</p>-->

            <b-form-group v-if="auth.role !== 'Адміністратор'">
                <div class="d-flex justify-content-center">
                    <b-form-radio-group v-model="complain_options">

                        <b-form-radio name="complains" value="Мої Скарги"
                                      style="margin-right: 10px;">Мої Скарги
                        </b-form-radio>

                        <b-form-radio name="complains" value="На мене"
                                      style="margin-right: 10px;">Скарги на мене
                        </b-form-radio>
                        <b-form-radio v-if="auth.role==='Адміністратор'" name="complains" value="Вирішення скарг"
                                      style="margin-right: 10px;">Скарги для вирішення
                        </b-form-radio>
                    </b-form-radio-group>

                </div>
            </b-form-group>
            <h4 v-else align="center">Вирішення скарг</h4>
            <div>

    <!--   <p>{{related_complaints.filter(el => el.complain_initiator_user_id !== auth.id).length}}</p>
                <p>{{auth.role !== 'Адміністратор' && complain_options === 'На мене' &&
                loaded && related_complaints.filter(el => el.complain_initiator_user_id == auth.id).length === 0}}</p>
         <p>{{auth.role !== 'Адміністратор' && complain_options === 'На мене' &&
                loaded && related_complaints.filter(el => el.complain_initiator_user_id !== auth.id).length === 0}}</p>-->

               <!-- <p>{{complain_options}}</p>
                <p>{{related_complaints.filter(el => el.complain_initiator_user_id !== auth.id).length}}</p>
                <p>{{ related_complaints.filter(el => el.complain_initiator_user_id === auth.id).length}}</p> -->
             <div v-if="auth.role !== 'Адміністратор' && complain_options === 'На мене' &&
                loaded && related_complaints.filter(el => el.complain_initiator_user_id !== auth.id).length === 0     ">
                    <p align="center" style="margin-top: 50px">Немає скарг</p>

                </div>

                <div v-if="auth.role !== 'Адміністратор' && complain_options === 'Мої Скарги' &&
                loaded &&  related_complaints.filter(el => el.complain_initiator_user_id === auth.id).length === 0     ">
                    <p align="center" style="margin-top: 50px">Немає скарг</p>

                </div>

                <div v-if="auth.role === 'Адміністратор'  &&
                loaded && for_desicion.length === 0     ">
                    <p align="center" style="margin-top: 50px">Немає скарг</p>

                </div>

                <div
                        v-if="auth.role !== 'Адміністратор' && complain_options !== 'Вирішення скарг'"
                        v-for="complaint in  filter_complaints(related_complaints)"
                        class="col-lg-12  input-group justify-content-around"
                        style="margin-bottom: 5px;">
                  <!--   <p>{{complaint}}</p> -->
                    <div class="card" style="width: 50vw">
                        <div class="card-body shadow-lg">

                            <p class="card-text">
                                <!--{{complaint}} -->
                                {{complaint.complain_text}}
                            </p>
                            <div>
                            </div>


                            <div class="d-flex justify-content-end">

                                <a class="text badge badge-primary"
                                   style="height: 20px;margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{
                                    complaint.complain_initiator_user}}</a>

                                <a class="text badge badge-danger"
                                   style="height: 20px;margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{
                                    complaint.object_user.name}}</a>

                                <a class="text badge badge-primary"
                                   style="height: 20px;margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{
                                    complaint.created_time|datify }}</a>

                                <a v-if="complaint.answer !== null" class="text badge badge-primary"
                                   style="height: 20px;margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{
                                    complaint.answer.approve_complain ? 'Погоджена': 'Відхилена'}}</a>

                            </div>
                            <div class="d-flex justify-content-end">
                                <a v-if="complaint.content_type === 'proposals' "
                                   :href="'/proposals/'+ complaint.object_id +'/details/'" target="_blank"
                                   class="btn-sm btn-primary"
                                   style="text-decoration: none;margin-right: 5px;  margin-left: 5px;">Пропозиція скарги
                                </a>

                                <a v-if="complaint.complain_initiator_user !== name"
                                   :href="'/send/user/'+complaint.complain_initiator_user_id" target="_blank"
                                   class="btn-sm badge-primary" data-toggle="tooltip" title="Повідомлення ініціатору"
                                   style=" margin-left: 5px;"><i class="fas fa-envelope"></i></a>


                                <a v-if="complaint.complain_initiator_user === name"
                                   :href="'/send/user/'+complaint.object_user.id" target="_blank"
                                   class="btn-sm badge-danger" data-toggle="tooltip" title="Повідомлення об'єкту скарги"
                                   style=" margin-left: 5px;"><i class="fas fa-envelope"></i></a>


                                <button v-if="complaint.answer == null && complaint.complain_initiator_user === name"
                                        v-on:click="delete_complaint(complaint.id)" class="btn-sm btn-danger"
                                        style="margin-right: 5px;  margin-left: 5px;"><i class="fas fa-trash"></i>
                                </button>
                                <a v-else
                                   :href="'/complain/answer/'+complaint.answer.id" target="_blank"
                                   class="btn-sm badge-primary"
                                   style=" margin-left: 5px; text-decoration: none;">Відповідь</a>

                            </div>
                        </div>
                    </div>
                </div>
                <!--complain_options === 'Вирішення скарг' && a-->

                <div
                        v-if="auth.role === 'Адміністратор'" v-for="complaint in  sort_date(for_desicion)"
                        class="col-lg-12  input-group justify-content-around"
                        style="margin-bottom: 5px;">
                    <!--     <p>  {{complaint}} </p> -->
                    <!--   <p>{{(complaint.complain_initiator_user === auth.name && complain_options === 'Мої Скарги')}}</p>
                                       <p>{{(complaint.complain_initiator_user !== auth.name && complain_options === 'На мене')}}</p> -->
                    <div class="card" style="width: 50vw">
                        <div class="card-body  shadow-lg">

                            <p class="card-text">
                                <!--   {{complaint}} -->
                                {{complaint.complain_text}}
                                <!--    {{complaint.answer}} -->
                            </p>
                            <div>
                            </div>


                            <div class="d-flex justify-content-end">

                                <a class="text badge badge-primary"
                                   style="height: 20px;margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{
                                    complaint.complain_initiator_user}}</a>

                                <a class="text badge badge-danger"
                                   style="height: 20px;margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{
                                    complaint.object_user.name}}</a>


                                <a class="text badge badge-primary"
                                   style="height: 20px;margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{
                                    complaint.created_time|datify }}</a>

                                <a v-if="complaint.answer !== null" class="text badge badge-primary"
                                   style="height: 20px;margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{
                                    complaint.answer.approve_complain ? 'Погоджена': 'Відхилена'}}</a>

                            </div>
                            <div class="d-flex justify-content-end">
                                <a v-if="complaint.content_type === 'proposals' "
                                   :href="'/proposals/'+ complaint.object_id +'/details/'" target="_blank"
                                   class="btn-sm btn-primary"
                                   style="margin-right: 5px;  margin-left: 5px;">Пропозиція скарги
                                </a>


                                <a
                                        :href="'/send/user/'+complaint.complain_initiator_user_id" target="_blank"
                                        class="btn-sm badge-primary" data-toggle="tooltip"
                                        title="Повідомлення ініціатору"
                                        style=" margin-left: 5px;"><i class="fas fa-envelope"></i></a>


                                <a
                                        :href="'/send/user/'+complaint.object_user.id" target="_blank"
                                        class="btn-sm badge-danger" data-toggle="tooltip"
                                        title="Повідомлення об'єкту скарги"
                                        style=" margin-left: 5px;"><i class="fas fa-envelope"></i></a>


                                <a v-if="complaint.answer === null"
                                   :href="'/answer/'+complaint.content_type+'/compaint/'+complaint.id" target="_blank"
                                   class="btn-sm badge-primary"
                                   style=" margin-left: 5px;">Відповісти</a>
                                <a v-else
                                   :href="'/complain/answer/'+complaint.answer.id" target="_blank"
                                   class="btn-sm badge-primary"
                                   style=" margin-left: 5px;">Відповідь</a>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <!--    <div v-if="complain_options === 'Скарги на мене' ">

                    <div v-for="user in  users" class="input-group justify-content-around"
                         style="margin-bottom: 5px;">
                        <div class="card w-75">
                            <div class="card-body ">
                                <h5 class="card-title">{{user.name}}</h5>
                                <p class="card-text">

                                    {{user.description}}
                                </p>
                                <div>
                                </div>

                                <div class="d-flex justify-content-end">
                                    <button v-on:click="write(user.name)" class="btn-sm btn-primary"
                                            style="margin-right: 5px;  margin-left: 5px;">Написати
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>-->

            <div v-if="complain_options ===  'Вирішення скарг' ">

            </div>
        </div>
    </div>
</template>

<script>
    import current_host from "../get_api_host.js"

    var moment = require("moment")
    import $ from "jquery"
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    //     import make_donate from "../proposals/donates/make_donate.vue"
    export default {
        name: "donates",
        //     components: {make_donate},
        filters: {
            datify(d) {
                //     alert(moment(JSON.stringify(d).substring(1,JSON.stringify(d).length-1)).utc().format('YYYY-MM-DD-HH'))
                return moment(JSON.stringify(d).substring(1, JSON.stringify(d).length - 1)).add(3, 'hours').utc().format('YYYY-MM-DD HH:mm');
                //alue-format="YYYY-MM-DD hh:mm:ss"
            },
        },
        data() {
            return {

                auth: {
                    role: localStorage.getItem("role"),
                    id: parseInt(localStorage.getItem("id")),
                    token: localStorage.getItem("token"),
                    name: localStorage.getItem("name"),
                },
                status: localStorage.getItem("status"),
                name: localStorage.getItem("name"),
                complain_options: "Мої Скарги",
                related_complaints: [],
                for_desicion: [],
                loaded: false,
            }
        },

        methods: {
            sort_date(el){return   el.sort(function(a,b){
  return new Date(b.created_time) - new Date(a.created_time);
});
       // return el;
            },
            filter_comp(c) {
                if (c.complain_initiator_user === this.name && this.complain_options === "Мої Скарги") {
                    return true;
                }
                if (c.complain_initiator_user !== this.name && this.complain_options === "На мене") {
                    return true
                }
                if (c.complain_initiator_user !== this.name && this.complain_options === this.auth.role === "Адміністратор") {
                    return true
                }
                return false
            },
            filter_complaints(complains) {
                //    alert(JSON.stringify(complains))
                //  alert(typeof complains )
                if (typeof complains === undefined)
                    return []
                return complains.filter(c => this.filter_comp(c))
            },
            get_complains_available_for_desicion() {
                //alert(2)
                //  alert(JSON.stringify())
                //    alert(this.auth.role === "Адміністратор")
                if (this.auth.role === "Адміністратор") {
                    var self = this;
                    $.get({ //http://127.0.0.1:8000
                        url: current_host + "/get/complains/for-desicion/" + parseInt(localStorage.getItem("id")),
                        async: true,
                        success: function (data) {
                            //  alert(JSON.stringify(data))
                            //     alert(4)
                            //  alert(JSON.stringify(data))
                            // self.related_complaints = data.result;
                            self.for_desicion = data.result;
                            self.loaded = true;
                            //  alert(JSON.stringify( self.related_complaints))
                            //  window.location = "/complains";
                        },
                        error: function (e) {
                            //   alert(JSON.stringify(data))
                            // alert(2)
                            //alert("e")
                            // alert(3)
                        }
                    })
                }
            },

            get_my_complains() {
                // alert(2)
                if (this.auth.role === "Адміністратор")
                    return;
                var self = this;
                $.get({ //http://127.0.0.1:8000
                    url: current_host + "/get/complains/" + parseInt(localStorage.getItem("id")),
                    async: true,
                    success: function (data) {
                        //    alert(JSON.stringify(data))
                        //  alert(4)
                        //   alert(JSON.stringify(data))
                        self.related_complaints = JSON.parse(JSON.stringify(data.result));
                        //   alert(JSON.stringify(    self.related_complaints))
                        self.complain_options = "Мої Скарги";
                        self.loaded = true;
                        //  alert(JSON.stringify( self.related_complaints))
                        //  window.location = "/complains";
                    },
                    error: function (e) {
                        // alert(2)
                        //    alert("e")
                        // alert(3)
                    }
                })
            },
            delete_complaint(id) {
                var self = this;
                $.post({ //http://127.0.0.1:8000
                    url: current_host + "/delete/complain/" + id,
                    async: true,
                    success: function (data) {
                        //  alert(JSON.stringify(data))
                        //  alert(data)
                        //   alert(JSON.stringify(self.related_complaints))
                        self.related_complaints = self.related_complaints.filter(c => c.id !== id)
                        //       alert(JSON.stringify(self.related_complaints))
                        // alert(JSON.stringify( self.related_complaints ))
                        //  window.location = "/complains";
                    },
                    error: function (e) {
                        //  alert("e");
                    }
                })
            }
        },
        mounted() {

            this.complain_options = this.auth.role === "Адміністратор" ? "Вирішення скарг" : 'Мої Скарги';

            this.get_complains_available_for_desicion()
            this.get_my_complains();

        },

    }
</script>

<style scoped>

</style>