<template>
    <div>

          <div class="form-group" invisible >
    <label for="exampleInputPassword1">Course categories</label>
    <input type="text"  id="exampleInputPassword1" name = "tags" placeholder="Enter category" >
      <small id="emailHelp" class="form-text text-muted">course categories tags that will helpful for course promotion.</small>

  </div>

    </div>
</template>

<script>
    import "./bootstrap.min.css"
    import "./selectize.css"
    import "./popper.min.js"
    import "./jquery-3.3.1.slim.min.js"
    import "./bootstrap.min.js"
    import "./selectize.js"
    export default {
        name: "s",
        data(){
          return {

              $select : null,
          }
        },
        created(){
            this.$select =  $('#exampleInputPassword1').selectize({
                maxItems: 3,
                color: "blue",
                persist: false,
                plugins: ['remove_button'],
                values:[{text:'cat',value:'cat'},{text:'dog',value:'dog'},{text:'snake',value:'snake'}],
                create: function(input) {

                    return {
                        value: input,
                        text: input
                    }
                },
                 createFilter: function(input) { return input.length <= 10 ; },
                onChange: function(value) {
                 //  alert(value);
                 //  alert(typeof value)
                  alert(  typeof $('#exampleInputPassword1')[0].selectize.items);
               }
           });


        }
    }
</script>

<style scoped>

</style>