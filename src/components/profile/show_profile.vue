<template>
    <div>
    <div class="d-flex justify-content-center">
	 	    <div class="card"  style="width: 50vw; margin-top: 5px;">
		        <div class="card-body">


                              <div class=" row">
                                                                  <div class="col-8">

                                  <p> {{$route.params.user}} </p>
                                                                            </div>
                              </div>
                              <div class=" row">

                                  <p> mark.koval.ua@gmail.com </p>
                              </div>
                              <div class=" row">
                                  <div v-html="description" v-linkified></div>

                              </div>
                           <!--     <div class="form-group row">
                                <div class="col-8">
                                    <input style="width: 400px;  height:40px; " type="text" class="form-control" value="Локацію не встановлено" disabled>
                                </div>

                                </div> -->

                                <div class="d-flex justify-content-end" style="margin-top: 5px;">
                                  <a  :href="'/send/'+ name_ +'/'+$route.params.user" target="_blank" class="btn btn-success">Написати</a>

                              </div>


		        </div>
		    </div>

</div>

    </div>
</template>

<script>
var linkify = require('linkifyjs');
        import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
    export default {
            filters: {},
        name: "show_profile",
        data(){
            return {
            description:
            "                                        https://getbootstrap.com/docs/4.4/components/badge/\n" +
            "                                          fregerger gergergr",
                name_ : "As",
                created(){
                $('p').linkify();
                }
            }
        }
    }
</script>

<style scoped>
div {
word-wrap: break-word
}
</style>