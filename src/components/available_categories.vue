<template>
    <div>
        <treeselect
                @select="onSelect"
                :multiple="false"
                :options="options"
                :disable-branch-nodes="true"
                v-model="value"


                :show-count="true"
                required
        />
        <!--  maxHeight=250-->
    </div>
</template>

<script>
    import json from './categories.json'
    import {Treeselect} from '@riophae/vue-treeselect'
    // import the styles
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'


    export default {
        name: "available_categories",
        components: {Treeselect},

        data: () => ({
            value: ["ІншеA"],

            options: [ /*{
      id: 'm',
      label: 'McDonalds',
      children: [  {id: 'm-cheeseburger45',
        label: 'French Fries',
      }, {
        id: 'm-cheeseburger',
        label: 'Cheeseburger',
      }, {
        id: 'm-white-cheedar-burger',
        label: 'White Cheddar Burger',
      }, {
        id: 'm-southwest-buttermilk-crispy-chicken-salad',
        label: 'Southwest Buttermilk Crispy Chicken Salad',
      }, {
        id: 'm-cola',
        label: 'Coca-Cola®',
      }, {
        id: 'm-chocolate-shake',
        label: 'Chocolate Shake',
      } ],
    }/*, {
      id: 'kfc',
      label: 'KFC',
      children: [ {
        id: 'kfc-fries',
        label: 'French Fries',
      }, {
        id: 'kfc-chicken-litties-sandwiches',
        label: 'Chicken Litties Sandwiches',
      }, {
        id: 'kfc-grilled-chicken',
        label: 'Grilled Chicken',
      }, {
        id: 'kfc-cola',
        label: 'Pepsi® Cola',
      } ],
    }, {
      id: 'bk',
      label: 'Burger King',
      children: [ {
        id: 'bk-chicken-fries',
        label: 'Chicken Fries',
      }, {
        id: 'bk-chicken-nuggets',
        label: 'Chicken Nuggets',
      }, {
        id: 'bk-garden-side-salad',
        label: 'Garden Side Salad',
      }, {
        id: 'bk-cheeseburger',
        label: 'Cheeseburger',
      }, {
        id: 'bk-bacon-king-jr-sandwich',
        label: 'BACON KING™ Jr. Sandwich',
      }, {
        id: 'bk-cola',
        label: 'Coca-Cola®',
      }, {
        id: 'bk-oreo-chocolate-shake',
        label: 'OREO® Chocolate Shake',
      } */],
            //} ],
        }),

        mounted() {
            const alp = ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'X', 'Z', 'W', 'Y']
            for (var i in json) {
                var child = [];
                //alert(json[i]);
                for (var j = 0; j < json[i].length; j++) {
                    child.push({id: i + alp[j], label: json[i][j]})
                }
                this.options.push({
                    id: 'm',
                    label: i, children: child
                });
                //alert(i);
            }
            // alert(JSON.stringify(this.options));
            //  alert("Cat");
            this.$emit("select-category", {category: "Інше", subcategory: "Інше"});
        },

        methods: {
            onSelect(e) {
                //   alert();
                //    alert(JSON.stringify(e));
                /*   if (this.value.length !== 0)
                       this.value = [];.*/
                //    alert(JSON.stringify(e));
                //   alert(JSON.stringify(this.value));
                //      alert(e.id);
                var res = {category: e.id.slice(0, -1), subcategory: e.label};
                this.$emit("select-category", res);
            },


        }
    }
</script>

<style scoped>

</style>