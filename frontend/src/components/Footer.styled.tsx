import styled from "styled-components";
import { Colors } from "../styles/colors";

export const FooterComponent = styled.footer`
  background-color: ${Colors.Green400};
  width: 100%;
  color: ${Colors.White};
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const P = styled.p`
  color: white;
  margin-top: 40px;
  font-size: 12px;
  text-align: center;
`;
