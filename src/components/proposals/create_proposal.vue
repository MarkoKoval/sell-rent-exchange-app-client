<template>
    <div>
  <!--      <p>{{auth.token}}</p>
        <p>{{auth.is_blocked_by_admin }}</p> -->
    <div v-if="auth.token && auth.is_blocked_by_admin === 'false'">
        <!--<p>{{auth}}</p> -->
    <div>
           <b-form-group>
                            <div class="d-flex justify-content-center" style="margin-top: 20px">
                                <b-form-radio-group v-model="called_items">

                                    <b-form-radio name="called_items" value="Cтворення"
                                                  style="margin-right: 10px;">Cтворення
                                    </b-form-radio>
                                    <b-form-radio  name="called_items" value="Cтворені"
                                                  style="margin-right: 10px;">Cтворені
                                    </b-form-radio>
                                    <b-form-radio name="called_items" value="Запитувані"
                                                  style="margin-right: 10px;">Запитувані
                                    </b-form-radio>
                                      <b-form-radio name="called_items" value="Збережені"
                                                  style="margin-right: 10px;">Збережені
                                    </b-form-radio>
                                </b-form-radio-group>

                            </div>
         </b-form-group>

        <b-form    @submit="create_new_proposal"  style="margin-top: 10px; margin-left: 15vw;  margin-right: 15vw;">
    <div v-show="visible_">
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
                    minlength="5"
                     maxlength="130"
            ></b-form-input>
        </b-form-group>
        <b-form-group
                description="введіть опису пропозиції максимум 10000 символів.">
            <b-form-textarea
                    id="textarea-default"
                    placeholder="Опис пропозиції"
                    v-model="form.description"
                    required
                      minlength="5"
                     maxlength="10000"
            ></b-form-textarea>
        </b-form-group>
        <b-form-group description="оберіть тип об'єкта пропозиції.">
            <div class="d-flex justify-content-start">
                <b-form-radio-group  v-model="form.proposal_item_type">

                    <b-form-radio  id="good"  checked name="proposalobject" value="Товари"
                                  style="margin-right: 10px;">Товари
                    </b-form-radio>
                    <b-form-radio  name="proposalobject" value="Послуги">Послуги
                    </b-form-radio>

                </b-form-radio-group>
            </div>
        </b-form-group>
        <b-form-group description="оберіть вид пропозиції." >
            <div class="d-flex justify-content-start">
                               <b-form-radio-group  v-model="form.proposal_type">

                <b-form-radio  id="sell" name="proposal_type" value="Продаж" style="margin-right: 10px;">Продаж
                </b-form-radio>
                <b-form-radio   name="proposal_type" value="Обмін" style="margin-right: 10px;">Обмін
                </b-form-radio>
                <b-form-radio  name="proposal_type" value="Оренда" style="margin-right: 10px;">Оренда
                </b-form-radio>
                                       </b-form-radio-group>
            </div>
        </b-form-group>

        <b-form-group>
              <keep-alive>
                       <available_categories v-on:select-category="Set_Category"></available_categories>

         <!--   <tree_select2  v-on:select-category="Set_Category"/> -->
        </keep-alive>
        </b-form-group>

       <b-form-group>
             <keep-alive>
            <selectize_   v-bind:place = "tag_desc" v-on:change_tag="Set_Tags"/>
       </keep-alive>
        </b-form-group>


       <b-form-group>
            <div class="d-flex justify-content-start">
            <!--    <b-form-input style="margin-right: 5px;margin-left: 5px; width: 20%" placeholder="Введіть ціну" type="number"
                              step="0.01" min="0.00" max="1000.00"/> -->
                  <vue-numeric-input  required text-align='center'  style="width: 220px;height: 30px"  :precision="3" placeholder="кількість пропозицій" v-model="form.available_items" :min="1"  :max="1000000000" :step="1"></vue-numeric-input>
                  <vue-numeric-input  v-if=" form.proposal_type !== 'Обмін'" required  text-align='center'  style="width: 120px;height: 30px; margin-left: 5px;"  :precision="3" placeholder="ціна" v-model="form.item_price_value

"   :max="1000000000" ></vue-numeric-input>


                <b-form-select
                           v-if="form.proposal_type === 'Оренда' || form.proposal_type === 'Продаж'"
                        v-model="form.item_price_currency"
                        :options="currencies"
                        style="margin-right: 5px;margin-left: 5px;width: 120px"

                ></b-form-select>

