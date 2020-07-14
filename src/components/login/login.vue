<template>

    <div id="f">
        <b-form @submit="onSubmit">

            <div class="row">
                <div class="d-flex justify-content-start">
                    <!-- {{data.role}-->
                    <p style="margin-left: 20px; font-weight:normal;">Вхід</p>
                    <hr>
                </div>
            </div>
            <b-form-group class="child" description="Введіть емейл" label-for="input-2">
                <b-form-input

                        id="input-11"
                        v-model="form.email"
                        required
                        type=""
                        placeholder="емейл..."
                        minlength="email"
                ></b-form-input>
            </b-form-group>

            <b-form-group description="Введіть пароль" class="child">
                <b-form-input

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
                    <h6 style="font-weight:normal;"> Показати пароль </h6>
                </b-form-checkbox>

                <!--	<b-form-checkbox
                            v-on:change="renew_password_"
                    >
                    <h6>Забули пароль </h6>
                    </b-form-checkbox> -->

            </b-form-group>


            <b-button type="submit" variant="primary" style="margin-left: 10px">Увійти</b-button>
            <!--	<b-button type="reset" variant="danger" style="margin-left: 10px">Очистити</b-button> -->
        </b-form>
    </div>
</template>
<style>

</style>
<script>
    /* eslint-disable */

    /*eslint no-mixed-spaces-and-tabs: ["error", "smart-tabs"]*/
        import current_host from "../get_api_host.js"

    import "./login.css"
    import Swal from 'sweetalert2/dist/sweetalert2.js'
    import 'sweetalert2/dist/sweetalert2.css'

    import $ from "jquery"

    export default {
        components: [Swal],
        data() {
            return {
                form: {
                    email: '',
                    //name: '',
                    password: ''

                },
                show_password: false,
                show: true
            }
        },
        created() {
            //alert(JSON.stringify(localStorage));
            //	alert(localStorage.length);
            //this.$router.push('create');
            //this.$router.back();
        },
        mounted() {
            //alert("helloge");
            //	this.$router.back();
        },
        methods: {
            renew_password_() {
                Swal.fire({
                    title: 'Cтворення нового паролю',
                    icon: 'info',
                    text: 'Cтворення нового паролю',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ок'
                }).then((result) => {


                })
            },
            show_password_(e) {
                var x = document.getElementById("input-2");
                //alert(x.type)
                if (x.type === "password") {
                    x.type = "text";
                } else {
                    x.type = "password";
                }

            },
            onSubmit(evt) {
                evt.preventDefault();
                // alert( this.form.name + " " +   this.form.email  + " " +   this.form.password);
                this.email = this.form.email.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                this.password = this.form.password.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

                var vm = this;
                $.post({
                    async: false, // http://127.0.0.1:8000
                    url:  current_host + "/login/",
                    data: vm.form,
                    dataType: "json",
                    success: function (data) {
                        /*alert(JSON.stringify(data));
                        alert(typeof data);
                        alert(Object.keys(data));
                        alert( data.id);
                        alert( data.name);
                        alert( data.token);*/

                        //alert("suc")
                        //  alert(JSON.stringify(data));

                        //	localStorage.setItem("user_name", data.name);
                      //  alert(JSON.stringify(data))
                        localStorage.setItem("id", data.id);
                        localStorage.setItem("name", data.name);
                        localStorage.setItem("token", data.token);
                        localStorage.setItem("role", data.role);
                        localStorage.setItem("is_blocked_by_admin", data.is_blocked_by_admin);
                        //localStorage.getItem("user_name"))
                        window.location.href = "/";

                        //vm.form.email = data;
                        //  return data+"ff";

                        //const to = vm.$router.currentRoute;
                        //alert(window.location.hostname);
                        //	vm.$router.push( '/ppp' );
                        //	location.href = window.location.hostname;
                        //	location.reload();
                        //vm.$forceUpdate();
                        //	vm.$router.replace('/complains');
                        //vm.$router.replace(to);
                        // vm.$router.push('/');
                        //	alert("reload")
                    },
                    error: function (e) {
                   // alert(JSON.stringify(e))
                          Swal.fire({
							icon: 'info',
							text: e.responseJSON.response,
						});
                        //alert("error");
                        //	   alert(typeof e);
                        //   alert(JSON.stringify(e));
                        //   alert(Object.keys( e));
                        //   alert( e.response);
                        /*	Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: e.responseJSON.response,

                            })*/
                        /*	   Swal.fire({
                            title: 'Пропозиція створена',
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Ок'
                        }).then((result) => {})*/
                    }
                });
            },
            /* onReset(evt) {
               evt.preventDefault()
               // Reset our form values
               this.form.email = ''
               this.form.name = ''
               this.form.food = null
               this.form.checked = []
               // Trick to reset/clear native browser form validation state
               this.show = false
               this.$nextTick(() => {
                 this.show = true
               })
             } */
        }
    }

</script>
