<template>
<div>
   <!--   <p>{{loading}} - {{form}}</p> -->
    <div id="f">
        <b-form @submit="onSubmit" >
              <div class="d-flex justify-content-start">
            <p style="margin-left: 20px; font-weight:normal;">Реєстрація</p>
              </div>
            <b-form-group
                    description="введіть ім'я користувача"
                    class="child"
                    id="input-group-1"
                    label-for="input-1"
            >
                <b-form-input

                        id="input-1"
                        v-model="form.email"
                        type="email"
                        required
                        placeholder="емейл..."
                ></b-form-input>
            </b-form-group>

            <b-form-group class="child" description="введіть ім'я користувача" label-for="input-2">
                <b-form-input

                        id="input-11"
                        v-model="form.name"
                        required
                        placeholder="ім'я.."
                        minlength="6"
                ></b-form-input>
            </b-form-group>

            <b-form-group class="child">
                <b-form-input
                        description="введіть пароль"
                        id="input-2"
                        v-model="form.password"
                        type="password"
                        required
                        placeholder="пароль..."
                        minlength="6"
                ></b-form-input>
            </b-form-group>

            <b-form-group class="child" id="">
                <b-form-checkbox
                        v-on:change="show_password_"
                >
                    <p style="margin-left: 20px; font-weight:normal;">      Показати пароль</p>
                </b-form-checkbox>

            </b-form-group>

 <!--<button  v-on:click="f">Clix</button> -->
            <b-button   type="submit" variant="primary" style="margin-left: 10px; margin-top: -25px;">Реєстрація</b-button>
          <!--  <b-button type="reset" variant="danger" style="margin-left: 10px">Очистити</b-button> -->
        </b-form>
        <!--
      <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
      </b-card>-->

    </div>
  <!--  <button id="es" v-on:click="loading=true">Clix</button> -->
<!--  <p>{{loading}}</p>-->
<slot>
       <load_spinner v-if="loading"></load_spinner>
</slot>
   <!-- <div v-else>
        <p>{{loading}}</p>
         <p>dffffffffffffffffffffffffffffffffff</p>
    </div> -->
</div>
</template>
<style>

</style>
<script>
    /* eslint-disable */

    /*eslint no-mixed-spaces-and-tabs: ["error", "smart-tabs"]*/
     import current_host from "../get_api_host.js"
import "./style.css"
import load_spinner from "../load_spinner.vue"
    import $ from "jquery"
 import Swal from 'sweetalert2/dist/sweetalert2.js'
 import 'sweetalert2/dist/sweetalert2.css'
