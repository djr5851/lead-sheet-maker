import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const SongCard = ({ song, signedInUser, onOpen, onDelete }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div className='songCard'>
            <h2>{song.title}</h2>
            <div className='songCard--creator'>
                <p>Created by: </p>
                <Link to={`/user/${song.creator}`}>{ song.creator }</Link>
            </div>
            <button onClick={() => onOpen(song._id, navigate)}>Open Song</button>
            { onDelete && signedInUser && signedInUser._id === song.userId && <button onClick={() => onDelete(song._id, dispatch)}>Delete Song</button> }
        </div>
    )
}

export default memo(SongCard)