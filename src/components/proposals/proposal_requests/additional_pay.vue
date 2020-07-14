<template>
        <div class="d-flex justify-content-around" style="margin-bottom: 10px;">

            <div style="margin: auto;">
                <number-input v-model="additional_pay_.suggested_money_count" :min="1" :max="10" inline controls></number-input>
                        <vue-numeric-input text-align='center'
                                               style="width: 220px;height: 30px;  margin-left:10px;margin-top: 5px;"
                                               :precision="3" placeholder="Можлива Доплата"
                                               v-model="additional_pay_.suggested_money_count"
                                               :min="1" :max="1000000000" :step="0.3"></vue-numeric-input>


                            <b-form-select
                                    v-model="additional_pay_.suggested_currency"
                                    :options="currencies"
                                    style="margin-right: 5px;margin-left: 5px;width: 120px; margin-top: 5px; "
                                    required
                            ></b-form-select>

             <b-form-select
                                    v-model="additional_pay_.offer_type"
                                    :options="offer_types"
                                    style="margin-right: 5px;margin-left: 5px;width: 180px; margin-top: 5px; "
                                    required
                            ></b-form-select>
            </div>
                        </div>
</template>

<script>
    import * as inp from 'vue-number-input'
    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import VueNumericInput from 'vue-numeric-input'

    export default {
        name: "additional_pay",
         components: {inp,VueNumericInput},
        watch:{

            additional_pay_: {handler: function(e) {
        //alert(1);
        this.$emit("additional_pay_changed", e);
             },
                deep: true
    }
        },
        data(){ return {
                currencies: [ 'Гривня', 'Dollar', 'Euro'],
               offer_types: [ 'Пропоную', "Хотів би отримати"],
            additional_pay_: {
                suggested_currency: 'Гривня',
                offer_type: 'Пропоную',
                suggested_money_count: null,
            }
        }
        }
    }
</script>

<style scoped>

</style>