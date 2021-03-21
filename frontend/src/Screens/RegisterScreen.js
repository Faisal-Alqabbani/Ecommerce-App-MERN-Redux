import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function RegisterScreen(props) {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, error, loading } = userRegister;
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [redirect, props.history, userInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: singin action.
    if (password !== confirmPassword) {
      alert("Password and confirm password are not match!");
    } else {
      dispatch(register(name, email, password));
    }
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Register</h1>
        </div>
        {loading && <LoadingBox />}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            id="name"
            placeholder="Your Name"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email Address </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm password </label>
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="confirmPassword"
            placeholder="Confirm Your Password "
            required
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            You already have an account?{" "}
            <Link to={`/singin?redirect=${redirect}`}>Sign in</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterScreen;
