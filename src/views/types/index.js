import { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";

const  Types = () => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/tipos`, {method: 'GET'})
      .then((response) => response.json())
      .then((data) => {
        setTypes(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return(
    <div className='d-flex justify-content-center m-3'>
      <div className='card'>
        <div className='card-body'>
          <div className='table-responsive' id="tableTypes">
            <table className='table table-striped caption-top'>
              <caption>
                <span>Listado de tipos disponibles</span>
              </caption>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody className='table-group-divider'>
              {types.map((type) => {
                  return (
                    <tr key={type.id}>
                      <td>{type.id}</td>
                      <td>{type.type}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Types;
