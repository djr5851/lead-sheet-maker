import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSignedInUser } from "../users/userSlice";
import { createSong } from "./songsSlice";

const SaveSongForm = () => {

    const [title, setTitle] = useState('My Song');
    const dispatch = useDispatch();
    const signedInUser = useSelector(getSignedInUser);

    const onSavePostClicked = () => {
        if (signedInUser) {
            dispatch(createSong({ title, userID: signedInUser._id }));
        }
    };

    return (
        <div>
            <div className="form--item">
                <input type="text" required value={title} onChange={(event) => setTitle(event.target.value)}/>
                <label >Song Title</label>
                <button type="button" className="form--inline--button" onClick={onSavePostClicked}>Create Song</button>
            </div>
        </div>
    )
}

export default SaveSongForm