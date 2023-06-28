import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./routes/App";
import IngresarBug from "./routes/IngresarBug";
import VerReporte from "./routes/VerReporte";
import VerReporteDev from "./routes/VerReporteDev";
import VerReporteEnv from "./routes/VerReporteEnc";
import Asignacion from "./routes/Asignacion";
import MisLikes from "./routes/MisLikes";
import MisReportes from "./routes/MisReportes";
import Dev from "./routes/Dev"
import ListaDesarrolladores from "./routes/ListaDesarrolladores"
import MenuReasignacion from "./routes/MenuReasignacion";
import ListaRPDev from "./routes/ListaRPDev";
import { Container } from "react-bootstrap";
import Reportes from "./routes/Reportes";
import ReportesEnc from "./routes/ReportesEnc";

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
    path: "/VerReporteEnv/:id",
    element: <VerReporteEnv />,
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
    element: <ListaRPDev/>,
  },
  {
    path: "/Reportes",
    element: <Reportes/>,
  }
  ,
  {
    path: "/ReportesEnc",
    element: <ReportesEnc/>,
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
