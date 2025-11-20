import React, { useState } from 'react';
import styled from 'styled-components';
import BackgroundImage from "../components/BackgroundImage";
import Header from '../components/Header';
import { Navigate, useNavigate } from 'react-router-dom';
import { firebaseAuth } from "../utils/firebase-config"
import { createUserWithEmailAndPassword, onAuthStateChanged, updateCurrentUser } from 'firebase/auth';


export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password)
    } catch (err) {
      console.log(err)
    }
  };


  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/")                                                                              //to check current user then navigate to ("/")
  })

  return (
    <Container $showPassword={showPassword}>
      <BackgroundImage />
      <div className="content">
        <Header login />

        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited movies, TV shows and more</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>Ready to watch? Enter your email to create or restart your membership.</h6>
          </div>

          <div className="form">
            <div className="email-input-group">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formValues.email}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <button onClick={() => setShowPassword(true)}>Get Started</button>
            </div>

            {showPassword && (
              <div className="password-input">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formValues.password}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            )}

            <button onClick={handleSignIn}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;

  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;

    .body {
      padding: 0 5rem;
      gap: 1.5rem;

      .text {
        gap: 1rem;
        text-align: center;
        font-size: 1.5rem;
        h1 {
          font-size: 3rem;
          line-height: 4rem;
          max-width: 800px;
        }
        h4 {
          font-size: 1.5rem;
        }
        h6 {
          font-size: 1.2rem;
        }
      }

      .form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
        width: 100%;
        max-width: 600px;
        margin-top: 1rem;

        .email-input-group {
          display: flex;
          gap: 0.5rem;
          width: 100%;

          input {
            flex-grow: 1;
            padding: 1rem 1rem;
            background-color: #333;
            color: white;
            border: none;
            border-radius: 0.25rem;
            font-size: 1rem;

            &:focus {
              outline: none;
              background-color: #444;
            }
          }

          button {
            padding: 0.8rem 1rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            color: white;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;
            transition: 0.3s ease-in-out;

            &:hover {
              opacity: 0.8;
            }
          }
        }

        .password-input {
          width: 100%;
          padding: 1rem 1rem;
          background-color: #333;
          color: white;
          border: none;
          border-radius: 0.25rem;
          font-size: 1rem;

          &:focus {
            outline: none;
            background-color: #444;
          }
        }

        button {
          padding: 0.8rem 1rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;
          border-radius: 0.2rem;
          font-weight: bolder;
          font-size: 1.05rem;
          transition: 0.3s ease-in-out;
          width: 100%;

          &:hover {
            opacity: 0.8;
          }
        }
      }

      > button {
        padding: 0.8rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
        margin-top: 1rem;
        transition: 0.3s ease-in-out;
        width: 100%;
        max-width: 180px;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
`;
