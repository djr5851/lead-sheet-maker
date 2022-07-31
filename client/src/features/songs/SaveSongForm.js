import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAllUsers } from "../users/usersSlice";
import { createSong } from "./songsSlice";

const SaveSongForm = () => {

    const [title, setTitle] = useState('My Song');
    const [userId, setUserId] = useState('0');
    const users = useSelector(selectAllUsers);
    const dispatch = useDispatch();

    const onSavePostClicked = () => {
        dispatch(createSong({ title, userId }));
    };

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));

    return (
        <div>
            <select id="postAuthor" value={userId} onChange={(event) => setUserId(event.target.value)}>
                <option value=""></option>
                {usersOptions}
            </select>
            <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
            <button type="button" onClick={onSavePostClicked}>Save Song</button>
        </div>
    )
}

export default SaveSongForm