// import { NutritionAnalysisWrapper, ClientInfoDiv } from "./showNutritionAnalysis.styled";
// import { CheckboxGroup } from "./CheckboxGroup";
// import { useNutritionAnalysisContext } from "../contexts/NutritionAnalysisContext";
// import { useParams } from "react-router-dom";
// import { useEffect } from "react";
// import axios from "axios";
// import { P } from "../styles/global.styled";
// import { NutrientValues } from "../contexts/NutritionAnalysisContext";

// const checkboxLabels: { [key: string]: string } = {
//   checkbox1: "Total närings - Alla måltider ihopslagna",
//   checkbox2: "Var dag för sig",
//   checkbox3: "Varje måltid för sig",
//   checkbox4: "Varje livsmedel för sig",
// };

// export const ShowNutritionAnalysis = () => {
//   const { checkboxes, nutritionAnalysis, setNutritionAnalysis, fetchNutrientValues } = useNutritionAnalysisContext();
//   const { analysisId } = useParams();
//   const token = sessionStorage.getItem("token");

//   const fetchNutritionAnalysis = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3000/api/nutritionanalysis/${analysisId}`, 
//           {
//               headers: {
//                   Authorization: `Bearer ${token}`,
//               },
//           }
//       );

//       const analysisData = response.data;

//       for (const day of analysisData.days) {
//         for (const meal of day.mealTypes) {
//           for (const food of meal.foods) {
//             const nutrientValues = await fetchNutrientValues(food.item.nummer);
//             food.nutrients = nutrientValues;
//           }
//         }
//       }

//       setNutritionAnalysis(analysisData);
//     } catch (error) {
//       console.error('Error fetching nutrition analysis data:', error);
//     }
//   };

//   const calculateTotalNutrients = () => {
//     if (!nutritionAnalysis) return {};

//     const totalNutrients: NutrientValues = {};

//     for (const day of nutritionAnalysis.days) {
//       for (const meal of day.mealTypes) {
//         for (const food of meal.foods) {
//           if (food.nutrients) {
//             const amountFactor = parseFloat(food.amount) / 100;

//             if (isNaN(amountFactor)) {
//               console.warn(`Invalid amount for food ${food.item.namn}: ${food.amount}`);
//               continue;
//             }

//             for (const nutrient of food.nutrients) {
//               const nutrientValue = nutrient.varde;
//               if (isNaN(nutrientValue)) {
//                 console.warn(`Invalid nutrient value for ${nutrient.namn} in food ${food.item.namn}: ${nutrient.varde}`);
//                 continue;
//               }

//               const adjustedNutrientValue = nutrientValue * amountFactor;

//               if (totalNutrients[nutrient.namn]) {
//                 totalNutrients[nutrient.namn].value += adjustedNutrientValue;
//               } else {
//                 totalNutrients[nutrient.namn] = {
//                   value: adjustedNutrientValue,
//                   unit: nutrient.enhet
//                 };
//               }
//             }
//           }
//         }
//       }
//     }

//     return totalNutrients;
//   };

//   const totalNutrients = calculateTotalNutrients();

//   useEffect(() => {
//     if(analysisId) {
//     fetchNutritionAnalysis();
//     }
//   }, [analysisId]);

//   return (
//     <NutritionAnalysisWrapper>
//       <h1 style={{ color: 'black' }}>Nutritionsberäkning</h1>
//       <CheckboxGroup />
//       <div>
//         <h2>Beräkning för:</h2>
//         <ul>
//           {Object.entries(checkboxes).map(([key, value]) => (
//             value && <li key={key}>{checkboxLabels[key]}</li>
//           ))}
//         </ul>
//         {nutritionAnalysis && (
//           <div>
//             <ClientInfoDiv>
//               <h2>Klient:</h2>
//               <p>Namn: {nutritionAnalysis.clientId.firstName} {nutritionAnalysis.clientId.lastName}</p>
//               <p>Email: {nutritionAnalysis.clientId.email}</p>
//             </ClientInfoDiv>
//             <h2>Dagar</h2>
//             {nutritionAnalysis.days.map((day, dayIndex) => (
//               <div key={dayIndex}>
//                 <h3>Datum: {day.date}</h3>
//                 {day.mealTypes.map((meal, mealIndex) => (
//                   <div key={mealIndex}>
//                     <h4>{meal.name}</h4>
//                     {meal.foods.length > 0 ? (
//                       <ul>
//                         {meal.foods.map((food, foodIndex) => (
//                           <li key={foodIndex}>
//                             {food.item.namn} - {food.amount} gram
//                           </li>
//                         ))}
//                       </ul>
//                     ) : (
//                       <P>Inga livsmedel</P>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             ))}
//             <h2>Totalt näringsinnehåll</h2>
//             <ul>
//               {Object.entries(totalNutrients).map(([key, { value, unit }]) => (
//                 <li key={key}>{key}: {value.toFixed(2)} {unit}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </NutritionAnalysisWrapper>
//   );
// };

import { NutritionAnalysisWrapper, ClientInfoDiv } from "./showNutritionAnalysis.styled";
import { CheckboxGroup } from "./CheckboxGroup";
import { useNutritionAnalysisContext } from "../contexts/NutritionAnalysisContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { P } from "../styles/global.styled";
import { NutrientValues } from "../contexts/NutritionAnalysisContext";

const checkboxLabels: { [key: string]: string } = {
  checkbox1: "Total närings - Alla måltider ihopslagna",
  checkbox2: "Var dag för sig",
  checkbox3: "Varje måltid för sig",
  checkbox4: "Varje livsmedel för sig",
};

