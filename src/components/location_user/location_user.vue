<template>
    <div>

        <!--<script type="application/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.6.4/leaflet.css" > -->

        <!--
<script type="application/javascript" src="http://getbootstrap.com/2.3.2/assets/js/bootstrap-modal.js"></script>
<script type="application/javascript" src="https://cdn-geoweb.s3.amazonaws.com/esri-leaflet/0.0.1-beta.5/esri-leaflet.js"></script>
<script type="application/javascript" src="https://cdn-geoweb.s3.amazonaws.com/esri-leaflet-geocoder/0.0.1-beta.5/esri-leaflet-geocoder.js"></script>
-->
        <!--<link rel="stylesheet" type="text/css" href="https://cdn-geoweb.s3.amazonaws.com/esri-leaflet-geocoder/0.0.1-beta.5/esri-leaflet-geocoder.css">
        <link rel="stylesheet" href="http://getbootstrap.com/2.3.2/assets/css/bootstrap-responsive.css" >
        <link rel="stylesheet" href="http://getbootstrap.com/2.3.2/assets/css/bootstrap.css" >
           <script type="application/javascript" src = "leaflet-search.js"></script>
             <link rel="stylesheet" href="leaflet-search.css" /> -->


        <b-button id="show-btn" @click="show">Open Modal</b-button>
        <div id="map1" style="height:380px;width: 380px;"></div>

        <b-modal ref="my-modal" id="bv-modal-example" hide-footer>

            <div class="modal-body">
                <div id="map2" style="height:380px;width: 380px;"></div>
            </div>
            <div class="modal-footer">
                <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
                <!-- <button class="btn btn-primary" onclick="saveLocation()">Save changes</button> -->
            </div>

        </b-modal>

        <!-- Modal -->


    </div>
</template>
<style>

</style>
<script>


    /* eslint-disable */
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import modal from "vue-js-modal"
    import $ from "jquery"
    import L from "leaflet"
    import {LMap, LTileLayer, LMarker} from 'vue2-leaflet';

    $('#bv-modal-example').on('shown.bs.modal', function () {
        alert("fwe");
        /*setTimeout(function() {
            map.invalidateSize();
        }, 10);*/
    });

    export default {
        name: "location_user",
        components: {L, LMap, LTileLayer, LMarker, modal, $},
        data() {
            return {
                marker: null,
                map: null,
                visible: false
            }
        },
        mounted() {


            /*this.map = L.map('map').setView([33.4501001, -101.9107704], 4); // Coordinates, Zoom
            L.control.scale().addTo(this.map);
             L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: ''
}).addTo(this.map);*/

        },

        methods: {
            show: function (e) {
                this.$refs['my-modal'].show();
                this.map = L.map('map2').setView([33.4501001, -101.9107704], 4);
                L.control.scale().addTo(this.map);
                L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
                    attribution: ''
                }).addTo(this.map);
                setTimeout(() => {
                    this.map.invalidateSize();
                }, 0);
                this.map.invalidateSize()
                /* setTimeout(function() {
                     this.map.invalidateSize();
 }, 1);*/
                /*    this.map = L.map('map', {
      // Set latitude and longitude of the map center (required)
      center: [50.7833, 30.4167],
      // Set the initial zoom level, values 0-18, where 0 is most zoomed-out (required)
      zoom: 12,
      minZoom: 3,
  })
              L.control.scale().addTo(this.map);

   L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: ''
  }).addTo(this.map);*/
            }
        }
    }
</script>

<style scoped>

</style>

