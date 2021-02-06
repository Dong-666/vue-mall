import Toast from './Toast'

const obj = {}

//必须为install
obj.install = function(Vue) {
  //1.创建组件构造器
  const toastContructor = Vue.extend(Toast)

  //2.创建组件
  const toast = new toastContructor()

  //3.手动挂载
  toast.$mount(document.createElement('div'))

  //4.添加至页面
  document.body.appendChild(toast.$el)
  
  //5.挂载在Vue实例上
  Vue.prototype.$toast = toast
}

export default obj