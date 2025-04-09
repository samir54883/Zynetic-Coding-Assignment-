import React from 'react';
import styled, { keyframes } from 'styled-components';

// Create pulse animation using theme pulse colors
const createPulse = (p1, p2) => keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 20px ${p1};
  }
  20% {
    transform: scale(1, 2.5);
    box-shadow: 0 0 50px ${p2};
  }
  40% {
    transform: scale(1);
    box-shadow: 0 0 20px ${p1};
  }
`;

const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem 0;
`;

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    position: relative;
`;

const LoaderInner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Block = styled.div`
    display: inline-block;
    width: 10px;
    height: 10px;
    margin: 2px;
    background-color: ${({ theme }) => theme.pulse2};
    animation: ${({ theme }) => createPulse(theme.pulse1, theme.pulse2)} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    animation-delay: ${({ delay }) => delay}s;
`;

const Loader = () => {
    return (
        <LoaderWrapper>
            <LoaderContainer>
                <LoaderInner>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Block key={i} delay={0.1 * (i + 1)} />
                    ))}
                </LoaderInner>
            </LoaderContainer>
        </LoaderWrapper>
    );
};

export default Loader;
