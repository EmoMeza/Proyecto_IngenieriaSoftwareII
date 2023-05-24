import * as React from 'react';
import { useState } from 'react';
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

const AsignacionButton: React.FunctionComponent<IAsignacionButtonProps> = ({id_report})  =>   {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const navigateAsignacion = () => {
    navigate("/Asignacion");
  };

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
      handleClose();
    }

  };

  
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

export default AsignacionButton;