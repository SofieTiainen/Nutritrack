import { useState, useEffect } from "react";
import {
  Wrapper,
  FoodJournalDiv,
  OneDayDiv,
  FoodJournalWrapper,
  AddNewDayDiv,
  DateAndIconWrapper,
  MealsDiv,
  ArrowDiv,
  TrashCanDiv,
  SearchBarWrapper,
} from "./foodDiary.styled";
import { P, H3 } from "../styles/global.styled";
import { IoIosArrowDown } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import { LuPlusSquare } from "react-icons/lu";
import { SearchField } from "./SearchField";
import { FoodItem } from "../contexts/FoodContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

interface Day {
  date: string;
  mealTypes: {
    name: string;
    foods: { item: FoodItem; amount: string }[];
  }[];
}

interface FoodDiary {
  _id: string;
  clientId: string;
  days: Day[];
}

export const FoodDiary: React.FC = () => {
  const navigate = useNavigate();
  const { clientId, diaryId } = useParams<{
    clientId: string;
    diaryId?: string;
  }>();
  const token = sessionStorage.getItem("token");
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
  const [activeMeal, setActiveMeal] = useState<{
    dayIndex: number;
    mealIndex: number;
    mealType: string;
  } | null>(null);

  const [editFood, setEditFood] = useState<{
    dayIndex: number;
    mealIndex: number;
    food: FoodItem;
    amount: string;
  } | null>(null);

  useEffect(() => {
    if (diaryId) {
      const fetchDiary = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/foodDiary/${clientId}/${diaryId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setDays(response.data.days);
        } catch (error) {
          console.error("Error fetching diary:", error);
        }
      };
      fetchDiary();
    }
  }, [diaryId, clientId, token]);

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
    setHiddenDays((prevHiddenDays) =>
      prevHiddenDays.map((hidden, i) => (i === index ? !hidden : hidden))
    );
  };

  const handleDeleteDay = (index: number) => {
    setDays((prevDays) => prevDays.filter((_, i) => i !== index));
    setHiddenDays((prevHiddenDays) =>
      prevHiddenDays.filter((_, i) => i !== index)
    );
  };

  const handleMealClick = (
    dayIndex: number,
    mealIndex: number,
    mealType: string
  ) => {
    if (
      activeMeal?.dayIndex === dayIndex &&
      activeMeal?.mealIndex === mealIndex &&
      activeMeal?.mealType === mealType
    ) {
      setActiveMeal(null);
    } else {
      setActiveMeal({ dayIndex, mealIndex, mealType });
    }
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

  const handleAddFood = (
    dayIndex: number,
    mealIndex: number,
    food: FoodItem,
    amount: string
  ) => {
    setDays((prevDays) =>
      prevDays.map((day, i) => {
        if (i === dayIndex) {
          return {
            ...day,
            mealTypes: day.mealTypes.map((meal, j) => {
              if (j === mealIndex) {
                if (
                  editFood &&
                  editFood.dayIndex === dayIndex &&
                  editFood.mealIndex === mealIndex
                ) {
                  return {
                    ...meal,
                    foods: meal.foods.map((f) =>
                      f.item.namn === editFood.food.namn
                        ? { item: food, amount }
                        : f
                    ),
                  };
                } else {
                  return {
                    ...meal,
                    foods: [...meal.foods, { item: food, amount }],
                  };
                }
              } else {
                return meal;
              }
            }),
          };
        } else {
          return day;
        }
      })
    );
  };

  const handleSaveAsDraft = async () => {
    if (clientId) {
      try {
        const url = diaryId
          ? `http://localhost:3000/api/foodDiary/${diaryId}`
          : "http://localhost:3000/api/foodDiary";
        const method = diaryId ? "put" : "post";
        const response = await axios({
          method,
          url,
          data: { clientId, days },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Matdagbok sparad");
        console.log("responsen: ", response);
      } catch (error) {
        console.error("Error saving food diary:", error);
      }
    } else {
      console.log("No clientID found");
    }
  };

  const handleEditFood = (
    dayIndex: number,
    mealIndex: number,
    food: FoodItem,
    amount: string
  ) => {
    setEditFood({ dayIndex, mealIndex, food, amount });
    setActiveMeal({ dayIndex, mealIndex, mealType: food.namn });
  };

  const handleRemoveFood = (
    dayIndex: number,
    mealIndex: number,
    foodIndex: number
  ) => {
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

  const handleDeleteDiary = async () => {
    console.log("Diaryid", diaryId)
    if (diaryId) {
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
    } else {
      console.log("No diaryID found");
    }
  };

  return (
    <Wrapper>
      <SearchBarWrapper>
        {activeMeal && (
          <>
            <P>
              Sök på livsmedel för {activeMeal?.mealType} - Dag:{" "}
              {days[activeMeal.dayIndex].date}
            </P>
            <SearchField
              dayIndex={activeMeal.dayIndex}
              mealIndex={activeMeal.mealIndex}
              onAddFood={handleAddFood}
              editFood={editFood}
              setEditFood={setEditFood}
            />
          </>
        )}
      </SearchBarWrapper>

      <FoodJournalWrapper>
        <div>
          <H3 style={{ textAlign: "center" }}>Matdagboken</H3>
          <div>
            <button onClick={handleSaveAsDraft}>Spara som utkast</button>
            {diaryId && <button
            onClick={handleDeleteDiary}
            >Ta bort hela matdagboken</button>}
          </div>
        </div>

        {days.map((day, dayIndex) => (
          <FoodJournalDiv key={dayIndex}>
            <DateAndIconWrapper>
              <h4 style={{ color: "black", margin: "10px" }}>
                Dag - {day.date}
              </h4>
              <div>
                <IoIosArrowDown
                  color="black"
                  style={{ marginTop: "10px" }}
                  onClick={() => handleToggleDay(dayIndex)}
                />
              </div>
            </DateAndIconWrapper>
            {!hiddenDays[dayIndex] && (
              <OneDayDiv>
                <div>
                  <label
                    htmlFor={`date-${dayIndex}`}
                    style={{ color: "black" }}
                  >
                    Datum:
                  </label>
                  <input
                    type="date"
                    id={`date-${dayIndex}`}
                    value={day.date}
                    onChange={(e) => {
                      const newDate = e.target.value;
                      setDays((prevDays) =>
                        prevDays.map((d, i) =>
                          i === dayIndex ? { ...d, date: newDate } : d
                        )
                      );
                    }}
                  />
                </div>
                {day.mealTypes.map((meal, mealIndex) => (
                  <MealsDiv key={mealIndex}>
                    <LuPlusSquare
                      color="black"
                      onClick={() =>
                        handleMealClick(dayIndex, mealIndex, meal.name)
                      }
                    />
                    <P $fontSize="16px">{meal.name}</P>
                    <ul>
                      {meal.foods.map((food, foodIndex) => (
                        <li key={foodIndex}>
                          {food.item.namn} - {food.item.nummer} -{food.amount}{" "}
                          gram
                          <FaRegEdit
                            color="black"
                            style={{ marginLeft: "15px" }}
                            onClick={() =>
                              handleEditFood(
                                dayIndex,
                                mealIndex,
                                food.item,
                                food.amount
                              )
                            }
                          />
                          <RxCross2
                            color="black"
                            onClick={() =>
                              handleRemoveFood(dayIndex, mealIndex, foodIndex)
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  </MealsDiv>
                ))}

                <MealsDiv>
                  <P $fontSize="16px">Lägg till mellanmål?</P>
                  <LuPlusSquare
                    color="black"
                    onClick={() => handleAddInBetweenMeal(dayIndex)}
                  />
                </MealsDiv>
              </OneDayDiv>
            )}

            <TrashCanDiv>
              <FaRegTrashCan
                color="black"
                onClick={() => handleDeleteDay(dayIndex)}
              />
            </TrashCanDiv>
          </FoodJournalDiv>
        ))}
        <AddNewDayDiv onClick={addNewDay}>
          <H3>Ny dag?</H3>
          <ArrowDiv>
            <FiPlus color="black" fontSize={"20px"} />
          </ArrowDiv>
        </AddNewDayDiv>
      </FoodJournalWrapper>
    </Wrapper>
  );
};
