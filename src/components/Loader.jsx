import React from 'react';
import styled, { keyframes } from 'styled-components';

// we are Creating a pulse animation using theme.js pulse colors (for pulse 1 and 2)
const generateThemedPulse = (pulseColor1, pulseColor2) => keyframes`
    0% {
        transform: scale(1);
        box-shadow: 0 0 20px ${pulseColor1};
    }
    20% {
        transform: scale(1, 2.5);
        box-shadow: 0 0 50px ${pulseColor2};
    }
    40% {
        transform: scale(1);
        box-shadow: 0 0 20px ${pulseColor1};
    }
`;

// and this is the Wrapper for the entire loader
const PulseLoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem 0;
`;

// here you can see the Container that holds all the blocks together
const PulseLoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    position: relative;
`;

// here you can see Inner wrapper for arranging blocks in a ring
const PulseBlockRing = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

// here you can see one of the pulse blocks
const PulseBlock = styled.div`
    display: inline-block;
    width: 10px;
    height: 10px;
    margin: 2px;
    background-color: ${({ theme }) => theme.pulse2}; // static color for filled dot
    animation: ${({ theme }) => generateThemedPulse(theme.pulse1, theme.pulse2)} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    animation-delay: ${({ delay }) => delay}s;
`;

// as you can see thi is the Main Loader component with all the components named unique to the page so as not to create a clash in naming later when a page expands
const PulseLoader = () => {
    return (
        <PulseLoaderWrapper>
            <PulseLoaderContainer>
                <PulseBlockRing>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <PulseBlock key={index} delay={0.1 * (index + 1)} />
                    ))}
                </PulseBlockRing>
            </PulseLoaderContainer>
        </PulseLoaderWrapper>
    );
};

export default PulseLoader;
