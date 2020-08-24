<template>
	<div class="m-contain">
		<el-form :model="roomForm" :rules="rules" ref="roomForm" label-width="100px" class="">
			<el-form-item label="会议室编号" prop="number">
				<el-input v-model="roomForm.number" :disabled="op == 'update'? true: false"></el-input>
			</el-form-item>
			<el-form-item label="负责人编号" prop="staffNumber">
				<el-input v-model="roomForm.staffNumber"></el-input>
			</el-form-item>
			<el-form-item label="状态" prop="status">
				<el-radio-group v-model="roomForm.status">
					<el-radio :label="0"></el-radio>
					<el-radio :label="1"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="内景图" prop="image">
				<el-input v-model="roomForm.image"></el-input>
			</el-form-item>
			<el-form-item label="热度" prop="hot">
				<el-input v-model="roomForm.hot"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('roomForm')">提交</el-button>
				<el-button @click="resetForm('roomForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default{
		name: 'RoomUpdate',
		props: ['roomForm', 'op'],
		data() {
			return {
				roomList: [],
				rules: {
					number: [{
						required: true,
						message: '请输入会议室编号',
						trigger: 'change'
					}],
					staffNumber: [{
							required: true,
							message: '请负责人员工编号',
							trigger: 'change'
						}
					]
				}
			}
		},
		methods: {
			submitForm(formName) {
				let url = '/room/update';
				if(this.op === 'insert'){
					url = '/room/insert';
				}
				
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log(this.roomForm)
						this.axios.post(url, this.roomForm).then(() => {
							// console.log(res);
							this.$emit('closeD');
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm() {
				// this.$refs[formName].resetFields();
				this.roomForm = {};
			}
		}
	}
</script>

<style lang="scss">
	.m-contain {
		width: 80%;
		margin: 0 8%;
		// background-color: red;
	}
</style>
