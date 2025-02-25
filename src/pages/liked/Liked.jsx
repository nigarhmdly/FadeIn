import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Liked.module.scss";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import { IoMdArrowRoundBack } from "react-icons/io";
import { setLike } from "../../redux/slices/likeSlice";
import { useDeleteLikeMutation, useGetLikeQuery } from "../../redux/slices/likeApiSlice";
import { IoHeartDislike } from "react-icons/io5";


const Liked = () => {
    const [ setEmail] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [biography, setBiography] = useState("");
          const [followers, setFollower] = useState("");
    
  
    const navigate = useNavigate();
  
    const { userInfo } = useSelector((state) => state.auth);
  
 
    const dispatch = useDispatch();
    const nav = useNavigate();
    const like = useSelector((state) => state.like.userLike) || [];
    
    useEffect(() => {
      dispatch(setLike());
    }, [dispatch]);
  
    const { data: fetchedWatch, isLoading, error } = useGetLikeQuery();
   
    const [deleteLike] = useDeleteLikeMutation();
  
    useEffect(() => {
      if (fetchedWatch) {
        dispatch(setLike(fetchedWatch));
      }
    }, [fetchedWatch, dispatch]);
  
  
  
    
  
    const handleDeleteWatch = async (item) => {
      try {
        const watchToDelete = like.find(watch => watch.name === item.name && watch.years === item.years);
        if (!watchToDelete) return;
        await deleteLike(watchToDelete._id).unwrap();
        dispatch(setLike(like.filter(watch => watch._id !== watchToDelete._id)));
      } catch (err) {
        console.error('Delete watch Error:', err);
      }
    };
  
    
  
    useEffect(() => {
        if (userInfo) {
          setName(userInfo.name);
          setEmail(userInfo.email);
          setImage(userInfo.image);
          setBiography(userInfo.biography);
          setFollower(userInfo.followers ||'');

        }
      }, [userInfo,setName,setEmail,setImage,setBiography,setFollower]);
    
   
  
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
  
  
  
  
  
  const goo = (item)=>{
    nav('/detail',{state:{item}})
  }
  
  
  
  

  
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
<img src={image || ""} alt="" className={styles.profileImage} />
<a href="/edit">Edit Profile</a>

</nav>



  <nav className={styles.inf}>
   <h1>{name}</h1>
   <h3>{biography}</h3>
   <p><span>{followers.length}</span> followers</p>
  </nav>


</div>


<div className={styles.info}>
  <a href="/activity">Activity</a>
  <a href="/watched">Watch</a>
  <a href="/liked">Like</a>
</div>
</div>




<div className={styles.movies}>
<div className={styles.itemss}>
{like && like.map(watch => (

  <div key={watch._id}>
    <img src={watch.images} alt="" />
    <div onClick={()=> goo(watch)} className={styles.buttons}>
    </div>
    <nav className={styles.buttonss}>
      <button onClick={() => handleDeleteWatch(watch)}>
     <IoHeartDislike/>
                        </button>
      </nav>
  </div>
    ))}
</div>

</div>





  </div>

  </section>
  

</section>






    </div>
  );
};

export default Liked;
