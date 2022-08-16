import decode from "jwt-decode";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { fetchSongs } from "../features/songs/songsSlice";
import { getSignedInUser, logout } from "../features/users/userSlice";
import { useReusableUI } from "../ReusableUIContext";
import './styles/NavBar.css'

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const signedInUser = useSelector(getSignedInUser);
    const { setContextMenu } = useReusableUI();
  
    useEffect(() => {
      const token = signedInUser?.token;
  
      if (token) {
          const decodedToken = decode(token);
          if(decodedToken.exp * 1000 < new Date().getTime()) dispatch(logout());
      }
    }, [location, signedInUser, dispatch])
  
    return (
      <>
        <nav>
          <div className="nav--left">
            <Link to='/dashboard' className="nav--logo" onClick={ () => dispatch(fetchSongs()) }>Lead Sheet Maker</Link>
          </div>
          <div className="nav--right">
            <div className="nav--item">
                <Link className="nav--link" to="/dashboard" onClick={ () => dispatch(fetchSongs()) }>Dashboard </Link>
              </div>
              <div className="nav--item">
                {signedInUser && <Link className="nav--link" to={`/profile/${signedInUser?.username}`}>Profile </Link> }
              </div>
              { signedInUser ? (
                <>
                    {/* <p>Signed in as {signedInUser?.username}</p> */}
                    {/* <button className="nav--button" onClick={() => dispatch(logout())}>Log Out</button> */}
                    <div className="nav--item" onClick={ (event) => setContextMenu({
                      visible: true,
                      position: { x: event.clientX, y: event.clientY },
                      content:
                        <div>
                          <button className="context--button" onClick={() => navigate(`/profile/${signedInUser?.username}`)}>View Profile</button>
                          <button className="context--button" onClick={() => dispatch(logout())}>Log Out</button>
                        </div>
                    }) }>
                      <div className="circle" >{ signedInUser.username.charAt(0) }</div>
                      <p>{ signedInUser.username }</p>
                    </div>
                </>
              ) : (
                <button className="nav--button" onClick={() => navigate("/auth")}>Sign In</button>
              ) }
          </div>
        </nav>
      </>
    )
}

export default NavBar