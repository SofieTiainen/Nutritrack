import { DashboardWrapper, StyledLatestClients, StyledLatestNutritionalAnalysis, StyledLatestFoodDiarys } from "./dashboard.styled";
import { FlexDiv } from "../styles/global.styled";
import { H1, P } from "../styles/global.styled";
import { Colors } from "../styles/colors";
import { useFood } from "../contexts/FoodContext";
import { useEffect } from "react";
import { useClients } from "../contexts/ClientContext";


export const DashboardPage = () => {
  const {fetchFoodItems} = useFood();
  const {fetchClients, clientsList, fetchFoodDiaries, foodDiaries} = useClients();

  useEffect(() => {
    fetchFoodItems();
  }, [])

  useEffect(() => {
    fetchClients();
    fetchFoodDiaries();
  }, []);

  const sortedClients = [...clientsList].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const sortedFoodDiaries = [...foodDiaries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        <DashboardWrapper>
        <H1 $color={Colors.Green600}>Dashboard</H1>
        <FlexDiv $flexdirection="column" $alignItems="center" $gap="20px" style={{width: '100%'}}>
        <StyledLatestClients>
            <P>latest clients sorterade på createdAt
              - länkar till klientsidan, till den clienten och dess snabblänkar till matdagbok eller näringsberäkning</P>
            <ul style={{backgroundColor: 'pink'}}>
            {sortedClients.map(client => (
              <li key={client._id} style={{color: 'black'}}>
                {client.firstName} {client.lastName} - {new Date(client.createdAt).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </StyledLatestClients>
        <StyledLatestFoodDiarys>
          <P>Senaste matdagböckerna - länkar direkt till klientens matdagboken</P>
          <ul style={{ backgroundColor: 'lightblue' }}>
            {sortedFoodDiaries.map(diary => (
              <li key={diary._id} style={{ color: 'black' }}>
                {diary.clientId.firstName} {diary.clientId.lastName} - {new Date(diary.createdAt).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </StyledLatestFoodDiarys>
        <StyledLatestNutritionalAnalysis>
            <P>senaste matberäkning - länkar direkt till klientens näringsvärdesberäkningen</P>
        </StyledLatestNutritionalAnalysis>
        </FlexDiv>
        </DashboardWrapper>
        
    )
}