<template>
    <div v-if="answer!==null" style="margin-top: 30px;">
        <!--  <p>{{moment(self.answer.sanction_deadline).format('YYYY MM DD hh:mm')}}</p> -->
        <!--   <p>{{answer}}</p> -->

        <!-- <p>{{typeof answer.answer_time}}</p> -->
        <p align="center">{{answer.arbiter.name}}</p>
        <p align="center"> {{answer.approve_complain ? 'Погоджена': 'Відхилена'}}</p>
        <p align="center" v-if="answer.approve_complain  && answer.complain_type === 'users'"> Користувача було
            заблоковано
            <!-- {{answer.sanction_deadline !== null?' до ' +  moment(self.answer.sanction_deadline).format('YYYY MM DD hh:mm') : ''}}--> </p>
        <p align="center" v-if="answer.approve_complain && answer.complain_type === 'proposals'">Пропозицію було
            заблоковано</p>
        <p align="center">{{answer.answer_text}}</p>
        <p align="center">Час відповіді {{answer.answer_time|datify}}</p>
        <div v-if="answer.approve_complain">
        </div>
    </div>
</template>

<script>
    import current_host from "../get_api_host.js"

    var moment = require("moment")
    import $ from "jquery"

    export default {
        name: "compaint_answer",
        data() {
            return {answer: null}
        },
        filters: {
            datify(a, add = 3) {
                return moment(JSON.stringify(a).substring(1, JSON.stringify(a).length - 1)).add(add, 'hours').utc().format('YYYY-MM-DD hh:mm:ss');
            }
        },
        created() {

            var self = this;
            $.get({
                async: true, //http://127.0.0.1:8000
                url: current_host + "/compalaint/answer/" + self.$route.params.id,
                data: {
                    // info: JSON.stringify(self.info),
                    // auth: JSON.stringify(self.auth),
                    /* JSON.stringify({
                            text: self.title, user_id: parseInt(localStorage.getItem("id")),

                        }*/

                },
                success: function (data) {
                    self.answer = data.answer;
                    //   alert(self.answer.sanction_deadline)
                    //alert(moment(self.answer.sanction_deadline).format('YYYY MM DD hh:mm'))
                }
            })
        }
    }
</script>

<style scoped>

</style>