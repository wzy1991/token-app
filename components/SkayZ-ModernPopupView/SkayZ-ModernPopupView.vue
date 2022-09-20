<template>
	<view class="mpv" v-if="state">
		<!-- <view class="mpv-mask" :animation="animation.data.mask"></view> -->
		
			<view class="mpv-box" :style="{ height: height + 'rpx', background: background, 'border-radius': borderRadius + 'rpx ' + borderRadius + 'rpx 0 0' }">
				<view class="mpv-head" @touchmove="boxTouchMove" @touchend="boxTouchEnd" @click="handleOpen">
					<!-- <view class="mpv-head-down"></view> -->
					<u-icon v-if="height===580" name="arrow-up" size="60" color="#999999"></u-icon>
					<u-icon v-else name="arrow-down" size="60" color="#999999"></u-icon>
					</view>
				<view class="mpv-body"><slot></slot></view>
			</view>
		
	</view>
</template>

<script>
export default {
	name: 'SkayZ-ModernPopupView',
	props: {
		background: {
			type: String,
			default: 'rgba(0, 0, 0, 0.3)'
		},
		borderRadius: {
			type: Number,
			default: 32
		}
	},
	data() {
		return {
			state: true,
			height: 580,

			maxheight: 1150,
			animation: {
				object: '',
				data: {
					mask: {},
					box: {}
				}
			},
			objHeight: {
				window: 0,
				max: 0,
				now: 0,
				safeArea: 0
			},
			safeArea: 0
		};
	},
	onShow() {
		this.height = 580;
	},
	mounted() {
		this.open();
	},
	methods: {
		// 初始化组件
		init: function() {
			this.objHeight.max = this.height;
			this.objHeight.now = this.height;
			this.objHeight.window = uni.getSystemInfoSync().windowHeight;
			this.objHeight.safeArea = uni.getSystemInfoSync().safeArea.top + 10;
		},
		// 初始化事件
		initElement: async function() {
			const page = await program.currentPage();
			const element = await page.$('.mpv-head');
			await element.addEventListener('touchmove', this.boxTouchMove, false);
			await element.addEventListener('touchend', this.boxTouchEnd, false);
		},
		// 打开弹窗
		open: function() {
			this.init();
			this.state = true;
			// this.animation.data.mask = uni
			// 	.createAnimation()
			// 	.opacity(1)
			// 	.step({
			// 		duration: 300
			// 	})
			// 	.export();
			// this.animation.data.box = uni
			// 	.createAnimation({
			// 		timingFunction: 'ease'
			// 	})
			// 	.bottom(0)
			// 	.step({
			// 		duration: 300
			// 	})
			// 	.export();
			// this.setBounce('none');
		},
		handleOpen() {
			if (this.height === this.maxheight) {
				this.height = 580;
			} else {
				this.height = this.maxheight;
			}
		},
		// 关闭弹窗
		close: function() {
			this.animation.data.box = uni
				.createAnimation({
					timingFunction: 'ease'
				})
				.bottom(0 - this.height)
				.step({
					duration: 300
				})
				.export();
			this.animation.data.mask = uni
				.createAnimation()
				.opacity(0)
				.step({
					duration: 300
				})
				.export();
			setTimeout(
				function() {
					this.state = false;
				}.bind(this),
				500
			);
			this.setBounce('vertical');
		},
		// 折叠弹窗
		fold: function() {
			this.animation.data.box = uni
				.createAnimation({
					timingFunction: 'ease'
				})
				.bottom(0 - this.height + this.objHeight.safeArea)
				.step({
					duration: 300
				})
				.export();
		},
		// 点击滑动事件
		boxTouchMove: function(e) {
			// console.log(e);
			this.getOff(e);
			this.animation.data.box = uni
				.createAnimation()
				.bottom(this.objHeight.now)
				.step({
					duration: 0
				})
				.export();
		},
		// 滑动停止事件
		boxTouchEnd: function(e) {
			this.getOff(e);
			// if (this.objHeight.now * -1 > this.objHeight.max / 2) this.fold();
		},
		// 设定页面弹性
		setBounce: function(type) {
			// let weblist = plus.webview.getDisplayWebview();
			// for (let index in weblist) {
			// 	weblist[index].setStyle({
			// 		bounce: type
			// 	});
			// }
		},
		// 获取偏移值
		getOff: function(e) {
			// let heightCache = this.objHeight.window - e.changedTouches[0].clientY;
			// if (heightCache > this.objHeight.safeArea && heightCache <= this.objHeight.max) {
			// 	let off = heightCache - this.objHeight.max;
			// 	this.objHeight.now = off;
			// }

			let heightCache = this.objHeight.window - e.changedTouches[0].clientY;
			if (heightCache > this.objHeight.safeArea && heightCache > this.objHeight.now && heightCache <= 500) {
				let off = heightCache - this.objHeight.max;

				this.objHeight.now = off;
			}
			// if (heightCache > this.objHeight.safeArea && heightCache <= this.objHeight.max) {
			// 	let off = heightCache - this.objHeight.max;
			// 	this.objHeight.now = off;
			// }
		}
	}
};
</script>

<style>
@import 'icon.css';
/* 
.mpv-mask {
	opacity: 0;
	background-color: rgba(0, 0, 0, 0.3);
	position: fixed;
	height: 100vh;
	width: 100vw;
	z-index: 9;
	left: 0;
	top: 0;
} */


.mpv-box {
	/* -webkit-backdrop-filter: saturate(180%) blur(8px); */
	/* backdrop-filter: saturate(180%) blur(8px); */
	box-shadow: 0 -3px 4px rgba(0, 0, 0, 0.3);
	position: fixed;
	bottom: 0rpx;
	left: 3vw;
	z-index: 10;
	width: 94vw;
	transition: height 0.3s ease;
}

.mpv-head {
	text-align: center;
	width: 94vw;
	padding: 8px 0 0 0;
	/* margin: 0 0 8px 0; */
}

.mpv-head-down {
	color: #999999;
}
</style>
