import React, { useState } from "react";
import Bug from "./Bug";
import LikeButton from "./LikeButton";
import "../routes/App.css";
import { useForm, SubmitHandler } from "react-hook-form";
import "./CustomCard.css";
import VerReporte from "../routes/VerReporte";
import { useNavigate } from "react-router-dom";

function CustomCardDev(props: { bug: Bug }) {
  let tittle = props.bug.titulo;
  const navigate = useNavigate();
  const [bugState, setBugState] = useState(props.bug.estado);

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
            {"   " + props.bug.likes}
          </div>
          <LikeButton bug={props.bug}></LikeButton>
        </div>
        <p className="titulardo">{props.bug.titulo}</p>
        <h1 className="space-taker"></h1>
        <hr className="tittle-separator"></hr>
        <p>{props.bug.cuerpo}</p>
        <div className="text-right">
          <button
            className="btn btn-dark btn-inspect"
          // onClick={handleInspectBug}
          >
            Inspeccionar bug
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomCardDev;
