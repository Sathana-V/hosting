import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3d957a22 = () => interopDefault(import('..\\pages\\colors.vue' /* webpackChunkName: "pages/colors" */))
const _2eef7c8c = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _451beb7e = () => interopDefault(import('..\\pages\\loginform.vue' /* webpackChunkName: "pages/loginform" */))
const _69f81f23 = () => interopDefault(import('..\\pages\\products.vue' /* webpackChunkName: "pages/products" */))
const _1ee09ea3 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _3d957a22,
    name: "colors"
  }, {
    path: "/login",
    component: _2eef7c8c,
    name: "login"
  }, {
    path: "/loginform",
    component: _451beb7e,
    name: "loginform"
  }, {
    path: "/products",
    component: _69f81f23,
    name: "products"
  }, {
    path: "/",
    component: _1ee09ea3,
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
