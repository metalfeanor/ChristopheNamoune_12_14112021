import { Link } from "react-router-dom";
import styled from "styled-components";
import { StyledLink } from "../../utils/style/GlobalStyle";
import { ReactComponent as Logo } from "../../assets/logo.svg";

import { variables } from "../../utils/variables";

const NavContainer = styled.nav`
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${variables.backgroundColor};
`;

export default function TopNavbar() {
  return (
    <NavContainer>
      <Link to="/">
        <Logo />
      </Link>
      <StyledLink to="">Accueil</StyledLink>
      <StyledLink to="">Profil</StyledLink>
      <StyledLink to="">Réglage</StyledLink>
      <StyledLink to="">Communauté</StyledLink>
    </NavContainer>
  );
}
