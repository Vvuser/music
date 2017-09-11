<template>
	<div id="M-tab" ref="tab">
		<div v-for="(text,index) in nav">
			<span @click="jump(index,$event)" :class="{check:index==num}">{{text.test}}</span>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				nav:[{
						toLink:'/recommend',
						test:'推荐'
					},{
						toLink:'/singer',
						test:'歌手'
					},{
						toLink:'/rank',
						test:'排行'
					},{
						toLink:'/search',
						test:'搜索'}
					],
				num:0
			}
		},
		methods:{
			jump(index){
				this.num = index;
				this.$router.push({
					path: this.nav[index].toLink
				})
				
			}
		},
		mounted(){
			var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
			console.log(windowHeight * 6 / 100)
			this.$refs.tab.style.height = windowHeight * 6 / 100 + 'px'
		}
	}
</script>

<style>
	#M-tab {
		display: flex;
		justify-content: space-around;
		font-size: 1rem;
		font-weight: bold;
		height: 6vh;
		line-height: 6vh;
		background: #222222;
	}
	
	#M-tab span{
		padding: 1vh 0;
	}
	
	.check{
		color: #f7d15d;
		border-bottom: 2px solid #f7d15d;
	}
</style>