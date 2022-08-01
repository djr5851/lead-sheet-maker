import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSong } from "./songsSlice";

const SaveSongForm = ({ user }) => {

    const [title, setTitle] = useState('My Song');
    const dispatch = useDispatch();

    const onSavePostClicked = () => {
        if (user) {
            dispatch(createSong({ title, userID: user.result._id }));
        }
    };

    return (
        <div>
            { user && (
                <>
                    <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
                    <button type="button" onClick={onSavePostClicked}>Save Song</button>
                </>
            ) }
        </div>
    )
}

export default SaveSongForm