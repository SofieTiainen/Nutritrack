// import React from "react";
// import { useClients } from "../contexts/ClientContext";
// import { ClientsUl, ClientsLi, PenIconWrapper, ClientsDiv, H3, StyledDiv, DiaryUl, DiaryLi, H4 } from "./clientList.styled";
// import { FaPenToSquare } from "react-icons/fa6";
// import { P } from "../styles/global.styled";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import axios from "axios";
// import { HiChevronRight } from "react-icons/hi";

// export const ClientsList: React.FC = () => {
//   const { clientsList, foodDiaries, fetchFoodDiaries } = useClients();
//   const navigate = useNavigate();
//   const token = sessionStorage.getItem("token");

//   const initialDays = [
//     {
//       date: new Date().toISOString().split("T")[0],
//       mealTypes: [
//         { name: "Frukost", foods: [] },
//         { name: "Lunch", foods: [] },
//         { name: "Middag", foods: [] },
//         { name: "Mellanmål 1", foods: [] },
//       ],
//     },
//   ];

//   const handlePenIconClick = async (clientId: string) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/foodDiary",
//         { clientId, days: initialDays },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const diaryId = response.data._id;
//       navigate(`/nutritrack/registerfoodintake/${clientId}/${diaryId}`);

//     } catch (error) {
//       console.error("Error creating food diary:", error);
//     }


//   };

//   const getFoodDiariesForClient = (clientId: string) => {
//     return foodDiaries.filter((diary) => diary.clientId._id === clientId);
//   };

//   const handleGoToDiaryClick = (clientId: string, diaryId: string) => {
//     navigate(`/nutritrack/registerfoodintake/${clientId}/${diaryId}`);

//   };

//   useEffect(() => {
//     fetchFoodDiaries();
//   }, []);

//   return (
//     <ClientsUl>
//       {clientsList.map((client) => (
//         <ClientsLi key={client._id} style={{ color: "black" }}>
//           <div>
//           <H3>{client.firstName} {client.lastName}</H3>
//           <StyledDiv>
//           <ClientsDiv>
//             <P>{client.email} </P>
//             <P>{client.gender}</P>
//             <P>{client.ageYears !== null
//               ? `${client.ageYears} years`
//               : `${client.ageMonths} months`}</P>
//           </ClientsDiv>
//           <PenIconWrapper>
//             <FaPenToSquare
//               fontSize={"26px"}
//               onClick={() => handlePenIconClick(client._id)}
//             />
//             <P>Ny matdagbok</P>
//           </PenIconWrapper>
//           </StyledDiv>

//           </div>
//           <div>
//           <H4>Klientens matdagböcker ({getFoodDiariesForClient(client._id).length} st)</H4>
//           <DiaryUl>
            
//             {getFoodDiariesForClient(client._id).map((diary) => (
//               <DiaryLi 
//               key={diary._id}
//               onClick={() => handleGoToDiaryClick(client._id, diary._id)}
//               >
//                 Matdagbok (skapad {new Date(diary.createdAt).toLocaleDateString()})
//                 <HiChevronRight fontSize={'20px'} />
//               </DiaryLi>
//             ))}
//           </DiaryUl>
//           </div>

//         </ClientsLi>
//       ))}
//     </ClientsUl>
//   );
// };

import React from "react";
import { useClients } from "../contexts/ClientContext";
import { ClientsUl, ClientsLi, PenIconWrapper, ClientsDiv, H3, StyledDiv, DiaryUl, DiaryLi, H4 } from "./clientList.styled";
import { FaPenToSquare } from "react-icons/fa6";
import { P } from "../styles/global.styled";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { HiChevronRight } from "react-icons/hi";

export const ClientsList: React.FC = () => {
  const { clientsList, foodDiaries, fetchFoodDiaries } = useClients();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const initialDays = [
    {
      date: new Date().toISOString().split("T")[0],
      mealTypes: [
        { name: "Frukost", foods: [] },
        { name: "Lunch", foods: [] },
        { name: "Middag", foods: [] },
        { name: "Mellanmål 1", foods: [] },
      ],
    },
  ];

  const handlePenIconClick = async (clientId: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/foodDiary",
        { clientId, days: initialDays },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const diaryId = response.data._id;
      navigate(`/nutritrack/registerfoodintake/${clientId}/${diaryId}`);
    } catch (error) {
      console.error("Error creating food diary:", error);
    }
  };

  const getFoodDiariesForClient = (clientId: string) => {
    return foodDiaries.filter((diary) => diary.clientId._id === clientId);
  };

  const handleGoToDiaryClick = (clientId: string, diaryId: string) => {
    navigate(`/nutritrack/registerfoodintake/${clientId}/${diaryId}`);
  };

  useEffect(() => {
    fetchFoodDiaries();
  }, []);

  return (
    <ClientsUl>
      {clientsList.map((client) => {
        const clientDiaries = getFoodDiariesForClient(client._id);

        return (
          <ClientsLi key={client._id} style={{ color: "black" }}>
            <div>
              <H3>{client.firstName} {client.lastName}</H3>
              <StyledDiv>
                <ClientsDiv>
                  <P>{client.email} </P>
                  <P>{client.gender}</P>
                  <P>{client.ageYears !== null
                    ? `${client.ageYears} years`
                    : `${client.ageMonths} months`}</P>
                </ClientsDiv>
                <PenIconWrapper
                 onClick={() => handlePenIconClick(client._id)}
                >
                  <FaPenToSquare
                    fontSize={"26px"}
                  />
                  <P>Ny matdagbok</P>
                </PenIconWrapper>
              </StyledDiv>
            </div>
            <div>
              {clientDiaries.length > 0 && (
                <>
                  <H4>Klientens matdagböcker ({clientDiaries.length} st)</H4>
                  <DiaryUl>
                    {clientDiaries.map((diary) => (
                      <DiaryLi
                        key={diary._id}
                        onClick={() => handleGoToDiaryClick(client._id, diary._id)}
                      >
                        Matdagbok (skapad {new Date(diary.createdAt).toLocaleDateString()})
                        <HiChevronRight fontSize={'20px'} />
                      </DiaryLi>
                    ))}
                  </DiaryUl>
                </>
              )}
            </div>
          </ClientsLi>
        );
      })}
    </ClientsUl>
  );
};

