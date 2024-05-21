import React, { createContext, useContext, useState, ReactNode } from "react";
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

interface NutritionAnalysis {
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
}

const NutritionAnalysisContext = createContext<
  NutritionAnalysisContextType | undefined
>(undefined);

export const NutritionAnalysisProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [checkboxes, setCheckboxes] = useState<CheckboxesState>({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
  });

  const [nutritionAnalysis, setNutritionAnalysis] = useState<NutritionAnalysis | null>(null);

  const fetchNutrientValues = async (foodNumber: number) => {
    try {
      const response = await axios.get(`http://localhost:3000/food/livsmedel/${foodNumber}/naringsvarden`);
      return response.data
    } catch (error) {
      console.error('Error fetching nutrient values:', error);
      return {};
    }
  };

  return (
    <NutritionAnalysisContext.Provider value={{ checkboxes, setCheckboxes, nutritionAnalysis, setNutritionAnalysis, fetchNutrientValues }}>
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
