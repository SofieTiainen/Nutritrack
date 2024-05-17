// import {
//   ClientsWrapper,
//   AddClientBtn,
//   AddClientDiv,
//   ClientsListWrapper,
// } from "./clients.styled";
// import { H2, P, FlexDiv } from "../styles/global.styled";
// import { FaPlus } from "react-icons/fa6";
// import { useState } from "react";
// import { AddClientForm } from "../components/AddClientForm";
// import { ClientsList } from "../components/ClientsList";

// export const ClientsPage = () => {
//   const [isAddClientOpen, setIsClientOpen] = useState(false);

//   const toggleAddClient = () => {
//     setIsClientOpen(!isAddClientOpen);
//   };

//   return (
//     <ClientsWrapper>
//       <FlexDiv
//         $justifyContent="space-between"
//         $alignItems="center"
//         style={{ margin: "50px" }}
//       >
//         <H2>Clients</H2>
//         <AddClientBtn onClick={toggleAddClient}>
//           Add client
//           <FaPlus fontSize={"24px"} />
//         </AddClientBtn>
//       </FlexDiv>

//       <H2>Your clients</H2>
//       <P style={{ textAlign: "center" }}>Här skrivs användarens clienter ut</P>
//       <ClientsListWrapper>
//         <ClientsList></ClientsList>
//       </ClientsListWrapper>

//       {isAddClientOpen && (
//         <AddClientDiv>
//           <AddClientForm toggleAddClient={toggleAddClient}></AddClientForm>
//         </AddClientDiv>
//       )}
//     </ClientsWrapper>
//   );
// };


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
  }, [fetchClients]);

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
