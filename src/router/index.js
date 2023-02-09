import { createRouter, createWebHistory } from 'vue-router'
import AddContact from '@/views/AddContact.vue'
import ContactManager from '@/views/ContactManager.vue'
import ViewContact from '@/views/ViewContact'
import EditContact from '@/views/EditContact'
import HomeView from '@/views/HomeView'
// import PageNotFound from '@views/PageNotFound'

const routes = [
  {name: 'Home',
  redirect: '/contacts',
  component: HomeView},
  {name: 'A',
  path: '/contacts/add',
  component: AddContact},
  {name: 'CM',
  path: '/contacts',
  component: ContactManager},
  {name: 'EditContact',
  path: '/contacts/edit/:contactId',
  component: EditContact},
  {name: 'ViewContact',
  path: '/contacts/view/:contactId',
  component: ViewContact},
  // {name: 'PageNotFound',
  // path: '/:pathMatch(.*)*',
  // component: PageNotFound}
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
