<template>
  <div class="content">
    <div class="input_button">
      <input type="text" class="" placeholder="Поиск задач" v-model="prefix">
      <button v-on:click="addNewNote">Поиск</button>
    </div>
    <p class="new">
 <router-link to="/contacts/add" class=""> <i class="fa fa-plus-circle d"></i>Новая задача</router-link> 
    </p>
  
<!-- Spinner -->
<div v-if="loading">
  <div class="container">
    <div class="row">
     <spinner-vue></spinner-vue>
    </div>
  </div>
</div>
<!--Error Message-->
<div v-if="!loading && errorMessage">
  <div class="container">
      <div class="col">
        <p class="">{{errorMessage}}</p>
      </div>
  </div>
</div>

  <div class="container" v-if="contacts.length > 0">
      <div class="list" v-for="contact of contacts" :key="contact">
              <div>
                <ul class="list-group">
                  
                  <li class="list-group-item" >Имя : <span>{{contact.name}}</span> </li>
                  <li class="list-group-item">Описание задачи : <span class="">{{contact.title}}</span> </li>
                  <li class="list-group-item">ID : <span>{{contact.id}}</span> </li>
                </ul>
              </div>
              <div class="icons">
                <button class=""><router-link :to="`/contacts/view/${contact.id}`" class="">
                  <i class="fa fa-eye"></i>  </router-link></button>
               <button class=""><router-link :to="`/contacts/edit/${contact.id}`" class="">
                  <i class="fa fa-pen"></i>  </router-link></button>
              
                <button class="" @click="clickDeleteContact(contact.id)">
                  <i class="fa fa-trash"></i>
                </button>
                <!-- <input class="toggle" type="checkbox"> -->
              </div>
            </div>
  </div>
  </div>




  
</template>

<script>
import {ContactService} from "@/services/ContactService"
import SpinnerVue from "@/components/SpinnerVue"
// import func from 'vue-editor-bridge'
export default {
name: "ContactManager",
components: {SpinnerVue},
data: function () {
  return {
    loading: false,
    contacts: [],
    errorMessage:null,
    prefix: ''

  }
},
  computed: {
    filteredNames() {
      return this.contacts.filter((n) =>
        n.toLowerCase().startsWith(this.prefix.toLowerCase())
      )
    }
  },
created : async function () {
  try {
    this.loading = true
    let response = await ContactService.getAllContacts()
    this.contacts = response.data
    this.loading = false
  }
  catch (error) {
    this.errorMessage = error
    this.loading = false
  }
},
methods: {
  // getAllContactsData : async function () {
  //   return await ContactService.getAllContacts()
  // }
  clickDeleteContact : async function (contactId) {
    try {
      this.loading = true;
      let response = await ContactService.deleteContact(contactId)
      if (response) {
          let response = await ContactService.getAllContacts();
          this.contact = response.data;
          this.loading = false;
      }
    }
    catch (error) {
      this.errorMessage = error
    this.loading = false
    }
  }
}
}
console.log('response')
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&display=swap');
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
  width: 50%;
    margin: 0 auto;
    margin-bottom: 50px;
    border-radius: 10px;
}
input, select {
    width: 65%;
    height: 35px;
    border: 1px #d6d0d0 solid;
    border-radius: 10px;
    font-family: 'Montserrat';
}
button {
    border-radius: 10px;
    background-color: rgba(35, 117, 117, 0.616);
    height: 35px;
    border: none;
    width: 20%;
    color: #FFFFFF;
    font-family: 'Montserrat';
    margin-left: 20px;
}
.input_button {
  margin-bottom: 20px;
}
a{
  color: red;
  text-decoration: none;
  font-size: 18px;

}
.new {
  margin-bottom: 30px;
}
li {
  list-style: none;
  font-weight: 600;
}
span {
  font-weight: 400;
}
.list {
  background: white;
  margin-bottom: 10px;
  border: 1px #d6d0d0 solid;
  border-radius: 10px;
  padding: 10px;
}
.fa {
  color: white;
}
.icons {
  margin-top: 10px;
}
</style>