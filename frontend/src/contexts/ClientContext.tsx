import React, { createContext, useState, useContext, ReactNode } from "react";
import axios from "axios";

interface Client {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  ageYears: number | null;
  ageMonths: number | null;
}

interface ClientsContextProps {
  clientsList: Client[];
  fetchClients: () => void;
  addClient: (newClient: Client) => void;
  getClientById: (id: string) => Client | undefined;
}

const ClientsContext = createContext<ClientsContextProps | undefined>(undefined);

export const ClientsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [clientsList, setClientsList] = useState<Client[]>([]);

  const fetchClients = async () => {
  const token = sessionStorage.getItem("token");

    try {
      const response = await axios.get("http://localhost:3000/api/clients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setClientsList(response.data);
      }
    } catch (error) {
      console.error("Error fetching clients", error);
    }
  };

  const addClient = (newClient: Client) => {
    setClientsList((prevClients) => [...prevClients, newClient]);
  };

  const getClientById = (id: string): Client | undefined => {
    return clientsList.find(client => client._id === id);
  };

  return (
    <ClientsContext.Provider value={{ clientsList, fetchClients, addClient, getClientById }}>
      {children}
    </ClientsContext.Provider>
  );
};

export const useClients = () => {
  const context = useContext(ClientsContext);
  if (context === undefined) {
    throw new Error("useClients must be used within a ClientsProvider");
  }
  return context;
};
