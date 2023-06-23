import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

interface CambiarPrioridadButtonProps {
  id: number;
}

const CambiarPrioridadButton: React.FC<CambiarPrioridadButtonProps> = ({ id }) => {
  const [showModal, setShowModal] = useState(false);
  const [newPrioridad, setNewPrioridad] = useState(1); 
  const handleModalClose = () => {
    setShowModal(false);
    setNewPrioridad(1);
  };

  const handleModalSave = async () => {
    try {
      const url = `http://127.0.0.1:5000/reports/update/prioridad?id_report=${id}&id_prioridad=${newPrioridad}`;
      const response = await fetch(url, { method: 'POST' });
  
      if (response.ok) {
        console.log('Priority updated successfully');
      } else {
        console.error('Failed to update priority');
      }
    } catch (error) {
      console.error('An error occurred while updating priority:', error);
    }
  
    handleModalClose();
  };
  return (
    <>
      <Button variant="info" onClick={() => setShowModal(true)}>
        Cambiar Prioridad
      </Button>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cambiar Prioridad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formPrioridad">
            <Form.Label>Prioridad</Form.Label>
            <Form.Control
              as="select"
              value={newPrioridad}
              onChange={(e) => setNewPrioridad(parseInt(e.target.value, 10))}
            >
              <option value={1}>Baja</option>
              <option value={2}>Media</option>
              <option value={3}>Alta</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleModalSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CambiarPrioridadButton;