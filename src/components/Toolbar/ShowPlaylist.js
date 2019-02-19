import React from 'react';
import StyledSwitch from './Switch.style'

const NightMode = ({showPlaylist, showPlaylistToggle})=>(
	<StyledSwitch>
		<span>ShowPlaylist</span>
		<label className="switch">
			<input type="checkbox" checked={showPlaylist} onChange={showPlaylistToggle}/>
			<span className="slider round"/>
		</label>
	</StyledSwitch>
)

export default NightMode
