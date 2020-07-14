<template>
    <div>
        <div>


            <br>

            <form @submit="sub">
                <div class="d-flex justify-content-center">
                    <div class="card" style="width: 500px;">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <!-- {{data.role}-->
                                    <h4>Користувач {{data.role}}</h4>
                                    <hr>
                                </div>
                            </div>

                            <div class="row col-12" style="margin: auto">
                                <div class="col-md-12 ">
                                    <p>{{data.name}}</p>
                                    <p>{{data.email}}</p>

                                    <div class="form-group row">
                                        <div class="col-12">
                                            <input v-if="location !== null" style="width: 400px;  height:40px; "
                                                   type="text" class="form-control"
                                                   :value="location.str_description" disabled>
                                            <input v-else style="width: 400px;  height:40px; " type="text"
                                                   class="form-control"
                                                   :value="'Локацію не встановлено'" disabled>

                                        </div>

                                    </div>

                                    <div class="form-group row">
                                        <div class="col-12">
                                            <b-form-checkbox v-model="update_location"
                                                             style="margin-left: 5px; margin-right: 5px;">Встановити
                                                локацію
                                            </b-form-checkbox>


                                            <!-- <p> lat":49.78048815079489,"long":23.639874458312992,{{ data.location === undefined}}</p> -->
                                            <div v-if="location">
                                                <loc v-if="update_location" :location_lat="location.lat"
                                                     :location_lng="location.long" v-on:update-item="onUpdateItem"
                                                     v-on:close-map="setA"/>
                                            </div>
                                            <div v-else>
                                                <loc v-if="update_location" :location_lat="49.78048815079489"
                                                     :location_lng="23.639874458312992" v-on:update-item="onUpdateItem"
                                                     v-on:close-map="setA"/>
                                            </div>
                                            <!--   <loc v-if="update_location"   :a="location" v-on:update-item="onUpdateItem"
                                                    v-on:close-map="setA"/> -->
                                        </div>


                                    </div>


                                    <textarea required
                                              style="width: 400px; white-space: pre-line;white-space: pre-wrap;"
                                              id="publicinfo" name="publicinfo"
                                              rows="4" class="form-control" pattern="\s?(\S+\s?)*"
                                              v-model="data.self_description"
                                              placeholder="Введіть опис"></textarea>


                                    <div class="row d-flex justify-content-center">

                                        <!--  <p>{{update_location}}</p> -->
                                        <!--      <p>{{ data.location.str_description}} - {{ data.location.long}} - {{ data.location.lat}}</p>
                                              <p> {{location_name}}</p>
                                          <p>{{data_}}</p>
                                          <p>{{data}}</p>
                                          <p>{{location}}</p>-->
                                        <!--    <p>{{data}}</p><p>{{location}}</p> -->
                                        <button type="submit" class="btn btn-primary" style="margin-top: 5px;">Оновити
                                        </button>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </form>
        </div>
        <!--    <loc :a="location"  v-on:update-item="onUpdateItem"/>-->
    </div>
</template>
<style>

</style>
<script>
 import current_host from "../get_api_host.js"
    import L from "leaflet"
    import loc from "../location_user/loc.vue";
    import proposals from "../proposals/proposals.vue"
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import $ from "jquery"
    import Swal from 'sweetalert2/dist/sweetalert2.js'
    import 'sweetalert2/dist/sweetalert2.css'
    import current_auth from "../get_current_auth.js"

    export default {
        name: "profile",
        components: {Swal, loc, proposals},
        watch: {
            location: {
                handler: function (e) {
                    // alert(JSON.stringify(e))
                    /*  if (e !== null){
                 //  alert(JSON.stringify(e));
                    var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://us1.locationiq.com/v1/reverse.php?key=eb08ae2706974a&lat=" + e.lat + "&lon=" + e.long + "&format=json",
                        "method": "GET"
                    }
                    var self = this;
                    this.location.lat = e.lat;
                    this.location.long = e.long;
                    $.ajax(settings).done(function (response) {
                    //    alert(response.display_name);
                        self.location.str_description = response.display_name;
                    });
                }},       deep: true,*/
                }
            }
        },
        data() {
            return {
                data: null,
                data_: null,
                auth: {
                    id: localStorage.getItem("id"),
                    token: localStorage.getItem("token"),
                },
                description: "",
                location_name: '',
                update_location: false,
                username: 'John',
                email: 'a@gmail.com',
                //  bio: '',
                location: {
                    lat: null,
                    long: null,
                    str_description: "",
                }
                /** websiteUrl: '',
                 notification: {
                    message: '',
                    type: ''
                }*/
            }
        },
        mounted() {
            //   alert(1)
            //  alert(JSON.stringify( this.auth));
            this.auth = current_auth.get_current_auth();
            //   alert(JSON.stringify( this.auth));
            var self = this;

            $.get({
                async: false,
                url: /*"http://127.0.0.1:8000" */  current_host+"/get_profile/",
                data: self.auth,
                dataType: "json",
                success: function (data) {
                    // alert(JSON.stringify(data))
                    //  alert("S " +JSON.stringify(data))
                    //  alert(typeof data)
                    //       alert(JSON.stringify(data))
                    self.data = data.info;
                    //alert(JSON.stringify( self.data));
                    //  self.update_location = data.info.location !== null;
                    self.location = data.info.location;
                    // alert(typeof data);
                    //     alert(JSON.stringify(data));

                },
                error: function (e) {
                  //  alert(JSON.stringify(e))
                    //  alert(JSON.stringify(e));
                    //    alert(1)
                    //  alert("E " +JSON.stringify(e));

                    /*  Swal.fire({
                        icon: 'info',
                        title: 'Oops...',
                        text: e.responseJSON.response,
                    });*/
                }
            });
        },
        methods: {
            onUpdateItem(e, description) {
                //  alert("fggr");
                //     alert(JSON.stringify(e));
                this.location = {lat: e.lat, long: e.lng, str_description: description};
                //   alert(e);

                //   this.location = e;
                this.update_location = true;
            },
            //   isSelected: function (i) {
            //       return i === this.selected
            //   },
            setA() {
                this.update_location = false;
            },
            sub(e) {
                e.preventDefault();
                var self = this;
                //    alert(1)
                $.post({
                    async: false,
                    url: /*"http://127.0.0.1:8000"*/  current_host + "/edit_profile/",
                    data: {
                        "location": self.update_location ? JSON.stringify(self.location) : null,
                        "description": self.data.self_description,
                        "id": self.auth.id
                    },
                    dataType: "json",
                    success: function (data) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Оновленно',
                            text: 'Дані оновлено',
                        });
                        // alert("sF "+JSON.stringify(data))
                        // alert(typeof data);
                        //  alert(JSON.stringify(data));

                    },
                    error: function (e) {
                       // alert("err")
                        //        alert("eFFr"+JSON.stringify(e))

                        //    alert(JSON.stringify(e));

                        /*  Swal.fire({
							icon: 'info',
							title: 'Oops...',
							text: e.responseJSON.response,
						});*/
                    }
                });
                // alert(1);
            },
        },

        UpdateLocation() {
            //  alert("ff");
            this.update_location = true;
        },
        changeStyle(e) {
            alert(e);
        }
    }
</script>

<style scoped>

</style>