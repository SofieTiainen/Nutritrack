import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { Root } from "./routes/Root";
import { Home } from "./routes/Home";
import { PrivateRoute } from "./routes/routes.private";
import { Dashboard } from "./routes/Dashboard";
import { Clients } from "./routes/Clients";
import { RegisterFoodIntake } from "./routes/RegisterFoodIntake";
import { ClientsProvider } from "./contexts/ClientContext";
import { FoodProvider } from "./contexts/FoodContext";
import { NutritionAnalysis } from "./routes/NutritionAnalysis";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/nutritrack" element={<Root />}>
      <Route index element={<Home />} />
      <Route
        path="/nutritrack/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/nutritrack/clients"
        element={
          <PrivateRoute>
            <Clients />
          </PrivateRoute>
        }
      />
        <Route
        path="/nutritrack/registerfoodintake/:clientId/:diaryId"
        element={
          <PrivateRoute>
            <RegisterFoodIntake />
          </PrivateRoute>
        }
      />
        <Route
        path="/nutritrack/nutritionanalysis/:clientId/:analysisId?"
        element={
          <PrivateRoute>
            <NutritionAnalysis />
          </PrivateRoute>
        }
      />
    </Route>
  )
);

function App() {
  return (
    <ClientsProvider>
      <FoodProvider>
      <RouterProvider router={router} />
      </FoodProvider>
    </ClientsProvider>
  );
}

export default App;
