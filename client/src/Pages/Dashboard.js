import Songs from "../features/songs/Songs";
import SaveSongForm from "../features/songs/SaveSongForm"

const Dashboard = () => {
    return (
        <div>
            <SaveSongForm />
            <Songs />
        </div>
    )
}

export default Dashboard