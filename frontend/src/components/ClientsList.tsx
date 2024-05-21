import React from "react";
import { useClients } from "../contexts/ClientContext";
import { ClientsUl, ClientsLi, PenIconWrapper } from "./clientList.styled";
import { FaPenToSquare } from "react-icons/fa6";
import { P } from "../styles/global.styled";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

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
    // navigate(`/nutritrack/registerfoodintake/${clientId}`);
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
      console.log("response", response)

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
      {clientsList.map((client) => (
        <ClientsLi key={client._id} style={{ color: "black" }}>
          <div>
            {client.firstName} {client.lastName} - {client.email} - id:{" "}
            {client._id} -{client.gender} -
            {client.ageYears !== null
              ? `${client.ageYears} years`
              : `${client.ageMonths} months`}
          </div>
          <PenIconWrapper>
            <FaPenToSquare
              fontSize={"26px"}
              onClick={() => handlePenIconClick(client._id)}
            />
            <P>Skapa ny matdagbok</P>
          </PenIconWrapper>
          <ul
            style={{
              backgroundColor: "lightgrey",
              marginTop: "10px",
              padding: "10px",
            }}
          >
            {getFoodDiariesForClient(client._id).map((diary) => (
              <li key={diary._id}>
                Matdagbok skapad:{" "}
                {new Date(diary.createdAt).toLocaleDateString()}
                <button
                onClick={() => handleGoToDiaryClick(client._id, diary._id)}
                >Gå till matdagbok</button>
              </li>
            ))}
          </ul>
        </ClientsLi>
      ))}
    </ClientsUl>
  );
};
