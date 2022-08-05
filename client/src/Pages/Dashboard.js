import Songs from "../features/songs/Songs";
import './styles/Dashboard.css'
import SearchSongForm from "../features/songs/SearchSongForm";
import { useState } from "react";


const Dashboard = ({ setContextMenu }) => {
    const [query, setQuery] = useState({});
    return (
        <div className="dashboard">
            <SearchSongForm setQuery={ setQuery } />
            <div className="songs">
                <Songs query={query} setContextMenu={ setContextMenu } isProfile={ false }/>
            </div>
        </div>
    )
}

export default Dashboard