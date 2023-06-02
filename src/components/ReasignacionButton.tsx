import * as React from 'react';
import { useState,useEffect } from 'react';
import  { Card,Button,Modal,Form } from 'react-bootstrap';
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export interface IReasignacionButtonProps {
  id_producto:number;
  id_report: number;
  id_developer : number;
  developer_name:string;
  date:string;
  motivo:string;
}

type FormValues = {
  developer: string;
  comentario: string;
};

type Desarollador = {
  email:string;
  id:number;
  id_rol: number;
  nombre: string;
}




const ReasignacionButton: React.FunctionComponent<IReasignacionButtonProps> = ({id_producto,id_report,id_developer,developer_name,date,motivo}) =>  {
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

    if (!response.ok ) {
      throw new Error(response.statusText);
    }
    if(response.ok ){
      Negar();
    }

  };


  const Negar = async () => {
    const url = "http://127.0.0.1:5000/reasignacion/delete/?id_report="+id_report+"&id_dev="+id_developer;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
      
    });
    
    if (!response.ok) {
      throw new Error(response.statusText);
    } else {
      if (response.ok) {
        window.location.reload();
        handleClose();
      }
    }
  }

  const getDevelopers = () => {
    const [desarollador, setDesarolladores] = useState([]);
  
    useEffect(() => {
      fetch("http://127.0.0.1:5000/products/get/developers?id_product="+id_producto)
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
        Reasignacion
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-black">Reasignar Bug</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body className="text-black">
              <Card.Title as="h5" >Motivo de {developer_name} </Card.Title>
              <Card.Text> 
                {motivo}
              </Card.Text>

            </Card.Body>
            <Button variant="danger" onClick={Negar}>
                Negar
            </Button>
          </Card>
          
          <br />
          <Card>
            <Card.Body>
              <Card.Title as="h5" className="text-black" >Reasignar a :</Card.Title>

              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                <Form.Select {...register("developer")}>
                  {developers.map((developer) => (
                    <option key={developer.id_desarollador} value={developer.id_desarollador}>
                      {developer.nombre}
                    </option>
                  ))}
                </Form.Select>
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button variant="primary"   type="submit">
                      Asignar
                  </Button>
                </div>
              </Form>
            </Card.Body>
            
          </Card>
          
          
        
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ReasignacionButton;