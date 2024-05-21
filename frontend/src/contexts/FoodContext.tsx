import axios from "axios";
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

export interface FoodItem {
  id: string;
  namn: string;
  nummer: number;
}

export interface MealEntry {
  mealType: string;
  food: FoodItem;
  amount: string;
}

export interface Day {
  date: string;
  mealTypes: {
    name: string;
    foods: { item: FoodItem; amount: string }[];
  }[];
}

export interface DiaryEntry {
  date: string;
  entries: MealEntry[];
}


export interface FoodContextProps {
    allFoodItems: FoodItem[];
    days: Day[];
    hiddenDays: boolean[];
    activeMeal: { dayIndex: number; mealIndex: number; mealType: string } | null;
    editFood: { dayIndex: number; mealIndex: number; food: FoodItem; amount: string } | null;
    setDays: React.Dispatch<React.SetStateAction<Day[]>>;
    setHiddenDays: React.Dispatch<React.SetStateAction<boolean[]>>;
    setActiveMeal: React.Dispatch<React.SetStateAction<{ dayIndex: number; mealIndex: number; mealType: string } | null>>;
    setEditFood: React.Dispatch<React.SetStateAction<{ dayIndex: number; mealIndex: number; food: FoodItem; amount: string } | null>>;
    fetchFoodItems: () => void;
    addNewDay: () => void;
    handleToggleDay: (index: number) => void;
    handleAddFood: (dayIndex: number, mealIndex: number, food: FoodItem, amount: string) => void;
    handleEditFood: (dayIndex: number, mealIndex: number, food: FoodItem, amount: string) => void;
    handleRemoveFood: (dayIndex: number, mealIndex: number, foodIndex: number) => void;
    handleAddInBetweenMeal: (dayIndex: number) => void;
    handleSaveAsDraft: (clientId: string, diaryId: string, token: string) => Promise<void>;
    handleGoToNutritionalAnalysis: (clientId: string, diaryId: string, token: string, navigate: any) => Promise<void>;
    handleDeleteDiary: (diaryId: string, token: string, navigate: any) => Promise<void>;
  }

const FoodContext = createContext<FoodContextProps | undefined>(undefined);

export const FoodProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [allFoodItems, setAllFoodItems] = useState<FoodItem[]>([]);
  const [days, setDays] = useState<Day[]>([
    {
      date: new Date().toISOString().split("T")[0],
      mealTypes: [
        { name: "Frukost", foods: [] },
        { name: "Lunch", foods: [] },
        { name: "Middag", foods: [] },
        { name: "Mellanmål 1", foods: [] },
      ],
    },
  ]);
  const [hiddenDays, setHiddenDays] = useState<boolean[]>([false]);
  const [activeMeal, setActiveMeal] = useState<{ dayIndex: number; mealIndex: number; mealType: string } | null>(null);
  const [editFood, setEditFood] = useState<{ dayIndex: number; mealIndex: number; food: FoodItem; amount: string } | null>(null);

  useEffect(() => {
    console.log("hidden days", hiddenDays)
  }, [hiddenDays])

  const fetchFoodItems = async () => {
    let allResults: FoodItem[] = [];
    let offset = 0;
    const limit = 20;

    try {
      let hasMoreData = true;
      while (hasMoreData) {
        const response = await axios.get(
          "http://localhost:3000/food/livsmedel",
          {
            params: { offset, limit, sprak: 1 },
          }
        );

        const { livsmedel } = response.data;
        if (livsmedel.length > 0) {
          allResults = [...allResults, ...livsmedel];
          offset += limit;
        } else {
          hasMoreData = false;
        }
      }
      setAllFoodItems(allResults);

    } catch (error) {
      console.log("Error fetching livsmedel: ", error)
    }
  };

  const addNewDay = () => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + days.length);

    const newDay: Day = {
      date: newDate.toISOString().split("T")[0],
      mealTypes: [
        { name: "Frukost", foods: [] },
        { name: "Lunch", foods: [] },
        { name: "Middag", foods: [] },
        { name: "Mellanmål 1", foods: [] },
      ],
    };
    setDays([...days, newDay]);
    setHiddenDays([...hiddenDays, false]);
  };

  const handleToggleDay = (index: number) => {
    console.log("hej")
    setHiddenDays((prevHiddenDays) =>
      prevHiddenDays.map((hidden, i) => (i === index ? !hidden : hidden))
    );
  };

  const handleAddFood = (dayIndex: number, mealIndex: number, food: FoodItem, amount: string) => {
    setDays((prevDays) =>
      prevDays.map((day, i) => {
        if (i === dayIndex) {
          return {
            ...day,
            mealTypes: day.mealTypes.map((meal, j) => {
              if (j === mealIndex) {
                if (editFood && editFood.dayIndex === dayIndex && editFood.mealIndex === mealIndex) {
                  return {
                    ...meal,
                    foods: meal.foods.map((f) =>
                      f.item.namn === editFood.food.namn ? { item: food, amount } : f
                    ),
                  };
                } else {
                  return {
                    ...meal,
                    foods: [...meal.foods, { item: food, amount }]
                  };
                }
              }
              return meal;
            })
          };
        }
        return day;
      })
    );
    setEditFood(null);
  };

  const handleEditFood = (dayIndex: number, mealIndex: number, food: FoodItem, amount: string) => {
    setEditFood({ dayIndex, mealIndex, food, amount });
    setActiveMeal({ dayIndex, mealIndex, mealType: food.namn });
  };

  const handleRemoveFood = (dayIndex: number, mealIndex: number, foodIndex: number) => {
    setDays((prevDays) =>
      prevDays.map((day, i) =>
        i === dayIndex
          ? {
            ...day,
            mealTypes: day.mealTypes.map((meal, j) =>
              j === mealIndex
                ? {
                  ...meal,
                  foods: meal.foods.filter((_, k) => k !== foodIndex),
                }
                : meal
            ),
          }
          : day
      )
    );
  };

  const handleAddInBetweenMeal = (dayIndex: number) => {
    setDays((prevDays) =>
      prevDays.map((d, i) => {
        if (i === dayIndex) {
          const inBetweenMealCount = d.mealTypes.filter((meal) =>
            meal.name.startsWith("Mellanmål")
          ).length;
          const newMeal = {
            name: `Mellanmål ${inBetweenMealCount + 1}`,
            foods: [],
          };
          return { ...d, mealTypes: [...d.mealTypes, newMeal] };
        }
        return d;
      })
    );
  };

  //put
