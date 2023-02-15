import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 2rem;
  /* background-color: blue; */
  display: flex;
  align-items: center;
  justify-content: center;
  .text-light {
    font-size: 2rem;
  }
  input {
    appearance: none;

    border-radius: 50%;
    width: 16px;
    height: 16px;

    border: 2px solid #999;
    transition: 0.2s all linear;
    margin-right: 5px;

    position: relative;
    top: 4px;
  }

  input:checked {
    border: 6px solid var(--primary-500);
  }
  input:checked ~ .text {
    color: var(--primary-500);
  }

  .checked {
    input {
      border: 6px solid var(--primary-500);
    }
  }

  .options {
    padding-left: 2rem;
  }
  .text {
    margin-left: 1rem;
  }
  .text:hover {
    color: var(--primary-500);
  }
`;

export default Wrapper;
