<template>
	<div>
		<ul id="suggest">
			<li v-show="singer.name">
				<p @click="toSinger(singer)"><i class="iconfont icon-ren headFontColor"><span>{{singer.name}}</span></i></p>
			</li>
			<li v-for="(song, index) in searchList">
				<p @click="playMusic(song, index)"><i class="iconfont icon-yinle headFontColor"><span>{{song.name}} - {{song.singer[0].name}}</span></i></p>
			</li>
		</ul>
	</div>
</template>

<script>
	import {jsonp} from '@/components/jsonp.js'
	import {mapMutations, mapActions} from 'vuex'
	export default{
		data(){
			return{
				singer:{},
				searchList:[]
			}
		},
		props:{
			query:{
				type: String,
				default: ''
			}
		},
		watch:{
			query(){
				if(this.query !== ''){
					jsonp('https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=1142331531&uin=614330288&format=jsonp&jsonpCallback=getSearchMsg&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w='+this.query+'&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=1&remoteplace=txt.mqq.all&_=1504666229050')	
				}
				
			}
		},
		created(){
			window.getSearchMsg = (res)=>{
				console.log(res)
				this.searchList = []
				let singer = res.data.zhida
				let list = res.data.song.list
				let _this = this
				this.singer.id = singer.singermid
				this.singer.name = singer.singername,
				this.singer.imgUrl = 'http://y.gtimg.cn/music/photo_new/T001R300x300M000'+ singer.singermid +'.jpg?max_age=2592000'
//				console.log(this.singer)
				
				list.map(function(el){
					_this.searchList.push({
						id: el.songmid,
						mid: el.songid,
						singer: el.singer,
						name: el.songname,
						album: el.albumname,
						duration: el.interval,
						img:'http://y.gtimg.cn/music/photo_new/T002R300x300M000'+el.albummid+'.jpg?max_age=2592000',
						songUrl:'http://dl.stream.qqmusic.qq.com/'+el.songid+'.m4a?fromtag=38'
					})
				})
//				console.log(this.searchList)
			}
		},
		methods:{
			toSinger(singer){
				this.$router.push({
					path:'childparticulars',
					query:{id:singer.id}
				})
				this.setSinger(singer)
				console.log(singer)
			},
			...mapMutations({
				setSinger: 'SET_SINGER'
			}),
			playMusic(song, index){
				this.selectPlay({
					list:this.searchList,
					index
				})
				console.log(song)
			},
			...mapActions([
				'selectPlay'
			])
		}
		
	}
</script>

<style>
#suggest{
	margin-top: 20px;
}
#suggest li{
	line-height: 3rem;
}
#suggest li p{
	display: flex;
	color: gray !important;
	align-items: center;
}
#suggest li p span{
	color: gray !important;
	margin-left: 2vw;
}
.headFontColor{
	color: gray !important;
}
</style>