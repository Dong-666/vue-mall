import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

//toast导入
import toast from 'components/common/toast/index'

Vue.config.productionTip = false

//使用fastClick,解决300ms延迟
FastClick.attach(document.body)

//图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

//安装toast
Vue.use(toast)
//事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
