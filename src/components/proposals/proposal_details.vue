<template>
    <div style="margin-top: 20px;">
       <!-- <p>{{proposal}}</p> -->
        <!-- <p>{{$route.params.id}}</p>
           <p>{{proposal}}</p>
               <p>{{proposal.images.length}}</p> -->

        <div class="input-group d-flex justify-content-center"><h3>{{ proposal.title}}</h3></div>

  <carousel :per-page="1"
            :touchDrag="true"
            :mouse-drag="true" :scrollPerPage="false"  :loop="true" :centerMode="true">
    <slide v-if="proposal.images === null || proposal.images.length === 0" class="input-group d-flex justify-content-center">


                    <img src="@/assets/no_image.png"  alt="Картинка" style="width: 25vw; height: 25vw;">

    </slide >
    <slide v-if="proposal.images !== null || proposal.images.length !== 0"   v-for="image in proposal.images"  class="input-group d-flex justify-content-center">
<!--  <input type="checkbox"  :id="'sp_' + image.url">
<label :for= "'sp_' + image.url"> -->
      <!--  <p>{{host+image.url}}</p>-->
             <img v-bind:src="host+image.url" alt="Картинка">
<!--</label>-->
        <!--style="width: 50vw; height: 50vh;"-->
         <!--   <p>{{image}}</p>
                <div v-if="image!==null && image!==undefined &&
                    image.url !== undefined && image.url !== null && image.url !== ''" class="input-group d-flex justify-content-center">

                  <img v-bind:src="host+image.url" alt="Картинка" style="width: 50vw; height: 50vh;"></div>
                    <img v-bind:src="image.url" alt="Картинка" style="width: 50vw; height: 50vh;">
            </div>
        </div>


                    <img src="@/assets/no_image.png"  alt="Картинка" style="width: 50vw; height: 50vh;"> -->

    </slide>
  </carousel>

<!--<Slider

                class="slider"
                ref="Slider"
                direction="horizontal"
                :mousewheel-control="true"
                :performance-mode="true"
                :pagination-visible="true"
                :pagination-clickable="true"
                :loop="true"
                :speed="500"
                @slide-change-start="onSlideChangeStart"
                @slide-change-end="onSlideChangeEnd">
            <div>

              <div v-if="proposal.images === null || proposal.images.length === 0"
                     class="input-group d-flex justify-content-center">

                    <img src="@/assets/no_image.png"  alt="Картинка" style="width: 50vw; height: 50vh;">
                </div>
            </div>

               <div v-if="proposal.images !== null || proposal.images.length !== 0"  class="input-group d-flex justify-content-center">
                   <img class="shadow-lg" :src="host+proposal.images[0].url" alt="Картинка" style="width: 60vw; height: 60vh;"></img>
               </div>

       <div v-for="image in proposal.images">
            <p>{{image.url}}</p>
             <div v-if="image!==null && image!==undefined &&
                    image.url !== undefined && image.url !== null && image.url !== ''" class="input-group d-flex justify-content-center">

                  <img v-bind:src="host+image.url" alt="Картинка" style="width: 50vw; height: 50vh;"></div>
                    <img v-bind:src="image.url" alt="Картинка" style="width: 50vw; height: 50vh;">
            </div>

        </Slider> -->
      <!-- Slides with image only -->


<!--
      <b-carousel-slide>
        <template v-slot:img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="https://picsum.photos/1024/480/?image=55"
            alt="image slot"
          >
        </template>
      </b-carousel-slide>

 Slide with blank fluid image to maintain slide aspect ratio
      <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
          a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
       </p>--
      </b-carousel-slide>-->

