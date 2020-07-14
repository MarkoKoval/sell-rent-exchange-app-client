<template>

</template>
<script>
    /*jshint -W099 */
import axios from 'axios';
export default {
    data() {
        return {
            subscriptions: []
        }
    },
    created() {
       // this.all();
    },
    methods: {
        deleteSubscription: function(subscr) {
            if (confirm('Delete ' + subscr.name)) {
                axios.delete(`http://127.0.0.1:8000/subscriptions/${subscr.id}`)
                    .then( response => {
                        this.all();
                        alert(response);
                    });
            }
        },
        all: function () {
            axios.get('http://127.0.0.1:8000/subscriptions/')
                .then( response => {
                    this.subscriptions = response.data
                });
        }
    },
}
</script>