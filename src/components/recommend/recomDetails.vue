<template>
	<div id="PP">
		<div id="headP">
			<i @click="back" class="iconfont icon-fanhui"></i>
			<h1 v-html="disc.dissname"></h1>
		</div>
		<div id="imgP">
			<img :src="disc.imgurl"/>
			<div style="width: 100%;height: 100%;background: black; position: fixed; top: 0; opacity: 0.5;"></div>
		</div>
		<div id="mainP">
			<div class="loadiing" v-if="!songList.length">
				<img src="static/img/5-121204193R0-50.gif"/>
			</div>
			<ul>
				<li class="boxP" v-for="(item,index) in songList" @click="pushPlayList(item, index)">
					<div class="firstP">
						<h1 :class="{yellow:index==0,white:index==1,orange:index==2}">{{index+1}}</h1>
					</div>
					<div class="twoice">
						<h1 v-html="item.name"></h1>
						<h2>{{item.singer[0].name}} · {{item.album}}</h2>
					</div>
					
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {jsonp} from '@/components/jsonp.js'
	import {mapGetters, mapActions} from 'vuex'
	export default{
		data(){
			return {
				songList:[],
			}
		},
		computed:{
			...mapGetters([
				'singer',
				'fullScreen',
				'disc'
			])
		},
		activated(){
			let _this = this;
			this.songList = []
			window.getSongList = function(res){
				console.log(res.cdlist[0].songlist)
				let list = res.cdlist[0].songlist
//				console.log(list)
				_this.songList = []
				list.map(function(el){
					_this.songList.push({
						id: el.mid,
						mid: el.id,
						singer: el.singer,
						name: el.name,
						album: el.album.name,
						duration: el.interval,
						img:'http://y.gtimg.cn/music/photo_new/T002R300x300M000'+el.album.mid+'.jpg?max_age=2592000',
						songUrl:'http://dl.stream.qqmusic.qq.com/'+el.id+'.m4a?fromtag=38'
					})
				})
				console.log(_this.songList)
			}
			console.log(this.singer)
			console.log(this.$route.query.id)
			jsonp('https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?g_tk=5381&uin=0&format=jsonp&jsonpCallback=getSongList&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&new_format=1&pic=500&disstid='+this.disc.dissid+'&type=1&json=1&utf8=1&onlysong=0&nosign=1&_=1504580482069')
		},
		methods:{
			back(){
				this.$router.go(-1)
			},
			pushPlayList(item, index){
				this.selectPlay({
					list:this.songList,
					index
				})
			},
			...mapActions([
				'selectPlay'
			])
		},
		watch:{
			fullScreen(){
				let mainP = document.getElementById('mainP');
				if(this.fullScreen){
					mainP.style.height = 45 + 'vh'
				}else{
					mainP.style.height = 60 + 'vh'
				}
			}
		},
		created(){
			console.log(this.$route.query.id)
		}
	}
</script>

<style>
#PP{
	position: relative;
}
#headP{
	width: 100vw;
	height: 8vh;
	line-height: 8vh;
	position: fixed;
	top: 0;
	z-index: 5;
	text-align: center;
	
}
#headP h1{
	font-size: 1rem;
}
#headP i{
	font-size: 1.4rem;
	font-weight: bold;
	z-index: 5;
	position: fixed;
	left: 0;
}
#imgP img{
	width: 100vw;
}
#imgP{
	width: 100vw;
	height: 100vh;
}
#mainP{
	width: 100vw;
	height: 53vh;
	background: #222222;
	position: absolute;
	top: 48vh;
	z-index: 4;
	overflow: auto;
}
.boxP{
	height: 10vh;
	display: flex;
	font-size: 1rem;
}
.boxP .firstP h1{
	height: 10vh;
	text-align: center;
	line-height: 10vh;
	border: 0;
	padding: 0;
	margin: 0;
	width: 12vw;
	color: #707070;
}
.boxP .twoice{
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.boxP .twoice h1{
	
	margin: 1vw;
}
.boxP .twoice h2{
	
	margin: 1vw;
	color: #707070;
}
.yellow{
	color: yellow !important;
}
.white{
	color: white !important;
}
.orange{
	color: orange !important;
}
</style>
