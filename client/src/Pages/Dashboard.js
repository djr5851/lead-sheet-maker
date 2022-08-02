import Songs from "../features/songs/Songs";
import SaveSongForm from "../features/songs/SaveSongForm"

const Dashboard = ({ user }) => {
    return (
        <div>
            <SaveSongForm user={ user } />
            <Songs user={ user }/>
        </div>
    )
}

export default Dashboard