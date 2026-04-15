import { createBrowserRouter } from "react-router-dom";
import InternalLogin from "../pages/Auth/InternalLogin.jsx";

export const router = createBrowserRouter([
  { path: "/", element: <InternalLogin /> },
]);
