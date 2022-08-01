import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSongs, songsSelectors, deleteSong } from './songsSlice'
import SongCard from './components/SongCard'

const Songs = ({ user }) => {
    const dispatch = useDispatch();
    const allSongs = useSelector(songsSelectors.selectAll)
    const onDelete = useCallback((id, dispatch) => dispatch(deleteSong(id)), [])
    const onOpen = useCallback((id, navigate) => navigate(`/editor/${id}`), [])

    const loadSongs = () => {
        dispatch(fetchSongs());
    }

    useEffect(() => {
        loadSongs();
    }, [])

    return allSongs.map((song) => (
        <SongCard key={song._id} song={song} user={user} onDelete={onDelete} onOpen={onOpen}/>
    )) 
}

export default Songs
