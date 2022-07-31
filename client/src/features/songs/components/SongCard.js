import PropTypes from 'prop-types'
import { memo } from 'react';

const SongCard = ({ song, onOpen, onDelete }) => {
    return (
        <div>
            <p>{song.title}</p>
            <button onClick={() => onOpen(song._id)}>Open Song</button>
            <button onClick={() => onDelete(song._id)}>Delete Song</button>
        </div>
    )
}

SongCard.propTypes = {
    onOpen: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    song: PropTypes.object.isRequired
};

export default memo(SongCard)