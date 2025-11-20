import React, { useState } from 'react';
import styled from 'styled-components';
import BackgroundImage from "../components/BackgroundImage";
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { firebaseAuth } from "../utils/firebase-config"
import { onAuthStateChanged, signInWithEmailAndPassword, updateCurrentUser } from 'firebase/auth';


export default function Login() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleLogIn = async () => {
    try {
      const { email, password } = formValues;
      await signInWithEmailAndPassword(firebaseAuth, email, password)
    } catch (err) {
      console.log(err)
    }
  };


  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/")                                                                              //to check current user then navigate to ("/")
  })

  return (
    <Container >
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Login</h3>
            </div>
            <div className="container flex column">
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



              <button onClick={handleLogIn}>Login</button>

            </div>
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
  }
  .form-container{
  gap:2rem;
  height:85vh;

  .form{
  padding:2rem;
  background-color:#000000b0;
  width:25vw;
  max-width: 450px;
  gap:2rem;
  color:white;
  border-radius: 0.5rem;

  .title {
    h3 {
      font-size: 2rem;
      margin-bottom: 1.5rem;
    }
  }

  .container{
  gap:2rem;
  input{
  padding:1rem 1rem;
  width:18rem;
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
  button{
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

          &:hover {
            opacity: 0.8;
          }
  
  }
  }

  }

  }
    
  }
`;
