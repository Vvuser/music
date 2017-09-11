<template>
	<div id="Mhead" ref="Mhead">
		<h1>Black Music</h1>
	</div>
</template>

<script>
	export default{
		mounted(){
			var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
			console.log(windowHeight * 8 / 100)
			this.$refs.Mhead.style.height = windowHeight * 8 / 100 + 'px'
		}
	}
</script>

<style>
	#Mhead h1{
		text-align: center;
		font-size: 1.4rem;
		color: #f7d15d;
		height: 8vh;
		line-height: 8vh;
		background: #222222;
	}
	
</style>