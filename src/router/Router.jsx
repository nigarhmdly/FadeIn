import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import PrivateRoute from "../components/PrivateRoute";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import AddNew from "../pages/add/AddNew";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import Details from "../pages/Details/Details";
import Bookmark from "../pages/bookmark/Bookmark";
import Like from "../pages/like/Like";
import Watch from "../pages/watch/Watch";
import Edit from "../pages/editProfile/EditProfile";
import Activity from "../pages/activity/Activity";
import Watched from "../pages/watched/Watched";
import Liked from "../pages/liked/Liked";
import Followers from "../pages/followers/Followers";
import UserDetail from "../pages/userDetail/UserDetail";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}  />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/add" element={<AddNew />} />
        <Route path="" element={<PrivateRoute/>}>
          <Route path="/detail" element={<Details/>} />
          <Route path="/userdetail" element={<UserDetail/>} />
          <Route path="/mark" element={<Bookmark/>} />
          <Route path="/like" element={<Like/>} />
          <Route path="/watch" element={<Watch/>} />
          <Route path="/edit" element={<Edit/>} />
          <Route path="/activity" element={<Activity/>} />
          <Route path="/watched" element={<Watched/>} />
          <Route path="/liked" element={<Liked/>} />
          <Route path="/follow" element={<Followers/>} />
          <Route path="*" element={<NotFoundPage/>} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
