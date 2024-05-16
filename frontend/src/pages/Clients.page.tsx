import { ClientsWrapper, AddClientBtn, AddClientDiv } from "./clients.styled"
import { H2, P, FlexDiv } from "../styles/global.styled"
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { AddClientForm } from "../components/AddClientForm";


export const ClientsPage = () => {
    const [isAddClientOpen, setIsClientOpen] = useState(false);

    const toggleAddClient = () => {
        setIsClientOpen(!isAddClientOpen);
    }

    return (
        <ClientsWrapper>
            <FlexDiv $justifyContent="space-between" $alignItems="center" style={{margin: '50px'}}>
            <H2>Clients</H2>
            <AddClientBtn onClick={toggleAddClient}>Add client
            <FaPlus fontSize={'24px'} />
            </AddClientBtn>
            </FlexDiv>


            <H2>Your clients</H2>
            <P style={{textAlign: 'center'}}>Här skrivs användarens clienter ut</P>
            {isAddClientOpen && (
                <AddClientDiv>
                    <AddClientForm toggleAddClient={toggleAddClient}></AddClientForm>
                </AddClientDiv>
            )}
        </ClientsWrapper>
    )

}