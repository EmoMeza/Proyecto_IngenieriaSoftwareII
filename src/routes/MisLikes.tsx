import * as React from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

interface IMislikesProps { }

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

const Mislikes: React.FunctionComponent<IMislikesProps> = (props) => {
    const navigate = useNavigate();
    const [reports, setReports] = useState<reporte[]>([]);

    const fetchData = () => {
        fetch(`http://127.0.0.1:5000/user/liked/?id_user=2`)
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
        likes: report.likes,
        fecha: report.date
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
        <Container className="search-container">
            <Header />
            <Card>
                <Card.Body>
                    <Card.Title className="text-black">
                        Mis Likes
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

export default Mislikes;
