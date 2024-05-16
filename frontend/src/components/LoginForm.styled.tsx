import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-around;
  



  @media (min-width: 769px) {
    flex-direction: column;
    justify-content: center;
    background-color: white;
    width: 350px;
    height: fit-content;
    border-radius: 5px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.24);
  }
`;

export const P = styled.p`
  color: #888;
  margin-top: 40px;
  font-size: 12px;
  text-align: center;
`;
