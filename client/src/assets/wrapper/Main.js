import styled from 'styled-components';

const Wrapper = styled.section`
  /* background-color: red; */
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--primary-50);
    border-radius: var(--borderRadius);
    border: 0.25rem solid var(--primary-500);
    padding: 2rem 2rem;
    width: var(--fluid-width);
  }
  .title {
    text-transform: uppercase;
    font-size: 2.75rem;
  }
  ol {
    margin-bottom: 2rem;
  }
  #form {
    margin-bottom: 1rem;
  }
  li {
    font-size: 1.25rem;
  }
  .form-input {
    background-color: var(--white);
  }
`;

export default Wrapper;
