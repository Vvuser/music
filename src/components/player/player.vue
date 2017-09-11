<template>
	<div v-show="playList.length>0">
		<transition name="bigPlay">
			<div id="musicPlay" v-show="fullScreen">
				<img id="bacImg" :src="currentSong.img" />
				<div id="bac"></div>
				<div id="headMp">
					<i @click="back" class="iconfont icon-jiantouxia"></i>
					<h1 v-html="currentSong.name"></h1>
					
				</div>
				<div id="mainBox" ref="leftRight" @click="leftRight">
					<div id="mainMp" ref="left">
						<div id="imgMmp">
							<img :class="playAnimation" :src="currentSong.img" />
						</div>
						<div id="lyricMmp" ref="right">
							<p v-html="lyricStr"></p>
						</div>
					</div>
					<div id="mainTwoMp" ref="mainTwoMp">
						<div class="mainTwoMpBox">
							<p ref="p" v-for="(item, index) in lyricDom" v-html="item"></p>
						</div>
					</div>
				</div>
				<div id="controllerMp">
					<div id="bar">
						<div>
							<span v-html="format(currentTime)"></span>
						</div>
						<div class="bar" @click="assign">
							<div class="barBac" ref="barBac">
								<div ref='bac' style="background: black;"></div>
								<div ref="ago" style="background: #F7D15D;width: 0vw;"></div>
								<span ref="barBtn" class="barBtn" 
									@touchstart.prevent="barBtnStart"
									@touchmove.prevent="barBtnMove"
									@touchend="barBtnEnd"
								></span>
							</div>
						</div>
						<div>
							<span v-html="format(currentSong.duration)"></span>
						</div>
					</div>
					<div class="bigBtn">
						<div>
							<i @click="changeMode" :class="iconMode"></i>
						</div>
						<div>
							<i @click="prev" class="iconfont icon-icon-4 size"></i>
						</div>
						<div>
							<i @click="togPlay" :class="playingIcon"></i>
						</div>
						<div>
							<i @click="next" class="iconfont icon-icon-2 size"></i>
						</div>
						<div>
							<i class="iconfont icon-xihuan size"></i>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<transition name="bigPlay">
			<div id="songList" v-show="songListBol">
				<div class="songListHead">
					<i @click="songListBol=false" style="font-size: 1.8rem;" class="iconfont icon-jiantouxia"></i>
				</div>
				<div class="songList">
					<ul>
						<li class="song" v-for="(song, index) in playList">
							<h1 @click="setCurrentIndex(index)" :class="{extrude:index==currentIndex}" v-html="song.name"></h1>
							<div>
								<i @click="delSong(index)" style="margin-right: 4vw; color: gray;" class="iconfont icon-guanbi qwe"></i>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>
		<transition name="mini">
			<div id="miniPlayer" v-show="!fullScreen" ref="mini">
				<div class="msg" @click="enter">
					<div>
						<img :class="playAnimation" :src="currentSong.img" />
					</div>
					<div class="nameMsg">
						<h1 v-html="currentSong.name"></h1>
						<h2 v-html="currentSong.singer[0].name"></h2>
					</div>
				</div>
				<div class="btn">
					<div>
						<i @click="togPlay" :class="playingIcon"></i>
					</div>
					<div @click="songListBol=true">
						<i class="icon iconfont icon-icon-"></i>
					</div>
				</div>
			</div>
		</transition>
		<audio ref="audio" :src="currentSong.songUrl" @canplay="ready" @error="error" @timeupdate="updateTime" @ended="end"></audio>
	</div>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex'
	import { playMode } from '@/store/config.js'
	import { Base64 } from 'js-base64'
	export default {
		data() {
			return {
				songReady: false,
				currentTime: 0,
				touch:{},
				lyric:[],
				lyricDom:[],
				lyricStr:'',
				lyricBol:true,
				length:0,
				whiteNum:0,
				songListBol: false
			}
		},
		computed: {
			iconMode(){
				if(this.mode === playMode.sequence){
					return 'iconfont icon-icon-7 size'
				}else if(this.mode === playMode.loop){
					return 'iconfont icon-icon-6 size'
				}else if(this.mode === playMode.random){
					return 'iconfont icon-icon-8 size'
				}
			},
			playAnimation() {
				if(this.playing) {
					return 'play'
				} else {
					return 'play stop'
				}
			},
			playingIcon() {
				if(this.playing) {
					return 'iconfont icon-icon-5 size'
				} else {
					return 'iconfont icon-icon-11 size'
				}
			},
			...mapGetters([
				'playList',
				'fullScreen',
				'currentSong',
				'playing',
				'currentIndex',
				'mode',
				'sequenceList'
			])
		},
		methods: {
			delSong(index){
				this.playList.splice(index,1)
			},
			leftRight(){
				if(this.lyricBol){
					this.$refs.leftRight.style.left = -100 + 'vw'
					this.lyricBol = false
				}else{
					this.$refs.leftRight.style.left = 0 + 'vw'
					this.lyricBol = true
				}
				
			},
			end(){
				if(this.mode !== playMode.loop){
					this.next()
				}
			},
			random(num){
				return Math.floor(Math.random() * num)
			},
			changeMode(){
				let mode = (this.mode+1) % 3
				this.setPlayMode(mode)
				let list = []
				for(let i in this.sequenceList){
					list[i] = this.sequenceList[i]
				}
				if(this.mode === playMode.random){
					for(let i=0;i<list.length;i++){
						let j = this.random(i);
						if(j != 0){
							let t = list[i];
							list[i] = list[j];
							list[j] = t;
						}
					}
					let index = list.findIndex((item) => {
						return item.id === this.currentSong.id
					})
					this.setCurrentIndex(index)
					this.setPlayList(list)
					this.$refs.audio.loop = false
				}else if(this.mode === playMode.sequence){
					let index = list.findIndex((item) => {
						return item.id === this.currentSong.id
					})
					this.setCurrentIndex(index)
					this.setPlayList(list)
					this.$refs.audio.loop = false
				}else if(this.mode === playMode.loop){
					this.$refs.audio.loop = true
				}
//				console.log(this.playList) 修改的数据
//				console.log(this.sequenceList)  未修改的数据
				
			},
			barBtnStart(e){
				this.touch.initiated = true
				this.touch.startX = e.touches[0].pageX
				this.touch.left = parseInt(this.$refs.barBtn.style.left)
			},
			barBtnMove(e){
				if(!this.touch.initiated){
					return
				}
				let deltaX = e.touches[0].pageX - this.touch.startX
				this.$refs.barBtn.style.left = Math.min(parseInt(this.$refs.bac.offsetWidth), Math.max(-10,this.touch.left + deltaX))+ 'px'
				this.$refs.ago.style.width = Math.min(parseInt(this.$refs.bac.offsetWidth), Math.max(-10,this.touch.left + deltaX))+ 'px'
			},
			barBtnEnd(){
				this.touch.initiated = false
				this.$refs.audio.currentTime = this.currentSong.duration * (parseInt(this.$refs.ago.style.width) / parseInt(this.$refs.bac.offsetWidth))
//				console.log(parseInt(this.$refs.ago.style.width) / parseInt(this.$refs.bac.offsetWidth))
				if(!this.playing){
					this.togPlay()
				}
			},
			assign(e){
				let width = e.pageX - this.$refs.barBac.getBoundingClientRect().left;
				this.$refs.audio.currentTime = this.currentSong.duration * (width / parseInt(this.$refs.bac.offsetWidth))
				
			},
			back() {
				this.setFullScreen(false)
				var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
				console.log(windowHeight / 10)
				this.$refs.mini.style.height = windowHeight / 10 + 'px'
			},
			enter() {
				this.setFullScreen(true)
			},
			togPlay() {
				this.setPlayingState(!this.playing)
			},
			prev() {
				if(!this.songReady) {
					return
				}
				let index = this.currentIndex - 1
				if(index === -1) {
					index = this.playList.length - 1
				}
				this.setCurrentIndex(index)
				if(!this.playing) {
					this.setPlayingState(true)
				}
				this.songReady = false
			},
			next() {
				if(!this.songReady) {
					return
				}
				let index = this.currentIndex + 1
				if(index === this.playList.length) {
					index = 0
				}
				this.setCurrentIndex(index)
				if(!this.playing) {
					this.setPlayingState(true)
				}
				this.songReady = false
			},
			ready() {
				this.songReady = true;
			},
			error() {
				this.songReady = true;
			},
			updateTime(e) {
//				this.$refs.p[this.$refs.p.length - 1].style.marginBottom = 30 + 'vh'
				console.log(this.currentIndex)
				this.currentTime = e.target.currentTime
				let time = e.target.currentTime | 0
				if(this.lyric[time]){
					this.lyricStr = this.lyric[time]
				}
				if(!this.touch.initiated){
//					console.log(e.target.currentTime / this.currentSong.duration * 100)
					this.$refs.ago.style.width = e.target.currentTime / this.currentSong.duration * 100 + '%'
					let bacWidth = this.$refs.bac.offsetWidth
					this.$refs.barBtn.style.left = (this.$refs.bac.offsetWidth) * (e.target.currentTime / this.currentSong.duration) - 10 + 'px'
//					console.log(this.$refs.bac.offsetWidth)
				}
				
			},
			format(interval) {
				interval = interval | 0
				let minute = interval / 60 | 0 
				let second = interval%60
				let dit = '0'
				if(second.toString().length == 1){
					dit = '0'
				}else{
					dit = ''
				}
				return minute + ':' + dit + second
			},
			...mapMutations({
				setFullScreen: 'SET_FULL_SCREEN',
				setPlayingState: 'SET_PLAYING_STATE',
				setCurrentIndex: 'SET_CURRENT_INDEX',
				setPlayMode :'SET_PLAY_MODE',
				setSequenceList: 'SET_SEQUENCE_LIST',
				setPlayList: 'SET_PLAYLIST'
				
			})
		},
		watch: {
			lyricStr(oldStr, newStr){
//				this.$refs.p[this.$refs.p.length - 1].style.paddingBottom = 30 + 'vh'
				if(oldStr === newStr){
					return
				}
				let mainTwoMp = document.getElementById('mainTwoMp')
				let length = this.lyricDom.length
				let height = mainTwoMp.scrollHeight / length
				setTimeout(function(){
					mainTwoMp.scrollTop += height 
				})
				console.log(mainTwoMp.scrollTop)
				
				
			},
			currentSong(newSong, oldSong) {
				if(newSong === oldSong){
					return;
				}

				setTimeout(function(){
					
				})
				this.$nextTick(() => {
					this.$refs.audio.play()
				})
				this.http.get('http://guoxiao158.top/1504/www/getlyric.php?id='+this.currentSong.id).then(res=>{
					eval(res.data)
					console.log('__________________________________________')
					this.$refs.mainTwoMp.scrollTop = 0 
				})
				
			},
			playing(newPlaying) {
				this.$nextTick(() => {
					if(newPlaying) {
						this.$refs.audio.play()
					} else {
						this.$refs.audio.pause()
					}
				})
			}
		},
		created(){
			let _this = this
			window.MusicJsonCallback_lrc = function(res){
				let lyric = Base64.decode(res.lyric);
				let list = []
//				console.log(lyric)
				lyric = lyric.split('\n')
//				console.log(lyric)
				
				lyric.map((el)=>{
//					if(el.length)
					let timeArr = el.substr(1,8).split(':');
					list[timeArr[0]*60+parseInt(timeArr[1].substr(0,2))] = el.substr(10)
				})
//				console.log(list)
				_this.lyric = list
				_this.lyricDom = list.filter(el=>{
					if(el !== ''){
						return true
					}
				})
				
				console.log(_this.lyric)
				console.log(_this.lyricDom)
				
			}
			
			
		}
	}
