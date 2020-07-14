<template>
    <div>
        <!--<p>{{form}}</p>-->

  <!--      <p>{{images}}</p> -->
        <div>

            <b-form @submit="edit" style="margin-top: 10px; margin-left: 5vw;  margin-right: 5vw;">
                <div v-if="visible_" style="margin-left: 15vw; margin-right: 15vw;">
                    <button class="btn-sm btn-primary" style="margin-bottom: 5px;" v-on:click="go_back" data-toggle="tooltip" title="Назад"> <i class="fas fa-undo-alt"></i></button>

                    <b-form-group
                            id="input-group-1"
                            label-for="input-1"
                            description="введіть заголовок для опису пропозиції максимум 130 символів.">
                        <b-form-input
                                id="input-1"
                                v-model="form.title"
                                type="text"
                                required
                                placeholder="Введіть заголовок"
                        ></b-form-input>

                    </b-form-group>

                    <b-form-group
                            description="введіть опису пропозиції максимум 10000 символів.">
                        <b-form-textarea
                                id="textarea-default"
                                placeholder="Опис пропозиції"
                                v-model="form.description"
                        ></b-form-textarea>
                    </b-form-group>

                    <b-form-group description="оберіть тип об'єкта пропозиції.">
                        <div class="d-flex justify-content-start">
                            <b-form-radio-group v-model="form.proposal_item_type">

                                <b-form-radio name="proposalobject" value="Товари"
                                              style="margin-right: 10px;">Товари
                                </b-form-radio>
                                <b-form-radio name="proposalobject" value="Послуги">Послуги
                                </b-form-radio>

                            </b-form-radio-group>
                        </div>


                    </b-form-group>

                    <b-form-group description="оберіть вид пропозиції.">
                        <div class="d-flex justify-content-start">
                            <b-form-radio-group v-model="form.proposal_type">

                                <b-form-radio name="proposal_type" value="Продаж" style="margin-right: 10px;">
                                    Продаж
                                </b-form-radio>
                                <b-form-radio name="proposal_type" value="Обмін" style="margin-right: 10px;">Обмін
                                </b-form-radio>
                                <b-form-radio name="proposal_type" value="Оренда" style="margin-right: 10px;">Оренда
                                </b-form-radio>
                            </b-form-radio-group>
                        </div>
                    </b-form-group>

                    <b-form-group>
                        <keep-alive>
                            <available_categories :category="form.category.category"
                                                  :subcategory="form.category.subcategory"
                                                  v-on:select-category="Set_Category"></available_categories>
                            <!--        <tree_select2 :category="form.category.category" :subcategory="form.category.subcategory" v-on:select-category="Set_Category"/> -->
                        </keep-alive>
                    </b-form-group>

                    <b-form-group>
                        <keep-alive>
                            <selectize_ v-bind:tag_init="form.search_tags" v-bind:place="tag_placeholder"
                                        v-on:change_tag="Set_Tags"/>
                        </keep-alive>
                    </b-form-group>


                    <b-form-group>
                        <div class="d-flex justify-content-start">
                            <!--    <b-form-input style="margin-right: 5px;margin-left: 5px; width: 20%" placeholder="Введіть ціну" type="number"
                                              step="0.01" min="0.00" max="1000.00"/> -->
                            <vue-numeric-input text-align='center' style="width: 220px;height: 30px" :precision="3"
                                               placeholder="кількість пропозицій" v-model="form.available_items"
                                               :min="0"
                                               :max="1000000000" :step="1"></vue-numeric-input>
                            <vue-numeric-input v-if="form.proposal_type !== 'Обмін'" text-align='center'
                                               style="width: 120px;height: 30px; margin-left: 5px;"
                                               :precision="3" placeholder="ціна" v-model="form.item_price_value"
                                               :min="0.0"
                                               :max="1000000000.0" :step="0.1"></vue-numeric-input>


                            <b-form-select
                                    v-if="form.proposal_type !== 'Обмін'"
                                    v-model="form.item_price_currency"
                                    :options="currencies"
                                    style="margin-right: 5px;margin-left: 5px;width: 120px"
                                    required
                            ></b-form-select>

                            <b-form-select
                                    v-if="form.proposal_item_type === 'Товари'"
                                    v-model="form.proposal_item_state"
                                    :options="state"
                                    style="margin-right: 5px;margin-left: 5px;width: 15%"
                                    required
                            ></b-form-select>


                            <div v-if="form.proposal_type === 'Оренда'">
                                <b-form-select

                                        v-model="form.rent_time_unit_measure"
                                        :options="rent_time"
                                        style="margin-right: 5px;margin-left: 5px;width: 220px"
                                        required
                                ></b-form-select
                                >

                            </div>

                        </div>
                    </b-form-group>


                    <b-form-group id="input-group-5">
                        <div class="d-flex justify-content-start">
                            <b-form-checkbox v-model="additional.change_photo"
                                             style="margin-left: 5px; margin-right: 5px;">Редагувати
                                фото
                            </b-form-checkbox>
                            <br/>
                            <b-form-checkbox v-model="additional.change_location"
                                             style="margin-left: 5px; margin-right: 5px;">Змінити
                                локацію
                            </b-form-checkbox>

                            <b-form-checkbox v-model="additional.use_user_location"
                                             style="margin-left: 5px; margin-right: 5px;">
                                Використати
                                локацію встановлену у профілі
                            </b-form-checkbox>

                            <b-form-checkbox v-model="additional.change_wished"
                                             style="margin-left: 5px; margin-right: 5px;"
                                             v-on:change="changeBack">Змінити
                                опис бажаних об'єктів на обмін
                            </b-form-checkbox>
                        </div>
                    </b-form-group>


                    <b-form-group id="input-group-6"
                                  description="додайте фото для опису пропозиції ліміт 10 фото">
                        <div class="d-flex justify-content-around">
                            <keep-alive>
                                <img_up :dat="form.name" :images="images" v-if="additional.change_photo"
                                        v-on:update-item="AddImages"></img_up>
                            </keep-alive>
                            <keep-alive>
                                <loc v-bind:location_lat="form.proposal_location_latitude"
                                     v-bind:location_lng="form.proposal_location_longitude"
                                     v-if="additional.change_location" v-on:update-item="UpdateLccation"></loc>
                            </keep-alive>
                        </div>
                    </b-form-group>


                    <b-button type="submit" variant="primary" style="margin-right: 10px">Редагувати</b-button>
                    <!--   <b-button type="reset" variant="danger">Очистити</b-button> -->


                    <div>
                    </div>

                </div>
                <div>
                    <!-- <p>Por</p>
                             <p>{{form}}</p> -->
                    <keep-alive>
                        <add_wished :wished_="form.wished_items" v-if="!visible_" v-on:back="Back"
                                    v-on:add_wished_objects_on_create="add_wished_objects_on_create_"></add_wished>
                    </keep-alive>
                </div>
           <!--     <p>{{form.wished_items}}</p>
                <p>Pod {{form}}</p> -->


            </b-form>
        </div>

    </div>
