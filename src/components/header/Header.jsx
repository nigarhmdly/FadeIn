import React, { useEffect} from 'react'
import styles from './Header.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
import { MdManageSearch } from "react-icons/md";
import { FaRegEnvelope } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { PiEyesBold } from "react-icons/pi";
import { PiBookmarksSimpleFill } from "react-icons/pi";




const Header = () => {

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

    

  


  return (
    <section className={styles.header}>
      <header>
<div className={styles.container}>
  

<nav>
<img className={styles.logo} src="https://media-hosting.imagekit.io//a174d496b39d487d/logooo_modified_yellow.png?Expires=1833215808&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=wvNodBUx4YKlTluBXjuA0Lhz8B6daESLY1ODcLPs5lsgugFE8mI65bsld5OtEUG2YknS-8yHe5UTV4V6ZNhrbFaUAYCrfCt6LZlxPvrQIiz~0SSfy6jSJTwsMA-sdwwTeL59555orlhYSWZHdczPPZznC3OivJ3Hps1gRguC5LI-TDViTLosCSV1sKCkVO1lW6Ovyhgl8D4RVmnp78oLlTTrClr5tAJqhRvufWH1u8WnhQDESMx8t5GlQ4uNXjhbfCvWm6npdwYQliYgVyC8mvR8ZQxno~RLrW7s1AYzkeFuWpHCLXJiaqhiTd3B~34okmk-vMSxtPnmW11gqqUx2w__" alt="" />

    <ul>
    <img src="https://media-hosting.imagekit.io//a174d496b39d487d/logooo_modified_yellow.png?Expires=1833215808&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=wvNodBUx4YKlTluBXjuA0Lhz8B6daESLY1ODcLPs5lsgugFE8mI65bsld5OtEUG2YknS-8yHe5UTV4V6ZNhrbFaUAYCrfCt6LZlxPvrQIiz~0SSfy6jSJTwsMA-sdwwTeL59555orlhYSWZHdczPPZznC3OivJ3Hps1gRguC5LI-TDViTLosCSV1sKCkVO1lW6Ovyhgl8D4RVmnp78oLlTTrClr5tAJqhRvufWH1u8WnhQDESMx8t5GlQ4uNXjhbfCvWm6npdwYQliYgVyC8mvR8ZQxno~RLrW7s1AYzkeFuWpHCLXJiaqhiTd3B~34okmk-vMSxtPnmW11gqqUx2w__" alt="" />

        <li><a href="/"><i><IoHomeOutline /></i> Home</a></li>
        <li><a href="/follow"><i><FaUsers /></i>Follower</a></li>
        <li><a href="/ss"><i><FaRegEnvelope /></i>Messages</a></li>
        <li><a href="/like"><i><FaRegHeart /></i>Likes</a></li>
        <li><a href="/watch"><i><PiEyesBold /></i>Watch</a></li>
        <li><a href="/mark"><i><PiBookmarksSimpleFill /> </i>Bookmarks</a></li>
        <li><a onClick={() => navigate('/activity')} href=""><i><CgProfile /></i>Profile</a></li>
        <li><a className={styles.post} onClick={() => navigate('/add')} href="">Post</a></li>

    </ul>
</nav>
</div>
    </header>
    
    <a className={styles.addicon} onClick={() => navigate('/add')}  href="">+</a>



    <div className={styles.bottomheader}>



    <ul>

        <li><a href="/"><i><IoHomeOutline /></i> </a></li>
        <li><a href="/follow"><i><FaUsers /></i></a></li>
        <li><a href="/mark"><i><PiBookmarksSimpleFill /> </i></a></li>
        <li><a href="/ss"><i><FaRegEnvelope /></i></a></li>
        <li><a onClick={() => navigate('/activity')} href=""><i><CgProfile /></i></a></li>

    </ul>



    </div>
    </section>
  )
}

export default Header