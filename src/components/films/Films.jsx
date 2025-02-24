import styles from './Films.module.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { FaRegHeart, FaRegBookmark, FaRegEye } from "react-icons/fa";
import { getItemThunk } from '../../redux/slices/DataSlice';
import { useAddLikeMutation, useDeleteLikeMutation, useGetLikeQuery } from '../../redux/slices/likeApiSlice';
import { setLike } from '../../redux/slices/likeSlice';
import { setWatch } from '../../redux/slices/watchSlice';
import { useAddWatchMutation, useDeleteWatchMutation, useGetWatchQuery } from '../../redux/slices/watchApiSlice';
import { useAddBookmarkMutation, useDeleteBookmarkMutation, useGetBookmarkQuery } from '../../redux/slices/bookmarkApiSlice';
import { setBookmark } from '../../redux/slices/bookmarkSlice';

const Films = () => {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.item.item) || [];
  const nav = useNavigate();
  const likes = useSelector((state) => state.like.userLike) || [];
  const watch = useSelector((state) => state.watched.userWatched) || [];
  const bookmark = useSelector((state) => state.bookmark.userBookmark) || [];

  useEffect(() => {
    dispatch(getItemThunk());
  }, [dispatch]);

  const { data: fetchedLikes, isLoading, error } = useGetLikeQuery();
  const { data: fetchedWatches } = useGetWatchQuery();
  const { data: fetchedBookmark } = useGetBookmarkQuery();

  const [addLike] = useAddLikeMutation();
  const [deleteLike] = useDeleteLikeMutation();
  const [addWatch] = useAddWatchMutation();
  const [deleteWatch] = useDeleteWatchMutation();
  const [addBookmark] = useAddBookmarkMutation();
  const [deleteBookmark] = useDeleteBookmarkMutation();

  useEffect(() => {
    if (fetchedLikes) {
      dispatch(setLike(fetchedLikes));
    }
  }, [fetchedLikes, dispatch]);

  useEffect(() => {
    if (fetchedWatches) {
      dispatch(setWatch(fetchedWatches));
    }
  }, [fetchedWatches, dispatch]);


  useEffect(() => {
    if (fetchedBookmark) {
      dispatch(setBookmark(fetchedBookmark));
    }
  }, [fetchedBookmark, dispatch]);

  const handleAddLike = async (item) => {
    try {
      const newLike = await addLike(item).unwrap();
      dispatch(setLike([...likes, newLike]));
    } catch (err) {
      console.error('Failed to add the like:', err);
    }
  };

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

  const handleAddWatch = async (item) => {
    try {
      const newWatch = await addWatch(item).unwrap();
      dispatch(setWatch([...watch, newWatch]));
    } catch (err) {
      console.error('Failed to add the watch:', err);
    }
  };

  const handleDeleteWatch = async (item) => {
    try {
      const watchToDelete = watch.find(w => w.name === item.name && w.years === item.years);
      if (!watchToDelete) return;
      await deleteWatch(watchToDelete._id).unwrap();
      dispatch(setWatch(watch.filter(w => w._id !== watchToDelete._id)));
    } catch (err) {
      console.error('Delete Watch Error:', err);
    }
  };



  const handleAddBookmark = async (item) => {
    try {
      const newBookmar = await addBookmark(item).unwrap();
      dispatch(setBookmark([...watch, newBookmar]));
    } catch (err) {
      console.error('Failed to add the bookmark:', err);
    }
  };

  const handleDeleteBookmark = async (item) => {
    try {
      const bookmarkToDelete = bookmark.find(w => w.name === item.name && w.years === item.years);
      if (!bookmarkToDelete) return;
      await deleteBookmark(bookmarkToDelete._id).unwrap();
      dispatch(setBookmark(bookmark.filter(w => w._id !== bookmarkToDelete._id)));
    } catch (err) {
      console.error('Delete Bookmark Error:', err);
    }
  };

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getItemThunk());
  }, [dispatch]);

  const filteredItems = item.filter((film) =>
    film.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const goToDetail = (item) => {
    nav('/detail', { state: { item } });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className={styles.Films}>
      <div className={styles.container}>


      <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <div className={styles.items}>
        {filteredItems.map((item) => {
  const isLiked = likes.some(like => like.name === item.name && like.years === item.years);
  const isWatched = watch.some(watch => watch.name === item.name && watch.years === item.years);
  const isBookmark = bookmark.some(bookmark => bookmark.name === item.name && bookmark.years === item.years);

  return (
    <div key={item._id}>
      <img src={item.images} alt={`${item.name} poster`} />
      <div onClick={() => goToDetail(item)} className={styles.buttons}></div>
      <nav className={styles.buttonss}>
        <button onClick={(e) => { e.preventDefault(); isLiked ? handleDeleteLike(item) : handleAddLike(item); }}>
          <FaRegHeart color={isLiked ? 'orange' : 'white'} />
        </button>

        <button onClick={(e) => { e.preventDefault(); isWatched ? handleDeleteWatch(item) : handleAddWatch(item); }}>
          <FaRegEye color={isWatched ? 'orange' : 'white'} />
        </button>

        <button onClick={(e) => { e.preventDefault(); isBookmark ? handleDeleteBookmark(item) : handleAddBookmark(item); }}>
          <FaRegBookmark color={isBookmark ? 'orange' : 'white'} />
        </button>
      </nav>
    </div>
  );
})}

        </div>
      </div>
    </section>
  );
};

export default Films;