<!--<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">

        <div v-for="(image, i) in proposal.images">
    <div  v-bind:class="{ 'active': i === 0, 'carousel-item': true }" >
      <img class="d-block w-50" v-bind:src="host+image.url"  alt="First slide">
    </div>
        </div>
   <div class="carousel-item">
      <img class="d-block w-50" src="@/assets/no_image.png" alt="Second slide">
    </div>
    <div class="carousel-item">
      <img class="d-block w-50" src="@/assets/no_image.png" alt="Third slide">
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div> -->
  <!-- <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
      <p>rrr {{proposal.images}}}</p>
    <div v-for="image in proposal.images">
         <p>{{image}}</p>
        <div class="carousel-item">



             <div >
            <p>{{image}}</p>
                <div v-if="image!==null && image!==undefined &&
                    image.url !== undefined && image.url !== null && image.url !== ''" class="input-group d-flex justify-content-center">

                  <img v-bind:src="host+image.url" alt="Картинка" style="width: 50vw; height: 50vh;"></div>
                    <img v-bind:src="image.url" alt="Картинка" style="width: 50vw; height: 50vh;">
            </div>
        </div>



        </div>

  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div> -->

     <!--   <carousel v-bind:per-page="'1'"  :mouse-drag="false">

            <div v-if="proposal.images === null || proposal.images.length === 0"
                     class="input-group d-flex justify-content-center">
    <slide class="input-group d-flex justify-content-center">
      <img src="@/assets/no_image.png"  alt="Картинка" style="width: 50vw; height: 50vh;">
    </slide >
            </div>

            <div v-if="proposal.images !== null || proposal.images.length !== 0"
                     class="input-group d-flex justify-content-center">
    <div v-for="image in proposal.images">
    <slide class="input-group d-flex justify-content-center">
        <img v-bind:src="host+image.url" alt="Картинка" style="width: 50vw; height: 50vh;">
    </slide >
    </div>

                <slide class="input-group d-flex justify-content-center">
          <img src="@/assets/no_image.png"  alt="Картинка" style="width: 50vw; height: 50vh;">
    </slide >

            </div>
  </carousel> -->

       <!--  <b-carousel
    class="input-group d-flex justify-content-center"
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"

      style="width: 50vw;  text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >

             <div v-for="image in images">
      <b-carousel-slide
