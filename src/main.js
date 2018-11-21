// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import { Button, Form, FormItem, Dialog ,Icon,Input,Message} from 'element-ui'
import App from './App'
import './common/style.css'


Vue.config.productionTip = false

Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Dialog);
Vue.use(Button);
Vue.use(Icon)
Vue.use(Input)

Vue.prototype.$message = Message
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