</script>

<style>
	#mainBox{
		width: 200vw;
		display: flex;
		overflow: auto;
		left: 0vw;
		position: absolute;
	}
	#bac {
		position: absolute;
		width: 100vw;
		height: 100vh;
		z-index: -2;
		background: #222222;
	}
	
	#bacImg {
		position: absolute;
		width: 100vw;
		height: 100vh;
		filter: blur(20px) grayscale(0.7);
		z-index: -1;
	}
	
	#musicPlay {
		width: 100vw;
		height: 100vh;
	}
	
	#miniPlayer {
		width: 100vw;
		height: 10vh;
		background: #383838;
		position: fixed;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	#miniPlayer .msg {
		display: flex;
		margin-left: 2vw;
	}
	
	#miniPlayer .msg .nameMsg {
		display: flex;
		margin-left: 2vw;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	#miniPlayer .msg .nameMsg h1 {
		font-size: 1rem;
	}
	
	#miniPlayer .msg .nameMsg h2 {
		color: #707070;
	}
	
	#miniPlayer .btn {
		display: flex;
		margin-right: 2vw;
	}
	
	#miniPlayer .btn div {
		margin-left: 5vw;
	}
	
	#miniPlayer .btn div i {
		font-size: 2rem !important;
		color: #F7D15D;
	}
	
	#miniPlayer img {
		width: 8vh;
		height: 8vh;
		border-radius: 50%;
	}
	
	#headMp {
		width: 100vw;
		height: 10vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 1.4rem;
	}
	
	#headMp h2 {
		font-size: 0.6rem;
		color: #707070;
	}
	
	#headMp i {
		font-size: 1.4rem;
		position: fixed;
		left: 4vw;
		top: 0vw;
	}
	
	#mainMp {
		width: 100vw;
		height: 60vh;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	#mainTwoMp{
		width: 100vw;
		height: 60vh;
		position: relative;
		overflow: auto;
		
	}
	#mainTwoMp .mainTwoMpBox{
		width: 100vw;
		height: 3vh;
		position: absolute;
		top: 27vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		line-height: 2rem;
	}
	#imgMmp {
		flex: 5;
		display: flex;
		align-items: center;
	}
	
	#imgMmp img {
		width: 70vw;
		height: 70vw;
		border: 10px solid #343434;
		border-radius: 50%;
	}
	
	.play {
		animation: zhuang 20s linear infinite;
	}
	
	.stop {
		animation-play-state: paused;
	}
	
	@keyframes zhuang {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
	
	#lyricMmp {
		flex: 1;
		color: rgb(212, 212, 212) !important;
		font-size: 1rem;
	}
	
	
	#controllerMp {
		position: absolute;
		width: 100vw;
		height: 30vh;
		bottom: 0;
	}
	
	#controllerMp>div {
		height: 15vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	#controllerMp .bigBtn>div {
		margin: 0 3vw;
	}
	
	.size {
		font-size: 3rem;
		color: #F7D15D;
		font-weight: bold;
	}
	
	.bigPlay-enter-active,
	.bigPlay-leave-active {
		transition: all 0.4s;
	}
	
	.bigPlay-enter,
	.bigPlay-leave-to {
		opacity: 0;
		transform: translate3d(0, 100%, 0);
	}
	
	.mini-enter-active,
	.mini-leave-active {
		transition: all 0.4s;
	}
	
	.mini-enter,
	.mini-leave-to {
		opacity: 0;
	}
	
	#bar {
		height: 5vh !important;
	}
	#bar div{
		margin: 0 3vw;
	}
	#bar .bar div{
		width: 65vw;
		height: 1.2vw;
		margin: 0 !important;
		border-radius: 10vh;
		
	}
	.barBac{
		position: relative;
		height: 5vh;
	}
	.barBac div{
		position: absolute;
	}
	.barBac .barBtn{
		position: absolute;
		width: 3vw;
		height: 3vw;
		border-radius: 10vh;
		border: none;
		background: #F7D15D;
		border: 1vw solid white;
		left: -10px;
		top: -1.8vw;
	}
	#songList{
		width: 100vw;
		height: 70vh;
		background: #323232;
		position: fixed;
		bottom: 0;
		z-index: 6;
	}
	#songList .songList{
		width: 100vw;
		height: 65vh;
		overflow: auto;
	}
	#songList .songList .song{
		width: 100vw;
		height: 5vh;
		display: flex;
		justify-content: space-between;
		align-items: center;
		
	}
	#songList .songList .song h1{
		color: gray;
		margin-left: 4vw;
		font-size: 1rem;
	}
	#songList .songListHead{
		width: 100vw;
		height: 5vh;
		background: #4e4e4e;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.extrude{
		color: white !important; 
	}
	.qwe{
		font-size: 1rem !important
	}
</style>