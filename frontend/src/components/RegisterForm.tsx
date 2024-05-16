import { useState, useEffect } from "react";
import { H2, Input, Button, FlexDiv, ErrorP, P } from "../styles/global.styled";
import {
  Form,
  SuccessMessage,
  StyledDivTop,
  StyledDivBottom,
} from "./registerForm.styled";
import { validateEmail, validatePassword } from "../utilities/validateUtils";
import { Loader } from "./Loader";
import { Colors } from "../styles/colors";
import axios from "axios";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export const RegisterForm = () => {
  const [buttonText, setButtonText] = useState<{
    text: string;
    loader?: JSX.Element;
  }>({ text: "Register" });

  const [validationErrors, setValidationErrors] = useState({
    email: [] as string[],
    password: [] as string[],
  });

  const [registerInput, setRegisterInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    passWord: "",
  });

  const [showRegSuccess, setShowRegSuccess] = useState(false);

  useEffect(() => {
    const errors = {
      email: validateEmail(registerInput.email),
      password: validatePassword(registerInput.passWord),
    };

    setValidationErrors(errors);
  }, [registerInput.email, registerInput.passWord]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setButtonText({
      text: "Register",
      loader: <Loader width="10px" padding="5px" color="white" />,
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        registerInput
      );
      
      if (response.status === 201) {
        console.log("Lyckas registrering av konto, logga in");
        setButtonText({ text: "Register" });
        setShowRegSuccess(true);
        setRegisterInput({
          firstName: "",
          lastName: "",
          email: "",
          passWord: "",
        });
      }
    } catch (error: any) {
      console.log("Registration error: ", error);
      if (error.response) {
        console.log(error.response.data.error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent) => {
    const { value, name } = e.target as HTMLInputElement;
    setRegisterInput({ ...registerInput, [name]: value.trim() });
  };

  return (
    <>
      {!showRegSuccess && (
        <Form onSubmit={handleSubmit}>
          <H2>Register</H2>
          <Input
            required
            type="text"
            placeholder="Firstname"
            value={registerInput.firstName}
            name="firstName"
            onChange={handleChange}
          />

          <Input
            required
            type="text"
            placeholder="Lastname"
            value={registerInput.lastName}
            name="lastName"
            onChange={handleChange}
          />

          <Input
            required
            type="email"
            placeholder="Email"
            value={registerInput.email}
            name="email"
            onChange={handleChange}
          />
          {validationErrors.email.map((error, i) => (
            <ErrorP key={i} $color="red" $padding={"0px 0px 0px 5px"}>
              {error}
            </ErrorP>
          ))}

          <Input
            required
            type="password"
            placeholder="Password"
            value={registerInput.passWord}
            name="passWord"
            onChange={handleChange}
          />
          {validationErrors.password.map((error, i) => (
            <ErrorP key={i} $color="red" $padding={"0px 0px 0px 5px"}>
              {error}
            </ErrorP>
          ))}
          <Button
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "15px",
            }}
            $backgroundImageC1={Colors.Gray500}
            $backgroundImageC2={Colors.Gray600}
          >
            {buttonText.text}
            <FlexDiv>{buttonText.loader}</FlexDiv>
          </Button>
        </Form>
      )}

      {showRegSuccess && (
        <SuccessMessage>
          <StyledDivTop>
            <IoIosCheckmarkCircleOutline fontSize={"74px"} />
            <P>Success!</P>
          </StyledDivTop>
          <StyledDivBottom>
            <P>Your account has successfully been created</P>
            <Button $marginBottom="5px" $marginTop="5px">
              Login
            </Button>
          </StyledDivBottom>
        </SuccessMessage>
      )}
    </>
  );
};
