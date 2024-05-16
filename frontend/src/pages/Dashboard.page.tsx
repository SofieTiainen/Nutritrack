import { UserState } from "../redux/slices/userSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { DashboardWrapper, StyledLatestClients, StyledLatestNutritionalAnalysis } from "./dashboard.styled";
import { FlexDiv } from "../styles/global.styled";
import { H1 } from "../styles/global.styled";
import { Colors } from "../styles/colors";

export const DashboardPage = () => {
    const user = useSelector((state: {user: UserState}) => state.user)

    useEffect(() => {
        if (user && user.firstName) {
          console.log('User data has been updated:', user);
        }
      }, [user]);
    
      if (!user || !user.firstName) {
        return <h1>Laddar...</h1>;
      }
    


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