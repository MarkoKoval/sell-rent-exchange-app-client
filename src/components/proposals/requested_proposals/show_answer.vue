<template>
    <div>

                <b-form    @submit="create_new_proposal"  style="margin-top: 10px; margin-left: 15vw;  margin-right: 15vw;">
    <div v-show="visible_">

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


                <b-form-select
                           v-if="form.proposal_type === 'Оренда' || form.proposal_type === 'Продаж'"
                        v-model="form.item_price_currency"
                        :options="currencies"
                        style="margin-right: 5px;margin-left: 5px;width: 120px"

                ></b-form-select>



         <div>
  </div>

        <p>{{form}}</p>
        <p>{{form.wished_items}}</p>
    </div>
    <div>
       <!-- <p>Por</p>
                <p>{{form}}</p> -->
    </div>

    </b-form>

      <!--  <datetime_picker></datetime_picker> -->
    </div>
</template>

<script>
    import datetime_picker from "../datetime_picker.vue"

    export default {
        name: "show_answer",
        components: {datetime_picker},
        methods: {
            create_new_proposal(e) {

            }
        }

    }
</script>

<style scoped>

</style>