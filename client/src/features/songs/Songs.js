import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSongs, songsSelectors, deleteSong } from './songsSlice'
import SongCard from './components/SongCard'

const Songs = ({ signedInUser, query, isProfile }) => {
    const dispatch = useDispatch();
    const allSongs = useSelector(songsSelectors.selectAll)
    const onDelete = useCallback((id, dispatch) => dispatch(deleteSong(id)), [])
    const onOpen = useCallback((id, navigate) => navigate(`/editor/${id}`), [])

    useEffect(() => {
        dispatch(fetchSongs(query));
    }, [])

    return allSongs.map((song) => (
        <SongCard
            key={ song._id }
            song={ song }
            signedInUser={ signedInUser }
            onDelete={ isProfile ? onDelete : null }
            onOpen={ onOpen }/>
    )) 
}

export default Songs
