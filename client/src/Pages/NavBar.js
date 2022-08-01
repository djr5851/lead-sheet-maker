import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { logout } from "../features/users/userSlice";
import decode from 'jwt-decode'

const NavBar = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // log out if jwt token is expired
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) dispatch(logout());
        }
    })

    return (
        <nav>
          <Link to="/dashboard">Dashboard </Link>
          { user ? (
            <>
                <p>Signed in as {user?.result.username}</p>
                <button onClick={() => dispatch(logout())}>Log Out</button>
            </>
          ) : (
            <button onClick={() => navigate("/auth")}>Sign In</button>
          ) }
        </nav>
    )
}

export default NavBar