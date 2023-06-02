import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./routes/App";
import IngresarBug from "./routes/IngresarBug";
import VerReporte from "./routes/VerReporte";
import Asignacion from "./routes/Asignacion";
import Dev from "./routes/Dev"
import ListaDesarrolladores from "./routes/ListaDesarrolladores"
import MenuReasignacion from "./routes/MenuReasignacion";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: "Error",
  },
  {
    path: "/IngresarBug",
    element: <IngresarBug />,
  },
  {
    path: "/VerReporte/:id",
    element: <VerReporte />,
  },
  {
    path: "/Asignacion",
    element: <Asignacion />,
  },
  {
    path: "/Dev",
    element: <Dev />,
  },
  {
    path: "/ListaDesarrolladores",
    element: <ListaDesarrolladores/>,
  },
  {
    path: "/MenuReasignacion",
    element: <MenuReasignacion/>,
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
