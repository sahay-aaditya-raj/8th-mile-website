import React from 'react';
import styled, { keyframes } from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="min-h-screen loader-container">
        <div className="delagothic loader-text text-[#f9dd9c] blinking-text">
          Loading
        </div>
      </div>
    </StyledWrapper>
  );
};

const blinkAnimation = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #000;


  .highlight {
    color: #f9dd9c;
    animation: ${blinkAnimation} 1s infinite;
  }

  .blinking-text {
    font-size: 2rem;
    color: #f9dd9c;
    margin-top: 20px;
    animation: ${blinkAnimation} 3s infinite;
  }
`;

export default Loader;
