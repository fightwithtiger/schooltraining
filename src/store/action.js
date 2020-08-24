
export default {
	saveAdminNum(context, number) {
		context.commit('saveAdminNum', number);
	},
	saveActiveIndex(context, key) {
		context.commit('saveActiveIndex', key);
	}
}
