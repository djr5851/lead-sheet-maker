import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSongs, songsSelectors, deleteSong } from './songsSlice'
import SongCard from './components/SongCard'
import { useNavigate } from 'react-router-dom'

const Songs = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allSongs = useSelector(songsSelectors.selectAll)
    const onDelete = useCallback((id) => dispatch(deleteSong(id)), [])
    const onOpen = useCallback((id) => navigate(`/editor/${id}`), [])

    useEffect(() => {
        dispatch(fetchSongs())
    }, [])

    return allSongs.map((song) => (
        <SongCard key={song._id} song={song} onDelete={onDelete} onOpen={onOpen}/>
    ))
}

export default Songs
