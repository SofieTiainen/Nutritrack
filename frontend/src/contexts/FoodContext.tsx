import axios from "axios";
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

export interface FoodItem {
    id: string;
    namn: string;
    nummer: number;
}

export interface DiaryEntry {
    food: FoodItem;
    amount: string;
}

export interface FoodContextProps {
    allFoodItems: FoodItem[];
    searchResults: FoodItem[];
    foodDiary: DiaryEntry[];
    isLoading: boolean;
    fetchFoodItems: () => void;
    setSearchTerm: (term: string) => void;
    addFoodToDiary: (foodItem: FoodItem, amount: string) => void;
}

const FoodContext = createContext<FoodContextProps | undefined>(undefined);

export const FoodProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [allFoodItems, setAllFoodItems] = useState<FoodItem[]>([]);
    const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
    const [foodDiary, setFoodDiary] = useState<DiaryEntry[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [hasFetched, setHasFetched] = useState(false); 


    const fetchFoodItems = async () => {
        if (hasFetched) return;
        setIsLoading(true);
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
            setHasFetched(true);

        } catch (error) {
            console.log("Error fetching livsmedel: ", error)
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if(searchTerm) {
            const terms = searchTerm.toLowerCase().split(" ");
            const results = allFoodItems.filter((food) => 
            terms.every((term) => food.namn.toLowerCase().includes(term)));
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    }, [searchTerm, allFoodItems]);

    const addFoodToDiary = (foodItem: FoodItem, amount: string) => {
        const newEntry: DiaryEntry = {
            food: foodItem, 
            amount,
        };
        setFoodDiary((prevDiary) => [...prevDiary, newEntry]);
    }

    return (
        <FoodContext.Provider
        value={{
            allFoodItems,
            searchResults,
            foodDiary,
            isLoading,
            fetchFoodItems,
            setSearchTerm,
            addFoodToDiary
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