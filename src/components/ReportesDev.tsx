import * as React from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import SolicitudButton from './SolicitudButton';
import "./ReportTable.css"
interface IReportesDev {

}

type reporte = {
  id: number;
  title:string;
  descripcion:string;
  likes:number;
  date:string;
  id_estado: number;
  id_prioridad: number;
  id_producto: number;
}

const id_dev = 5;

const getData = () => {


  const [datosReporte, setDatosReporte] = useState([]);
  const [datosProducto, setDatosProductos] = useState([]);
  const [datosEstado, setDatosEstados] = useState([]);

  const fetchUserData = async () => {
    try {
      const [response1, response2, response3] = await Promise.all([
        fetch("http://127.0.0.1:5000/dev/reportes/?id_dev=" + id_dev),
        fetch("http://127.0.0.1:5000/products/all"),
        fetch("http://127.0.0.1:5000/reports/estados/all")
      ]);

      const data1 = await response1.json();
      const data2 = await response2.json();
      const data3 = await response3.json();

      setDatosReporte(data1);
      setDatosProductos(data2);
      setDatosEstados(data3);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    return () => {
      fetchUserData();
    };
  }, []);

  return [datosReporte, datosProducto, datosEstado];
};


const ReportesDev: React.FunctionComponent<IReportesDev> = (props) => {
  const [datosReporte, datosProducto, datosEstado] = getData();

  const reports = datosReporte.map((report:reporte) => {
    const estadoNombre = datosEstado[report.id_estado]?.nombre || "";
    const productoNombre = datosProducto[report.id_producto]?.nombre || "";

    return {
      titulo: <Button href={"/VerReporteDev/" + report.id} variant="link">{report.title}</Button>,
      titulo: <Button href={"/VerReporteDev/" + report.id} variant="link">{report.title}</Button>,
      estado: estadoNombre.toUpperCase(),
      likes: report.likes,
      fecha: report.date,
      producto: <p > {productoNombre}</p> ,
      solicitud:<SolicitudButton id_report={report.id} id_dev={id_dev}></SolicitudButton>
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
        label: 'Estado',
        field: 'estado',
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
        label: 'Solicitud de Reasignar',
        field: 'solictud',
        sort: 'asc'
      }
    ],
    rows: reports
  };


  return (
    <Container>
          <Card >
            <Card.Body >
              <Card.Title className="text-black">
                Reportes asignados actualmente
              </Card.Title>
              <div style={{ width: '75rem', height: '36rem', overflowY: 'scroll' }}>
                <MDBTable >
                  <MDBTableHead  columns={data.columns} />
                  <MDBTableBody rows={data.rows } />
                </MDBTable>
              </div>
              
            </Card.Body>
          </Card>
    </Container>

  );
};

export default ReportesDev;
