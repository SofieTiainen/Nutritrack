import styled from "styled-components";
import { Colors } from "../styles/colors";

export const ClientsUl = styled.ul`
background-color: #ededed;
list-style-type: none;
padding: 60px 50px;
margin: 0px 50px;
`

export const ClientsLi = styled.li`
background-color: ${Colors.MintGreen200};
padding: 20px;
margin-top: 20px;
border-radius: 5px;
border: 1px solid black;
display: flex;
justify-content: space-between
`
export const PenIconWrapper = styled.div`
border: 1px solid black;
border-radius: 5px;
padding: 5px;
display: flex;
flex-direction: column;
align-items: center;

&:hover {
    background-color: pink;
}



`