<template>
	<div class="m-contain">
		<el-form :model="departForm" :rules="rules" ref="departForm" label-width="100px" class="">
			<el-form-item label="部门名称" prop="departName">
				<el-input v-model="departForm.departName"></el-input>
			</el-form-item>
			<el-form-item label="部门编号" prop="number">
				<el-input v-model="departForm.number" :disabled="op == 'update'? true: false"></el-input>
			</el-form-item>
			<el-form-item label="状态" prop="status">
				<el-radio-group v-model="departForm.status">
					<el-radio :label="0"></el-radio>
					<el-radio :label="1"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="部门职能" prop="desc">
				<el-input v-model="departForm.desc"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('departForm')">提交</el-button>
				<el-button @click="resetForm('departForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default{
		name: 'DepartUpdate',
		props: ['departForm', 'op'],
		data() {
			return {
				departList: [],
				rules: {
					departName: [{
							required: true,
							message: '请输入部门名称',
							trigger: 'blur'
						}
					],
					number: [{
						required: true,
						message: '请输入编号',
						trigger: 'change'
					}]
				}
			}
		},
		methods: {
			submitForm(formName) {
				let url = '/depart/update';
				if(this.op === 'insert'){
					url = '/depart/insert';
				}
				
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.axios.post(url, this.departForm, ).then(() => {
							// console.log(res);
							this.$emit('closeD');
						});
						// console.log(this.departForm);
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm() {
				// this.$refs[formName].resetFields();
				this.departForm = {};
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
