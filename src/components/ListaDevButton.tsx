import * as React from 'react';
import { useState, useEffect} from 'react';
import  { Button,Modal,Form } from 'react-bootstrap';
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import AsignacionButton from './AsignacionButton';

interface IListaDevButtonProps {
  id_dev: number;
  id_producto: number;
};

type FormValues = {
  motivo: string;
};

type reporte = {
  id: number;
  titulo:string;
  descripcion:string;
  likes:number;
  fecha:string;
  id_estado: number;
  id_prioridad: number;
  id_producto: number;
}

const getData = (id_dev: number) => {
  const [datos, setUsers] = useState([]);

  const fetchUserData = () => {
    fetch("http://127.0.0.1:5000/dev/reportes/?id_dev=" + id_dev)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      });
  };

  useEffect(() => {
    // Configurar la consulta periódica cada X segundos
    const interval = setInterval(() => {
      fetchUserData();
    }, 5000); // Consulta cada 5 segundos (ajusta este valor según tus necesidades)

    // Limpiar el intervalo cuando el componente se desmonte
    return () => {
      clearInterval(interval);
    };
  }, []);

  return datos;
};


const ListaDevButton: React.FunctionComponent<IListaDevButtonProps> = ({id_dev, id_producto})  =>   {
  const [show, setShow] = useState(false);
  //const [isButtonDisabled, setButtonDisabled] = useState(false); // Added state variable

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const datos = getData(id_dev);

  const reports = datos
  .filter((report) => report.id_producto === id_producto)
  .map((reports:reporte) => {
    return {
      titulo:<Button href={"/VerReporte/" + reports.id} variant="link">{reports.titulo}</Button>, 
      likes:reports.likes,
      fecha:reports.fecha,
      reasignacion: <AsignacionButton id_report ={reports.id}></AsignacionButton>
    }
  });


  const data = {
    columns: [
      {
        label: 'Titulo',
        field: 'titulo',
        sort: 'asc'
      },
      {
        label: 'Likes',
        field: 'likes',
        sort: 'asc'
      },
      {
        label: 'Fecha',
        field: 'fecha',
        sort: 'asc'
      },
      {
        label: 'Reasignar',
        field: 'reasignacion',
        sort: 'asc'
      }
    ],
    rows: reports
  };


  return (
    <>
      <Button variant="success" onClick={handleShow}>
      Asignados
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-black">Reportes asignados al desarrollador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <MDBTable scrollY>
                <MDBTableHead columns={data.columns} />
                <MDBTableBody rows={data.rows} />
        </MDBTable>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ListaDevButton;