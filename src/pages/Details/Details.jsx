import React, {  useState } from 'react';
import { useLocation } from 'react-router';
import { useAddCommentMutation, useGetCommentsQuery } from '../../redux/slices/commentApiSlice';
import styles from './Details.module.scss';
import Header from '../../components/header/Header';
import { FaRegHeart, FaRegBookmark, FaRegEye } from 'react-icons/fa';
import { MdOutlinePlayCircle } from 'react-icons/md';
import { useSelector } from 'react-redux';

const Details = () => {
  const location = useLocation();
  const { item } = location.state || {}; 
  const [body, setBody] = useState('');
  const [ setSearch] = useState('');  
  const { userInfo } = useSelector((state) => state.auth) || [];
  const [ { isLoading, error, isSuccess }] = useAddCommentMutation();
  const { data: comments = [], isLoading: commentsLoading, error: commentsError } = useGetCommentsQuery(item?._id, {
    pollingInterval: 1000, 
    refetchOnFocus: true,  
    refetchOnReconnect: true, 
  });
  
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const commentData = {
      movieId: item?._id,
      text: body,
      name: userInfo.name,
      image: userInfo.image,
      userId: userInfo._id,
    };
    try {
      const response = await fetch('http://localhost:8000/api/movies/67b9c65455c50b66b7627906/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData)
        
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log('Comment added successfully:', data);
      } else {
        console.error('Error adding comment:', data);
      }
      setBody(''); 
      setSearch('');
      
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };


  
  if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
  
  
  return (
    <section className={styles.Details}>
      <Header />
      <section className={styles.det}>
        <div className={styles.container}>
          {item ? (
            <div>
              <nav>
                <img src={item.images} alt="" />
                <li>
                  <button><FaRegHeart /></button>
                  <button><FaRegEye /></button>
                  <button><FaRegBookmark /></button>
                </li>
                <h1>RATINGS</h1>
                <p>⭐ {item.imdb} / 10</p>
                <br />
                <a href={item.trailer}><i><MdOutlinePlayCircle /></i>TRAILER</a>
              </nav>

              <div className={styles.text}>
                <h3>
                  <h1>{item.name} <p>{item.years} Directed by {item.author}</p></h1>
                  <p>{item.description}</p>

                  <table>
                    <tr>
                      <td>Release date</td>
                      <td>{item.years} ({item.country})</td>
                    </tr>
                    <tr>
                      <td>Genres</td>
                      <td>{item.genres}</td>
                    </tr>
                    <tr>
                      <td>Countries</td>
                      <td>{item.country}</td>
                    </tr>
                    <tr>
                      <td>Language</td>
                      <td>{item.language}</td>
                    </tr>
                  </table>

                  <form onSubmit={handleCommentSubmit}>
                    <input
                      placeholder="Add Your Comment"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}  
                      rows="4"
                      className={styles.textarea}
                    />
                    <button type="submit" className={styles.submitButton} disabled={isLoading}>
                      {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                  </form>

                  {isSuccess && <p className={styles.success}>Comment added successfully!</p>}

                  {error && <p className={styles.error}>Error: {error.message}</p>}

                  {commentsLoading ? (
  <p>Loading comments...</p>
) : commentsError ? (
  <p>Error loading comments.</p>
) : (
  <div className={styles.commentList}>
    {comments.length === 0 ? (
      <p>No comments yet.</p>
    ) : (
      comments.slice().reverse().map((comment) => (  
        <div key={comment.id} className={styles.comment}>
          <img src={comment.image} alt="" />
          <nav>
            <h5>{comment.name}</h5>
            <h4>{comment.text}</h4>
            <h6>Reply</h6>
          </nav>
        </div>
      ))
    )}
  </div>
)}

                </h3>
              </div>
            </div>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </section>
    </section>
  );
};

export default Details;
