import styled from "styled-components";
import { Colors } from "../styles/colors";

export const ClientsUl = styled.ul`
background-color: ${Colors.Green300};
list-style-type: none;
padding: 20px;
margin: 0px 50px;
`

export const DiaryUl = styled.ul`
background-color: ${Colors.Green300};
padding: 10px;
list-style-type: none;
min-height: 200px;
max-height: 200px;
overflow-y: auto;
margin-right: 15px;
padding-right: 20px;


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

export const DiaryLi = styled.li`
margin: 15px 0px;
padding: 15px;
display: flex;
align-items: center;
gap: 15px;

&:hover {
    background-color: rgba(0, 0, 0, 0.05); 
}

`

export const ClientsLi = styled.li`
// border-bottom: 1px solid ${Colors.White};
background-color: white;
display: flex;
flex-direction: row;
align-items: baseline;
justify-content: space-between;
margin: 0px 0px;
margin-bottom: 10px;
padding: 15px 5px;
cursor: pointer;
`

export const ClientsDiv = styled.div`
display: flex;
flex-direction: column;
padding: 0px 10px;
border-radius: 10px;
margin-left: 5px;
min-width: 200px;
background-color: ${Colors.Green200};
`

export const StyledDiv = styled.div`
display: flex;
flex-direction: row;
gap: 30px;
align-items: baseline;
align-items: flex-start
`
export const PenIconWrapper = styled.div`
border: 1px solid transparent;
border-radius: 5px;
padding: 5px 10px;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
background-image: linear-gradient(to bottom, ${Colors.Green200}, ${Colors.Green400});
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

&:hover {
  background-image: linear-gradient(to bottom, ${Colors.Green300}, ${Colors.Green500});
}



`

export const H3 = styled.h3`
  font-size: 20px;
  color: ${Colors.Green800};
  text-align: left;
  padding-left: 10px;
`;


export const H4 = styled.h4`
  font-size: 16px;
  color: ${Colors.Green800};
  text-align: left;
  padding-left: 10px;
`;



