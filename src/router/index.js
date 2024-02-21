import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import InscriptionView from '../views/RegisterView.vue'
import Cookies from 'js-cookie';
import {axiosAgent} from "@/services/axios.service";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    alias: '/login',
    name: 'home',
    component: LoginView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'register',
    component: InscriptionView,
    meta: { requiresAuth: false }
  },
  {
    path: '/logout',
    name: 'about',

    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/chat',
    name: 'chat',
    meta: { requiresAuth: true },
    component: () => import('../views/HomeView'),
    children: [
      {
        path: '',
        name: 'nothing',
        meta: { requiresAuth: true },
        component: () => import('@/components/Navigator.vue')
      }
        ,
      {
        path: ':id',
        name: 'conversation',
        meta: { requiresAuth: true },
        props: true,
        component: () => import('@/components/ConversationView.vue')
      }
    ]
  },

  {
    path: '/friends',
    name: 'friends',
    meta: { requiresAuth: true },
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '',
        name: 'friend',
        meta: { requiresAuth: true },
        props: true,
        component: () => import('@/components/Amis.vue')
      }
    ]
  },

  {
    path: "*",
    name: 'notFound',
    component: () => import('../views/NotFoundView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth) {
    const token = Cookies.get('jwt');
    if (!token) {
      console.log("No token, redirecting to /login");
      router.push({name: 'login'}).catch(()=>{});

    } else if( token && axiosAgent.defaults.headers.common['Authorization'] !== `Bearer ${token}`) {
      axiosAgent.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      next();
    }
    else {
      console.log("Token exists, no need to re-authenticate");
      next();
    }
  } else {
    console.log("No auth required");
    next();
  }
});



export default router
