import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
Vue.use(Vuex);

const state = {
	number: -1, //登录用,
	activeIndex: '1'
}
export default new Vuex.Store({
	state,
	mutations,
	actions
});
