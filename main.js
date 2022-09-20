import Vue from 'vue'
import App from './App'
import schema from "async-validator";
import _ from 'lodash'
import * as navTo from '@/utils/navTo.js'
import store from "./store";
import dialog from "./utils/dialog";
import cookie from "@/utils/store/cookie";
Vue.prototype._ = _

Vue.config.productionTip = false

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView)
Vue.prototype.$store = store
// 此处为演示vuex使用，非uView的功能部分
Vue.prototype.$api = {
	navTo
};
Vue.prototype.$validator = function (rule) {
	return new schema(rule);
};
// 引入uView提供的对vuex的简写法文件
// let vuexStore = require('@/store/$u.mixin.js')
// Vue.mixin(vuexStore)

App.mpType = 'app'


const app = new Vue({
	store,
	...App
})
app.$mount()
