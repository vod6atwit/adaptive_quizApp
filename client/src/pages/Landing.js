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
            Adaptive quizzes are a type of assessment that adjusts to the skill
            level of the student, providing a more personalized learning
            experience. Adaptive learning may contribute to both improving
            student learning outcomes and increasing student motivation and
            engagement. The Adaptive Quiz activity enables a teacher to create
            tests that efficiently measure the takers' abilities.
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
