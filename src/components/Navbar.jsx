import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaPowerOff, FaSearch } from 'react-icons/fa';
import { firebaseAuth } from "../utils/firebase-config";
import { signOut,onAuthStateChanged } from "firebase/auth";

export default function Navbar({ isScrolled }) {
  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];

const navigate = useNavigate();

   onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) navigate("/login")                                                                              //to check current user then navigate to ("/")
    })

  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/search/${searchTerm}`);
      setSearchTerm("");
      setShowSearch(false);
      setInputHover(false);
    }
  };

  return (
    <Container>
      <nav className={`nav flex ${isScrolled ? "scrolled" : ""}`}>
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <img src={logo} alt="logo" />
          </div>
          <ul className="links flex">
            {links.map(({ name, link }) => (
              <li key={name}>
                <Link to={link}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="right flex a-center">
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) setShowSearch(false);
              }}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              value={searchTerm}
            />
          </div>

          <button onClick={() => signOut(firebaseAuth)}>
            <FaPowerOff />
          </button>
        </div>
      </nav>
    </Container>
  );
}

const Container = styled.div`
  .nav {
    position: fixed;
    top: 0;
    width: 100%;
    height: 6.5rem;
    padding: 0 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 2;
    transition: 0.3s ease-in-out;

    .left {
      display: flex;
      align-items: center;
      gap: 2rem;

      .brand {
        display: flex;
        align-items: center;

        img {
          height: 2.8rem; /* Smaller Netflix logo */
        }
      }

      .links {
        display: flex;
        gap: 2rem;
        list-style-type: none;

        li a {
          color: white;
          text-decoration: none;
          font-weight: 500;
        }
      }
    }

    .right {
      display: flex;
      align-items: center;
      gap: 1.5rem;

      .search {
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.5rem;

        input {
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          padding: 0.3rem 0.8rem;
          border-radius: 0.3rem;
          border: none;
          outline: none;
          width: 0;
        }

        &.show-search {
          border: 1px solid white;
          background-color: rgba(0, 0, 0, 0.6);
          input {
            width: 100%;
            opacity: 1;
            visibility: visible;
            padding: 0.3rem 0.8rem;
            background-color: transparent;
            border: none;
            color: white;
          }
        }
      }

      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        svg {
          color: white;
          font-size: 1.2rem;
        }
      }
    }
  }

  .scrolled {
    background-color: black;
  }
`;
