import {
  RegisterIntakeWrapper,
  StyledSearchField,
  SearchBtn,
  SearchDiv,
} from "./registerfoodIntake.styled";
import { H1 } from "../styles/global.styled";
import { Colors } from "../styles/colors";
import { useParams } from "react-router-dom";
import { useClients } from "../contexts/ClientContext";
import { IoSearchOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import axios from "axios";

interface FoodItem {
  id: string;
  namn: string;
  nummer: number;
}

interface DiaryEntry {
    food: FoodItem;
    amount: string;
}

export const RegisterFoodIntakePage = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const { getClientById } = useClients();
  const client = clientId ? getClientById(clientId) : undefined;

  const [allFoodItems, setAllFoodItems] = useState<FoodItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFoodItem, setSelectedFoodItem] = useState<FoodItem | null>(
    null
  );
  const [amount, setAmount] = useState<string>("");
  const [foodDiary, setFoodDiary] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchFoodItems = async () => {
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
          if (livsmedel.length > 0) {
            allResults = [...allResults, ...livsmedel];
            offset += limit;
          } else {
            hasMoreData = false;
          }
        }

        setAllFoodItems(allResults);
      } catch (error) {
        console.log("error fetching livsmedel: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFoodItems();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const terms = searchTerm.toLowerCase().split(" ");
      const results = allFoodItems.filter((food) =>
        terms.every((term) => food.namn.toLowerCase().includes(term))
      );
      console.log(results);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, allFoodItems]);

  const handleFoodItemClick = async (foodItem: FoodItem) => {
    setSelectedFoodItem(foodItem);
    setAmount("");
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const addToDFoodDiary = () => {
    if(selectedFoodItem && amount) {
        const newEntry: DiaryEntry = {
            food: selectedFoodItem,
            amount,
        };
        setFoodDiary((prevDiary) => [...prevDiary, newEntry]);
        setSelectedFoodItem(null);
        setAmount("");

    }

  }

  return (
    <RegisterIntakeWrapper>
      <H1 $color={Colors.Green600}>
        Register food for {client?.firstName} {client?.lastName}
      </H1>
      <label htmlFor="foodSearch" style={{ color: "black", margin: "0px" }}>
        Search for food
      </label>

      <SearchDiv>
        <StyledSearchField
          type="text"
          id="foodSearch"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IoSearchOutline
          color="black"
          style={{ position: "absolute", left: "10px" }}
        />
        {/* <SearchBtn onClick={handleSearch} >Search</SearchBtn> */}
      </SearchDiv>

      {isLoading ? <p style={{ color: "black" }}>Loading...</p> : null}

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
      </div>

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
          <button onClick={addToDFoodDiary}>Lägg till i matdagboken</button>
        </div>
      )}
            <div>
        <h2 style={{ color: "black" }}>Matdagbok</h2>
        {foodDiary.length > 0 ? (
          <ul>
            {foodDiary.map((entry, index) => (
              <li key={index} style={{ color: "black" }}>
                {entry.food.namn} - {entry.amount} grams (Nummer: {entry.food.nummer})
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: "black" }}>No entries in the diary.</p>
        )}
      </div>
    </RegisterIntakeWrapper>
  );
};
