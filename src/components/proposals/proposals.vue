<template>
    <div>
        <div v-if="auth.token">
            <b-form-group>
                <div class="d-flex justify-content-center" style="margin-top: 20px">
                    <b-form-radio-group v-model="called_items">
                        <!--  <p>{{auth.is_blocked_by_admin}}</p>
                          <p>{{auth}}</p>
                                 <p>{{typeof auth.is_blocked_by_admin}}</p>-->
                        <b-form-radio v-if="auth.is_blocked_by_admin === 'false' " name="called_items" value="Cтворення"
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

            <created_proposals v-if="called_items==='Cтворені'"></created_proposals>


        </div>

        <div v-if="!auth.token">
            <h4 align="center" style="margin-top: 200px"> Пройдіть авторизацію</h4>
        </div>
    </div>
</template>
<style>
    selected form {

    }

    .card-img-top {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .c {


        border: 1px black;
        border-radius: 10px;
        padding-bottom: 10px;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 10px;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    }

    <!--
    input[type=checkbox] {
        display: none;
    }

    .containerq img {

        transition: transform 0.15s ease;
        cursor: zoom-in;
    }

    input[type=checkbox]:hover ~ label > img {
        transform: scale(2);
        cursor: zoom-out;
    }

    .zoom:hover {
        zoom: 3;
    }

</style>
<script>
    import current_auth from "../get_current_auth.js"
    import proposals_requests_to_me_ from "./proposals_requests_to_me_.vue"
    import my_proposals_requests from "./my_proposals_requests.vue"
    import 'bootstrap/dist/css/bootstrap.min.css';
    import create_proposal from "./create_proposal.vue"
    import selectize_ from "../selectize_.vue"
    import tree_select2 from "../three_select/tree_select2.vue"
    import loc from "../location_user/loc.vue";
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import img_up from "../image_upload/image_upload.vue"
    //import  tag_search_select from  "../tag_search_select/tag_search_select.vue"
    import axios from "axios"
    import $ from "jquery"
    import created_proposals from "./created_proposals.vue"
    // import Monitoring from "../monitoring/monitoring";
    import monitoring_ from "./proposal_monitoring/monitoring.vue"
    import saved_proposals from "./saved_proposals.vue"

    export default {
        name: 'proposals',
        components: {
            proposals_requests_to_me_,
            saved_proposals,
            monitoring_,
            my_proposals_requests,
            img_up,
            loc,
            tree_select2,
            create_proposal,
            created_proposals
        },
        filters: {
            restict: function (value) {

                return value.length > 20 ? value.substring(0, 20) + "...." : value
            }
        },
        watch: {
            called_items: function (new_, old_) {
                //alert(new_);
                //  alert(old_);
                if (new_ !== old_) {
                    //  alert(new_);
                    //alert(new_)
                    if (new_ === "Cтворення") {
                        window.location = "/proposals/create";
                    } else if (new_ === "Запитувані") {
                        window.location = '/proposals/requested';
                    } else if (new_ === "Збережені") {
                        window.location = "/proposals/saved";
                    }
                }
            }
        },
        data() {
            return {
                auth: {
                    role: localStorage.getItem("role"),
                    id: parseInt(localStorage.getItem("id")),
                    token: localStorage.getItem("token"),
                    name: localStorage.getItem("name"),
                },
                called_items: "Cтворені",
                edit: false,
                to_edit: 0,
                arr: [],
                form: {
                    category: "",
                    add_images: false,
                    add_images2: false,
                    tabIndex: 2,
                    email: '',
                    name: 'grgeg',
                    food: null,
                    state: null,
                    checked: [],
                    images_files: null,
                    add_search_tags: false,
                    add_location: false,
                    currency: null,
                    rent_time: null,
                },
                rent_time: [{text: 'Одиниця часу оренди', value: null}, 'Хвилина', 'Година', 'День', 'Місяць', 'Рік'],
                currencies: [{text: 'Валюта', value: null}, 'Гривня', 'Dollar', 'Euro'],
                foods: [{text: 'Select One', value: null}, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
                state: [{text: "Виберіть стан", value: null}, "Новий", "Вживаний"],

                show: true
            }
        },

        created() {
            this.auth = current_auth.get_current_auth();
            // alert("12");
        },
        methods: {
            setA() {
                //     alert("c");
                this.form.add_location = false;
            },
            onUpdateItem(e) {
                //  alert(JSON.stringify( e));
                this.form.images_files = e;
            },
            onChange(e) {
                this.form.tabIndex = e;
            },
            selected(value) {
                alert(value);
            },
            upload() {

                var vm = this;


            },

            async up() {
                //   alert(31);
                await this.upload();
                // alert("i "+i);
                /*  $.when( this.upload()).done((e) => {
                      alert("done");
                      alert("e "+JSON.stringify(e));
                  });*/

                //   alert("w3");
                //  alert(JSON.stringify(this.form))

                // const res =  this.upload();
                //  alert("res "+JSON.stringify(res) );
            },
            edit1(e) {
                this.edit = !this.edit;
            },
            UpdateLocation(e) {
                // alert(JSON.stringify(e));
            },
            onSubmit(evt) {
                evt.preventDefault()
                // alert(JSON.stringify(this.form))

                // const res = this.upload();
                //   alert("res " + JSON.stringify(res));
            },
            Set_Category(e) {
                this.form.category = e;
            },
            onReset(evt) {
                evt.preventDefault()
                // Reset our form values
                this.form.email = ''
                this.form.name = ''
                this.form.food = null
                this.form.checked = []
                // Trick to reset/clear native browser form validation state
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            }
        }
    }
</script>
