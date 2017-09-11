<template>
	<div>
		<div class="loadiing" v-if="!imgUrl.length">
			<img src="static/img/5-121204193R0-50.gif"/>
		</div>
		<div id="slider">
			<div id="child">
				<a v-for="imgs in imgUrl" :href="imgs.linkUrl">
					<img :src="imgs.picUrl" alt="" />
				</a>
				
			</div>
			<ul id="dot">
				<li :class="{bac:index==num}" v-for="(imgs,index) in imgUrl"></li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {jsonp} from '@/components/jsonp.js'
	export default{
		data(){
			return{
				imgUrl:[],
				num:0
			}
		},
		mounted(){
			var slider = document.getElementById('slider');
			var child = document.getElementById('child');
			var dot = document.getElementById('dot');
			var sliderNum = 0;
			var str = '';
			var _this = this;
			var startX = 0;
			var moveX = 0;
			var flg = null;
			child.style.width = this.imgUrl.length * 100 + 'vw';
			flg = setInterval(function(){
				sliderNum -= 100;
				_this.num++;
				if(sliderNum < (_this.imgUrl.length-1) * -100){
					sliderNum = 0;
					_this.num = 0;
				}
				child.style.left = sliderNum + 'vw';
			},2000)
//			slider.addEventListener('touchstart',function(e){
//				clearInterval(flg);
//				startX = e.changedTouches[0].pageX;
////				console.log(startX)
//			})
//			slider.addEventListener('touchend',function(e){
//				moveX = e.changedTouches[0].pageX
////				console.log(moveX)
//				console.log(startX - moveX)
//				if(startX - moveX > 20){
//					//右滑	
//					console.log('右滑')
//					sliderNum -= 100
//					
//				}else if(startX - moveX < 20){
//					//左划
//					console.log('左滑')
//					sliderNum -= 100
//					
//					
//				}
//			})
		},
		beforeMount(){
			var _this = this;
			window.reception = function(res){
//				console.log(res)
				_this.imgUrl = res.data.slider;
//				console.log(_this.imgUrl)
			}
			setTimeout(function(){
				jsonp('https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?format=jsonp&jsonpCallback=reception')
			})
//			console.log(this.imgUrl)
		}
	}
</script>

<style>
	#slider{
		width: 100vw;
		overflow: hidden;
		position: relative;
		height: 23vh;
	}
	#child{
		width: 300vw;
		position: absolute;
		left:0vw;
		display: flex;
	}
	#child img{
		display: block;
		width: 100vw;
		height: 23vh;
	}
	#dot{
		position: absolute;
		top: 20vh;
		right: 4vw;
	}
	#dot li{
		float: left;
		background: gray;
		margin: 1vw;
		padding: 1vw;
		border-radius: 1vw;
		margin-bottom: 1vh;
	}
	.bac{
		background: white !important;
	}
	.loadiing {
		justify-content: center;
		height: 23vh;
		align-items: center;
	}
	.loadiing img {
		width: 10vw;
		height: 10vw;
	}
</style>

