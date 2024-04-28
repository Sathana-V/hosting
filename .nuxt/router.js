import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _79a582be = () => interopDefault(import('..\\pages\\colors.vue' /* webpackChunkName: "pages/colors" */))
const _1a4aa34f = () => interopDefault(import('..\\pages\\invoice.vue' /* webpackChunkName: "pages/invoice" */))
const _06394c0b = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _98a53562 = () => interopDefault(import('..\\pages\\loginform.vue' /* webpackChunkName: "pages/loginform" */))
const _b150b19c = () => interopDefault(import('..\\pages\\products.vue' /* webpackChunkName: "pages/products" */))
const _3c91a8f4 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/colors",
    component: _79a582be,
    name: "colors"
  }, {
    path: "/invoice",
    component: _1a4aa34f,
    name: "invoice"
  }, {
    path: "/login",
    component: _06394c0b,
    name: "login"
  }, {
    path: "/loginform",
    component: _98a53562,
    name: "loginform"
  }, {
    path: "/products",
    component: _b150b19c,
    name: "products"
  }, {
    path: "/",
    component: _3c91a8f4,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
