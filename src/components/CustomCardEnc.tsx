import React, { useState } from "react";
import Bug from "./Bug";
import LikeButton from "./LikeButton";
import "../routes/App.css";
import { useForm, SubmitHandler } from "react-hook-form";
import "./CustomCard.css";
import VerReporte from "../routes/VerReporte";
import { useNavigate } from "react-router-dom";

function CustomCardEnv(props: { bug: Bug }) {
  let tittle = props.bug.titulo;
  const navigate = useNavigate();
  const [bugState, setBugState] = useState(props.bug.estado);

  // const handleInspectBug = () => {
  //   navigate(`/VerReporte/${props.bug.id}`);
  // };

  const handleBugStateChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBugState = e.target.value;
    setBugState(newBugState);
    const url = `http://127.0.0.1:5000/reports/update/estado?id_prioridad=${parseInt(e.target.value,10)}&id_report=${props.bug.id}`;
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


  return (
    <div className="scroll-cards__item container-xl" aria-label="Wie - 1">
      <div className="card-header"></div>
      <div className="card-body">
        <div className="bug-info-container">
          <div className="bug-state">
            
            <select name="Producto" onChange={handleBugStateChange} >
                    
              <option key={1} value={1}>
                Alta
              </option>
              <option key={2} value={2}>
                Media
              </option>
              <option key={3} value={3}>
                Baja
              </option>
              
                    
              </select>
            
          </div>
          <LikeButton bug={props.bug}></LikeButton>
        </div>
        <p className="titulardo">{props.bug.titulo}</p>
        <h1 className="space-taker"></h1>
        <hr className="tittle-separator"></hr>
        <p>{props.bug.cuerpo}</p>
        <div className="text-right">
        </div>
      </div>
    </div>
  );
}

export default CustomCardEnv;
