import { FooterComponent, P } from "./Footer.styled";
import { H1 } from "../styles/global.styled";
import { Colors } from "../styles/colors";

export const Footer = () => {
  return (
    <FooterComponent>
      <P>© 2024 Nutritrack AB. Alla rättigheter förbehållna.</P>
      <H1 $textAlign="center" $color={Colors.White}>
        Nutritrack
      </H1>
      <P>Integritetspolicy | Användarvillkor</P>
    </FooterComponent>
  );
};
