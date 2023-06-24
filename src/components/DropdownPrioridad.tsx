import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useState, useEffect } from 'react';



type DropdownPrioridadProps = {
 id_report:number
};
const DropdownPrioridad: React.FC<DropdownPrioridadProps> = ({id_report}) => {
  const handleDropdownItemClick = async (id_prioridad:number,id_report:number) => {
    const url = `http://127.0.0.1:5000/reports/update/prioridad?id_report=${id_report}&id_prioridad=${id_prioridad}`;
    try {
      const response = await fetch(url, { method: "POST" });
      if (response.ok) {
      } else {
        console.log("error al cambiar la prioridad")
      }
    } catch (error) {
      console.log("error al cambiar la prioridad")
    }
  };
  return (


    <DropdownButton
      size="md"
      id="dropdown-button-dark"
      variant="success" 
      title={"Prioridad"}
      >
        <Dropdown.Item onClick={() => handleDropdownItemClick(3,id_report)}>
          Alta
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleDropdownItemClick(2,id_report)}>
          Media
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleDropdownItemClick(1,id_report)}>
          Baja
        </Dropdown.Item>

    </DropdownButton>
  );
};

export default DropdownPrioridad;