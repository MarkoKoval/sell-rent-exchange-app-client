<template>
    <div>


        <div  class="row">
            <div v-for="monitor in monitors" class="col-sm-12 d-flex justify-content-around"
                 style="margin-bottom: 5px;">
                <div class="card w-75  containerq">
                    <div class="card-body ">
                        <p class="card-text">

                        {{monitor.description | restrict(50)}}
                        </p>
                         <div class="row">
                        <a href="#" class="badge badge-primary" style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{ monitor.category}}</a>
                             <a href="#" class="badge badge-primary" style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{ monitor.creation_time}}</a>

                         </div>

                        <div class="row">

                        <div v-for="tag in monitor.search_tags">

                    <a href="#" class="badge badge-success" style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{tag}}</a>

                        </div>
                            </div>


                        <div class="d-flex justify-content-end">

                               <b-form-checkbox  v-model="monitor.active" v-on:change="activate( monitor.id)" style="margin-left: 5px; margin-right: 5px;">
                </b-form-checkbox>
                                  <p v-if="monitor.active===true">деактивувати </p>
                            <p v-else>активувати</p>

                            <button href="#" class="btn-sm btn-primary" style="margin-right: 5px;  margin-left: 5px;">Переглянути пропозиції</button>
                            <button href="#" class="btn-sm btn-primary" style="margin-right: 5px;  margin-left: 5px;">Видалити</button>
                      <!--       <a :href="'/proposals/details/'+proposal.user+'/'+proposal.title" target="_blank" class="btn-sm btn-primary" style="margin-right: 5px;  margin-left: 5px;">Деталі</a>
                            <button v-on:click="edit(proposal)" class="btn-sm btn-primary" style="margin-right: 5px;  margin-left: 5px;">Редагувати</button> -->
                            <!--<button v-on:click="edit1(i.n)" class="btn btn-primary"
                                    style="margin-right: 5px;  margin-left: 5px;">Edit
                            </button> -->
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div  v-if="edit_proposal">

            <edit_proposal v-on:go_back="back" :edit_values ="to_edit" ></edit_proposal>
        </div>
    </div>
</template>
<style>


</style>
<script>



// Using callback

import $ from "jquery"

    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    export default {
        name: "created_monitors",
        components: {},
        filters: {
            restrict: function (value, arg) {
                return value.length > arg ? value.substring(0, arg) + "...." : value
            },
        },
        data(){
            return {
                edit_proposal: false,
                to_edit: null,
             monitors: [
                    {
                        id: 0,
                        description:"yrthtrhtrhtrhtrhrthtrhrhrhrh",
                         category: "erherhrer",
                         search_tags: ["tagas", "the"],
                        proposal_item_type: "Товари",
                        creation_time: "2020",
                        active: false,
                    },
                       {
                        id: 1,
                        description:"yrthtrhtrhtrhtrhrthtrhrhrhrh",
                         category: "erherhrer",
                         search_tags: ["tagas", "the"],
                        proposal_item_type: "Товари",
                        creation_time: "2020",
                        active: false,
                    },
                       {
                        id:2,
                        description:"yrthtrhtrhtrhtrhrthtrhrhrhrh",
                         category: "erherhrer",
                         search_tags: ["tagas", "the"],
                        proposal_item_type: "Товари",
                        creation_time: "2020",
                        active: true,
                    },
                    {
                        id: 3,
                        description:"yrthtrhtrhtrhtrhrthtrhrhrhrh",
                         category: "erherhrer",
                         search_tags: ["tagas", "the"],
                        proposal_item_type: "Товари",
                        creation_time: "2020",
                        active: false,
                    },
                ]
            }
        },
        created() {
//42.6016209,29.0210111
  // outputs "Buckingham Palace"


            this.a();

        },
        methods: {
            back(){
            //    this.edit_proposal =false;
               // alert( JSON.stringify(this.created_proposals_));
            },
            edit(e){

             //   this.to_edit = e;
             //    this.edit_proposal = true;

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


            },
            activate(id){
                  var m =  this.monitors.find(m => m.id === id);
                if (!m.active){
                    for (var i = 0; i <  this.monitors.length; i++){
                        if(i !== id){
                            this.monitors[i].active = false;
                        }
                        else{
                                                        this.monitors[i].active = true;
                        }
                    }
                }

}
        }
    }
</script>

<style scoped>

</style>