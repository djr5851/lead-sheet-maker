import Songs from "../features/songs/Songs";
import SaveSongForm from "../features/songs/SaveSongForm"

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <div>
            <SaveSongForm user={ user } />
            <Songs user={ user }/>
        </div>
    )
}

export default Dashboard