const handleSaveAsDraft = async (clientId: string, diaryId: string, token: string) => {
    try {
      const url = `http://localhost:3000/api/foodDiary/${diaryId}`;
      const response = await axios.put(url, { clientId, days }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Matdagbok sparad");
      console.log("responsen: ", response);
    } catch (error) {
      console.error("Error saving food diary:", error);
    }
  };


const handleDeleteDiary = async (diaryId: string, token: string, navigate: any) => {
    try {
      await axios.delete(`http://localhost:3000/api/foodDiary/${diaryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Matdagbok raderad");
      navigate('/nutritrack/dashboard');
    } catch (error) {
      console.error("Error deleting food diary:", error);
    }
  };


const handleGoToNutritionalAnalysis = async (clientId: string, diaryId: string, token: string, navigate: any) => {
    const hasValidDays = days.some(day =>
      day.mealTypes.some(meal => meal.foods.length > 0)
    );

    if (!hasValidDays) {
      alert("Matdagboken måste innehålla minst ett livsmedel innan näringsberäkningen kan göras.");
      return;
    }

    try {
      const analysisResponse = await axios.post(
        "http://localhost:3000/api/nutritionanalysis",
        { clientId, days },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (analysisResponse.status === 201) {
        const analysisId = analysisResponse.data._id;

        if (diaryId) {
          await axios.delete(`http://localhost:3000/api/foodDiary/${diaryId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          alert("Matdagbok raderad");
        }

        navigate(`/nutritrack/nutritionanalysis/${clientId}/${analysisId}`);
      }
    } catch (error) {
      console.error("Error creating nutrition analysis:", error);
    }
  };

  return (
    <FoodContext.Provider
      value={{
        allFoodItems,
        days,
        hiddenDays,
        activeMeal,
        editFood,
        setDays,
        setHiddenDays,
        setActiveMeal,
        setEditFood,
        fetchFoodItems,
        addNewDay,
        handleToggleDay,
        handleAddFood,
        handleEditFood,
        handleRemoveFood,
        handleAddInBetweenMeal,
        handleSaveAsDraft,
        handleGoToNutritionalAnalysis,
        handleDeleteDiary,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => {
  const context = useContext(FoodContext);
  if (context === undefined) {
    throw new Error("useFood must be used within a FoodProvider");
  }
  return context;
};


