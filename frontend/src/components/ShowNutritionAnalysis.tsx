import { NutritionAnalysisWrapper, ClientInfoDiv, InfoDiv } from "./showNutritionAnalysis.styled";
import { CheckboxGroup } from "./CheckboxGroup";
import { useNutritionAnalysisContext } from "../contexts/NutritionAnalysisContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { H1 } from "../styles/global.styled";
import { Colors } from "../styles/colors";

const checkboxLabels: { [key: string]: string } = {
  checkbox1: "Total närings - Alla måltider ihopslagna",
  checkbox2: "Var dag för sig",
  checkbox3: "Varje måltid för sig",
  checkbox4: "Varje livsmedel för sig",
};

export const ShowNutritionAnalysis = () => {
  const { checkboxes, nutritionAnalysis, setNutritionAnalysis, fetchNutritionAnalysis, calculateTotalNutrients, calculateDailyNutrients, calculateMealNutrients, calculateFoodNutrients } = useNutritionAnalysisContext();
  const { analysisId } = useParams();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (analysisId && token) {
      fetchNutritionAnalysis(analysisId, token);
    }
  }, [analysisId, token]);

  const totalNutrients = calculateTotalNutrients();
  const dailyNutrients = calculateDailyNutrients();
  const mealNutrients = calculateMealNutrients();
  const foodNutrients = calculateFoodNutrients();

  return (
    <NutritionAnalysisWrapper>
      <H1 style={{ marginLeft: '15px' }} $color={Colors.Green600}>Näringsanalys</H1>
      <CheckboxGroup />
      <InfoDiv>
        <h2>Beräkning för:</h2>
        <ul>
          {Object.entries(checkboxes).map(([key, value]) => (
            value && <li key={key}>{checkboxLabels[key]}</li>
          ))}
        </ul>
        {nutritionAnalysis && (
          <div>
            <ClientInfoDiv>
              <h2>Klient:</h2>
              <p>Namn: {nutritionAnalysis.clientId.firstName} {nutritionAnalysis.clientId.lastName}</p>
              <p>Email: {nutritionAnalysis.clientId.email}</p>
            </ClientInfoDiv>
            {checkboxes.checkbox1 && (
              <>
                <h2>Totalt näringsinnehåll (Medelvärde per dag)</h2>
                <ul>
                  {Object.entries(totalNutrients).map(([key, { value, unit }]) => (
                    <li key={key}>{key}: {value.toFixed(2)} {unit}</li>
                  ))}
                </ul>
              </>
            )}
            {checkboxes.checkbox2 && (
              <>
                <h2>Näringsinnehåll per dag</h2>
                {dailyNutrients.map((dailyNutrient, dayIndex) => (
                  <div key={dayIndex}>
                    <h3>Dag {dayIndex + 1}</h3>
                    <ul>
                      {Object.entries(dailyNutrient).map(([key, { value, unit }]) => (
                        <li key={key}>{key}: {value.toFixed(2)} {unit}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </>
            )}
            {checkboxes.checkbox3 && (
              <>
                <h2>Näringsinnehåll per måltid</h2>
                {mealNutrients.map((dayMeals, dayIndex) => (
                  <div key={dayIndex}>
                    <h3>Dag {dayIndex + 1}</h3>
                    {dayMeals.map((meal, mealIndex) => (
                      <div key={mealIndex}>
                        <h4>{meal.mealName}</h4>
                        <ul>
                          {Object.entries(meal.nutrients).map(([key, { value, unit }]) => (
                            <li key={key}>{key}: {value.toFixed(2)} {unit}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
              </>
            )}
            {checkboxes.checkbox4 && (
              <>
                <h2>Näringsinnehåll per livsmedel</h2>
                {foodNutrients.map((dayFoods, dayIndex) => (
                  <div key={dayIndex}>
                    <h3>Dag {dayIndex + 1}</h3>
                    {dayFoods.map((mealFoods, mealIndex) => (
                      <div key={mealIndex}>
                        <h4>Måltid {mealIndex + 1}</h4>
                        {mealFoods.map((food, foodIndex) => (
                          <div key={foodIndex}>
                            <h5>{food.foodName} - {food.amount} gram</h5>
                            <ul>
                              {food?.nutrients?.map((nutrient, nutrientIndex) => (
                                <li key={nutrientIndex}>{nutrient.namn}: {nutrient.varde.toFixed(2)} {nutrient.enhet}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </InfoDiv>
    </NutritionAnalysisWrapper>
  );
};