style="width: 50vw; "
        :img-src="image.url"
      ></b-carousel-slide>
             </div>

    </b-carousel> -->



       <!-- <Slider

                class="slider"
                ref="Slider"
                direction="horizontal"
                :mousewheel-control="true"
                :performance-mode="true"
                :pagination-visible="true"
                :pagination-clickable="true"
                :loop="true"
                :speed="500"
                @slide-change-start="onSlideChangeStart"
                @slide-change-end="onSlideChangeEnd">
            <div>

              <div v-if="proposal.images === null || proposal.images.length === 0"
                     class="input-group d-flex justify-content-center">

                    <img src="@/assets/no_image.png"  alt="Картинка" style="width: 50vw; height: 50vh;">
                </div>
            </div>

               <div v-if="proposal.images !== null || proposal.images.length !== 0"  class="input-group d-flex justify-content-center">
                   <img v-bind:src="host+proposal.images[0].url" alt="Картинка" style="width: 50vw; height: 50vh;">
               </div>

        <div v-for="image in images">
            <p>{{image.url}}</p>
                <div v-if="image!==null && image!==undefined &&
                    image.url !== undefined && image.url !== null && image.url !== ''" class="input-group d-flex justify-content-center">

                  <img v-bind:src="host+image.url" alt="Картинка" style="width: 50vw; height: 50vh;"></div>
                    <img v-bind:src="image.url" alt="Картинка" style="width: 50vw; height: 50vh;">
            </div>
        </div>
        </Slider> -->




        <!--  <p>{{auth_id}}</p> -->

        <div class="row d-flex justify-content-center">

        <div v-if="proposal.creator_id !== auth_id" class="row d-flex justify-content-start" style="margin-top: 25px;">
          <b-form-checkbox  v-model="proposal.is_blocked_by_admin" v-if="auth.role === 'Адміністратор' " v-on:change="change_block_status( )">{{proposal.is_blocked_by_admin? "Розблокувати": "Заблокувати"}}</b-form-checkbox>
             <!--        <input   v-model="proposal.is_blocked_by_admin"  v-if="auth.role === 'Адміністратор' " v-on:change="change_block_status( )" type="checkbox" class="custom-control-input" :id="'status'+ proposal.id">
    <label   v-if="auth.role === 'Адміністратор'" class="custom-control-label" style="margin-right: 5px;" :for="'status'+ proposal.id">{{proposal.is_blocked_by_admin? "Розблокувати": "Заблокувати"}}</label> -->
            <a   v-if="auth.token"  v-on:click="save_proposal" class="badge badge-primary"  data-toggle="tooltip" title="Зберегти"
                    style="cursor: pointer; height: 20px; margin-left: 20px;  color:white;">  <i class="fas fa-bookmark"></i>
            </a>
            <a  v-if="auth.token"  :href="'/send/user/'+proposal.creator_id" target="_blank" class="badge badge-primary" data-toggle="tooltip" title="Повідомлення публікатору"
               style="height: 20px; margin-left: 20px;">  <i class="fas fa-envelope"></i> </a>
            <a  v-if="auth.token"  :href="'/proposals/'+proposal.id+'/request/create'" target="_blank" class="badge badge-primary"
               style="height: 20px; margin-left: 10px;">Запит Бажання</a>
            <!--    /proposals/:id/create/complaint  <button v-on:click="edit1(i.n)" class="btn-sm btn-primary" >Зберегти</button> -->
            <a  v-if="auth.token && auth.role !== 'Адміністратор'" target="_blank" :href="'/proposals/'+$route.params.id+'/create/complaint'" class="badge badge-danger"
               style="height: 20px; margin-left: 10px;">Поскаржитись</a>

        </div>
        </div>
        <div class="row d-flex justify-content-center" style="margin-top: 5px;">
          <!--  <p>{{typeof  proposal.available_items}}</p>
             <p>{{Object.keys( proposal.available_items)}}</p> -->
            <div v-if="proposal.available_items !== None" class="badge badge-primary" style="height: 20px;margin-left: 5px; margin-top: 3px; margin-bottom: 3px;"> Наразі доступно {{
                proposal.available_items}}
            </div>
            <div class="badge badge-primary" style="height: 20px;margin-left: 5px; margin-top: 3px; margin-bottom: 3px;">{{
                proposal.category.category}} / {{proposal.category.subcategory}}
            </div>
            <div v-for="tag in proposal.search_tags">
                <div class="badge badge-primary" style="height: 20px;margin-left: 5px; margin-top: 3px; margin-bottom: 3px;">{{
                    tag.title}}
                </div>
            </div>

            <div class="badge badge-primary" style="height: 20px;margin-left: 5px;  margin-top: 3px; margin-bottom: 3px;">{{
                proposal.proposal_type}}
            </div>
            <div class="badge badge-primary" style="height: 20px;margin-left: 5px;  margin-top: 3px; margin-bottom: 3px;">{{
                proposal.proposal_item_type}}
            </div>
            <div v-if="proposal.proposal_item_type === 'Товари'" class="badge badge-primary"
                 style="height: 20px; margin-left: 5px;  margin-top: 3px; margin-bottom: 3px;">{{ proposal.proposal_item_state}}
            </div>
            <div v-if="proposal.available_items !== null" class="badge badge-primary"
                 style="height: 20px;margin-left: 5px;  margin-top: 3px; margin-bottom: 3px;">Доступно: {{
                proposal.available_items}}
            </div>
            <div v-if="proposal.proposal_type === 'Продаж'" class="badge badge-primary"
                 style="height: 20px; margin-left: 5px;  margin-top: 3px; margin-bottom: 3px;">Ціна: {{ proposal.item_price_value}}
                {{ proposal.item_price_currency}}
            </div>
            <div v-if="proposal.proposal_type === 'Оренда'" class="badge badge-primary"
                 style="height: 20px; margin-left: 5px;  margin-top: 3px; margin-bottom: 3px;">{{ proposal.rent_time_unit_measure}} -
                {{ proposal.item_price_value}} {{ proposal.item_price_currency}}
            </div>
         <!--   <div v-if="proposal.proposal_type === 'Обмін'" class="badge-sm badge-primary"
                 style="height: 20px; margin-left: 5px;  margin-top: 3px; margin-bottom: 3px;">Переглянути
            </div> -->
             <a v-if="proposal.proposal_type === 'Обмін'"  target="_blank" :href="'/proposals/'+$route.params.id+'/wished-for-exchange'" class="badge badge-primary"
               style="height: 20px; margin-left: 10px; margin-top: 3px;">Бажані елементи на обмін</a>

            <div v-if="proposal.location !== null" class="badge badge-primary"
                 style="height: 20px; margin-left: 5px;  margin-top: 3px; margin-bottom: 3px;"> {{proposal.location.str_description}}
            </div>
            <!--  <a :href="'/profile/'+proposal.creator_name" target="_blank" class="badge badge-primary" style="margin-left: 10px;  margin-top: 3px; margin-bottom: 3px;">Профіль публікатора</a> -->
            <!--   <a v-if="proposal.proposal_type === 'Продаж'"  :href="'/proposals/'+proposal.proposal_id+'/request/create'" target="_blank" class="badge badge-primary" style="margin-left: 10px;  margin-top: 3px; margin-bottom: 3px;">Запит купівлі</a>
               <a v-if="proposal.proposal_type === 'Оренда'"  :href="'/proposals/'+proposal.proposal_id+'/request/create'" target="_blank" class="badge badge-primary" style="margin-left: 10px;  margin-top: 3px; margin-bottom: 3px;">Запит оренди</a>
               <a v-if="proposal.proposal_type === 'Обмін'"  :href="'/proposals/'+proposal.proposal_id+'/request/create'" target="_blank" class="badge badge-primary" style="margin-left: 10px;  margin-top: 3px; margin-bottom: 3px;">Запит обміну</a>-->
            <!--   /proposals/:id/create/complaint  <button v-on:click="edit1(i.n)" class="btn-sm btn-primary" style="margin-right: 5px;  margin-left: 5px; margin-top:5px;">Зберегти</button>  -->
            <!--   <button v-on:click="edit1(i.n)" class="btn-sm btn-primary" style="margin-right: 5px;  margin-left: 5px; margin-top:5px;">Зберегти</button> -->
            <!--   <a  target="_blank" :href="'/proposals/'+$route.params.id+'/create/compaint'"  class="badge-sm badge-primary" style="margin-left: 10px;  margin-top: 3px; margin-bottom: 3px;">Поскаржитись</a> -->

        </div>

        <div>
            <!--     <div   style="margin-left:5%; margin-right:5%"  v-html="proposal.description" v-linkified></div> -->
            <div class="row d-flex justify-content-center" style="word-break: break-all; width: 80%; margin-left: 10%; margin-right: 10%;"
                 v-html="proposal.description" v-linkified></div>

        </div>
    </div>