</template>

<script>
           import current_host from "../get_api_host.js"

      import Swal from 'sweetalert2/dist/sweetalert2.js'

    import 'sweetalert2/dist/sweetalert2.css'

    import search from "./search.vue"
    import $ from "jquery"
    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import tree_select2 from "../three_select/tree_select2.vue"
    // import selectize_ from "../selectize_.vue"
    import img_up from "../image_upload/image_upload.vue"
    import loc from "../location_user/loc.vue"
    import VueNumericInput from 'vue-numeric-input'
    import add_wished from "./add_wished.vue"
    import available_categories from "./categories/available_categories.vue"
    import selectize_ from "./proposal_requests/selectize_.vue"

    export default {
        name: "edit_proposal",
        props: ["edit_values"],
        components: {Swal,available_categories, add_wished, search, tree_select2, selectize_, img_up, loc, VueNumericInput},
        data() {
            return {
                auth: {
                    role: localStorage.getItem("role"),
                    id: parseInt(localStorage.getItem("id")),
                    token: localStorage.getItem("token"),
                    name: localStorage.getItem("name"),
                },
                images: null,
                form: {
                    title: "",
                    description: "",
                    images: null,
                    category: "",
                    search_tags: null,
                    creator_id: 0,
                    creation_time: "2020",
                    proposal_type: "",
                    proposal_item_type: "",
                    proposal_item_state: "Новий",
                    proposal_location_latitude: 0,
                    proposal_location_longitude: 0,
                 //   available_items: null,
                    available_items: null,
                    set_visible_for_all: true,
                    is_blocked_by_admin: false,
                    rent_time_unit_measure: 'Хвилина',
                    item_price_value: null,
                    item_price_currency: "Гривня",
                    wished_items: null,
                    complains: null,
                },
                additional: {
                    change_photo: false,
                    change_location: false,
                    use_user_location: false,
                    change_wished: false,
                },
                tag_placeholder: "Пошукові теги",
                wished: {
                    wished_description: "",
                    wished_proposal_type: "",
                    wished_proposal_object: "",
                    wished_proposal_tags: null,
                    wished_proposal_category: null,
                },
                rent_time: [{text: "Термін", value: null}, 'Хвилина', 'Година', 'День', 'Місяць', 'Рік'],
                currencies: [{text: "Валюта", value: null}, 'Гривня', 'Dollar', 'Euro'],
                /* foods: [{text: 'Select One', value: null}, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
                 state: [{text: "Виберіть стан", value: null}, "Новий", "Вживаний"],*/
                state: [{text: "Стан", value: null}, "Новий", "Вживаний"],
                visible_: true,
                show: true,
                tag_desc: "Описові теги",
            }
        },
        created() {
            // alert("Create");
            let self = this;
            //  alert(1);
            //  alert(JSON.stringify(self.edit_values));
            this.form = JSON.parse(JSON.stringify(self.edit_values));
            //alert(  this.form.rent_time_unit_measure);
            if (this.form.rent_time_unit_measure === "")
                this.form.rent_time_unit_measure = "Місяць";
            this.images = this.form.images;
            this.form.search_tags = this.form.search_tags.map(t => t.title)
            this.form.add_location = false;
            this.form.add_images = false;
            //    alert(JSON.stringify(self.edit_values));
        },
        mounted() {
            //   alert(JSON.stringify(this.form));
            //   alert(JSON.stringify(this.form.wished_items))
            var res = [];
            //
            //{ "wished_description": "", "wished_proposal_type": "Нема значення", "proposal_item_type": "Нема значення", "wished_proposal_tags": null, "wished_proposal_category": { "category": "Інше", "subcategory": "Інше" } }
            //{ "query_creator_id": 1, "query_description_text": "НОва ", "category": { "category": "Запчастини для транспорту", "subcategory": "Запчастини для спец / с.г. техніки" }, "query_description_tags": [ { "title": "of1" }, { "title": "options" } ], "proposal_item_type": "Товари", "query_creation_time": "2020-05-17T21:32:48.991Z", "is_active": false, "visible_for_others": false }
            //    alert(JSON.stringify(this.form.wished_items));
            for (var i = 0; i < this.form.wished_items.length; i++) {
                res.push({
                    wished_description: this.form.wished_items[i].query_description_text,
                    wished_proposal_category: this.form.wished_items[i].category,
                    wished_proposal_type: this.form.wished_items[i].proposal_item_type,
                    wished_proposal_tags: this.form.wished_items[i].query_description_tags !== null ?
                        this.form.wished_items[i].query_description_tags.map(e => e.title) : null,
                    proposal_item_type: this.form.wished_proposal_type,
                })
            }
            //    alert(JSON.stringify( this.form.wished_items))
            this.form.wished_items = res;
            //     alert(JSON.stringify( this.form.wished_items))
            // alert("mounted");
            // alert(this.proposal_location_latitude + " "+this.proposal_location_longitude);
            //  alert("Mount");
            //  alert(12);
            /* $("#good").prop("checked", true);
             $("#sell").prop("checked", true);

             $("#wish_no_matter_good_service").prop("checked", true);
             $("#wish_no_matter_sell_rent").prop("checked", true);
             this.wished.wished_proposal_type = "Нема значення";
             this.wished.wished_proposal_object = "Нема значення";

             this.form.proposal_type = "Продаж";
               this.form.proposal_object = "Товари";*/
            //    let self = this;
            //  alert(1);
            //    alert(JSON.stringify(self.edit_values));
            //   this.form = self.edit_values;

        },
        methods: {
            edit(e) {

                e.preventDefault();

                var self = this;
                //  alert(JSON.stringify(self.form.wished_items))
                //    alert(JSON.stringify(Object.keys( self.form)))
                //    alert(self.form.wished_items.length)
                $.post({
                    async: true,
                    url: /*"http://127.0.0.1:8000"*/ current_host +"/update/proposal",
                    data: {
                        auth: JSON.stringify(self.auth),
                        wished_items_: JSON.stringify(self.form.wished_items),
                        additional: JSON.stringify(self.additional),
                        content: JSON.stringify(self.form),
                        images_: JSON.stringify(self.images)
                    },
                    dataType: "json",
                    success: function (data) {
                     //   alert("sUCCESS")
                        self.res = data;
                        window.location = "/proposals";
                    },
                    error: function (e) {

                         Swal.fire({
                      //      title: "Варіантів нема",
                            text:  e.responseJSON.answer === undefined? "Виникли помилки спробуйте будь ласка пізніше" :e.responseJSON.answer, // "Попробуйте будь ласка пізніше",
                            icon: 'info',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',

                        })
                      //  alert("eFFr" + JSON.stringify(e))
                    }
                });

            },
            Set_Category(e) {
                //   alert(e);
                this.form.category = e;
                //  alert(JSON.stringify(e))
            },
            Set_Tags(e) {
                //   alert(JSON.stringify(e));
                this.form.search_tags = e;
            },
            AddImages(e) {
                this.images = e;
            },
            UpdateLccation(location, str_description) {
                //    alert(JSON.stringify(location));
                this.form.location = {
                    "lat": location.lat,
                    "long": location.lng,
                    "str_description": str_description

                };
                // alert(JSON.stringify(location));
                //this.form.proposal_location_latitude = location.lat;
                //  this.form.proposal_location_longitude = location.lng;
            },
            /*
            wished_items": [ { "query_creator_id": 1, "query_description_text": "НОва ", "category": { "category": "Запчастини для транспорту", "subcategory": "Запчастини для спец / с.г. техніки" }, "query_description_tags": [ { "title": "of1" }, { "title": "options" } ],
            */
            add_wished_objects_on_create_(e) {
                // alert(JSON.stringify(e))
                //  alert(JSON.stringify( this.form.wished_items))
                //   alert("324")
                this.form.wished_items = e;/*e.forEach(el => {
                return {wished_description: el.query_description_text,wished_proposal_type: el.proposal_item_type,
                    wished_proposal_category: el.category, wished_proposal_tags: el.query_description_tags.map(a => a.title)  };

                });*/
              //  alert(JSON.stringify(this.form.wished_items))
                // alert(JSON.stringify( this.form.wished_items))
                //  alert(1)
                // alert(this.form.wished_items);
            },
            changeBack() {
                //   alert(this.form.add_wished);
                if (!this.form.add_wished) {
                    this.visible_ = false;
                    this.form.add_wished = true;
                } else {
                    this.form.add_wished = false;
                }

                // alert(this. form.add_wished);
            },
            Back() {
                this.visible_ = true;
                this.form.add_wished = true;
            },
            go_back() {
                this.$emit("go_back");
            }
            /*    changeBack(){
                     //   alert("fr");
                       // alert(this.visible_)
                        this.visible_ = !this.visible_;
                            //   alert(this.visible_)
                },
                    Set_Wished_Tags(t){ this.wished.wished_proposal_tags = t;},
                    Set_Wished_Category(c){ this.wished.wished_proposal_category = c;},
                AddWished(){
                        if ( this.form.wished_objects_description === null)
                             this.form.wished_objects_description = [];
                    this.form.wished_objects_description.push(this.wished)
                },
                    select_wished_(e){
                        alert(JSON.stringify(e));
                    }*/
        }
    }
</script>

<style scoped>

</style>