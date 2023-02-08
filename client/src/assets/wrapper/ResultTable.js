import styled from 'styled-components';

const Wrapper = styled.div`
  table {
    width: 100%;
    margin-top: 1.5rem;
  }

  .table-header {
    color: var(--primary-50);
    font-size: 1.1rem;
    text-align: center;
    background: var(--primary-900);
    padding: 18px 0;
  }

  .table-body {
    font-size: 1.1rem;
    text-align: center;
    color: var(--grey-50);
    background: var(--grey-900);
    padding: 18px 0;
  }

  .table-header > tr > td {
    /* border: 2px solid var(--primary-500); */
  }
`;

export default Wrapper;
