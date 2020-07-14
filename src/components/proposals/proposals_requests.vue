
<style scoped>

</style>


<template>
    <div style="margin-top: 10px">
            <!--    <p>{{$route.params.request_id}}</p> -->


        <div v-if="type==='Простий'" class="col-sm-12 d-flex justify-content-center" style="margin-top: 30px;">


      <div >
    <div >
        <h3 style="text-align: center;">Опис</h3>
        <b-form-group>

                <div style="  word-break: break-all; width: 80%; margin-left: 10%; margin-right: 10%;" v-html="request_message" v-linkified></div>

        </b-form-group>
        <div  class="col-sm-12  d-flex justify-content-center">
         <b-form-group>

            <div class="row">
                    <div  class="m" v-if="proposal_item_count !== undefined">Бажана кількість  {{proposal_item_count}} </div>
                <div  class="m" v-if="request_type ===  'Оренда'">Бажаний час  {{on_rent_time_unit_measure}} </div>
            </div>
        </b-form-group>
        </div>

           <!--      <b-form-group>
        <div v-html="request_message" v-linkified></div>
                     </b-form-group>
                <br>
                <br>
                <br>
            <div class="d-flex justify-content-center">

              <b-form-group>
       <div  v-if="proposal_item_count !== undefined">Бажана кількість  {{proposal_item_count}} </div>
                    <div  v-if="on_rent_time_unit_count !== undefined">Бажана кількість  {{proposal_item_count}} </div>
  </b-form-group>
            </div>-->
        </div>
      </div>
<!--<datetime_picker></datetime_picker> -->
    </div>
        <div v-if="type==='Комбінований'" class="col-sm-12 d-flex justify-content-center">
        </div>
    </div>
</template>
<style>
    .m{
        margin-right: 10px;
        margin-left: 10px;
        margin-top: 5px;
    }
</style>
<script>



    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    export default {
        name: "proposals_requests",
        components: {},
        data() {
            return {
proposal_item_count: 1,
                on_rent_time_unit_count: "Місяць",
                type: "Простий",
request_message: "ewfweffffffffffffffffffffffffffffffffvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffewf" +
    "fewfewfwefewwfwf"

            }
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>