</template>
<style>


</style>
<script>
    /*
      import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'*/
    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import Slider from 'vue-plain-slider'
    import $ from "jquery"
       import current_host from "../get_api_host.js"

    export default {
        name: "proposal_details",
        components: {Slider},
        filters: {
          ff(e){
          alert(1)
            alert(new Date())
          }
        },
        data() {
            return {
                images: [/*{url: "https://www.unleashed-technologies.com/sites/default/files/blog/image_url_drupal_blog_post_large.jpg"},
                    {url:"https://www.unleashed-technologies.com/sites/default/files/blog/image_url_drupal_blog_post_large.jpg"}*/],
                auth: {
                    role: localStorage.getItem("role"),
                    id: parseInt(localStorage.getItem("id")),
                    token: localStorage.getItem("token"),
                    name: localStorage.getItem("name"),
                },
                auth_id: parseInt(localStorage.getItem("id")),
                res: null,
                host: current_host /* "http://127.0.0.1:8000"*/,
                proposal: {
                   /* title: "hahahahah",
                    description: "yrthtrhtrbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbhtrhtrhrthtr  https://stackoverflow.com/questions/45880956/how-to-use-img-src-in-vue-js  hrhrhrh",
                    //  images: ["//i.imgur.com/w3Nwllg.jpg", "//i.imgur.com/w3Nwllg.jpg", "//i.imgur.com/w3Nwllg.jpg"],
                    category: "erherhrer",
                    search_tags: ["tagas", "the"],
                    creator_name: "John Snow",
                    creator_id: 0,
                    creation_time: "2020 ",
                    proposal_id: 1,
                    proposal_type: "Оренда",
                    proposal_item_type: "Товари",
                    proposal_item_state: "Новий",
                    proposal_location_latitude: 33,
                    proposal_location_longitude: 22,
                    available_items: null,
                    total_items: null,
                    set_visible_for_all: true,
                    is_blocked_by_admin: false,
                    rent_time_unit_measure: "Місяць ",
                    item_price_value: 12,
                    item_price_currency: "Гривня",
                    wished_items: null,
                    complains: null,*/
                }
            }
        },
        mounted() {

            // alert(3);
           //        alert(1)
            var self = this;
            $.get({
                async: true,
                url: /*"http://127.0.0.1:8000"*/  current_host+"/get/proposals/" + self.$route.params.id,
                dataType: "json",
                success: function (data) {

                    self.proposal = data.proposal;
                    self.$refs.Slider.next()
                    //   alert(data);
                    //  alert(data);
                    //    self.created_proposals_ = data.proposals;
                },
                error: function (data) {
                    //  alert(2)
                    //                    alert(JSON.stringify(data));
                }
            })
        },
        methods: {
            change_block_status(){
                 var self = this;
                $.post({
                    async: true,
                    url:/* "http://127.0.0.1:8000" */ current_host +"/change/proposal-block-status/proposals/" + self.$route.params.id,
                    data: {user_id: this.auth_id},
                    dataType: "json",
                    success: function (data) {
                   //     alert(JSON.stringify(data))
                      //  alert(JSON.stringify(data));
                        //   self.proposals = data.proposals;
                        //window.location = "/proposals/saved";

                    },
                    error: function (e) {
                                  // alert(JSON.stringify(e))
                    //    alert(JSON.stringify(e))
                    }
                })
            },
            save_proposal() {
           //  alert(12);
                //     def save_to_wished(r, id_):
                // FavoriteProposals.objects.create(favorite_proposal_id_id =  r.POST["user_id"], user_id_id = r)
                var self = this;
                $.post({
                    async: true,
                    url: /*"http://127.0.0.1:8000"*/ current_host +"/proposals/wished/save/" + self.$route.params.id,
                    data: {user_id: this.auth_id},
                    dataType: "json",
                    success: function (data) {
                     //   alert(JSON.stringify(data));
                        //   self.proposals = data.proposals;
                        window.location = "/proposals/saved";

                    },
                    error: function (e) {
                       // alert(JSON.stringify(e))
                    }
                })

            },
            closee() {
                window.close();
            },
            onSlideChangeStart(currentPage, el) {
              //  alert(currentPage);
              //;  alert(el)
                console.log('onSlideChangeStart', currentPage, el)
            },
            onSlideChangeEnd(currentPage, el) {
                console.log('onSlideChangeEnd', currentPage, el)
            }
        }
    }
</script>
<style scoped>
    .slider {

    }
</style>