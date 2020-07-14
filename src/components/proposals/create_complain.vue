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
                        <b-form-textarea required v-model="personeelsnummer"
                                         minlength="10" maxlength="1000" rows="6" class="form-control" required
                                         placeholder="Введіть опис скарги"></b-form-textarea>


                              <div class="row d-flex justify-content-end ">

                                            <b-button  style="margin-top: 5px;" type="submit"  @submit="create_complain" class="btn btn-success">Створити
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

        import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    export default {
        name: "create_complain",
        data(){
            return {
                title:""
            }
        },
        methods: {
            create_complain(e){
              e.preventDefault();
                      $.post({
                          async: true,
                          url:/* "http://127.0.0.1:8000"*/ current_host +"/create/complain",
                          data: {content: title, images_: JSON.stringify(self.images)},
                          dataType: "json",
                          success: function (data) {
                              window.location = "/proposals";
                          },

                      });
            }
        }
    }
</script>

<style scoped>

</style>

