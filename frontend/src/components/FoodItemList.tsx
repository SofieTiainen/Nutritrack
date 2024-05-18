import React from "react";
import { useState } from "react";
import { useFood } from "../contexts/FoodContext";
import {FoodItem} from '../contexts/FoodContext'

export const FoodItemList: React.FC = () => {
  const { searchResults, addFoodToDiary } = useFood();
  const [selectedFoodItem, setSelectedFoodItem] = useState<FoodItem | null>(null);
  const [amount, setAmount] = useState<string>("");

  const handleFoodItemClick = (foodItem: FoodItem) => {
    setSelectedFoodItem(foodItem);
    setAmount("");
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleAddToDiary = () => {
    if (selectedFoodItem && amount) {
      addFoodToDiary(selectedFoodItem, amount);
      setSelectedFoodItem(null);
      setAmount("");
    }
  };


  return (
    <div>
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((food, index) => (
            <li
              key={index}
              style={{ color: "black" }}
              onClick={() => handleFoodItemClick(food)}
            >
              {food.namn}
            </li>
          ))}
        </ul>
      )}

      {selectedFoodItem && (
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ color: "black" }}>
            Selected Food: {selectedFoodItem.namn}
          </h3>
          <label htmlFor="amount" style={{ color: "black" }}>
            Enter amount (grams):{" "}
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
          />
          <p style={{ color: "black" }}>
            Preview: {selectedFoodItem.namn} - {amount} grams
          </p>
          <button onClick={handleAddToDiary}>Lägg till i matdagboken</button>
        </div>
      )}
    </div>
  );
};
