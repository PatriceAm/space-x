import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {loginUserR} from "../../reducers/loginReducer";
import loginBg from "../../assets/space-login-1.jpg";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loggedInUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUserR({username, password}));
  };

  if (loggedInUser) {
    setTimeout(() => {
      navigate("/");
    }, 0);
  }

  return (
    <div className="login_container">
      <div className="login_inner-container">
        <img src={loginBg} alt="earth" />
        <form className="login_form" onSubmit={handleLogin}>
          <h1>Log in for more details</h1>
          <div className="login_input-container">
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              required
            />
            <label htmlFor="username">
              <span className="login_name">Username</span>
            </label>
          </div>

          <div className="login_input-container">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">
              <span className="login_name">Password</span>
            </label>
          </div>
          <button className="login-btn">Login</button>
        </form>
      </div>

      <div className="no_account">
        <p>
          New to <span>SpaceX</span> ?
        </p>
        <Link to="/register">Create an account</Link>
      </div>
    </div>
  );
};

export default Login;
