import Vue from 'vue'
import VueRouter from 'vue-router'
//import routes from './router/router'
import store from './store/'
import { routerMode } from './config/env'
import './config/rem'
import FastClick from 'fastclick'
const jdCard = r => require.ensure([], () => r(require('./page/jdCard/jdCard')), 'jdCard')
if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function () {
		FastClick.attach(document.body);
	}, false);
}

Vue.use(VueRouter)
const router = new VueRouter({
	routes: [
		{
			path: '',
			component: jdCard
		}
	],
	mode: 'history',
	strict: process.env.NODE_ENV !== 'production',
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
			return { x: 0, y: to.meta.savedPosition || 0 }
		}
	}
})

new Vue({
	router,
	store,
}).$mount('#app')

