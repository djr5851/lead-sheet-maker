import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Songs from '../features/songs/Songs';
import ChangePasswordForm from '../features/users/ChangePasswordForm';
import { deleteAccount } from '../features/users/userSlice';

const Profile = ({ signedInUser }) => {
    const dispatch = useDispatch();
    const { username } = useParams();
    return (
        <div>
            { signedInUser && <ChangePasswordForm user={ signedInUser }  /> }
            { signedInUser && <button onClick={() => dispatch(deleteAccount(signedInUser?.result?._id))}>Delete Account</button> }
            <Songs user={ signedInUser } query={{ creator: username }} />
        </div>
    )
}

export default Profile