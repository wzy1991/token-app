<template>
	<u-grid :col="3">
		<u-grid-item>
			<u-icon name="scan" :size="46"></u-icon>
			<view class="grid-text">扫码</view>
		</u-grid-item>
		<u-grid-item>
			<u-icon name="lock" :size="46"></u-icon>
			<view class="grid-text">锁头</view>
		</u-grid-item>
	</u-grid>
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


<style scoped lang="scss">
	.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: $u-type-info;
	}
</style>