import { useFood } from "../contexts/FoodContext";
import { DiaryWrapper } from "./foodDiary.styled";

export const FoodDiary: React.FC = () => {
    const { foodDiary } = useFood();
  
    return (
      <DiaryWrapper>
        <h2 style={{ color: "black", textAlign:'center'}}>Matdagbok</h2>

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
      </DiaryWrapper>
    );
  };