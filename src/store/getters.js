export const singer = state => state.singer

export const playing = state => state.playing

export const fullPlaying = state => state.fullPlaying

export const playList = state => state.playList

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const fullScreen = state => state.fullScreen

export const disc = state => state.disc

export const topList = state => state.topList

export const currentSong = (state) => {
	return state.playList[state.currentIndex] || {}
}
