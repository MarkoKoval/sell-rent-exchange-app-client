
<template>
    <div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet" media="screen" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <div  v-if="auth.token" class="comment-wrapper" v-bind:class="{ activete: isActive }" style="margin-top: 20px;      margin-left: 20vw; margin-right: 20vw;">

        <!--<p>{{write_to_id_}} {{current_user_id}} {{write_to}}</p> -->
            <div class="panel panel-info">

                <div class="panel-body">
                    <textarea class="form-control" v-model="message" :placeholder="'Надіслати повідомлення '+write_to_" rows="7"></textarea>
                    <br>
                    <button v-on:click="send_" type="button" class="btn-sm pull-right"><i class="fas fa-envelope"></i></button>
                    <div class="clearfix"></div>
                    <hr>
                    <div class="clearfix"></div>
                    <hr>
                    <ul  v-for="message in messages" class="media-list">
                        <li class="media">
                  <!--     <p>{{message}}</p>-->
                            <div class="media-body">
                              <!-- <p>{{message.user_sender_id}} - {{current_user_id}}</p> -->
                                  <strong v-if="message.user_sender_id === current_user_id" class="text-danger"> {{ name  }} </strong>
                                <strong v-else class="text-success"> {{ write_to_ }} </strong>



                                  <div v-html="message.message_text" v-linkified></div>
                                <span class="text-muted pull-right">
                                    <button v-if="message.user_sender_id === current_user_id"  class="btn" v-on:click="delete_message(message.id)"><i class="fa fa-trash"></i></button>

                                    <small class="text-muted">  {{message.time_send|datify}}</small>
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    <div>
        <h4 v-if="!auth.token" align="center" style="margin-top: 200px">Пройдіть авторизацію</h4>
    </div>
    </div>
</template>
<style>
.activate{
     margin-left: 30vw; margin-right: 30vw;
}
</style>
<script>
       import current_host from "../get_api_host.js"
    import current_auth from "../get_current_auth.js"
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
var moment = require("moment")
 import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
import "./send_message.css"
import $ from "jquery"
export default {
        name: "send_messages",
        components: {FontAwesomeIcon },
    mounted(){
       //     alert(1);
       if (this.auth !== {})
        this.get_messages();
    },

    filters: {
                datify(d) {
                //     alert(moment(JSON.stringify(d).substring(1,JSON.stringify(d).length-1)).utc().format('YYYY-MM-DD-HH'))
                return moment(JSON.stringify(d).substring(1, JSON.stringify(d).length - 1)).add(3, 'hours').utc().format('YYYY-MM-DD HH:mm:ss');
                //alue-format="YYYY-MM-DD hh:mm:ss"
            },
    },
    props: ["write_to", "write_to_id"],
        data(){
            return {
                auth: {},
                name: localStorage.getItem("name"),
                current_user_id: parseInt( localStorage.getItem("id")),
                write_to_id_: this.write_to_id || this.$route.params.receiver,
                write_to_: this.write_to || "" ,
                search_name: '',
                message: "Привіт",
                messages: [],
                send: false,
                write_to: "",
                isActive: this.$route.params.receiver !== undefined
            }
        },
    created(){
    this.auth = current_auth.get_current_auth()
    },
        methods: {
            get_messages(){
                  var self = this;
                    $.ajax({
                    async: true,
                    url:/* "http://127.0.0.1:8000" */ current_host+"/messages/",
                    data:{ sender: self.current_user_id, receiver: self.$route.params.receiver },
                    dataType: "json",
                    method:"GET",
                    success: function (data) {
                       // alert(JSON.stringify(data))
                     //   alert(data.receiver_name)
                        self.write_to_ = data.receiver_name
                      //      alert(2);
                     //   alert(JSON.stringify(data));
                        self.messages = data.messages;
                    },
                    error: function (e) {
                    //        alert(JSON.stringify(e));
                    }
                });
            },
            delete_message(id){
                var self = this;
                $.ajax({
                    async: true,
                    url:/* "http://127.0.0.1:8000/ */ current_host+"/delete/messages/"+id,
                   // data:{ sender:self.current_user_id, receiver: parseInt(self.write_to_id_), message_text: self.message },
                    dataType: "json",
                    method:"POST",
                    success: function (data) {
                        self.get_messages();
                    },
                    error: function (e) {
                    }
                });
            },
            send_(){

              var self = this;
                          //    alert( parseInt(localStorage.getItem("id")) + " "+ parseInt(self.write_to_id_) + " " +self.message);

                $.ajax({
                    async: true,
                    url:/* "http://127.0.0.1:8000" */ current_host+"/messages/",
                    data:{ sender:self.current_user_id, receiver: self.$route.params.receiver /*parseInt(self.write_to_id_)*/, message_text: self.message },
                    dataType: "json",
                    method:"POST",
                    success: function (data) {

                       // alert(JSON.stringify(data));
                     //   self.messages = data.messages;
                        self.get_messages();
                    },
                    error: function (e) {
                      //      alert(JSON.stringify(e));
                 //   alert("e"+JSON.stringify(e));

                        /*  Swal.fire({
							icon: 'info',
							title: 'Oops...',
							text: e.responseJSON.response,
						});*/
                    }
                });

            },
            write(e){
                this.send = true;
                this.write_to = e;
            },
            back(){
                this.send = false;
            }
        },
    }
</script>

<style scoped>

</style>