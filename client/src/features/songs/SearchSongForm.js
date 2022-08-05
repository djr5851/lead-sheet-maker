import { useState } from "react";
import { useDispatch } from "react-redux"
import { searchSongs } from "./songsSlice";

const SearchSongForm = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="search">
            <div className="form--item">
                <input required type="text" value={ searchTerm } onChange={ (event) => setSearchTerm(event.target.value) }/>
                <label htmlFor="">Search Song</label>
                <button className="form--inline--button" onClick={ () => dispatch(searchSongs(searchTerm) )}>Search</button>
            </div>
        </div>
    )
}

export default SearchSongForm