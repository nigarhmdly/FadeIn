import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Register.module.scss';
import { useRegisterMutation } from "../../redux/slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import 'react-toastify/ReactToastify.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigation('/dashboard');
    }
  }, [navigation, userInfo]);



  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigation('/dashboard');
    } catch (error) {
      toast.error('Register fail');
    }
  }

  return (

      <section className={styles.login}>
<div className={styles.card}>
    <h1>Register</h1>
<form onSubmit={handleRegister}>
<input
  type="text"
  name="name"
  placeholder="Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  required
/>



<input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />









<button type="submit" disabled={isLoading}>
            {isLoading ? 'User creating' : 'Register'}
          </button>


<p>Do you have an account? <a  onClick={() => navigation('/login')} href="/login">Login</a></p>


     </form>


</div>
    </section>
  );
};

export default Register;
