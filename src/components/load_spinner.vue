
<template>
    <div class="vld-parent">
        <loading :active.sync="isLoading"
        :can-cancel="true"
        :on-cancel="onCancel"
        :is-full-page="fullPage"></loading>

        <label><input type="checkbox" v-model="fullPage"><!--Full page?--></label>
       <!-- <button @click.prevent="doAjax">fetch Data</button> -->
    </div>
</template>

<script>
    // Import component
    import Loading from 'vue-loading-overlay';
    // Import stylesheet
    import 'vue-loading-overlay/dist/vue-loading.css';

    export default {
         name: "load_spinner",
        data() {
            return {
                isLoading: true,
                fullPage: true
            }
        },
        components: {
            Loading
        },
        created(){
         //    alert(1)
        },
        methods: {
            doAjax() {
           this.isLoading = true;
                // simulate AJAX
              /*  setTimeout(() => {
                  this.isLoading = false
                },5000)*/
            },
            onCancel() {
              console.log('User cancelled the loader.')
            }
        }
    }
</script>

<!--

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
<script src = "https://cdn.jsdelivr.net/spinjs/1.3.0/spin.min.js"></script>
     <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootswatch/3.1.0/superhero/bootstrap.min.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>

    <style>
       body{
  padding-top: 50px;
}
#spin-area{
  margin-top:20px;
  height:500px;
  width:500px;
  border-radius: 3px;
}
        </style>
</head>
<body>

<div class="container">
  <button class="btn btn-default" onclick="toggleSpin();">Spin it!</button>
  <div id="spin-area"></div>
</div>


<script>
    var target = document.getElementById('spin-area');
var spinner;
var spinning = false;

var opts = {
  lines: 12, // The number of lines to draw
  length: 7, // The length of each line
  width: 5, // The line thickness
  radius: 50, // The radius of the inner circle
  color: '#000', // #rbg or #rrggbb
  speed: 1, // Rounds per second
  trail: 100, // Afterglow percentage
  shadow: true // Whether to render a shadow
};

function toggleSpin(){
    spinning ? spinner.stop() : spinner = new Spinner(opts).spin(target);
    spinning = !spinning;
}
</script>

</body>
</html>

-->