<template>
   <div class="container mt-3">
    <div class="row">
      <p class="h3 text-success fw-bold">Детали задачи</p>
    </div>
  </div>
<!-- Spinner -->
<div v-if="loading">
  <div class="container">
    <div class="row">
      <div class="col">
        <spinner-vue></spinner-vue>
      </div>
    </div>
  </div>
</div>
<!--Error Message-->
<div v-if="!loading && errorMessage">
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h4 text-danger fw-bold">{{errorMessage}}</p>
      </div>
    </div>
  </div>
</div>

    <div class="container" v-if="!loading && isDone()">
      <div class="row align-items-center">
        <div class="col-md-4">
            <img :src="contact.photo" alt="" class="contact-img-big">
        </div>
        <div class="col-md-6">
           <ul class="list-group">
                  <li class="list-group-item">Name : <span class="fw-bold">{{contact.name}}</span> </li>
                  <li class="list-group-item">Email : <span class="fw-bold">{{contact.email}}Email</span> </li>
                  <li class="list-group-item">Mobile : <span class="fw-bold">{{contact.mobile}}</span> </li>
                    <li class="list-group-item">Company : <span class="fw-bold">{{contact.company}}</span> </li>
                  <li class="list-group-item">Title : <span class="fw-bold">{{contact.title}}</span> </li>
                  <li class="list-group-item">Group : <span class="fw-bold">{{contact.name}}</span> </li>
                </ul>
        </div>
    </div>
     <div class="back">
        <router-link to="/" class="btn btn-success"><i class="fa fa-arrow-alt-circle-left"></i>Назад</router-link>
     </div>
  </div>
 
</template>

<script>
import {ContactService} from "@/services/ContactService"
import SpinnerVue from "@/components/SpinnerVue"

export default {
  name: "ViewContact",
  components: {SpinnerVue},
 data() {            // data: function () {
    return {
      contactId : this.$route.params.contactId,
      loading : false,
      contact : {},
      errorMessage : null,
      groups : {}
    }
  },
  created : async function () {
  try {
    this.loading = true;
    let response = await ContactService.getContact(this.contactId);
    let groupResponse = await ContactService.getGroup(response.data);
    this.contact = response.data;
    this.group = groupResponse.data;
    this.loading = false;
  }
  catch (error) {
    this.errorMessage = error;
    this.loading = false;
  }
},
methods: {
  isDone : function () {
    return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0
  }
},
  }

</script>

<style lang="scss" scoped>
.back {
  margin-top: 10px
  }

</style>