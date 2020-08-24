import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home.vue'
import Index from '../pages/index.vue'
import Login from '../pages/login.vue'
import Staff from '../pages/staff.vue'
import Department from '../pages/department.vue'
import Room from '../pages/room.vue'
import Appointment from '../pages/appointment.vue'

Vue.use(Router)

// 解决路由重复点击
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

export default new Router({
	routes: [{
			path: '/login',
			name: 'login',
			component: Login,
		},
		{
			path: '/',
			name: 'home',
			component: Home,
			redirect: '/index',
			meta: {
				requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
			},
			children: [{
					path: '/index',
					name: 'index',
					component: Index,
					meta: {
						title: '后台首页',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
				},
				{
					path: '/staff',
					name: 'staff',
					component: Staff,
					meta: {
						title: '员工管理',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
				},
				{
					path: '/department',
					name: 'department',
					component: Department,
					meta: {
						title: '部门管理',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
				},
				{
					path: '/room',
					name: 'room',
					component: Room,
					meta: {
						title: '会议室管理',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
				},
				{
					path: '/appointment',
					name: 'appointment',
					component: Appointment,
					meta: {
						title: '预约管理',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
				},
			]
		},
	]
})
