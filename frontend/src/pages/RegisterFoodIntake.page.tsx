import { RegisterIntakeWrapper } from "./registerfoodIntake.styled";
import { H1 } from "../styles/global.styled";
import { Colors } from "../styles/colors";
import { useParams } from "react-router-dom";
import { useClients } from "../contexts/ClientContext";
import { SearchField } from "../components/SearchField";
import { FoodDiary } from "../components/FoodDiary";
import { FoodItemList } from "../components/FoodItemList";
import { FlexDiv } from "../styles/global.styled";

export const RegisterFoodIntakePage = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const { getClientById } = useClients();
  const client = clientId ? getClientById(clientId) : undefined;

  return (
    <RegisterIntakeWrapper>
      <H1 $color={Colors.Green600}>
        Register food for {client?.firstName} {client?.lastName}
      </H1>

      <FlexDiv $gap="200px">
        <div>
          <h4 style={{ color: "black" }}>Välj datum</h4>
          <label htmlFor="foodSearch" style={{ color: "black", margin: "0px" }}>
            Search for food
          </label>
          <SearchField />
          <FoodItemList />
        </div>

        <div>
          <FoodDiary />
        </div>
      </FlexDiv>
    </RegisterIntakeWrapper>
  );
};
