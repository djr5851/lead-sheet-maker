import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserError, signIn, signUp } from "../features/users/userSlice";
import './styles/Auth.css'

const Auth = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({ username: "", pass: "", confirmPass: ""});
    const dispatch = useDispatch();
    const error = useSelector(getUserError);

    const handleSubmit = (event) => {
        event.preventDefault();
        isSignup ? dispatch(signUp(formData)) : dispatch(signIn(formData));
    };

    const handleChange = (event) => {
        setFormData(prev => ({ ...prev, [event.target.name]: event.target.value }))
    }

    const toggleSignUp = () => {
        setIsSignup(prev => !prev)
    }

    return (
        <div className="auth--container">
            <form className="auth--form" onSubmit={handleSubmit}>
                <h1>{ isSignup ? "Create Account" : "Sign In" }</h1>
                <p>{error}</p>
                <div className="form--item">
                    <input type="text" name="username" required onChange={handleChange}/>
                    <label htmlFor="username">Username</label>
                </div>
                <div className="form--item">
                    <input type="password" name="pass" required onChange={handleChange}/>
                    <label htmlFor="pass">Password</label>
                </div>
                { isSignup && (
                    <div className="form--item">
                        <input type="password" name="confirmPass" required onChange={handleChange}/>
                        <label htmlFor="confirmPass">Confirm Password</label>
                    </div>
                )}
                <button className="auth--button" type="submit">{ isSignup ? "Create Account" : "Sign In" }</button>
                <p onClick={toggleSignUp}>{ isSignup ? "Switch to Sign In" : "Switch to Create Account" }</p>
            </form>
        </div>
    )
}

export default Auth