// import { useState, useEffect } from "react";
// import axios from "axios";

// interface Client {
//     _id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     gender: string;
//     ageYears: number | null;
//     ageMonths: number | null;
// }

// export const ClientsList = () => {
//   const [clientsList, setClientsList] = useState<Client[]>([]);

//   const token = sessionStorage.getItem("token");

//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/clients", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.status === 200) {
//             setClientsList(response.data)
//           console.log("response fething clients", response);
//         }
//       } catch (error) {
//         console.log("Error fetching clients", error);
//       }
//     };

//     fetchClients();
//   }, [token]);

//   return (
//     <>
//       <h1>Client list</h1>
//       {clientsList.length > 0 ? (
//         <ul>
//             {clientsList.map((client, i) => (
//                 <li key={client._id}>
//                     {client.firstName} - {client.lastName} - {client.email} - {client._id} -
//                     {client.ageYears !== null ? `${client.ageYears} years` : `${client.ageMonths} months`}
//                 </li>

//             ))}
//         </ul>
//       ): (
//         <p>No clients</p>
//       )}
//     </>
//   );
// };
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
    console.log("clientId: ", clientId)
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
