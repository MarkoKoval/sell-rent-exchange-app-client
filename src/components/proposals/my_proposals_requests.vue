<template>
    <div>
        <div class="row">
            <div v-for="request in  items_requests" class="col-sm-12 d-flex justify-content-around"
                 style="margin-bottom: 5px;">
                <div class="card w-75  containerq">
                    <div class="card-body ">
                        <h5 class="card-title">{{request.request_type}}</h5>
                        <p class="card-text">
                        {{request.request_message|restrict(50)}}
                        </p>


                       <div class="d-flex justify-content-end" style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">
                               {{request.request_time}}
                           </div>

                       <div class="d-flex justify-content-end">

                            <button v-on:click="delete_request(request.request_id)" class="btn-sm btn-danger" style="margin-right: 5px;  margin-left: 5px;">Скасувати</button>
                            <a :href="'/proposals/requests/'+request.request_id" target="_blank" class="btn-sm btn-primary" style="margin-right: 5px;  margin-left: 5px;">Деталі Запиту</a>
                         <!--   <button href="#" class="btn-sm btn-primary" style="margin-right: 5px;  margin-left: 5px;">Скасувати</button>
                             <a :href="'/proposals/details/'+proposal.user+'/'+proposal.title" target="_blank" class="btn-sm btn-primary" style="margin-right: 5px;  margin-left: 5px;">Деталі</a>
                         <button v-on:click="edit(proposal)" class="btn-sm btn-primary" style="margin-right: 5px;  margin-left: 5px;">Деталі</button> -->


                </div>

            </div>



    </div>
</div>
            </div>
            </div>
</template>
<style>


</style>
<script>



// Using callback

import $ from "jquery"


import edit_proposal from "./edit_proposal.vue"
    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    export default {
        name: "my_proposals_requests",
        components: { edit_proposal },
      filters:{  restrict: function (value,arg) {
    return value.length > 100 ? value.substring(0, 100) + "...." : value
  },
      },
        data(){
            return {

             items_requests: [
                    {
                        request_user_id: "",
                        request_type: "Продаж",
                        request_id: 0,
                        request_message: "Продаж Продаж Продаж Продаж Продаж Продаж Продаж Продаж Продаж",
                        request_time: "2020",
                        answered: false,
                    },

                ]
            }
        },
        created() {
//42.6016209,29.0210111
  // outputs "Buckingham Palace"


            this.a();

        },
        mounted(){
        //  alert('My_PROLPOS');
        },
        methods: {
            delete_request(id){

            },
            back(){
                this.edit_proposal =false;
             //   alert( JSON.stringify(this.created_proposals_));
            },
            edit(e){

                this.to_edit = e;
                 this.edit_proposal = true;

            },
            async a() {

  /*   var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://us1.locationiq.com/v1/reverse.php?key=eb08ae2706974a&lat=49.827106&lon=23.428710&format=json",
  "method": "GET"
}

$.ajax(settings).done(function (response) {
  alert(response.display_name);
});*/


            }

        }
    }
</script>

<style scoped>

</style>