import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useReusableUI } from '../../ReusableUIContext';
import { getSignedInUser } from '../users/userSlice';

const SongCard = ({ song, onOpen, onDelete }) => {
    const signedInUser = useSelector(getSignedInUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setContextMenu } = useReusableUI();

    return (
        <div className='songCard'>
            <h2 className='songCard--context' onClick={ (event) => setContextMenu({
                visible: true,
                position: { x: event.clientX, y: event.clientY },
                content:
                    <div>
                        <button className="context--button" onClick={() => onOpen(song._id, navigate)}>Open Song</button>
                        { signedInUser && signedInUser._id === song.userId && <button className="context--button" onClick={() => onDelete(song._id, dispatch)}>Delete Song</button> }
                    </div>
                }) }>…</h2>
            <div className='songCard--title'>
                <h2>{song.title}</h2>
            </div>
            <div className='songCard--creator'>
                <p>Created by: </p>
                <Link to={`/profile/${song.creator}`}>{ song.creator }</Link>
            </div>
            <button onClick={() => onOpen(song._id, navigate)}>Open Song</button>
        </div>
    )
}

export default memo(SongCard)