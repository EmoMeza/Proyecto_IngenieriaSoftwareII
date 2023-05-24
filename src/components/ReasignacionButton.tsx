import * as React from 'react';
import { useState,useEffect } from 'react';
import  { Card,Button,Modal,Form } from 'react-bootstrap';
import { useForm, SubmitHandler } from "react-hook-form";

export interface IReasignacionButtonProps {
  id_report: number;
  id_developer : number;
  date:string;
  motivo:string;
}

type FormValues = {
  developer: string;
  comentario: string;
};

const getMotivo = (id_report:number) => {
  const [datos, setUsers] = useState([]);

  const fetchUserData = () => {
      fetch("http://127.0.0.1:5000/reasignacion/get/motivo/report/?id_report="+id_report)
      .then((response) => {
          return response.json();
      })
      .then((data) => {
          setUsers(data);
      });
  };

  useEffect(() => {
      fetchUserData();
  }, []);

  return datos;
};


const ReasignacionButton: React.FunctionComponent<IReasignacionButtonProps> = ({id_report,id_developer,date,motivo}) =>  {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { register, handleSubmit,formState: { errors } } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {  
   
    const url = "http://127.0.0.1:5000/reasignation_petition/delete?id_report="+ id_report +"&id_developer=" + id_developer;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };



  const Negar = async () => {
    const url = "http://127.0.0.1:5000/reasignation_petition/delete?id_report="+ id_report +"&id_developer=" + id_developer;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
      
    });

  }
  
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
              <Card.Title>Motivo de {id_report} </Card.Title>
              <Card.Text> 
                {motivo}
              </Card.Text>

            </Card.Body>
            <Button variant="primary" onClick={Negar}>
                Negar
            </Button>
          </Card>
          
          <br />
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label className="text-black" >Reasignar a :</Form.Label>
              <Form.Select {...register("developer")}>
                <option>developer</option>
                <option value="1">juan</option>
                <option value="2">pedro</option>
                <option value="3">pablo</option>
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

export default ReasignacionButton;