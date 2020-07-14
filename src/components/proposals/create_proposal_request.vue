<template>
    <div style="margin-top: 10px">
        <p>greg</p>
        <p>gregergg</p>
        <!--  <p>{{$route.params.proposal_id}}</p> -->

        <b-form-group>
            <div class="d-flex justify-content-center">

                     <!--       <datetime format="YYYY/MM/DD h:i:s" width="300px" v-model="date"></datetime> -->

                <b-form-radio-group v-model="type">

                    <b-form-radio name="request_type" value="Простий"
                                  style="margin-right: 10px;">Простий запит
                    </b-form-radio>
                    <b-form-radio name="request_type" value="Комбінований"
                                  style="margin-right: 10px;">Комбінований запит
                    </b-form-radio>
                </b-form-radio-group>

            </div>
        </b-form-group>

        <div class="d-flex justify-content-center">
            <div v-if="type==='Простий'">



            </div>

        </div>
        <div>
                    <combined_request v-if="type==='Комбінований'"></combined_request>

       <!-- <div class="d-flex justify-content-center" v-if="type==='Комбінований'">

                <selectize_ style="width: 90vw;"></selectize_>
            </div> -->
            </div>



<!--<datetime_picker></datetime_picker> -->
    </div>
</template>

<script>

    import datetime_picker from "./datetime_picker.vue"
    import {uk} from 'vuejs-datepicker/dist/locale'

import combined_request from "./combined_request.vue"
 import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/uk';

    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import VueNumericInput from 'vue-numeric-input'
import selectize_ from "../selectize_.vue"
    export default {
        name: "create_proposal_request",
        components: {VueNumericInput, selectize_,DatePicker,datetime_picker,combined_request},
        data() {
            return {

                type: "Простий",
                rent_time: ['Хвилина', 'Година', 'День', 'Місяць', 'Рік'],
                currencies: ['Гривня', 'Dollar', 'Euro'],
                wished_proposal: null,
                simple: {
                    request_type: "Оренда",
                    request_message: "",
                    proposal_item_count: null,
                    on_rent_time_unit_measure: 'Місяць',
                    on_rent_time_unit_count: null,
                    suggested_money_count: null,
                    suggested_currency: 'Гривня',
                },
            }
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>