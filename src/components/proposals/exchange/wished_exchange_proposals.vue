<template>
    <div>

 <!-- <p> {{wished_objects_description}} </p> -->
      <div class="row">
            <div v-for="el in  wished_objects_description" class="col-sm-12 d-flex justify-content-around"
                 style="margin-bottom: 5px; width: 100px; margin-top: 10px;">

                <div class="card w-50  shadow-lg">

                    <div class="card-body ">
                        <p class="card-text">
                            {{ el.query_description_text}}
                        </p>


                    <div class="row">
                             <a href="#"  v-if="el.category !== null"    style="margin-top: 5px; margin-right: 5px;  margin-left: 5px; height: 20px; " class="shadow-lg badge badge-primary">{{el.category.category}}/{{el.category.subcategory}}</a>
                             <a href="#"  v-if="el.proposal_item_type !== null"    style="margin-top: 5px; margin-right: 5px;  margin-left: 5px; height: 20px; " class="badge badge-primary">Чи товар чи послуга: {{ el.proposal_item_type}}</a>
                     <!--      <a href="#"  v-if="el.wished_proposal_type !== null"    style="margin-top: 5px; margin-right: 5px;  margin-left: 5px; height: 20px; " class="badge badge-primary">{{el.wished_proposal_type}}</a> -->


                           <div  v-if="el.query_description_tags !== null" v-for="e in el.query_description_tags">

                                <a href="#" class="badge badge-primary"
                                   style="margin-right: 5px;  margin-left: 5px; height: 20px; margin-bottom: 5px;">{{e.title}}</a>

                            </div>

                        </div>
                        <div class="d-flex justify-content-end">
                        <!--    <button v-on:click="deleter(el.wished_description)" class="btn btn-primary"
                                    style="margin-right: 5px;  margin-left: 5px;">Видалити
                            </button> -->

                        </div>
                    </div>

                </div>

            </div>
        </div>

    </div>
</template>

<script>
     import current_host from "../get_api_host.js"
    import $ from "jquery"
    export default {
        name: "wished_exchange_proposals",
        data(){
            return {
                wished_objects_description: [],
            }
        },
        mounted() {
        //    alert(2+"wished");
            var self = this;
             $.get({
                    async: true,
                    url: /*"http://127.0.0.1:8000" */ current_host+"/proposals/wished_objects/"+self.$route.params.id,
                    dataType: "json",
                    success: function (data) {
                  //      alert(JSON.stringify(data));
                       // self.created_proposals_ = data.proposals;
                      //  self.data = self.created_proposals_.map(x => x.title)
                     //   alert(JSON.stringify(data))
                        self.wished_objects_description = data.result;
                    },
                    error: function (data) {
                         //alert(JSON.stringify(data))
                       // alert(JSON.stringify(data));
                    }
                })
        },
    }
</script>

<style scoped>

</style>