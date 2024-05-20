import styled from "styled-components";
import { Colors } from "../styles/colors";

export const RegisterIntakeWrapper = styled.div`
  background-color: ${Colors.Gold50};
  margin-bottom: 100px;
  margin-top: 100px;
  padding: 0px 50px;

`;

export const StyledSearchField = styled.input`
background-color: ${Colors.White};
padding: 10px;
width: 500px;
border-radius: 5px;
margin-top: 0px;
outline: none;
transition: border-color 0.2s ease;
border: 1px solid black;

`

export const SearchBtn = styled.button`
background-color: ${Colors.MintGreen400};
display: flex;
padding: 10px 20px;
border-radius: 5px;

`

export const SearchDiv = styled.div`
display: flex;
align-items: center;
position: relative;
gap: 10px;
`