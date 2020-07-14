<template>
<div style=" background-color:ivory;">
<perfect-scrollbar>

<div class="er" >


 <navbar></navbar>


<!-- <button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="left" :title="'title'">
  Tooltip on left
</button> -->


</div>
 </perfect-scrollbar>

</div>
</template>

<style>
 html, body {
    max-width: 100%;
    overflow-x: hidden;

}
.sb{
    width: 500px;
  }
    .gr{
      border-radius: 10px;
      margin-top: 20px;
      border-style: solid;
}
  .ts{
    width: 300px;
    margin-top: 11px;
    margin-bottom: 20px;
  }
.ps {
  height: 100vh;
}
.er::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #F5F5F5;
}

.er::-webkit-scrollbar
{
	width: 10px;
	background-color: #F5F5F5;
}

.er::-webkit-scrollbar-thumb
{
	background-color: #000000;
	border: 2px solid #555555;
}
</style>
<script>
     import proposals from  "./components/proposals/proposals.vue";

    import profile from "./components/profile/profile.vue"
    import tree_select2 from "./components/three_select/tree_select2.vue"
    import location_user from "./components/location_user/location_user.vue"
    import login from "./components/login/login.vue"
    import Vue from 'vue'
import VueFormGenerator from 'vue-form-generator'
//import 'vue-form-generator/dist/vfg.css'
 //import find_location from "./components/find_location.vue"
  import navbar from "./components/navbar/navbar.vue"
  import select_bar from "./components/select_bar/select-bar.vue"
  import tree_select from "./components/three_select/three_select.vue"
    import  PhoneNumberLine from "./components/forms_vue/vue_form.vue"
//import "./components/forms_vue/sss.css"
    import img_up from "./components/image_upload/image_upload.vue"
import loc from "./components/location_user/loc.vue";

  /*jshint -W099 */
//    import modal from "./components/modal/modal.vue";
export default {
  name: "App",

  components: {             proposals,
profile,tree_select2,loc,tree_select, navbar,select_bar,PhoneNumberLine, img_up,location_user},
    data() {
            return {

             "title": "ffwefwefwef",
             "user": "John", }
  },
  created() {

  },

  methods: {
    // Triggered when `childToParent` event is emitted by the child.



  }
}

</script>

