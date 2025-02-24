import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styles from "./EditProfile.module.scss";
import { IoChevronBack } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { logout, setCredentials } from "../../redux/slices/authSlice";
import { useLogoutMutation, useUpdateUserMutation } from "../../redux/slices/usersApiSlice";


const Edit = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [biography, setBiography] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateUser({
          _id: userInfo._id,
          name,
          email,
          password,
          image,
          biography,
        }).unwrap();

        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
        setPassword('');
        setConfirmPassword('');
        navigate("/activity");
      } catch (error) {
        toast.error(error.data.message || error.message);
      }
    }
  };

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setImage(userInfo.image);
      setBiography(userInfo.biography);
    }
  }, [userInfo]);

  return (
    <div className={styles.container}>
      <div className={styles.headBox}>
        <button onClick={() => navigate("/activity")}> <i><IoChevronBack />
        </i> Back</button>
        <button onClick={handleLogout}><i><IoLogOutOutline />        </i> Logout</button>
      </div>
      <div className={styles.main}>
        <div className={styles.proContainer}>
          <h1>Edit Profile</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
          <nav>
  <img src={image || ""} alt="" className={styles.profileImage} />
  </nav>
          <div className={styles.inputGroup}>
          
  <label>Profile Photo</label>
  
  <input
    type="text"
    placeholder="Image URL"
    value={image}
    onChange={(e) => setImage(e.target.value)}
  />
</div>

<div className={styles.inputGroup}>
              <label>Biography</label>
              <input
                type="text"
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
              />
            </div>

<div className={styles.inputGroup}>
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              {isLoading ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
