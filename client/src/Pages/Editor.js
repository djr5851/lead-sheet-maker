import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import SongData from "../features/songs/SongData"
import { fetchSongById, getSelectedSong, getSongsError } from "../features/songs/songsSlice";

const Editor = () => {
    const { songId } = useParams();
    const dispatch = useDispatch();
    const song = useSelector(getSelectedSong);
    const error = useSelector(getSongsError);
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        dispatch(fetchSongById(songId));
    }, []);

    let content;
    if (error) {
        content=<p>{error}</p>
    } else if (song) {
        content = 
            <div>
                <SongData loadedSong={song} user={user}/>
            </div>;
    } else {
        content = <p>Loading...</p>
    }

    return (
        <div>
            {content}
        </div>
    )
}

export default Editor