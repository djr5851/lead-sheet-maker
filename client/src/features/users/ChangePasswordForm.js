import { useState } from "react"
import { useDispatch } from "react-redux";
import { changePassword } from "./userSlice";

const ChangePasswordForm = ({ signedInUser }) => {
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmNewPass, setConfirmNewPass] = useState('');

    const dispatch = useDispatch();

    const onSubmit = () => {
        dispatch(changePassword({ id: signedInUser?._id, formData: { currentPass, newPass, confirmNewPass } }));
    }

    return (
        <div className="changePasswordForm">
            <div className="form--item">
                <input type="password" required value={currentPass} onChange={ (event) => setCurrentPass(event.target.value) }/>
                <label htmlFor="currentPass">Current Password</label>
            </div>
            <div className="form--item">
                <input type="password" required value={newPass} onChange={ (event) => setNewPass(event.target.value) }/>
                <label htmlFor="newPass">New Password</label>
            </div>
            <div className="form--item">
                <input type="password" required value={confirmNewPass} onChange={ (event) => setConfirmNewPass(event.target.value) }/>
                <label htmlFor="confirmNewPass">Confirm New Password</label>
            </div>
            <button onClick={ onSubmit }>Change Password</button>
        </div>
    )
}

export default ChangePasswordForm