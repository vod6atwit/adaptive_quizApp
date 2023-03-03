import styled from 'styled-components';

const Wrapper = styled.section`
  /* background-color: red; */
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .container {
    width: 50vw;
    /* background-color: orange; */
    /* background-color: var(--primary-50); */
    border-radius: var(--borderRadius);
    border: 0.25rem solid var(--primary-500);
    padding: 2rem 2rem;
  }
  .title {
    /* background-color: var(--primary-100); */
  }
  .grid {
    display: flex;
    justify-content: space-between;
  }
  .btn {
    width: 10vw;
  }
`;

export default Wrapper;
