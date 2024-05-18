import React from "react";
import { useClients } from "../contexts/ClientContext";
import { ClientsUl, ClientsLi, PenIconWrapper } from "./clientList.styled";
import { FaPenToSquare } from "react-icons/fa6";
import { P } from "../styles/global.styled";
import { useNavigate } from "react-router-dom";

export const ClientsList: React.FC = () => {
  const { clientsList } = useClients();
  const navigate = useNavigate();

  const handlePenIconClick = (clientId: string) => {
    navigate(`/nutritrack/registerfoodintake/${clientId}`);

  }

  return (
    <ClientsUl>
      {clientsList.map((client) => (
        <ClientsLi key={client._id} style={{ color: "black" }} >
          <div>
            {client.firstName} {client.lastName} - {client.email} -{" "}
            {client.gender} -
            {client.ageYears !== null
              ? `${client.ageYears} years`
              : `${client.ageMonths} months`}
          </div>
          <PenIconWrapper>
            <FaPenToSquare fontSize={"26px"} onClick={() => handlePenIconClick(client._id)}/>
            <P>Matdagbok</P>
          </PenIconWrapper>
        </ClientsLi>
      ))}
    </ClientsUl>
  );
};
