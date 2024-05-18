import { DashboardWrapper, StyledLatestClients, StyledLatestNutritionalAnalysis } from "./dashboard.styled";
import { FlexDiv } from "../styles/global.styled";
import { H1 } from "../styles/global.styled";
import { Colors } from "../styles/colors";
import { useFood } from "../contexts/FoodContext";
import { useEffect } from "react";

export const DashboardPage = () => {
  const {fetchFoodItems} = useFood();

  useEffect(() => {
    fetchFoodItems();
  }, [])

    return (
        <DashboardWrapper>
        <H1 $color={Colors.Green600}>Dashboard</H1>
        <FlexDiv $flexdirection="column" $alignItems="center" $gap="20px" style={{width: '100%'}}>
        <StyledLatestClients>
            <p>latest clients</p>
        </StyledLatestClients>
        <StyledLatestNutritionalAnalysis>
            <p>senaste matberäkning</p>
        </StyledLatestNutritionalAnalysis>
        </FlexDiv>
        </DashboardWrapper>
        
    )
}