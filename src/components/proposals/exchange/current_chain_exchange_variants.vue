<template>
    <div>
        <div style="margin-top: 10px;">
            <!--  <p>{{current_chain_exchange_variants}}</p>
              <p> {{wished_objects_description}} </p> -->


            <!--    <div v-for="chain in wished_objects_description" class="col-sm-12 d-flex justify-content-around" style="margin-bottom: 5px;">
                    <p>    {{chain}} </p>
                    </div> -->
            <div v-for="chain in wished_objects_description" style="margin-bottom: 10px;">
                <div v-for="proposal in chain" class="col-sm-12 d-flex justify-content-center">
                    <div class="card w-50 ">
                        <div class="card-body ">
                            <h5 align="center" class="card-title">{{proposal.title}}</h5>
                            <p class="card-text">
                                {{proposal.description}}
                            </p>
                            <div class="row">


                                <a class="text badge badge-primary"
                                   style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{
                                    proposal.category.category}}/{{ proposal.category.subcategory}}</a>
                                <a class="text badge badge-primary"
                                   style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{
                                    proposal.proposal_type}}</a>


                                <!--    <a v-if="proposal.total_items!==null" href="#" class="text badge badge-primary"
                                       style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">Усі: {{
                                        proposal.total_items}}</a>
                                    <a v-if="proposal.proposal_type==='Оренда'" href="#" class="text badge badge-primary"
                                       style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">Ціна:
                                        {{ proposal.item_price_value}} {{proposal.item_price_currency}} {{
                                        proposal.rent_time_unit_measure}}</a>
                                    <a v-if="proposal.proposal_type!=='Оренда' && proposal.item_price_value!==null" href="#"
                                       class="text badge badge-primary"
                                       style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">Ціна:
                                        {{ proposal.item_price_value}} {{proposal.item_price_currency}}</a>
                                    <a v-if="proposal.location!==null" href="" class="text badge badge-primary"
                                       style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">
                                        {{proposal.location.str_description| restrict(50)}}</a> -->
                            </div>
                            <div class="row">
                                <div v-for="tag in proposal.search_tags">
                                    <a class="text badge badge-primary"
                                       style="margin-left: 3px; margin-right: 3px; margin-top: 3px; margin-bottom: 3px;">{{tag.title}}</a>

                                </div>
                            </div>


                            <div class="d-flex justify-content-end">

                                <!--   <button v-if="proposal.proposal_type==='Обмін'"
                                           v-on:click="chain_exchange_variants(proposal.id)" class="btn-sm btn-primary"
                                           style="margin-right: 5px;  margin-left: 5px;">Варіанти ланцюгового обміну
                                   </button> -->
                                <!--    <button v-on:click="show_details(proposal.id)" class="btn-sm btn-primary"
                                            style="margin-right: 5px;  margin-left: 5px;">Деталі
                                    </button> -->

                                <!--                 <a v-if="proposal.creator_id !== id" :href="'/send/user/'+proposal.creator_id" target="_blank" class="badge badge-primary"
                                   style="height: 20px; margin-left: 20px;">Повідомлення публікатору</a>-->
                                <a v-if="proposal.creator_id !== id" target="_blank"
                                   :href="'/send/user/'+proposal.creator_id"
                                   class="btn-sm btn-primary"
                                   style="margin-right: 5px;  margin-left: 5px; margin-top:5px;"><i
                                        class="fas fa-envelope"></i></a>
                                <!--овідомлення публікатору-->

                                <a target="_blank" :href="'/proposals/'+proposal.id+'/wished-for-exchange'"
                                   class="btn-sm btn-primary"
                                   style="margin-right: 5px;  margin-left: 5px; margin-top:5px;">Бажані елементи на
                                    обмін</a>

                                <a target="_blank" :href="'/proposals/'+ proposal.id +'/details/'"
                                   class="btn-sm btn-primary"
                                   style="margin-right: 5px;  margin-left: 5px; margin-top:5px;"><i
                                        class="fa fa-info-circle"></i></a>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import $ from "jquery"
 import current_host from "../get_api_host.js"
    export default {
        name: "current_chain_exchange_variants",
        data() {
            return {
                id: parseInt(localStorage.getItem("id")),
                wished_objects_description: [],
                current_chain_exchange_variants: localStorage.getItem("current_chain_exchange_variants")
            }
        },
        mounted() {
            var self = this;
            $.get({
                async: true,
                url: /*"http://127.0.0.1:8000"*/  current_host+"/proposals/get-several",
                dataType: "json",
                data: {proposals: self.current_chain_exchange_variants},
                success: function (data) {
                    // alert(123);
                    //   alert(JSON.stringify(data.result));
                    self.wished_objects_description = data.result;
                }
            })
        }
    }
</script>

<style scoped>

</style>