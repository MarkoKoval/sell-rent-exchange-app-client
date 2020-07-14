<template>
    <div id="my-strictly-unique-vue-upload-multiple-image" style="display: flex; justify-content: center;">
        <vue-upload-multiple-image
                @upload-success="uploadImageSuccess"
                @before-remove="beforeRemove"
                :primaryText="''"
                :browseText="''"
                :dragText="'Upload Image'"
                :maxImage="'10'"
                @edit-image="editImage"
                :data-images="imagess"
                :markIsPrimaryText="''"
        ></vue-upload-multiple-image>
        <!--<div>{{imagess}}</div>
           <div>{{imagess.length}}</div> -->
    </div>
</template>

<script>
    import current_host from "../get_api_host.js"
    import VueUploadMultipleImage from 'vue-upload-multiple-image'
    //import axios from 'axios'
    export default {
        props: ['dat', "images"],
        name: 'img_up',
        // props: ["primaryText"],
        data() {
            return {
                im: this.images,
                imagess: [
                    /* {
                       path:  '', // 'https://i.imgur.com/0Saq359.png',
                 default: 1,
                 highlight: 1,
               caption: 'caption to display. receive',
                     },*/

                ]
            }
        },
        //PROPRERTY CHANGED
        /*  watch: {
              dat: function(newVal, oldVal) { // watch it
              alert(newVal + " "+ oldVal);
            }
          },*/
        mounted() {
            //this.images;

            if (this.im !== undefined) {

                //    alert(JSON.stringify(this.im))
                // alert(this.im.length)
                //   alert(typeof this.im)
                //alert(this.im)
                //  var j = JSON.parse(JSON.stringify(this.images));
                for (var i = 0; i < this.im.length; i++) {
                    //   alert(JSON.stringify(i));
                    // alert(this.im[i].url);
                    // alert(JSON.stringify(this.im[i]))//'http://127.0.0.1:8000'
                    this.imagess.push({url: this.im[i].url, path: current_host   + this.im[i].url})
                }
            }
            //  var i = this.images;
            //  alert(i);
            // var j = this.dat;
            // alert(j)
            // alert("images "+JSON.stringify(this.images));
            // alert(this.dat);
        },
        components: {
            VueUploadMultipleImage
        },
        methods: {
            uploadImageSuccess(formData, index, fileList) {
                // alert(this.dat);
                //      alert(JSON.stringify(formData));
                //   alert( fileList.length);
                // alert(fileList.length)
                this.$emit('update-item', fileList);

                //  alert("Upload");
                //console.log('data', formData, index, fileList)
                // Upload image api
                // axios.post('http://your-url-upload', { data: formData }).then(response => {
                //   console.log(response)
                // })
            },
            beforeRemove(index, done, fileList) {
                // console.log('index', index, fileList)
                //  alert( fileList.length);
                var r = confirm("remove image")
                if (r == true) {
                    done()
                } else {
                }
                this.$emit('update-item', fileList);
            },
            editImage(formData, index, fileList) {
                //    alert("edit");
                //     alert( fileList.length);
                // console.log('edit data', formData, index, fileList)
                this.$emit('update-item', fileList);
            },

        }
    }
</script>

<style>
    #my-strictly-unique-vue-upload-multiple-image {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
