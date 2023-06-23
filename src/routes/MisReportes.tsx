import * as React from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

interface IMisReportesProps { }

type reporte = {
    id: number;
    title: string;
    description: string;
    likes: number;
    date: string;
    id_estado: number;
    id_prioridad: number;
    id_producto: number;
};

const MisReportes: React.FunctionComponent<IMisReportesProps> = (props) => {
    const navigate = useNavigate();
    const [reports, setReports] = useState<reporte[]>([]);

    const fetchData = () => {
        fetch(`http://127.0.0.1:5000/user/reports/?id_user=2`)
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
                {report.title}
            </Button>
        ),
        fecha: report.date,
        estado: report.id_estado,
        likes: report.likes
    }));

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
            
        ],
        rows: rows
    };

    return (
        <Container className="search-container">
            <Header />
            <Card>
                <Card.Body>
                    <Card.Title className="text-black">
                        Mis Reportes
                    </Card.Title>
                    <div style={{ maxHeight: '33vh', overflowY: 'scroll' }}>
                        <MDBTable>
                            <MDBTableHead columns={data.columns} />
                            <MDBTableBody rows={data.rows} />
                        </MDBTable>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default MisReportes;
