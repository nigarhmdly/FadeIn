import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.scss";

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    } 
  }, [navigate, userInfo]);

  return (
    <div className={styles.container}>
    <section className={styles.login}>
<div className={styles.card}>
<h1>Welcome to <span>FadeIn</span></h1>
<form>





<button  onClick={() => navigate("/login")}>Get Started</button>




 </form>


</div>
</section>
</div>
  );
};

export default Home;
