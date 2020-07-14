<template>
    <div>
        <div class="container p-3 my-3 border c">
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                <b-tabs v-model="form.selected" content-class="mt-3" fill>
                    <b-tab v-on:click="onChange(1)" title="Cтворення" active>
                        <b-form-group
                                id="input-group-1"
                                label-for="input-1"
                                description="введіть заголовок для опису пропозиції максимум 130 символів.">
                            <b-form-input
                                    id="input-1"
                                    v-model="form.email"
                                    type="email"
                                    required
                                    placeholder="Введіть заголовок"
                            ></b-form-input>

                        </b-form-group>

                        <b-form-group
                                description="введіть опису пропозиції максимум 10000 символів.">
                            <b-form-textarea
                                    id="textarea-default"
                                    placeholder="Опис пропозиції"
                            ></b-form-textarea>
                        </b-form-group>

                        <b-form-group description="оберіть тип об'єкта пропозиції.">
                            <div class="d-flex justify-content-start">
                                <b-form-radio v-model="selected" name="some-radios" value="Товари"
                                              style="margin-right: 10px;">Товари
                                </b-form-radio>
                                <b-form-radio v-model="selected" name="some-radios" value="Послуги">Послуги
                                </b-form-radio>
                            </div>
                        </b-form-group>

                        <b-form-group description="оберіть вид пропозиції.">
                            <div class="d-flex justify-content-start">
                                <b-form-radio v-model="selected" name="some-radios" value="Товари"
                                              style="margin-right: 10px;">Продаж
                                </b-form-radio>
                                <b-form-radio v-model="selected" name="some-radios" value="Послуги"
                                              style="margin-right: 10px;">Обмін
                                </b-form-radio>
                                <b-form-radio v-model="selected" name="some-radios" value="Послуги"
                                              style="margin-right: 10px;">Оренда
                                </b-form-radio>
                            </div>
                        </b-form-group>

                        <b-form-group>
                            <tree_select2 v-on:select-category="Set_Category"/>
                        </b-form-group>

                        <b-form-group>
                            <selectize_/>
                        </b-form-group>

                        <b-form-group id="input-group-3" label-for="input-3">
                            <div class="d-flex justify-content-around">
                                <b-form-select
                                        id="input-3"
                                        v-model="form.state"
                                        :options="state"
                                        required
                                        style="margin-right: 5px;margin-left: 5px"
                                ></b-form-select>
                                <b-form-select
                                        id="input-3"
                                        v-model="form.state"
                                        :options="state"
                                        required
                                        style="margin-right: 5px;margin-left: 5px"
                                ></b-form-select>

                                <b-form-select
                                        id="input-3"
                                        v-model="form.state"
                                        :options="state"
                                        required
                                        style="margin-right: 5px;margin-left: 5px"
                                ></b-form-select>
                            </div>
                        </b-form-group>
                        <b-form-group>
                            <div class="d-flex justify-content-around">
                                <b-form-input style="margin-right: 5px;margin-left: 5px" placeholder="Введіть ціну"
                                              type="number" step="0.01" min="0.00" max="1000.00"/>

                                <b-form-select

                                        v-model="form.currency"
                                        :options="currencies"
                                        style="margin-right: 5px;margin-left: 5px"
                                        required
                                ></b-form-select>

                                <b-form-select
                                        v-model="form.rent_time"
                                        :options="rent_time"
                                        style="margin-right: 5px;margin-left: 5px"
                                        required
                                ></b-form-select>

                            </div>
                        </b-form-group>

                        <b-form-group id="input-group-5">
                            <div class="d-flex justify-content-start">
                                <b-form-checkbox v-model="form.add_images" style="margin-left: 5px; margin-right: 5px;">
                                    Додати фото
                                </b-form-checkbox>
                                <br/>
                                <b-form-checkbox v-model="form.add_location"
                                                 style="margin-left: 5px; margin-right: 5px;">Долати локацію
                                </b-form-checkbox>

                            </div>
                        </b-form-group>


                        <b-form-group id="input-group-6"
                                      description="додайте фото для опису пропозиції ліміт 10 фото">
                            <div class="d-flex justify-content-around">
                                <img_up :dat="form.name" v-if="form.add_images"
                                        v-on:update-item="onUpdateItem"></img_up>
                                <img_up :dat="form.name" v-if="form.add_location"
                                        v-on:update-item="onUpdateItem"></img_up>

                            </div>
                        </b-form-group>
                        <b-button type="submit" variant="primary" style="margin-right: 10px">Створити</b-button>
                        <b-button type="reset" variant="danger">Очистити</b-button>
                    </b-tab>

                    <b-tab v-on:click="onChange(2)" title="Cтворені">
                        <p>"Cтворені"</p>
                    </b-tab>
                    <b-tab v-on:click="onChange(3)" title="Запитувані">
                        <p>"ЗЗапитувані"</p>
                    </b-tab>
                    <b-tab v-on:click="onChange(4)" title="Збережені">
                        <p>"Збережені"</p>


                        <div class="card w-75">
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">With supporting text below as a natural lead-in to additional
                                    content.</p>
                                <a href="#" class="btn btn-primary">Button</a>
                            </div>
                        </div>

                        <div class="card w-50">
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">With supporting text below as a natural lead-in to additional
                                    content.</p>
                                <a href="#" class="btn btn-primary">Button</a>
                            </div>
                        </div>

                    </b-tab>
                </b-tabs>

            </b-form>
            <!--    <b-card class="mt-3" header="Form Data Result">
                    <pre class="m-0">{{ form }}</pre>
                </b-card>
                <button v-on:click="up()">Upload</button> -->
            <p>{{form}}</p>


        </div>
        <!-- <loc  v-if="form.add_location"  v-on:update-item="UpdateLocation" /> -->
        <!--                <loc  v-if="form.add_location"  v-on:update-item="onUpdateItem" v-on:close-map="setA"/> -->

        <!--<selectize_/>-->
    </div>
