import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { logout } from "../features/users/userSlice";
import decode from 'jwt-decode'
import './styles/NavBar.css'

const NavBar = ({ signedInUser }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // log out if jwt token is expired
        const token = signedInUser?.token;

        if (token) {
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) dispatch(logout());
        }
    })

    return (
        <nav>
          <Link className="nav--link" to="/dashboard">Dashboard </Link>
          {signedInUser && <Link className="nav--link" to={`/user/${signedInUser?.username}`}>Profile </Link> }
          { signedInUser ? (
            <>
                {/* <p>Signed in as {signedInUser?.username}</p> */}
                <button className="nav--button" onClick={() => dispatch(logout())}>Log Out</button>
            </>
          ) : (
            <button className="nav--button" onClick={() => navigate("/auth")}>Sign In</button>
          ) }
        </nav>
    )
}

export default NavBar