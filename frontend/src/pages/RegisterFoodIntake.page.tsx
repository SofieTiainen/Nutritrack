import { RegisterIntakeWrapper } from "./registerfoodIntake.styled";
import { H1 } from "../styles/global.styled";
import { Colors } from "../styles/colors";
import { useParams } from "react-router-dom";
import { useClients } from "../contexts/ClientContext";
import { FoodDiary } from "../components/FoodDiary";
import { useFood } from "../contexts/FoodContext";
import { useEffect } from "react";


export const RegisterFoodIntakePage = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const { getClientById } = useClients();
  const client = clientId ? getClientById(clientId) : undefined;
  const {fetchFoodItems} = useFood();

  useEffect(() => {
    fetchFoodItems();
  }, [])


  return (
    <RegisterIntakeWrapper>
      <H1 $color={Colors.Green600}>
        Register food for {client?.firstName} {client?.lastName}
      </H1>
      <FoodDiary />
    </RegisterIntakeWrapper>
);
};