<template>
	<div class="songList">
		<h1>热门歌单推荐</h1>
		<div class="loadiing" v-if="!songList.length">
			<img src="static/img/5-121204193R0-50.gif"/>
		</div>
		<div class="list" v-for="item in songList" @click="jump(item)">
			<div class="listImg">
				<img v-lazy="item.imgurl"/>
			</div>
			<div class="listContent">
				<h1 v-html="item.creator.name"></h1>
				<p v-html="item.dissname"></p>
			</div>
		</div>
	</div>
</template>

<script>
	import {jsonp} from '@/components/jsonp.js'
	import {mapMutations} from 'vuex'
	export default{
		data(){
			return{
				songList:[]
			}
		},
		created(){
			let _this = this;
//			console.log(this.songList.length)
			setTimeout(function(){
				_this.http.get('http://guoxiao158.top/1504/www/music.php').then(res=>{
//					console.log(res)
					_this.songList = res.data.data.list
//					console.log(_this.songList)
				},2000)
			})
			
			
		},
		beforeMount(){
			console.log(this.songList)
		},
		methods:{
			jump(item){
				console.log(item)
				this.$router.push({
					path:'/childrecomDetails',
					query:{id:item.dissid}
				})
				this.setDisc(item)
			},
			...mapMutations({
				setDisc: 'SET_DISC'
			})
		}
	}
</script>

<style>
	.songList{
		text-align: center;
	}
	.songList>h1{
		color: #f7d15d;
		font-size: 1rem;
		height: 10vh;
		line-height: 10vh;
	}
	.list{
		display: flex;
		width: 100vw;
		height: 16vh;
		align-items: center;
	}
	.listImg img{
		width: 22vw;
		margin-left: 6vw;
	}
	.listContent {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 16vh;
	}
	.listContent h1{
		color: white;
		text-align: left;
		font-size: 1rem;
		margin-left: 6vw;
		margin-bottom: 1vh;
	}
	.listContent p {
		color: #5a5a5a;
		margin-left: 6vw;
		font-size: 0.9rem;
		width: 55vw;
		text-align: left;
	}
	.loadiing{
		display: flex;
		justify-content: center;
	}
	.loadiing img {
		margin: 15vh;
		width: 10vw;
		height: 10vw;
	}
</style>