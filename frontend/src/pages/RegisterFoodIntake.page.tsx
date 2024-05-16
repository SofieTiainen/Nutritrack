import { RegisterIntakeWrapper } from "./registerfoodIntake.styled"
import { H1 } from "../styles/global.styled"
import { Colors } from "../styles/colors"

export const RegisterFoodIntakePage = () => {
    
    return (
        <RegisterIntakeWrapper>
            <H1 $color={Colors.Green600}>Register food</H1>
        </RegisterIntakeWrapper>
        
    )
}