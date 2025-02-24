import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Profile.module.scss";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import { IoMdArrowRoundBack } from "react-icons/io";


const Profile = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [biography, setBiography] = useState("");
    const [followers, setFollower] = useState("");
  
    const navigate = useNavigate();
  
    const { userInfo } = useSelector((state) => state.auth);
  
 
  
  
    useEffect(() => {
      if (userInfo) {
        setName(userInfo.name);
        setEmail(userInfo.email);
        setImage(userInfo.image);
        setBiography(userInfo.biography);
        setFollower(userInfo.followers.length);
      }
    }, [userInfo]);
  
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



<div>
<div className={styles.items}>

<nav className={styles.img}>
<img src={image || ""} alt="" className={styles.profileImage} />
<a href="/edit">Edit Profile</a>

</nav>



  <nav className={styles.inf}>
   <h1>{name}</h1>
   <h3>{biography}</h3>
   <p><span>{followers}</span> followers</p>
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
  

</section>






    </div>
  );
};

export default Profile;
