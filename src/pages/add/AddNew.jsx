import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './AddNew.module.scss';
import { IoChevronBack } from "react-icons/io5";
import { getItemThunk } from '../../redux/slices/DataSlice';
import { useAddActivityMutation, useGetActivityQuery } from '../../redux/slices/activityApiSlice';
import { setActivity } from '../../redux/slices/activitySlice';

const AddNew = () => {
  const [body, setBody] = useState('');
  const [search, setSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [image, setImage] = useState(''); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activity = useSelector((state) => state.activity.userActivity) || [];
  const item = useSelector((state) => state.item.item) || [];

  useEffect(() => {
    dispatch(getItemThunk());
  }, [dispatch]);

  const { data: fetchedActivity } = useGetActivityQuery();
  const [addActivity] = useAddActivityMutation();

  useEffect(() => {
    if (fetchedActivity) {
      dispatch(setActivity(fetchedActivity));
    }
  }, [fetchedActivity, dispatch]);

  useEffect(() => {
    if (search.length >= 3) {
      setFilteredData(
        item.filter((movie) => movie.name.toLowerCase().includes(search.toLowerCase()))
      );
    } else {
      setFilteredData([]);
    }
  }, [search, item]);

  const handleMovieSelect = (movie) => {
    setSearch(movie.name);
    setImage(movie.images);
    setIsFocused(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!search.trim()) {
      alert("Please select a movie!");
      return;
    }

    const selectedMovie = item.find(movie => movie.name === search);
    if (!selectedMovie) {
      alert("Selected movie not found!");
      return;
    }

    const newPost = {
      title: search,
      body,
      name: selectedMovie.name,
      years: selectedMovie.years,
      author: selectedMovie.author,
      description: selectedMovie.description,
      imdb: selectedMovie.imdb,
      country: selectedMovie.country,
      language: selectedMovie.language,
      trailer: selectedMovie.trailer,
      genres: selectedMovie.genres,
      images: selectedMovie.images
    };

    try {
      const addedActivity = await addActivity(newPost).unwrap();
      dispatch(setActivity([...activity, addedActivity]));
      alert("Successfully..");
      setBody(''); 
      setSearch('');
    } catch (err) {
      alert(`Error: ${err?.data?.message || "error"}`);
    }
  };

  return (
    <section className={styles.add}>
      <div className={styles.container}>
        <h2>
          <button onClick={() => navigate("/dashboard")}>
            <IoChevronBack />
            Back
          </button>
        </h2>
        <div className={styles.img}>
          <img src={image || "https://via.placeholder.com/150"} alt="Movie Poster" />

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Search movie..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                className={styles.inp}
              />

              {isFocused && search && (
                <ul className={styles.searchResults}>
                  {filteredData.length > 0 ? (
                    filteredData.map((movie, index) => (
                      <li key={index} onMouseDown={() => handleMovieSelect(movie)}>
                        {movie.name}
                      </li>
                    ))
                  ) : (
                    <li>No results found</li>
                  )}
                </ul>
              )}
            </div>

            <div className={styles.inputGroup}>
              <textarea
                id="body"
                value={body}
                placeholder="Add a review..."
                onChange={(e) => setBody(e.target.value)}
                className={styles.textarea}
              ></textarea>
            </div>

            <div className={styles.buttons}>
              <button type="submit" className={styles.submitButton}>
                SAVE
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddNew;
