<template>
	<div class="m-contain">
		<!-- {{info}} -->
		<el-form :model="staffForm" :rules="rules" ref="staffForm" label-width="100px" class="">
			<el-form-item label="姓名" prop="username">
				<el-input v-model="staffForm.username"></el-input>
			</el-form-item>
			<el-form-item label="性别" prop="gender">
				<el-radio-group v-model="staffForm.gender">
					<el-radio label="男"></el-radio>
					<el-radio label="女"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="编号" prop="number">
				<el-input v-model="staffForm.number" :disabled="op == 'update'? true: false"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input v-model="staffForm.password"></el-input>
			</el-form-item>
			<el-form-item label="部门" prop="departName">
				<el-select v-model="staffForm.departName" placeholder="请选择员工所属部门">
					<el-option v-for="item in departList" :key="item.number" :label="item.departName" :value="item.departName"></el-option>
					<!-- <el-option label="部门2" value="2"></el-option> -->
				</el-select>
			</el-form-item>
			<el-form-item label="状态" prop="status">
				<el-radio-group v-model="staffForm.status">
					<el-radio :label="0"></el-radio>
					<el-radio :label="1"></el-radio>
					<el-radio :label="2"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="照片" prop="avatar">
				<el-input v-model="staffForm.avatar"></el-input>
			</el-form-item>
			<el-form-item label="电话" prop="phone">
				<el-input v-model="staffForm.phone"></el-input>
			</el-form-item>
			<el-form-item label="电子邮箱" prop="email">
				<el-input v-model="staffForm.email"></el-input>
			</el-form-item>
			<el-form-item label="自我描述" prop="desc">
				<el-input v-model="staffForm.desc"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('staffForm')">提交</el-button>
				<el-button @click="resetForm('staffForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: 'StaffUpdate',
		props: ['staffForm', 'op'],
		data() {
			return {
				departList: [],
				rules: {
					username: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur'
						},
						{
							min: 2,
							message: '长度不能小于2个字符',
							trigger: 'blur'
						}
					],
					number: [{
						required: true,
						message: '请输入编号',
						trigger: 'change'
					}, {
						min: 5,
						message: '长度不能小于5个字符',
						trigger: 'blur',
					}, ],
					password: [{
						required: true,
						message: '请输入员工密码',
						trigger: 'blur'
					}],
					departNumber: [{
						required: true,
						message: '请选选择员工所属部门',
						trigger: 'blur'
					}]
				}
			}
		},
		mounted() {
			this.getDepartList();
		},
		methods: {
			getDepartList() {
				this.axios.get('/depart/getall').then(res => {
					this.departList = res.data.departList;
				});
			},
			submitForm(formName) {
				let url = '/staff/update';
				if(this.op === 'insert'){
					url = '/staff/insert';
				}
				
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log(this.staffForm)
						this.axios.post(url, this.staffForm).then(res => {
							console.log(res);
							this.$emit('closeD');
						});
						// console.log(this.staffForm);
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm() {
				// this.$refs[formName].resetFields();
				this.staffForm = {};
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
