import * as React from 'react';
import { useState,useEffect } from 'react';
import  { Card,Button,Modal,Form } from 'react-bootstrap';
import { useForm, SubmitHandler } from "react-hook-form";

export interface IReasignacionButtonProps {
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


const ReasignacionButton: React.FunctionComponent<IReasignacionButtonProps> = ({id_report,id_developer,developer_name,date,motivo}) =>  {
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

    const url2 = "http://127.0.0.1:5000/reasignation/delete?id_report="+id_report+"&id_developer="+id_developer;
    const response2 = await fetch(url2, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    } else {
      if (response2.ok) {
        handleClose();
      }
    }

  };



  const Negar = async () => {
    const url = "http://127.0.0.1:5000/reasignation/delete?id_report="+id_report+"&id_developer="+id_developer;
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
                    <option>developer</option>
                    <option value="1">juan</option>
                    <option value="2">pedro</option>
                    <option value="3">pablo</option>
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