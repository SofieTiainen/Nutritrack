import { useState } from "react";
import {
  H2,
  Input,
  Button,
  FlexDiv,
} from "../styles/global.styled";
import { RxCross1 } from "react-icons/rx";
import { Colors } from "../styles/colors";
import { Loader } from "./Loader";
import axios from "axios";
import { Form } from "./addClienForm.styled";


interface AddClientFormProps {
  toggleAddClient: () => void;
}

export const AddClientForm = ({ toggleAddClient }: AddClientFormProps) => {
  const [buttonText, setButtonText] = useState<{
    text: string;
    loader?: JSX.Element;
  }>({ text: "Add" });


  const [addClientInput, setAddClientInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
  })

  const token = sessionStorage.getItem("token");


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setButtonText({
      text: 'Add',
      loader: <Loader width="10px" padding="5px" color="white" />,
    });

    try {
      const response = await axios.post("http://localhost:3000/api/clients", 
      addClientInput, 
      {
        headers: {
            Authorization: `Bearer ${token}`
        },
      }

      );

      if(response.status === 201) {
        console.log("Responsen", response)
      }

    } catch (error: any) {
        console.log("Error add client", error)

    }
  };

  const handleChange = (e: React.ChangeEvent) => {
    const { value, name } = e.target as HTMLInputElement;
    setAddClientInput({ ...addClientInput, [name]: value.trim() });
  };
  

  return (
    <Form onSubmit={handleSubmit}>
      <FlexDiv $justifyContent="flex-end">
        <RxCross1
          color="black"
          style={{ padding: "10px 10px", cursor: "pointer" }}
          onClick={toggleAddClient}
        />
      </FlexDiv>
      <FlexDiv $flexdirection="column" style={{ padding: "20px 30px 10px" }}>
        <H2>Add client</H2>
        <Input
            required
            type="text"
            placeholder="Firstname"
            value={addClientInput.firstName}
            name="firstName"
            onChange={handleChange}
          />

        <Input
            required
            type="text"
            placeholder="Lastname"
            value={addClientInput.lastName}
            name="lastName"
            onChange={handleChange}
          />

        <Input
            required
            type="email"
            placeholder="Email"
            value={addClientInput.email}
            name="email"
            onChange={handleChange}
          />


        <Button
          $backgroundImageC1={Colors.Gray500}
          $backgroundImageC2={Colors.Gray600}
        >
          {buttonText.text}
          <FlexDiv>{buttonText.loader}</FlexDiv>
        </Button>
      </FlexDiv>
    </Form>
  );
};
