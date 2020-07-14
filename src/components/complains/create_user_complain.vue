
<template>
    <div>

        <form @submit="create_complain">
            <div class="d-flex justify-content-center" style="margin-top: 10px;">
                <div class="card w-50">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <h4>Створення скарги</h4>
                                <hr>
                            </div>
                        </div>
                        <b-form-textarea required
                                         minlength="10" maxlength="1000" rows="6" class="form-control" required
                                 v-model="title"        placeholder="Введіть опис скарги"></b-form-textarea>


                              <div class="row d-flex justify-content-end ">

                                            <b-button  style="margin-top: 5px;" type="submit"  class="btn btn-danger">Створити
                                            </b-button>

                                    </div>

                    </div>
                </div>
                <!--     <input type="submit" value="Submit" /> -->


            </div>
            <!--<input required v-model="personeelsnummer" type="text" name="personeelsnummer" placeholder="personeelsnummer"/>&nbsp; -->
        </form>


    </div>
</template>

<script>
       import current_host from "../get_api_host.js"
    import $ from "jquery"
        import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    export default {
        name: "create_user_complain",
        data(){
            return {
                title:"Дії користувача не відповідають правам спільноти"
            }
        },
        mounted(){
        //alert(1);
        },
        methods: {
            create_complain(e){
             //   alert(5)
              e.preventDefault();
             //  alert(6)
              /*
              complain_text = data["text"],
                                           complain_initiator_user_id = data["user_id"],
                                            object_id = data["object_id"],
              */
              var self = this;
                      $.post({
                          async: true, //http://127.0.0.1:8000
                          url:  current_host + "/user/"+self.$route.params.id+"/create/complaint",
                          data: {info: JSON.stringify({
                                  text:self.title, user_id: parseInt(localStorage.getItem("id")),

                              })},
                          dataType: "json",
                          success: function (data) {
                             //alert(1)
                            //  alert(data)
                              window.location = "/complains";
                          },
                          error: function (err) {
                           // alert(2)
                           //  alert(JSON.stringify(e))
                          }

                      });
            }
        }
    }
</script>

<style scoped>

</style>