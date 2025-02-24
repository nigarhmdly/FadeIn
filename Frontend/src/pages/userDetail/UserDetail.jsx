import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import styles from "./UserDetail.module.scss";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useFollowUserMutation, useUnfollowUserMutation } from "../../redux/slices/usersApiSlice";
import { useSelector } from "react-redux";
import axios from "axios";

const UserDetail = () => {
  const navigate = useNavigate();
  const loc = useLocation();
  const { userInfo } = useSelector((state) => state.auth);
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();
  const [isFollowing, setIsFollowing] = useState(false);
  const [item, setItem] = useState(null);
  useEffect(() => {
    const savedItem = localStorage.getItem("userDetail");
    if (savedItem) {
      setItem(JSON.parse(savedItem));
    }
  }, []);

  useEffect(() => {
    if (loc.state?.item) {
      const userItem = loc.state.item;
      setItem(userItem);
      localStorage.setItem("userDetail", JSON.stringify(userItem)); 
    }
  }, [loc.state]);

  useEffect(() => {
    if (userInfo && item?.followers.includes(userInfo._id)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [userInfo, item?.followers]);
  

  const handleFollow = async () => {
    if (isFollowing) return;
  
    try {
      const response = await followUser({ userIdToFollow: item._id }).unwrap();
  
      setItem((prevItem) => ({
        ...prevItem,
        followers: [...prevItem.followers, userInfo._id], // Yeni follower əlavə olunur
      }));
  
      setIsFollowing(true);
    } catch (error) {
      console.error("İzləmə xətası:", error);
    }
  };
  



  
  const handleUnfollow = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token yoxdur!");
        return;
      }
  
      const response = await axios({
        method: "DELETE",
        url: "http://localhost:8000/api/users/unfollow",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { userIdToUnfollow: item._id }, // Backend düzgün qəbul edirsə
      });
  
      console.log("Unfollow response:", response.data);
  
      // FOLLOWERS ARRAY-İNDƏN İSTİFADƏÇİNİ SİLİRİK
      setItem((prevItem) => ({
        ...prevItem,
        followers: prevItem.followers.filter((id) => id !== userInfo._id),
      }));
  
      setIsFollowing(false);
    } catch (error) {
      console.error("Unfollow error:", error.response?.data || error.message);
    }
  };
  




  return (
    <div className={styles.like}>
      <Header />
      <section className={styles.a}>
        {item ? (
          <section>
            <div className={styles.container}>
              <nav className={styles.headers}>
                <button onClick={() => navigate(-1)}>
                  <IoMdArrowRoundBack />
                </button>
                <p>Profile</p>
              </nav>
              <div>
                <div className={styles.items}>
                  <nav className={styles.img}>
                    <img src={item.image} alt="" className={styles.profileImage} />
                    {userInfo && userInfo._id !== item._id && (
                      <button onClick={(e) => isFollowing ? handleUnfollow(e) : handleFollow()}>
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    )}
                  </nav>
                  <nav className={styles.inf}>
                    <h1>{item.name}</h1>
                    <h3>{item.biography}</h3>
                    <p><span>{item.followers.length}</span> followers</p>
                  </nav>
                </div>
                <div className={styles.info}>
                  <a href="/">Activity</a>
                  <a href="/">Watch</a>
                  <a href="/">Like</a>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <p>Məlumat yoxdur</p>
        )}
      </section>
    </div>
  );
};

export default UserDetail;
