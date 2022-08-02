import { useState } from "react"
import { useDispatch } from "react-redux";
import { changePassword } from "./userSlice";

const ChangePasswordForm = ({ user }) => {
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmNewPass, setConfirmNewPass] = useState('');

    const dispatch = useDispatch();

    const onSubmit = () => {
        dispatch(changePassword({ id: user?.result?._id, formData: { currentPass, newPass, confirmNewPass } }));
    }

    return (
        <div>
            <input type="password" value={currentPass} onChange={ (event) => setCurrentPass(event.target.value) }/>
            <label htmlFor="currentPass">Current Password</label>
            <input type="password" value={newPass} onChange={ (event) => setNewPass(event.target.value) }/>
            <label htmlFor="newPass">New Password</label>
            <input type="password" value={confirmNewPass} onChange={ (event) => setConfirmNewPass(event.target.value) }/>
            <label htmlFor="confirmNewPass">Confirm New Password</label>
            <button onClick={ onSubmit }>Change Password</button>
        </div>
    )
}

export default ChangePasswordForm