export const ShowNutritionAnalysis = () => {
  const { checkboxes, nutritionAnalysis, setNutritionAnalysis, fetchNutrientValues } = useNutritionAnalysisContext();
  const { analysisId } = useParams();
  const token = sessionStorage.getItem("token");

  const fetchNutritionAnalysis = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/nutritionanalysis/${analysisId}`, 
          {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          }
      );

      const analysisData = response.data;

      for (const day of analysisData.days) {
        for (const meal of day.mealTypes) {
          for (const food of meal.foods) {
            const nutrientValues = await fetchNutrientValues(food.item.nummer);
            food.nutrients = nutrientValues;
          }
        }
      }

      setNutritionAnalysis(analysisData);
    } catch (error) {
      console.error('Error fetching nutrition analysis data:', error);
    }
  };

  const calculateTotalNutrients = () => {
    if (!nutritionAnalysis) return {};

    const totalNutrients: NutrientValues = {};
    let dayCount = 0;

    for (const day of nutritionAnalysis.days) {
      dayCount++;
      for (const meal of day.mealTypes) {
        for (const food of meal.foods) {
          if (food.nutrients) {
            const amountFactor = parseFloat(food.amount) / 100;

            if (isNaN(amountFactor)) {
              console.warn(`Invalid amount for food ${food.item.namn}: ${food.amount}`);
              continue;
            }

            for (const nutrient of food.nutrients) {
              const nutrientValue = nutrient.varde;
              if (isNaN(nutrientValue)) {
                console.warn(`Invalid nutrient value for ${nutrient.namn} in food ${food.item.namn}: ${nutrient.varde}`);
                continue;
              }

              const adjustedNutrientValue = nutrientValue * amountFactor;

              if (totalNutrients[nutrient.namn]) {
                totalNutrients[nutrient.namn].value += adjustedNutrientValue;
              } else {
                totalNutrients[nutrient.namn] = {
                  value: adjustedNutrientValue,
                  unit: nutrient.enhet
                };
              }
            }
          }
        }
      }
    }

    // Calculate average per day
    for (const nutrientName in totalNutrients) {
      totalNutrients[nutrientName].value /= dayCount;
    }

    return totalNutrients;
  };

  const calculateDailyNutrients = () => {
    if (!nutritionAnalysis) return [];

    return nutritionAnalysis.days.map(day => {
      const dailyNutrients: NutrientValues = {};

      for (const meal of day.mealTypes) {
        for (const food of meal.foods) {
          if (food.nutrients) {
            const amountFactor = parseFloat(food.amount) / 100;

            if (isNaN(amountFactor)) {
              console.warn(`Invalid amount for food ${food.item.namn}: ${food.amount}`);
              continue;
            }

            for (const nutrient of food.nutrients) {
              const nutrientValue = nutrient.varde;
              if (isNaN(nutrientValue)) {
                console.warn(`Invalid nutrient value for ${nutrient.namn} in food ${food.item.namn}: ${nutrient.varde}`);
                continue;
              }

              const adjustedNutrientValue = nutrientValue * amountFactor;

              if (dailyNutrients[nutrient.namn]) {
                dailyNutrients[nutrient.namn].value += adjustedNutrientValue;
              } else {
                dailyNutrients[nutrient.namn] = {
                  value: adjustedNutrientValue,
                  unit: nutrient.enhet
                };
              }
            }
          }
        }
      }

      return dailyNutrients;
    });
  };

  const calculateMealNutrients = () => {
    if (!nutritionAnalysis) return [];

    return nutritionAnalysis.days.map(day =>
      day.mealTypes.map(meal => {
        const mealNutrients: NutrientValues = {};

        for (const food of meal.foods) {
          if (food.nutrients) {
            const amountFactor = parseFloat(food.amount) / 100;

            if (isNaN(amountFactor)) {
              console.warn(`Invalid amount for food ${food.item.namn}: ${food.amount}`);
              continue;
            }

            for (const nutrient of food.nutrients) {
              const nutrientValue = nutrient.varde;
              if (isNaN(nutrientValue)) {
                console.warn(`Invalid nutrient value for ${nutrient.namn} in food ${food.item.namn}: ${nutrient.varde}`);
                continue;
              }

              const adjustedNutrientValue = nutrientValue * amountFactor;

              if (mealNutrients[nutrient.namn]) {
                mealNutrients[nutrient.namn].value += adjustedNutrientValue;
              } else {
                mealNutrients[nutrient.namn] = {
                  value: adjustedNutrientValue,
                  unit: nutrient.enhet
                };
              }
            }
          }
        }

        return { mealName: meal.name, nutrients: mealNutrients };
      })
    );
  };

  const calculateFoodNutrients = () => {
    if (!nutritionAnalysis) return [];

    return nutritionAnalysis.days.map(day =>
      day.mealTypes.map(meal =>
        meal.foods.map(food => ({
          foodName: food.item.namn,
          amount: food.amount,
          nutrients: food.nutrients
        }))
      )
    );
  };

  const totalNutrients = calculateTotalNutrients();
  const dailyNutrients = calculateDailyNutrients();
  const mealNutrients = calculateMealNutrients();
  const foodNutrients = calculateFoodNutrients();

  useEffect(() => {
    if(analysisId) {
    fetchNutritionAnalysis();
    }
  }, [analysisId]);

  return (
    <NutritionAnalysisWrapper>
      <h1 style={{ color: 'black' }}>Nutritionsberäkning</h1>
      <CheckboxGroup />
      <div>
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
      </div>
    </NutritionAnalysisWrapper>
  );
};
