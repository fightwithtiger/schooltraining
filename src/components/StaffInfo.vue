<template>
	<div class="m-info">
		<el-divider>
			<el-avatar :size="100" fit="fill" :src="info.avatar"></el-avatar>
		</el-divider>
		<div class="m-info-detail">
			<div class="m-info-detail-item">姓名：{{info.username}}</div>
			<div class="m-info-detail-item">性别：{{info.gender}}</div>
			<div class="m-info-detail-item">员工编号：{{info.number}}</div>
			<div class="m-info-detail-item">密码：{{info.password}}</div>
			<div class="m-info-detail-item">所属部门：{{info.departName}}</div>
			<div class="m-info-detail-item">电话：{{info.phone}}</div>
			<div class="m-info-detail-item">电子邮箱：{{info.email}}</div>
			<div class="m-info-detail-item" >
				身份：
				<span v-if="info.status == 0">正常用户</span>
				<span v-if="info.status == 1">黑名单用户</span>
				<span v-if="info.status == 2">已删除用户</span>
			</div>
			<div class="m-info-detail-item">入职时间：{{info.createTime}}</div>
			<div class="m-info-detail-item">自我介绍：<span class="m-info-detail-desc">{{info.desc}}</span></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'StaffInfo',
		props: ['info']
	}
</script>

<style lang="scss">
	.m-info {
		width: 90%;
		height: 560px;
		margin: 0 auto;

		.m-info-detail {
			margin-top: 80px;
			width: 100%;
			height: 460px;

			.m-info-detail-item {
				height: 30px;
				line-height: 30px;
				margin-top: 10px;
				font-size: 18px;

				.m-info-detail-desc {
					font-size: 14px;
				}
			}
		}
	}
</style>
