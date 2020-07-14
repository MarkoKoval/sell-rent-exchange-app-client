<template>


    <div style="margin-top: 5px;">
        <!--   <p>{{publicators}}</p>
           <p>{{title}}</p>
           <p>{{locations}}</p>-->
        <div class="row">

            <div class="input-group justify-content-center" style="margin-left: 20%; margin-right: 20%;">


                <div class="d-flex justify-content-center">

                    <div class="row">
                        <div style="width: 75vh;">
                            <vue-bootstrap-typeahead
                                    style="margin-bottom: 5px;"
                                    v-model="search_params.title"
                                    :data="title.filter(d => !!d)"
                                    :minMatchingChars="1"
                                    :maxMatches="100"
                                    :placeholder="'Пошук по заголовку'"

                            />

                            <vue-bootstrap-typeahead v-if="search_params.publicator_search" style="margin-bottom: 5px;"
                                                     v-model="search_params.publicator"
                                                     :data="publicators.filter(d => !!d)"
                                                     :minMatchingChars="1"
                                                     :maxMatches="100"
                                                     :placeholder="'Пошук по публікатору'"


                            />

                            <vue-bootstrap-typeahead v-if="search_params.location_search" style="margin-bottom: 5px;"
                                                     v-model="search_params.location"
                                                     :data="locations.filter(d => !!d)"
                                                     :minMatchingChars="1"
                                                     :maxMatches="100"
                                                     :placeholder="'Пошук по локації'"

                            />

                        </div>
                    </div>

                    <!--  <b-form-input v-model="search_params.title" placeholder="пошук по заголовку ..." type="text"
                                    class="w-25" style="margin-bottom: 5px;">  </b-form-input> -->
                    <button v-on:click="search_" class=" btn btn-primary"
                            style="margin-right: 5px;  margin-left: 35px; height: 39px;" data-toggle="tooltip"
                            title="Пошук">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </div><!-- /input-group -->

        </div>
        <div class="row">
            <div class="input-group justify-content-center" style="width: 750px; margin: auto; margin-bottom: 5px;">
                <available_categories v-on:select-category="Set_Category"
                                      v-show="search_params.categories"></available_categories>
            </div>
        </div>
<!--tyle="margin-left: 5%; margin-right: 5%; width: 90%; margin-top: 5px;"-->
        <div class="row">
            <div class="input-group justify-content-center"
                 style="width: 750px; margin: auto;">
                <selectize_ style="width: 60vw;" place="Пошукові теги " v-on:change_tag="Set_Tags"
                            v-show="search_params.key_words"></selectize_>

                <!-- v-if="purpose_ !== 'monitor'" need="my_previous_created_wishes"
                                  v-bind:place="select_cat_placeholder" placeholder="sm" v-on:select-tags="Set_Tags"-->
            </div>
        </div>
        <div class="row">
            <div class="input-group d-flex justify-content-center">

                <b-form-checkbox v-model="search_params.categories" name="some-radios" :value="true"
                                 style="margin-right: 3px; margin-left: 3px;">Категорії
                </b-form-checkbox>
                <b-form-checkbox v-model="search_params.key_words" name="some-radios" :value="true"
                                 style="margin-right: 3px; margin-left: 3px;">Ключові Слова
                </b-form-checkbox>


                <b-form-radio-group v-model="search_params.proposal_object">


                    <b-form-radio name="proposalobject" value="Товари"
                                  style="margin-right: 3px; margin-left: 3px;">Товари
                    </b-form-radio>
                    <b-form-radio name="proposalobject" value="Послуги"
                                  style="margin-right: 3px; margin-left: 3px;">Послуги
                    </b-form-radio>
                    <b-form-radio name="proposalobject" value="Без різниці"
                                  style="margin-right: 3px; margin-left: 3px;">Без різниці
                    </b-form-radio>
                </b-form-radio-group>


            </div>
        </div>
        <div>
            <div class="input-group d-flex justify-content-center">


                <b-form-radio-group v-model="search_params.proposal_type">


                    <b-form-radio name="proposaltype" value="Продаж"
                                  style="margin-right: 3px; margin-left: 3px;">Продаж
                    </b-form-radio>
                    <b-form-radio name="proposaltype" value="Оренда"
                                  style="margin-right: 3px; margin-left: 3px;">Оренда
                    </b-form-radio>
                    <b-form-radio name="proposaltype" value="Обмін"
                                  style="margin-right: 3px; margin-left: 3px;">Обмін
                    </b-form-radio>
                    <b-form-radio name="proposaltype" value="Без різниці"
                                  style="margin-right: 3px; margin-left: 3px;">Без різниці
                    </b-form-radio>
                </b-form-radio-group>


                <b-form-checkbox v-model="search_params.price_params" name="some-radios"
                                 style="margin-right: 3px; margin-left: 3px;">Додаткові параметри
                </b-form-checkbox>


                <!--       <b-form-checkbox v-model="search_params.place_params" name="some-radios" value="Товари"
                                       style="margin-right: 3px; margin-left: 3px;">Параметри Місця
                      </b-form-checkbox> -->
            </div>


            <div v-if="search_params.price_params">

                <div class="input-group d-flex justify-content-center row">
                    <b-form-checkbox v-model="search_params.publicator_search" name="some-radios" :value="true"
                                     style="margin-right: 3px; margin-left: 3px;">Публікатор
                    </b-form-checkbox>
                    <b-form-checkbox v-model="search_params.location_search" name="some-radios" :value="true"
                                     style="margin-right: 3px; margin-left: 3px;">Локація
                    </b-form-checkbox>
                </div>
            </div>

        </div>
        <div class="row" style="margin-right: 30%;margin-left: 30%">
            <!--     <div v-if="search_params.price_params">

                     <div  class="row">
                      <b-form-checkbox class="input-group d-flex justify-content-center" v-model="search_params.publicator_search" name="some-radios" :value="true"
                                          style="margin-right: 3px; margin-left: 3px;">Публікатор
                         </b-form-checkbox>
                         <b-form-checkbox class="input-group d-flex justify-content-center" v-model="search_params.location_search" name="some-radios" :value="true"
                                          style="margin-right: 3px; margin-left: 3px;">Локація
                         </b-form-checkbox>
                     </div>
                 </div> -->
            <div v-if="search_params.price_params!==false && (search_params.proposal_type==='Продаж' || search_params.proposal_type==='Без різниці')"
                 class="input-group d-flex justify-content-center">

                <vue-numeric-input text-align='center' style="width: 180px;height: 30px; margin-left: 5px;"
                                   :precision="3" placeholder="ціна купівлі до" v-model="search_params.price" :min="0"
                                   :max="1000000000" :step="0.1"></vue-numeric-input>
                <div class="col-xs-2">
                    <b-form-select
                            v-model="search_params.currency"
                            :options="currencies"
                            class="form-control"
                            style="margin-right: 5px;margin-left: 5px; height: 35px; margin-bottom: 5px;"
                            required
                    ></b-form-select>
                </div>


            </div>

        </div>

        <div class="row">
            <div v-if="search_params.price_params!==false && (search_params.proposal_type==='Оренда' || search_params.proposal_type==='Без різниці')"
                 class="input-group d-flex justify-content-center">

                <vue-numeric-input text-align='center' style="width: 180px;height: 30px; margin-left: 5px;"
                                   :precision="3" placeholder="ціна оренди до" v-model="search_params.rent_price"
                                   :min="0"
                                   :max="1000000000" :step="0.1"></vue-numeric-input>
                <div class="col-xs-2">
                    <b-form-select
                            v-model="search_params.rent_currency"
                            :options="currencies"
                            class="form-control"
                            style="margin-left: 5px; height: 35px;"
                            required
                    ></b-form-select>
                </div>
                <div class="col-xs-2">

                    <b-form-select

                            v-model="search_params.rent_time"
                            :options="rent_time"
                            style="margin-left: 15px; height: 35px;"
                            required
                    ></b-form-select>
                </div>

            </div>
        </div>
        <!--  <p>{{ search_params}}</p> -->
    </div>


