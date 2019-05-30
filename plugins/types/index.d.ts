import Vue, { PluginFunction } from 'vue'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
// import L from 'leaflet'

/**
 * Extends types in vue
 */
declare module 'vue/types/vue' {
  interface Vue {
    $axios: NuxtAxiosInstance
  }
}
