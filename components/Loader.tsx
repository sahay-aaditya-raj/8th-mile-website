import React from 'react';
import styled, { keyframes } from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="min-h-screen loader-container flex justify-center items-center bg-white">
        <div className="sora font-extrabold loader-text blinking-text text-black">
          Loading
        </div>
      </div>
    </StyledWrapper>
  );
};

const blinkAnimation = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  /* Light mode background */
  background-color: #ffffff;

  .highlight {
    color: #000000;
    animation: ${blinkAnimation} 1s infinite;
  }

  .blinking-text {
    font-size: 2rem;
    color: #000000;
    margin-top: 20px;
    animation: ${blinkAnimation} 3s infinite;
  }
`;

export default Loader;
