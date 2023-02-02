import React from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrapper/Landing';
import { Logo, Icon } from '../components';
import main from '../assets/images/main.svg';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            <span>Adaptive</span> Quiz App
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe,
            facilis voluptates! Quia repudiandae fugiat officiis harum autem,
            voluptas ex voluptates, cupiditate architecto quaerat ducimus
            maiores excepturi veritatis laudantium placeat! Sequi.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="quiz app main" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
