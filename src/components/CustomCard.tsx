import React from "react";
import Bug from "./Bug";
import LikeButton from "./LikeButton";
import "../routes/App.css";
import { useForm, SubmitHandler } from "react-hook-form";
import "./CustomCard.css";
import VerReporte from "../routes/VerReporte";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
function CustomCard(props: { bug: Bug }) {
  let tittle = props.bug.titulo;
  const navigate = useNavigate(); 
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

  const handleInspectBug = () => {
    navigate(`/VerReporte/${props.bug.id}`);
  };
  return (
    <div className="scroll-cards__item container-xl" aria-label="Wie - 1">
      <div className="card-header"></div>
      <div className="card-body">
        <div className="bug-info-container">
          <h2 className="bug-state">
            {props.bug.estado + "   " + props.bug.likes + " "}
          </h2>
          <LikeButton bug={props.bug}></LikeButton>
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

export default CustomCard;

/*<div className="text-right">
          <button
            className="btn btn-dark btn-inspect"
            onClick={handleInspectBug}
          >
            Inspeccionar bug
          </button>
        </div>*/