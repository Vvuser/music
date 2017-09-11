<template>
	<div>
		<div class="loadiing" v-if="!topList.length">
			<img src="static/img/5-121204193R0-50.gif"/>
		</div>
		<ul>
			<li v-for="(item,index) in topList" @click="jump(item)">
				<div class="bacBox">
					<div class="rankImg">
						<img :src="item.picUrl"/>
					</div>
					<div class="rankContent">
						<h2 v-text="item.topTitle"></h2>
						<ul>
							<li v-for="(song,index) in item.songList">
								
								<p>
									<span class="fontCol" v-text="index+1"></span>
									{{song.songname}}
									<span class="fontCol"> - </span>
									<span class="fontCol">{{song.singername}}</span>
								</p>
								
								
							</li>
						</ul>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import {mapMutations} from 'vuex'
	import {jsonp} from '@/components/jsonp.js'
	export default {
		data(){
			return {
				topList:[]
			}
		},
		created(){
			window.getRank = (res)=>{
				console.log(res)
				this.topList = res.data.topList
			}
			jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=1142331531&uin=614330288&format=jsonp&jsonpCallback=getRank&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1504583727354')
		},
		methods:{
			jump(item){
				console.log(item)
				this.$router.push({
					path:'/childrankDetails',
					query:{id:item.id}
				})
				this.setTopList(item)
			},
			...mapMutations({
				setTopList: 'SET_TOP_LIST'
			})
		}
	}
</script>

<style>
	.loadiing{
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: flex-start;
	}
	.loadiing img{
		margin-top: 30vh;
		width: 10vw
	}
	.bacBox{
		display: flex;
		width: 92vw;
		height: 16vh;
	}
	.rankImg img{
		width: 16vh;
	}
	.rankImg{
		display: flex;
		align-items: center;
	}
	.rankContent{
		margin: 0 4vw;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		position: relative;
	}
	.rankContent h2{
		width: 50vw;
		font-size: 1rem;
		position: absolute;
		top: 1.6vh;
	}
	.rankContent ul{
		margin-top: 5vh;
	}
	.rankContent ul li span{
		text-wrap: none;
	}
	.bacBox{
		background: #323232;
		margin: 4vw;
	}
	.fontCol{
		color: rgb(127, 127, 127);
	}
</style>