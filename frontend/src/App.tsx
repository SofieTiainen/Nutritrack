import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserProfile } from "./redux/slices/userSlice";
import { useEffect } from "react";
import { Root } from "./routes/Root";
import { Home } from "./routes/Home";
import { PrivateRoute } from "./routes/routes.private";
import { Dashboard } from "./routes/Dashboard";
import { Clients } from "./routes/Clients";
import { RegisterFoodIntake } from "./routes/RegisterFoodIntake";

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
        path="/nutritrack/registerfoodintake"
        element={
          <PrivateRoute>
            <RegisterFoodIntake />
          </PrivateRoute>
        }
      />
    </Route>
  )
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUserProfile = localStorage.getItem("userProfile");
    if (storedUserProfile) {
      dispatch(setUserProfile(JSON.parse(storedUserProfile)));
    }
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
