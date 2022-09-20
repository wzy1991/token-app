<template>
	<view class="user-content">
		<view class="settings-wrap">
			<view class="settings">
				<u-cell-group :border="false">
					<!-- <u-cell-item icon="lock-open" title="ww" @click="handlePrompt"></u-cell-item> -->

					<u-cell-item title="扫码" @click="handleToPage('/pages/qr/index')">
						<view slot="icon" style="margin-right: 10rpx;"><u-image width="50rpx" height="50rpx" :src="'/static/icon/scan.png'"></u-image></view>
					</u-cell-item>
					<u-cell-item title="展示二维码" @click="handleToPage('/pages/qr/show')">
						<view slot="icon" style="margin-right: 10rpx;"><u-image width="50rpx" height="50rpx" :src="'/static/icon/qr.png'"></u-image></view>
					</u-cell-item>
				</u-cell-group>
			</view>
		</view>
	</view>
</template>

<script>
import { chooseImage } from '@/utils/utils.js';
import { mapGetters, mapMutations } from 'vuex';
export default {
	data() {
		return {
			pic: '/static/man.png',
			show: true,
			version_number: ''
		};
	},
	computed: {
		...mapGetters(['userInfo'])
	},
	onLoad() {
		uni.getSystemInfo({
			success: function(res) {
				console.log(res);
			}
		});
	},
	methods: {
		async handleToPage(page) {
			uni.navigateTo({
				url: page
			});
		},
		handlePrompt() {
			let url = '/pages/prompt/prompt';
			let param = {};
			this.$api.navTo.togo(url, param);
		},
		chooseImage() {
			chooseImage(img => {
				console.log(img);
				this.avatar = img;
			});
		},
		handleLogout() {
			var _this = this;
			uni.showModal({
				title: '提示',
				content: '退出登录？',
				showCancel: true,
				success: res => {
					if (res.confirm) {
						_this.$store.commit('logout');
						uni.reLaunch({
							url: '/pages/login/index'
						});
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.user-content {
	// padding: 20rpx ;
	color: $uni-text-color;
}
.user-box {
	padding-top: 180rpx;
}
.settings-wrap {
	display: flex;
	justify-content: center;
	.settings {
		margin-top: 50rpx;
		width: 98%;
		height: 480rpx;
		background-color: #ffffff;
		border-radius: 18rpx;
		padding: 10rpx;
		display: flex;
		align-items: center;
		font-weight: bold;
		
	}
}
</style>
