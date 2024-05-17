import { RegisterIntakeWrapper } from "./registerfoodIntake.styled"
import { H1 } from "../styles/global.styled"
import { Colors } from "../styles/colors"
import { useParams } from "react-router-dom"
import { useClients } from "../contexts/ClientContext"

export const RegisterFoodIntakePage = () => {
    const { clientId } = useParams<{ clientId: string }>();
    const { getClientById } = useClients();
    const client = clientId ? getClientById(clientId): undefined;

    console.log("ClientId: ", clientId)
    console.log("Client: ", client)
    
    return (
        <RegisterIntakeWrapper>
            <H1 $color={Colors.Green600}>Register food for {client?.firstName} {client?.lastName}</H1>
        </RegisterIntakeWrapper>
        
    )
}