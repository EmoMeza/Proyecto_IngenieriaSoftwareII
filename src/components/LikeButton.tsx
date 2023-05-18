import React from 'react';
import Bug from "./Bug";

const LikeButton = (props: { bug: Bug }) => {
  const addLike = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/reports/like?id_report=${props.bug.id}`, {
        method: 'POST',
      });
      const data = await response.json();
      console.log(data); // log the response message
    } catch (error) {
      console.error(error);
    }
  };

  return (
    //<button className="btn btn-primary btn-edit like-Button"> onClick={() => handleLike(bug.id)} +</button>
    <button className ="btn btn-primary btn-edit like-Button" onClick={addLike}>+</button>
  );
};

export default LikeButton;