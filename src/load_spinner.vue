<template>


    <div>
        <script  type="application/javascript"   src = "https://cdn.jsdelivr.net/spinjs/1.3.0/spin.min.js"></script>
     <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootswatch/3.1.0/superhero/bootstrap.min.css" />
    <script  type="application/javascript"   src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <div class="container">
  <button class="btn btn-default" v-on:click="toggleSpin();">Spin it!</button>
  <div id="spin-area"></div>
</div>


    </div>

</template>

<style>



</style>
<script>
    export default {
        name: "load_spinner",

        data(){
            return {
                opts : {
  lines: 12, // The number of lines to draw
  length: 7, // The length of each line
  width: 5, // The line thickness
  radius: 50, // The radius of the inner circle
  color: '#000', // #rbg or #rrggbb
  speed: 1, // Rounds per second
  trail: 100, // Afterglow percentage
  shadow: true // Whether to render a shadow
},
  spinning : false,
                spinner: null,
                target : document.getElementById('spin-area')
            }
        },

        methods:{

            toggleSpin(){
    this.spinning ? this.spinner.stop() : this.spinner = new Spinner(this.opts).spin(this.target);
    this.spinning = !this.spinning;
}

        }
    }
</script>

<style scoped>
#spin-area{
  margin-top:20px;
  height:500px;
  width:500px;
  border-radius: 3px;
}

</style>



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