<template>
  <div class="container">
        <p>Редактировать задачу</p>
  </div>
  <div class="container mt-3">
    <div class="row">
        <form @submit.prevent="updateSubmit()">
          <div class="mb-2">
            <input v-model="contact.name" type="text" class="form-control" placeholder="Name">
          </div>
          <div class="mb-2">
            <input v-model="contact.photo" type="text" class="form-control" placeholder="Photo URL">
          </div>
          <div class="mb-2">
            <input v-model="contact.email" type="email" class="form-control" placeholder="Email">
          </div>
          <div class="mb-2">
            <input v-model="contact.mobile" type="text" class="form-control" placeholder="Mobile">
          </div>
          <div class="mb-2">
            <input v-model="contact.company" type="text" class="form-control" placeholder="Company">
          </div>
          <div class="mb-2">
            <input v-model="contact.title" type="text" class="form-control" placeholder="Title">
          </div>
          <div>
            <select v-model="contact.groupID" class="form-contol" v-if="groups.length > 0">
              <option value="">Select Group</option>
              <option :value="group.id" v-for="group of groups" :key="group.id">{{group.name}}</option>
            </select>
          </div>
          <div class="btn">
            <input type="submit" class="btn btn-success" value="Обновить">
          </div>
        </form>
      </div>
  </div>

</template>

<script>
import {ContactService} from "@/services/ContactService"

export default {
  name: "EditContact",
  data() {
    return {
      contactId : this.$route.params.contactId,
      loading : false,
      contact: {
        name: '',
        photo: '',
        email: '',
        mobile: '',
        company: '',
        title: '',
        groupID: '',
      
      },
      errorMessage : null,
      groups : []
    }
  },
  created : async function() {
    try {
    this.loading = true;
    let response = await ContactService.getContact(this.contactId);
     let groupResponse = await ContactService.getAllGroups();
    this.contact = response.data;
     this.groups = groupResponse.data;
    this.loading = false;
  }
  catch (error) {
    this.errorMessage = error;
    this.loading = false;
  }
  },
  methods: {
    updateSubmit : async function () {
       try {
        let response = await ContactService.updateContact(this.contact, this.contactId);
        if (response) {
          return this.$router.push('/')
        }
        else {
          return this.$router.push(`/contacts/edit/${this.contactId}`)
        }
      }
      catch (error) {
        console.log(error)
      }
    }
    }
}

</script>

<style lang="scss" scoped>
.container {
  margin-bottom: 30px;
}
.container p {
  color: red;
}
.mb-2, select {
  margin-bottom: 10px;
}
</style>