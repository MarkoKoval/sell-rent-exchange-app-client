
<template>
    <div id="app">
<!--style="visibility: hidden;" -->
        <p>{{data}} - {{signature}} </p>
        <form  @submit="send" method="POST" action="https://www.liqpay.ua/api/3/checkout"
accept-charset="utf-8">
<input type="hidden" name="data" v-model="data"/>
<input type="hidden" name="signature" v-model="signature"/>
<input type="image"  formtarget ="blank_"  id="send"
src=/>
</form>



        <div id="liqpay_checkout"></div>



    </div>
</template>

<script>
 import current_host from "../get_api_host.js"
//import from "../g"
    /* eslint-disable */
    import $ from "jquery"

    export default {
        methods:{
            send(){
          //      alert("fewfwe");
            }
        },
        name: "make_donate",
        components: {},
        data(){
           return {  data:  null,
              signature:null,
           res: false,
           id: localStorage.getItem("id")}
        },
        created(){ /*alert("cr")*/},
        mounted() {

var s = this;
      $.get({
          async: false,
            url: /*"http://127.0.0.1:8000"  */ current_host+"/donate/"+s.id, dataType: "json",
          data: {id: s.id},
            success: function (data) {
        //        alert("22")
     //  alert(JSON.stringify(data))

                s.data = JSON.parse(data).data;
                        s.signature = JSON.parse(data).signature ;
                        s.res = true;
        //alert("Jess");
             //  alert(JSON.stringify(data));
             //alert(     window.LiqPayCheckoutCallback);
               // alert(JSON.parse(data).data);
            /**    window.LiqPayCheckoutCallback = function () {
                    LiqPayCheckout.init({
                        data: JSON.parse(data).data,
                        signature: JSON.parse(data).signature ,
                        embedTo: "#liqpay_checkout",
                        mode: "embed", // embed || popup,
                        language: "uk"
                    }).on("liqpay.callback", function (data) {
                        alert("liqpay.callback");
                        alert(data.status);
                        alert(JSON.stringify(data));
                    }).on("liqpay.ready", function (data) {
                        alert("liqpay.ready")
                        alert(JSON.stringify(data))
                        // ready
                    }).on("liqpay.close", function (data) {
                        alert("liqpay.close")
                        alert(JSON.stringify(data))
                        // close
                    }).on("liqpay.fail", function (d) {
                        alert("liqpay.fail")
                        alert(JSON.stringify(d))

                    });
                };*/
            },
            error: function (e) {
              //  alert("error")
                //alert(JSON.stringify(e));
            }
        });
                        document.getElementById("send").click();

    },
    }
</script>
<!--
<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>


<template>
    <div style="margin-top: 20px;">



          <b-form-group>
                            <div class="d-flex justify-content-center">
                                <b-form-radio-group v-model="donate_options">

                                    <b-form-radio name="donate_options" value="Cтворити"
                                                  style="margin-right: 10px;">Cтворити донат
                                    </b-form-radio>
                                    <b-form-radio  name="donate_options" value="Створені"
                                                  style="margin-right: 10px;">Створені донати
                                    </b-form-radio>
                                    <b-form-radio name="donate_options" value="Отримані"
                                                  style="margin-right: 10px;">Отримані донати
                                    </b-form-radio>
                                </b-form-radio-group>

                            </div>
                        </b-form-group>

        <div v-if="donate_options === 'Cтворити' ">
                                        <make_donate></make_donate>
                        </div>
                        <div v-if="donate_options === 'Створені' ">

                                                <div v-for="user in  users" class="input-group justify-content-around"
                         style="margin-bottom: 5px;">
                        <div class="card w-75">
                            <div class="card-body ">
                                <h5 class="card-title">{{user.name}}</h5>
                                <p class="card-text">

                                    {{user.description}}
                                </p>
                                <div>
                                </div>

                                <div class="d-flex justify-content-end">
                            <button v-on:click="write(user.name)" class="btn-sm btn-primary" style="margin-right: 5px;  margin-left: 5px;">Написати</button>
                                    </div>
                            </div>
                        </div>
                        </div>


                        </div>

                        <div v-if="donate_options ===  'Отримані' ">

                        </div>
    </div>
</template>

<script>
        import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
        import make_donate from "./make_donate.vue"
    export default {
        name: "donates",
        components: {make_donate},
        data(){ return { donate_options: 'Cтворити',
        users: [ { name: "John", description: "Description"},
                { name: "John", description: "Description"},
                { name: "John", description: "Description"},
                { name: "John", description: "Description"},
                { name: "John", description: "Description"},
                    { name: "John", description: "Description"},
                { name: "John", description: "Description"},
                { name: "John", description: "Description"},
                { name: "John", description: "Description"},
                { name: "John", description: "Description"},
                    { name: "John", description: "Description"},
                { name: "John", description: "Description"},
                { name: "John", description: "Description"},
                { name: "John", description: "Description"},
                { name: "John", description: "Description"},
                    { name: "John", description: "Description"},
                { name: "John", description: "Description"},
                { name: "John", description: "Description"},
                { name: "John", description: "Description"},
                { name: "John", description: "Description"},
                    { name: "John", description: "Description"},
                { name: "John", description: "Description"},
                { name: "John", description: "Description"},
                { name: "John", description: "Description"},
                { name: "John", description: "Description"},
                    { name: "John", description: "Description"},
                { name: "John", description: "Description"},
                { name: "John", description: "Description"},
                { name: "John", description: "Description"},
                { name: "John", description: "Description"},
                    { name: "John", description: "Description"},
                { name: "John", description: "Description"},
                { name: "John", description: "Description"},
                { name: "John", description: "Description"},
                { name: "John", description: "Description"},


],} },
        methods:{

        }
    }
</script>

<style scoped>

</style>-->