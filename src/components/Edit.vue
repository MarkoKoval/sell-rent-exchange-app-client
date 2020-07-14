<template>
    <div class="pt-5">
        <form @submit.prevent="update" method="post">
            <div class="form-group">
                <label for="name">Name</label>
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    v-model="subscription.name"
                    required
                    name="name"
                    placeholder="Enter name"
                    >
                <div class="invalid-feedback">
                    Please provide a valid name.
                </div>
            </div>
            <div class="form-group">
                <label for="currency">Currency</label>
                <select
                    name="currency"
                    class="form-control"
                    required
                    id="currency"
                    v-model="subscription.currency"
                    >
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                </select>
                <div class="invalid-feedback">
                    Please provide a valid currency.
                </div>
            </div>
            <div class="form-group">
                <label for="amount">Amount</label>
                <input
                    type="number"
                    name="amount"
                    required
                    class="form-control"
                    id="amount"
                    v-model="subscription.amount"
                    placeholder="Enter amount"
                    >
                <div class="invalid-feedback">
                    Please provide a valid amount.
                </div>
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea
                    name="description"
                    class="form-control"
                    id="description"
                    required
                    v-model="subscription.description"
                    cols="30"
                    rows="2"
                    ></textarea>
                <div class="invalid-feedback">
                    Please provide a valid description.
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>
<script>
    /*jshint -W099 */
import axios from 'axios';
export default {
    data() {
        return {
            subscription: {
                name: '',
                currency: '',
                amount: '',
                description: '',
            },
            submitted: false
        }
    },
    mounted() {
        /*axios.get('http://127.0.0.1:8000/api/subscriptions/' + this.$route.params.id)
            .then( response => {
                console.log(response.data)
                this.subscription = response.data
            });*/
    },
    methods: {
        update: function (e) {
            console.log(e);
            /*this.$validator.validate().then(result => {
                this.submitted = true;
                if (!result) {
                    return;
                }
                axios
                    .put(`http://127.0.0.1:8000/subscriptions/${this.subscription.id}/`,
                        this.subscription
                    )
                    .then(response => {
                        this.$router.push('/');
                        console.log(response);
                    })
            });*/
        }
    },
}
</script>