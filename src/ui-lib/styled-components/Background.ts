import styled from 'styled-components';

const Background = styled.div`
  display: flex;
  place-content: center;
  flex-wrap: wrap;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.08);
  transition: all .3s linear;
  z-index: 1000;
`;

export default Background;
