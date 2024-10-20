import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _107aee50 = () => interopDefault(import('..\\pages\\colors.vue' /* webpackChunkName: "pages/colors" */))
const _5fce6075 = () => interopDefault(import('..\\pages\\invoice.vue' /* webpackChunkName: "pages/invoice" */))
const _9093ca9e = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _b1931e16 = () => interopDefault(import('..\\pages\\loginform.vue' /* webpackChunkName: "pages/loginform" */))
const _124b8ecc = () => interopDefault(import('..\\pages\\products.vue' /* webpackChunkName: "pages/products" */))
const _23e310cc = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _107aee50,
    name: "colors"
  }, {
    path: "/invoice",
    component: _5fce6075,
    name: "invoice"
  }, {
    path: "/login",
    component: _9093ca9e,
    name: "login"
  }, {
    path: "/loginform",
    component: _b1931e16,
    name: "loginform"
  }, {
    path: "/products",
    component: _124b8ecc,
    name: "products"
  }, {
    path: "/",
    component: _23e310cc,
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
