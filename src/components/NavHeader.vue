<template>
	<el-row class="m-header">
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64"
		text-color="#fff" active-text-color="#ffd04b">
			<el-col :span="6">
				<el-menu-item index="1" @click="navToPage(1)" class="m-nav-title">
					<el-image style="width: 30px; height: 30px;" :src="require('../assets/images/logo.png')" fit="fill"></el-image>
					后台管理中心
				</el-menu-item>
			</el-col>
			<el-col :span="12" class="m-navbar">
				<el-menu-item index="2" @click="navToPage(2)" class="m-nav-item"><i class="el-icon-user-solid"></i>员工管理</el-menu-item>
				<el-menu-item index="3" @click="navToPage(3)" class="m-nav-item"><i class="el-icon-menu"></i>部门管理</el-menu-item>
				<el-menu-item index="4" @click="navToPage(4)" class="m-nav-item"><i class="el-icon-s-shop"></i>会议室管理</el-menu-item>
				<el-menu-item index="5" @click="navToPage(5)" class="m-nav-item"><i class="el-icon-s-order"></i>预约管理</el-menu-item>
			</el-col>
			<el-col :span="4">
				<el-menu-item index="6" class="m-nav-wel" disabled>
					欢迎{{" "+number+" "}}管理员
				</el-menu-item>
			</el-col>
			<el-col :span="2">
				<el-menu-item index="7" @click="navToPage(7)" class="m-logout-btn">退出</el-menu-item>
			</el-col>
		</el-menu>
	</el-row>
</template>

<script>
	export default {
		name: 'NavHeader',
		data() {
			return {
				activeIndex: this.$store.state.activeIndex,
				number: this.$store.state.number
			};
		},
		methods: {
			navToPage(key) {
				switch (key) {
					case 1:
						this.$router.push('/index');
						break;
					case 2:
						this.$router.push('/staff');
						break;
					case 3:
						this.$router.push('/department');
						break;
					case 4:
						this.$router.push('/room');
						break;
					case 5:
						this.$router.push('/appointment');
						break;
					case 7:
						this.axios.get('/admin/logout').then((res) => {
							this.$cookie.set('adminnumber', '', {
								expires: '-1'
							});
							this.$store.dispatch('saveAdminNum', -1);
							this.$router.push('/login');
							this.$message.success(res.msg);
						});
						break;
					default:
						break;
				}
			},

			handleSelect(key) {
				if (key === '7') {
					key = '1';
				}
				// console.log(key)
				this.$store.dispatch('saveActiveIndex', key);
			}
		}
	}
</script>

<style lang="scss">
	.el-menu-item.is-disabled {
		opacity: 0.75 !important;
	}

	.m-header {
		width: 100%;
		text-align: center;

		.m-nav-title {
			// margin-left: 40px !important;
			font-size: 22px;
			font-weight: bold;
		}

		.m-navbar {
			display: flex;
			justify-content: center;
		}

		.m-nav-item {
			font-size: 18px;
			font-weight: bold;
		}

		.m-nav-wel {
			font-size: 14px;
			font-weight: bold;
		}

		.m-logout-btn {
			font-size: 14px;
			color: white;
		}
	}
</style>
