import { useState } from "react";
import axios from "axios";
import { Loader } from "./Loader";
import { Form } from "./addClienForm.styled";
import { H2, Input, Button, FlexDiv } from "../styles/global.styled";
import { RxCross1 } from "react-icons/rx";
import { Colors } from "../styles/colors";
import { useClients } from "../contexts/ClientContext";

interface AddClientFormProps {
  toggleAddClient: () => void;
}

export const AddClientForm = ({ toggleAddClient }: AddClientFormProps) => {
  const { addClient } = useClients();
  const [buttonText, setButtonText] = useState<{ text: string; loader?: JSX.Element }>({ text: "Add" });
  const [addClientInput, setAddClientInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    ageMonths: null as number | null,
    ageYears: null as number | null,
  });

  const token = sessionStorage.getItem("token");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonText({
      text: "Add",
      loader: <Loader width="10px" padding="5px" color="white" />,
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/clients",
        addClientInput,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("Responsen", response);
        const newClient = response.data;
        addClient(newClient); // Lägg till klienten i listan
        setAddClientInput({
          firstName: "",
          lastName: "",
          email: "",
          gender: "",
          ageMonths: null as number | null,
          ageYears: null as number | null,
        });
        setButtonText({ text: "Client successfully added" });
        setTimeout(() => {
          toggleAddClient();
        }, 2000);
      }
    } catch (error: any) {
      console.log("Error add client", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { value, name } = e.target;
    setAddClientInput({ ...addClientInput, [name]: value.trim() });
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    setAddClientInput({
      ...addClientInput,
      [name]: value ? parseInt(value) : null,
    });
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

        <select
          required
          name="gender"
          value={addClientInput.gender}
          onChange={handleChange}
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <select
          name="ageMonths"
          id="ageMonths"
          value={addClientInput.ageMonths ?? ""}
          onChange={handleAgeChange}
          disabled={addClientInput.ageYears !== null}
        >
          <option value="">Age in months</option>
          {[...Array(12).keys()].map((month) => (
            <option value={month} key={month}>
              {month} {month === 1 ? "month" : "months"}
            </option>
          ))}
        </select>

        <select
          name="ageYears"
          id="ageYears"
          value={addClientInput.ageYears ?? ""}
          onChange={handleAgeChange}
          disabled={addClientInput.ageMonths !== null}
        >
          <option value="">Age in years</option>
          {[...Array(111).keys()].map((year) => (
            <option value={year} key={year}>
              {year} {year === 1 ? "year" : "years"}
            </option>
          ))}
        </select>

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
