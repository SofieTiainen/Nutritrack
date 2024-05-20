import styled from "styled-components";
import { Colors } from "../styles/colors";

export const Wrapper = styled.div`
background-color: ${Colors.MintGreen100};
display: flex;
flex-direction: row;
justify-content: space-between;
width: 100%;

`

export const SearchBarWrapper = styled.div`
background-color: lightblue;
padding: 20px 20px 10px 20px;


`
export const FoodJournalWrapper = styled.div`
display: flex;
flex-direction: column;
margin-right: 50px;


`


export const FoodJournalDiv = styled.div`
width: 500px;
padding: 10px 30px;
border: 1px solid black;


`


export const OneDayDiv = styled.div`
background-color: ${Colors.Gray300};
padding: 0px 20px 10px 20px;
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
`

