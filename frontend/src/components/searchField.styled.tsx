import styled from "styled-components";
import { Colors } from "../styles/colors";

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

export const SearchDiv = styled.div`
display: flex;
flex-direction: column;
position: relative;
`

export const SearchUl = styled.ul`
background-color: ${Colors.White};
max-height: 500px;
width: 510px;
overflow-y: auto;
padding: 0px;
margin: 0px;
list-style-type: none;
padding: 5px;



/* Custom scrollbar styles */
&::-webkit-scrollbar {
  width: 8px; /* Smal scrollbar */
}

&::-webkit-scrollbar-track {
  background: #f1f1f1; /* Bakgrundsfärg för scrollbarens track */
  border-radius: 10px; /* Rundade hörn för track */
}

&::-webkit-scrollbar-thumb {
  background: #ccc; /* Färg för scrollbarens thumb */
  border-radius: 10px; /* Rundade hörn för thumb */
}

&::-webkit-scrollbar-thumb:hover {
  background: #555; /* Färg vid hover för thumb */
}

`

export const SearchLi = styled.li`
margin-bottom: 5px;
padding: 5px;
cursor: pointer;

&:hover {
    background-color: rgba(0, 0, 0, 0.05); 
}
`

export const FoodInput = styled.input`
  background-color: ${Colors.White};
  padding: 10px;
  border-radius: 2px;
//   margin-top: 15px;
  outline: none;
  transition: border-color 0.2s ease;
  border: 1px solid ${Colors.Gray300};

  &:focus {
    outline: none;
    border-color: #6666661a;
  }
`;

export const SelectedFoodWrapper = styled.div`
margin-top: 60px;
`

export const InputAndBtnWrapper = styled.div`
display: flex;
align-items: baseline;
gap: 20px;
`


