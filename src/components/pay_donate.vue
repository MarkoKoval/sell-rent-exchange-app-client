
<template>
    <div id="app">
        <!-- <img alt="Vue logo" src="./assets/logo.png">
         <HelloWorld msg="Welcome to Your Vue.js App"/> -->
        <script type="application/javascript"  src="http://static.liqpay.ua/libjs/checkout.js"></script>
        <div id="liqpay_checkout"></div>
    </div>
</template>

<script>
    /* eslint-disable */
    import $ from "jquery"

    export default {
        name: "pay_donate",
        components: {},
        mounted() {

      $.get({
            url: "http://127.0.0.1:8000/", dataType: "json",
            success: function (data) {
               // alert("Jess");
               // alert(JSON.stringify(data));
               // alert(JSON.parse(data).data);
                window.LiqPayCheckoutCallback = function () {
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
                };
            },
            error: function (e) {
                alert("error")
                alert(JSON.stringify(e));
            }
        });
    },
    }
</script>

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