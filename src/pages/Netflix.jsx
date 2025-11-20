import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import Slider from "../components/Slider";
import SelectGenre from "../components/SelectGenre";

export default function Netflix() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state)=> state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);

  useEffect(() => {
    dispatch(getGenres());
  }, [])

  useEffect(()=>{
    if(genresLoaded) dispatch(fetchMovies({type:"all"}));
  },[genresLoaded])


  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      {movies.length > 0 && (
        <div className="hero">
          <img
            src={backgroundImage}
            alt="background"
            className="background-image"
          />
          <div className="container">
            <div className="logo">
              <img src={MovieLogo} alt="Movie Logo" />
            </div>
            <div className="buttons flex">
              <button className="flex j-center a-center"
                onClick={() => navigate("/player")}>
                <FaPlay /> Play
              </button>
              <button className="flex j-center a-center">
                <AiOutlineInfoCircle /> More Info
              </button>
            </div>
          </div>
        </div>
      )}
      <SelectGenre genres={genres} type="movie"/>
      <Slider movies={movies} />
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    height: 100vh;
    .background-image {
      filter: brightness(60%);
      width: 100vw;
      height: 100vh;
    }

    img {
      height: 100vh;
      width: 100vw;
    }

    .container {
      position: absolute;
      bottom: 10rem;
      .logo {
        img {
          width: 80%;
          height: 80%;
          margin-left: 5rem;
        }
      }

      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.2rem;
          padding: 0.8rem 2.4rem;
          border-radius: 0.2rem;
          gap: 1rem;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: 0.3s ease-in-out;

          &:hover {
            opacity: 0.8;
          }
          &:nth-child(1) {
            background-color: white;
            color: black;
          }
          &:nth-child(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
          }
        }
      }
    }
  }
`;
