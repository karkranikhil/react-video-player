import React, {useState, useEffect} from 'react'
import {ThemeProvider} from 'styled-components'
import SmoothCollapse from 'react-smooth-collapse'

import Video from './Video'
import Playlist from '../Playlist'
import logo from './logo.svg';
import {StyledPlayer, Header, Logo} from './Player.style'
import {videosList} from '../../db/video'

const theme={
	bgcolor:'#353535',
	bgcolorItem:'#414141',
	bgcolorItemActive:"#405c63",
	bgcolorPlayed:"#526d4e",
	border:"none",
	borderPlayed:"none",
	color:"#fff"
}
const themeLight={
	bgcolor:'#fff',
	bgcolorItem:'#fff',
	bgcolorItemActive:"#80a7b1",
	bgcolorPlayed:"#7d9979",
	border:"1px solid #353535",
	borderPlayed:"none",
	color:"#353535"
}

const Player = props =>{
	const savedState = JSON.parse(localStorage.getItem(`${videosList.playlistId}`))
	const [state, setState] = useState({
		activeVideo:savedState ? savedState.activeVideo :videosList.playlist[0],
		autoplay:savedState ? savedState.autoplay :false,
		nightMode:savedState ? savedState.nightMode :true,
		playlistId:savedState ? savedState.playlistId :videosList.playlistId,
		showPlaylist:savedState ? savedState.showPlaylist :true,
		videos:savedState ? savedState.videos: videosList.playlist
	})

	useEffect(()=>{
		localStorage.setItem(`${state.playlistId}`, JSON.stringify({...state}))
	},[state])

	useEffect(()=>{
		const videoId = props.match.params.activeVideo
		if(videoId !== undefined){
			const newActiveVideo = state.videos.findIndex(
				video=>video.id === videoId
			)
			setState({
				...state,
				activeVideo:state.videos[newActiveVideo],
				autoplay:props.location.autoplay
			})
		} else {
			props.history.push({
				pathname:`/${state.activeVideo.id}`,
				autoplay:false
			})
		}
	},
		[props.match.params.activeVideo]
	)

	const nightModeToggle=()=>{
		setState({...state, nightMode: !state.nightMode})
	}

	const showPlaylistToggle=()=>{
		setState({...state, showPlaylist: !state.showPlaylist})
	}

	const endCallback=()=>{
		const videoId = props.match.params.activeVideo
		const currentVideoIndex = state.videos.findIndex(
			video=>video.id === videoId
		)
		const nextVideo = currentVideoIndex === state.videos.length-1 ? 0 : currentVideoIndex +1
		props.history.push({
			pathname:`${state.videos[nextVideo].id}`,
			autoplay:false
		})
	}
	
	const progressCallback = e => {
		let duration = state.activeVideo.duration
		let splitTime = duration.split(':');
		let totalSeconds
		if(splitTime.length === 3){
			totalSeconds = (+splitTime[0]) * 60 * 60 + (+splitTime[1]) * 60 + (+splitTime[2]); 
		} else if(splitTime.length === 2){
			totalSeconds = (+splitTime[0]) * 60 + (+splitTime[1]); 
		} else {
			totalSeconds = (+splitTime[0]); 
		}
		if(e.playedSeconds > (totalSeconds-60)){
			const videos = [...state.videos];
			const playedVideo = videos.find(
				video => video.id === state.activeVideo.id
			)
			playedVideo.played = true;
			setState({ ...state, videos })
		}
	}

	return (
		<ThemeProvider theme={state.nightMode ? theme:themeLight}>
			{state.videos !== null ? (
				<>
					<Header nightMode={state.nightMode}><Logo src={logo} alt="logo" />React Tube</Header>
					<StyledPlayer>
						<Video
							active={state.activeVideo}
							autoplay={state.autoplay}
							endCallback={endCallback}
							nightModeToggle={nightModeToggle}
							nightMode={state.nightMode}
							progressCallback={progressCallback}
							showPlaylist={state.showPlaylist}
							showPlaylistToggle={showPlaylistToggle}
						/>
						<SmoothCollapse expanded={state.showPlaylist} heightTransition="0.618s ease-out">
							<Playlist 
								videos={state.videos}
								active={state.activeVideo}
								nightMode={state.nightMode}
							/>
						</SmoothCollapse>
					</StyledPlayer>
				</>
			):null}
		</ThemeProvider>
	)
}

export default Player
