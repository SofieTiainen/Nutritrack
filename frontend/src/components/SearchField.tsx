import { IoSearchOutline } from "react-icons/io5";
import { StyledSearchField, SearchDiv } from "./searchField.styled";
import { useState, useEffect } from "react";
import { useFood, FoodItem } from "../contexts/FoodContext";

interface SearchFieldProps {
  dayIndex: number;
  mealIndex: number;
  onAddFood: (dayIndex: number, mealIndex: number, food: FoodItem, amount:string) => void;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  dayIndex,
  mealIndex,
  onAddFood,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [amount, setAmount] = useState("");
  const { allFoodItems } = useFood();

  useEffect(() => {
    if (searchTerm.length >= 3) {
      const terms = searchTerm.toLowerCase().split(" ");
      const results = allFoodItems.filter((food) =>
        terms.every((term) => food.namn.toLowerCase().includes(term))
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, allFoodItems]);

  const handleSelectFood = (food: FoodItem) => {
    setSelectedFood(food);
    setSearchTerm("");
    setSearchResults([]);
  }

  const handleAddFood = () => {
    if(selectedFood && amount) {
        onAddFood(dayIndex, mealIndex, selectedFood, amount);
        setSelectedFood(null)
        setAmount("")

    }

  };

  return (
    <SearchDiv>
      <StyledSearchField
        type="text"
        id="foodSearch"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Sök efter livsmedel"
      />
      <IoSearchOutline
        color="black"
        style={{ position: "absolute", left: "10px" }}
      />
      <ul>
        {searchResults.length > 0 && (
          <>
            <ul>
                {searchResults.map((food, index) => (
                    <li key={index} style={{color:'black'}} onClick={() => handleSelectFood(food)}>
                        {food.namn} - {food.nummer}
                    </li>
                ))}
            </ul>
          </>
        )}
      </ul>
      {selectedFood && (
        <div>
          <p>
            {selectedFood.namn} - {selectedFood.nummer}
          </p>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Ange mängd i gram"
          />
          <button onClick={handleAddFood}>Lägg till i matdagbok</button>
        </div>
      )}
    </SearchDiv>
  );
};
