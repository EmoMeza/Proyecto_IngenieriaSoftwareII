import React, { useState } from 'react';
import Bug from "./Bug";


const LikeButton = (props: { id_bug: number; id_user:number }) => {
  const addLike = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/reports/like?id_report=${props.id_bug}&id_user=${props.id_user}`, {
        method: 'POST',
      });
      const data = await response.json();
      console.log(data); // log the response message
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button className ="btn btn-primary btn-edit like-Button" onClick={addLike} type='submit'><img width={25} height={25} src="https://depor.com/resizer/OkW8HA6832U2SsV1b6RooS-3Oug=/1200x1200/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/TASGMCIJHFAKLMEAXIMVGEYXPM.jpg"/></button>
  );
};

export default LikeButton;