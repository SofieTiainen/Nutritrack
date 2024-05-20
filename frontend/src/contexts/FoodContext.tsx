import axios from "axios";
import React, { createContext, useState, useContext, ReactNode, useEffect, } from "react";

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

export interface DiaryEntry {
    date: string;
    entries: MealEntry[];
}


export interface FoodContextProps {
    fetchFoodItems: () => void;
    allFoodItems: FoodItem[];
}

const FoodContext = createContext<FoodContextProps | undefined>(undefined);

export const FoodProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [allFoodItems, setAllFoodItems] = useState<FoodItem[]>([]);


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
                if(livsmedel.length > 0) {
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

    useEffect(() => {
        fetchFoodItems();
    }, [])


    return (
        <FoodContext.Provider
        value={{
            allFoodItems,
            fetchFoodItems,
        }}
        >
            {children}
        </FoodContext.Provider>
    );
};

export const useFood = () => {
    const context = useContext(FoodContext);
    if(context === undefined) {
        throw new Error("useFood must be used within a FoodProvider")
    }
    return context;
}