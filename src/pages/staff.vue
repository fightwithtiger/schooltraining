<template>
	<div class="m-container">
		<el-card class="m-staff-data">
			<div class="m-find-staff">
				<div>
					<el-input label="用户编号" size="medium" v-model="num" placeholder="请输入用户编号"></el-input>
				</div>
				<el-button @click="getStaffInfo" type="primary" size="small">查找</el-button>
				<el-button @click="insertStaff" type="success" size="small">新增员工</el-button>
			</div>
			<el-table stripe :data="staffList != null? staffList: null" height="660" style="width: 100%" @row-click="getDetail">
				<el-table-column prop="number" label="员工编号" width="100">
					<template slot-scope="scope">
						{{ scope.row.number }}
					</template>
				</el-table-column>
				<el-table-column prop="username" label="姓名" width="160">
					<template slot-scope="scope">
						{{ scope.row.username }}
					</template>
				</el-table-column>
				<el-table-column prop="gender" label="性别" width="100">
					<template slot-scope="scope">
						{{ scope.row.gender }}
					</template>
				</el-table-column>
				<el-table-column prop="departName" label="所属部门">
					<template slot-scope="scope">
						{{ scope.row.departName }}
					</template>
				</el-table-column>
				<el-table-column prop="phone" label="电话">
					<template slot-scope="scope">
						{{ scope.row.phone }}
					</template>
				</el-table-column>
				<el-table-column prop="email" label="电子邮箱">
					<template slot-scope="scope">
						{{ scope.row.email }}
					</template>
				</el-table-column>
				<el-table-column prop="status" label="身份" width="100">
					<template slot-scope="scope">
						<span v-if="scope.row.status == 0">正常</span>
						<span v-if="scope.row.status == 1">黑名单</span>
						<span v-if="scope.row.status == 2">已删除</span>
					</template>
				</el-table-column>
				<el-table-column prop="" label="操作">
					<template slot-scope="scope">
						<el-button @click="showInfo(scope.row)" type="primary" size="small">查看</el-button>
						<el-button @click="updateInfo(scope.row)" type="warning" size="small">修改</el-button>
						<el-button @click="deleteInfo(scope.row)" type="danger" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<paging-btn @newList="getNewStaffList" :count="count" :limit="limit" :page="page"></paging-btn>
		</el-card>
		<el-dialog :title="staffInfoTitle" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<staff-info v-if="operation == 'show'" :info="staffInfo"></staff-info>
			<staff-update @closeD="closeDialog" :op="'update'" v-if="operation == 'update'" :staffForm="staffInfo"></staff-update>
			<staff-update @closeD="closeDialog" :op="'insert'" v-if="operation == 'insert'" :staffForm="staffInfo"></staff-update>
			<div v-if="operation == 'delete'">确认删除这条员工信息吗？</div>
			<span v-if="operation == 'delete'" slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="deleteOK">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import StaffInfo from '../components/StaffInfo.vue'
	import StaffUpdate from '../components/StaffUpdate.vue'
	import PagingBtn from '../components/PagingBtn.vue'
	export default {
		name: "Staff",
		components: {
			StaffInfo,
			StaffUpdate,
			PagingBtn,
		},
		data() {
			return {
				page: 1,
				limit: 10,
				count: 0,
				num: '',
				staffList: [],
				staffInfo: {},
				dialogVisible: false,
				// operation: 'show' update delete find, insert
				operation: '',
				staffInfoTitle: '员工信息'
			}
		},
		mounted() {
			this.getStaffList();
		},
		methods: {
			getStaffInfo() {
				if (this.num !== '') {
					this.axios.get('/staff/getinfo', {
						params: {
							number: this.num
						}
					}).then(res => {
						console.log(res);
						this.staffList = [res.data]
						console.log(this.staffList)
					});
				} else {
					this.$message.warning('输入查找的员工编号不能为空');
				}
			},
			getStaffList() {
				this.page = 1;
				this.axios.get('/staff/getlist', {
					params: {
						page: this.page,
						limit: this.limit
					}
				}).then(res => {
					console.log(res);
					this.staffList = res.data.staffList;
					this.count = res.data.count;
				});
			},
			getNewStaffList(newPage) {
				this.axios.get('/staff/getlist', {
					params: {
						page: newPage,
						limit: this.limit
					}
				}).then(res => {
					// console.log(res);
					this.page = newPage;
					this.staffList = res.data.staffList;
					this.count = res.data.count;
				});
			},
			getDetail(row) {
				this.staffInfo = row;
			},
			showInfo(row) {
				this.staffInfo = row;
				this.operation = 'show';
				this.staffInfoTitle = '员工信息';
				this.dialogVisible = true;
			},
			insertStaff() {
				this.staffInfo = {};
				this.operation = 'insert';
				this.staffInfoTitle = '员工添加';
				this.dialogVisible = true;
			},
			updateInfo(row) {
				this.staffInfo = row;
				this.operation = 'update';
				this.staffInfoTitle = '员工信息修改';
				this.dialogVisible = true;
			},
			closeDialog() {
				this.dialogVisible = false;
				this.page = 1;
				this.getStaffList();
			},
			deleteInfo(row) {
				this.staffInfo = row;
				this.operation = 'delete';
				this.staffInfoTitle = '提示信息';
				this.dialogVisible = true;
			},
			deleteOK() {
				// console.log(this.staffInfo)
				this.axios.get('/staff/delete', {
					params: {
						number: this.staffInfo.number
					}
				}).then(res => {
					console.log(res);
					this.page = 1;
					this.getStaffList();
				});
				this.staffInfo = {};
				// console.log(this.staffInfo)
				this.dialogVisible = false;
			},
			handleClose(done) {
				this.getStaffList();
				done();
			}
		}
	}
</script>

<style lang="scss">
	.el-table th>.cell {
		text-align: center;
	}

	.el-table .cell {
		text-align: center;
	}

	.m-container {
		width: 1400px;
		height: 800px;
		margin: 0 auto;
		text-align: center !important;

		.m-staff-data {
			padding: 0;
			width: 100%;
			height: 800px;
			margin-top: 60px;

			.m-find-staff {
				display: flex;
				justify-content: left;
				margin-left: 20px;
				margin-bottom: 20px;
			}
		}
	}
</style>
