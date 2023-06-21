import * as React from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { useNavigate } from 'react-router-dom';

interface IMisReportesProps { }

type reporte = {
    id: number;
    titulo: string;
    descripcion: string;
    likes: number;
    fecha: string;
    id_estado: number;
    id_prioridad: number;
    id_producto: number;
};

const MisReportes: React.FunctionComponent<IMisReportesProps> = (props) => {
    const navigate = useNavigate();
    const [reports, setReports] = useState<reporte[]>([]);

    const fetchData = () => {
        fetch(`http://127.0.0.1:5000/products/get/my_reports`)
            .then((response) => response.json())
            .then((data) => {
                setReports(data);
            });
    };

    useEffect(() => {
        fetchData();

        const interval = setInterval(fetchData, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleInspectBug = (id: number) => {
        navigate(`/VerReporte/${id}`);
    };

    const rows = reports.map((report: reporte) => ({
        titulo: (
            <Button variant="link" onClick={() => handleInspectBug(report.id)}>
                {report.titulo}
            </Button>
        ),
        likes: report.likes,
        fecha: report.fecha
    }));

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
            }
        ],
        rows: rows
    };

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title className="text-black">Mis Reportes</Card.Title>
                    <MDBTable scrollY>
                        <MDBTableHead columns={data.columns} />
                        <MDBTableBody rows={data.rows} />
                    </MDBTable>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default MisReportes;
