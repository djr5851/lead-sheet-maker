import Songs from "../features/songs/Songs";
import SaveSongForm from "../features/songs/SaveSongForm"
import './styles/Dashboard.css'


const Dashboard = ({ signedInUser }) => {
    return (
        <div className="dashboard">
            <SaveSongForm signedInUser={ signedInUser } />
            <div className="songs">
                <Songs signedInUser={ signedInUser } isProfile={ false }/>
            </div>
        </div>
    )
}

export default Dashboard