import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./routes/App";
import IngresarBug from "./routes/IngresarBug";
import VerReporte from "./routes/VerReporte";
import VerReporteDev from "./routes/VerReporteDev";
import Asignacion from "./routes/Asignacion";
import MisLikes from "./routes/MisLikes";
import MisReportes from "./routes/MisReportes";
import Dev from "./routes/Dev"
import ListaDesarrolladores from "./routes/ListaDesarrolladores"
import MenuReasignacion from "./routes/MenuReasignacion";
import ListaRPDev from "./routes/ListaRPDev";
import { Container } from "react-bootstrap";

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
    path: "/VerReporteDev/:id",
    element: <VerReporteDev />,
  },
  {
    path: "/Asignacion",
    element: <Asignacion />,
  },
  {
    path: "/MisLikes",
    element: <MisLikes />,
  },
  {
    path: "/MisReportes",
    element: <MisReportes />,
  },
  {
    path: "/Dev",
    element: <Dev />,
  },
  {
    path: "/ListaDesarrolladores",
    element: <ListaDesarrolladores />,
  },
  {
    path: "/MenuReasignacion",
    element: <MenuReasignacion />,
  },
  {
    path: "/ListaRPDev",
    element: <Container className="search-container"><ListaRPDev /></Container>,
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
