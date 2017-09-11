<template>
	<div>
		<ul id="singerList">
			<li v-for="(items,index) in maps">
				<h2 class="singTitle" v-html="items.title"></h2>
				<ul>
					<li v-for="item in items.items" class="block" @click="jump(item)">
						<div>
							<img v-lazy="item.imgUrl" alt="" />
						</div>
						<div>
							<h1 v-html="item.name"></h1>
						</div>
					</li>
				</ul>
			</li>
		</ul>
		<div id="quickList">
			<ul>
				<li @click="scroll(index)" v-for="(item,index) in quickList">
					{{item}}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {jsonp} from '@/components/jsonp.js'
	import {mapMutations} from 'vuex'
	const HOT_NAME = '热门';
	const HOT_NAME_LEN = 10;
	export default {
		data(){
			return{
				singers:[],
				maps:[],
				quickList:[],
				num:0
			}
		},
		beforeMount(){
			let _this = this;
			window.GetSingerListCallback = function(res){
				console.log(res)
				_this.singers = res.data.list
			}
			jsonp('https://c.y.qq.com/v8/fcg-bin/v8.fcg?channel=singer&page=list&key=all_all_all&pagenum=1&jsonpCallback=GetSingerListCallback&format=jsonp')
		},
		watch:{
			singers(){
				this.maps = {
					hot:{
						title: HOT_NAME,
						items:[]
					}
				}
				this.singers.forEach((el,index)=>{
					if(index < HOT_NAME_LEN){
						this.maps.hot.items.push({
							id: el.Fsinger_mid,
							name: el.Fsinger_name,
							imgUrl: 'http://y.gtimg.cn/music/photo_new/T001R300x300M000'+ el.Fsinger_mid +'.jpg?max_age=2592000'
						})
					}
					const key = el.Findex;
					if(!this.maps[key]){
						this.maps[key] = {
							title: key,
							items:[]
						}
					}
//					console.log(el.Findex)
//					console.log(this.maps[key].title)
					if(el.Findex == this.maps[key].title){
						this.maps[key].items.push({
							id: el.Fsinger_mid,
							name: el.Fsinger_name,
							imgUrl: 'http://y.gtimg.cn/music/photo_new/T001R300x300M000'+ el.Fsinger_mid +'.jpg?max_age=2592000'
						})
					}
				})
				
				
				let hot = [];
				let ret = [];
				for(let key in this.maps){
					let val = this.maps[key]
					if(val.title.match(/[a-zA-Z]/)){
						ret.push(val)
					}else if(val.title === HOT_NAME){
						hot.push(val)
					}
				}
				ret.sort((a,b)=>{
					return a.title.charCodeAt(0) - b.title.charCodeAt(0)
				})
//				console.log(ret)
				this.maps = hot.concat(ret)
//				console.log(this.maps)
				this.maps.map((el)=>{
					this.quickList.push(el.title.substr(0,1))
				})
			},
			num(){
				let singTitle = document.getElementsByClassName('singTitle');
				let hgt = document.body.scrollHeight;
				let topHgt = 0;
				for(var i=0;i<this.num;i++){
					topHgt +=singTitle[i].parentNode.offsetHeight;
				}
				document.body.scrollTop = topHgt / hgt * document.body.scrollHeight
			}
		},
		methods:{
			scroll(index){
				this.num = index;
			},
			jump(item){
				this.$router.push({
					path:'childparticulars',
					query:{id:item.id}
				})
				this.setSinger(item)
			},
			...mapMutations({
				setSinger: 'SET_SINGER'
			})
		}
	}
</script>

<style>
	#singerList{
		width: 100vw;
	}
	.singTitle{
		height: 5vh;
		background: #323232;
		line-height: 5vh;
		padding-left:4vw;
		color: #707070;
		font-size: 1rem;
	}
	.block{
		display: flex;
		align-items: center;
		height: 12vh;
	}
	.block div{
		margin: 0 2vw 0 4vw;
	}
	.block img{
		width: 18vw;
		border-radius: 50%;
	}
	.block h1{
		color: #707070;
		font-size: 1rem;
	}
	#quickList{
		width: 4vw;
		text-align: center;
		position: fixed;
		right: 0;
		top: 25vh;
		background: black;
		padding: 2vh 0;
		border-radius: 10vh;
		
	}
	#quickList li{
		color: #707070;
		font-weight: bold;
	}
	/*.clickColor{
		color: #f7d15d !important;
	}*/
</style>