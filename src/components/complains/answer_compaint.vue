<template>
    <div>
<!--<p>{{info}}</p> -->
        <form @submit="answer_complain">
            <!--<p>{{auth}}</p>-->

            <div class="d-flex justify-content-center" style="margin-top: 10px;">


                <div class="card w-50">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <h4>Відповідь на скаргу</h4>
                                <hr>
                            </div>
                        </div>

                        <b-form-group>
                            <div class="d-flex justify-content-center">
                                <b-form-radio-group v-on:change="approve_change" v-model="info.approve">

                                    <b-form-radio name="approve" :value="true"
                                                  style="margin-right: 10px;">Погодити
                                    </b-form-radio>

                                    <b-form-radio name="approve" :value="false"
                                                  style="margin-right: 10px;">Відхилити
                                    </b-form-radio>

                                </b-form-radio-group>

                            </div>
                        </b-form-group>

                        <b-form-textarea required
                                         minlength="10" maxlength="1000" rows="6" class="form-control" required
                                         v-model="info.title" placeholder="Введіть відповідь на скаргу"></b-form-textarea>


                        <div class="row d-flex justify-content-end ">

                            <b-button style="margin-top: 5px; margin-right: 15px" type="submit" class="btn btn-danger">Відповісти
                            </b-button>

                        </div>

                    </div>
                </div>

            </div>
        </form>


    </div>
</template>

<script>
 // import datetime_picker from "./datetime.vue"

    import $ from "jquery"
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import current_auth from "../get_current_auth.js"
  import current_host from "../get_api_host.js"
    export default {
        name: "answer_compaint",
        components: {},

        data() {
            return {
              auth:{
              /*     id: parseInt(	localStorage.getItem("id")),
				name:		localStorage.getItem("name"),
                     token:  localStorage.getItem("token"),
                        role: localStorage.getItem("role")*/
                },
               info: {
type:this.$route.params.type,
                   deadline: null,
                   title: "Ні все добре",
                   approve: false,
                   sanction: this.$route.params.type === "proposals" ?
                       "Заблокувати пропозицію" : 'Заблокувати користувача',
               },
               sanctions: this.$route.params.type === "proposals"?
                [ 'Заблокувати користувача і пропозицію',
                    "Заблокувати пропозицію"]: [ 'Заблокувати користувача'] ,
            }
        },
        mounted() {
          //  alert(1);
           this.auth =  current_auth.get_current_auth()

        },
        methods: {
            approve_change(e){
           //alert(this.info.approve)
               //     alert(  this.title)
                              this.info.title =  this.info.approve === false ? "Будем розбиратись":"Ні все добре";
            //    alert(  this.title)
            },
            date_changed(e){
                this.info.deadline = e;

            },
            answer_complain(e) {
                //   alert(5)
                e.preventDefault();
                var self = this;
                $.post({
                    async: true, //http://127.0.0.1:8000
                    url: current_host   +"/answer/complaint/" + self.$route.params.id,
                    data: {
                        info: JSON.stringify(self.info),
                        auth: JSON.stringify(self.auth),
                    /* JSON.stringify({
                            text: self.title, user_id: parseInt(localStorage.getItem("id")),

                        }*/

                    },
                    dataType: "json",
                    success: function (data) {
                      //  alert(JSON.stringify(data))
                        //  alert(1)
                        //  alert(data)
                       window.location = "/complains";
                    },
                    error: function (err) {
                                      //          alert(JSON.stringify(err))
                    }

                });
            }
        }
    }
</script>

<style scoped>

</style>