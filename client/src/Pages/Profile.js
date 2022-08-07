import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Songs from '../features/songs/Songs';
import ChangePasswordForm from '../features/users/ChangePasswordForm';
import SaveSongForm from '../features/songs/SaveSongForm';
import { deleteAccount, getSelectedUser, getSignedInUser, getUserByUsername, getUserLoading } from '../features/users/userSlice';
import './styles/Profile.css'

const Profile = () => {
    const dispatch = useDispatch();
    const { username } = useParams();
    const user = useSelector(getSelectedUser);
    const signedInUser = useSelector(getSignedInUser);
    const loading = useSelector(getUserLoading)

    useEffect(() => {
        dispatch(getUserByUsername(username));
    }, [username, dispatch]);

    let content;
    if (loading) {
        content = <p>Loading...</p>
    } else if (user) {
        content = 
            <>
                <div className='profile'>
                    { signedInUser?.username === user.username && <div className='profile--settings'>
                        <h1>Settings</h1>
                        <p>Change Password</p>
                        { signedInUser && <ChangePasswordForm user={ signedInUser }  /> }
                        { signedInUser && <button className='deleteButton' onClick={() => dispatch(deleteAccount(signedInUser?._id))}>Delete Account</button> }
                    </div> }
                    
                    <div className='profile--content'>
                        <h1 className='profile--title'>{username}'s Profile</h1>
                        <SaveSongForm />

                        <div className='songs'>
                            <Songs signedInUser={ signedInUser } query={{ creator: username }} isProfile={ true } />
                        </div>
                    </div>
                </div>
            </>
    } else {
        content=<h1>{username}'s profile does not exist</h1>
    }


    return (
        <>
            { content }
        </>
    )
}

export default Profile