import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
    display: flex;
    gap: 1rem;
    margin: 2rem auto;
    justify-content: center;
    flex-wrap: wrap;
`;

const Input = styled.input`
    width: 250px;
    height: 40px;
    line-height: 28px;
    padding: 0 1rem;
    font-size: 1rem;
    background-color: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text};
    border: 2px solid transparent;
    border-radius: 8px;
    outline: none;
    transition: 0.3s ease;

    &::placeholder {
        color: ${({ theme }) => (theme.text === '#111' ? '#9e9ea7' : '#aaa')};
    }

    &:focus,
    &:hover {
        background-color: ${({ theme }) => theme.body};
        border-color: ${({ theme }) =>
                theme.text === '#111'
                        ? 'rgba(66,147,255,0.4)'
                        : 'rgba(70,53,177,0.4)'};
        box-shadow: 0 0 0 4px
        ${({ theme }) =>
                theme.text === '#111'
                        ? 'rgba(66,147,255,0.1)'
                        : 'rgba(70,53,177,0.1)'};
    }
`;

const Button = styled.button`
    padding: 0.5rem 1rem;
    background: ${({ theme }) => theme.button};
    color: white;
    border: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    border-radius: 8px;
    min-height: 40px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    &:hover {
        background: ${({ theme }) => theme.hover};
    }
`;

// 🌙 Theme Toggle Switch Styles
const Switch = styled.label`
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 4em;
  height: 2.2em;
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Checkbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(70,53,177,1);
  transition: 0.4s;
  border-radius: 30px;
  overflow: hidden;

  &::before {
    position: absolute;
    content: '';
    height: 1.2em;
    width: 1.2em;
    border-radius: 20px;
    left: 0.5em;
    bottom: 0.5em;
    transition: 0.4s;
    transition-timing-function: cubic-bezier(0.81, -0.04, 0.38, 1.5);
    box-shadow: inset 8px -4px 0px 0px #fff;
  }

  ${Checkbox}:checked + & {
    background-color: rgba(66, 147, 255, 1);
  }

  ${Checkbox}:checked + &::before {
    transform: translateX(1.8em);
    box-shadow: inset 15px -4px 0px 15px #ffcf48;
  }
`;
const Spinner = styled.div`
  width: 24px;
  height: 24px;
  display: grid;
  border-radius: 50%;
  -webkit-mask: radial-gradient(farthest-side, #0000 40%, rgba(255,255,255,1) 41%);
  background: 
    linear-gradient(0deg, rgba(255,255,255, 0.5) 50%, rgba(255,255,255, 1) 0)
      center / 2.5px 100%,
    linear-gradient(90deg, rgba(255,255,255, 0.25) 50%, rgba(255,255,255, 0.75) 0)
      center / 100% 2.5px;
  background-repeat: no-repeat;
  animation: spinner-d3o0rx 1s infinite steps(12);

  &::before,
  &::after {
    content: '';
    grid-area: 1/1;
    border-radius: 50%;
    background: inherit;
    opacity: 0.915;
    transform: rotate(30deg);
  }

  &::after {
    opacity: 0.83;
    transform: rotate(60deg);
  }

  @keyframes spinner-d3o0rx {
    100% {
      transform: rotate(1turn);
    }
  }
`;

const Star = styled.div`
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  width: 5px;
  height: 5px;
  transition: all 0.4s;

  &.star_1 {
    left: 2.5em;
    top: 0.5em;
  }

  &.star_2 {
    left: 2.2em;
    top: 1.2em;
  }

  &.star_3 {
    left: 3em;
    top: 0.9em;
  }

  ${Checkbox}:checked ~ ${Slider} & {
    opacity: 0;
  }
`;

const Cloud = styled.svg`
  width: 3.5em;
  position: absolute;
  bottom: -1.4em;
  left: -1.1em;
  opacity: 0;
  transition: all 0.4s;

  ${Checkbox}:checked ~ ${Slider} & {
    opacity: 1;
  }
`;

const SearchBar = ({ onSearch, onRefresh, lastCity, onToggleTheme, themeMode }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city);
            setCity('');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
            />
            <Button type="submit">Search</Button>
            {lastCity && (
                <Button type="button" onClick={() => onRefresh(lastCity)}>
                    <Spinner style={{ marginRight: '8px' }} /> Refresh
                </Button>
            )}

            {/* 🌙 Custom Toggle Switch */}
            <Switch>
                <Checkbox
                    type="checkbox"
                    checked={themeMode === 'light'}
                    onChange={onToggleTheme}
                />

                <Slider>
                    <Star className="star_1" />
                    <Star className="star_2" />
                    <Star className="star_3" />
                    <Cloud viewBox="0 0 16 16" className="cloud_1 cloud">
                        <path
                            transform="matrix(.77976 0 0 .78395-299.99-418.63)"
                            fill="#fff"
                            d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925"
                        />
                    </Cloud>
                </Slider>
            </Switch>
        </Form>
    );
};

export default SearchBar;
