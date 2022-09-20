<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
@import 'uview-ui/index.scss';
* {
	font-family: 'Alibaba-PuHuiTi-Regular';
}
page {
	height: 100%;
	font-size: $uni-font-size-base;
	background-color: $uni-bg-color;
	
}
</style>
