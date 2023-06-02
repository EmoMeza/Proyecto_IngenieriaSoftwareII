import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface IAsignacionButtonProps {
  id_report: number;
}

const TomarBugButton: React.FunctionComponent<IAsignacionButtonProps> = ({ id_report }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigateAsignacion = () => {
    navigate('/Asignacion');
  };

  const handleConfirm = async () => {
    const developer = '1'; // Set the selected developer value here
    const url = `http://127.0.0.1:5000/reports/add/developer/?id_report=${id_report}&id_dev=${developer}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
        Tomar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-black">Asignacion de reporte a desarollador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Confirmas que quieres tomar el bug?</h5>
       
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Tomar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TomarBugButton;