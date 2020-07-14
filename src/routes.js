/*jshint -W099 */
import Vue from "vue";

import Router from "vue-router";
import  Create from "./components/Create.vue"
import  Edit from "./components/Edit.vue"
import  Index from "./components/Index.vue"
//import   advertisements_ from "./components/ads/advertisements.vue"
import  login from "./components/login/login.vue"
import  registration from "./components/register/register.vue"
import P from "./components/P.vue"
//import e from "./components/e/e.vue"
//import monitoring from "./components/monitoring/monitoring.vue"
import complains from "./components/complains/complains.vue"
import proposals from "./components/proposals/proposals.vue"
import wished_exchange_proposals from "./components/proposals/exchange/wished_exchange_proposals.vue"
import current_chain_exchange_variants from  "./components/proposals/exchange/current_chain_exchange_variants.vue"
//import pay_donate from "./components/pay_donate.vue"
import donates from "./components/proposals/donates/donates.vue"
import profile from "./components/profile/profile.vue"
import show_profile from  "./components/profile/show_profile.vue"
import t from "./components/messages/t.vue"
import mainer from './components/main/main.vue'
import proposals_details from "./components/proposals/proposal_details.vue"
import messages from "./components/messages/messages_.vue"
//import create_complain from "./components/proposals/create_complain.vue"
import test from "./components/test.vue"
import send_messages from "./components/messages/send_messages.vue"
import  request_details from "./components/proposals/proposals_requests.vue"
import  create_proposal_request from "./components/proposals/proposal_requests/create_proposal_request.vue"
import s from "./components/selectize____/s.vue"
import selectize_ from "./components/selectize_.vue"
import saved_proposals from "./components/proposals/saved_proposals.vue"
import create_proposal from "./components/proposals/create_proposal.vue"
import requested_proposals from "./components/proposals/requested_proposals/requsted_proposals.vue"
Vue.use(Router);
import proposal_requests_details from "./components/proposals/proposal_requests/request_details.vue"
import answer_proposal_request from "./components/proposals/answer_proposal_request/answer_proposal_request.vue"
import create_complain from "./components/complains/create_complain.vue"
import create_user_complain from "./components/complains/create_user_complain.vue"
import answer_compaint from "./components/complains/answer_compaint.vue"
import compaint_answer from "./components/complains/compaint_answer.vue"
export default new Router({
  mode: "history",
  routes: [

    {
          path:"/answer/:type/compaint/:id",
             component: answer_compaint ,
    },

    {
      path:"/complain/answer/:id",
               component: compaint_answer,
    },

    {
         path:"/answer/request/:id",
       component: answer_proposal_request ,
    },
    {
      path:"/proposals/request/:id/details",
       component: proposal_requests_details ,
    },
    {
      path: "/",
      redirect: '',
      component: mainer,

    },

    {
        path: "/ppp",
      redirect: 'ppp',
      component: P
    },
   /*  {
      path: "/advertisements",
      redirect: 'advertisements',
      component: advertisements_
    },*/
    {
      path: "/create",
      name: "create",
      component: Create
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: Edit
    },
    {
      path: "/login",
      name: "login",
      component: login
    },


      {
      path: "/registration",
      name: "registration",
      component: registration
    },

     /*   {
      path: "/monitoring",
      name: "monitoring",
      component: monitoring
    },*/





      {
      path: "/proposals",
      name: "proposals",
      component: proposals
    },

      {
      path: "/complains",
      name: "complains",
      component: complains
    },

        {
      path: "/donate",
      name: "donate",
      component: donates //pay_donate
    },

      {
      path: "/profile",
      name: "profile",
      component: profile
    },

       {
      path: "/profile/:user",
      component: show_profile
    },


      {
      path: "/messages",
     // redirect: 'messages',
      component: messages,

    },

       {
      path: "/messages/:user",
     // redirect: 'messages',
      component: messages,

    },




    {
        path: "/send/user/:receiver",
     // redirect: 'messages',
      component: send_messages,

    },

  {
      path: "/proposals/:id/details",
   //   name: "proposals_details",
      component: proposals_details
    },

      {
      path:"/proposals/:id/create/complaint",
        component: create_complain
    },

       {
      path:"/users/:id/create/complaint",
        component: create_user_complain
    },

         {
      path:"/test",
        component: test
    },

    {
      path:"/proposals/requests/:request_id",
      component: request_details
    },
    {
      path: "/proposals/:proposal_id/request/create",
      component: create_proposal_request
    },

       {
      path: "/proposals/create",
      component: create_proposal
    },

       {
      path: "/proposals/requested",
      component: requested_proposals
    },

       {
      path: "/proposals/saved",
      component: saved_proposals
    },

    {
      path: "/proposals/:id/wished-for-exchange",
      component: wished_exchange_proposals
    },

    {
      path: "/proposals/:id/possible-chain-exchange-variants",
       component: current_chain_exchange_variants
    }
     /* import saved_proposals from "./components/proposals/saved_proposals.vue"
import create_proposal from "./components/proposals/create_proposal.vue"
import requested_proposals from "./components/proposals/requested_proposals.vue"*/

  ]
});
