import { IoSearchOutline } from "react-icons/io5";
import { StyledSearchField, SearchDiv, SearchUl, SearchLi, FoodInput, SelectedFoodWrapper, InputAndBtnWrapper } from "./searchField.styled";
import { P, Button } from "../styles/global.styled";
import { useState, useEffect } from "react";
import { useFood, FoodItem } from "../contexts/FoodContext";
import { Colors } from "../styles/colors";

interface SearchFieldProps {
  dayIndex: number;
  mealIndex: number;
  onAddFood: (dayIndex: number, mealIndex: number, food: FoodItem, amount:string) => void;
  editFood: {dayIndex: number, mealIndex: number, food: FoodItem, amount: string} | null;
  setEditFood: (editFood: {dayIndex: number, mealIndex: number, food: FoodItem, amount: string} | null) => void;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  dayIndex,
  mealIndex,
  onAddFood,
  editFood,
  setEditFood
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [amount, setAmount] = useState("");
  const { allFoodItems } = useFood();

  useEffect(() => {
    if (editFood) {
      setSelectedFood(editFood.food);
      setAmount(editFood.amount);
    }
  }, [editFood]);

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
        setEditFood(null);

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
        style={{ position: "absolute", left: "500px", top: '10px' }}
      />
      <SearchDiv>
        {searchResults.length > 0 && (
          <>
            <SearchUl>
                {searchResults.map((food, index) => (
                    <SearchLi key={index} style={{color:'black'}} onClick={() => handleSelectFood(food)}>
                        {food.namn} - {food.nummer}
                    </SearchLi>
                ))}
            </SearchUl>
          </>
        )}
      </SearchDiv>
      {selectedFood && (
        <SelectedFoodWrapper>
          <P style={{margin: '0px'}}>
            {selectedFood.namn} - {selectedFood.nummer}
          </P>
          <InputAndBtnWrapper>
          <FoodInput
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Ange mängd i gram"
          />
          <Button $backgroundImageC1={Colors.MintGreen400} $backgroundImageC2={Colors.MintGreen500} onClick={handleAddFood}>{editFood ? "Uppdatera livsmedel" : "Lägg till"}</Button>
          </InputAndBtnWrapper>
        </SelectedFoodWrapper>
      )}
    </SearchDiv>
  );
};
