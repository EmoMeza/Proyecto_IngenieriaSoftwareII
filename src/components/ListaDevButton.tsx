import * as React from 'react';
import { useState, useEffect} from 'react';
import  { Button,Modal,Form } from 'react-bootstrap';
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import AsignacionButton from './AsignacionButton';
import './ListaDevButton.css'

interface IListaDevButtonProps {
  id_dev: number;
  id_producto: number;
};

type FormValues = {
  motivo: string;
};

type reporte = {
  id: number;
  title:string;
  descripcion:string;
  likes:number;
  date:string;
  id_estado: number;
  id_prioridad: number;
  id_producto: number;
};

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
  
    return () => {
      fetchUserData();
    };
  }, []);

  return datos;
};


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
const ListaDevButton: React.FunctionComponent<IListaDevButtonProps> = ({ id_dev, id_producto }) => {
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const prioridades = getPrioridades();



  const getPrioridadNombre =(id:number) =>{
    const  prio = prioridades.find((item: prioridad) => item.id === id);
    if (!prio) {
      return <h5 className="prioridadCero">NO ASIGNADO</h5>;
    } else if (prio.id === 0) {
      return <h5 className="prioridadCero">{prio.nombre.toUpperCase()}</h5>;
    } else if (prio.id === 1) {
      return <h5 className="prioridadUno">{prio.nombre.toUpperCase()}</h5>;
    } else if (prio.id === 2) {
      return <h5 className="prioridadDos">{prio.nombre.toUpperCase()}</h5>;
    } else if (prio.id === 3) {
      return <h5 className="prioridadTres">{prio.nombre.toUpperCase()}</h5>;
    } else {
      return <h5 className="prioridadCero">NO ASIGNADO</h5>;
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
    .filter((report :reporte) => report.id_producto == (id_producto))
    .map((report: reporte) => {
      return {
        titulo: <Button href={"/VerReporteDev/" + report.id} variant="link">{report.title}</Button>,
        prioridad: getPrioridadNombre(report.id_prioridad),
        likes: report.likes,
        fecha: report.date,
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
      }
    ],
    rows: reports
  };


  return (
    <>
      <Button variant="success" onClick={handleShow}>
      Asignados
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="text-black">Reportes asignados al desarrollador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <MDBTable scrollY maxHeight='400vh' maxWidth ='200vh'>
                <MDBTableHead columns={data.columns} />
                <MDBTableBody rows={data.rows} />
        </MDBTable>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ListaDevButton;