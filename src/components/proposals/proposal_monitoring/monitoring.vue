<template>
    <div>
      <!--  <p> Моніторинг</p> -->

          <b-form-group>
                            <div class="d-flex justify-content-center">
                                <b-form-radio-group v-model="menu_select">

                                    <b-form-radio name="called_items" value="Створені моніторинги"
                                                  style="margin-right: 10px;">Створені моніторинги
                                    </b-form-radio>
                                    <b-form-radio  name="called_items" value="Створити моніторинг"
                                                  style="margin-right: 10px;">Створити моніторинг
                                    </b-form-radio>

                               <!--      <b-form-radio  name="called_items" value="Результати моніторингу"
                                                  style="margin-right: 10px;">Результати моніторингу
                                    </b-form-radio> -->
                                 <!--   <b-form-radio name="called_items" value="Моніторинг"
                                                  style="margin-right: 10px;">Моніторинг
                                    </b-form-radio> -->
                                </b-form-radio-group>

                            </div>
                        </b-form-group>


        <div v-if="menu_select === 'Створені моніторинги'">
            <created_monitors></created_monitors>
            </div>
     <add_wished  purpose="monitor" v-if="menu_select === 'Створити моніторинг'" v-on:back="Back"
                            v-on:add_wished_objects_on_create="add_wished_objects_on_create_"></add_wished>

    </div>
</template>

<script>
     import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
   import add_wished from "../add_wished.vue"
     import created_monitors from "./created-monitors.vue"
    export default {
        name: "monitoring_",
       components: {add_wished,created_monitors},
        data(){
            return {
                menu_select: "Створити моніторинг",
             //   add_wished: true,
            }
        },
        methods:{
            Back(){
            //    this.add_wished = false;
                this.menu_select = "Створені моніторинги";
            },
            add_wished_objects_on_create_(e){
              //  alert(JSON.stringify(e));
            }
        }

    }
</script>

<style scoped>

</style>