<b-form-select
        v-if="form.proposal_item_type === 'Товари'"
                        v-model="form.proposal_item_state"
                        :options="state"
                        style="margin-right: 5px;margin-left: 5px;width: 15%"

                ></b-form-select>

                                <div v-if="form.proposal_type === 'Оренда'">
                <b-form-select

                        v-model="form.rent_time"
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


                <b-form-checkbox v-model="form.add_images" style="margin-left: 5px; margin-right: 5px;">Додати фото
                </b-form-checkbox>
                <br/>
                <b-form-checkbox v-model="form.add_location" style="margin-left: 5px; margin-right: 5px;">Додати
                    локацію
                </b-form-checkbox>

                <b-form-checkbox v-model="form.use_user_location" style="margin-left: 5px; margin-right: 5px;">Використати
                    локацію встановлену у профілі
                </b-form-checkbox>

                <b-form-checkbox v-if="form.proposal_type === 'Обмін'" v-model="form.add_wished" style="margin-left: 5px; margin-right: 5px;" v-on:change ="changeBack">Додати
                  опис бажаних об'єктів на обмін
                </b-form-checkbox>
            </div>
        </b-form-group>


       <b-form-group id="input-group-6"
                      description="додайте фото для опису пропозиції ліміт 10 фото">
            <div class="d-flex justify-content-around">
                  <keep-alive>
                <img_up :dat="form.name" v-if="form.add_images" v-on:update-item="AddImages"></img_up>
                 </keep-alive>
              <!--      <p>{{form.add_location}}</p> -->


             <loc :dat="form.name" v-if="form.add_location" v-on:update-item="UpdateLccation"></loc>

            </div>
        </b-form-group>



        <b-button  type="submit" variant="primary" style="margin-right: 10px">Створити</b-button>
         <div>
  </div>

        <!--<p>{{form}}</p>
        <p>{{form.wished_items}}</p> -->
    </div>
    <div>
       <!-- <p>Por</p>
                <p>{{form}}</p> -->
<keep-alive>
        <add_wished v-if="!visible_" v-on:back="Back"  v-on:add_wished_objects_on_create="add_wished_objects_on_create_"></add_wished>
  </keep-alive>

    </div>

    </b-form>
    </div>
    <!--    <div  v-if="res !== null">
        <div v-for="i in res.proposals">
        <p>{{typeof (i)}}{{ JSON.stringify(i, null,4)}}</p>
        </div>
         </div>-->
    </div>
    <div v-if="auth.token && auth.is_blocked_by_admin  === 'true'">

         <h4 align="center" style="margin-top: 500px"> Наразі не можна створити пропозицію через блокування</h4>
        </div>
     <div v-if="!auth.token">
        <h4 align="center" style="margin-top: 500px"> Пройдіть авторизацію</h4>
    </div>
    </div>
</template>

