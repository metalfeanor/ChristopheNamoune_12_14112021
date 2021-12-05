import { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const StyledGlobalStyle = createGlobalStyle`
    * {
      font-family: 'Roboto', sans-serif;
    }
    body {
        margin: 0;
    }
`;

function GlobalStyle() {
  return <StyledGlobalStyle />;
}

export default GlobalStyle;

export const StyledLink = styled(Link)`
  padding: 10px 15px;
  color: #fff;
  text-decoration: none;
  font-size: 24px;
  text-align: center;
`;

export const SelectedLink = styled(Link)`
  padding: 10px 15px;
  color: #000;
  text-decoration: none;
  font-size: 24px;
  text-align: center;
`;

export const Button = styled.button`
  border-radius: 6px;
  border: none;
  color: #fff;
  height: 64px;
  width: 64px;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Loader = styled.div`
  padding: 10px;
  border: 6px solid #ff0101;
  border-bottom-color: transparent;
  border-radius: 100px;
  animation: ${rotate} 1s infinite linear;
  height: 100px;
  width: 100px;
`;
