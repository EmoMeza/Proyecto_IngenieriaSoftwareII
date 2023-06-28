import * as React from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './MisReportes.css'
import dayjs from "dayjs";

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

interface Estado {
    id: number;
    nombre: string;
}

type EstadoDictionary = Record<number, string>;

const getEstados = (): EstadoDictionary => {
    const [estados, setEstados] = useState<EstadoDictionary>({});

    const fetchEstados = () => {
        fetch("http://127.0.0.1:5000/reports/estados/all")
            .then((response) => response.json())
            .then((data: Estado[]) => {
                const estadosDictionary: EstadoDictionary = {};
                data.forEach((estado) => {
                    estadosDictionary[estado.id] = estado.nombre;
                });
                setEstados(estadosDictionary);
            });
    };

    useEffect(() => {
        fetchEstados();
    }, []);

    return estados;
};

const MisReportes: React.FunctionComponent<IMisReportesProps> = (props) => {
    const navigate = useNavigate();
    const estados = getEstados();
    const [reports, setReports] = useState<reporte[]>([]);
    const [likedReports, setLikedReports] = useState<reporte[]>([]);

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

    const fetchDataLikes = () => {
        fetch(`http://127.0.0.1:5000/user/liked/?id_user=2`)
            .then((response) => response.json())
            .then((data) => {
                setLikedReports(data);
            });
    };

    useEffect(() => {
        fetchDataLikes();

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
        fecha: dayjs(report.date).format("DD/MM/YYYY"),
        estado: estados[report.id_estado],
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

    const likedRows = likedReports.map((report: reporte) => ({
        titulo: (
            <Button variant="link" onClick={() => handleInspectBug(report.id)}>
                {report.title}
            </Button>
        ),
        fecha: dayjs(report.date).format("MM/DD/YYYY"),
        estado: estados[report.id_estado],
        likes: report.likes
    }));

    const likedData = {
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
        rows: likedRows
    };




    return (
        <Container>
            <Header />
            <Container className="Container">
                
                <Card>
                    <Card.Body>
                        <Card.Title className="text-black">
                            Mis Reportes
                        </Card.Title>
                        <div style={{ maxHeight: '33vh' ,overflowY: 'scroll' }}>
                            <MDBTable>
                                <MDBTableHead columns={data.columns} />
                                <MDBTableBody rows={data.rows} />
                            </MDBTable>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
            <Container className="Container">
                <Card>
                    <Card.Body>
                        <Card.Title className="text-black">
                            Mis Likes
                        </Card.Title>
                        <div style={{ maxHeight: '33vh', overflowY: 'scroll' }}>
                            <MDBTable className="fixed-columns-table" >
                                <MDBTableHead columns={data.columns} />
                                <MDBTableBody rows={likedData.rows} />
                            </MDBTable>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </Container>

    );
};

export default MisReportes;
