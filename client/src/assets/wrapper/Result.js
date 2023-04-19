import styled from 'styled-components';

const Wrapper = styled.div`
  /* background-color: red; */
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .container {
    width: 50vw;
    /* background-color: orange; */
    /* background-color: var(--primary-50); */
    /* border-radius: var(--borderRadius);
    border: 0.25rem solid var(--primary-500); */
    padding: 2rem 2rem;
  }
  .title {
    /* background-color: orange; */
    border-radius: var(--borderRadius);
    border: 0.25rem solid var(--primary-500);
    padding: 1rem 1rem;
  }
  .result {
    /* background-color: blue; */
    border-radius: var(--borderRadius);
    border: 0.25rem solid var(--primary-500);
    padding: 2rem 2rem;
  }
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 1.5rem;
    }
  }
  .start {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    gap: 1.5rem;
  }
  .btn {
    padding: 0.5rem 2rem;
    font-size: 1.25rem;
  }
`;

export default Wrapper;
