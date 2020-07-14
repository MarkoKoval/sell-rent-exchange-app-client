<template>
    <div>
     <b-form-group>
                            <div class="d-flex justify-content-center" style="margin-top: 20px">
                                <b-form-radio-group v-model="called_items">

                                    <b-form-radio name="called_items" value="Cтворення"
                                                  style="margin-right: 10px;">Cтворення
                                    </b-form-radio>
                                    <b-form-radio  name="called_items" value="Cтворені"
                                                  style="margin-right: 10px;">Cтворені
                                    </b-form-radio>
                                    <b-form-radio name="called_items" value="Запитувані"
                                                  style="margin-right: 10px;">Запитувані
                                    </b-form-radio>
                                      <b-form-radio name="called_items" value="Збережені"
                                                  style="margin-right: 10px;">Збережені
                                    </b-form-radio>
                                </b-form-radio-group>

                            </div>
         </b-form-group>
<!--
         <b-form-group>
                            <div class="d-flex justify-content-center" style="margin-top: 5px">
                                <b-form-radio-group v-model="requested">

                                    <b-form-radio name="requested" value="Мої"
                                                  style="margin-right: 10px;">Мною
                                    </b-form-radio>
                                    <b-form-radio  name="requested" value="Мені"
                                                  style="margin-right: 10px;">В мене
                                    </b-form-radio>
                                </b-form-radio-group>

                            </div>
         </b-form-group> -->

        <requests_related_to_me></requests_related_to_me>
       <!-- <div class="d-flex justify-content-center">
            <div  v-if="requested==='Мої'">

                    <my_requests></my_requests>

            </div>
              <div v-if="requested==='Мені'">
                    <p>Мені</p>
                <requests_to_me></requests_to_me>
            </div>
        </div> -->
    </div>
</template>

<script>
    import requests_related_to_me from "./requests_related_to_me.vue"
    import requests_to_me from  "./requests_to_me.vue"
    import my_requests from "./my_requests.vue"
    export default {
        name: "requsted_proposals",
        components: {requests_to_me,my_requests,requests_related_to_me},
          watch: {called_items: function (new_,old_) {
               //alert(new_);
              //  alert(old_);
                if(new_ !== old_){
                  //  alert(new_);
                    //alert(new_)
                     if(new_ === "Cтворені"){
                      window.location = "/proposals";
                    }
                    if(new_ === "Cтворення"){
                      window.location = "/proposals/create";
                    }
                  /*  else if(new_  === "Запитувані"){
                        window.location = '/proposals/requested';
                    }*/
                  else if(new_ === "Збережені"){
                    window.location = "/proposals/saved";
                    }
                }
            }},

        data(){
            return {
                requested: "Мої",
                called_items: "Запитувані",}}
    }
</script>

<style scoped>

</style>