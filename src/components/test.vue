<template>
  <div>


    <multiselect

        class="selectbox-scrollable"
              :multiple="true"
  :taggable="true"
      v-model="selected"
      :options="options"
    @tag="addTag"
  placeholder="Описові теги"
                @input="updateSelected"
    >
    </multiselect>


      <p>{{   selected}}</p>
  </div>
</template>
<style>

.selectbox-scrollable::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;
  background-color: #F5F5F5;
}

.selectbox-scrollable::-webkit-scrollbar
{
  width: 12px;
  background-color: #F5F5F5;
}

.selectbox-scrollable::-webkit-scrollbar-thumb
{
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #555;
}
</style>
<script>
  import Multiselect from 'vue-multiselect'
  export default {
      name:"test",
    components: { Multiselect },
    data () {
      return {
        selected: ['of', "df"],
        options: ['list', 'of', 'options','list', 'of1', 'options1','list1', 'of2', 'options2','list2', 'of3', 'optio3ns']
      }
    },
      methods: {
          addTag(e){
          //    alert(e);
              if (this.selected.length < 5){
                  if (e.length < 50 &&  this.selected.indexOf(e) === -1){
                   //   alert(1);
                      this.selected.push(e);
                  }else{
                     // alert(2);
                  }
              }
          },
          updateSelected(e){
          //    alert(e);
              if (this.selected.length > 5){

                this.selected.pop();
              }
          }
      }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>