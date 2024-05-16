import styled from "styled-components";

export const StyledVideo = styled.video`
  max-width: 100%;
  height: 100vh;
  position: absolute;
  object-fit: cover;

  @media (min-width: 1000px) {
    width: 100%;
  }
`;

export const StyledSpan = styled.span`
position: absolute;
top: 280px;
left: 800px;
color: white;
font-size: 36px;
font-weight: 500;

@media (max-width: 1000px) {
  font-size: 24px; /* Ändra storleken här för mindre skärmar */
  top: 200px; /* Justera positionen för mindre skärmar om det behövs */
  left: 50%; /* Centrera texten på mindre skärmar */
  transform: translateX(-50%);
}

`

export const StyledSection = styled.section<{
    $backgroundColor?: string;
    $padding?: string;
    $justifyContent?: string;
  }>`
    max-width: 100%;
    min-height: 100vh;
    background-color: ${(props) => props.$backgroundColor};
    justify-content: ${(props) => props.$justifyContent || "normal"};
    place-items: center;
    display: flex;
    flex-direction: column;
    padding: ${(props) => props.$padding || "0px"};
  `;