import * as React from 'react';
import { useState, useEffect} from 'react';
import  { Button,Modal,Form } from 'react-bootstrap';
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
interface ISolicitudButtonProps {
  id_report: number;
  id_dev: number;
};

type FormValues = {
  motivo: string;
};

const SolicitudButton: React.FunctionComponent<ISolicitudButtonProps> = ({id_report, id_dev})  =>   {
  const [show, setShow] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false); // Added state variable

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { register, handleSubmit,formState: { errors } } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
      setButtonDisabled(true); // Disable the button
      const url = `http://127.0.0.1:5000/reasignacion/add/?id_report=${id_report}&id_developer=${id_dev}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          motivo: data.motivo 
        })
      });

    
      if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        handleClose();
      }
  };


  return (
    <>
      <Button variant="success" onClick={handleShow} disabled={isButtonDisabled}>
      Solicitar Reasignar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-black">Solicitud de reasignar reporte</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
            <Form.Label>Motivo de solicitud</Form.Label>
              <Form.Control
                {...register("motivo")}
                as="textarea"
                rows={3}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
                Solicitar Reasignar
            </Button>
          </Form>
          
        
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SolicitudButton;