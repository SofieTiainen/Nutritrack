import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";

interface Client {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  ageYears: number | null;
  ageMonths: number | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface FoodItem {
  _id: string;
  namn: string;
  nummer: number;
}
interface Nutrient {
  namn: string;
  euroFIRkod: string;
  forkortning: string;
  varde: number;
  enhet: string;
  viktGram: number;
  [key: string]: any;
}

export interface NutrientValues {
  [key: string]: {
    value: number;
    unit: string;
  };
}

interface MealType {
  name: string;
  foods: Array<{
    item: FoodItem;
    amount: string;
    nutrients?: Nutrient[];
  }>;
  _id: string;
}

interface Day {
  date: string;
  mealTypes: MealType[];
}

export interface NutritionAnalysis {
  _id: string;
  clientId: Client;
  days: Day[];
  createdAt: string;
  updatedAt: string;
}

interface CheckboxesState {
  checkbox1: boolean;
  checkbox2: boolean;
  checkbox3: boolean;
  checkbox4: boolean;
}

interface NutritionAnalysisContextType {
  checkboxes: CheckboxesState;
  setCheckboxes: React.Dispatch<React.SetStateAction<CheckboxesState>>;
  nutritionAnalysis: NutritionAnalysis | null;
  setNutritionAnalysis: React.Dispatch<React.SetStateAction<NutritionAnalysis | null>>;
  fetchNutrientValues: (foodNumber: number) => Promise<NutrientValues>;
  fetchNutritionAnalysis: (analysisId: string, token: string) => Promise<void>;
  calculateTotalNutrients: () => NutrientValues;
  calculateDailyNutrients: () => NutrientValues[];
  calculateMealNutrients: () => { mealName: string; nutrients: NutrientValues }[][];
  calculateFoodNutrients: () => { foodName: string; amount: string; nutrients?: Nutrient[] }[][][];
  fetchNutritionAnalysesForClient: (clientId: string, token: string) => Promise<void>;
  clientsNutritionAnalysis: NutritionAnalysis[] | null;
}

const NutritionAnalysisContext = createContext<NutritionAnalysisContextType | undefined>(undefined);

export const NutritionAnalysisProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [checkboxes, setCheckboxes] = useState<CheckboxesState>({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
  });

  const [nutritionAnalysis, setNutritionAnalysis] = useState<NutritionAnalysis | null>(null);
  const [clientsNutritionAnalysis, setClientsNutritionAnalysis] = useState<NutritionAnalysis[] | null>(null);

  const fetchNutrientValues = async (foodNumber: number) => {
    try {
      const response = await axios.get(`http://localhost:3000/food/livsmedel/${foodNumber}/naringsvarden`);
      return response.data;
    } catch (error) {
      console.error('Error fetching nutrient values:', error);
      return {};
    }
  };

  const fetchNutritionAnalysis = async (analysisId: string, token: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/nutritionanalysis/${analysisId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
  
  const fetchNutritionAnalysesForClient = async (clientId: string, token: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/nutritionanalysis/client/${clientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const analysesData = response.data;
      setClientsNutritionAnalysis(analysesData);
    } catch (error) {
      console.error('Error fetching nutrition analyses for client:', error);
    }
  };


  return (
    <NutritionAnalysisContext.Provider
      value={{
        checkboxes,
        setCheckboxes,
        nutritionAnalysis,
        setNutritionAnalysis,
        fetchNutrientValues,
        fetchNutritionAnalysis,
        calculateTotalNutrients,
        calculateDailyNutrients,
        calculateMealNutrients,
        calculateFoodNutrients,
        fetchNutritionAnalysesForClient,
        clientsNutritionAnalysis
      }}
    >
      {children}
    </NutritionAnalysisContext.Provider>
  );
};

export const useNutritionAnalysisContext = () => {
  const context = useContext(NutritionAnalysisContext);
  if (context === undefined) {
    throw new Error(
      "useNutritionAnalysisContext must be used within a NutritionAnalysisProvider"
    );
  }
  return context;
};

