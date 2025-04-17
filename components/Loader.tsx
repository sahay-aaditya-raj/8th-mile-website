import React from 'react';
import styled from 'styled-components';
import { Typewriter } from 'react-simple-typewriter';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader" />
      <div className="text-container">
        <span>Loading <Typewriter
          words={['8th Mile', 'Events', 'Experiences']}
          loop={true}
          cursor
          cursorBlinking={true}
          typeSpeed={50}
          deleteSpeed={50}
          delaySpeed={300}
        /></span>
        
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .loader {
    position: relative;
    width: 120px;
    height: 90px;
    margin: 0 auto;
  }

  .loader:before {
    content: "";
    position: absolute;
    bottom: 30px;
    left: 50px;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background: var(--color-secondary-foreground);  // Using theme color
    animation: loading-bounce 0.5s ease-in-out infinite alternate;
  }

  .loader:after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    height: 7px;
    width: 45px;
    border-radius: 4px;
    box-shadow: 0 5px 0 var(--color-secondary-foreground), -35px 50px 0 var(--color-secondary-foreground), -70px 95px 0 var(--color-secondary-foreground);
    animation: loading-step 1s ease-in-out infinite;
  }

  .text-container {
    margin-top: 20px;
    font-size: 24px;
    color: var(--color-secondary-foreground); // Using theme color
    display: flex;
    align-items: center;
  }

  @keyframes loading-bounce {
    0% {
      transform: scale(1, 0.7);
    }

    40% {
      transform: scale(0.8, 1.2);
    }

    60% {
      transform: scale(1, 1);
    }

    100% {
      bottom: 140px;
    }
  }

  @keyframes loading-step {
    0% {
      box-shadow: 0 10px 0 rgba(0, 0, 0, 0),
              0 10px 0 var(--color-secondary-foreground),
              -35px 50px 0 var(--color-secondary-foreground),
              -70px 90px 0 var(--color-secondary-foreground);
    }

    100% {
      box-shadow: 0 10px 0 var(--color-secondary-foreground),
              -35px 50px 0 var(--color-secondary-foreground),
              -70px 90px 0 var(--color-secondary-foreground),
              -70px 90px 0 rgba(0, 0, 0, 0);
    }
  }
`;

export default Loader;
