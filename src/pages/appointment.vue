<template>
	<div class="m-container">
		<el-card class="m-app-data">
			<el-row class="m-app-op">
				<el-col :span="20" class="m-find-app">
					<div>
						<el-input label="员工编号" size="medium" v-model="staffNum" placeholder="请输入员工编号"></el-input>
					</div>
					<div style="margin-left: 10px;">
						<el-input label="会议室编号" size="medium" v-model="roomNum" placeholder="请输入会议室编号"></el-input>
					</div>
					<el-button style="margin-left: 10px;" @click="getAppInfo" type="primary" size="small">查找</el-button>
				</el-col>
				<el-col :span="4" class="m-tab">
					<span :class="[op == 'todo'? 'active': '']" class="m-todo" @click="changeTodo">待办</span>
					<el-divider direction="vertical"></el-divider>
					<span :class="[op == 'finish'? 'active': '']" class="m-finish" @click="changeFinish">已通过</span>
				</el-col>
			</el-row>
			<el-table stripe :data="appList != null? appList: null" height="660" style="width: 100%" @row-click="getDetail">
				<el-table-column prop="number" label="预约单编号" width="200">
					<template slot-scope="scope">
						{{ scope.row.number }}
					</template>
				</el-table-column>
				<el-table-column prop="staffNumber" label="员工编号" width="120">
					<template slot-scope="scope">
						{{ scope.row.staffNumber }}
					</template>
				</el-table-column>
				<el-table-column prop="roomNumber" label="会议室编号" width="120">
					<template slot-scope="scope">
						{{ scope.row.roomNumber }}
					</template>
				</el-table-column>
				<el-table-column prop="desc" label="描述及需要" width="300">
					<template slot-scope="scope">
						{{ scope.row.desc }}
					</template>
				</el-table-column>
				<el-table-column prop="['startTime','endTime']" label="预约时间" width="140">
					<template slot-scope="scope">
						{{ scope.row.startTime }} ~~ {{scope.row.endTime}}
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="预约单创建时间">
					<template slot-scope="scope">
						{{ scope.row.createTime }}
					</template>
				</el-table-column>
				<el-table-column prop="" label="操作" width="300">
					<template slot-scope="scope">
						<el-button v-if="scope.row.status == 0" @click="updateStatus(scope.row)" type="success" size="small">
							已通过
						</el-button>
						<el-button v-if="scope.row.status == 1" @click="updateStatus(scope.row)" type="warning" size="small">
							待审核
						</el-button>
						<el-button v-if="scope.row.status == 2" disabled type="info" size="small">
							已过期
						</el-button>
						<el-button @click="deleteInfo(scope.row)" type="danger" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<paging-btn @newList="getNewAppList" :count="count" :limit="limit" :page="page"></paging-btn>
		</el-card>
		<el-dialog title="提示信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<div>确认删除这条预约订单信息吗？</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="deleteOK">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import PagingBtn from '../components/PagingBtn.vue'
	export default {
		name: "Appointment",
		components: {
			PagingBtn,
		},
		data() {
			return {
				staffNum: '',
				roomNum: '',
				op: 'todo',
				page: 1,
				limit: 8,
				count: 0,
				appList: [],
				appInfo: {},
				dialogVisible: false,
			}
		},
		mounted() {
			this.getTodoList();
		},
		methods: {
			changeTodo() {
				this.op = 'todo';
				this.getTodoList();
			},
			changeFinish() {
				this.op = 'finish';
				this.getFinishList();
			},
			getAppInfo() {
				this.page = 1;
				this.op = '';
				this.axios.get('/app/getinfo', {
					params: {
						page: this.page,
						limit: this.limit,
						staffNumber: this.staffNum,
						roomNumber: this.roomNum
					}
				}).then(res => {
					this.appList = res.data.appList;
					this.count = res.data.count;
				});
			},
			getNewAppList(newPage) {
				let url = '';
				if (this.op === '') {
					url = '/app/getinfo';
					this.axios.get(url, {
						params: {
							page: newPage,
							limit: this.limit,
							staffNumber: this.staffNum,
							roomNumber: this.roomNum
						}
					}).then(res => {
						this.page = newPage;
						this.appList = res.data.appList;
						this.count = res.data.count;
					});
				} else {
					if (this.op === 'todo') {
						url = '/app/gettodolist';
					}
					if (this.op === 'finish') {
						url = '/app/getfinishlist';
					}
					this.axios.get(url, {
						params: {
							page: newPage,
							limit: this.limit
						}
					}).then(res => {
						console.log(res)
						this.page = newPage;
						this.appList = res.data.appList;
						this.count = res.data.count;
					});
				}
			},
			getTodoList() {
				this.page = 1;
				this.axios.get('/app/gettodolist', {
					params: {
						page: this.page,
						limit: this.limit
					}
				}).then(res => {
					this.appList = res.data.appList;
					this.count = res.data.count;
				});
			},
			getFinishList() {
				this.page = 1;
				this.axios.get('/app/getfinishlist', {
					params: {
						page: this.page,
						limit: this.limit
					}
				}).then(res => {
					this.appList = res.data.appList;
					this.count = res.data.count;
				});
			},
			getDetail(row) {
				this.appInfo = row;
			},
			updateStatus(row) {
				const status = row.status == 1 ? 0 : 1;
				this.axios.post('/app/updatestatus', {
					number: row.number,
					status: status
				}).then(res => {
					this.$message.success(res.msg);
				})
				this.appInfo = {};
				if (this.op === 'todo') {
					this.getTodoList();
				} else {
					this.getFinishList();
				}
			},
			deleteInfo(row) {
				this.appInfo = row;
				this.dialogVisible = true;
			},
			deleteOK() {
				console.log(this.op)
				this.axios.get('/app/delete', {
					params: {
						number: this.appInfo.number
					}
				}).then((res) => {
					this.page = 1;
					if (this.op === 'todo') {
						this.getTodoList();
					} else {
						this.getFinishList();
					}
					this.$message.success(res.msg);
					this.dialogVisible = false;
				});
				this.appInfo = {};
			},
			handleClose(done) {
				done();
			}
		}
	}
</script>

<style lang="scss">
	.m-container {
		width: 1400px;
		height: 800px;
		margin: 0 auto;
		text-align: center !important;
		// background-color: red;

		.m-app-data {
			padding: 0;
			width: 100%;
			height: 800px;
			margin-top: 60px;

			.m-app-op {
				width: 100%;
				display: flex;
				justify-content: space-between;

				.m-find-app {
					display: flex;
					justify-content: left;
					margin-left: 20px;
					margin-bottom: 20px;
				}

				.m-tab {
					font-size: 16px;

					.m-todo {
						cursor: pointer;
					}

					.m-finish {
						cursor: pointer;
					}

					.active {
						color: #E6A23C;
					}
				}
			}
		}
	}
</style>
