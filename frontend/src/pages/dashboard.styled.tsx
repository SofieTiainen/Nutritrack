import styled from "styled-components";
import { Colors } from "../styles/colors";

export const DashboardWrapper = styled.div`
  background-color: ${Colors.Gold50};
  margin-bottom: 100px;
  margin-top: 100px;
  padding: 0px 50px;

`;

export const H1AndUserDiv = styled.div`
display: flex;
justify-content: space-between;
align-items: baseline;
padding-right: 5px;
`


export const H3 = styled.h3`
  font-size: 20px;
  color: ${Colors.Green800};
  text-align: left;
  padding-left: 10px;
`;


export const StyledLatestClients = styled.div`
  background-color: ${Colors.Green100};
  height: 400px;
  width: 100%;

`;


export const StyledLatestFoodDiarys = styled.div`
background-color: ${Colors.Green200};
  height: 400px;
  width: 100%;

`;

export const StyledLatestNutritionalAnalysis = styled.div`
background-color: ${Colors.Green100};
  height: 400px;
  width: 100%;

`;
export const LatestClientsUl = styled.ul`
margin: 0px 30px;
list-style: none;
padding:0px;
height: 300px;
overflow-y: auto; 
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

export const LatestFoodDiaryUl = styled.ul`
margin: 0px 30px;
list-style: none;
padding:0px;
height: 300px;
overflow-y: auto; 

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
export const LatestAnalysisUl = styled.ul`
margin: 0px 30px;
list-style: none;
padding: 0px;
height: 300px;
overflow-y: auto; 

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

export const StyledLi = styled.li`
background-color: white;
margin: 15px 0px;
padding: 15px;
cursor: pointer;
border-radius: 5px;
border: 1px solid ${Colors.Gray300};

&:hover {
  background-color: rgba(0, 0, 0, 0.05); 
}
`





