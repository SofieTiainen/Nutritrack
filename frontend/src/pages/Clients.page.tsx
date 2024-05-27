import React, { useEffect, useState } from "react";
import { AddClientForm } from "../components/AddClientForm";
import { ClientsList } from "../components/ClientsList";
import { useClients } from "../contexts/ClientContext";
import { ClientsWrapper, AddClientBtn, AddClientDiv } from "./clients.styled";
import { FlexDiv, H2, P, H1 } from "../styles/global.styled";
import { FaPlus } from "react-icons/fa6";
import { Colors } from "../styles/colors";

export const ClientsPage: React.FC = () => {
  const { clientsList, fetchClients } = useClients();
  const [showAddClientForm, setShowAddClientForm] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <ClientsWrapper>
      <FlexDiv
        $justifyContent="space-between"
        $alignItems="center"
        style={{ margin: "50px" }}
      >
        <H1 $color={Colors.Green600}>Your clients</H1>

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
