import {NavLink} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

import logOutIcon from "../../assets/logout.svg";
import {logOutUserR} from "../../reducers/loginReducer";

import "./Navigation.css";

const Navigation = () => {
  const loggedInUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOutUserR());
  };

  return (
    <nav className="navigation-container">
      <ul>
        <NavLink to="/">
          <li>Home</li>
        </NavLink>
        {loggedInUser === null ? (
          <div className="login-register__container">
            <NavLink to="/login">
              <li>Login</li>
            </NavLink>
            <NavLink to="/register">
              <li>Register</li>
            </NavLink>
          </div>
        ) : (
          <div className="login-register__container">
            <NavLink to={`/update/${loggedInUser.username}`}>
              <li className="username">{loggedInUser.username}</li>
            </NavLink>
            <img
              onClick={handleLogout}
              className="logout-icon"
              src={logOutIcon}
              alt="log out icon"
            />
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
