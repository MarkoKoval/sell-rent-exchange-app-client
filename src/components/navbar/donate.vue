<template>
    <div id="app">
        <!--style="visibility: hidden;" -->

        <form id="form1" style="" @submit="send" method="POST" action="https://www.liqpay.ua/api/3/checkout"
              accept-charset="utf-8">
            <input type="hidden" name="data" v-model="data"/>
            <input type="hidden" name="signature" v-model="signature"/>

            <button v-on:click="fun" class="btn-link" style="color: grey; text-decoration: none; " type="submit"
                    formtarget="blank_" id="send" variant="dark">Донати
            </button>
        </form>

    </div>
</template>
<style>
    body {
        font-family: sans-serif;
        font-size: 25px;
    }

    .btn-link {
        border: none;
        outline: none;
        background: none;
        cursor: pointer;
        color: #0000EE;
        padding: 0;
        text-decoration: underline;
        font-family: inherit;
        font-size: inherit;
    }

    .btn-link:active {
        color: #FF0000;
    }
</style>
<script>

  import current_host from "../get_api_host.js"
    /* eslint-disable */
    import $ from "jquery"

    export default {
        methods: {
            get_form_data(){
              //    alert(44)
                var s = this;
            var payment_form = JSON.parse(localStorage.getItem("payment_form"));
//alert(JSON.stringify(payment_form));
            if (payment_form) {
                var data = payment_form.data;
                var signature = payment_form.signature;
                var time = payment_form.time;
                //alert(new Date(time));
                //  alert(new Date());
                // alert(this.DiffMinutes(new Date(), new Date(time)));
                if (parseInt(this.DiffMinutes(new Date(), new Date(time))) < 0) {
                  //  alert(44)
                    s.data = data;
                    s.signature = signature;
                    return;
                }
            }

            if (s.id !== "")
            // alert(90)
                $.get({
                    async:false,
                    url: /*"http://127.0.0.1:8000" */  current_host+"/donate/" + s.id, dataType: "json",
                    data: {id: s.id},
                    success: function (data) {
                         //alert("22")
                        //alert(JSON.stringify(data))


                        s.data = JSON.parse(data).data;
                        s.signature = JSON.parse(data).signature;
                        s.res = true;
                        localStorage.setItem("payment_form", JSON.stringify({
                            data: s.data,
                            signature: s.signature, time: new Date().toString()
                        }));
                        //  alert(localStorage.getItem("payment_form"));
                    },
                    error: function (e) {
                        //     alert("error")
                        //   alert(JSON.stringify(e));
                    }
                });
            },
            fun() {
                this.get_form_data()
             //   alert(1);
               //  alert(this.data)
              //  alert(this.signature)
            },
            send() {
                //      alert("fewfwe");
            },
            DiffMinutes(dt2, dt1) {
                let diff = Math.abs(new Date(dt2) - new Date(dt1));
                let minutes = Math.floor((diff / 1000) / 60);
                return minutes; // minutes

            }
        },
        name: "make_donate",
        components: {},
        data() {
            return {
                data: null,
                signature: null,
                res: false,
                id: localStorage.getItem("id"),

                auth: {
                    id: parseInt(localStorage.getItem("id")),
                    name: localStorage.getItem("name"),
                    token: localStorage.getItem("token"),
                    role: localStorage.getItem("role")
                },


            }
        },
        created() { /*alert("cr")*/
        },
        mounted() {



        },
    }
</script>