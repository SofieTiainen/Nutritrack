import { DashboardWrapper, StyledLatestClients, StyledLatestNutritionalAnalysis, StyledLatestFoodDiarys, H1AndUserDiv, H3, LatestAnalysisUl, LatestClientsUl, LatestFoodDiaryUl, StyledLi } from "./dashboard.styled";
import { FlexDiv } from "../styles/global.styled";
import { H1, P } from "../styles/global.styled";
import { Colors } from "../styles/colors";
import { useEffect, useState } from "react";
import { useClients } from "../contexts/ClientContext";


export const DashboardPage = () => {
  const {fetchClients, clientsList, fetchFoodDiaries, foodDiaries} = useClients();
  const [userProfile, setUserProfile] = useState({ firstName: "", lastName: "", email: "" });

  useEffect(() => {
    fetchClients();
    fetchFoodDiaries();

    const profile = localStorage.getItem("userProfile");
    if (profile) {
      setUserProfile(JSON.parse(profile));
    }
  }, []);

  const sortedClients = [...clientsList].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const sortedFoodDiaries = [...foodDiaries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        <DashboardWrapper>
          <H1AndUserDiv>
          <H1 $color={Colors.Green600}>Dashboard</H1>
        <P>Inloggad som: {userProfile.firstName} {userProfile.lastName}, {userProfile.email}</P>
          </H1AndUserDiv>
        <FlexDiv $flexdirection="column" $alignItems="center" $gap="20px" style={{width: '100%'}}>
        <StyledLatestClients>
            <H3>Senast tillagda klienter</H3>
            <LatestClientsUl>
            {sortedClients.map(client => (
              <StyledLi key={client._id} style={{color: 'black'}}>
                {client.firstName} {client.lastName} - {new Date(client.createdAt).toLocaleDateString()}
              </StyledLi>
            ))}
          </LatestClientsUl>
        </StyledLatestClients>
        <StyledLatestFoodDiarys>
          <H3>Senast skapade matdagböckerna</H3>
          <LatestFoodDiaryUl>
            {sortedFoodDiaries.map(diary => (
              <StyledLi key={diary._id} style={{ color: 'black' }}>
                {diary.clientId.firstName} {diary.clientId.lastName} - {new Date(diary.createdAt).toLocaleDateString()}
              </StyledLi>
            ))}
          </LatestFoodDiaryUl>
        </StyledLatestFoodDiarys>
        <StyledLatestNutritionalAnalysis>
            <H3>Senast skapade matberäkningarna</H3>
        </StyledLatestNutritionalAnalysis>
        </FlexDiv>
        </DashboardWrapper>
        
    )
}


