<template>
	<div>
		<Slider></Slider>
		<Songlist></Songlist>
	</div>
</template>

<script>
	import Slider from 'base/slider/slider'
	import Songlist from 'base/songList/songList'
	export default{
		components:{
			Slider,
			Songlist
		}
	}
</script>

<style>
</style>