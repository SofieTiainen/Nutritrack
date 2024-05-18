import { StyledSearchField, SearchDiv } from "./searchField.styled";
import { IoSearchOutline } from "react-icons/io5";
import { useFood } from "../contexts/FoodContext";

export const SearchField: React.FC = () => {
    const { setSearchTerm } = useFood();
  
    return (
      <SearchDiv>
        <StyledSearchField
          type="text"
          id="foodSearch"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IoSearchOutline
          color="black"
          style={{ position: "absolute", left: "10px" }}
        />
      </SearchDiv>
    );
  };