<template>
	<div>
		<div id="searchBac" ref="searchBox">
			<div class="left">
				<i class="iconfont icon-icon searchIcon"></i>
			</div>
			<div class="center">
				<input id="search" type="text" :placeholder="placeholder" v-model="val"/>
			</div>
			<div class="right">
				<i v-show="val" class="iconfont icon-guanbi searchIcon" @click="empty"></i>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				val:''
			}
		},
		props: {
			placeholder:{
				type: String,
				default:'搜索歌曲、歌手'
			}
		},
		methods:{
			empty(){
				this.val = ''
			},
			setQuery(query){
				this.val = query
			}
		},
		created(){
			this.$watch('val', (newVal)=>{
				this.$emit('val', newVal)
			})
		}
	}
</script>

<style>
	#searchBac{
		width: 80vw;
		height: 40px;
		background: #333333;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.searchIcon{
		font-size: 1.4rem;
		color: black;
		margin: 0 2vw;
	}
	#search{
		width: 60vw;
		height: 3vh;
		background: #333333;
		border: none;
		outline-color: #F7D15D;
		outline: none;
	}
	.left{
		flex: 1;
	}
	.center{
		flex: 4;
	}
	.right{
		flex: 1;
	}
</style>