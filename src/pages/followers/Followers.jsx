import React, { useState } from 'react';
import Header from '../../components/header/Header';
import styles from './Followers.module.scss';
import { useGetUsersQuery } from '../../redux/slices/usersApiSlice';
import { useNavigate } from 'react-router-dom';

const Followers = () => {
    const { data: users, error, isLoading } = useGetUsersQuery();
    const [search, setSearch] = useState("");
    const navi = useNavigate()

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const filteredUsers = users?.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    const gooo = (item)=>{
        navi('/userdetail',{state:{item}})
      }

    return (
        <section className={styles.like}>
            <Header />
            <section className={styles.a}>
                <div className={styles.container}>
                    <input
                        type="text"
                        placeholder="Find your friends..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <div key={user._id} className={styles.users} onClick={()=> gooo(user)}>
                                <nav>
                                    <img src={user.image} alt='' />
                                    <nav className={styles.user}>
                                        <h3>{user.name}</h3>
                                        <p>{user.biography || "‏‎"}</p>
                                    </nav>
                                </nav>
                            </div>
                        ))
                    ) : (
                        <p>No users found</p>
                    )}
                </div>
            </section>
        </section>
    );
}

export default Followers;
