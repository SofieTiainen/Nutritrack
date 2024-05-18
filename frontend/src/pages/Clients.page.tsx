import React, { useEffect, useState } from "react";
import { AddClientForm } from "../components/AddClientForm";
import { ClientsList } from "../components/ClientsList";
import { useClients } from "../contexts/ClientContext";
import { ClientsWrapper, AddClientBtn, AddClientDiv } from "./clients.styled";
import { FlexDiv, H2, P } from "../styles/global.styled";
import { FaPlus } from "react-icons/fa6";

export const ClientsPage: React.FC = () => {
  const { clientsList, fetchClients } = useClients();
  const [showAddClientForm, setShowAddClientForm] = useState(false);

  useEffect(() => {
    fetchClients();
  }, [])


  return (
    <ClientsWrapper>
      <h1 style={{color:'black'}}>Client list</h1>
      <FlexDiv
        $justifyContent="space-between"
        $alignItems="center"
        style={{ margin: "50px" }}
      >
        <H2 style={{color:'black'}}>Clients</H2>
        <AddClientBtn onClick={() => setShowAddClientForm(true)}>
          Add client
          <FaPlus fontSize={"24px"} />
        </AddClientBtn>
      </FlexDiv>

      {showAddClientForm && (
        <AddClientDiv>
        <AddClientForm toggleAddClient={() => setShowAddClientForm(false)} />
        </AddClientDiv>
      )}
      {clientsList.length > 0 ? <ClientsList /> : <P>No clients</P>}
    </ClientsWrapper>
  );
};
