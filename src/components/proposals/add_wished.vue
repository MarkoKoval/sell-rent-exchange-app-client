<template>
    <div  style="margin-left: 5vw; margin-right: 5vw;">
        <div class="row">

            <button v-if="purpose_ !== 'monitor'" class="btn-sm btn-primary" v-on:click="Back"
                    style="margin-left: 10px; margin-bottom: 5px;" data-toggle="tooltip" title="Назад"> <i class="fas fa-undo-alt"></i>
            </button>
        </div>
        <keep-alive>
            <!-- purpose="monitor" -->
         <!--   <selectize_ v-if="purpose_ !== 'monitor'" need="my_previous_created_wishes"
                        v-bind:place="select_cat_placeholder" placeholder="sm" v-on:change_tag="Set_Tags"></selectize_> -->
        </keep-alive>
        <form  @submit="AddWished" >
        <b-form-group
                description="введіть опису пропозиції максимум 1000 символів.">
            <b-form-textarea
                    id="textarea-default"
                    placeholder="Опис пропозиції"
                    v-model="wished.wished_description"
                    minlength="5"
                    maxlength="1000"
                    required
            ></b-form-textarea>

        </b-form-group>

        <b-form-group description="оберіть тип об'єкта пропозиції.">
            <div class="d-flex justify-content-start">
                <b-form-radio-group v-model="wished.proposal_item_type">

                    <b-form-radio name="wished_proposal_object" value="Товари"
                                  style="margin-right: 10px;">Товари
                    </b-form-radio>
                    <b-form-radio name="wished_proposal_object" value="Послуги">Послуги
                    </b-form-radio>
                    <b-form-radio name="wished_proposal_object" value="Нема значення">Нема значення
                    </b-form-radio>
                </b-form-radio-group>
            </div>


        </b-form-group>

        <!--   <b-form-group description="оберіть вид пропозиції." >
               <div class="d-flex justify-content-start">
                                  <b-form-radio-group  v-model="wished.wished_proposal_type">

                   <b-form-radio  name="wished_proposal_type" value="Продаж" style="margin-right: 10px;">Продаж
                   </b-form-radio>
                   <b-form-radio   name="wished_proposal_type" value="Обмін" style="margin-right: 10px;">Обмін
                   </b-form-radio>
                   <b-form-radio  name="wished_proposal_type" value="Оренда" style="margin-right: 10px;">Оренда
                   </b-form-radio>
                                        <b-form-radio  id="wish_no_matter_sell_rent" name="wished_proposal_type" value="Нема значення">Нема значення
                       </b-form-radio>
                                          </b-form-radio-group>

               </div>
           </b-form-group> -->

   <b-form-group>
            <keep-alive>
                <available_categories v-on:select-category="Set_Category"></available_categories>

            </keep-alive>
        </b-form-group>

        <b-form-group>
            <keep-alive>
                <selectize_                 v-bind:place = "tag_desc"  v-on:change_tag="Set_Wished_Tags"/>
            </keep-alive>
        </b-form-group>
         <b-form-group class = "d-flex justify-content-end">
            <button class="btn-sm btn-primary"  type="submit"
                    style="margin-left: 10px; margin-bottom: 5px;">Додати
            </button>
             </b-form-group>
        </form>
        <div class="row">
            <div v-for="el in  wished_objects_description" class="col-sm-12 d-flex justify-content-around"
                 style="margin-bottom: 5px; width: 100px">
             <!--   <p>4 {{el}}</p> -->
                <div class="card w-75">

                    <div class="card-body ">
                        <p class="card-text">
                            {{ el.wished_description|restict}}
                        </p>


                       <div class="row">
                        <!--   <p>ffff {{el.wished_proposal_category }}</p> -->
                             <a href="#"  v-if="el.wished_proposal_category !== null"    style="margin-top: 5px; margin-right: 5px;  margin-left: 5px; height: 20px; " class="badge badge-primary">{{el.wished_proposal_category.category}}/{{el.wished_proposal_category.subcategory}}</a>
                            <!-- <a href="#"  v-if="el.proposal_item_type !== null"    style="margin-top: 5px; margin-right: 5px;  margin-left: 5px; height: 20px; " class="badge badge-primary">{{el.proposal_item_type}}</a> -->
                           <a href="#"  v-if="el.wished_proposal_type !== null"    style="margin-top: 5px; margin-right: 5px;  margin-left: 5px; height: 20px; " class="badge badge-primary">{{el.wished_proposal_type}}</a>


                            <div  v-if="el.wished_proposal_tags !== null" v-for="e in el.wished_proposal_tags">

                                <a href="#" class="badge badge-primary"
                                   style="margin-right: 5px;  margin-left: 5px; height: 20px; margin-bottom: 5px;">{{e}}</a>

                            </div>
                           <!--     <a href="#"     style="margin-right: 5px;  margin-left: 5px; height: 20px; margin-bottom: " class="badge badge-primary">{{el.proposal_item_type}}</a>-->

                        </div>
                        <div class="d-flex justify-content-end">
                            <button v-on:click="deleter(el.wished_description)" class="btn btn-danger"
                                    style="margin-right: 5px; margin-top: 5px; margin-left: 5px;"><i class="fas fa-trash"></i>  <!--Видалити-->
                            </button>

                        </div>
                    </div>

                </div>

            </div>
        </div>
      <!--      <p><p>
        <p>{{wished.wished_proposal_category}}</p>
        <p>{{ wished}}</p>
        <p>{{ wished_objects_description}}</p>
        <p>{{wished_objects_description}}</p>-->
    </div>

