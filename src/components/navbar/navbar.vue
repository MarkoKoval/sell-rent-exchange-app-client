<template>
    <div>
        <div>
            <!-- <p>{{auth}}</p> -->
            <b-navbar toggleable="lg" type="dark" variant="dark" class="y">
                <b-navbar-nav>
                    <!--auth.is_blocked_by_admin-->
                    <b-nav-item href="/">Головна</b-nav-item>
                    <b-nav-item v-if="auth.token " href="/proposals">Пропозиції</b-nav-item>
                    <b-nav-item v-if="auth.token" href="/complains">Скарги</b-nav-item>
                    <b-nav-item v-if="auth.token " href="/messages">Користувачі</b-nav-item>

                    <b-nav-item v-show="auth.token " href="/">
                        <make_donate></make_donate>
                    </b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right>
                        <template v-slot:button-content>
                            <em v-if="!auth.token">Користувач</em>
                            <!-- <p>{{auth.is_blocked_by_admin}}</p>
                                  <p>{{auth.is_blocked_by_admin === true}}</p>
                               <p>{{typeof auth.is_blocked_by_admin}}</p>-->
                            <em v-if="auth.token">Користувач {{auth.role}} {{auth.is_blocked_by_admin === "true"?
                                'Заблокований': ''}}: {{ user_name}}</em>
                        </template>
                        <b-dropdown-item v-if="auth.token" href="/profile">Профіль</b-dropdown-item>
                        <b-dropdown-item v-if="!auth.token" href="/login">Вхід</b-dropdown-item>
                        <b-dropdown-item v-if="!auth.token" href="/registration">Реєстрація</b-dropdown-item>
                        <b-dropdown-item v-if="auth.token" v-on:click="exit">Вихід</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-navbar>
            <router-view/>
        </div>


        <h4 v-if="server_error" align="center" style="margin-top: 200px"> Сервер недоступний</h4>
    </div>
</template>
<style>
    .y {
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);

    }

</style>
<script>
    import current_host from "../get_api_host.js"
    import make_donate from "./donate.vue"
    import "bootstrap/dist/css/bootstrap.min.css";
    import "bootstrap-vue/dist/bootstrap-vue.css";
    //import tree_select2 from "../three_select/tree_select2.vue"
    //import selectize_ from "../selectize_.vue"
    import current_auth from "../get_current_auth.js"
    import $ from "jquery"

    export default {
        name: "navbar",
        components: {make_donate, /*tree_select2,selectize_*/},
        props: ["load"],
        data() {
            return {
                server_error: false,
                auth: {
                    /*  role: localStorage.getItem("role"),
                      id: parseInt(localStorage.getItem("id")),
                      token: localStorage.getItem("token"),
                      name: localStorage.getItem("name"),
                      is_blocked_by_admin: localStorage.getItem("is_blocked_by_admin"),
                      blocked_deadline: localStorage.getItem("blocked_deadline")*/
                },
                loaded: this.load,
                id: localStorage.getItem("id"),
                user_name: localStorage.getItem("name"),
                token: localStorage.getItem("token"),
                role: localStorage.getItem("role"),
            }
        },

        created() {
            //   alert(12)
            this.auth = current_auth.get_current_auth();
            var self = this;
         //   self.check_email();
            $.get({

                async: false,
                url: /*"http://127.0.0.1:8000" */  current_host + "/get/rights",
                data: {auth: JSON.stringify(self.auth)},
                dataType: "json",
                success: function (data) {
                    //  alert(JSON.stringify( self.auth))
                    // alert("suc")
                    //   alert(JSON.stringify(data));
                },
                error: function (err) {
                    if (("statusText" in err) && err.statusText.startsWith("NetworkError")) {
                        //    alert(err.statusText)
                        self.server_error = true;
                        // alert(JSON.stringify(err))
                        //self.server_error = true;
                        //    alert(JSON.stringify(err))
                    } else {
                        current_auth.set_current_auth(err);
                        self.auth = current_auth.get_current_auth();
                    }
                    //  alert(JSON.stringify( self.auth))
                    //    alert(11555)
                }
            })


        },
        methods: {
        /*   check_email(){
            $.get({

                async: false,
                url: "http://apilayer.net/api/check?access_key=c5118f1f9827f42a5fc4b231932130a8&email=mark.koval.ua@gmail.com&smtp=1&format=1",
                success:function(e){
                    alert(JSON.stringify(e))
                },
                error:function (e) {
                     alert(JSON.stringify(e))
                }
            })
        },*/


            todo: function () {
                this.intervalid1 = setInterval(() => {
                    this.changes = ((Math.random() * 100).toFixed(2)) + '%';
                    console.log(this.changes);
                }, 3000);
            },
            exit(e) {
                //alert("exit");
                localStorage.setItem("id", "");
                localStorage.setItem("name", "");
                localStorage.setItem("token", "");
                localStorage.setItem("role", "");
                //  localStorage.setItem("user_name", "");
                //  localStorage.setItem("user_token","");
                window.location.href = "/";
                //this.$forceUpdate();
                /*  alert( this.$router.currentRoute);
               const to = this.$router.currentRoute;
                          this.$router.replace('/');
                          this.$router.replace(to);
                          // vm.$router.push('/');
                          alert("reload")

               this.$forceUpdate();*/

            }


        }
    }
</script>

<style scoped>

</style>