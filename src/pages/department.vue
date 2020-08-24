<template>
	<div class="m-container">
		<el-card class="m-depart-data">
			<div class="m-find-depart">
				<div>
					<el-input label="部门编号" size="medium" v-model="num" placeholder="请输入部门编号"></el-input>
				</div>
				<el-button @click="getDepartInfo" type="primary" size="small">查找</el-button>
				<el-button @click="insertDepart" type="success" size="small">新增部门</el-button>
			</div>
			<el-table stripe :data="departList != null? departList: null" height="660" style="width: 100%" @row-click="getDetail">
				<el-table-column prop="number" label="部门编号" width="160">
					<template slot-scope="scope">
						{{ scope.row.number }}
					</template>
				</el-table-column>
				<el-table-column prop="departName" label="名称" width="240">
					<template slot-scope="scope">
						{{ scope.row.departName }}
					</template>
				</el-table-column>
				<el-table-column prop="desc" label="部门职能">
					<template slot-scope="scope">
						{{ scope.row.desc }}
					</template>
				</el-table-column>
				<el-table-column prop="status" label="状态">
					<template slot-scope="scope">
						{{ scope.row.status == 0? '正常': '已删除' }}
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="成立时间" width="300">
					<template slot-scope="scope">
						{{ scope.row.createTime }}
					</template>
				</el-table-column>
				<el-table-column prop="" label="操作" width="300">
					<template slot-scope="scope">
						<el-button @click="updateInfo(scope.row)" type="warning" size="small">修改</el-button>
						<el-button :disabled="scope.row.status == 0? false: true" @click="deleteInfo(scope.row)" type="danger" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<paging-btn @newList="getNewDepartList" :count="count" :limit="limit" :page="page"></paging-btn>
		</el-card>
		<el-dialog :title="departInfoTitle" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<depart-update @closeD="closeDialog" :op="'update'" v-if="operation == 'update'" :departForm="departInfo"></depart-update>
			<depart-update @closeD="closeDialog" :op="'insert'" v-if="operation == 'insert'" :departForm="departInfo"></depart-update>
			<div v-if="operation == 'delete'">确认删除这条部门信息吗？</div>
			<span v-if="operation == 'delete'" slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="deleteOK">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import DepartUpdate from '../components/DepartUpdate.vue'
	import PagingBtn from '../components/PagingBtn.vue'
	export default {
		name: "Department",
		components: {
			PagingBtn,
			DepartUpdate,
		},
		data() {
			return {
				page: 1,
				limit: 10,
				count: 0,
				num: '',
				departList: [],
				departInfo: {},
				dialogVisible: false,
				// operation: 'show' update delete find, insert
				operation: '',
				departInfoTitle: '员工信息'
			}
		},
		mounted() {
			this.getDepartList();
		},
		methods: {
			getDepartInfo() {
				if (this.num !== '') {
					this.axios.get('/depart/getinfo', {
						params: {
							number: this.num
						}
					}).then(res => {
						console.log(res);
						this.departList = [res.data]
						// console.log(this.departList)
					});
				} else {
					this.$message.warning('输入查找的部门编号不能为空');
				}
			},
			getDepartList() {
				this.page = 1;
				this.axios.get('/depart/getlist', {
					params: {
						page: this.page,
						limit: this.limit
					}
				}).then(res => {
					// console.log(res);
					this.departList = res.data.departList;
					this.count = res.data.count;
				});
			},
			getNewDepartList(newPage) {
				this.axios.get('/depart/getlist', {
					params: {
						page: newPage,
						limit: this.limit
					}
				}).then(res => {
					// console.log(res);
					this.page = newPage;
					this.departList = res.data.departList;
					this.count = res.data.count;
				});
			},
			getDetail(row) {
				this.departInfo = row;
			},
			insertDepart() {
				this.departInfo = {};
				this.operation = 'insert';
				this.departInfoTitle = '部门添加';
				this.dialogVisible = true;
			},
			updateInfo(row) {
				this.departInfo = row;
				this.operation = 'update';
				this.departInfoTitle = '部门信息修改';
				this.dialogVisible = true;
			},
			closeDialog() {
				this.dialogVisible = false;
				this.page = 1;
				this.getDepartList();
			},
			deleteInfo(row) {
				this.departInfo = row;
				this.operation = 'delete';
				this.departInfoTitle = '提示信息';
				this.dialogVisible = true;
			},
			deleteOK() {
				// console.log(this.departInfo)
				this.axios.get('/depart/delete', {
					params: {
						number: this.departInfo.number
					}
				}).then(res => {
					console.log(res);
					this.page = 1;
					this.getDepartList();
				});
				this.departInfo = {};
				// console.log(this.departInfo)
				this.dialogVisible = false;
			},
			handleClose(done) {
				this.getDepartList();
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

		.m-depart-data {
			padding: 0;
			width: 100%;
			height: 800px;
			margin-top: 60px;

			.m-find-depart {
				display: flex;
				justify-content: left;
				margin-left: 20px;
				margin-bottom: 20px;
			}
		}
	}
</style>
