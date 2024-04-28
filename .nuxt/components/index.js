export const AddInvoice = () => import('../..\\components\\AddInvoice.vue' /* webpackChunkName: "components/add-invoice" */).then(c => wrapFunctional(c.default || c))
export const AddModel = () => import('../..\\components\\AddModel.vue' /* webpackChunkName: "components/add-model" */).then(c => wrapFunctional(c.default || c))
export const AddProduct = () => import('../..\\components\\AddProduct.vue' /* webpackChunkName: "components/add-product" */).then(c => wrapFunctional(c.default || c))
export const EditColor = () => import('../..\\components\\EditColor.vue' /* webpackChunkName: "components/edit-color" */).then(c => wrapFunctional(c.default || c))
export const EditInvoice = () => import('../..\\components\\EditInvoice.vue' /* webpackChunkName: "components/edit-invoice" */).then(c => wrapFunctional(c.default || c))
export const EditProduct = () => import('../..\\components\\EditProduct.vue' /* webpackChunkName: "components/edit-product" */).then(c => wrapFunctional(c.default || c))
export const ImageViewer = () => import('../..\\components\\ImageViewer.vue' /* webpackChunkName: "components/image-viewer" */).then(c => wrapFunctional(c.default || c))
export const LoginPage = () => import('../..\\components\\LoginPage.vue' /* webpackChunkName: "components/login-page" */).then(c => wrapFunctional(c.default || c))
export const NuxtLogo = () => import('../..\\components\\NuxtLogo.vue' /* webpackChunkName: "components/nuxt-logo" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
