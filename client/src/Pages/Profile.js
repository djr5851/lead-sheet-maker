import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Songs from '../features/songs/Songs';
import ChangePasswordForm from '../features/users/ChangePasswordForm';
import { deleteAccount, getSelectedUser, getUserByUsername, getUserLoading } from '../features/users/userSlice';
import './styles/Profile.css'

const Profile = ({ signedInUser }) => {
    const dispatch = useDispatch();
    const { username } = useParams();
    const user = useSelector(getSelectedUser);
    const loading = useSelector(getUserLoading)

    useEffect(() => {
        dispatch(getUserByUsername(username));
    }, [username]);

    let content;
    if (loading) {
        content = <p>Loading...</p>
    } else if (user) {
        content = 
            <>
                <div className='profile'>
                    { signedInUser.username === user.username && <div className='profile--settings'>
                        <h1>Settings</h1>
                        <p>Change Password</p>
                        { signedInUser && <ChangePasswordForm user={ signedInUser }  /> }
                        { signedInUser && <button className='deleteButton' onClick={() => dispatch(deleteAccount(signedInUser?._id))}>Delete Account</button> }
                    </div> }
                    
                    <div className='profile--content'>
                        <h1 className='profile--title'>{username}'s Profile</h1>
                        <div className='songs'>
                            <Songs user={ signedInUser } query={{ creator: username }} isProfile={ true } />
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