import styled from "styled-components";

export const Form = styled.form`
  background-color: white;
  max-width: 100%;
  height: fit-content;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 30px 10px;
  border-radius: 5px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.24);

  @media (min-width: 300px) {
    width: 250px;
  }
`;

export const SuccessMessage = styled.div`
  background-color: blue;
  width: 100%; 
  height: fit-content;
  max-height: 80vh;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  padding: 5px 30px 5px;
  border-radius: 5px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.24);
  background: linear-gradient(to bottom, green 50%, white 50%);

  @media (min-width: 300px) {
    width: 250px;
  }
`;

export const StyledDivTop = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
margin: 50px 0px;


`
export const StyledDivBottom = styled.div`
display: flex;
flex-direction: column;
margin: 50px 30px;

`