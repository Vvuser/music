import {playMode} from './config.js'

const state = {
	singer:{},
	playing: false,
	fullScreen: false,
	playList: [],
	sequenceList: [],
	mode: playMode.sequence,
	currentIndex: -1,
	disc:{},
	topList:{}
}

export default state
