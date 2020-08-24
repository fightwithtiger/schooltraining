<template>
	<div class="m-container">
		<el-card class="m-room-data">
			<div class="m-find-room">
				<div>
					<el-input label="会议室编号" size="medium" v-model="num" placeholder="请输入会议室编号"></el-input>
				</div>
				<el-button @click="getRoomInfo" type="primary" size="small">查找</el-button>
				<el-button @click="insertRoom" type="success" size="small">新增会议室</el-button>
			</div>
			<el-table stripe :data="roomList != null? roomList: null" height="660" style="width: 100%" @row-click="getDetail">
				<el-table-column prop="number" label="会议室编号" width="100">
					<template slot-scope="scope">
						{{ scope.row.number }}
					</template>
				</el-table-column>
				<el-table-column prop="staffNumber" label="负责人编号" width="140">
					<template slot-scope="scope">
						{{ scope.row.staffNumber }}
					</template>
				</el-table-column>
				<el-table-column prop="hot" label="热度">
					<template slot-scope="scope">
						{{ scope.row.hot }}
					</template>
				</el-table-column>
				<el-table-column prop="restTimes" label="预约剩余次数" width="80">
					<template slot-scope="scope">
						{{ scope.row.restTimes }}
					</template>
				</el-table-column>
				<el-table-column prop="image" label="内景图">
					<template slot-scope="scope">
						<el-image style="width: 100px; height: 70px;" :src="scope.row.image" fit="fill"></el-image>
					</template>
				</el-table-column>
				<el-table-column prop="status" label="状态">
					<template slot-scope="scope">
						{{ scope.row.status == 0? '正常': '已删除' }}
					</template>
				</el-table-column>
				<el-table-column prop="" label="操作" width="200">
					<template slot-scope="scope">
						<el-button @click="updateInfo(scope.row)" type="warning" size="small">修改</el-button>
						<el-button :disabled="scope.row.status == 0? false: true" @click="deleteInfo(scope.row)" type="danger" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<paging-btn @newList="getNewRoomList" :count="count" :limit="limit" :page="page"></paging-btn>
		</el-card>
		<el-dialog :title="roomInfoTitle" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<room-update @closeD="closeDialog" :op="'update'" v-if="operation == 'update'" :roomForm="roomInfo"></room-update>
			<room-update @closeD="closeDialog" :op="'insert'" v-if="operation == 'insert'" :roomForm="roomInfo"></room-update>
			<div v-if="operation == 'delete'">确认删除这条会议室信息吗？</div>
			<span v-if="operation == 'delete'" slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="deleteOK">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import PagingBtn from '../components/PagingBtn.vue'
	import RoomUpdate from '../components/RoomUpdate.vue'
	export default{
		name: "Room",
		components: {
			PagingBtn,
			RoomUpdate
		},
		data() {
			return {
				page: 1,
				limit: 5,
				count: 0,
				num: '',
				roomList: [],
				roomInfo: {},
				dialogVisible: false,
				// operation: 'show' update delete find, insert
				operation: '',
				roomInfoTitle: '会议室信息'
			}
		},
		mounted() {
			this.getRoomList();
		},
		methods: {
			getRoomInfo() {
				if (this.num !== '') {
					this.axios.get('/room/getinfo', {
						params: {
							number: this.num
						}
					}).then(res => {
						console.log(res);
						this.roomList = [res.data]
						// console.log(this.roomList)
					});
				} else {
					this.$message.warning('输入查找的部门编号不能为空');
				}
			},
			getRoomList() {
				this.page = 1;
				this.axios.get('/room/getlist', {
					params: {
						page: this.page,
						limit: this.limit
					}
				}).then(res => {
					console.log(res);
					this.roomList = res.data.roomList;
					this.count = res.data.count;
				});
			},
			getNewRoomList(newPage) {
				this.axios.get('/room/getlist', {
					params: {
						page: newPage,
						limit: this.limit
					}
				}).then(res => {
					// console.log(res);
					this.page = newPage;
					this.roomList = res.data.roomList;
					this.count = res.data.count;
				});
			},
			getDetail(row) {
				this.roomInfo = row;
			},
			insertRoom() {
				this.roomInfo = {};
				this.operation = 'insert';
				this.roomInfoTitle = '会议室添加';
				this.dialogVisible = true;
			},
			updateInfo(row) {
				this.roomInfo = { ...row };
				this.operation = 'update';
				this.roomInfoTitle = '会议室信息修改';
				this.dialogVisible = true;
			},
			closeDialog() {
				this.dialogVisible = false;
				this.page = 1;
				this.getRoomList();
			},
			deleteInfo(row) {
				this.roomInfo = row;
				this.operation = 'delete';
				this.roomInfoTitle = '提示信息';
				this.dialogVisible = true;
			},
			deleteOK() {
				// console.log(this.departInfo)
				this.axios.get('/room/delete', {
					params: {
						number: this.roomInfo.number
					}
				}).then(res => {
					console.log(res);
					this.page = 1;
					this.getRoomList();
				});
				this.roomInfo = {};
				// console.log(this.roomInfo)
				this.dialogVisible = false;
			},
			handleClose(done) {
				this.getRoomList();
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
	
		.m-room-data {
			padding: 0;
			width: 100%;
			height: 800px;
			margin-top: 60px;
	
			.m-find-room {
				display: flex;
				justify-content: left;
				margin-left: 20px;
				margin-bottom: 20px;
			}
		}
	}
</style>
