import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSongs, songsSelectors, deleteSong } from './songsSlice'
import SongCard from './SongCard'

const Songs = ({ query, setContextMenu, isProfile }) => {
    const dispatch = useDispatch();
    const allSongs = useSelector(songsSelectors.selectAll)
    const onDelete = useCallback((id, dispatch) => dispatch(deleteSong(id)), [])
    const onOpen = useCallback((id, navigate) => navigate(`/editor/${id}`), [])

    useEffect(() => {
        dispatch(fetchSongs(query));
    }, [dispatch, query])

    return allSongs.map((song) => (
        <SongCard
            key={ song._id }
            song={ song }
            onDelete={ isProfile ? onDelete : null }
            onOpen={ onOpen }
            setContextMenu={ setContextMenu }
            />

    )) 
}

export default Songs
