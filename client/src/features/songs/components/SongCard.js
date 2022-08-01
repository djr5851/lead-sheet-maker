import PropTypes from 'prop-types'
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SongCard = ({ song, user, onOpen, onDelete }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div>
            <h2>{song.title}</h2>
            <p>Created by: {song.creator}</p>
            <button onClick={() => onOpen(song._id, navigate)}>Open Song</button>
            { user && user.result._id === song.userId && <button onClick={() => onDelete(song._id, dispatch)}>Delete Song</button> }
        </div>
    )
}

SongCard.propTypes = {
    onOpen: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    song: PropTypes.object.isRequired
};

export default memo(SongCard)