import { useEffect } from "react";
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
  BtnDiv,
  FoodDiaryButton,
  FoodUl,
  FoodLi
} from "./foodDiary.styled";
import { P, H3} from "../styles/global.styled";
import { IoIosArrowDown } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import { LuPlusSquare } from "react-icons/lu";
import { SearchField } from "./SearchField";
import { useFood } from "../contexts/FoodContext";
import { useParams, useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { Colors } from "../styles/colors";

export const FoodDiary: React.FC = () => {
  const navigate = useNavigate();
  const { clientId, diaryId } = useParams<{
    clientId: string;
    diaryId: string;
  }>();
  const token = sessionStorage.getItem("token");
  const {
    days,
    setDays,
    hiddenDays,
    setHiddenDays,
    activeMeal,
    setActiveMeal,
    editFood,
    setEditFood,
    addNewDay,
    handleToggleDay,
    handleAddFood,
    handleEditFood,
    handleRemoveFood,
    handleAddInBetweenMeal,
    handleSaveAsDraft,
    handleGoToNutritionalAnalysis,
    handleDeleteDiary,
  } = useFood();

  const initialDays = [
    {
      date: new Date().toISOString().split("T")[0],
      mealTypes: [
        { name: "Frukost", foods: [] },
        { name: "Lunch", foods: [] },
        { name: "Middag", foods: [] },
        { name: "Mellanmål 1", foods: [] },
      ],
    },
  ];

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
          navigate("/nutritrack/clients");

        }
      };
      fetchDiary();
    } else {
      setDays(initialDays);
    }
  }, [diaryId, clientId, token, setDays]);

  const hasValidDays = days.some((day) =>
    day.mealTypes.some((meal) => meal.foods.length > 0)
  );

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

  return (
    <Wrapper>
      <SearchBarWrapper>
        {activeMeal && (
          <>
            <P>
              Sök på livsmedel för {activeMeal?.mealType} - Datum:{" "}
              {days[activeMeal.dayIndex]?.date}
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
      <H3 style={{ textAlign: "center" }}>Matdagboken</H3>
        <BtnDiv>
          <FoodDiaryButton
            $backgroundImageC1={Colors.MintGreen400}
            $backgroundImageC2={Colors.MintGreen500}
            onClick={() => handleSaveAsDraft(clientId!, diaryId!, token!)}
          >
            Spara som utkast
          </FoodDiaryButton>
          {diaryId && (
            <FoodDiaryButton
              $backgroundImageC1={Colors.MintGreen400}
              $backgroundImageC2={Colors.MintGreen500}
              onClick={() => handleDeleteDiary(diaryId, token!, navigate)}
            >
              Radera matdagboken
            </FoodDiaryButton>
          )}
          <FoodDiaryButton
            $backgroundImageC1={Colors.MintGreen400}
            $backgroundImageC2={Colors.MintGreen500}
            onClick={() =>
              handleGoToNutritionalAnalysis(
                clientId!,
                diaryId!,
                token!,
                navigate
              )
            }
            disabled={!hasValidDays}
          >
            Näringsberäkning
          </FoodDiaryButton>
        </BtnDiv>

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
                    <FoodUl>
                      {meal.foods.map((food, foodIndex) => (
                        <FoodLi key={foodIndex}>
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
                        </FoodLi>
                      ))}
                    </FoodUl>
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
