import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Activity.module.scss";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import { IoMdArrowRoundBack } from "react-icons/io";
import { setActivity } from "../../redux/slices/activitySlice";
import {useGetActivityQuery } from "../../redux/slices/activityApiSlice";


const Activity = () => {
    const [ setEmail] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [biography, setBiography] = useState("");
      const [followers, setFollower] = useState("");
  
    const dispatch = useDispatch();
    const nav = useNavigate();
    const activity = useSelector((state) => state.activity.userActivity) || [];
    
    useEffect(() => {
      dispatch(setActivity());
    }, [dispatch]);
  
    const { data: fetchedLikes, isLoading, error } = useGetActivityQuery();
   
  
    useEffect(() => {
      if (fetchedLikes) {
        dispatch(setActivity(fetchedLikes));
      }
    }, [fetchedLikes, dispatch]);

useEffect(() => {
  console.log('Fetched Likes:', fetchedLikes);
  console.log('Loading:', isLoading);
  console.log('Error:', error);
}, [fetchedLikes, isLoading, error]);

    console.log(fetchedLikes);

    useSelector((state) => state.activity.userActivity)
    
    const navigate = useNavigate();
  
    const { userInfo } = useSelector((state) => state.auth);
  
 
  
    useEffect(() => {
      if (userInfo) {
        setName(userInfo.name || "");
        setEmail(userInfo.email || "");
        setImage(userInfo.image || "");
        setBiography(userInfo.biography || "");
        setFollower(userInfo.followers|| '');

      }
    },[userInfo]);
    const goo = (item)=>{
      nav('/detail',{state:{item}})
    }
  
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  

  return (
    <div className={styles.like}>
      <Header/>
      


<section className={styles.a}>
  
  <section>
  <div className={styles.container}>



<nav className={styles.headers}>
  <button onClick={()=> navigate("/dashboard")}>   <IoMdArrowRoundBack />  </button>
<p>Profile</p>
</nav>



<div className={styles.cont}>




<div className={styles.items}>

<nav className={styles.img}>
<img src={image || []} alt="" className={styles.profileImage} />
<a href="/edit">Edit Profile</a>

</nav>



  <nav className={styles.inf}>
   <h1>{name}</h1>
   <h3>{biography}</h3>
   <p><span>{followers.length || "0"}</span> followers</p>
  </nav>


</div>


<div className={styles.info}>
  <a href="/activity">Activity</a>
  <a href="/watched">Watch</a>
  <a href="/liked">Like</a>
</div>
</div>

{activity && activity.map(activity => (

<section className={styles.activity}  key={activity.name}>
  
    <div className={styles.act}>
      <img  className={styles.pp} src={image || ""} alt="" />
<img src={activity.images} alt="" />    <nav>

        <h6>Watched</h6>
        <h1 onClick={()=> goo(activity)}>{activity.name} <span>{activity.years}</span></h1>
        <p>{activity.body}</p>
    </nav>
    </div>
    
</section>

))}





  </div>

  </section>
  

</section>






    </div>
  );
};

export default Activity;
