import Wrapper from '../assets/wrapper/Register';
import { Logo, FormRow } from '../components';
import { useState } from 'react';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  const [values, setvalues] = useState(initialState);

  const onSubmit = e => {
    e.preventDefault();
    const { name, email, password, isMember } = values;

    if (!email || !password || (!isMember && !name)) {
      console.log('error');
      return;
    }

    const currentUser = { name, email, password };
    console.log(currentUser);
  };

  const handleChange = e => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const toggleMember = () => {
    setvalues({ ...values, isMember: !values.isMember });
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>

        {/* {showAlert && <Alert />} */}

        {/* name input */}
        {!values.isMember && (
          <FormRow
            name="name"
            value={values.name}
            type="text"
            handleChange={handleChange}
          />
        )}

        {/* email input */}
        <FormRow
          name="email"
          // set the value always the same as name in initialState
          value={values.email}
          type="email"
          handleChange={handleChange}
        />

        {/* password input */}
        <FormRow
          name="password"
          value={values.password}
          type="password"
          handleChange={handleChange}
        />

        <button
          type="submit"
          className="btn btn-block"
          // disabled={isLoading}
        >
          submit
        </button>

        {/* <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() => {
            setupUser({
              currentUser: { email: 'test@test.com', password: '123456' },
              endPoint: 'login',
              alertText: 'Login Successful! Redirecting...',
            });
          }}
        >
          {isLoading ? 'loading...' : 'demo app'}
        </button> */}

        <p>
          {values.isMember ? 'Not a member yet? ' : 'Already a member? '}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
