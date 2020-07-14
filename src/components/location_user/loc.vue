<template>
    <div>

        <link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap/dist/css/bootstrap.min.css"/>
        <link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.css"/>

        <script type="application/javascript" src="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.js"></script>

        <link rel="stylesheet" href="https://unpkg.com/leaflet-geosearch@2.6.0/assets/css/leaflet.css">

        <b-modal ref="bb" id="md" size="xl" :visible="visible" @hidden="$emit('clear')" @shown="modalShown"
                 @close="closeM" title="Вибір місцерозташування">
            <div id="foobar1">
                <l-map :minZoom="3" :zoom="13" ref="mymap" @click="addMarker">
                    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>

                </l-map>
            </div>

            <template slot="modal-footer">
                <b-btn variant="success" @click="Confirm">Підтвердити</b-btn>
            </template>
        </b-modal>
    </div>
</template>
<style scoped>
    #foobar1 {
        width: 100%;
        height: 400px;
        align: center;
    }
</style>
<script>
    import {LMap, LMarker, LTileLayer} from "vue2-leaflet";
    import L from "leaflet"
    import {OpenStreetMapProvider, GeoSearchControl} from 'leaflet-geosearch';
    import VGeosearch from 'vue2-leaflet-geosearch';
    import $ from "jquery"

    export default {
        name: "loc",
        props: ["location_lat", "location_lng"],
        watch: {
            // This would be called anytime the value of title changes
            a(newValue, oldValue) {
                //    alert("feg");
                //    alert(newValue + " " + oldValue);
                // you can do anything here with the new value or old/previous value
            }
        },
        components: {
            LMap,
            LMarker,
            LTileLayer,
            L, VGeosearch
        },
        data() {
            return {
                str_description: "",
                marker: L.latLng(0, 0),
                visible: true,
                url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
                attribution:
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'

            };
        },

        methods: {

            /*plotCurrentLocation(map) {
                var vm = this;
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        var currLocation = new L.latLng(position.coords.latitude, position.coords.longitude);

                        if (vm.marker)
                            map.removeLayer(vm.marker);
                        vm.marker = L.marker([position.coords.latitude, position.coords.longitude], {}).addTo(map);
                        map.setView(currLocation, 11, {animation: true});
                        map.panTo(currLocation);
                    }, err => {
                          alert(JSON.stringify(err))
                    }, {timeout: 30000, enableHighAccuracy: true, maximumAge: 75000})
                } else {

                    alert("no");
                }
            },*/

            modalShown() {
                //    map.panTo(L.latLng(22, 44));
                var map = this.$refs.mymap.mapObject;
                map.invalidateSize();
                // this.plotCurrentLocation(map);
                // alert(this.location_lat +" "+ this.location_lng);
                // alert(1);
                //  alert(this.location_lat)
                if (this.location_lat && this.location_lng) {
                    // alert("uee");
                    //      L.marker([location.lat,location.lng]);
                    this.marker = L.marker([this.location_lat, this.location_lng], {}).addTo(map);
                    map.panTo(L.latLng(this.location_lat, this.location_lng));
                    // this.addMarker(this.a)
                    // var map = this.$refs.mymap.mapObject;
                    //   alert(JSON.stringify(this.marker.getLatLng()));
                    //   if (this.marker)
                    //      map.removeLayer(this.marker);
                    //  this.marker = L.marker([e.latlng.lat, e.latlng.lng], {}).addTo(map);
                    //  map.panTo(e.latlng);

                } else {
                    this.marker = L.marker([49.92859358727302, 30.251952856779102], {}).addTo(map);
                    map.panTo(L.latLng(49.92859358727302, 30.251952856779102));

                    //        this.addMarker(L.latLng(49.92859358727302,30.251952856779102))
                    //   alert(JSON.stringify(this.marker.getLatLng()));
                    /*   if (this.marker)
                           map.removeLayer(this.marker);
                       this.marker = L.marker([49.92859358727302, 30.251952856779102], {}).addTo(map);
                       map.panTo(e.latlng);*/

                }
                var provider = new OpenStreetMapProvider();

                var searchControl = new GeoSearchControl({
                    provider: provider,
                    showMarker: false,
                    showPopup: true,                                   // optional: true|false  - default false

                    maxMarkers: 0,                                      // optional: number      - default 1
                    autoClose: true,                                   // optional: true|false  - default false
                    searchLabel: 'Введіть місцеросташування',                       // optional: string      - default 'Enter address'
                    keepResult: false,

                });
                map.addControl(searchControl);
                var vm = this;
                map.on('geosearch/showlocation', function (e) {
                    e.stopPropagation();
                    //alert(1);
                    //alert(JSON.stringify(e));
                    var currLocation = new L.latLng(e.location.x, e.location.y);

                    if (vm.marker)
                        map.removeLayer(vm.marker);
                    vm.marker = L.marker([e.location.x, e.location.y], {}).addTo(map);
                    map.setView(currLocation, 11, {animation: true});
                    map.panTo(currLocation);
                })
                searchControl.getContainer().onclick = e => {
                    e.stopPropagation();
                };

            },
            addMarker(e) {
                //    alert(2);

                //     alert(Object.keys( e));
                var map = this.$refs.mymap.mapObject;
                //   alert(JSON.stringify(this.marker.getLatLng()));
                if (this.marker)
                    map.removeLayer(this.marker);
                this.marker = L.marker([e.latlng.lat, e.latlng.lng], {}).addTo(map);
                map.panTo(e.latlng);
                this.get_location_string(e.latlng)
            },

            get_location_string(e) {
                var self = this;
                //   alert(JSON.stringify(e));
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://us1.locationiq.com/v1/reverse.php?key=eb08ae2706974a&lat=" + e.lat + "&lon=" + e.lng + "&format=json",
                    "method": "GET"
                }
                //   var self = this;
                // this.location.lat = e.lat;
                //this.location.long = e.long;
                $.ajax(settings).done(function (response) {
                    //    alert(response.display_name);
                    //       alert(response.display_name);
                    //    alert(response.display_name);
                    self.str_description = response.display_name;
                }).error(e => {
                    alert(e)
                });

            },
            Confirm() {
                //   alert(this.a);
                //  alert(JSON.stringify(this.marker.getLatLng()));
                //   $('#md').modal('toggle');
                // alert(1);

                //  alert(this.str_description);
                //   alert(2);
                this.$emit('update-item', this.marker.getLatLng(), this.str_description);
                this.visible = false;
                this.close()
            },
            closeM() {
                //alert("fff");
                //alert("close");
                this.$emit('close-map');
            }
        }

    }
</script>