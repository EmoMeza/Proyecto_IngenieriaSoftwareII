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

type producto = {
  nombre: string;
  id: number;
  id_encargado: number;
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
  
    return () => {
      fetchUserData();
    };
  }, []);

  return datos;
};


const ListaDevButton: React.FunctionComponent<IListaDevButtonProps> = ({ id_dev, id_producto }) => {
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {

  
    fetch("http://127.0.0.1:5000/products/all")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const getProductIds = () => {
    return products
      .filter((producto: producto) => producto.id_encargado === 2)
      .map((item: producto) => item.id);
  };
  

  const productIds = getProductIds();
  const datos = getData(id_dev);

  const reports = datos
    .filter((report :reporte) => report.id_producto == (id_producto))
    .map((report: reporte) => {
      return {
        titulo: <Button href={"/VerReporteDev/" + report.id} variant="link">{report.titulo}</Button>,
        likes: report.likes,
        fecha: report.fecha,
        producto: report.id_producto,
        reasignacion: <AsignacionButton id_report={report.id}></AsignacionButton>
      };
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
        label: 'Producto',
        field: 'producto',
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

      <Modal  show={show} onHide={handleClose}>
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