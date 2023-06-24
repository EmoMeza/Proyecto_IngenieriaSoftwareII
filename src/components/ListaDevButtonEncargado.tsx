import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, Modal, Form, Container } from 'react-bootstrap';
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import AsignacionButton from './AsignacionButton';
import CambiarPrioridadButton from './CambiarPrioridadButton';
import "./PrioridadesModal.css"
interface IListaDevButtonProps {
  id_dev: number;
  id_producto: number;
};

type FormValues = {
  motivo: string;
};

type reporte = {
  id: number;
  titulo: string;
  descripcion: string;
  likes: number;
  fecha: string;
  id_estado: number;
  id_prioridad: number;
  id_producto: number;
}

type producto = {
  nombre: string;
  id: number;
  id_encargado: number;
};
type prioridad = {
  id: number;
  nombre: string;
};

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
/**
const getProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/products/all")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const productos = products.filter((producto:producto) => producto.id_encargado === 2).map((item: producto) =>{
    return {
      nombre:item.nombre, id:item.id
      }
    });

  return productos;
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
**/
const getPrioridades = (): prioridad[] => {
  const [prioridades, setPrioridades] = useState<prioridad[]>([]);

  useEffect(() => {
    const fetchPrioridades = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/reports/prioridad/all');
        if (response.ok) {
          const data = await response.json();
          setPrioridades(data);
        } else {
          console.error('Failed to fetch prioridades');
        }
      } catch (error) {
        console.error('An error occurred while fetching prioridades:', error);
      }
    };

    fetchPrioridades();
  }, []); // Empty dependency array to run the effect only once

  return prioridades;
};
const ListaDevButtonEncargado: React.FunctionComponent<IListaDevButtonProps> = ({ id_dev, id_producto }) => {
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const prioridades = getPrioridades();


  const getPrioridadNombre = (id: number) => {
    const prio = prioridades.find((item: prioridad) => item.id === id);
    if (!prio) {
      return <h5 className="prioridadCeroModal">NO ASIGNADO</h5>;
    } else if (prio.id === 0) {
      return <h5 className="prioridadCeroModal">{prio.nombre.toUpperCase()}</h5>;
    } else if (prio.id === 1) {
      return <h5 className="prioridadUnoModal">{prio.nombre.toUpperCase()}</h5>;
    } else if (prio.id === 2) {
      return <h5 className="prioridadDosModal">{prio.nombre.toUpperCase()}</h5>;
    } else if (prio.id === 3) {
      return <h5 className="prioridadTresModal">{prio.nombre.toUpperCase()}</h5>;
    } else {
      return <h5 className="prioridadCeroModal">NO ASIGNADO</h5>;
    }
  };

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
    .filter((report: reporte) => productIds.includes(report.id_producto))
    .map((report: reporte) => {
      return {
        titulo: <Button href={"/VerReporte/" + report.id} variant="link">{report.titulo}</Button>,
        prioridad: getPrioridadNombre(report.id_prioridad),
        likes: report.likes,
        fecha: report.fecha,
        producto: report.id_producto,
        reasignacion: <AsignacionButton id_report={report.id}></AsignacionButton>,
        cambiarprioridad: <CambiarPrioridadButton id={report.id}></CambiarPrioridadButton>
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
        label: 'Prioridad',
        field: 'prioridad',
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
      },
      {
        label: 'Cambiar Prioridad',
        field: 'cambiarprioridad',
        sort: 'asc'
      }
    ],
    rows: reports
  };


  return (
    <Container>
      <Button variant="success" onClick={handleShow}>
        Asignados
      </Button>
      <div className="modal-dialog modal-xl">
      <Modal show={show} onHide={handleClose} dialogClassName="modal-dialog modal-xl" maxheight='50vh'>
        <Modal.Header closeButton>
          <Modal.Title className="text-black">Reportes asignados al desarrollador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MDBTable scrollY maxHeight='70vh'>
            <MDBTableHead columns={data.columns} />
            <MDBTableBody rows={data.rows} />
          </MDBTable>
        </Modal.Body>
      </Modal>
      </div>
    </Container>
  );
}

export default ListaDevButtonEncargado;