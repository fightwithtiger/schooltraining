<template>
	<div class="m-content">
		<el-carousel :interval="5000" class="m-carousel" height="860px">
			<el-carousel-item v-for="item in imgList" :key="item">
				<el-image style="width: 100%; height: 860px" :src="item" fit="fill">
				</el-image>
			</el-carousel-item>
		</el-carousel>
	</div>
</template>

<script>
	export default {
		name: "Index",
		data() {
			return {
				imgList: [
					"https://picsum.photos/id/1026/1903/860",
					"https://picsum.photos/id/1031/1903/860",
					"https://picsum.photos/id/1067/1903/860",
					"https://picsum.photos/id/1075/1903/860",
				]
			}
		}
	}
</script>

<style lang="scss">
	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		// line-height: 860px;
		margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}

	.m-content {
		width: 100%;
		height: 860px;
		margin-top: -2px;
		// background-color: red;

		.m-carousel {
			width: 100%;
			height: 860px;
		}
	}
</style>
