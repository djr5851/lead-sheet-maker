import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSong } from "./songsSlice";

const SaveSongForm = ({ signedInUser }) => {

    const [title, setTitle] = useState('My Song');
    const dispatch = useDispatch();

    const onSavePostClicked = () => {
        if (signedInUser) {
            dispatch(createSong({ title, userID: signedInUser._id }));
        }
    };

    return (
        <div>
            { signedInUser && (
                <>
                    <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
                    <button type="button" onClick={onSavePostClicked}>Save Song</button>
                </>
            ) }
        </div>
    )
}

export default SaveSongForm