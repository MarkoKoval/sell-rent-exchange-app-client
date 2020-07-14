<template>
    <div>
        <!--   <p>var  {{value_}}</p> -->
        <!--  <p>{{typeof el}} {{el}}</p>
          <p>{{typeof v}} {{v <  this.disabledBefore || v > this.disabledAfter}}</p>
          <p>{{typeof disabledBefore}} {{disabledBefore}} | {{typeof disabledAfter}} {{disabledAfter}}</p>
           <p>{{v > disabledBefore}}</p> -->
        <!--<p>{{new Date()}}</p>-->
        <!--  <p>{{ Date.now()}}</p> -->
        <date-picker placeholder="можливий дедлайн блокування" :lang="lang"
                     v-model="value_" type="datetime"
                     :disabled-time="disabledTime"

                     value-format="YYYY-MM-DD hh:mm:ss" format="YYYY-MM-DD hh:mm:ss"
                     style="width: 25vw;"

        >
            <!--  :min="'{{new Date()}}'"-->
        </date-picker>
        <!--
        <p>{{value_}}</p>      moment:require('moment'),
                        <p>{{  moment(JSON.stringify(value_).substring(1,JSON.stringify(value_).length-1)).utc().format('YYYY-MM-DD-HH')}}</p>
                        <p>{{  moment(JSON.stringify(value_).substring(1,JSON.stringify(value_).length-1)).utc().format('YYYY-MM-DD-HH')}}</p>
                <p>{{el}}</p>-->
    </div>
</template>

<script>
    import {uk} from 'vuejs-datepicker/dist/locale'


    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';
    import 'vue2-datepicker/locale/uk';

    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    export default {
        name: "datetime_picker",
        components: {DatePicker},
        prop: ["date_"],
        watch: {
            value_: function (e) {
                // alert("fg");
                var a = JSON.parse(JSON.stringify(e));//alert(a);
                let el = this.moment(JSON.stringify(a).substring(1, JSON.stringify(a).length - 1)).add(3, 'hours').utc().format('YYYY-MM-DD hh:mm:ss');
                //     alert();

                this.el = el;
                this.$emit("date_changed", el === "Invalid date" ? null : el);
            }
        },
        mounted() {

            /*var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            this. dateTime = date+' '+time;*/

            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            this.dateTime = date + ' ' + time;
            //  new Date(this.dateTime)
            var date_ = new Date(this.dateTime);
            //  date_.setHours(date_.getHours()+1);
            this.disabledBefore = new Date(date_.setHours(date_.getHours() + 1));
            this.disabledAfter = new Date(date_.setMonth(date_.getMonth() + 12));
            // alert("m");
            this.$emit("date_changed", null);
        },
        data() {
            return {
                v: null,
                el: "",
                moment: require('moment'),
                lang: {
                    default: 'uk'
                },
                value_: null,
                disabledBefore: null,
                disabledAfter: null,

            }
        },
        methods: {
            disabledTime(e) {

                this.v = e;
                return !(e > this.disabledBefore && e < this.disabledAfter)
            }
        }
    }
</script>

<style scoped>

</style>