<template>
	<div>
		<div id="searchBox" ref="searchBox">
			<SearchBox ref="search" @val="getQuery"></SearchBox>
		</div>
		<div class="hotSearch" v-show="!searchStr">
			<h2>热门搜索</h2>
			<ul>
				<li v-for="test in hotList" >
					<span v-text="test.k" @click="transfer(test.k)"></span>
				</li>
			</ul>
		</div>
		<div class="hotSearchList" v-show="searchStr">
			<Suggest :query="searchStr"></Suggest>
		</div>
	</div>
</template>

<script>
	import SearchBox from '@/base/searchBox/searchBox'
	import {jsonp} from '@/components/jsonp.js'
	import Suggest from '@/components/suggest/suggest'
	export default {
		data(){
			return {
				hotList: [],
				searchStr: ''
			}
		},
		components:{
			SearchBox,
			Suggest
		},
		beforeMount(){
			var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
			console.log(windowHeight)
			this.$refs.searchBox.style.height = windowHeight / 20 + 'px'
		},
		created(){
			window.getHotList = res => {
				console.log(res)
				let list = res.data.hotkey
				this.hotList = list.filter((el,index)=>{
					if(index <=9 ){
						return true
					}
				})
				console.log(this.hotList)
			}
			jsonp('https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=1142331531&uin=614330288&format=jsonp&jsonpCallback=getHotList&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1504662475475')
		},
		methods:{
			transfer(query){
				this.$refs.search.setQuery(query)
			},
			getQuery(val){
				this.searchStr = val
			}
		}
	}
</script>

<style>
#searchBox{
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
}
.hotSearch{
	width: 90vw;
	padding-left: 10vw;
	
}
.hotSearchList{
	width: 90vw;
	padding-left: 10vw;
}
.hotSearch h2{
	color: gray;
	margin: 20px 0;
}
.hotSearch ul{
	width: 80vw;
	display: flex;
	flex-wrap: wrap;
}
.hotSearch ul li{
	padding: 4vw 4vw 4vw 0;
	
}
.hotSearch ul li span{
	padding: 2vw;
	background: #333333;
	border-radius: 4px;
	color: gray;
}
</style>