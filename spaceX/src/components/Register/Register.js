import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";

import registerBg from "../../assets/register-bg.jpg";
import {newUserR} from "../../reducers/registerReducer";
import {showNotificationR} from "../../reducers/notificationReducer";

import "./Register.css";
import {useEffect} from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const newUser = useSelector((state) => state.register);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      dispatch(showNotificationR("error", "Passwords do not match", 5));
    } else {
      const userData = {username, name, password};
      dispatch(newUserR(userData));
    }
  };

  useEffect(() => {
    if (newUser.username) {
      navigate("/login");
    }
  }, [navigate, newUser.username]);

  return (
    <div className="register_container">
      <div className="register_inner-container">
        <form className="register_form" onSubmit={handleLogin}>
          <h1>Create your free Account</h1>
          <p className="text">and experience SpaceX today</p>
          <div className="register_input-container">
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              required
            />
            <label htmlFor="username">
              <span className="register_name">Username</span>
            </label>
          </div>

          <div className="register_input-container">
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="name">
              <span className="register_name">Name</span>
            </label>
          </div>

          <div className="register_input-container">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">
              <span className="register_name">Password</span>
            </label>
          </div>

          <div className="register_input-container">
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label htmlFor="confirmPassword">
              <span className="register_name">Repeat Password</span>
            </label>
          </div>
          <button className="register-btn">Register</button>
        </form>
        <img src={registerBg} alt="spacex" />
      </div>

      <div className="create_account">
        <p>Already have an account?</p>
        <Link to="/login">Sign in</Link>
      </div>
    </div>
  );
};

export default Register;
