import React, { useEffect, useState } from "react";
import Bug from "./Bug";
import LikeButton from "./LikeButton";
import "../routes/App.css";
import { useForm, SubmitHandler } from "react-hook-form";
import "./CustomCard.css";
import VerReporte from "../routes/VerReporte";
import { useNavigate } from "react-router-dom";

type prioridad = {
  id: number;
  nombre: string;
};
const getPrioridades = (): prioridad[] => {
  const [prioridades, setPrioridades] = useState<prioridad[]>([]);

  useEffect(() => {
    const fetchPrioridades = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/reports/prioridad/all');
        if (response.ok) {
          const data = await response.json();
          setPrioridades(data);
        } else {
          console.error('Failed to fetch prioridades');
        }
      } catch (error) {
        console.error('An error occurred while fetching prioridades:', error);
      }
    };

    fetchPrioridades();
  }, []); // Empty dependency array to run the effect only once

  return prioridades;
};




function CustomCardDev(props: { bug: Bug }) {
  let tittle = props.bug.titulo;
  const navigate = useNavigate();
  const [bugState, setBugState] = useState(props.bug.estado);

  const prioridades = getPrioridades();
  const getPrioridadNombre =(id:number) =>{
    const  prio = prioridades.find((item: prioridad) => item.id === id);
    if (!prio) {
      return <h5 className="prioridadCeroCustom">NO ASIGNADO</h5>;
    } else if (prio.id === 0) {
      return <h5 className="prioridadCeroCustom">{prio.nombre.toUpperCase()}</h5>;
    } else if (prio.id === 1) {
      return <h5 className="prioridadUnoCustom">{prio.nombre.toUpperCase()}</h5>;
    } else if (prio.id === 2) {
      return <h5 className="prioridadDosCustom">{prio.nombre.toUpperCase()}</h5>;
    } else if (prio.id === 3) {
      return <h5 className="prioridadTresCustom">{prio.nombre.toUpperCase()}</h5>;
    } else {
      return <h5 className="prioridadCeroCustom">NO ASIGNADO</h5>;
    }
  };



  // const handleInspectBug = () => {
  //   navigate(`/VerReporte/${props.bug.id}`);
  // };

  const handleBugStateChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBugState = e.target.value;
    setBugState(newBugState);
    const idEstado = mapBugStateToId(newBugState);
    const url = `http://127.0.0.1:5000/reports/update/estado?id_estado=${idEstado}&id_report=${props.bug.id}`;
    try {
      const response = await fetch(url, { method: "POST" });
      if (response.ok) {
      } else {
        console.log("error al cambiar estado")
      }
    } catch (error) {
      console.log("error al cambiar estado")
    }
  };

  const mapBugStateToId = (bugState: string): number => {
    switch (bugState) {
      case "pendiente":
        return 1;
      case "en proceso":
        return 2;
      case "cerrado":
        return 3;
      default:
        return 0;
    }
  };

  return (
    <div className="scroll-cards__item container-xl" aria-label="Wie - 1">
      <div className="card-header"></div>
      <div className="card-body">
        <div className="bug-info-container">
          <div className="bug-state">
            <select
              className="bug-state-select"
              value={bugState}
              onChange={handleBugStateChange}
            >
              {props.bug.estado === "pendiente" && (
                <React.Fragment>
                  <option value="pendiente">pendiente</option>
                  <option value="en proceso">en proceso</option>
                  <option value="cerrado">cerrado</option>
                </React.Fragment>
              )}
              {props.bug.estado === "en proceso" && (
                <React.Fragment>
                  <option value="en proceso">en proceso</option>
                  <option value="pendiente">pendiente</option>
                  <option value="cerrado">cerrado</option>
                </React.Fragment>
              )}
              {props.bug.estado === "cerrado" && (
                <React.Fragment>
                  <option value="cerrado">cerrado</option>
                  <option value="pendiente">pendiente</option>
                  <option value="en proceso">en proceso</option>
                </React.Fragment>
              )}
              {props.bug.estado === "no asignado" && (
                <React.Fragment>
                  <option value="no asignado">no asignado</option>
                  <option value="pendiente">pendiente</option>
                  <option value="en proceso">en proceso</option>
                  <option value="cerrado">cerrado</option>
                </React.Fragment>
              )}
            </select>
            
          </div>
          {"  " + props.bug.likes+" likes"}
        </div>
        <p className="titulardo">{props.bug.titulo}</p>
        <div>
        {getPrioridadNombre(props.bug.id_prioridad)}
        </div>
        <h1 className="space-taker"></h1>
        <hr className="tittle-separator"></hr>
        <p>{props.bug.cuerpo}</p>
        <div className="text-right">
        </div>
      </div>
    </div>
  );
}

export default CustomCardDev;
