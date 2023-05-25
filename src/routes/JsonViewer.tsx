
import React, { useState, useEffect } from "react";

export default function JsonViewer() {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/dev/reportes/?id_dev=3") // Reemplaza la URL con la API real
      .then((response) => response.json())
      .then((data) => setJsonData(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {jsonData ? (
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}