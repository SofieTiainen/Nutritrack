import styled from "styled-components";
import { Colors } from "../styles/colors";

export const ClientsWrapper = styled.div`
  background-color: ${Colors.Gold50};
  margin-bottom: 100px;
  margin-top: 100px;
  padding: 0px 0px;
`;

export const AddClientBtn = styled.button`
  background-color: ${Colors.Green100};
  border-radius: 5px;
  border: 1px solid transparent;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.25s;
  letter-spacing: 1.2px;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  color: ${Colors.Green500};

  &:hover {
  color: ${Colors.Green700};
     
  }
`;

export const AddClientDiv = styled.div`
  position: fixed;
  top: 0px;
  z-index: 10;
  width: 100%;
  height: 100vh;

  @media (min-width: 769px) {
    height: 100vh;
    background-color: #888888b0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

// export const ClientsListWrapper = styled.div`
// background-color: pink;
// `