</template>

<script>
    import Swal from 'sweetalert2/dist/sweetalert2.js'

    import 'sweetalert2/dist/sweetalert2.css'
    import search from "./search.vue"
  //  import $ from "jquery"
    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import tree_select2 from "../three_select/tree_select2.vue"
    //import selectize_ from "../selectize_.vue"
    import selectize_ from "./proposal_requests/selectize_.vue"

    import available_categories from "./categories/available_categories.vue"

    export default {
        name: "add_wished",
        components: {available_categories ,selectize_, tree_select2, search},
        props: ["purpose","wished_"],
        filters: {
            restict: function (value) {

                return value.length > 20 ? value.substring(0, 20) + "...." : value
            }
        },
        watch: {
            wished:{
                handler:function (e) {
                //    var
                this.wished.wished_proposal_type =    this.wished.proposal_item_type;
            //    this.proposal_item_type = e
            //    alert(e)
                },
                deep: true,
            }
        },
        data() {
            return {

                place:"бажані теги",
                temp: "",
                purpose_: this.purpose,
                wished: {
                    wished_description: "",
                    wished_proposal_type: "Нема значення",
                    proposal_item_type: "",
                    wished_proposal_tags: null,
                    wished_proposal_category:  { "category": "Інше", "subcategory": "Інше" } ,

                },
                wished_objects_description: [],

                select_cat_placeholder: "Попердньо бажаний описаний товар чи послугу",
            }
        },
        create() {
            //         alert(1+"wished");
        },
        mounted() {
            //alert(2+"wished");
            this.wished.wished_proposal_type = "Нема значення";
            this.wished.proposal_item_type = "Нема значення";
            var i = this.wished_;
            if( i !== undefined){
                this.wished_objects_description = i;
            }
               /* for (var j = 0 ; i.length; j++) {
                alert(JSON.stringify(i[j]))
                    this.wished_objects_description.push({
                        wished_description: i[j].query_description_text,
                        //  wished_proposal_type: "Нема значення",
                        proposal_item_type: i[j].proposal_item_type,
                        wished_proposal_tags: i[j].query_description_tags.map(el => el.title),
                        wished_proposal_category: i[j].category,

                    })
                }*/

            //alert(i);
        },
        methods: {

            Set_Wished_Tags(t) {
                this.wished.wished_proposal_tags = t;
            },
            Set_Wished_Category(c) {

                this.wished.wished_proposal_category = c;
            },
            AddWished(e) {
              //  alert(1);
                e.preventDefault();
                if (this.wished_objects_description.length < 5) {
                    this.wished_objects_description.push(JSON.parse(JSON.stringify(this.wished)));
                    this.$emit("add_wished_objects_on_create", this.wished_objects_description);
                } else {
                    Swal.fire({
                        title: 'Більше 5 опцій не можна',
                        icon: 'warning',
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Ок'
                    }).then((result) => {

                    })
                }
            },
            select_wished_(e) {
                // alert(JSON.stringify(e));
            },
            Set_Tags(e) {
                this.wished.wished_proposal_tags = e;
            },
            Back() {
                this.$emit('back')
            },
            deleter(e) {
                this.wished_objects_description = this.wished_objects_description.filter(el => el.wished_description !== e);
           //     alert(JSON.stringify(this.wished_objects_description))
              //  this.$emit("add_wished_objects_on_create", this.wished_objects_description);
            },
            sub(e){
                e.preventDefault();
            },
            Set_Category(c){
                   this.wished.wished_proposal_category = c;
            }
        }

    }
</script>

<style scoped>

</style>