<script>
           import current_host from "../get_api_host.js"

   // const prettyPrintJson = require('pretty-print-json');
    import available_categories from "./categories/available_categories.vue"
    import Swal from 'sweetalert2/dist/sweetalert2.js'

    import 'sweetalert2/dist/sweetalert2.css'

    import search from "./search.vue"
    import $ from "jquery"
    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
        import tree_select2 from "../three_select/tree_select2.vue"
   // import selectize_ from "../selectize_.vue"
    import selectize_ from "./proposal_requests/selectize_.vue"
    import img_up from "../image_upload/image_upload.vue"
    import loc from "../location_user/loc.vue"
    import VueNumericInput from 'vue-numeric-input'
    import  add_wished from "./add_wished.vue"
    import get_current_auth from "../get_current_auth.js"
    export default {
        name: "create_proposal",
        components: {available_categories,add_wished,search,tree_select2,selectize_,img_up,loc,VueNumericInput},
        props: ["form_init"],
          watch: {called_items: function (new_,old_) {
               //alert(new_);
              //  alert(old_);
                if(new_ !== old_){
                  //  alert(new_);
                    //alert(new_)
                    if(new_ === "Cтворені"){
                      window.location = "/proposals";
                    }
                    else if(new_  === "Запитувані"){
                        window.location = '/proposals/requested';
                    }
                    else if(new_ === "Збережені"){
                    window.location = "/proposals/saved";
                    }
                }
            }},
        data() {
            return {
                auth: {
                    role: localStorage.getItem("role"),
                    id: parseInt(localStorage.getItem("id")),
                    token: localStorage.getItem("token"),
                    name: localStorage.getItem("name"),
                },
                called_items: "Cтворення",
                res: null,
                 images: null,
                form: {
                    title: "",
                    description: "",
                    proposal_type: "",
                   proposal_item_type:"",
                    category:"",
                    search_tags: null,
                       proposal_item_state:  "Новий",
                    item_price_currency:  'Гривня',
                    rent_time: null,
                    add_images: false,
                    add_location: false,
                   // images: null,
                    add_wished: false,
                    location: null,
                    use_user_location: false,
                  available_items: null,
                    item_price_value: null,

                   wished_items: null,
                      creation_time: "",
                        creator_id : parseInt( localStorage.getItem("id")),
                     proposal_location: "",
                    proposal_location_latitude: 0,
                    proposal_location_longitude: 0,
                },
                wished:{
                 wished_description: "",
                    wished_proposal_type: "",
                    proposal_item_type: "",
                    wished_proposal_tags: null,
                    wished_proposal_category: null,},
              rent_time: [{text: 'Одиниця часу оренди', value: null}, 'Хвилина', 'Година', 'День', 'Місяць', 'Рік'],
                currencies: [ 'Гривня', 'Dollar', 'Euro'],
               /* foods: [{text: 'Select One', value: null}, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
                state: [{text: "Виберіть стан", value: null}, "Новий", "Вживаний"],*/
                      state: [ "Новий", "Вживаний"],
                visible_: true,
                show: true,
                tag_desc: "Описові теги",
            }
        },
        mounted(){
            this.auth =   get_current_auth.get_current_auth();
            $("#good").prop("checked", true);
            $("#sell").prop("checked", true);

            $("#wish_no_matter_good_service").prop("checked", true);
            $("#wish_no_matter_sell_rent").prop("checked", true);
            this.wished.wished_proposal_type = "Нема значення";
            this.wished.proposal_item_type = "Нема значення";

            this.form.proposal_type = "Продаж";
              this.form.proposal_item_type = "Товари";
             this.form.description = "Більше деталей у публікатора..."

              var l = this.form_init;
           //   alert(l);
        },
        methods:{
            Set_Category(e){
             //   alert(13)
            //   alert(e);
                this.form.category = e;
              //  alert(JSON.stringify(e))
            },
            Set_Tags(e){
              //  alert(JSON.stringify(e));
              this.form.search_tags = e;
            },
            AddImages(e){
                this.images = e;
            },
            UpdateLccation(location, str_description){

                this.form.location = {"lat": location.lat,
                    "long": location.lng,
                    "str_description": str_description

                };

            } ,
            add_wished_objects_on_create_(e){
                this.form.wished_items = e;
            },
            changeBack(){
             //   alert(this.form.add_wished);
                if(!this.form.add_wished){
                    this.visible_ = false;
                    this.form.add_wished = true;
                }
                else {
                    this.form.add_wished = false;
                }
            },
            Back(){
                this.visible_ = true;
                                    this.form.add_wished = true;
            },
            create_new_proposal(e){
                e.preventDefault();
           this.auth =   get_current_auth.get_current_auth();
                    var self = this;

                  //  alert(self.images)
                //    alert(1)
                $.post({
                    async: true,
                    url:/* "http://127.0.0.1:8000"*/ current_host +"/create/proposal",
                    data: {auth: JSON.stringify(self.auth), content :JSON.stringify(self.form), images_: JSON.stringify(self.images)},
                    dataType: "json",
                    success: function (data) {
                      window.location = "/proposals";

                        self.res = data;
                    },
                    error: function (e) {
                       /// alert(e.responseJSON.answer)
                        if(e.responseJSON.answer === "Немає прав"){

                             Swal.fire({

                            text: "Ваші права були змінені адміністатором", // "Попробуйте будь ласка пізніше",
                            icon: 'info',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',

                        });
                //    alert("ssss")
                                    // location.reload()
                        }
                      //  alert(JSON.stringify(e));
                          Swal.fire({
                      //      title: "Варіантів нема",
                            text:  e.responseJSON.answer === undefined? "Спробуйте будь ласка пізніше" :e.responseJSON.answer, // "Попробуйте будь ласка пізніше",
                            icon: 'info',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',

                        })

                                //                alert(2)
                         /*    Swal.fire({
                        title: 'Пропозиція створена',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Ок'
                    }).then((result) => {})*/
                         //       alert("eFFr"+JSON.stringify(e))
                    }
                });

            }
        }
    }
</script>

<style scoped>

</style>