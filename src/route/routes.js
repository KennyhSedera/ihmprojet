import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/LoginView.vue'
import Home from '../views/HomeView.vue'
import Produit from '../views/ProduitView.vue'
import cmd from '../views/CommandeView.vue'
import admin from '../views/AdminView.vue'
import client from '../views/ClientView.vue'
import NotFound from '../views/PageNotFound.vue'

Vue.use(Router)


const router = new Router({
  mode:'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        title: 'Login'
      },
      component: Login
    },
    {
      path: '/',
      name: 'home',
      meta: {
        title: 'Page d\'accueil'
      },
      component: Home
    },
    {
      path: '/produit',
      name: 'produit',
      meta: {
        title: 'Page produit'
      },
      component: Produit
    },
    {
      path: '/commande',
      name: 'commande',
      meta: {
        title: 'Page commande'
      },
      component: cmd
    },
    {
      path: '/admin',
      name: 'admin',
      meta: {
        title: 'Page d\'administrateur'
      },
      component: admin
    },
    {
      path: '/client',
      name: 'client',
      meta: {
        title: 'Page client'
      },
      component: client
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      meta: {
        title: "Page introuvable 404"
      },
      component : NotFound
    }
  ]
})
export default router