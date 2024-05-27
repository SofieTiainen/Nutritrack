import { useState } from "react";
import {
  H2,
  Input,
  Button,
  StyledLink,
  FlexDiv,
  ErrorP
} from "../styles/global.styled";
import { Form, P } from "./LoginForm.styled";
import { RxCross1 } from "react-icons/rx";
import { Colors } from "../styles/colors";
import { Loader } from "./Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  toggleLogin: () => void;
  setIsActiveHam: (isActive: boolean) => void;
  scrollToSection: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    sectionId: string
  ) => void;
}

export const LoginForm = ({
  toggleLogin,
  setIsActiveHam,
  scrollToSection,
}: LoginFormProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonText, setButtonText] = useState<{
    text: string;
    loader?: JSX.Element;
  }>({ text: "Login" });

  const [loginInput, setLoginInput] = useState({
    email: "",
    passWord: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setButtonText({
      text: "Login",
      loader: <Loader width="10px" padding="5px" color="white" />,
    });

    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        loginInput
      );

      if (response.status === 200) {
        sessionStorage.setItem("token", response.data.token);
        const { firstName, lastName, email } = response.data;
        const userProfile = { firstName, lastName, email };
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
        setIsActiveHam(false);
        navigate("/nutritrack/dashboard");
      }
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("An unexpected error occurred, please try again.");
      }
      setButtonText({ text: "Login" });
    }
  };

  const handleRegisterLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    toggleLogin();
    setIsActiveHam(false);
    scrollToSection(e, "register");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FlexDiv $justifyContent="flex-end">
        <RxCross1
          color="black"
          style={{ padding: "10px 10px", cursor: "pointer" }}
          onClick={toggleLogin}
        />
      </FlexDiv>
      <FlexDiv $flexdirection="column" style={{ padding: "20px 30px 10px" }}>
        <H2>Login</H2>

        <Input
          required
          type="email"
          placeholder="Email"
          value={loginInput.email}
          onChange={(e) =>
            setLoginInput({ ...loginInput, email: e.target.value })
          }
        />

        <Input
          required
          type="password"
          placeholder="Password"
          value={loginInput.passWord}
          onChange={(e) =>
            setLoginInput({ ...loginInput, passWord: e.target.value })
          }
        />
        {errorMessage && (
          <ErrorP $color="red" $padding={"0px 0px 0px 5px"}>
            {errorMessage}
          </ErrorP>
        )}

        <Button
          $backgroundImageC1={Colors.Gray500}
          $backgroundImageC2={Colors.Gray600}
        >
          {buttonText.text}
          <FlexDiv>{buttonText.loader}</FlexDiv>
        </Button>

        <P>
          Don't have an account?{" "}
          <StyledLink to={"#"} onClick={handleRegisterLinkClick}>
            Register
          </StyledLink>
        </P>
      </FlexDiv>
    </Form>
  );
};
