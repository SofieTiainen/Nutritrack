import styled from "styled-components";
import { Link } from "react-router-dom";
import { Colors } from "./colors";

export const H1 = styled.h1<{ $color?: string; $textAlign?: string; $marginLeft?: string; $active?: boolean; }>`
  font-size: ${(props) => (props.$active ? '28px' : '36px')};
  color: ${(props) => props.$color || `${Colors.Green400}`};
  text-align: ${(props) => props.$textAlign || "left"};
  margin-left: ${(props) => props.$marginLeft || '0px'};
  line-height: 1.1;
  letter-spacing: 0.5px;
  transition: font-size 0.3s ease; 
`;

export const H2 = styled.h2`
  font-size: 24px;
  padding-top: 50px;
  padding-bottom: 50px;
  color: ${Colors.PithBlack};
  text-align: center;
`;

export const H3 = styled.h3`
  font-size: 20px;
  color: ${Colors.PithBlack};
  text-align: center;
`;

export const P = styled.p<{$fontSize?:string}>`
  color: black;
  font-size: ${(props) => props.$fontSize || '12px'}
  margin: 0px;
`;



export const Input = styled.input`
  background-color: #d2d2d269;
  padding: 10px;
  border-radius: 2px;
  margin-top: 15px;
  outline: none;
  transition: border-color 0.2s ease;
  border: 1px solid transparent;

  &:focus {
    outline: none;
    border-color: #6666661a;
  }
`;

export const Button = styled.button<{ $color?: string; $backgroundImageC1?: string; $backgroundImageC2?:string; $marginTop?:string; $marginBottom?: string; }>`
  color: ${(props) => props.$color || `${Colors.White}`};
  Background-image: linear-gradient(rgb(181, 142, 90) 0%, rgb(168, 124, 78) 100%);
  background-image: linear-gradient(${props => props.$backgroundImageC1 || 'grey'} 0%, ${props => props.$backgroundImageC2 || 'black'} 100%);
  margin-top: ${(props) => props.$marginTop || '25px'};
  margin-bottom: ${(props) => props.$marginBottom || '50px'};
  border-radius: 3px;
  border: 1px solid transparent;
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.25s;
  letter-spacing: 1.2px;


  button:hover {
    border-color: #646cff;
  }

  &:disabled {
    cursor: not-allowed;
    background-image: linear-gradient(lightgray 0%, darkgray 100%);
    background-color: pink;
    border-color: #ccc;
    color: ${Colors.Gray400};
  }
`;

export const StyledLink = styled(Link)`
  color: #888;
  margin-top: 40px;
  font-size: 12px;
`;

export const ErrorP = styled.p<{$color?: string; $padding?: string}>`
  color: ${(props) => props.$color || 'black'};
  padding: ${(props) => props.$padding || '0px'};
  font-size: 12px;
  margin: 0px;
`;

export const FlexDiv = styled.div<{
  $flexdirection?: string;
  $alignContent?: string;
  $justifyContent?: string;
  $alignItems?: string;
  $gap?: string;
}>`
  display: flex;
  flex-direction: ${(props) => props.$flexdirection || "row"};
  align-content: ${(props) => props.$alignContent || "normal"};
  justify-content: ${(props) => props.$justifyContent || "normal"};
  align-items: ${(props) => props.$alignItems || "normal"};
  gap: ${(props) => props.$gap || "0px"};

`;

export const Styledli = styled.li<{
  $backgroundColor?: string;
  $padding?: string;
  $margin?: string;
  $borderRadius?: string;
  $marginRight?: string;
  $width?: string;
  $height?: string;
  $textAlign?: string;
  $backgroundImageC1?: string;
  $backgroundImageC2?: string;
}>`
  padding: ${(props) => props.$padding || "0px"};
  margin: ${(props) => props.$margin || "0px"};
  list-style-type: none;
  background-color: ${(props) => props.$backgroundColor || `inherit`};
  border-radius: ${(props) => props.$borderRadius || "0px"};
  margin-right: ${(props) => props.$marginRight || "0px"};
  width: ${(props) => props.$width || "fit-content"};
  height: ${(props) => props.$height || "fit-content"};
  text-align: ${(props) => props.$textAlign || "left"};
  letter-spacing: 1.4px;
  // background-image: linear-gradient(${Colors.Beige300} 0%, ${Colors.Beige400} 100%);
  // background-image: linear-gradient(${Colors.Beige300} 0%, ${Colors.Beige400} 100%);
  background-image: linear-gradient(${props => props.$backgroundImageC1 || 'none'} 0%, ${props => props.$backgroundImageC2 || 'none'} 100%);


`;
