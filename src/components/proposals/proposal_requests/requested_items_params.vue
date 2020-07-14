<template>
    <div class="row">
        <div v-for="el in  elements" class="col-sm-12 d-flex justify-content-center"
             style="margin-bottom: 5px; width: 100px">
            <div class="card w-50 w-25">

                <div class="card-body ">
                    <p class="card-text">
                        {{ el.title|restrict}}
                    </p>


                    <!--   <div class="row">

                       <div v-for="e in el.wished_proposal_tags">

                   <a href="#" class="badge badge-success" style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{e}}</a>

                       </div>
                           </div> -->
                    <div class="row">

   <vue-numeric-input  text-align='center'  style="width: 200px;height: 30px; margin-left: 5px;"  :precision="3" placeholder="Введіть кількість" v-model="el.count

" :min="1"  :max="el.allowed_count !== null?el.allowed_count:1000" :step="1"></vue-numeric-input>

  <vue-numeric-input    v-if="el.proposal_type === 'Оренда'" text-align='center'  style="width: 200px;height: 30px; margin-left: 5px;"  :precision="3" placeholder="кількість часу" v-model="el.on_rent_time_unit_count

" :min="1"  :max="el.allowed_count" :step="1"></vue-numeric-input>
<p v-if="el.allowed_count !== null" style="margin-left: 5px">Допустима кількість {{el.allowed_count}}</p>
<p v-else style="margin-left: 5px">Більше деталей за кількість в публікатора</p>

                        <p v-if="el.proposal_type === 'Оренда'" style="margin-left: 5px">{{el.rent_time}}</p>



                        </div>
                    <div class="d-flex justify-content-end">

                                <a target="_blank" :href="'/proposals/'+ el.id +'/details/'"
                               class="btn-sm btn-primary" style="height: 30px;margin-right: 5px;  margin-left: 5px; margin-top:5px;"><i class="fas fa-info-circle"></i></a>
                        <button v-on:click="delete_(el.title)" class="btn-sm btn-danger"
                                style="height: 30px; margin-right: 5px;  margin-left: 5px; margin-top: 5px">   <i class="fa fa-trash"></i>              <!--      Видалити-->
                        </button>

                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
    import VueNumericInput from 'vue-numeric-input'

    export default {
        filters: {
            restrict(e, v = 50) {
                return e.length > v ? e.substring(0, v) + "...." : e
            }
        },
        components: {VueNumericInput},
        watch: {
            items: function (e) {
                this.elements = e;
              //  alert(1)
             //   alert(e);
            },
              elements: function (e) {
               //      alert(2)
              //  alert(e);
            }
        },
        name: "requested_items_params",
        props: ["items"],
        data() {
            return {
                elements: this.items,
           //   rent_time: [ 'Хвилина', 'Година', 'День', 'Місяць', 'Рік'],
             //   time: 'Година'
            }
        },
        methods:{
            delete_(el){
                this.$emit("delete_item_request",el);
            }
        }
    }
</script>

<style scoped>

</style>