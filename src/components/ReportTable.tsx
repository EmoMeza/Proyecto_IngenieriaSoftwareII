import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Card, Container, Button } from 'react-bootstrap';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import "../routes/App.css"
import "./ReportTable.css"
import LikeButton from "./LikeButton";

type reporte = {
  date: Date;
  description: string;
  id_estado: number;
  id: number;
  id_producto: number;
  likes: number;
  title: string;
}

type EstadoDictionary = { [id: number]: string };

interface ReportTableProps {
  Items: reporte[]
  id_product: number;
  estados: EstadoDictionary;
}


export default function ReportTable({ Items, id_product, estados}: ReportTableProps) {
  
  const reports = Items.map((report: reporte) => {
    return {
      titulo: <Button href={"/VerReporte/" + report.id} variant="link">{report.title}</Button>,
      fecha: report.date,
      estado: report.id_estado,
      likes: report.likes,
      like: <LikeButton id_bug={report.id} />,
      id_producto: report.id_producto
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
        label: 'Fecha',
        field: 'fecha',
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
        label: '',
        field: 'like',
        sort: 'asc'
      }
    ],
    rows: reports
  };

  


  return (
      <ul>
        <Container className="search-container">
          <Card>
            <Card.Body>
              <Card.Title className="text-black">Reportes</Card.Title>
              <div style={{ maxHeight: '55vh', overflowY: 'scroll' }}>
                <MDBTable>
                  <MDBTableHead columns={data.columns} />
                  <MDBTableBody>
                    {data.rows.filter((row) => row.id_producto === id_product).map((row, index) => (
                      <tr key={index} data-custom="hidden data">
                        <td>{row.titulo}</td>
                        <td>{row.fecha}</td>
                        <td>{estados[row.estado]}</td>
                        <td>{row.likes}</td>
                        <td>{row.like}</td>
                      </tr>
                    ))}
                  </MDBTableBody>
                </MDBTable>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </ul>
  );
}
