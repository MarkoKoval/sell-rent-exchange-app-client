<template>

    <div class="pt-5">
        <form @submit.prevent="create" method="post">
           <div class="form-group">
                <label for="name">Name</label>
                 <!-- type="text"
                    class="form-control"
                    id="name"
                    v-model="subscription.name"
                    name="name"
                    placeholder="Enter name"
                    :class="{'is-invalid': errors.has('subscription.name') && submitted}">
                    -->
               <input
                     type="text"
                    class="form-control"
                    id="name"
                    v-model="subscription.name"
                    name="name"
                    placeholder="Enter name"
                     required
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
    created() {
       alert("create");
    },
    methods: {
        create: function (e) {
         //   alert('RRR');
            console.log(e);
        /*   this.$validator.validate().then(result => {
                this.submitted = true;
                if (!result) {
                    return;
                }
                console.log(this.currency)
                axios
                    .post('http://127.0.0.1:8000/subscriptions/',
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