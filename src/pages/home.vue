<template>
	<div class="m-body">
		<nav-header></nav-header>
		<router-view></router-view>
		<nav-footer></nav-footer>
	</div>
</template>

<script>
import NavHeader from '../components/NavHeader.vue'
import NavFooter from '../components/NavFooter.vue'

export default {
	name: 'Home',
	components: {
		NavHeader,
		NavFooter
	},
	data() {
		return {
			list: [],
		}
	},
	methods: {
		getData() {
			this.axios.get('/staff/getlist').then((res) => {
				console.log(res)
				// this.$message.success("success")
			})
		}
	}
}
</script>

<style lang="scss">
	
</style>
