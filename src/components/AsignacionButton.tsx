import * as React from 'react';
import { useState, useEffect} from 'react';
import  { Button,Modal,Form } from 'react-bootstrap';
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
interface IAsignacionButtonProps {
  id_report: number;
};

type FormValues = {
  developer: string;
  comentario: string;
};
type Desarollador = {
  email:string;
  id:number;
  id_rol: number;
  nombre: string;
};
type prioridad = {
  id: number;
  nombre: string;
};

const AsignacionButton: React.FunctionComponent<IAsignacionButtonProps> = ({id_report})  =>   {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { register, handleSubmit,formState: { errors } } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {  
   
    const url = "http://127.0.0.1:5000/reports/add/developer/?id_report="+id_report+"&id_dev="+data.developer;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    } else {
      window.location.reload();
      handleClose();
    }

  };

  const getDevelopers = () => {
    const [desarollador, setDesarolladores] = useState([]);
  
  useEffect(() => {
    fetch("http://127.0.0.1:5000/products/get/developers?id_product="+2)
      .then((response) => response.json())
      .then((data) => setDesarolladores(data));
  }, []);

  const desarolladores = desarollador.map((item: Desarollador) =>{
    return {
      nombre:item.nombre, id_desarollador:item.id, id_rol:item.id_rol, email:item.email
    }
  });

  return desarolladores;
  };

  const developers=getDevelopers();

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Asignar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-black">Asignacion de reporte a desarollador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label className="text-black" >Asignar a :</Form.Label>
              
              <Form.Select {...register("developer")}>
              {developers.map((developer) => (
                <option key={developer.id_desarollador} value={developer.id_desarollador}>
                  {developer.nombre}
                </option>
              ))}
              </Form.Select>

      
            </Form.Group>

            <Button variant="primary" type="submit">
                Asignar
            </Button>
          </Form>
          
        
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AsignacionButton;