import axios from "axios"
    import Load_spiner from "../proposals/load_spiner";
    export default {
        name: "register",
        components: {Swal,Load_spiner,load_spinner},
    /*    watch:{
            loading:function (e) {
                alert(454)
            }
        },*/


     //   contents: {Swal},
        data() {
            return {
                componentKey: 0,
                loading: false,
                form: {
                    email: '',
                    name: '',
                    password: '',
                  //  role: 'Адміністратор',
                },
                show_password: false,
                show: true
            }
        },

     /*    updated() {
    if (  this.loading === true){
             alert(661)
        }
  },*/
      /*  created() {
            //alert(JSON.stringify(localStorage));
            //	alert(localStorage.length);
            //this.$router.push('create');
            //this.$router.back();
        },
        mounted() {
            //alert("helloge");
            //	this.$router.back();
        },*/
        methods: {
             check_email(){
                 var self = this;
                 var res = null
            $.get({

                async: false,
                url: "https://emailverification.whoisxmlapi.com/api/v1?apiKey=at_KnzbXz2J5IJSzVqualuiMb20MGLQG&emailAddress="+self.form.email,
                beforeSend: function(){
    // Show image container

   },

                success:function(e){
               //   alert(JSON.stringify(e))
                    //alert(1)
                 //   alert(typeof e)
                  //  alert(JSON.stringify(e))
                 //   alert(Object.keys(e))
                     self.loading = false;
                    res = JSON.parse(e).smtpCheck === "true";

                },
                error:function (e) {
                   // alert(2)
                    // alert(JSON.stringify(e))


                   res = false
                     self.loading = false;
                }
            })
           //   alert(typeof res)
          //  alert(res)
                 if (res === false){
                      Swal.fire({
                                icon: 'info',
                                title: 'Oops...',
                                text: "Невалідний емейл",
                            });
                 }

                 return res;
        },
            show_password_(e) {

                var x = document.getElementById("input-2");
                //alert(x.type)
                if (x.type === "password") {
                    x.type = "text";
                } else {
                    x.type = "password";
                }

                var y = document.getElementById("input-3");
                //	alert(y.type)
                if (y.type === "password") {
                    y.type = "text";
                } else {
                    y.type = "password";
                }
            },
            f(){
                    this.loading = false
                 this.loading = true
//this.$forceUpdate()
             //    document.getElementById("es").click()
             //      this.$forceUpdate()
/*:key="componentKey"
                 this.$nextTick (() => {
          // add my-component component in DOM
          this.loading = true;
        });
                 this.$forceUpdate();*/
 // this.loading = true;
          //   this.$forceUpdate()
             //     this.$set(this.$data, 'loading', true);
               //             this.$forceUpdate()


              /*   this.$nextTick(() => {
                    this.loading = true;
                     this.$forceUpdate()
                    this.$nextTick(() => {
                        alert(66)
                                        alert( this.loading )

                     this.$forceUpdate()
                    })
                })*/
             // sleep(2)
             //   alert( this.loading )
            },
            onSubmit(evt) {

                   //   this.$nextTick(() => {
   //  this.loading = true;
     // });
            //     alert(2)

            //    this.loading = true;
                //  this.$forceUpdate();
//this.$nextTick();
       //          this.$nextTick (() => {
          // add my-component component in DOM
      //    this.loading = true;
        //});

            //    this.loading = !this.loading;
            //     alert(this.loading)
            //    alert(this.form.name + " " + this.form.email + " " + this.form.password);
             evt.preventDefault();
            if(this.check_email() === true) {
                var vm = this;
                $.post({
                        async: false,
                        url: current_host + "/register/",
                        data: vm.form,
                        dataType: "json",

                        success: function (data) {
                            //  alert(JSON.stringify(data))
                            // alert(JSON.stringify(data));
                            localStorage.setItem("id", data.id);
                            localStorage.setItem("name", data.name);
                            localStorage.setItem("token", data.token);
                            localStorage.setItem("role", "Звичайний");
                            localStorage.setItem("is_blocked_by_admin", data.is_blocked_by_admin);
                            window.location.href = "/";
                        },
                        error: function (e) {
                            //    alert(2)
                            //  alert(JSON.stringify(e))
                            Swal.fire({
                                icon: 'info',
                                title: 'Oops...',
                                text: e.responseJSON.response,
                            });
                            //  alert("error");
                            // alert(JSON.stringify(e));

                        }
                    });

            }
            else {
                return 0
            }
//sleep(1)
        // this.loading =false;
            //    alert(this.form.name + " " + this.form.email + " " + this.form.password);



         //       this.email = this.form.email.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
           //     this.password = this.form.password.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			//	this.name = this.form.name.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

              //  var vm = this;

                //this.check_email()
        //        if ( this.check_email()) {
                   //  this.loading = false
                /*    $.post({
                        async: false,
                        url: current_host + "/register/",
                        data: vm.form,
                        dataType: "json",

                        success: function (data) {
                            //  alert(JSON.stringify(data))
                            // alert(JSON.stringify(data));
                            localStorage.setItem("id", data.id);
                            localStorage.setItem("name", data.name);
                            localStorage.setItem("token", data.token);
                            localStorage.setItem("role", "Звичайний");
                            localStorage.setItem("is_blocked_by_admin", data.is_blocked_by_admin);
                            window.location.href = "/";
                        },
                        error: function (e) {
                            //    alert(2)
                            //  alert(JSON.stringify(e))
                            Swal.fire({
                                icon: 'info',
                                title: 'Oops...',
                                text: e.responseJSON.response,
                            });
                            //  alert("error");
                            // alert(JSON.stringify(e));

                        }
                    });*/
                }
            //},
        }
    }

</script>
