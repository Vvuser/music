<template>
	<div id="app">
		<div id="header" v-show="bol">
			<Mhead></Mhead>
			<Mtab></Mtab>
		</div>
		
		<div id="main" ref="main">
			<transition name="slide">
				<keep-alive>
					<router-view></router-view>
				</keep-alive>
			</transition>
		</div>
		
		<player id="player"></player>
		
	</div>
</template>

<script>
	import Mhead from '@/components/m-head/m-head'
	import Mtab from '@/components/tab/tab'
	import player from '@/components/player/player'
	import { mapGetters } from 'vuex'
	export default {
		data(){
			return {
				bol: true
			}
		},
		computed:{
			...mapGetters([
				'playList'
			])
		},
		components:{
			Mhead,
			Mtab,
			player
		},
		mounted(){
			let _this = this;
			let main = document.getElementById('main')
			window.onhashchange = function(){
				console.log(window.location.hash.indexOf('#/particulars') > -1)
				if(window.location.hash.indexOf('#/child') > -1){
					_this.bol = false
					main.style.top = 0
				}else{
					_this.bol = true
					main.style.top = 15 + 'vh'
				}
			}
		},
		watch:{
			playList(){
				if(this.playList.length > 0){
					this.$refs.main.style.marginBottom = 10 + 'vh'
				}
			}
			
		}
	}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
		color: white;
	}
	
	body {
		background: #222222;
	}
	
	ul,ol,li{
		list-style: none;
	}
	#header{
		width: 100vw;
		position: fixed;
		top: 0;
		z-index: 10;
		animation: vvv 0.3s;
	}
	@keyframes vvv{
		from{right: -100vw;}
		to{right: 0vw;}
	}
	#main{
		position: absolute;
		top: 15vh;
		overflow: auto;
	}
	
	.slide-enter-active{
		transition: all 0.3s;
	}
	.slide-enter,.slide-leave-to{	
		transform: translate3d(100%,0,0);
	}
	
	#player{
		position: fixed;
		z-index: 20;
	}
</style>