export { default as AddInvoice } from '../..\\components\\AddInvoice.vue'
export { default as AddModel } from '../..\\components\\AddModel.vue'
export { default as AddProduct } from '../..\\components\\AddProduct.vue'
export { default as EditColor } from '../..\\components\\EditColor.vue'
export { default as EditInvoice } from '../..\\components\\EditInvoice.vue'
export { default as EditProduct } from '../..\\components\\EditProduct.vue'
export { default as ImageViewer } from '../..\\components\\ImageViewer.vue'
export { default as LoginPage } from '../..\\components\\LoginPage.vue'
export { default as NuxtLogo } from '../..\\components\\NuxtLogo.vue'

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
