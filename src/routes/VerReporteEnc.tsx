import Comment from '../components/Comment';
import Bug from "../components/Bug";
import React from 'react';
import { useState, useEffect } from 'react';
import './VerReporte.css';
import HeaderDev from '../components/HeaderDev';
import { useParams } from 'react-router-dom';
import CustomCardEnv from '../components/CustomCardEnc';
import dayjs from "dayjs";


type comentario = {
  contenido: string;
  date: string;
  id: string;
};

type contenidoReporte = {
  titulo: string;
  descripcion: string;
}
interface Estado {
  id: number;
  nombre: string;
}

type EstadoDictionary = Record<number, string>;

const getCommentsdb = async (reportId: number) => {
  const fetchCommentData = async () => {
    const ret = fetch("http://127.0.0.1:5000/comments/get?id_report=" + reportId)
      .then((response) => {
        return response.json();
      });

    return ret;
  };

  const comments = await fetchCommentData();

  return comments;
};


const GetComments = async (id_reporte: number): Promise<comentario[]> => {
  const comments = await getCommentsdb(id_reporte);
  const commentList = comments.map((item: comentario) => {
    return new Comment(item.contenido, item.date, item.id);
  });

  return commentList;
};

const getReportedb = async (reportId: number) => {
  const fetchReportData = async () => {
    const ret = fetch("http://127.0.0.1:5000/report/get?id_report=" + reportId)
      .then((response) => {
        return response.json();
      });
    return ret;
  };
  const report = await fetchReportData();
  return report;
};

const getEstados = async (): Promise<EstadoDictionary> => {
  return new Promise((resolve, reject) => {
    fetch("http://127.0.0.1:5000/reports/estados/all")
      .then((response) => response.json())
      .then((data: Estado[]) => {
        const estadosDictionary: EstadoDictionary = {};
        data.forEach((estado) => {
          estadosDictionary[estado.id] = estado.nombre;
        });
        resolve(estadosDictionary);
      })
      .catch(reject);
  });
};


const getReporte = async (id_reporte: number): Promise<Bug> => {
  const report = await getReportedb(id_reporte);
  const estados = await getEstados();
  const encargado = await fetch("http://127.0.0.1:5000/dev/info/?id_dev=" + report.id_developer)
    .then((response) => {
      return response.json();
    });
    return new Bug(report.id,report.id_prioridad, report.title, report.description, encargado.nombre, estados[report.id_estado], report.likes);

}

function VerReporte() {
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<string[]>([]);
  const [report, setReport] = useState<Bug | undefined>(undefined);
  const [detcomment, setDetcomment] = useState<string[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const comentariolistacomentarios = await GetComments(Number(id));
      setComments(comentariolistacomentarios.map((item: comentario) => item.contenido));
      setDetcomment(comentariolistacomentarios.map((item: comentario) => dayjs(item.date).format("DD/MM/YYYY")));
    };

    const fetchReport = async () => {
      const auxReport = await getReporte(Number(id));
      setReport(auxReport);
    }
    fetchReport();
    fetchComments();
  }, []);

  const onClickHandler = async () => {
    if (comment.trim() === '') {
      return;
    }

    const response = await fetch("http://127.0.0.1:5000/reports/comments?id_report=" + Number(id), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: comment }),
    });

    if (response.ok) {
      setComments((comments) => [comment, ...comments] as never[]);
      setComment('');
    } else {
      console.error("Failed to post comment");
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <div>
      <HeaderDev/>
      <div className="main-container">
        <div>
          {report ? (
            <CustomCardEnv bug={report} />
          ) : (
            <p>Loading...</p>
          )
          }
        </div>
        <div className="comment-section">
          {comments.map((text, index) => (
            <div className="comment-container" key={index}>
              <strong>Anónimo, {detcomment[index]}</strong>
              <div className='comment-container2'>
                <h4 className="comment-text">
                </h4>
                <div className="comment-content">{text}</div>
              </div>
            </div>
          ))}
          <div className="comment-flexbox">
            <h1 className="comment-text">Deja tu comentario</h1>
            <textarea
              value={comment}
              onChange={onChangeHandler}
              className="input-box"
            />
            <button onClick={onClickHandler} className="comment-button">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerReporte;