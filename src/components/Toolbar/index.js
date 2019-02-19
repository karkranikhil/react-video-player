import React from 'react'
import NightMode from './NightMode'
import ShowPlaylist from './ShowPlaylist'
import StyledToolbar from './index.style'

const Toolbar = ({nightModeToggle, nightMode, showPlaylist, showPlaylistToggle})=>(
  <StyledToolbar id="video-toolbar">
    <NightMode nightModeToggle={nightModeToggle} nightMode={nightMode} />
    <ShowPlaylist showPlaylistToggle={showPlaylistToggle} showPlaylist={showPlaylist} />
  </StyledToolbar>
)

export default Toolbar
