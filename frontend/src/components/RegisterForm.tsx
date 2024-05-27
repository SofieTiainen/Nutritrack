import { H2, Input, Button, FlexDiv, ErrorP, P } from "../styles/global.styled";
import {
  Form,
  SuccessMessage,
  StyledDivTop,
  StyledDivBottom,
} from "./registerForm.styled";
import { Colors } from "../styles/colors";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { validateEmail, validatePassword } from "../utilities/validateUtils";
import { Loader } from "./Loader";
import { useState, useEffect } from "react";
import axios from "axios";

export const RegisterForm = () => {
  const [showRegSuccess, setShowRegSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const [clientError, setClientError] = useState("");
  

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

    setClientError("");
    setServerError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        registerInput
      );

      if (response.status === 201) {
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
      if (error.response) {
        if (error.response.status === 400) {
          setClientError(error.response.data.error);
        } else if (error.response.status === 500) {
          setServerError("Internal server error, please try again later.");
        }
      } else {
        setServerError("An unexpected error occurred, please try again.");
      }
      setButtonText({ text: "Register" });
    }
  };

  const handleChange = (e: React.ChangeEvent) => {
    const { value, name } = e.target as HTMLInputElement;
    setRegisterInput({ ...registerInput, [name]: value.trim() });
  };

  const hasErrors =
    validationErrors.email.length > 0 || validationErrors.password.length > 0;

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
            <div>
              <ErrorP key={i} $color="red" $padding={"0px 0px 0px 5px"}>
                {error}
              </ErrorP>
            </div>
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
          {clientError && <ErrorP $color="red" $padding={"0px 0px 0px 5px"}>{clientError}</ErrorP>}
          {serverError && <ErrorP $color="red" $padding={"0px 0px 0px 5px"}>{serverError}</ErrorP>}
          <Button
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "15px",
            }}
            disabled={
              hasErrors ||
              registerInput.firstName === "" ||
              registerInput.lastName === ""
            }
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
            <P>Your account has successfully been created, login to continue</P>
          </StyledDivBottom>
        </SuccessMessage>
      )}
    </>
  );
};
