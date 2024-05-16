import styled from "styled-components";
import { Colors } from "../styles/colors";
import { Link } from "react-router-dom";

export const NavbarWrapper = styled.div<{ $active?: boolean }>`
  align-items: baseline;
  position: fixed;
  top: 0;
  z-index: 10;
  transition: background-color 0.2s ease, padding 0.2s ease-in-out;
  width: 100%;
  padding: ${(props) => (props.$active ? "5px 0px" : "10px 0px")};
  height: ${(props) => (props.$active ? "auto" : "auto")};
  background-color: ${(props) =>
    props.$active ? `${Colors.Gold50}` : `${Colors.Gold50}`};
`;

export const DIV = styled.div<{ $active?: boolean; $activeNav?: boolean }>`
  position: fixed;
  top: ${(props) => (props.$activeNav ? "70px" : "97px")};
  left: ${(props) => (props.$active ? "0" : "-150%")};
  width: 100%;
  height: 100vh;
  background-color: ${Colors.Green400};
  padding: 30px 40px 70px 30px;
  transition: left 0.65s ease-out, top 0.2s ease-in-out;
`;

export const HamMenuUl = styled.ul`
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: center;
`;

export const NavbarUl = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0px;
  padding: 0px;
`;

export const LoginDiv = styled.div`
  position: fixed;
  top: 0px;
  z-index: 10;
  width: 100%;
  height: 100vh;

  @media (min-width: 769px) {
    height: 100vh;
    background-color: #888888b0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Styledatag = styled.a<{
  $fontSize?: string;
  $color?: string;
  $marginLeft?: string;
  $margin?: string;
  $lineheight?: string;
  $fontWeight?: string;
  $hoverColor?: string;
}>`
  font-size: ${(props) => props.$fontSize || "16px"};
  color: ${(props) => props.$color || "white"};
  margin-left: ${(props) => props.$marginLeft || "0px"};
  margin: ${(props) => props.$margin || "0px"};
  line-height: ${(props) => props.$lineheight || "0"};
  font-weight: ${(props) => props.$fontWeight || "500"};
  text-decoration: inherit;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.$hoverColor || "inherit"};
  }
`;

export const StyledLink = styled(Link)<{
  $fontSize?: string;
  $color?: string;
  $marginLeft?: string;
  $margin?: string;
  $lineheight?: string;
  $fontWeight?: string;
  $hoverColor?: string;
}>`
  font-size: ${(props) => props.$fontSize || "18px"};
  color: ${(props) => props.$color || "white"};
  margin-left: ${(props) => props.$marginLeft || "0px"};
  margin: ${(props) => props.$margin || "0px"};
  line-height: ${(props) => props.$lineheight || "0"};
  font-weight: ${(props) => props.$fontWeight || "500"};
  text-decoration: inherit;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.$hoverColor || "inherit"};
  }
`;