import React from 'react';
import { useState } from 'react';
import './VerReporte.css';
import Header from '../components/Header';
import { useForm, SubmitHandler} from 'react-hook-form'

type FormValues = { //por ahora uso los valores de michael pero despues seran los valores del boton
  title: string;
  description: string;
  id_product: number;
}

function VerReporte() {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    
    const id_producto=data.id_product
    const url= 'http://127.0.0.1:5000/comments/get?id_report=1'
    const response = await fetch (url,{
        
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error(response.statusText);
    }

  }

  const onClickHandler = () => {
    setComments((comments) => [...comments, comment] as never[]);
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
          <h3 className="comment-text">Comment</h3>
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
