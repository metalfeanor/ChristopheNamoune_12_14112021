import { Link } from "react-router-dom";
import styled from "styled-components";
import { StyledLink } from "../../utils/style/GlobalStyle";

import { ReactComponent as Logo } from "../../assets/logo.svg";

const NavContainer = styled.nav`
  padding: 30px;
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  background-color: black;
`;

function TopNavbar() {
  return (
    <NavContainer>
      <Link to="/">
        <Logo src={Logo} />
      </Link>
      <StyledLink to="/">Accueil</StyledLink>
      <StyledLink to="/">Profil</StyledLink>
      <StyledLink to="/">Réglage</StyledLink>
      <StyledLink to="/">Communauté</StyledLink>
    </NavContainer>
  );
}

export default TopNavbar;
