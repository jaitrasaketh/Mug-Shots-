// src/pages/Intro.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/muggulogor.png';
import './Intro.css';

const Intro = () => {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const fadeInTimer = setTimeout(() => {
      setFadeIn(false);
    }, 1000); // Duration for fade-in effect

    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        navigate('/home');
      }, 1000); // Duration for fade-out effect
    }, 2000);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTimer);
    };
  }, [navigate]);

  return (
    <div className={`intro-container ${fadeOut ? 'fade-out' : ''} ${fadeIn ? 'fade-in' : ''}`}>
      <img src={logo} alt="Company Logo" className="intro-logo" />
    </div>
  );
};

export default Intro;
