import Comment from '../components/Comment';
import React from 'react';
import { useState, useEffect} from 'react';
import './VerReporte.css';
import Header from '../components/Header';
import { useForm, SubmitHandler} from 'react-hook-form'
import { BrowserRouter as Router} from 'react-router-dom';
import { useParams } from 'react-router-dom';


type comentario = {
  contenido: string;
  date: string;
  id: string;
};

const getCommentsdb = async (reportId:number) => {
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

function VerReporte() {
  const { id } = useParams()
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchComments = async () => {
      const comentariolistacomentarios = await GetComments(Number(id));
      
      setComments(comentariolistacomentarios.map((item: comentario) => item.contenido));
    };

    fetchComments();
  }, []);

  const onClickHandler = async () => {
  const response = await fetch("http://127.0.0.1:5000/reports/comments?id_report=" + Number(id), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    
    body: JSON.stringify({ text: comment }),
  });

  if (response.ok) {
    setComments((comments) => [...comments, comment] as never[]);
  } else {
    console.error("Failed to post comment");
  }
};

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <div>
      <Header />
      <div className="main-container">
        {comments.map((text) => (
          <div className="comment-container">{text}</div>
        ))}

        <div className="comment-flexbox">
          <h3 className="comment-text">comment</h3>
          <textarea
            value={comment}
            onChange={onChangeHandler}
            className="input-box"
          />
          <button onClick={onClickHandler /*aca como hago para que ejecute 2 funciones*/} className="comment-button">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerReporte;
