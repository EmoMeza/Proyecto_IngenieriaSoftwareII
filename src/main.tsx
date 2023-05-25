import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./routes/App";
import IngresarBug from "./routes/IngresarBug";
import VerReporte from "./routes/VerReporte";
import Asignacion from "./routes/Asignacion";
import ReportesPorDesarrollador from "./routes/ReportesPorDesarrollador";
import JsonViewer from "./routes/JsonViewer";

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
  path: "/ReportesPorDesarrollador",
  element: <ReportesPorDesarrollador />
  },
  {
    path: "/JsonViewer",
    element: <JsonViewer></JsonViewer>
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
