import React from "react";
import {BrowserRouter,Route,Routes} from "react-router-dom" 
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Netflix from "./pages/Netflix";
import Player from "./pages/Player";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import UserLiked from "./pages/UserLiked";
import Search from "./pages/Search";

export default function App(){
  return (
    <BrowserRouter basename="/netflix-ui">
    <Routes>
      <Route exact path="/login" element={<Login />}> </Route>
      <Route exact path="/signup" element={<Signup />}> </Route>
      <Route exact path="/player" element={<Player/>}> </Route>
      <Route exact path="/movies" element={<Movies/>}> </Route>
      <Route exact path="/tv" element={<TVShows/>}> </Route>
      <Route exact path="/mylist" element={<UserLiked/>}> </Route>
      <Route exact path="/search/:searchTerm" element={<Search/>}> </Route>
      <Route exact path="/" element={<Netflix />}> </Route>
      
      
      
      
      </Routes>
      </BrowserRouter>
  )
}