</template>

<script>
    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import selectize_ from "../proposals/proposal_requests/selectize_.vue"
    import available_categories from "../available_categories.vue"
    import VueNumericInput from 'vue-numeric-input'

    export default {
        name: "main_search_bar",
        components: {selectize_, available_categories, VueNumericInput},
        props: ["title_", "publicator_names", "locations_"],
        watch: {
            search_params: {
                handler: function (e) {
                    this.$emit("search_values_changed", e);
                },
                deep: true

            },
            publicator_names: function (e) {
                this.publicators = e;
            },
            title_: function (e) {
                //   alert(1)
                //  alert(JSON.stringify(e))
                this.title = e;
            },
            locations_: function (e) {
                this.locations = e;
            }
        },
        data() {
            return {

                query: "", title: this.title_, publicators: this.publicator_names, locations: this.locations_,
                search_params: {
                    publicator: "", location: "",
                    publicator_search: false, location_search: false,
                    title: "",
                    category: "",
                    sup_category: "",
                    categories: false,
                    key_words: false,
                    key_words_: null,
                    proposal_object: "Без різниці",
                    proposal_type: "Без різниці",
                    search_params: "",
                    price_params: false,
                    place_params: false,
                    price: null,
                    rent_price: null,
                    rent_time: "Місяць",
                    currency: 'Гривня',
                    rent_currency: 'Гривня',
                },
                currencies: ['Гривня', 'Dollar', 'Euro'],

                rent_time: ['Хвилина', 'Година', 'День', 'Місяць', 'Рік'],
            }
        },
        created() {
            //    alert(JSON.stringify(this.publicator_names_))
            //  alert("ffwefwe");
            //   alert(JSON.stringify(this.search_params))
            this.$emit("search_values_changed", {});
        },
        mounted() {
            //    alert("ffwefwe");
            //   alert(JSON.stringify(this.search_params))
            this.$emit("search_values_changed", {});
        },
        methods: {

            search_() {
               // alert(2)
                this.$emit("search");
            },
            Set_Tags(e) {
                //     alert(JSON.stringify(e));
                this.search_params.key_words_ = e;
            },
            Set_Category(e) {
                this.search_params.category = e.category;
                this.search_params.sup_category = e.subcategory;
            }
        }
    }
</script>

<style scoped>

</style>