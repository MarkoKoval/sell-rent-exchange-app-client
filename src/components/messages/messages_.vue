
<template>
    <div  v-if="auth.token">
          <div class="d-flex justify-content-center" style="margin-top: 25px">
            <div style="width: 75vh;">
                <vue-bootstrap-typeahead
                        v-model="query"
                        :data="search_params === 'імя' ? res.filter(d => !!d):
                         search_params ===    'локація'? locations.filter(d => !!d):
                        description.filter(d => !!d) "
                        :minMatchingChars="1"
                        :maxMatches="100"
                        :placeholder="search_params"

                />
            </div>
        </div>
   <div v-if="auth.token">


       <!--<p>{{$route.params.name === undefined}} </p> -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">


      <div  v-if="!send"  >

           <div class="d-flex justify-content-center" style="margin-top: 5px">
                                <b-form-radio-group v-model="search_params">

                                    <b-form-radio name="called_items" value="імя"
                                                  style="margin-right: 10px;">По імені
                                    </b-form-radio>
                                    <b-form-radio  name="called_items" value="опис"
                                                  style="margin-right: 10px;">По опису
                                    </b-form-radio>
                                   <b-form-radio    name="called_items" value="локація"
                                                  style="margin-right: 10px;">По локації
                                    </b-form-radio>
                                </b-form-radio-group>

                            </div>
 <div class="row" style="margin-top: 20px;">
 </div >
          <div v-for="user in  user_filter(users)" class="input-group justify-content-around"
               style="margin-bottom: 5px;">

              <div class="card w-50">
                  <div class="card-body shadow-lg ">
                      <h5 class="card-title">{{user.name}}</h5>
                     <p class="card-text">

                          {{user.self_description|restrict(100)}}
                      </p>

                      <div class="row">
                          <div class="badge badge-primary borders "> {{user.email}}</div>
                          <div class="badge badge-primary borders"> {{user.role}}</div>
                          <div class="badge badge-primary borders">{{ user.is_blocked_by_admin ? 'заблокований': ''}}</div>

                          <div v-if="user.location"  style="cursor: pointer" data-toggle="tooltip" data-placement="left" :title="user.location.str_description"  class="badge badge-primary block-badge borders"> {{user.location.str_description|restrict(50)}}</div>


                      </div>

                      <div class="d-flex justify-content-end">
<!--<p>{{user}}</p> -->
                                   <div class="custom-control custom-checkbox">
                          <input   v-model="user.is_blocked_by_admin"  v-if="auth.role === 'Адміністратор' " v-on:change="block(user.id, user.is_blocked_by_admin )" type="checkbox" class="custom-control-input" :id="'block'+ user.id">
    <label   v-if="auth.role === 'Адміністратор'" class="custom-control-label" style="margin-right: 5px;" :for="'block'+ user.id">{{ user.is_blocked_by_admin ? 'Розблокувати': 'Заблокувати'}}</label>
                                   </div>
                          <div class="custom-control custom-checkbox">

    <input  v-model="user.role === 'Віп'"   v-if="auth.role === 'Адміністратор' " v-on:change="change_status(user.id,user.role )" type="checkbox" class="custom-control-input" :id="'status'+ user.id">
    <label   v-if="auth.role === 'Адміністратор'" class="custom-control-label" style="margin-right: 5px;" :for="'status'+ user.id">{{user.role}}</label>
</div>
                          <a :href="'/send/user/'+user.id" target="_blank" class="btn-sm btn-primary"
                    style="cursor: pointer; height: 25px; margin-left: 1px;  color:white;"><i class="fas fa-envelope"></i>
            </a>
                          <!--/users/:id/create/complaint-->
                          <a  v-if="auth.role !== 'Адміністратор' && user.role !== 'Адміністратор' " :href="'/users/'+user.id+'/create/complaint'" target="_blank" class="btn-sm btn-danger"
                    style="cursor: pointer; height: 25px; margin-left: 5px;  color:white;text-decoration: none;">Поскаржитись
            </a>

                      </div>
                  </div>
              </div>
          </div>




    </div>

       <!--
    <div  v-if="send || $rou" class="col-sm-12">
        <button class="btn-sm btn-primary" v-on:click="back">Назад</button>

        <send_messages :write_to="write_to" :write_to_id="write_to_id"></send_messages>


    </div>-->
</div>
    </div>
</template>
<style>
    .c{
        width: 82vh;
          height:100vw;
    overflow: auto;
max-height: 90vh;
    max-width: 70vw;

overflow-x: hidden;
    }
   .c::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  background-color: #F5F5F5;
}

.c::-webkit-scrollbar
{
  width: 10px;
  background-color: #F5F5F5;
}

