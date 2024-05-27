import styled, {keyframes} from "styled-components";
import { Colors } from "../styles/colors";

export const Wrapper = styled.div`
background-color: ${Colors.Green100};
display: flex;
flex-direction: row;
justify-content: space-between;
width: 100%;
gap: 10px;

`

export const SearchBarWrapper = styled.div`
// background-color: li;
padding: 20px 20px 20px 80px;


`
export const FoodJournalWrapper = styled.div`
display: flex;
flex-direction: column;
margin-right: 50px;


`


export const FoodJournalDiv = styled.div`
width: 650px;
padding: 10px 30px;
border: 1px solid black;


`


export const OneDayDiv = styled.div`
background-color: ${Colors.Gray200};
padding: 10px 20px 10px 20px;
border-radius: 5px;


`
export const DateAndIconWrapper = styled.div`
display: flex;
justify-content: space-between; 


`

export const ArrowDiv = styled.div`

`

export const MealsDiv = styled.div`
display: flex;
align-items: center;
gap: 5px;
`

export const AddNewDayDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: baseline;
gap: 15px;
`

export const TrashCanDiv = styled.div`
display: flex;
justify-content: flex-end;
padding: 15px 10px 5px 10px;
`

export const BtnDiv = styled.div`
display: flex;
flex-direction: row;
gap: 10px;
`

export const FoodDiaryButton = styled.button<{ $color?: string; $backgroundImageC1?: string; $backgroundImageC2?:string; $marginTop?:string; $marginBottom?: string; }>`
  color: ${(props) => props.$color || `${Colors.White}`};
  Background-image: linear-gradient(rgb(181, 142, 90) 0%, rgb(168, 124, 78) 100%);
  background-image: linear-gradient(${props => props.$backgroundImageC1 || 'grey'} 0%, ${props => props.$backgroundImageC2 || 'black'} 100%);
  margin-top: ${(props) => props.$marginTop || '10px'};
  margin-bottom: ${(props) => props.$marginBottom || '20px'};
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

export const FoodUl = styled.ul`
list-style-type: none;
`

export const FoodLi = styled.li`
color: black;
`