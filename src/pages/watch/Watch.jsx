import Header from '../../components/header/Header'
import styles from './Watch.module.scss'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { FaRegEyeSlash } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { setWatch } from '../../redux/slices/watchSlice';
import { useDeleteWatchMutation, useGetWatchQuery } from '../../redux/slices/watchApiSlice';



const Watch = () => {


  const dispatch = useDispatch();
  const nav = useNavigate();
  const watch = useSelector((state) => state.watched.userWatched) || [];
  
  useEffect(() => {
    dispatch(setWatch());
  }, [dispatch]);

  const { data: fetchedWatch, isLoading, error } = useGetWatchQuery();
 
  const [deleteWatch] = useDeleteWatchMutation();

  useEffect(() => {
    if (fetchedWatch) {
      dispatch(setWatch(fetchedWatch));
    }
  }, [fetchedWatch, dispatch]);



  

  const handleDeleteWatch = async (item) => {
    try {
      const watchToDelete = watch.find(watch => watch.name === item.name && watch.years === item.years);
      if (!watchToDelete) return;
      await deleteWatch(watchToDelete._id).unwrap();
      dispatch(setWatch(watch.filter(watch => watch._id !== watchToDelete._id)));
    } catch (err) {
      console.error('Delete watch Error:', err);
    }
  };

  


  
 

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;






const goo = (item)=>{
  nav('/detail',{state:{item}})
}



return (
  <section className={styles.watch}>
    <Header/>

<section className={styles.a}>

<section>
<div className={styles.container}>



<nav className={styles.headers}>
<button onClick={()=> nav("/dashboard")}>   <IoMdArrowRoundBack />  </button>
<p>Watch</p>
</nav>





<div>
<div className={styles.items}>
{watch && watch.map(watch => (

  <div key={watch._id}>
    <img src={watch.images} alt="" />
    <div onClick={()=> goo(watch)} className={styles.buttons}>
    </div>
    <nav className={styles.buttonss}>
      <button onClick={() => handleDeleteWatch(watch)}>
      <FaRegEyeSlash />
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

export default Watch