.c::-webkit-scrollbar-thumb
{
  background-color: #000000;
  border: 2px solid #555555;
}
</style>
<script>
        import current_host from "../get_api_host.js"

    import send_messages from "./send_messages.vue"
 import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

import $ from "jquery"
import current_auth from "../get_current_auth.js"
export default {
        name: "messages",
        components: { send_messages },
    filters: {
            restrict(value,arg=50){
                //alert(value);
                return value === undefined? "":  value.length > arg ? value.substring(0, arg) + "...." : value

            }
    },

        data(){

            return {
                description: [],
                 data: [],
                auth: {
                    role: localStorage.getItem("role"),
                    id: parseInt(localStorage.getItem("id")),
                    token: localStorage.getItem("token"),
                    name: localStorage.getItem("name"),
                },
                search_params: "імя",
                res : [],

                query: '',
                search_name: '',
                users: [],
                messages: [],
                send: false,
                write_to: "",
                write_to_id: 0
            }
        },

        mounted(){
                 this.get_data();
        },
        methods: {
            block(id, is_blocked_by_admin ){
                this.auth = current_auth.get_current_auth();
                 $.post({
                      url: /*"http://127.0.0.1:8000"*/  current_host+"/change/block-status/users/"+id,
                        data: { auth:JSON.stringify(self.auth) },
                      dataType: "json",
                      success: function (data) {
                     //     alert("suc")
                      }
                 })
            },
            change_status(id, role) {
             //   alert(11);
               this.auth = current_auth.get_current_auth();
                // alert(131);
                /*alert(id);
                alert(role);*/
                //    alert( localStorage.getItem("token"));
                var self = this;
                for (var i = 0; i < self.users.length; i++) {if (self.users[i].id === id) {
                                    self.users[i].role = role === "Звичайний" ? "Віп" : "Звичайний";
                                    break}
                }
                $.ajax({
                        async: true,
                        url: /*"http://127.0.0.1:8000"*/ current_host+  "/change/role/user/"+id,
                        data: { auth:JSON.stringify(self.auth) },
                        dataType: "json",
                        method: "POST",
                        success: function (data) {
                         //  ; alert(JSON.stringify(data))
                          /* for (var i = 0; i < self.users.length; i++) {
                                if (self.users[i].id === id) {
                                //    alert(this.users[i].role)
                                    self.users[i].role = role === "Звичайний" ? "Віп" : "Звичайний";
                                  //    alert(self.users[i].role)
                                    break
                                }
                            }*/
                        },
                        error: function (e) {
                            alert(JSON.stringify(e))
                        }

                    })
            },
             user_filter(arr){
                 if (this.query.length === 0)
                     return arr;
                 var res = [];
                 if (this.search_params === "імя") {
                     for (let i = 0; i < arr.length; i++) {
                         //  alert(11)
                         if (arr[i].name.toLowerCase().includes(this.query.toLowerCase()))
                         //   alert(12)
                             res.push(arr[i]);
                     }
                  //   alert(JSON.stringify(res))
                 }
                 else if (this.search_params === "локація"){
                      for (let i = 0; i < arr.length; i++) {
                         //  alert(11)
                          if(arr[i].location !== null) {
                              if (arr[i].location.str_description.toLowerCase().includes(this.query.toLowerCase())) {
                                  //   alert(12)
                                  res.push(arr[i]);
                              }
                          }
                     }
                 }
                 else {
                     for (let i = 0; i < arr.length; i++) {
                         //  alert(11)
                         if (arr[i].description.toLowerCase().includes(this.query.toLowerCase()))
                         //   alert(12)
                             res.push(arr[i]);
                     }
                 }

               //  alert(JSON.stringify(res))
                 return res
            },
           get_data(){
               //alert(1)
                var self = this;
                    $.ajax({
                    async: true,
                    url: /*"http://127.0.0.1:8000"*/ current_host + "/users/",
                    data:{ except: localStorage.getItem("id")},
                    dataType: "json",
                    method:"GET",
                    success: function (data) {
                  //   alert(JSON.stringify(data));
                        self.users = data.users;
                        self.res = self.users.map(u => u.name)
                        self.description = Array.from(new Set(self.users.map(u => u.self_description)))
                        self.locations =  Array.from(new Set(self.users.filter(u => u.location !== null).map(u => u.location.str_description)))
                            //  self.description.push("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    },
                    error: function (e) {
                    }
                });
            },
            write(name,id){
                this.send = true;
                this.write_to = name;
                                this.write_to_id = id;

            },
            back(){
                this.send = false;
            }
        },
    }
</script>

<style scoped>

</style>

