import Header from '../../components/header/Header'
import styles from './Like.module.scss'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { IoHeartDislike } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDeleteLikeMutation, useGetLikeQuery } from '../../redux/slices/likeApiSlice';
import { setLike } from '../../redux/slices/likeSlice';



const Like = () => {

   const dispatch = useDispatch();
    const nav = useNavigate();
    const likes = useSelector((state) => state.like.userLike) || [];
    
    useEffect(() => {
      dispatch(setLike());
    }, [dispatch]);
  
    const { data: fetchedLikes, isLoading, error } = useGetLikeQuery();
   
    const [deleteLike] = useDeleteLikeMutation();
  
    useEffect(() => {
      if (fetchedLikes) {
        dispatch(setLike(fetchedLikes));
      }
    }, [fetchedLikes, dispatch]);
  

  
    
  
    const handleDeleteLike = async (item) => {
      try {
        const likeToDelete = likes.find(like => like.name === item.name && like.years === item.years);
        if (!likeToDelete) return;
        await deleteLike(likeToDelete._id).unwrap();
        dispatch(setLike(likes.filter(like => like._id !== likeToDelete._id)));
      } catch (err) {
        console.error('Delete Like Error:', err);
      }
    };
  
    
  
  
    
   
  
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  




  
  const goo = (item)=>{
    nav('/detail',{state:{item}})
  }



  return (
    <section className={styles.like}>
      <Header/>

<section className={styles.a}>
  
  <section>
  <div className={styles.container}>



  <nav className={styles.headers}>
  <button onClick={()=> nav("/dashboard")}>   <IoMdArrowRoundBack />  </button>
<p>Likes</p>
</nav>





<div>
<div className={styles.items}>
{likes && likes.map(like => (

    <div key={like._id}>
      <img src={like.images} alt="" />
      <div onClick={()=> goo(like)} className={styles.buttons}>
      </div>
      <nav className={styles.buttonss}>
        <button onClick={() => handleDeleteLike(like)}>
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


    </section>
  )
}

export default Like