</template>
<style>
    selected form {

    }

    .c {

        max-width: 700px;
        border: 1px black;
        border-radius: 10px;
        padding-bottom: 10px;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 10px;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    }


</style>
<script>
    import selectize_ from "../selectize_.vue"
    import tree_select2 from "../three_select/tree_select2.vue"
    import loc from "../location_user/loc.vue";
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import img_up from "../image_upload/image_upload.vue"
    //import  tag_search_select from  "../tag_search_select/tag_search_select.vue"
    import axios from "axios"
    import $ from "jquery"

    export default {
        name: 'PhoneNumberLine',
        components: {img_up, loc, tree_select2, selectize_},
        data() {
            return {

                form: {
                    category: "",
                    add_images: false,
                    add_images2: false,
                    tabIndex: 0,
                    email: '',
                    name: 'grgeg',
                    food: null,
                    state: null,
                    checked: [],
                    images_files: null,
                    add_search_tags: false,
                    add_location: false,
                    currency: null,
                    rent_time: null,
                },
                rent_time: [{text: 'Одиниця часу оренди', value: null}, 'Хвилина', 'Година', 'День', 'Місяць', 'Рік'],
                currencies: [{text: 'Валюта', value: null}, 'Гривня', 'Dollar', 'Euro'],
                foods: [{text: 'Select One', value: null}, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
                state: [{text: "Виберіть стан", value: null}, "Новий", "Вживаний"],

                show: true
            }
        },
        watch: {
            /*  selected(value) {
                    alert(value);
              }*/
        },
        methods: {
            setA() {
                //     alert("c");
                this.form.add_location = false;
            },
            onUpdateItem(e) {
                //  alert(JSON.stringify( e));
                this.form.images_files = e;
            },
            onChange(e) {
                this.form.tabIndex = e;
            },
            selected(value) {
                alert(value);
            },
            upload() {

                /*     axios
           .post("http://127.0.0.1:8000/upload_image/", {
         username: "passw",
         password: "fewfwe"
       })
           .then(response => {
             this.form.email  = response.data;
            // alert(response);
             return response;
           })
           .catch(error => {
     return "error";
           })
           .finally(() => {return "sss";});*/
                var vm = this;
                /*  $.post({
                      async: false,
                      url: "http://127.0.0.1:8000/upload_image/",
                      data: {"get_d":JSON.stringify({"images": vm.form.images_files })},
                      dataType: "json",

                    //  contentType: 'application/json',
                      success: function (data) {
                          alert(JSON.stringify(data));

                          vm.form.email = data;
                          return data+"ff";
                      },
                      error: function (e) {
                          console.log(JSON.stringify(e));

                      }
                  });*/


            },

            async up() {
                //   alert(31);
                await this.upload();
                // alert("i "+i);
                /*  $.when( this.upload()).done((e) => {
                      alert("done");
                      alert("e "+JSON.stringify(e));
                  });*/

                //   alert("w3");
                //  alert(JSON.stringify(this.form))

                // const res =  this.upload();
                //  alert("res "+JSON.stringify(res) );
            },
            UpdateLocation(e) {
                alert(JSON.stringify(e));
            },
            onSubmit(evt) {
                evt.preventDefault()
                alert(JSON.stringify(this.form))

                // const res = this.upload();
                //   alert("res " + JSON.stringify(res));
            },
            Set_Category(e) {
                this.form.category = e;
            },
            onReset(evt) {
                evt.preventDefault()
                // Reset our form values
                this.form.email = ''
                this.form.name = ''
                this.form.food = null
                this.form.checked = []
                // Trick to reset/clear native browser form validation state
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            }
        }
    }
</script>
