import { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn, signUp } from "../features/users/userSlice";

const Auth = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({ username: "", pass: "", confirmPass: ""});
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        isSignup ? dispatch(signUp(formData)) : dispatch(signIn(formData));
    };

    const handleChange = (event) => {
        setFormData(prev => ({ ...prev, [event.target.name]: event.target.value }))
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" onChange={handleChange}/>
                <label htmlFor="username">Username</label>
                <input type="password" name="pass" onChange={handleChange}/>
                <label htmlFor="pass">Password</label>
                { isSignup && (
                    <>
                        <input type="password" name="confirmPass" onChange={handleChange}/>
                        <label htmlFor="confirmPass">Confirm Password</label>
                    </>
                )}
                <button type="submit">{ isSignup ? "Create Account" : "Sign In" }</button>
            </form>
            <button onClick={() => setIsSignup(prev => !prev)}>{ isSignup ? "Switch to Sign In" : "Switch to Create Account" }</button>
        </div>
    )
}

export default Auth