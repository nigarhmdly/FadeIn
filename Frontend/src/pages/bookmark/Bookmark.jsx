import Header from '../../components/header/Header'
import styles from './Bookmark.module.scss'
import { GoBookmarkSlash } from "react-icons/go";
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { IoMdArrowRoundBack } from "react-icons/io";
import { setBookmark } from '../../redux/slices/bookmarkSlice';
import { useDeleteBookmarkMutation, useGetBookmarkQuery } from '../../redux/slices/bookmarkApiSlice';

const Bookmark = () => {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.item.item) || [];
  const nav = useNavigate();
  const bookmark = useSelector((state) => state.bookmark.userBookmark) || [];
  
  useEffect(() => {
    dispatch(setBookmark());
  }, [dispatch]);
  
  const { data: fetchedBookmark, isLoading, error } = useGetBookmarkQuery();
  
  const [deleteBookmark] = useDeleteBookmarkMutation();
  
  useEffect(() => {
    if (fetchedBookmark) {
      dispatch(setBookmark(fetchedBookmark));
    }
  }, [fetchedBookmark, dispatch]);
  
  const handleDeleteBookmark = async (item) => {
    try {
      const bookmarkToDelete = bookmark.find(b => b.name === item.name && b.years === item.years);
      if (!bookmarkToDelete) return;
      
      await deleteBookmark(bookmarkToDelete._id).unwrap(); 
      dispatch(setBookmark(bookmark.filter(b => b._id !== bookmarkToDelete._id))); 
    } catch (err) {
      console.error('Delete Bookmark Error:', err);
    }
  };
  
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const goo = (item) => {
    nav('/detail', { state: { item } });
  }

  return (
    <section className={styles.bookmark}>
      <Header />
      <section className={styles.a}>
        <section>
          <div className={styles.container}>
            <nav className={styles.headers}>
              <button onClick={() => nav("/dashboard")}>
                <IoMdArrowRoundBack />
              </button>
              <p>Bookmarks</p>
            </nav>

            <div>
              <div className={styles.items}>
                {bookmark && bookmark.map((b) => (
                  <div key={b._id}>
                    <h1>
                      <img src={b.images} alt={b.name} />
                      <h3>
                        <span>{b.name}</span>
                        <p>{b.description}</p>
                      </h3>
                    </h1>
                    <div onClick={() => goo(b)} className={styles.buttons}></div>
                    <button onClick={() => handleDeleteBookmark(b)}>
                      <GoBookmarkSlash />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default Bookmark;
