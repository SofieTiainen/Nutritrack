import { CheckboxWrapper } from "./checkboxGroup.styled";
import { useNutritionAnalysisContext } from "../contexts/NutritionAnalysisContext";

export const CheckboxGroup = () => {
  const { checkboxes, setCheckboxes } = useNutritionAnalysisContext();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCheckboxes({
      ...checkboxes,
      [name]: checked,
    });
  };

  return (
    <CheckboxWrapper>
      <h1>Visa: </h1>
      <div>
        <input
          type="checkbox"
          name="checkbox1"
          checked={checkboxes.checkbox1}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="checkbox1">Total närings - Alla måltider ihopslagna</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="checkbox2"
          checked={checkboxes.checkbox2}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="checkbox2">Var dag för sig</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="checkbox3"
          checked={checkboxes.checkbox3}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="checkbox3">Varje måltid för sig</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="checkbox4"
          checked={checkboxes.checkbox4}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="checkbox4">Varje livsmedel för sig</label>
      </div>
    </CheckboxWrapper>
  );
};

